import { type Address } from "viem";
import { readPortfolio, formatPortfolioForAnalysis } from "./portfolio.js";
import { analyzePortfolio, type AgenticAnalysisResult } from "./venice.js";
import { appendToAgentLog, type LogEntry } from "./logger.js";

export interface AnalysisResult {
  portfolio: ReturnType<typeof formatPortfolioForAnalysis>;
  analysis: AgenticAnalysisResult;
  timestamp: number;
  agentVersion: string;
}

export async function runAnalysis(
  walletAddress: Address,
  network: "sepolia" | "mainnet" = "sepolia"
): Promise<AnalysisResult> {
  const startTime = Date.now();
  const log: LogEntry[] = [];

  console.log(`[discover] Reading portfolio for ${walletAddress}...`);
  const snapshot = await readPortfolio(walletAddress, network);
  const portfolioText = formatPortfolioForAnalysis(snapshot);
  console.log(portfolioText);

  log.push({
    taskId: `analysis-${startTime}`,
    step: "discover",
    decision: `Read portfolio for ${walletAddress} on ${snapshot.chain}. Total value: $${snapshot.totalUsdValue.toFixed(2)}. ${snapshot.allocations.length} assets found. Prices: ${snapshot.priceSource}.`,
    toolCalls: ["portfolio.readPortfolio", "viem.multicall", "prices.fetchLivePrices"],
    inputs: { walletAddress, network },
    outputs: {
      totalValue: snapshot.totalUsdValue,
      assetCount: snapshot.allocations.length,
      allocations: snapshot.allocations,
      priceSource: snapshot.priceSource,
    },
    retries: 0,
    timestamp: Date.now(),
    outcome: "success",
  });

  console.log("[analyze] Starting agentic analysis with tool calling...");
  const analysis = await analyzePortfolio(portfolioText);
  console.log(
    `[analyze] Analysis complete. Tokens used: ${analysis.tokensUsed}. Tool calls: ${analysis.toolCallCount}. Python runs: ${analysis.pythonExecutions}.`
  );

  log.push({
    taskId: `analysis-${startTime}`,
    step: "analyze",
    decision: `Agentic analysis via ${analysis.model}. ${analysis.tokensUsed} tokens used. ${analysis.toolCallCount} tool calls. ${analysis.pythonExecutions} Python executions. Analysis-only mode (no trades).`,
    toolCalls: [
      "venice.analyzePortfolio",
      "prices.fetchPriceHistory",
      "code-executor.executePython",
    ],
    inputs: { portfolioLength: portfolioText.length },
    outputs: {
      model: analysis.model,
      tokensUsed: analysis.tokensUsed,
      toolCallCount: analysis.toolCallCount,
      pythonExecutions: analysis.pythonExecutions,
      hasStructuredResponse: analysis.parsed !== null,
      riskScore: analysis.parsed?.["riskScore"] ?? "N/A",
    },
    retries: 0,
    timestamp: Date.now(),
    outcome: "success",
  });

  log.push({
    taskId: `analysis-${startTime}`,
    step: "report",
    decision: `Analysis complete. Advisory recommendations only — no trades executed. Elapsed: ${Date.now() - startTime}ms.`,
    toolCalls: [],
    inputs: {},
    outputs: {
      elapsedMs: Date.now() - startTime,
    },
    retries: 0,
    timestamp: Date.now(),
    outcome: "success",
  });

  await appendToAgentLog(log);

  return {
    portfolio: portfolioText,
    analysis,
    timestamp: startTime,
    agentVersion: "2.0.0",
  };
}
