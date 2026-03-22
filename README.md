# BlockAgent — Private DeFi Advisory Agent

An agentic AI that privately analyzes DeFi portfolios using live market data and Python-based statistical analysis, with optional trade execution via on-chain spending limits.

## The Problem

Every time you ask an AI to analyze your crypto portfolio, your positions are logged by the inference provider. Traders, competitors, and front-runners can exploit this data. A $2M ETH holder asking "should I sell?" on ChatGPT just broadcast their intent to OpenAI's servers.

A second problem: when AI agents *can* execute trades, they hold raw private keys in `.env` files. One hallucination, one prompt injection, one dependency vulnerability — and the wallet is drained.

## The Solution

BlockAgent separates intelligence from authority:

- **Private intelligence:** Venice AI analyzes your portfolio with zero data retention. Your positions are never stored, logged, or used for training.
- **Statistical grounding:** The AI writes and executes Python code (pandas/numpy) to compute volatility, Sharpe ratios, moving average crossovers, maximum drawdowns, and correlation matrices from live CoinGecko data — every recommendation cites the metric that supports it.
- **Safe execution:** If trade execution is enabled, it goes through a `ScopedDelegation` smart contract (inspired by ERC-7715). The agent gets a session key with zero standalone value. All authority is enforced on-chain: per-transaction caps, daily limits, token whitelists, expiry, instant revocation.

---

## Architecture

### Analysis Flow (Default — No Keys Required)

```
User
 │
 │  npm run analyze 0xWallet sepolia
 │  (or POST /analyze)
 ▼
┌─────────────────────────────────────────────────┐
│  BlockAgent                                      │
│                                                  │
│  1. DISCOVER                                     │
│     viem multicall → ETH + ERC-20 balances       │
│     CoinGecko API → live prices + 24h change     │
│                                                  │
│  2. ANALYZE (agentic loop, up to 10 iterations)  │
│     LLM decides which tools to call:             │
│     ├─ fetch_market_history → price CSV          │
│     ├─ execute_python → pandas/numpy stats       │
│     └─ submit_analysis → structured JSON         │
│                                                  │
│  3. VALIDATE (deterministic safety layer)        │
│     riskScore [1-10], percentage [0-100]          │
│     max 10% per trade recommendation             │
│                                                  │
│  4. REPORT                                       │
│     Return JSON + log to agent_log.json          │
└─────────────────────────────────────────────────┘

No private keys. No trade execution. Read-only.
```

### Delegated Execution Flow (Optional)

```
User Wallet                 ScopedDelegation Contract          Agent Session Key
    │                              │                                │
    │  1. Deploy contract with:    │                                │
    │     - agent address          │                                │
    │     - max $100/tx            │                                │
    │     - $500/day limit         │                                │
    │     - USDC + WETH only       │                                │
    │     - expires in 7 days      │                                │
    ├─────────────────────────────▶│                                │
    │                              │                                │
    │  2. approve(token, contract) │                                │
    ├─────────────────────────────▶│                                │
    │                              │                                │
    │                              │  3. Agent analyzes portfolio   │
    │                              │     validates LLM output       │
    │                              │     calls executeAction()      │
    │                              │◀────────────────────────────────┤
    │                              │                                │
    │                              │  4. Contract checks:           │
    │                              │     ✓ caller is delegate?      │
    │                              │     ✓ token whitelisted?       │
    │                              │     ✓ target whitelisted?      │
    │                              │     ✓ amount ≤ maxPerTx?       │
    │                              │     ✓ daily limit not exceeded? │
    │                              │     ✓ not expired?             │
    │                              │                                │
    │                              │  5. transferFrom(user, target) │
    │                              ├───────────────────────────────▶│
    │                              │                                │
    │  User can revoke() anytime   │                                │
    ├─────────────────────────────▶│                                │
```

The agent's session key has zero value on its own. If compromised, the attacker can only spend within the contract's limits until the user calls `revoke()`.

---

## Security Model

### How Each Flaw Is Addressed

| Flaw | Risk | Mitigation |
|------|------|-----------|
| **Private key in .env** | Wallet drain on compromise | No private key required for analysis. Delegated mode uses a session key with zero standalone value — all authority enforced by ScopedDelegation contract |
| **Uniswap API leaks intent** | Front-running, MEV extraction | Swap calldata built locally from on-chain pool reads — no centralized API quote call. On-chain submission MEV-shielded via `PRIVATE_RPC_URL` (Flashbots Protect / MEV Blocker) |
| **LLM hallucination** | Bad trade, malformed JSON | Deterministic `validateAnalysis()` layer: clamps riskScore to [1-10], caps trade percentage at 10%, validates action types. On-chain contract enforces spending limits as a second barrier |
| **x402 self-payment** | Confusing trust model | x402 is for agent-to-agent commerce only. When BlockAgent runs as a public service, other agents pay per-request. Users running locally use the free CLI or `/analyze` endpoint |

