import {
  createPublicClient,
  http,
  encodeFunctionData,
  type Address,
  type Hex,
  getContractAddress,
  keccak256,
  encodePacked,
  concat,
  pad,
  toHex,
} from "viem";
import { baseSepolia, base } from "viem/chains";
import { config } from "./config.js";

const UNISWAP_V3_FACTORY: Record<string, Address> = {
  base: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
  baseSepolia: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
};

const SWAP_ROUTER_02: Record<string, Address> = {
  base: "0x2626664c2603336E57B271c5C0b26F421741e481",
  baseSepolia: "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4",
};

const POOL_INIT_CODE_HASH: Hex =
  "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54";

const POOL_ABI = [
  {
    type: "function",
    name: "slot0",
    inputs: [],
    outputs: [
      { name: "sqrtPriceX96", type: "uint160" },
      { name: "tick", type: "int24" },
      { name: "observationIndex", type: "uint16" },
      { name: "observationCardinality", type: "uint16" },
      { name: "observationCardinalityNext", type: "uint16" },
      { name: "feeProtocol", type: "uint8" },
      { name: "unlocked", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "liquidity",
    inputs: [],
    outputs: [{ name: "", type: "uint128" }],
    stateMutability: "view",
  },
] as const;

const SWAP_ROUTER_ABI = [
  {
    type: "function",
    name: "exactInputSingle",
    inputs: [
      {
        name: "params",
        type: "tuple",
        components: [
          { name: "tokenIn", type: "address" },
          { name: "tokenOut", type: "address" },
          { name: "fee", type: "uint24" },
          { name: "recipient", type: "address" },
          { name: "amountIn", type: "uint256" },
          { name: "amountOutMinimum", type: "uint256" },
          { name: "sqrtPriceLimitX96", type: "uint160" },
        ],
      },
    ],
    outputs: [{ name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
  },
] as const;

function sortTokens(tokenA: Address, tokenB: Address): [Address, Address] {
  return tokenA.toLowerCase() < tokenB.toLowerCase()
    ? [tokenA, tokenB]
    : [tokenB, tokenA];
}

export function computePoolAddress(
  factory: Address,
  tokenA: Address,
  tokenB: Address,
  fee: number
): Address {
  const [token0, token1] = sortTokens(tokenA, tokenB);

  const salt = keccak256(
    encodePacked(
      ["address", "address", "uint24"],
      [token0, token1, fee]
    )
  );

  const encoded = concat([
    "0xff" as Hex,
    pad(factory, { size: 20 }) as Hex,
    salt,
    POOL_INIT_CODE_HASH,
  ]);

  const hash = keccak256(encoded);
  return `0x${hash.slice(26)}` as Address;
}

function getClient(network: "sepolia" | "mainnet") {
  const chain = network === "sepolia" ? baseSepolia : base;
  const rpcUrl = network === "sepolia" ? config.rpc.baseSepolia : config.rpc.baseMainnet;
  return createPublicClient({ chain, transport: http(rpcUrl) });
}

export interface OnChainQuote {
  poolAddress: Address;
  sqrtPriceX96: bigint;
  tick: number;
  liquidity: bigint;
  estimatedAmountOut: bigint;
  priceImpactWarning: boolean;
}

export async function getOnChainQuote(params: {
  tokenIn: Address;
  tokenOut: Address;
  amountIn: bigint;
  fee?: number;
  network?: "sepolia" | "mainnet";
}): Promise<OnChainQuote | null> {
  const { tokenIn, tokenOut, amountIn, fee = 3000, network = "sepolia" } = params;
  const client = getClient(network);
  const chainKey = network === "sepolia" ? "baseSepolia" : "base";
  const factory = UNISWAP_V3_FACTORY[chainKey];

  const poolAddress = computePoolAddress(factory, tokenIn, tokenOut, fee);

  try {
    const [slot0Result, liquidityResult] = await Promise.all([
      client.readContract({ address: poolAddress, abi: POOL_ABI, functionName: "slot0" }),
      client.readContract({ address: poolAddress, abi: POOL_ABI, functionName: "liquidity" }),
    ]);

    const [sqrtPriceX96, tick] = slot0Result;
    const liquidity = liquidityResult;

    const [token0] = sortTokens(tokenIn, tokenOut);
    const isToken0In = tokenIn.toLowerCase() === token0.toLowerCase();

    const Q96 = 1n << 96n;
    let estimatedAmountOut: bigint;

    if (isToken0In) {
      estimatedAmountOut = (amountIn * sqrtPriceX96 * sqrtPriceX96) / (Q96 * Q96);
    } else {
      estimatedAmountOut = (amountIn * Q96 * Q96) / (sqrtPriceX96 * sqrtPriceX96);
    }

    const priceImpactWarning = liquidity < amountIn * 10n;

    console.log(`[swap-local] Pool ${poolAddress} | tick=${tick} | liq=${liquidity}`);

    return {
      poolAddress,
      sqrtPriceX96,
      tick: Number(tick),
      liquidity,
      estimatedAmountOut,
      priceImpactWarning,
    };
  } catch (err) {
    console.error(`[swap-local] Failed to read pool ${poolAddress}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

export interface LocalSwapCalldata {
  to: Address;
  data: Hex;
  value: bigint;
  estimatedAmountOut: bigint;
  amountOutMinimum: bigint;
  routerAddress: Address;
}

export function buildSwapCalldata(params: {
  tokenIn: Address;
  tokenOut: Address;
  amountIn: bigint;
  fee?: number;
  recipient: Address;
  estimatedAmountOut: bigint;
  slippageBps?: number;
  network?: "sepolia" | "mainnet";
}): LocalSwapCalldata {
  const {
    tokenIn,
    tokenOut,
    amountIn,
    fee = 3000,
    recipient,
    estimatedAmountOut,
    slippageBps = 50,
    network = "sepolia",
  } = params;

  const chainKey = network === "sepolia" ? "baseSepolia" : "base";
  const routerAddress = SWAP_ROUTER_02[chainKey];

  const amountOutMinimum = estimatedAmountOut - (estimatedAmountOut * BigInt(slippageBps)) / 10000n;

  const data = encodeFunctionData({
    abi: SWAP_ROUTER_ABI,
    functionName: "exactInputSingle",
    args: [
      {
        tokenIn,
        tokenOut,
        fee,
        recipient,
        amountIn,
        amountOutMinimum,
        sqrtPriceLimitX96: 0n,
      },
    ],
  });

  return {
    to: routerAddress,
    data,
    value: 0n,
    estimatedAmountOut,
    amountOutMinimum,
    routerAddress,
  };
}

export function getRouterAddress(network: "sepolia" | "mainnet"): Address {
  return SWAP_ROUTER_02[network === "sepolia" ? "baseSepolia" : "base"];
}
