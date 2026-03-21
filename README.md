# BlockAgent — Private DeFi Advisory Agent

A self-sovereign AI agent that privately analyzes DeFi portfolios and executes real token swaps, with verifiable execution guarantees.

## The Problem

Every time you ask an AI to analyze your crypto portfolio, your positions are logged by the inference provider. Traders, competitors, and front-runners can exploit this data. A $2M ETH holder asking "should I sell?" on ChatGPT just broadcast their intent to OpenAI's servers.

## The Solution

BlockAgent uses **Venice AI** for zero-retention inference — your portfolio data is analyzed and immediately forgotten. No logs. No storage. No training. Combined with **Uniswap** for real swap execution and **EigenCompute TEE** for verifiable computation, this is the first DeFi advisor that keeps your strategy confidential.

---

## System Architecture

### High-Level Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          TRUST BOUNDARY (TEE)                           │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                                                                    │  │
│  │   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐   │  │
│  │   │ Discover │───▶│ Analyze  │───▶│Recommend │───▶│ Execute  │   │  │
│  │   │          │    │          │    │          │    │          │   │  │
│  │   │ On-chain │    │ Venice   │    │  Parse   │    │ Uniswap  │   │  │
│  │   │ Reader   │    │ Private  │    │  JSON    │    │ Swaps    │   │  │
│  │   └────┬─────┘    └────┬─────┘    └──────────┘    └────┬─────┘   │  │
│  │        │               │                               │         │  │
│  │        ▼               ▼                               ▼         │  │
│  │   ┌──────────────────────────────────────────────────────────┐   │  │
│  │   │                    Report + Log                          │   │  │
│  │   │            agent_log.json (audit trail)                 │   │  │
│  │   └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                    │  │
│  │                  BlockAgent (Node.js / TypeScript)                 │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│                EigenCompute TEE — cryptographic proof of execution        │
└──────────────────────────────────────────────────────────────────────────┘
```

### Data Flow & Privacy Boundaries

```
                    ┌─────────────────┐
                    │  User / Agent   │
                    │                 │
                    │  "Analyze my    │
                    │   portfolio"    │
                    └────────┬────────┘
                             │
                   POST /analyze + x402 payment
                             │
                             ▼
              ┌──────────────────────────────┐
              │     HTTP Server (index.ts)    │
              │                              │
              │  • Validate request          │
              │  • Check x402 payment        │
              │  • Route to agent            │
              └──────────────┬───────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌─────────────────┐ ┌────────────────┐ ┌─────────────────┐
│   BASE CHAIN    │ │   VENICE AI    │ │  UNISWAP API    │
│   (public)      │ │   (private)    │ │  (execution)    │
│                 │ │                │ │                 │
│ • ETH balance   │ │ • Zero data    │ │ • Swap quotes   │
│ • ERC-20 tokens │ │   retention    │ │ • Route calc    │
│ • viem multicall│ │ • No logging   │ │ • Tx calldata   │
│                 │ │ • Ephemeral    │ │ • Sign + send   │
│  portfolio.ts   │ │  venice.ts     │ │  uniswap.ts     │
└─────────────────┘ └────────────────┘ └─────────────────┘

         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │   Structured JSON Response   │
              │                              │
              │  • Risk score (1-10)         │
              │  • Yield opportunities       │
              │  • Trade recommendations     │
              │  • Executed tx hashes        │
              │  • Audit log entry           │
              └──────────────────────────────┘
