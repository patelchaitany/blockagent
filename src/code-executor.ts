import { spawn } from "child_process";
import { tmpdir } from "os";
import { mkdtempSync } from "fs";
import { join } from "path";

const TIMEOUT_MS = 30_000;
const MAX_OUTPUT_BYTES = 50_000;

const BLOCKED_PATTERNS = [
  /\bos\.environ\b/,
  /\bos\.getenv\b/,
  /\bos\.system\b/,
  /\bsubprocess\b/,
  /\bshutil\b/,
  /\b__import__\b/,
  /\bopen\s*\(\s*['"]/,
  /\.env/,
  /WALLET_PRIVATE_KEY/,
  /VENICE_API_KEY/,
  /LLM_API_KEY/,
  /UNISWAP_API_KEY/,
];

const SANDBOX_PREAMBLE = `
import sys as _sys

class _BlockImports:
    _BLOCKED = frozenset({
        'os', 'subprocess', 'shutil', 'socket', 'http', 'urllib',
        'requests', 'importlib', 'ctypes', 'pathlib', 'io',
        'signal', 'multiprocessing', 'threading', 'asyncio',
        'webbrowser', 'ftplib', 'smtplib', 'xmlrpc',
    })
    def find_module(self, name, path=None):
        if name.split('.')[0] in self._BLOCKED:
            return self
        return None
    def load_module(self, name):
        raise ImportError(f"Module '{name}' is blocked in sandbox")

_sys.meta_path.insert(0, _BlockImports())

del _sys.modules['os']  # remove os if already imported by site.py
import builtins as _builtins
_orig_import = _builtins.__import__
def _safe_import(name, *args, **kwargs):
    if name.split('.')[0] in _BlockImports._BLOCKED:
        raise ImportError(f"Module '{name}' is blocked in sandbox")
    return _orig_import(name, *args, **kwargs)
_builtins.__import__ = _safe_import
del _builtins, _orig_import, _safe_import, _BlockImports, _sys
`;

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  success: boolean;
  timedOut: boolean;
}

export async function executePython(code: string): Promise<ExecutionResult> {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(code)) {
      return {
        stdout: "",
        stderr: `Blocked: code contains disallowed pattern "${pattern.source}". Python execution is sandboxed for statistical analysis only.`,
        success: false,
        timedOut: false,
      };
    }
  }

  const sandboxDir = mkdtempSync(join(tmpdir(), "blockagent-py-"));

  const sandboxEnv: Record<string, string> = {
    PATH: process.env.PATH || "/usr/bin:/usr/local/bin",
    HOME: sandboxDir,
    TMPDIR: sandboxDir,
    PYTHONIOENCODING: "utf-8",
    PYTHONDONTWRITEBYTECODE: "1",
  };

  const sandboxedCode = SANDBOX_PREAMBLE + code;

  return new Promise((resolve) => {
    const proc = spawn("python3", ["-u", "-c", sandboxedCode], {
      timeout: TIMEOUT_MS,
      env: sandboxEnv,
      cwd: sandboxDir,
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
