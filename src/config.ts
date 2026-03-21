import "dotenv/config";

export const config = {
  venice: {
    apiKey: process.env.VENICE_API_KEY || process.env.LLM_API_KEY || "",
    baseUrl: process.env.LLM_BASE_URL || "https://api.venice.ai/api/v1",
    model: process.env.LLM_MODEL || "llama-3.3-70b",
    provider: process.env.LLM_PROVIDER || "venice",
  },
  uniswap: {
    apiKey: process.env.UNISWAP_API_KEY || "",
    baseUrl: "https://api.uniswap.org",
  },
  wallet: {
    privateKey: (process.env.WALLET_PRIVATE_KEY || "0x") as `0x${string}`,
  },
  delegation: {
    contract: (process.env.DELEGATION_CONTRACT || "") as `0x${string}` | "",
  },
  rpc: {
    baseSepolia: process.env.BASE_RPC_URL || "https://sepolia.base.org",
    baseMainnet: process.env.BASE_MAINNET_RPC_URL || "https://mainnet.base.org",
    statusSepolia: process.env.STATUS_RPC_URL || "https://public.sepolia.status.im",
  },
  server: {
    port: parseInt(process.env.PORT || "3000"),
  },
} as const;

export function validateConfig() {
  if (process.env.DEMO_MODE === "true") {
    console.log("[config] Running in DEMO mode — API keys not required.");
    return;
  }

  const missing: string[] = [];
  if (!config.venice.apiKey) missing.push("VENICE_API_KEY (or LLM_API_KEY)");

  if (missing.length > 0) {
    console.error(`Missing required env vars: ${missing.join(", ")}`);
    console.error("Copy .env.example to .env and fill in your keys.");
    process.exit(1);
  }

  if (config.delegation.contract && config.wallet.privateKey === "0x") {
    console.warn(
      "[config] DELEGATION_CONTRACT is set but WALLET_PRIVATE_KEY is missing. " +
      "Delegated execution will not work without a session key."
    );
  }
}