```

### Component Architecture

```
blockagent/
│
├── src/
│   ├── config.ts          ─── Environment & API key management
│   │                          Supports Venice + any OpenAI-compatible fallback
│   │
│   ├── portfolio.ts       ─── On-chain Data Layer
│   │                          viem multicall → ETH + ERC-20 balances
│   │                          Token price mapping → USD values
│   │                          Allocation % calculator
│   │
│   ├── venice.ts          ─── Private Inference Layer
│   │                          OpenAI-compatible chat completions
│   │                          System prompt: DeFi analyst persona
│   │                          Structured JSON output parsing
│   │                          Swappable: Venice / Groq / OpenAI
│   │
│   ├── uniswap.ts         ─── Swap Execution Layer
│   │                          Quote API → best route + price
│   │                          Sign with wallet private key
│   │                          Broadcast → Base chain
│   │                          Return tx hash + explorer link
│   │
│   ├── agent.ts           ─── Orchestration Layer
│   │                          discover → analyze → recommend → execute → report
│   │                          Coordinates all other modules
│   │                          Manages the agent decision loop
│   │
│   ├── logger.ts          ─── Audit Layer
│   │                          Append-only agent_log.json
│   │                          Every step: inputs, outputs, decisions
│   │                          Protocol Labs compliance
│   │
│   ├── index.ts           ─── HTTP Server
│   │                          GET  /health
│   │                          POST /analyze        (free tier)
│   │                          POST /analyze/paid   (x402 gated)
│   │
│   ├── cli.ts             ─── CLI Interface
│   │                          npm run analyze <addr> <network> [--execute]
│   │
│   └── deploy-status.ts   ─── Status Network Deployer
│                              Gasless contract deployment (gasPrice: 0)
│
├── contracts/
│   └── AgentRegistry.sol  ─── On-chain Agent Identity
│                              register() + attest() + events
│
├── agent.json             ─── Agent Manifest (ERC-8004 / Protocol Labs)
├── Dockerfile             ─── EigenCompute TEE packaging
└── agent_log.json         ─── Runtime audit trail (auto-generated)
```

### Privacy Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                     PRIVACY LAYERS                              │
│                                                                │
│  Layer 1: INFERENCE                                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Venice AI — Private Tier                                │  │
│  │                                                          │  │
│  │  • Prompts are NOT stored, logged, or used for training  │  │
│  │  • Data exists only during request lifecycle             │  │
│  │  • No third party observes which portfolios are analyzed │  │
│  │  • Model: Llama 3.3 70B (open-source weights)           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Layer 2: EXECUTION                                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  EigenCompute TEE (Trusted Execution Environment)        │  │
│  │                                                          │  │
│  │  • Code runs in hardware-isolated enclave                │  │
│  │  • Cryptographic attestation of correct execution        │  │
│  │  • Even the host operator cannot see the data            │  │
│  │  • Docker container → verifiable compute proof           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Layer 3: TRANSPORT                                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  x402 Payment Protocol                                   │  │
│  │                                                          │  │
│  │  • No accounts, no signup, no identity required          │  │
│  │  • Pay-per-request with USDC                             │  │
│  │  • Machine-to-machine commerce                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Layer 4: IDENTITY                                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ERC-8004 On-chain Agent Identity                        │  │
│  │                                                          │  │
│  │  • Verifiable agent registration on Base                 │  │
│  │  • Every action attested on-chain                        │  │
│  │  • Auditable decision trail via agent_log.json           │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### Agent Decision Loop

```
    ┌─────────┐
    │  START  │
    └────┬────┘
         │
         ▼
    ┌─────────┐     viem multicall        ┌──────────────┐
    │DISCOVER │────────────────────────── │  Base Chain   │
    │         │     ETH + ERC-20 balances  │  (Sepolia /  │
    └────┬────┘                            │   Mainnet)   │
         │                                 └──────────────┘
         │  portfolio snapshot
         ▼
    ┌─────────┐     chat/completions       ┌──────────────┐
    │ ANALYZE │────────────────────────── │  Venice AI   │
    │         │     structured JSON        │  (private,   │
    └────┬────┘                            │   ephemeral) │
         │                                 └──────────────┘
         │  risk score + recommendations
         ▼
    ┌──────────┐
    │RECOMMEND │    Parse JSON response
    │          │    Extract: buy/sell/hold actions
    └────┬─────┘    with token, %, rationale
         │
         │  if autoExecute = true
         ▼
    ┌─────────┐     quote → sign → send    ┌──────────────┐
    │ EXECUTE │────────────────────────── │ Uniswap API  │
    │         │     tx hash + receipt      │ + Base Chain  │
    └────┬────┘                            └──────────────┘
         │
         │  results + tx hashes
         ▼
    ┌─────────┐     append to file         ┌──────────────┐
    │ REPORT  │────────────────────────── │agent_log.json│
    │         │     audit trail            │ (append-only)│
    └────┬────┘                            └──────────────┘
         │
         ▼
    ┌─────────┐
    │   END   │    Return JSON to caller
    └─────────┘
