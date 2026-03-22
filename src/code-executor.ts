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
import pandas as pd
import numpy as np
import math, statistics, json, csv, datetime, collections, itertools, functools, re

import sys as _sys, builtins as _builtins

_DENY = frozenset({'subprocess', 'shutil', 'socket', 'http', 'urllib',
    'requests', 'ctypes', 'webbrowser', 'ftplib', 'smtplib', 'xmlrpc'})
_ALLOWED = frozenset(k.split('.')[0] for k in _sys.modules.keys()) - _DENY

_orig_import = _builtins.__import__
def _safe_import(name, *args, _a=_ALLOWED, _oi=_orig_import, **kwargs):
    top = name.split('.')[0]
    if top in _a:
        return _oi(name, *args, **kwargs)
    raise ImportError(f"Module '{name}' is blocked in sandbox")
_builtins.__import__ = _safe_import
del _DENY, _ALLOWED, _orig_import, _safe_import, _builtins, _sys
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
