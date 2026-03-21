import { type Address } from "viem";
import { readPortfolio, formatPortfolioForAnalysis } from "./portfolio.js";
import { analyzePortfolio } from "./venice.js";
import { executeSwap, getSwapQuote, getExplorerUrl } from "./uniswap.js";
import { appendToAgentLog, type LogEntry } from "./logger.js";

export interface AnalysisResult {
  portfolio: ReturnType<typeof formatPortfolioForAnalysis>;
  analysis: Awaited<ReturnType<typeof analyzePortfolio>>;
  trades: Array<{
    action: string;
    tokenIn: string;
    tokenOut: string;
    amount: string;
    txHash?: string;
    explorerUrl?: string;
    error?: string;
  }>;
  timestamp: number;
  agentVersion: string;
}

export async function runAnalysis(
  walletAddress: Address,
  network: "sepolia" | "mainnet" = "sepolia",
  autoExecute: boolean = false
): Promise<AnalysisResult> {
  const startTime = Date.now();
  const log: LogEntry[] = [];

  // Step 1: Discover — read onchain portfolio
  console.log(`[discover] Reading portfolio for ${walletAddress}...`);
  const snapshot = await readPortfolio(walletAddress, network);
  const portfolioText = formatPortfolioForAnalysis(snapshot);
  console.log(portfolioText);

  log.push({
    taskId: `analysis-${startTime}`,
    step: "discover",
    decision: `Read portfolio for ${walletAddress} on ${snapshot.chain}. Total value: $${snapshot.totalUsdValue.toFixed(2)}. ${snapshot.allocations.length} assets found.`,
    toolCalls: ["portfolio.readPortfolio", "viem.multicall"],
    inputs: { walletAddress, network },
    outputs: {
      totalValue: snapshot.totalUsdValue,
      assetCount: snapshot.allocations.length,
      allocations: snapshot.allocations,
    },
    retries: 0,
    timestamp: Date.now(),
    outcome: "success",
  });

  // Step 2: Analyze — send to Venice for private analysis
  console.log("[analyze] Sending to Venice for private analysis...");
  const analysis = await analyzePortfolio(portfolioText);
  console.log(`[analyze] Analysis complete. Tokens used: ${analysis.tokensUsed}`);

  log.push({
    taskId: `analysis-${startTime}`,
    step: "analyze",
    decision: `Private analysis via Venice (${analysis.model}). ${analysis.tokensUsed} tokens used. Zero data retention.`,
    toolCalls: ["venice.analyzePortfolio"],
    inputs: { portfolioLength: portfolioText.length },
    outputs: {
      model: analysis.model,
      tokensUsed: analysis.tokensUsed,
      hasStructuredResponse: analysis.parsed !== null,
      riskScore: analysis.parsed?.["riskScore"] ?? "N/A",
    },
    retries: 0,
    timestamp: Date.now(),
    outcome: "success",
  });

  // Step 3: Recommend — extract trade recommendations
  const trades: AnalysisResult["trades"] = [];

  if (analysis.parsed && autoExecute) {
    const recommendations = (analysis.parsed["recommendations"] as Array<{
      action: string;
      token: string;
      percentage: number;
      rationale: string;
    }>) || [];

    console.log(
      `[recommend] ${recommendations.length} recommendations found.`
    );

    for (const rec of recommendations) {
      if (rec.action === "sell" && rec.token !== "USDC") {
        console.log(
          `[execute] Would swap ${rec.token} -> USDC (${rec.percentage}%)`
        );

        const tokenInfo = snapshot.tokens.find(
          (t) => t.symbol === rec.token
        );

        if (tokenInfo) {
          const usdcAddress =
            network === "sepolia"
              ? "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
              : "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

          const swapAmount = (
            (parseFloat(tokenInfo.formatted) * rec.percentage) /
            100
          ).toString();

          const result = await executeSwap({
            tokenIn: tokenInfo.address,
            tokenOut: usdcAddress as Address,
            amount: swapAmount,
            tokenInDecimals: tokenInfo.decimals,
            network,
          });

          trades.push({
            action: "sell",
            tokenIn: rec.token,
            tokenOut: "USDC",
            amount: swapAmount,
            txHash: result.txHash,
            explorerUrl: result.txHash
              ? getExplorerUrl(result.txHash, network)
              : undefined,
            error: result.error,
          });

          log.push({
            taskId: `analysis-${startTime}`,
            step: "execute",
            decision: `Swap ${swapAmount} ${rec.token} -> USDC. ${result.success ? "Success" : "Failed"}: ${result.txHash || result.error}`,
            toolCalls: ["uniswap.executeSwap", "viem.sendTransaction"],
            inputs: {
              tokenIn: rec.token,
              tokenOut: "USDC",
              amount: swapAmount,
            },
            outputs: {
              success: result.success,
              txHash: result.txHash,
              error: result.error,
            },
            retries: 0,
            timestamp: Date.now(),
            outcome: result.success ? "success" : "failure",
          });
        }
      } else {
        trades.push({
          action: rec.action,
          tokenIn: rec.action === "buy" ? "USDC" : rec.token,
          tokenOut: rec.action === "buy" ? rec.token : "USDC",
          amount: `${rec.percentage}%`,
        });
      }
    }
  }

  // Step 4: Report
  log.push({
    taskId: `analysis-${startTime}`,
    step: "report",
    decision: `Analysis complete. ${trades.length} trade actions identified. Execution: ${autoExecute ? "enabled" : "analysis-only"}.`,
    toolCalls: [],
    inputs: {},
    outputs: {
      tradeCount: trades.length,
      executedCount: trades.filter((t) => t.txHash).length,
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
    trades,
    timestamp: startTime,
    agentVersion: "1.0.0",
  };
}
