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

interface QuoteResponse {
  quote: {
    methodParameters?: {
      calldata: string;
      value: string;
      to: string;
    };
    quote: string;
    quoteDecimals: string;
    quoteGasAdjusted: string;
    gasUseEstimate: string;
    route: unknown[];
  };
  routing: string;
}

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

export async function getSwapQuote(params: {
  tokenIn: Address;
  tokenOut: Address;
  amount: string;
  tokenInDecimals: number;
  chainId?: number;
  slippageTolerance?: number;
}): Promise<QuoteResponse | null> {
  const {
    tokenIn,
    tokenOut,
    amount,
    tokenInDecimals,
    chainId = baseSepolia.id,
    slippageTolerance = 50,
  } = params;

  const amountRaw = parseUnits(amount, tokenInDecimals).toString();

  const account = privateKeyToAccount(config.wallet.privateKey);

  const body = {
    tokenInChainId: chainId,
    tokenOutChainId: chainId,
    tokenIn,
    tokenOut,
    amount: amountRaw,
    type: "EXACT_INPUT",
    slippageTolerance,
    configs: [
      {
        routingType: "CLASSIC",
        protocols: ["V3", "V2"],
        recipient: account.address,
        enableUniversalRouter: true,
      },
    ],
  };

  try {
    const response = await fetch(`${config.uniswap.baseUrl}/v2/quote`, {
      method: "POST",
      headers: {
        "x-api-key": config.uniswap.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Uniswap quote error ${response.status}: ${errorText}`);
      return null;
    }

    return (await response.json()) as QuoteResponse;
  } catch (error) {
    console.error("Uniswap quote request failed:", error);
    return null;
  }
}

export async function executeSwap(params: {
  tokenIn: Address;
  tokenOut: Address;
  amount: string;
  tokenInDecimals: number;
  chainId?: number;
  network?: "sepolia" | "mainnet";
}): Promise<SwapResult> {
  const { network = "sepolia", chainId = baseSepolia.id } = params;

  const quoteResponse = await getSwapQuote({ ...params, chainId });

  if (!quoteResponse) {
    return { success: false, error: "Failed to get quote from Uniswap" };
  }

  const methodParams = quoteResponse.quote.methodParameters;
  if (!methodParams) {
    return {
      success: false,
      error: "Quote returned no method parameters (simulation only?)",
      quote: {
        amountOut: quoteResponse.quote.quoteDecimals || quoteResponse.quote.quote,
        gasEstimate: quoteResponse.quote.gasUseEstimate,
        routing: quoteResponse.routing,
      },
    };
  }

  const account = privateKeyToAccount(config.wallet.privateKey);
  const chain = network === "sepolia" ? baseSepolia : base;
  const rpcUrl =
    network === "sepolia" ? config.rpc.baseSepolia : config.rpc.baseMainnet;

  const walletClient = createWalletClient({
    account,
    chain,
    transport: http(rpcUrl),
  });

  const publicClient = createPublicClient({
    chain,
    transport: http(rpcUrl),
  });

  try {
    const txHash = await walletClient.sendTransaction({
      to: methodParams.to as Address,
      data: methodParams.calldata as Hex,
      value: BigInt(methodParams.value || "0"),
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    return {
      success: receipt.status === "success",
      txHash,
      quote: {
        amountOut: quoteResponse.quote.quoteDecimals || quoteResponse.quote.quote,
        gasEstimate: quoteResponse.quote.gasUseEstimate,
        routing: quoteResponse.routing,
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
  const base =
    network === "sepolia"
      ? "https://sepolia.basescan.org"
      : "https://basescan.org";
  return `${base}/tx/${txHash}`;
}
