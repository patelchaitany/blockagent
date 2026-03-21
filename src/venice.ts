import { config } from "./config.js";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface VeniceResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const SYSTEM_PROMPT = `You are a private DeFi portfolio analyst. You receive portfolio data and produce structured, actionable analysis.

Your analysis must include:
1. RISK ASSESSMENT: Concentration risk, protocol exposure, chain risk
2. YIELD OPPORTUNITIES: Where idle capital could earn yield
3. REBALANCING RECOMMENDATIONS: Specific trades with amounts and rationale
4. RISK SCORE: 1-10 (1=very safe, 10=extremely risky)

Always respond in valid JSON with this schema:
{
  "riskScore": number,
  "riskAssessment": string,
  "yieldOpportunities": [{ "protocol": string, "apy": string, "description": string }],
  "recommendations": [{ "action": "buy" | "sell" | "hold", "token": string, "percentage": number, "rationale": string }],
  "summary": string
}

Be specific with numbers. Be direct. No hedging.`;

export async function analyzePortfolio(portfolioData: string): Promise<{
  analysis: string;
  parsed: Record<string, unknown> | null;
  tokensUsed: number;
  model: string;
}> {
  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: portfolioData },
  ];

  const provider = config.venice.provider;
  const isVenice = provider === "venice";
  console.log(
    `[inference] Using ${provider} (${config.venice.model})${isVenice ? " — zero data retention" : ""}`
  );

  const response = await fetch(`${config.venice.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.venice.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.venice.model,
      messages,
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${provider} API error ${response.status}: ${errorText}`);
  }

  const data = (await response.json()) as VeniceResponse;
  const content = data.choices[0]?.message?.content || "";

  let parsed: Record<string, unknown> | null = null;
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    }
  } catch {
    // analysis returned non-JSON; keep raw text
  }

  return {
    analysis: content,
    parsed,
    tokensUsed: data.usage?.total_tokens || 0,
    model: config.venice.model,
  };
}

export async function getTradeRecommendation(
  portfolio: string,
  targetAction: string
): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "You are a DeFi trading assistant. Given a portfolio and a requested action, output the exact swap parameters needed. Respond with JSON: { tokenIn, tokenOut, amountIn, chainId, rationale }",
    },
    {
      role: "user",
      content: `Portfolio:\n${portfolio}\n\nRequested action: ${targetAction}`,
    },
  ];

  const response = await fetch(`${config.venice.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.venice.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.venice.model,
      messages,
      temperature: 0.1,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`Venice API error ${response.status}`);
  }

  const data = (await response.json()) as VeniceResponse;
  return data.choices[0]?.message?.content || "";
}
