import { type Address } from "viem";
import { validateConfig } from "./config.js";
import { runAnalysis } from "./agent.js";

validateConfig();

const wallet = process.argv[2];
const network = (process.argv[3] || "sepolia") as "sepolia" | "mainnet";
const autoExecute = process.argv[4] === "--execute";

if (!wallet) {
  console.log(`
Usage: npm run analyze <wallet-address> [network] [--execute]

Examples:
  npm run analyze 0x1234...abcd sepolia
  npm run analyze 0x1234...abcd mainnet
  npm run analyze 0x1234...abcd sepolia --execute
  `);
  process.exit(1);
}

if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
  console.error("Invalid wallet address");
  process.exit(1);
}

console.log(`
╔══════════════════════════════════════════════╗
║     BlockAgent — Private Portfolio Analysis  ║
╚══════════════════════════════════════════════╝

Wallet:       ${wallet}
Network:      ${network}
Auto-execute: ${autoExecute}
Privacy:      Venice AI (zero data retention)
`);

try {
  const result = await runAnalysis(
    wallet as Address,
    network,
    autoExecute
  );

  console.log("\n" + "=".repeat(60));
  console.log("ANALYSIS RESULT");
  console.log("=".repeat(60));

  if (result.analysis.parsed) {
    const parsed = result.analysis.parsed;
    console.log(`\nRisk Score: ${parsed["riskScore"] ?? "N/A"}/10`);
    console.log(`\nSummary: ${parsed["summary"] ?? "See full analysis"}`);
    console.log(`\nRisk Assessment: ${parsed["riskAssessment"] ?? "N/A"}`);

    const recs = (parsed["recommendations"] as Array<Record<string, unknown>>) || [];
    if (recs.length > 0) {
      console.log("\nRecommendations:");
      for (const rec of recs) {
        console.log(
          `  ${String(rec.action).toUpperCase()} ${rec.token}: ${rec.percentage}% — ${rec.rationale}`
        );
      }
    }

    const yields = (parsed["yieldOpportunities"] as Array<Record<string, unknown>>) || [];
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

  if (result.trades.length > 0) {
    console.log("\nTrades Executed:");
    for (const trade of result.trades) {
      const status = trade.txHash ? `✓ ${trade.explorerUrl}` : `✗ ${trade.error || "not executed"}`;
      console.log(
        `  ${trade.action} ${trade.tokenIn} -> ${trade.tokenOut} (${trade.amount}): ${status}`
      );
    }
  }

  console.log(`\nTokens used: ${result.analysis.tokensUsed}`);
  console.log(`Model: ${result.analysis.model}`);
  console.log(`Privacy: Zero data retention (Venice AI)`);
  console.log(`Duration: ${Date.now() - result.timestamp}ms`);
} catch (error) {
  console.error("Error:", error instanceof Error ? error.message : error);
  process.exit(1);
}
