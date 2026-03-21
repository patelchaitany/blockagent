import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";

export interface LogEntry {
  taskId: string;
  step: string;
  decision: string;
  toolCalls: string[];
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  retries: number;
  timestamp: number;
  outcome: string;
  txHash?: string;
}

interface AgentLog {
  agent: string;
  version: string;
  runs: Array<{
    runAt: string;
    computeBudget: number;
    toolCallsUsed: number;
    totalSteps: number;
    log: LogEntry[];
  }>;
}

const LOG_PATH = "agent_log.json";

export async function appendToAgentLog(entries: LogEntry[]): Promise<void> {
  let agentLog: AgentLog;

  if (existsSync(LOG_PATH)) {
    const raw = await readFile(LOG_PATH, "utf-8");
    agentLog = JSON.parse(raw);
  } else {
    agentLog = {
      agent: "BlockAgent",
      version: "1.0.0",
      runs: [],
    };
  }

  const toolCallsUsed = entries.reduce(
    (sum, e) => sum + e.toolCalls.length,
    0
  );

  agentLog.runs.push({
    runAt: new Date().toISOString(),
    computeBudget: 20,
    toolCallsUsed,
    totalSteps: entries.length,
    log: entries,
  });

  await writeFile(LOG_PATH, JSON.stringify(agentLog, null, 2));
}
