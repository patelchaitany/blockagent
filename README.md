# BlockAgent — Private DeFi Advisory Agent

An agentic AI that privately analyzes DeFi portfolios using live market data and Python-based statistical analysis, with optional trade execution via on-chain spending limits.

## The Problem

Every time you ask an AI to analyze your crypto portfolio, your positions are logged by the inference provider. Traders, competitors, and front-runners can exploit this data. A $2M ETH holder asking "should I sell?" on ChatGPT just broadcast their intent to OpenAI's servers.

A second problem: when AI agents *can* execute trades, they hold raw private keys in `.env` files. One hallucination, one prompt injection, one dependency vulnerability — and the wallet is drained.

## The Solution

BlockAgent separates intelligence from authority:

- **Private intelligence:** Venice AI analyzes your portfolio with zero data retention. Your positions are never stored, logged, or used for training.
- **Statistical grounding:** The AI writes and executes Python code (pandas/numpy) to compute moving averages, volatility, and trends from live CoinGecko data — not guessing from training data.
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
| **Uniswap API leaks intent** | Front-running, MEV extraction | Analysis mode never calls Uniswap. If delegated execution is enabled, routing via Uniswap API does expose intent — this is documented as a known limitation |
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

The LLM writes Python code for statistical analysis. That code runs in a sandboxed subprocess:

- **Stripped environment:** The subprocess gets only `PATH`, `HOME=/tmp`, and Python encoding vars. No access to `WALLET_PRIVATE_KEY`, `VENICE_API_KEY`, or any `.env` variables.
- **Working directory:** Isolated `/tmp` directory, not the project root.
- **Pattern blocking:** Code containing `os.environ`, `subprocess`, `open('...')`, `__import__`, or references to secret variable names is rejected before execution.
- **Timeout:** 30 seconds max, output capped at 50KB.

**Honest assessment:** The pattern blocking is regex-based and bypassable by a sufficiently clever obfuscation (e.g., `getattr`, string concatenation). It catches accidental leakage and naive attacks, not a determined adversary. The real protection comes from the stripped environment — even if the regex is bypassed, there are no secrets in the subprocess's env vars to read. For production deployments, the EigenCompute TEE is the primary shield: the Python subprocess runs inside the enclave where the host operator cannot inspect or modify the environment.

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

3. **Uniswap routing exposes trade intent.** If delegated execution is enabled, the Uniswap API receives the swap parameters before execution. This is the Achilles' heel — private inference does not mean private execution. A $2M holder prepping a trade via the agent could still be front-run at the routing layer. **Mitigation path:** Use a private RPC (e.g., Flashbots Protect, MEV Blocker) to submit the final transaction, bypassing the public mempool. The Uniswap API call for quote/routing still leaks intent to Uniswap's servers, but the on-chain execution would be shielded from MEV bots. This is not yet implemented — it is a known next step.

4. **LLM statistical analysis is not financial advice.** The Python code the AI writes computes real metrics from real data, but the interpretation and recommendations come from a language model. Use at your own risk.

5. **Token prices use CoinGecko free tier.** Rate limits apply. Falls back to hardcoded prices if CoinGecko is unavailable.

6. **Python sandbox is best-effort, not OS-level.** The regex pattern blocking is bypassable by obfuscation (e.g., `getattr(os, 'environ')`). The real protection is the stripped environment (no secrets available) and, in production, the EigenCompute TEE enclave. The regex is a speed bump, not a wall.

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

### Enable Delegated Execution (Optional)

1. Deploy `ScopedDelegation.sol` to Base Sepolia with your limits
2. Set `DELEGATION_CONTRACT`, `WALLET_PRIVATE_KEY` (agent session key), and `UNISWAP_API_KEY` in `.env`
3. Run analysis — the agent will execute validated trades through the contract

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
