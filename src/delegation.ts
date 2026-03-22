import {
  createPublicClient,
  createWalletClient,
  http,
  type Address,
  type Abi,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, base } from "viem/chains";
import { config } from "./config.js";

const SCOPED_DELEGATION_ABI = [
  {
    type: "function",
    name: "scope",
    inputs: [],
    outputs: [
      { name: "delegator", type: "address" },
      { name: "delegate", type: "address" },
      { name: "maxAmountPerTx", type: "uint256" },
      { name: "dailyLimit", type: "uint256" },
      { name: "expiryTimestamp", type: "uint256" },
      { name: "active", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "remainingDailyLimit",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isValidAction",
    inputs: [
      { name: "token", type: "address" },
      { name: "target", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllowedTokens",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllowedTargets",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "executeAction",
    inputs: [
      { name: "token", type: "address" },
      { name: "target", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ActionExecuted",
    inputs: [
      { name: "delegate", type: "address", indexed: true },
      { name: "token", type: "address", indexed: true },
      { name: "target", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
] as const satisfies Abi;

export interface DelegationState {
  delegator: Address;
  delegate: Address;
  maxAmountPerTx: bigint;
  dailyLimit: bigint;
  expiryTimestamp: bigint;
  active: boolean;
  remainingDaily: bigint;
  allowedTokens: Address[];
  allowedTargets: Address[];
  expired: boolean;
}

function getClients(network: "sepolia" | "mainnet") {
  const chain = network === "sepolia" ? baseSepolia : base;
  const readRpcUrl =
    network === "sepolia" ? config.rpc.baseSepolia : config.rpc.baseMainnet;

  const usePrivateRpc =
    network === "mainnet" && config.rpc.privateMainnet;
  const writeRpcUrl = usePrivateRpc
    ? config.rpc.privateMainnet
    : readRpcUrl;

  if (usePrivateRpc) {
    console.log("[rpc] Submitting via private RPC (MEV-shielded)");
  }

  const publicClient = createPublicClient({
    chain,
    transport: http(readRpcUrl),
  });

  let walletClient = null;
  if (config.wallet.privateKey !== "0x") {
    const account = privateKeyToAccount(config.wallet.privateKey);
    walletClient = createWalletClient({
      account,
      chain,
      transport: http(writeRpcUrl),
    });
  }

  return { publicClient, walletClient };
}

export async function checkDelegation(
  contractAddress: Address,
  network: "sepolia" | "mainnet" = "sepolia"
): Promise<DelegationState> {
  const { publicClient } = getClients(network);

  const [scopeResult, remaining, tokens, targets] = await Promise.all([
    publicClient.readContract({
      address: contractAddress,
      abi: SCOPED_DELEGATION_ABI,
      functionName: "scope",
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: SCOPED_DELEGATION_ABI,
      functionName: "remainingDailyLimit",
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: SCOPED_DELEGATION_ABI,
      functionName: "getAllowedTokens",
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: SCOPED_DELEGATION_ABI,
      functionName: "getAllowedTargets",
    }),
  ]);

  const [delegator, delegate, maxAmountPerTx, dailyLimit, expiryTimestamp, active] =
    scopeResult;

  const now = BigInt(Math.floor(Date.now() / 1000));

  return {
    delegator,
    delegate,
    maxAmountPerTx,
    dailyLimit,
    expiryTimestamp,
    active,
    remainingDaily: remaining,
    allowedTokens: [...tokens],
    allowedTargets: [...targets],
    expired: now > expiryTimestamp,
  };
}

export async function isActionValid(
  contractAddress: Address,
  token: Address,
  target: Address,
  amount: bigint,
  network: "sepolia" | "mainnet" = "sepolia"
): Promise<boolean> {
  const { publicClient } = getClients(network);

  return publicClient.readContract({
    address: contractAddress,
    abi: SCOPED_DELEGATION_ABI,
    functionName: "isValidAction",
    args: [token, target, amount],
  });
}

export interface ExecutionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export async function executeViaDelegate(
  contractAddress: Address,
  token: Address,
  target: Address,
  amount: bigint,
  network: "sepolia" | "mainnet" = "sepolia"
): Promise<ExecutionResult> {
  const { publicClient, walletClient } = getClients(network);

  if (!walletClient) {
    return {
      success: false,
      error: "No session key configured (WALLET_PRIVATE_KEY not set)",
    };
  }

  const valid = await isActionValid(contractAddress, token, target, amount, network);
  if (!valid) {
    return {
      success: false,
      error: "Action rejected by ScopedDelegation contract (token/target not allowed, exceeds limits, or delegation expired)",
    };
  }

  try {
    const hash = await walletClient.writeContract({
      address: contractAddress,
      abi: SCOPED_DELEGATION_ABI,
      functionName: "executeAction",
      args: [token, target, amount],
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return {
      success: receipt.status === "success",
      txHash: hash,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function formatDelegationStatus(state: DelegationState): string {
  const lines = [
    `Delegation Contract Status:`,
    `  Delegator (user):  ${state.delegator}`,
    `  Delegate (agent):  ${state.delegate}`,
    `  Active:            ${state.active}`,
    `  Expired:           ${state.expired}`,
    `  Max per tx:        ${state.maxAmountPerTx.toString()} wei`,
    `  Daily limit:       ${state.dailyLimit.toString()} wei`,
    `  Remaining today:   ${state.remainingDaily.toString()} wei`,
    `  Expires:           ${new Date(Number(state.expiryTimestamp) * 1000).toISOString()}`,
    `  Allowed tokens:    ${state.allowedTokens.length > 0 ? state.allowedTokens.join(", ") : "none"}`,
    `  Allowed targets:   ${state.allowedTargets.length > 0 ? state.allowedTargets.join(", ") : "none"}`,
  ];
  return lines.join("\n");
}
