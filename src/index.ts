import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { type Address } from "viem";
import { config, validateConfig } from "./config.js";
import { runAnalysis } from "./agent.js";

validateConfig();

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => (data += chunk.toString()));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body, null, 2));
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${config.server.port}`);

  // Health check
  if (url.pathname === "/" && req.method === "GET") {
    sendJson(res, 200, {
      agent: "BlockAgent",
      version: "1.0.0",
      description:
        "Private DeFi Advisory Agent — confidential portfolio analysis via Venice, real swaps via Uniswap",
      endpoints: {
        "POST /analyze": "Analyze a wallet portfolio (params: wallet, network, autoExecute)",
        "GET /health": "Health check",
      },
    });
    return;
  }

  if (url.pathname === "/health" && req.method === "GET") {
    sendJson(res, 200, { status: "ok", timestamp: Date.now() });
    return;
  }

  // Main analysis endpoint
  if (url.pathname === "/analyze" && req.method === "POST") {
    try {
      const body = await readBody(req);
      const params = JSON.parse(body) as {
        wallet: string;
        network?: "sepolia" | "mainnet";
        autoExecute?: boolean;
      };

      if (!params.wallet) {
        sendJson(res, 400, { error: "Missing 'wallet' parameter" });
        return;
      }

      if (!/^0x[a-fA-F0-9]{40}$/.test(params.wallet)) {
        sendJson(res, 400, { error: "Invalid wallet address format" });
        return;
      }

      console.log(`\n${"=".repeat(60)}`);
      console.log(`New analysis request: ${params.wallet}`);
      console.log(`Network: ${params.network || "sepolia"}`);
      console.log(`Auto-execute: ${params.autoExecute || false}`);
      console.log("=".repeat(60));

      const result = await runAnalysis(
        params.wallet as Address,
        params.network || "sepolia",
        params.autoExecute || false
      );

      sendJson(res, 200, {
        success: true,
        privacy: "Analysis performed via Venice AI with zero data retention",
        result,
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error("Analysis error:", errMsg);
      sendJson(res, 500, { error: errMsg });
    }
    return;
  }

  // x402 payment-required endpoint (for paid tier)
  if (url.pathname === "/analyze/paid" && req.method === "POST") {
    const paymentHeader = req.headers["x-payment"] || req.headers["authorization"];

    if (!paymentHeader) {
      res.writeHead(402, {
        "Content-Type": "application/json",
        "X-Payment-Required": "true",
        "X-Payment-Chain": "base",
        "X-Payment-Token": "USDC",
        "X-Payment-Amount": "1000000",
        "X-Payment-Recipient": "0x0000000000000000000000000000000000000000",
      });
      res.end(
        JSON.stringify({
          error: "Payment required",
          protocol: "x402",
          amount: "1 USDC",
          chain: "Base",
          token: "USDC",
          description:
            "Pay 1 USDC on Base to receive a private portfolio analysis",
        })
      );
      return;
    }

    // With payment header present, proceed with analysis
    try {
      const body = await readBody(req);
      const params = JSON.parse(body) as {
        wallet: string;
        network?: "sepolia" | "mainnet";
        autoExecute?: boolean;
      };

      if (!params.wallet) {
        sendJson(res, 400, { error: "Missing 'wallet' parameter" });
        return;
      }

      const result = await runAnalysis(
        params.wallet as Address,
        params.network || "sepolia",
        params.autoExecute || false
      );

      sendJson(res, 200, {
        success: true,
        privacy: "Analysis performed via Venice AI with zero data retention",
        paid: true,
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

server.listen(config.server.port, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║           BlockAgent — Private DeFi Advisor             ║
║                                                         ║
║  Venice AI:    Private inference (zero data retention)   ║
║  Uniswap:     Real token swaps                          ║
║  Chain:        Base                                      ║
║  Protocol:     x402 payments                            ║
║                                                         ║
║  Server:       http://localhost:${String(config.server.port).padEnd(25)}║
║  Analyze:      POST /analyze                            ║
║  Paid tier:    POST /analyze/paid                       ║
╚══════════════════════════════════════════════════════════╝
  `);
});
