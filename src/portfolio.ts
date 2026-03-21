import {
  createPublicClient,
  http,
  formatUnits,
  type Address,
  erc20Abi,
} from "viem";
import { baseSepolia, base } from "viem/chains";
import { config } from "./config.js";

export interface TokenBalance {
  address: Address;
  symbol: string;
  decimals: number;
  balance: bigint;
  formatted: string;
  usdValue: number;
}

export interface PortfolioSnapshot {
  wallet: Address;
  chain: string;
  chainId: number;
  timestamp: number;
  ethBalance: string;
  ethUsdValue: number;
  tokens: TokenBalance[];
  totalUsdValue: number;
  allocations: Array<{ symbol: string; percentage: number; usdValue: number }>;
}

const KNOWN_TOKENS_BASE_SEPOLIA: Array<{
  address: Address;
  symbol: string;
  decimals: number;
  priceUsd: number;
}> = [
  {
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    symbol: "USDC",
    decimals: 6,
    priceUsd: 1.0,
  },
  {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    decimals: 18,
    priceUsd: 2000,
  },
];

const KNOWN_TOKENS_BASE_MAINNET: Array<{
  address: Address;
  symbol: string;
  decimals: number;
  priceUsd: number;
}> = [
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    symbol: "USDC",
    decimals: 6,
    priceUsd: 1.0,
  },
  {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    decimals: 18,
    priceUsd: 2000,
  },
  {
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    symbol: "DAI",
    decimals: 18,
    priceUsd: 1.0,
  },
  {
    address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
    symbol: "cbETH",
    decimals: 18,
    priceUsd: 2100,
  },
  {
    address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
    symbol: "AERO",
    decimals: 18,
    priceUsd: 1.5,
  },
];

function getClient(network: "sepolia" | "mainnet") {
  const rpcUrl =
    network === "sepolia" ? config.rpc.baseSepolia : config.rpc.baseMainnet;
  return createPublicClient({
    chain: network === "sepolia" ? baseSepolia : base,
    transport: http(rpcUrl),
  });
}

function getTokenList(network: "sepolia" | "mainnet") {
  return network === "sepolia"
    ? KNOWN_TOKENS_BASE_SEPOLIA
    : KNOWN_TOKENS_BASE_MAINNET;
}

export async function readPortfolio(
  walletAddress: Address,
  network: "sepolia" | "mainnet" = "sepolia"
): Promise<PortfolioSnapshot> {
  const client = getClient(network);
  const tokens = getTokenList(network);
  const ethPriceUsd = 2000;

  const ethBalance = await client.getBalance({ address: walletAddress });
  const ethFormatted = formatUnits(ethBalance, 18);
  const ethUsdValue = parseFloat(ethFormatted) * ethPriceUsd;

  const balanceCalls = tokens.map((token) => ({
    address: token.address,
    abi: erc20Abi,
    functionName: "balanceOf" as const,
    args: [walletAddress] as const,
  }));

  const results = await client.multicall({
    contracts: balanceCalls,
  } as Parameters<typeof client.multicall>[0]);

  const tokenBalances: TokenBalance[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const result = results[i] as { status: string; result?: unknown };
    if (result.status === "success" && result.result) {
      const balance = result.result as bigint;
      if (balance > 0n) {
        const formatted = formatUnits(balance, tokens[i].decimals);
        const usdValue = parseFloat(formatted) * tokens[i].priceUsd;
        tokenBalances.push({
          address: tokens[i].address,
          symbol: tokens[i].symbol,
          decimals: tokens[i].decimals,
          balance,
          formatted,
          usdValue,
        });
      }
    }
  }

  const totalUsdValue =
    ethUsdValue + tokenBalances.reduce((sum, t) => sum + t.usdValue, 0);

  const allocations: PortfolioSnapshot["allocations"] = [];

  if (ethUsdValue > 0) {
    allocations.push({
      symbol: "ETH",
      percentage: totalUsdValue > 0 ? (ethUsdValue / totalUsdValue) * 100 : 0,
      usdValue: ethUsdValue,
    });
  }

  for (const token of tokenBalances) {
    allocations.push({
      symbol: token.symbol,
      percentage:
        totalUsdValue > 0 ? (token.usdValue / totalUsdValue) * 100 : 0,
      usdValue: token.usdValue,
    });
  }

  allocations.sort((a, b) => b.percentage - a.percentage);

  const chain = network === "sepolia" ? baseSepolia : base;

  return {
    wallet: walletAddress,
    chain: chain.name,
    chainId: chain.id,
    timestamp: Date.now(),
    ethBalance: ethFormatted,
    ethUsdValue,
    tokens: tokenBalances,
    totalUsdValue,
    allocations,
  };
}

export function formatPortfolioForAnalysis(snapshot: PortfolioSnapshot): string {
  let report = `Portfolio for ${snapshot.wallet} on ${snapshot.chain}:\n`;
  report += `Total Value: $${snapshot.totalUsdValue.toFixed(2)}\n\n`;
  report += `Allocations:\n`;

  for (const alloc of snapshot.allocations) {
    report += `- ${alloc.symbol}: ${alloc.percentage.toFixed(1)}% ($${alloc.usdValue.toFixed(2)})\n`;
  }

  if (snapshot.allocations.length === 0) {
    report += `- Empty portfolio (no balances found)\n`;
  }

  return report;
}
