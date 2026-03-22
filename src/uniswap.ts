import {
  createWalletClient,
  createPublicClient,
  http,
  parseUnits,
  type Address,
  type Hex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, base } from "viem/chains";
import { config } from "./config.js";
import { getOnChainQuote, buildSwapCalldata, getRouterAddress } from "./swap-local.js";

interface SwapResult {
  success: boolean;
  txHash?: string;
  error?: string;
  quote?: {
    amountOut: string;
    gasEstimate: string;
    routing: string;
  };
}

export async function executeSwap(params: {
  tokenIn: Address;
  tokenOut: Address;
  amount: string;
  tokenInDecimals: number;
  tokenOutDecimals?: number;
  chainId?: number;
  network?: "sepolia" | "mainnet";
  recipient?: Address;
  fee?: number;
  slippageBps?: number;
}): Promise<SwapResult> {
  const {
    tokenIn,
    tokenOut,
    amount,
    tokenInDecimals,
    tokenOutDecimals = 6,
    network = "sepolia",
    fee = 3000,
    slippageBps = 50,
  } = params;

  const amountInWei = parseUnits(amount, tokenInDecimals);

  if (config.wallet.privateKey === "0x") {
    return { success: false, error: "No wallet configured (WALLET_PRIVATE_KEY not set)" };
  }

  const account = privateKeyToAccount(config.wallet.privateKey);
  const chain = network === "sepolia" ? baseSepolia : base;

  const usePrivateRpc = network === "mainnet" && config.rpc.privateMainnet;
  const readRpcUrl = network === "sepolia" ? config.rpc.baseSepolia : config.rpc.baseMainnet;
  const writeRpcUrl = usePrivateRpc ? config.rpc.privateMainnet : readRpcUrl;

  if (usePrivateRpc) {
    console.log("[rpc] Swap submission via private RPC (MEV-shielded)");
  }

  console.log("[swap] Using local calldata builder (no centralized API call)");

  const onChainQuote = await getOnChainQuote({
    tokenIn,
    tokenOut,
    amountIn: amountInWei,
    fee,
    network,
  });

  if (!onChainQuote) {
    return { success: false, error: "Failed to read on-chain pool state. Pool may not exist for this pair/fee." };
  }

  if (onChainQuote.priceImpactWarning) {
    console.warn("[swap] WARNING: Low liquidity — potential high price impact");
  }

  const recipient = params.recipient || account.address;

  const swap = buildSwapCalldata({
    tokenIn,
    tokenOut,
    amountIn: amountInWei,
    fee,
    recipient,
    estimatedAmountOut: onChainQuote.estimatedAmountOut,
    slippageBps,
    network,
  });

  const walletClient = createWalletClient({
    account,
    chain,
    transport: http(writeRpcUrl),
  });

  const publicClient = createPublicClient({
    chain,
    transport: http(readRpcUrl),
  });

  try {
    const txHash = await walletClient.sendTransaction({
      to: swap.to,
      data: swap.data,
      value: swap.value,
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

    return {
      success: receipt.status === "success",
      txHash,
      quote: {
        amountOut: swap.estimatedAmountOut.toString(),
        gasEstimate: receipt.gasUsed.toString(),
        routing: "LOCAL (on-chain pool read, no API)",
      },
    };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return { success: false, error: errMsg };
  }
}

export function getExplorerUrl(
  txHash: string,
  network: "sepolia" | "mainnet" = "sepolia"
): string {
  const explorerBase =
    network === "sepolia"
      ? "https://sepolia.basescan.org"
      : "https://basescan.org";
  return `${explorerBase}/tx/${txHash}`;
}

export { getOnChainQuote, buildSwapCalldata, getRouterAddress };
