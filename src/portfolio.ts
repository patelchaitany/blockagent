import {
  createPublicClient,
  http,
  formatUnits,
  type Address,
  erc20Abi,
} from "viem";
import { baseSepolia, base } from "viem/chains";
import { config } from "./config.js";
import { fetchLivePrices, type LivePrice } from "./prices.js";

export interface TokenBalance {
  address: Address;
  symbol: string;
  decimals: number;
  balance: bigint;
  formatted: string;
  usdValue: number;
  price: number;
  change24h: number;
}

export interface PortfolioSnapshot {
  wallet: Address;
  chain: string;
  chainId: number;
  timestamp: number;
  ethBalance: string;
  ethUsdValue: number;
  ethPrice: number;
  ethChange24h: number;
  tokens: TokenBalance[];
  totalUsdValue: number;
  allocations: Array<{ symbol: string; percentage: number; usdValue: number }>;
  priceSource: "coingecko-live" | "fallback";
}

interface TokenDef {
  address: Address;
  symbol: string;
  decimals: number;
}

const KNOWN_TOKENS_BASE_SEPOLIA: TokenDef[] = [
  {
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    symbol: "USDC",
    decimals: 6,
  },
  {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    decimals: 18,
  },
];

const KNOWN_TOKENS_BASE_MAINNET: TokenDef[] = [
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    symbol: "USDC",
    decimals: 6,
  },
  {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    decimals: 18,
  },
  {
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    symbol: "DAI",
    decimals: 18,
  },
  {
    address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
    symbol: "cbETH",
    decimals: 18,
  },
  {
    address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
    symbol: "AERO",
    decimals: 18,
  },
];

const FALLBACK_PRICES: Record<string, number> = {
  ETH: 2000,
  WETH: 2000,
  USDC: 1,
  DAI: 1,
  cbETH: 2100,
  AERO: 1.5,
};

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

  const allSymbols = ["ETH", ...tokens.map((t) => t.symbol)];
  let priceMap: Map<string, LivePrice>;
  let priceSource: PortfolioSnapshot["priceSource"] = "coingecko-live";

  try {
    console.log("[prices] Fetching live prices from CoinGecko...");
    priceMap = await fetchLivePrices(allSymbols);
    console.log(`[prices] Got live prices for ${priceMap.size} tokens`);
  } catch (err) {
    console.warn(
      `[prices] CoinGecko failed, using fallback prices: ${err instanceof Error ? err.message : String(err)}`
    );
    priceMap = new Map();
    priceSource = "fallback";
  }

  function getPrice(symbol: string): number {
    return priceMap.get(symbol)?.usd ?? FALLBACK_PRICES[symbol] ?? 0;
  }
  function getChange(symbol: string): number {
    return priceMap.get(symbol)?.usd_24h_change ?? 0;
  }

  const ethPriceUsd = getPrice("ETH");
  const ethChange24h = getChange("ETH");

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
        const price = getPrice(tokens[i].symbol);
        const formatted = formatUnits(balance, tokens[i].decimals);
        const usdValue = parseFloat(formatted) * price;
        tokenBalances.push({
          address: tokens[i].address,
          symbol: tokens[i].symbol,
          decimals: tokens[i].decimals,
          balance,
          formatted,
          usdValue,
          price,
          change24h: getChange(tokens[i].symbol),
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
    ethPrice: ethPriceUsd,
    ethChange24h,
    tokens: tokenBalances,
    totalUsdValue,
    allocations,
    priceSource,
  };
}

export function formatPortfolioForAnalysis(
  snapshot: PortfolioSnapshot
): string {
  let report = `Portfolio for ${snapshot.wallet} on ${snapshot.chain}:\n`;
  report += `Total Value: $${snapshot.totalUsdValue.toFixed(2)}\n`;
  report += `Price Source: ${snapshot.priceSource}\n`;
  report += `Timestamp: ${new Date(snapshot.timestamp).toISOString()}\n\n`;

  report += `ETH: ${snapshot.ethBalance} ($${snapshot.ethUsdValue.toFixed(2)}) @ $${snapshot.ethPrice.toFixed(2)} [24h: ${snapshot.ethChange24h.toFixed(2)}%]\n`;

  for (const token of snapshot.tokens) {
    report += `${token.symbol}: ${token.formatted} ($${token.usdValue.toFixed(2)}) @ $${token.price.toFixed(2)} [24h: ${token.change24h.toFixed(2)}%]\n`;
  }

  report += `\nAllocations:\n`;
  for (const alloc of snapshot.allocations) {
    report += `- ${alloc.symbol}: ${alloc.percentage.toFixed(1)}% ($${alloc.usdValue.toFixed(2)})\n`;
  }

  if (snapshot.allocations.length === 0) {
    report += `- Empty portfolio (no balances found)\n`;
  }

  report += `\nAvailable tokens for historical analysis: ETH, WETH, USDC, DAI, cbETH, AERO`;
  report += `\nUse fetch_market_history tool to get CSV price data for statistical analysis.`;

  return report;
}