```

### Integration Map

```
┌─────────────────────────────────────────────────────────────────┐
│                        BlockAgent                                │
│                                                                 │
│                    ┌──────────────┐                              │
│                    │  agent.ts    │                              │
│                    │ Orchestrator │                              │
│                    └──────┬───────┘                              │
│           ┌───────────────┼───────────────┐                     │
│           │               │               │                     │
│    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐             │
│    │ portfolio.ts│ │  venice.ts  │ │ uniswap.ts  │             │
│    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘             │
└───────────┼───────────────┼───────────────┼─────────────────────┘
            │               │               │
     ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
     │    viem     │ │  Venice AI  │ │Uniswap Dev  │
     │  multicall  │ │    API      │ │Platform API │
     └──────┬──────┘ └─────────────┘ └──────┬──────┘
            │                               │
     ┌──────▼───────────────────────────────▼──────┐
     │              Base Chain                      │
     │         (Sepolia / Mainnet)                  │
     │                                              │
     │  • Token balances    • Swap transactions     │
     │  • ETH balance       • ERC-8004 identity     │
     └──────────────────────────────────────────────┘

  SIDE INTEGRATIONS:

     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
     │   Status     │  │ EigenCompute │  │    x402      │
     │   Network    │  │    TEE       │  │  Payments    │
     │              │  │              │  │              │
     │  Gasless     │  │  Verifiable  │  │  Pay-per-    │
     │  deployment  │  │  execution   │  │  request     │
     └──────────────┘  └──────────────┘  └──────────────┘
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- API keys: Venice AI or Groq (free), Uniswap Developer Platform (free)
- A wallet private key (for signing swap transactions)

### Setup

```bash
git clone https://github.com/user/blockagent
cd blockagent
npm install
cp .env.example .env
# Edit .env with your API keys
```

### Run the CLI

```bash
# Analyze a wallet (analysis only, no trades)
npm run analyze 0xYourWalletAddress sepolia

# Analyze and auto-execute recommended trades
npm run analyze 0xYourWalletAddress sepolia --execute
```

### Run as a Server

```bash
# Development
npm run dev

# Production
npm run build && npm start
```

### API Endpoints

**POST /analyze** — Free portfolio analysis

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{"wallet": "0xYourAddress", "network": "sepolia"}'
```

**POST /analyze/paid** — Paid tier with x402 (1 USDC)

```bash
curl -X POST http://localhost:3000/analyze/paid \
  -H "Content-Type: application/json" \
  -H "X-Payment: <x402-payment-proof>" \
  -d '{"wallet": "0xYourAddress", "network": "mainnet", "autoExecute": true}'
```

### Deploy to Status Network (Gasless Qualifier)

```bash
npm run deploy:status
```

### Docker (for EigenCompute)

```bash
npm run build
docker build -t blockagent .
docker run -p 3000:3000 --env-file .env blockagent
```

## Target Tracks

| Track | Sponsor | Prize Pool |
|-------|---------|-----------|
| Private Agents, Trusted Actions | Venice | $11,500 |
| Best Use of EigenCompute | EigenCloud | $5,000 |
| Agentic Finance (Uniswap API) | Uniswap | $5,000 |
| Agent Services on Base | Base | $5,000 |
| Let the Agent Cook | Protocol Labs | $4,000 |
| Agents With Receipts — ERC-8004 | Protocol Labs | $4,000 |
| Synthesis Open Track | Community | $28,134 |
| Status Network Gasless | Status | $50 |

## Tech Stack

- **TypeScript** / Node.js
- **viem** — onchain data reading, transaction signing
- **Venice AI** — private inference (OpenAI-compatible API)
- **Uniswap Developer Platform API** — swap quotes and execution
- **EigenCompute** — verifiable TEE execution
- **x402** — agent-to-agent payment protocol
- **ERC-8004** — onchain agent identity

## License

MIT
