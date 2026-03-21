const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

const SYMBOL_TO_COINGECKO_ID: Record<string, string> = {
  ETH: "ethereum",
  WETH: "weth",
  USDC: "usd-coin",
  DAI: "dai",
  cbETH: "coinbase-wrapped-staked-eth",
  AERO: "aerodrome-finance",
};

export interface LivePrice {
  symbol: string;
  usd: number;
  usd_24h_change: number;
  usd_24h_vol: number;
  usd_market_cap: number;
}

export interface PriceHistoryPoint {
  timestamp: number;
  price: number;
}

async function geckoFetch(path: string): Promise<unknown> {
  const res = await fetch(`${COINGECKO_BASE}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CoinGecko ${res.status}: ${text}`);
  }
  return res.json();
}

export async function fetchLivePrices(
  symbols: string[]
): Promise<Map<string, LivePrice>> {
  const ids = symbols
    .map((s) => SYMBOL_TO_COINGECKO_ID[s])
    .filter(Boolean);

  if (ids.length === 0) return new Map();

  const params = new URLSearchParams({
    ids: ids.join(","),
    vs_currencies: "usd",
    include_24hr_change: "true",
    include_24hr_vol: "true",
    include_market_cap: "true",
  });

  const data = (await geckoFetch(`/simple/price?${params}`)) as Record<
    string,
    Record<string, number>
  >;

  const result = new Map<string, LivePrice>();

  for (const symbol of symbols) {
    const geckoId = SYMBOL_TO_COINGECKO_ID[symbol];
    if (!geckoId || !data[geckoId]) continue;

    const entry = data[geckoId];
    result.set(symbol, {
      symbol,
      usd: entry.usd ?? 0,
      usd_24h_change: entry.usd_24h_change ?? 0,
      usd_24h_vol: entry.usd_24h_vol ?? 0,
      usd_market_cap: entry.usd_market_cap ?? 0,
    });
  }

  return result;
}

export async function fetchPriceHistory(
  symbol: string,
  days: number = 30
): Promise<string> {
  const geckoId = SYMBOL_TO_COINGECKO_ID[symbol];
  if (!geckoId) {
    return `Error: Unknown symbol "${symbol}". Known: ${Object.keys(SYMBOL_TO_COINGECKO_ID).join(", ")}`;
  }

  const params = new URLSearchParams({
    vs_currency: "usd",
    days: String(days),
  });

  const data = (await geckoFetch(
    `/coins/${geckoId}/market_chart?${params}`
  )) as { prices: [number, number][] };

  const dailyMap = new Map<string, number>();
  for (const [ts, price] of data.prices) {
    const date = new Date(ts).toISOString().split("T")[0];
    dailyMap.set(date, price);
  }

  const rows = Array.from(dailyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, price]) => `${date},${price.toFixed(2)}`);

  return `date,price\n${rows.join("\n")}`;
}

export function getKnownSymbols(): string[] {
  return Object.keys(SYMBOL_TO_COINGECKO_ID);
}
