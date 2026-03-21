import { type Address, parseUnits } from "viem";
import { readPortfolio, formatPortfolioForAnalysis } from "./portfolio.js";
import { analyzePortfolio, type AgenticAnalysisResult } from "./venice.js";
import { appendToAgentLog, type LogEntry } from "./logger.js";
import {
  checkDelegation,
  executeViaDelegate,
  formatDelegationStatus,
  type ExecutionResult,
} from "./delegation.js";

export interface TradeExecution {
  action: string;
  token: string;
  percentage: number;
  rationale: string;
  delegationResult?: ExecutionResult;
}

export interface AnalysisResult {
  portfolio: ReturnType<typeof formatPortfolioForAnalysis>;
  analysis: AgenticAnalysisResult;
  trades: TradeExecution[];
  executionMode: "analysis-only" | "delegated";
  delegationStatus?: string;
  timestamp: number;
  agentVersion: string;
}

export interface RunOptions {
  delegationContract?: Address;
}

export async function runAnalysis(
  walletAddress: Address,
  network: "sepolia" | "mainnet" = "sepolia",
  options: RunOptions = {}
): Promise<AnalysisResult> {
  const startTime = Date.now();
  const log: LogEntry[] = [];
  const executionMode = options.delegationContract ? "delegated" : "analysis-only";

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

  let delegationStatus: string | undefined;
  if (options.delegationContract) {
    try {
      console.log(`[delegation] Checking ScopedDelegation at ${options.delegationContract}...`);
      const state = await checkDelegation(options.delegationContract, network);
      delegationStatus = formatDelegationStatus(state);
      console.log(delegationStatus);

      if (!state.active) {
        console.log("[delegation] Delegation is revoked. Falling back to analysis-only.");
        options.delegationContract = undefined;
      } else if (state.expired) {
        console.log("[delegation] Delegation has expired. Falling back to analysis-only.");
        options.delegationContract = undefined;
      }
    } catch (err) {
      console.log(`[delegation] Could not read contract: ${err instanceof Error ? err.message : String(err)}. Falling back to analysis-only.`);
      options.delegationContract = undefined;
    }
  }

  console.log("[analyze] Starting agentic analysis with tool calling...");
  const analysis = await analyzePortfolio(portfolioText);
  console.log(
    `[analyze] Analysis complete. Tokens used: ${analysis.tokensUsed}. Tool calls: ${analysis.toolCallCount}. Python runs: ${analysis.pythonExecutions}.`
  );

  if (analysis.validationWarnings.length > 0) {
    console.log(`[validation] ${analysis.validationWarnings.length} safety correction(s) applied to LLM output.`);
  }

  log.push({
    taskId: `analysis-${startTime}`,
    step: "analyze",
    decision: `Agentic analysis via ${analysis.model}. ${analysis.tokensUsed} tokens used. ${analysis.toolCallCount} tool calls. ${analysis.pythonExecutions} Python executions. Mode: ${executionMode}. Validation warnings: ${analysis.validationWarnings.length}.`,
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
      validationWarnings: analysis.validationWarnings,
    },
    retries: 0,
    timestamp: Date.now(),
    outcome: "success",
  });

  const trades: TradeExecution[] = [];

  if (options.delegationContract && analysis.parsed) {
    const recs = (analysis.parsed["recommendations"] as Array<{
      action: string;
      token: string;
      percentage: number;
      rationale: string;
    }>) || [];

    const sellRecs = recs.filter((r) => r.action === "sell");

    for (const rec of sellRecs) {
      const tokenInfo = snapshot.tokens.find((t) => t.symbol === rec.token);
      if (!tokenInfo) {
        trades.push({ ...rec, delegationResult: { success: false, error: `Token ${rec.token} not in portfolio` } });
        continue;
      }

      const swapAmount = (parseFloat(tokenInfo.formatted) * rec.percentage) / 100;
      const amountWei = parseUnits(swapAmount.toFixed(tokenInfo.decimals), tokenInfo.decimals);

      const usdcAddress: Address =
        network === "sepolia"
          ? "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
          : "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

      console.log(`[execute] Delegated: ${rec.action} ${swapAmount.toFixed(4)} ${rec.token} via ScopedDelegation`);

      const result = await executeViaDelegate(
        options.delegationContract,
        tokenInfo.address,
        usdcAddress,
        amountWei,
        network
      );

      trades.push({ ...rec, delegationResult: result });

      log.push({
        taskId: `analysis-${startTime}`,
        step: "execute",
        decision: `Delegated execution: ${rec.action} ${swapAmount.toFixed(4)} ${rec.token}. ${result.success ? "Success" : "Failed"}: ${result.txHash || result.error}`,
        toolCalls: ["delegation.executeViaDelegate"],
        inputs: { token: rec.token, amount: swapAmount, percentage: rec.percentage },
        outputs: { success: result.success, txHash: result.txHash, error: result.error },
        retries: 0,
        timestamp: Date.now(),
        outcome: result.success ? "success" : "failure",
        txHash: result.txHash,
      });
    }
  }

  log.push({
    taskId: `analysis-${startTime}`,
    step: "report",
    decision: `Analysis complete. Mode: ${executionMode}. ${trades.length} trade(s) attempted. Elapsed: ${Date.now() - startTime}ms.`,
    toolCalls: [],
    inputs: {},
    outputs: {
      executionMode,
      tradesAttempted: trades.length,
      tradesSucceeded: trades.filter((t) => t.delegationResult?.success).length,
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
    executionMode: options.delegationContract ? "delegated" : "analysis-only",
    delegationStatus,
    timestamp: startTime,
    agentVersion: "3.0.0",
  };
}