### Defense in Depth

```
LLM Output
    │
    ▼
[Validation Layer - TypeScript]
    riskScore ∈ [1-10]
    action ∈ {buy, sell, hold}
    percentage ∈ [0-100]
    max trade % configurable (default 10%, set MAX_TRADE_PERCENT)
    │
    ▼
[ScopedDelegation - Solidity]
    maxAmountPerTx (user-defined at deploy)
    dailyLimit (user-defined at deploy)
    allowedTokens[] (user-defined at deploy)
    allowedTargets[] (user-defined at deploy)
    expiryTimestamp (user-defined at deploy)
    revoke() (instant, anytime)
    │
    ▼
Execution (or rejection)
```

Two independent safety layers with user-configurable limits at every level. The TypeScript layer catches hallucinations (trade cap adjustable via `MAX_TRADE_PERCENT` env var). The Solidity layer enforces spending limits on-chain even if the TypeScript layer is bypassed — and those limits are set by the user when they deploy the ScopedDelegation contract, not hardcoded by the agent.

### Python Execution Sandbox

The LLM writes Python code for statistical analysis. Three layers prevent that code from accessing secrets:

1. **Python import hook (inner layer):** A `sys.meta_path` hook blocks `import os`, `import subprocess`, `import socket`, `import http`, and 14 other dangerous modules at the Python interpreter level. Also patches `builtins.__import__` to catch `__import__('os')`. This runs inside Python's import machinery and cannot be bypassed by `getattr` or string concatenation on module names.

2. **Stripped environment (middle layer):** The subprocess gets only `PATH`, `HOME=/tmp`, and encoding vars. Even if the import hook is somehow bypassed, there are no secrets in the process environment to read. Working directory is an isolated `/tmp` subdirectory.

3. **Regex fast-reject (outer layer):** Source text is scanned for `os.environ`, `subprocess`, `open('...')`, `.env`, and secret variable names before the code reaches Python at all. This is a speed bump — bypassable by obfuscation — but catches the obvious cases cheaply.

**Timeout:** 30 seconds max, output capped at 50KB.

**Honest assessment:** Layers 1 and 2 are solid against realistic attacks. The import hook blocks the actual Python import machinery, not just the text. The stripped env means there's nothing to steal even if all code-level defenses fail. For production deployments where the host operator is untrusted, the EigenCompute TEE is the primary shield: the subprocess runs inside the enclave where the host cannot tamper with any layer.

### Why EigenCompute (TEE) Still Matters

With ScopedDelegation enforcing limits on-chain, the session key alone has limited blast radius. But a compromised *host operator* could tamper with the TypeScript validation layer — disabling the 10% cap or rewriting the trade parameters before they reach the contract.

Running BlockAgent inside an EigenCompute TEE closes this gap:

```
┌──────────────── TEE (EigenCompute) ────────────────┐
│                                                     │
│  TypeScript validation layer (tamper-proof)         │
│  Python sandbox (isolated from host secrets)        │
│  Session key (sealed inside enclave)                │
│                                                     │
│  Attestation: cryptographic proof that this exact   │
│  code version ran unmodified                        │
│                                                     │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
              ScopedDelegation Contract
              (on-chain enforcement)
```

The TEE guarantees that the validation layer was not tampered with, and the ScopedDelegation contract guarantees that even a compromised TEE can only spend within the user's configured limits. Neither trust assumption is sufficient alone — together they provide defense in depth.

---

## Limitations and Transparency

This section exists because honesty matters more than marketing.

1. **Inference is private, but data reads are public.** The portfolio data comes from public blockchain state. Anyone can see what tokens a wallet holds. Venice AI ensures the *analysis* of that data is private.

2. **CoinGecko queries are not private.** When the agent fetches price history, CoinGecko sees which tokens are queried (but not which wallet is being analyzed).

3. **Swap routing is now fully local.** Swap calldata is built locally by reading on-chain pool state (Uniswap V3 `slot0`) and encoding `exactInputSingle` with viem — no centralized Uniswap API quote call. Combined with `PRIVATE_RPC_URL` (Flashbots Protect / MEV Blocker), both the routing and on-chain submission are private. The only remaining leak is the on-chain transaction itself, which is inherent to any public blockchain execution.

