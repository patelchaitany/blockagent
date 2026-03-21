import { spawn } from "child_process";

const TIMEOUT_MS = 30_000;
const MAX_OUTPUT_BYTES = 50_000;

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  success: boolean;
  timedOut: boolean;
}

export async function executePython(code: string): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    const proc = spawn("python3", ["-u", "-c", code], {
      timeout: TIMEOUT_MS,
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let timedOut = false;

    proc.stdout.on("data", (chunk: Buffer) => {
      if (stdout.length < MAX_OUTPUT_BYTES) {
        stdout += chunk.toString("utf-8");
      }
    });

    proc.stderr.on("data", (chunk: Buffer) => {
      if (stderr.length < MAX_OUTPUT_BYTES) {
        stderr += chunk.toString("utf-8");
      }
    });

    proc.on("error", (err) => {
      resolve({
        stdout,
        stderr: stderr || err.message,
        success: false,
        timedOut: false,
      });
    });

    proc.on("close", (exitCode, signal) => {
      if (signal === "SIGTERM") timedOut = true;
      resolve({
        stdout: stdout.slice(0, MAX_OUTPUT_BYTES),
        stderr: stderr.slice(0, MAX_OUTPUT_BYTES),
        success: exitCode === 0,
        timedOut,
      });
    });
  });
}
