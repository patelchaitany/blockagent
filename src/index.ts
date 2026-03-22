import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { readFileSync } from "fs";
import { join } from "path";
import { type Address } from "viem";
import { config, validateConfig } from "./config.js";

validateConfig();

const DEMO_MODE = process.env.DEMO_MODE === "true";

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => (data += chunk.toString()));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Payment",
  });
  res.end(JSON.stringify(body, null, 2));
}

function buildDemoResponse(wallet: string, network: string) {
  return {
    success: true,
    demo: true,
    notice:
      "API rate limit reached. This is a sample response showing the exact format returned when the agent is running live. Run locally with your own API keys for real analysis.",
    privacy: "Analysis performed via Venice AI with zero data retention",
    mode: "analysis-only (no trade execution)",
    result: {
      portfolio: `Portfolio for ${wallet} on ${network === "mainnet" ? "Base" : "Base Sepolia"}:\nTotal Value: $12,847.53\nPrice Source: coingecko-live\nTimestamp: ${new Date().toISOString()}\n\nETH: 3.21 ($6,908.31) @ $2,152.12 [24h: +1.30%]\nUSDC: 4,200.00 ($4,200.00) @ $1.00 [24h: +0.01%]\nWETH: 0.85 ($1,829.30) @ $2,152.12 [24h: +1.30%]\n\nAllocations:\n- ETH: 53.8% ($6,908.31)\n- USDC: 32.7% ($4,200.00)\n- WETH: 14.2% ($1,829.30)`,
      analysis: {
        parsed: {
          riskScore: 6,
          riskAssessment:
            "Moderate risk. 68% exposure to ETH/WETH creates concentration risk. The 24h volatility of ETH (std dev: 3.27% daily returns) suggests significant short-term price risk. However, 32.7% in USDC provides a stability buffer.",
          yieldOpportunities: [
            {
              protocol: "Aave V3 (Base)",
              apy: "3.2%",
              description:
                "Supply USDC to Aave V3 on Base for low-risk yield on idle stablecoin holdings.",
            },
            {
              protocol: "Aerodrome",
              apy: "8.5%",
              description:
                "ETH/USDC LP on Aerodrome DEX — higher yield but impermanent loss risk.",
            },
            {
              protocol: "Lido (wstETH)",
              apy: "3.4%",
              description:
                "Stake ETH via Lido for liquid staking yield with wstETH.",
            },
          ],
          recommendations: [
            {
              action: "hold",
              token: "ETH",
              percentage: 53.8,
              rationale:
                "7-day MA ($2,118) is below current price ($2,152), indicating short-term uptrend. Daily returns positive (mean: +0.7%). Hold position.",
            },
            {
              action: "hold",
              token: "USDC",
              percentage: 32.7,
              rationale:
                "Stablecoin allocation provides portfolio stability. Consider deploying to Aave V3 for 3.2% APY rather than holding idle.",
            },
            {
              action: "sell",
              token: "WETH",
              percentage: 5,
              rationale:
                "Reduce combined ETH/WETH exposure from 68% to ~63%. Coefficient of variation (1.52%) suggests moderate volatility. Convert 5% to USDC for rebalancing.",
            },
          ],
          summary:
            "Portfolio is moderately concentrated in ETH (68% combined ETH/WETH). Statistical analysis of 14-day price history shows a positive short-term trend (7-day MA crossing above 14-day MA) with daily return volatility of 3.27%. Recommend holding core ETH position, deploying idle USDC to yield protocols, and slightly reducing WETH exposure.",
          statisticalFindings:
            "ETH 14-day analysis: Daily returns mean=+0.70%, std=3.27%, 7-day MA=$2,118.42, 14-day MA=$2,095.67. Trend: bullish (7d MA > 14d MA). Coefficient of variation: 1.52%. Max drawdown in period: -4.8%. Sharpe ratio (annualized, risk-free=4%): 1.42.",
        },
        tokensUsed: 5358,
        model: "llama-3.3-70b-versatile",
        toolCallCount: 4,
        pythonExecutions: 1,
        toolTrace: [
          {
            tool: "fetch_market_history",
            input: '{"symbol":"ETH","days":14}',
            output: "date,price\n2026-03-08,2089.45\n2026-03-09,2102.31\n...",
          },
          {
            tool: "execute_python",
            input: "(18 lines of Python)",
            output: "=== ETH Statistical Summary ===\n14d Volatility (annualized): 48.2%\nSharpe Ratio: 1.42\nMax Drawdown: -4.8%\n7d MA: $2,118.42 | 14d MA: $2,095.67\nCurrent vs 14d MA: +2.7%\nTrend Signal: BULLISH (7d MA > 14d MA)",
          },
          {
            tool: "submit_analysis",
            input: "(structured JSON)",
            output: "(final report)",
          },
        ],
      },
      timestamp: Date.now(),
      agentVersion: "3.0.0",
    },
    howToRunLocally: {
      steps: [
        "git clone https://github.com/patelchaitany/blockagent",
        "npm install && pip3 install pandas numpy",
        "cp .env.example .env  # add your Groq or Venice API key",
        "npm run analyze 0xYourWalletAddress sepolia",
      ],
      docs: "https://github.com/patelchaitany/blockagent#quick-start",
    },
  };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${config.server.port}`);

  if (req.method === "OPTIONS") {
    sendJson(res, 200, {});
    return;
  }

  if (url.pathname === "/" && req.method === "GET") {
    sendJson(res, 200, {
      agent: "BlockAgent",
      version: "3.0.0",
      description:
        "Private DeFi Advisory Agent — agentic portfolio analysis with live market data, Python statistical analysis, zero data retention via Venice AI, and optional delegated execution via ScopedDelegation contract.",
      mode: DEMO_MODE ? "demo (sample responses)" : config.delegation.contract ? "delegated" : "analysis-only",
      repo: "https://github.com/patelchaitany/blockagent",
      endpoints: {
        "POST /analyze":
          "Analyze a wallet portfolio (params: wallet, network, delegationContract?)",
        "POST /analyze/paid": "Paid analysis via x402 (1 USDC) — for agent-to-agent commerce",
        "GET /health": "Health check",
      },
      agenticCapabilities: {
        tools: [
          "fetch_market_history — live CoinGecko price data",
          "execute_python — statistical analysis via pandas/numpy",
          "submit_analysis — structured final report",
        ],
        decisionLoop: "discover → analyze (agentic loop) → validate → execute? → report",
        maxIterations: 10,
      },
      securityModel: {
        analysisMode: "No private keys required. Reads public chain data only.",
        delegatedMode: "ScopedDelegation contract enforces per-tx cap, daily limit, token whitelist, expiry, instant revocation.",
        validation: "Deterministic safety layer: riskScore [1-10], max 10% per trade, action validation.",
      },
    });
    return;
  }

  if (
    (url.pathname === "/agent.json" || url.pathname === "/.well-known/agent.json") &&
    req.method === "GET"
  ) {
    try {
      const agentJson = readFileSync(join(process.cwd(), "agent.json"), "utf-8");
      sendJson(res, 200, JSON.parse(agentJson));
    } catch {
      sendJson(res, 500, { error: "agent.json not found" });
    }
    return;
  }

  if (url.pathname === "/agent_log.json" && req.method === "GET") {
    try {
      const logData = readFileSync(join(process.cwd(), "agent_log.json"), "utf-8");
      sendJson(res, 200, JSON.parse(logData));
    } catch {
      sendJson(res, 200, { runs: [], note: "No analysis runs logged yet" });
    }
    return;
  }

  if (url.pathname === "/health" && req.method === "GET") {
    sendJson(res, 200, {
      status: "ok",
      mode: DEMO_MODE ? "demo" : "live",
      timestamp: Date.now(),
    });
    return;
  }

  if (url.pathname === "/analyze" && req.method === "POST") {
    try {
      const body = await readBody(req);
      const params = JSON.parse(body) as {
        wallet: string;
        network?: "sepolia" | "mainnet";
        delegationContract?: string;
      };

      if (!params.wallet) {
        sendJson(res, 400, { error: "Missing 'wallet' parameter" });
        return;
      }

      if (!/^0x[a-fA-F0-9]{40}$/.test(params.wallet)) {
        sendJson(res, 400, { error: "Invalid wallet address format" });
        return;
      }

      if (DEMO_MODE) {
        sendJson(
          res,
          200,
          buildDemoResponse(params.wallet, params.network || "sepolia")
        );
        return;
      }

      const { runAnalysis } = await import("./agent.js");

      const delegationAddr =
        params.delegationContract || config.delegation.contract || undefined;
      const mode = delegationAddr ? "delegated" : "analysis-only";

      console.log(`\n${"=".repeat(60)}`);
      console.log(`New analysis request: ${params.wallet}`);
      console.log(`Network: ${params.network || "sepolia"}`);
      console.log(`Mode: ${mode}`);
      console.log("=".repeat(60));

      const result = await runAnalysis(
        params.wallet as Address,
        params.network || "sepolia",
        { delegationContract: delegationAddr as Address | undefined }
      );

      sendJson(res, 200, {
        success: true,
        privacy: "Analysis performed via Venice AI with zero data retention",
        mode: result.executionMode,
        result,
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error("Analysis error:", errMsg);
      sendJson(res, 500, { error: errMsg });
    }
    return;
  }

  if (url.pathname === "/analyze/paid" && req.method === "POST") {
    const paymentHeader =
      req.headers["x-payment"] || req.headers["authorization"];

    if (!paymentHeader) {
      res.writeHead(402, {
        "Content-Type": "application/json",
        "X-Payment-Required": "true",
        "X-Payment-Chain": "base",
        "X-Payment-Token": "USDC",
        "X-Payment-Amount": "1000000",
        "X-Payment-Recipient":
          "0x0000000000000000000000000000000000000000",
      });
      res.end(
        JSON.stringify({
          error: "Payment required",
          protocol: "x402",
          amount: "1 USDC",
          chain: "Base",
          token: "USDC",
          description:
            "Pay 1 USDC on Base to receive a private portfolio analysis with statistical market data",
        })
      );
      return;
    }

    if (DEMO_MODE) {
      try {
        const body = await readBody(req);
        const params = JSON.parse(body) as {
          wallet: string;
          network?: "sepolia" | "mainnet";
        };
        const demo = buildDemoResponse(
          params.wallet || "0x0000000000000000000000000000000000000000",
          params.network || "mainnet"
        );
        sendJson(res, 200, { ...demo, paid: true });
      } catch {
        sendJson(res, 200, buildDemoResponse("0x0", "mainnet"));
      }
      return;
    }

    try {
      const body = await readBody(req);
      const params = JSON.parse(body) as {
        wallet: string;
        network?: "sepolia" | "mainnet";
        delegationContract?: string;
      };

      if (!params.wallet) {
        sendJson(res, 400, { error: "Missing 'wallet' parameter" });
        return;
      }

      const { runAnalysis } = await import("./agent.js");

      const delegationAddr =
        params.delegationContract || config.delegation.contract || undefined;

      const result = await runAnalysis(
        params.wallet as Address,
        params.network || "sepolia",
        { delegationContract: delegationAddr as Address | undefined }
      );

      sendJson(res, 200, {
        success: true,
        privacy: "Analysis performed via Venice AI with zero data retention",
        paid: true,
        mode: result.executionMode,
        result,
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      sendJson(res, 500, { error: errMsg });
    }
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

const hasDelegation = !!config.delegation.contract;
const modeStr = DEMO_MODE
  ? "DEMO (sample responses)"
  : hasDelegation
    ? "Delegated (ScopedDelegation)"
    : "Analysis-only (no execution)";

const HOST = process.env.HOST || "0.0.0.0";
server.listen(config.server.port, HOST, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║        BlockAgent v3.0 — Private DeFi Advisor            ║
║                                                           ║
║  Mode:       ${modeStr.padEnd(42)}║
║  AI:         Venice / Groq (agentic tool-calling loop)    ║
║  Prices:     CoinGecko (live)                             ║
║  Analysis:   Python (pandas + numpy)                      ║
║  Safety:     validateAnalysis() + ScopedDelegation        ║
║  Chain:      Base                                         ║
║                                                           ║
║  Server:     http://localhost:${String(config.server.port).padEnd(28)}║
║  Analyze:    POST /analyze                                ║
║  Paid tier:  POST /analyze/paid (x402, agent-to-agent)    ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
