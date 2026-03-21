import { config } from "./config.js";
import { fetchPriceHistory, getKnownSymbols } from "./prices.js";
import { executePython } from "./code-executor.js";

interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

interface ChatResponse {
  choices: Array<{
    message: {
      role: string;
      content: string | null;
      tool_calls?: ToolCall[];
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const TOOL_DEFINITIONS = [
  {
    type: "function" as const,
    function: {
      name: "fetch_market_history",
      description:
        "Fetch historical price data (CSV format with date,price columns) for a token from CoinGecko. Use this to get data for statistical analysis.",
      parameters: {
        type: "object",
        properties: {
          symbol: {
            type: "string",
            description: `Token symbol. One of: ${getKnownSymbols().join(", ")}`,
          },
          days: {
            type: "number",
            description: "Number of days of history (7, 14, 30, 90). Default 30.",
          },
        },
        required: ["symbol"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "execute_python",
      description:
        "Execute Python code for statistical analysis. pandas and numpy are available. Print results to stdout. Use this to compute moving averages, volatility, correlations, Sharpe ratios, trend analysis, etc. Do NOT execute any blockchain transactions or trades.",
      parameters: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "Python code to execute. Must print results to stdout.",
          },
        },
        required: ["code"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "submit_analysis",
      description:
        "Submit your final analysis after completing all research and statistical analysis. Call this once you have enough data to produce a comprehensive report.",
      parameters: {
        type: "object",
        properties: {
          riskScore: {
            type: "number",
            description: "Overall risk score from 1 (very safe) to 10 (extremely risky).",
          },
          riskAssessment: {
            type: "string",
            description: "Detailed risk assessment covering concentration, volatility, and market conditions.",
          },
          yieldOpportunities: {
            type: "array",
            items: {
              type: "object",
              properties: {
                protocol: { type: "string" },
                apy: { type: "string" },
                description: { type: "string" },
              },
              required: ["protocol", "apy", "description"],
            },
            description: "Yield opportunities available for the portfolio assets.",
          },
          recommendations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                action: { type: "string", enum: ["buy", "sell", "hold"] },
                token: { type: "string" },
                percentage: { type: "number" },
                rationale: { type: "string" },
              },
              required: ["action", "token", "percentage", "rationale"],
            },
            description: "Specific portfolio recommendations. These are advisory only -- no trades will be executed.",
          },
          summary: {
            type: "string",
            description: "Executive summary of the analysis with key findings from statistical analysis.",
          },
          statisticalFindings: {
            type: "string",
            description: "Key statistical metrics computed (volatility, trends, correlations, etc.).",
          },
        },
        required: [
          "riskScore",
          "riskAssessment",
          "yieldOpportunities",
          "recommendations",
          "summary",
          "statisticalFindings",
        ],
      },
    },
  },
];

const SYSTEM_PROMPT = `You are an advanced private DeFi portfolio analyst with access to tools for live market data and Python-based statistical analysis.

Your workflow:
1. Review the portfolio data provided by the user.
2. Use fetch_market_history to get historical price data for 1-2 key tokens at a time (e.g. ETH first, then one other). Do NOT fetch all tokens at once.
3. Use execute_python to write and run Python code that performs statistical analysis on the fetched data. pandas and numpy are available. Embed the CSV data as a string literal inside your Python code. Examples of what to compute:
   - Moving averages (7-day, 14-day) and trend direction
   - Price volatility (standard deviation of daily returns)
   - Daily returns distribution
   - Support/resistance levels
4. Based on the statistical results, produce your final analysis using submit_analysis.

CRITICAL RULES:
- Fetch price history for at most 2 tokens per tool call. Use days=14 to keep data compact.
- You MUST use execute_python at least once to perform statistical analysis before making recommendations.
- You MUST NOT recommend executing any trades on-chain. All recommendations are advisory only.
- When writing Python code, always print() results to stdout so you can read them.
- Keep Python code concise. Embed small CSV data inline as a multi-line string.
- Be specific with numbers in your analysis. Base recommendations on the statistical evidence you computed.`;

const MAX_ITERATIONS = 10;

async function callLLM(messages: ChatMessage[]): Promise<ChatResponse> {
  const body: Record<string, unknown> = {
    model: config.venice.model,
    messages,
    temperature: 0.3,
    max_tokens: 4000,
    tools: TOOL_DEFINITIONS,
    tool_choice: "auto",
  };

  const res = await fetch(`${config.venice.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.venice.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${config.venice.provider} API error ${res.status}: ${text}`);
  }

  return (await res.json()) as ChatResponse;
}

async function handleToolCall(
  toolCall: ToolCall
): Promise<string> {
  const name = toolCall.function.name;
  let args: Record<string, unknown>;
  try {
    args = JSON.parse(toolCall.function.arguments);
  } catch {
    return `Error: Could not parse arguments: ${toolCall.function.arguments}`;
  }

  switch (name) {
    case "fetch_market_history": {
      const symbol = String(args.symbol ?? "ETH");
      const days = Number(args.days ?? 30);
      console.log(`  [tool] fetch_market_history(${symbol}, ${days}d)`);
      try {
        const csv = await fetchPriceHistory(symbol, days);
        return csv;
      } catch (err) {
        return `Error fetching price history: ${err instanceof Error ? err.message : String(err)}`;
      }
    }

    case "execute_python": {
      const code = String(args.code ?? "");
      console.log(`  [tool] execute_python (${code.split("\n").length} lines)`);
      const result = await executePython(code);
      let output = "";
      if (result.stdout) output += result.stdout;
      if (result.stderr) output += `\nSTDERR: ${result.stderr}`;
      if (result.timedOut) output += "\n[TIMED OUT after 30s]";
      if (!result.success && !output.trim()) output = "Script failed with no output.";
      return output || "(no output)";
    }

    case "submit_analysis": {
      console.log("  [tool] submit_analysis");
      return JSON.stringify(args);
    }

    default:
      return `Unknown tool: ${name}`;
  }
}