4. **LLM statistical analysis is not financial advice.** The Python code the AI writes computes real metrics from real data, but the interpretation and recommendations come from a language model. Use at your own risk.

5. **Token prices use CoinGecko free tier.** Rate limits apply. Falls back to hardcoded prices if CoinGecko is unavailable.

6. **Python sandbox is defense-in-depth, not OS-level isolation.** Three layers protect the sandbox: a Python import hook that blocks dangerous modules at the interpreter level, a stripped environment with no secrets, and regex fast-reject for obvious patterns. The import hook and stripped env are robust against realistic attacks. For full isolation against a compromised host, the EigenCompute TEE provides OS-level protection.

7. **The validation trade cap is a UX trade-off.** The default 10% max trade per recommendation can frustrate users rebalancing quickly. This is configurable: set `MAX_TRADE_PERCENT` in `.env` (e.g., `MAX_TRADE_PERCENT=25`). The ScopedDelegation contract provides the hard ceiling regardless of what the TypeScript layer allows.

---

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3 with pandas and numpy (`pip install pandas numpy`)
- An LLM API key: Venice AI or Groq (free)

### Setup

```bash
git clone https://github.com/patelchaitany/blockagent
cd blockagent
npm install
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your LLM API key
```

### Run Analysis (No Private Key Needed)

```bash
# Analyze any wallet — reads public chain data only
npm run analyze 0xAnyWalletAddress sepolia
npm run analyze 0xAnyWalletAddress mainnet
```

### Run as a Server

```bash
npm run dev    # development
npm run build && npm start   # production
```

### API Endpoints

**POST /analyze** — Free portfolio analysis

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{"wallet": "0xYourAddress", "network": "sepolia"}'
```

**POST /analyze/paid** — Agent-to-agent commerce via x402 (1 USDC)

Other AI agents can discover and pay BlockAgent for analysis. End users use the free endpoint or CLI.

**GET /.well-known/agent.json** — ERC-8004 agent identity card

Returns the agent's on-chain identity, capabilities, safety guardrails, and supported tools. Used by other agents for discovery and trust verification.

**GET /agent_log.json** — Structured execution log

Every analysis run is logged with tool calls, decisions, and outcomes for full auditability.

### Enable Delegated Execution (Optional)

One command deploys the ScopedDelegation contract with safe defaults ($100/tx max, $500/day, 7-day expiry):

```bash
npm run deploy:delegation -- --network sepolia
```

Customize limits:

```bash
npm run deploy:delegation -- \
  --max-per-tx 50    \
  --daily-limit 200  \
  --expiry 3d        \
  --network sepolia
```

The script prints the `DELEGATION_CONTRACT=0x...` line to paste into `.env`. No Hardhat or Foundry needed — the compiled bytecode is embedded in the CLI.

For MEV protection on mainnet, add `PRIVATE_RPC_URL=https://rpc.flashbots.net` to `.env`. This routes transaction submission through a private mempool, shielding on-chain execution from front-runners.

### Live Demo

The agent is deployed at:

**https://blockagent-production.up.railway.app**

```bash
# Health check
curl https://blockagent-production.up.railway.app/health

# Demo analysis (returns sample response showing exact output format)
curl -X POST https://blockagent-production.up.railway.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"wallet": "0x3c7350E31bfB6bbEc87d7642cBF2AbB7bBDf3d7d", "network": "mainnet"}'
```

### Docker

```bash
docker build -t blockagent .
docker run -p 3000:3000 --env-file .env blockagent
```

---

## Target Tracks

| Track | Sponsor |
|-------|---------|
| Private Agents, Trusted Actions | Venice |
| Best Use of EigenCompute | EigenCloud |
| Agentic Finance (Uniswap API) | Uniswap |
| Agent Services on Base | Base |
| Let the Agent Cook | Protocol Labs |
| Agents With Receipts — ERC-8004 | Protocol Labs |
| Synthesis Open Track | Community |
| Status Network Gasless | Status |

## Tech Stack

- **TypeScript** / Node.js — agent runtime
- **Python** (pandas, numpy) — statistical analysis
- **Solidity** — ScopedDelegation contract
- **viem** — onchain data reading
- **Venice AI** — private inference (OpenAI-compatible)
- **CoinGecko** — live market data
- **x402** — agent-to-agent payment protocol
- **ERC-8004** — onchain agent identity

## License

MIT
