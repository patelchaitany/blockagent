import { type Address } from "viem";
import { validateConfig } from "./config.js";
import { runAnalysis } from "./agent.js";

validateConfig();

const wallet = process.argv[2];
const network = (process.argv[3] || "sepolia") as "sepolia" | "mainnet";

if (!wallet) {
  console.log(`
Usage: npm run analyze <wallet-address> [network]

Examples:
  npm run analyze 0x1234...abcd sepolia
  npm run analyze 0x1234...abcd mainnet
  `);
  process.exit(1);
}

if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
  console.error("Invalid wallet address");
  process.exit(1);
}

console.log(`
╔══════════════════════════════════════════════════╗
║  BlockAgent — Agentic Portfolio Analysis         ║
╚══════════════════════════════════════════════════╝

Wallet:       ${wallet}
Network:      ${network}
Mode:         Analysis only (no trades)
Privacy:      Venice AI (zero data retention)
Tools:        Live prices, Python statistical analysis
`);

try {
  const result = await runAnalysis(wallet as Address, network);

  console.log("\n" + "=".repeat(60));
  console.log("ANALYSIS RESULT");
  console.log("=".repeat(60));

  if (result.analysis.parsed) {
    const parsed = result.analysis.parsed;
    console.log(`\nRisk Score: ${parsed["riskScore"] ?? "N/A"}/10`);
    console.log(`\nSummary: ${parsed["summary"] ?? "See full analysis"}`);
    console.log(`\nRisk Assessment: ${parsed["riskAssessment"] ?? "N/A"}`);

    const stats = parsed["statisticalFindings"];
    if (stats) {
      console.log(`\nStatistical Findings: ${stats}`);
    }

    const recs =
      (parsed["recommendations"] as Array<Record<string, unknown>>) || [];
    if (recs.length > 0) {
      console.log("\nRecommendations (advisory only — no trades executed):");
      for (const rec of recs) {
        console.log(
          `  ${String(rec.action).toUpperCase()} ${rec.token}: ${rec.percentage}% — ${rec.rationale}`
        );
      }
    }

    const yields =
      (parsed["yieldOpportunities"] as Array<Record<string, unknown>>) || [];
    if (yields.length > 0) {
      console.log("\nYield Opportunities:");
      for (const y of yields) {
        console.log(`  ${y.protocol} (${y.apy}): ${y.description}`);
      }
    }
  } else {
    console.log("\nRaw Analysis:");
    console.log(result.analysis.analysis);
  }

  console.log(`\nTokens used: ${result.analysis.tokensUsed}`);
  console.log(`Model: ${result.analysis.model}`);
  console.log(`Tool calls: ${result.analysis.toolCallCount}`);
  console.log(`Python executions: ${result.analysis.pythonExecutions}`);
  console.log(`Duration: ${Date.now() - result.timestamp}ms`);
} catch (error) {
  console.error("Error:", error instanceof Error ? error.message : error);
  process.exit(1);
}