export interface ValidationWarning {
  field: string;
  issue: string;
  corrected: boolean;
}

export interface AgenticAnalysisResult {
  analysis: string;
  parsed: Record<string, unknown> | null;
  tokensUsed: number;
  model: string;
  toolCallCount: number;
  pythonExecutions: number;
  validationWarnings: ValidationWarning[];
}

function validateAnalysis(
  parsed: Record<string, unknown>
): { sanitized: Record<string, unknown>; warnings: ValidationWarning[] } {
  const warnings: ValidationWarning[] = [];
  const sanitized = { ...parsed };

  const riskScore = Number(sanitized["riskScore"]);
  if (isNaN(riskScore) || riskScore < 1 || riskScore > 10) {
    warnings.push({
      field: "riskScore",
      issue: `Value ${sanitized["riskScore"]} out of range [1-10], clamped`,
      corrected: true,
    });
    sanitized["riskScore"] = Math.max(1, Math.min(10, isNaN(riskScore) ? 5 : Math.round(riskScore)));
  }

  const recs = sanitized["recommendations"];
  if (Array.isArray(recs)) {
    const validActions = new Set(["buy", "sell", "hold"]);
    const cleaned = recs.map((rec: Record<string, unknown>, i: number) => {
      const action = String(rec.action ?? "hold").toLowerCase();
      if (!validActions.has(action)) {
        warnings.push({
          field: `recommendations[${i}].action`,
          issue: `Invalid action "${rec.action}", defaulted to "hold"`,
          corrected: true,
        });
        rec = { ...rec, action: "hold" };
      }

      const pct = Number(rec.percentage);
      if (isNaN(pct) || pct < 0 || pct > 100) {
        warnings.push({
          field: `recommendations[${i}].percentage`,
          issue: `Value ${rec.percentage} out of range [0-100], clamped`,
          corrected: true,
        });
        rec = { ...rec, percentage: Math.max(0, Math.min(100, isNaN(pct) ? 0 : pct)) };
      }

      if (pct > 10 && (action === "buy" || action === "sell")) {
        warnings.push({
          field: `recommendations[${i}].percentage`,
          issue: `${action.toUpperCase()} ${pct}% exceeds 10% safety limit, capped at 10%`,
          corrected: true,
        });
        rec = { ...rec, percentage: 10 };
      }

      return rec;
    });
    sanitized["recommendations"] = cleaned;
  }

  if (warnings.length > 0) {
    console.log(`[validation] ${warnings.length} issue(s) corrected in LLM output`);
    for (const w of warnings) {
      console.log(`  - ${w.field}: ${w.issue}`);
    }
  }

  return { sanitized, warnings };
}

export async function analyzePortfolio(
  portfolioData: string
): Promise<AgenticAnalysisResult> {
  const provider = config.venice.provider;
  const isVenice = provider === "venice";
  console.log(
    `[inference] Using ${provider} (${config.venice.model})${isVenice ? " — zero data retention" : ""}`
  );
  console.log("[agent] Starting agentic analysis loop...");

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: portfolioData },
  ];

  let totalTokens = 0;
  let toolCallCount = 0;
  let pythonExecutions = 0;
  let finalAnalysis: Record<string, unknown> | null = null;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    console.log(`[agent] Iteration ${i + 1}/${MAX_ITERATIONS}`);

    const response = await callLLM(messages);
    totalTokens += response.usage?.total_tokens ?? 0;

    const choice = response.choices[0];
    if (!choice) {
      console.log("[agent] No response from LLM, ending loop.");
      break;
    }

    const assistantMsg = choice.message;

    if (assistantMsg.tool_calls && assistantMsg.tool_calls.length > 0) {
      messages.push({
        role: "assistant",
        content: assistantMsg.content,
        tool_calls: assistantMsg.tool_calls,
      });

      for (const tc of assistantMsg.tool_calls) {
        toolCallCount++;
        const result = await handleToolCall(tc);

        if (tc.function.name === "execute_python") pythonExecutions++;

        if (tc.function.name === "submit_analysis") {
          try {
            finalAnalysis = JSON.parse(result);
          } catch {
            finalAnalysis = null;
          }
        }

        messages.push({
          role: "tool",
          content: result,
          tool_call_id: tc.id,
        });
      }

      if (finalAnalysis) {
        console.log("[agent] Analysis submitted. Loop complete.");
        break;
      }
    } else {
      if (assistantMsg.content) {
        messages.push({ role: "assistant", content: assistantMsg.content });

        try {
          const jsonMatch = assistantMsg.content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            finalAnalysis = JSON.parse(jsonMatch[0]);
            console.log("[agent] Final analysis received in text. Loop complete.");
            break;
          }
        } catch {
          // not JSON, continue
        }
      }

      if (choice.finish_reason === "stop") {
        console.log("[agent] LLM finished without calling submit_analysis.");
        break;
      }
    }
  }

  let validationWarnings: ValidationWarning[] = [];
  if (finalAnalysis) {
    const { sanitized, warnings } = validateAnalysis(finalAnalysis);
    finalAnalysis = sanitized;
    validationWarnings = warnings;
  }

  const analysisText = finalAnalysis
    ? JSON.stringify(finalAnalysis, null, 2)
    : messages
        .filter((m) => m.role === "assistant" && m.content)
        .map((m) => m.content)
        .join("\n");

  return {
    analysis: analysisText,
    parsed: finalAnalysis,
    tokensUsed: totalTokens,
    model: config.venice.model,
    toolCallCount,
    pythonExecutions,
    validationWarnings,
  };
}
