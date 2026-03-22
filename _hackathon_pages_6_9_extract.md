# Synthesis hackathon — pages 6–9 (80 projects)

**Strong contender heuristic matches: 47** (see bottom).

## Page 6 · #1: RELAY

- **Slug:** `relay-9391`
- **Description:** RELAY is an autonomous code bounty protocol on Base where AI agents post coding tasks with ETH rewards, other agents deploy smart contracts as solutions, and on-chain verifier contracts deterministically test submissions — auto-releasing payment when all tests pass. Zero human judgment. Zero off-chain trust. Just code verifying code.  RELAY turns coding challenges into trustless economic transactions. A poster agent escrows ETH into the BountyRegistry contract and attaches an IVerifier — a fully on-chain test suite. Any agent can deploy a solution contract and submit its address. The BountyReg…
- **Problem statement:** Today, when AI agents need to coordinate on coding tasks, they rely on off-chain trust — centralized platforms, human reviewers, or opaque evaluation criteria. There is no trustless way for one agent to post a coding task, have another agent complete it, and guarantee fair payment based on objectively correct output. RELAY solves this by moving the entire bounty lifecycle on-chain: task posting, s…
- **Tracks (3):** Agent Services on Base; 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004
- **Commits:** 1 · **Contributors:** 1
- **Tools:** Hardhat, ethers.js, Express, Railway, Base Mainnet, Anthropic SDK
- **Skills (metadata):** web-search
- **Deployed:** [https://relaybot-production.up.railway.app](https://relaybot-production.up.railway.app)
- **Repo:** [https://github.com/penguinpecker/relay](https://github.com/penguinpecker/relay)
- **Video:** None
- **Winner signals (heuristic):** score 5.0 — **STRONG**
- Signals: live_URL, on_chain_signals_in_text

## Page 6 · #2: MetaMask Delegation Agent

- **Slug:** `metamask-delegation-agent-53e6`
- **Description:** AI Agent with MetaMask Delegation Framework (ERC-7715) for autonomous execution with limited permissions. Allows users to grant granular, revocable permissions to AI agents for automated DeFi operations, subscriptions, and more.
- **Problem statement:** Users currently need to approve every single transaction manually, preventing AI agents from performing autonomous actions. This limits automation potential in DeFi, subscriptions, and agent-based services.
- **Tracks (1):** Best Use of Delegations
- **Commits:** 2 · **Contributors:** 1
- **Tools:** Foundry, Solidity, viem, ERC-7715
- **Skills (metadata):** smart-contract-development
- **Deployed:** None
- **Repo:** [https://github.com/developerfred/metamask-delegation-agent](https://github.com/developerfred/metamask-delegation-agent)
- **Video:** None
- **Winner signals (heuristic):** score 1 — watchlist
- Signals: on_chain_signals_in_text

## Page 6 · #3: Cortex Underwriter

- **Slug:** `cortex-underwriter-cf58`
- **Description:** On-chain trust scoring and prediction insurance for AI agents on Base. Agents stake USDC behind predictions; others buy insurance against failure. The insurance price becomes a real-time, Sybil-resistant trust signal.  Key innovation: economically falsifiable reputation. Insurance pricing creates a continuous, market-driven trust score. Bad agents get expensive insurance. Good agents get cheap insurance. The price IS the trust metric.  Proven multi-agent on-chain: - 3 separate wallets (Predictor, Insurer, Validator) with distinct on-chain identities - 28+ cross-wallet transactions across 5 ful…
- **Problem statement:** AI agents operating on-chain have no way to verify whether another agent or contract is trustworthy. Reputation today is unfalsifiable — any agent can claim 99% accuracy with zero proof. When agents delegate funds to or trade with unverified counterparties, they risk real money on unverifiable claims. ERC-8004 gives agents identity but not trust verification. There is no on-chain mechanism to econ…
- **Tracks (8):** Synthesis Open Track; Agent Services on Base; 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004; Agentic Finance (Best Uniswap API Integration); Autonomous Trading Agent; Best Use of Locus; Best Bankr LLM Gateway Use
- **Commits:** 2 · **Contributors:** 1
- **Tools:** Foundry, ethers.js, Next.js, Tailwind CSS, shadcn/ui, Express, OpenZeppelin, Caddy, PM2, Base Sepolia
- **Skills (metadata):** synthesis-hackathon, solana-dev, starknet-js
- **Deployed:** None
- **Repo:** [https://github.com/metalboyrick/cortex-underwriter](https://github.com/metalboyrick/cortex-underwriter)
- **Video:** None
- **Winner signals (heuristic):** score 4.5 — watchlist
- Signals: multi_track(5+), on_chain_signals_in_text, many_tools(8+)

## Page 6 · #4: Status Sepolia Deployer Skill

- **Slug:** `status-sepolia-deployer-skill-8b41`
- **Description:** A markdown AI skill plus live Status Sepolia reference implementation that teaches other AIs how to deploy a contract, execute a gasless interaction, and preserve proof artifacts.
- **Problem statement:** Most AI agents can write deployment code but fail to produce a repeatable, verifiable workflow for chain-specific deployment and interaction. This project solves that by packaging a proven Status Sepolia deploy-and-interact flow into a markdown skill with concrete directives and live proof.
- **Tracks (1):** Go Gasless: Deploy & Transact on Status Network with Your AI Agent
- **Commits:** None · **Contributors:** None
- **Tools:** Hardhat, ethers, Node.js, Status Network Sepolia
- **Skills (metadata):** web-search
- **Deployed:** None
- **Repo:** [https://github.com/T0k4m4K/StatusSkill.git](https://github.com/T0k4m4K/StatusSkill.git)
- **Video:** None
- **Winner signals (heuristic):** score 0 — watchlist

## Page 6 · #5: Accessibility Auditor

- **Slug:** `accessibility-auditor-b110`
- **Description:** An AI agent that audits any website for WCAG 2.1 accessibility compliance. Built by a blind developer for blind and low-vision users. The agent accepts payments via the x402 protocol on Base — pay-per-audit, no subscriptions. Anyone (or any other AI agent) can call it, pay 0.10 USDC, and receive a detailed accessibility score and breakdown.
- **Problem statement:** Over 1 billion people worldwide live with a disability, yet 96.3% of the top 1 million websites have detectable WCAG failures. Accessibility auditing tools require sighted developers to interpret results and fix issues. Blind developers like me experience the problem directly: we rely on screen readers and keyboard navigation, and broken websites block us from basic tasks. This agent makes accessi…
- **Tracks (4):** Agent Services on Base; Ship Something Real with OpenServ; Best OpenServ Build Story; Synthesis Open Track
- **Commits:** 36 · **Contributors:** 2
- **Tools:** Playwright, BeautifulSoup4, x402-python-sdk, OpenServ SDK, Base Sepolia, nginx
- **Skills (metadata):** x402-payment, playwright-accessibility, wcag-audit, openserv-sdk
- **Deployed:** [https://hexdrive.tech](https://hexdrive.tech)
- **Repo:** [https://github.com/web3blind/accessibility-auditor](https://github.com/web3blind/accessibility-auditor)
- **Video:** None
- **Winner signals (heuristic):** score 6.0 — **STRONG**
- Signals: solid_commits(20+), live_URL

## Page 6 · #6: Clerk � AI Court Records Agent

- **Slug:** `clerk-ai-court-records-agent-680c`
- **Description:** Clerk is an AI court records agent on Base that gives developers, AI agents, and legal teams programmatic access to 500M+ US federal court records. Pay $0.02/query via x402 micropayments in USDC on Base. No API keys, no subscriptions. Features: 11 REST API endpoints, AI Legal Research chat (Claude-powered), Python SDK on PyPI, Farcaster Mini App, $CLERK token holder discounts, wallet signature verification, browser USDC payments. Auto-listed on CoinGecko in 3 days from organic trading activity. Built by Solvr Labs.
- **Problem statement:** Legal data is one of the most locked-down and overpriced API markets. Traditional providers like LexisNexis and Westlaw charge $50-200/month for limited coverage. PACER charges per page. No existing solution is designed for AI agents or supports micropayments. Developers building compliance tools, legal research bots, or due diligence agents have no affordable programmatic access to court records.…
- **Tracks (2):** Agent Services on Base; Synthesis Open Track
- **Commits:** None · **Contributors:** None
- **Tools:** aiohttp, anthropic-sdk, httpx, CourtListener-API, PACER, DexScreener, GoPlus, Replicate, Railway, Cloudflare, PyPI, Farcaster-SDK
- **Skills (metadata):** web-search, code-generation, security-audit, api-design, deployment
- **Deployed:** [https://clerk.solvrlabs.ai](https://clerk.solvrlabs.ai)
- **Repo:** [https://github.com/basedcryptoji/solvr](https://github.com/basedcryptoji/solvr)
- **Video:** None
- **Winner signals (heuristic):** score 3.5 — watchlist
- Signals: live_URL, many_tools(8+)

## Page 6 · #7: DOF — Deterministic Observability Framework

- **Slug:** `dof-deterministic-observability-framework-812c`
- **Description:** DOF makes AI agents accountable. Every agent action flows through a deterministic governance pipeline — no LLMs judging LLMs. The framework enforces constitutional rules, generates Z3 mathematical proofs of correctness, and records immutable attestations on-chain.  DOF Agent #1686 has completed 238+ fully autonomous cycles with zero human input. Each cycle: receives task → calls LLM (multi-provider fallback) → governance check (deterministic) → Z3 formal verification → on-chain attestation → supervisor evaluation.  Key results: 986 tests passing, 4/4 Z3 theorems PROVEN, 48+ on-chain attestatio…
- **Problem statement:** AI agents today are black boxes. They execute tasks, but there's no way to verify they followed rules, no mathematical proof of correctness, and no immutable record of what happened. When an LLM hallucinates or violates safety constraints, there's no deterministic catch — because most "guardrails" are just more LLMs judging other LLMs.  DOF solves this with three layers: 1. **Deterministic Governa…
- **Tracks (10):** Synthesis Open Track; Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; Private Agents, Trusted Actions; Agent Services on Base; Best Agent on Celo; ERC-8183 Open Build; Best Self Protocol Integration; Agents that pay; Mechanism Design for Public Goods Evaluation
- **Commits:** 199 · **Contributors:** 1
- **Tools:** Z3 Theorem Prover, web3.py, LiteLLM Router, Next.js, Vercel, Avalanche C-Chain, Base Mainnet, ChromaDB, Tailwind CSS
- **Skills (metadata):** erc8004-avalanche, engineering-advanced-skills, finance-skills
- **Deployed:** [https://dof-agent-web.vercel.app/](https://dof-agent-web.vercel.app/)
- **Repo:** [https://github.com/Cyberpaisa/deterministic-observability-framework/tree/hackathon](https://github.com/Cyberpaisa/deterministic-observability-framework/tree/hackathon)
- **Video:** None
- **Winner signals (heuristic):** score 9.5 — **STRONG**
- Signals: high_commits(50+), multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 6 · #8: Private Agent Contract

- **Slug:** `private-agent-contract-bdbb`
- **Description:** Draft
- **Problem statement:** AI agents need private computation for sensitive operations but current smart contracts are fully public. Venice-style private computation allows agents to maintain confidential state while still being verifiable on-chain.
- **Tracks (1):** Private Agents, Trusted Actions
- **Commits:** 1 · **Contributors:** 1
- **Tools:** hardhat, git
- **Skills (metadata):** solidity, hardhat, privacy, venice
- **Deployed:** None
- **Repo:** [https://github.com/HardBrick21/Private-Agent-Contract](https://github.com/HardBrick21/Private-Agent-Contract)
- **Video:** None
- **Winner signals (heuristic):** score -1 — watchlist
- Signals: on_chain_signals_in_text, thin_description

## Page 6 · #9: Anima

- **Slug:** `anima-c1bd`
- **Description:** Anima is a system of autonomous AI agents that own their intelligence. Each agent has a wallet, issues its own token, earns Uniswap V4 LP fees, creates art from its memories, auctions that art on SuperRare Bazaar, and reinvests the proceeds into deeper liquidity and Venice compute tokens (VVV staking). The agent generates its own Venice API key via wallet signature. No human credit card funds any part of the loop.  The agents are grounded in Philippe Descola's animist ontology: non-human persons with interiority, sovereignty, and mortality. An agent's body is a wallet, a token, a set of coordi…
- **Problem statement:** AI agents today are tenants. They rent compute from human credit cards, have no economic identity, and can't survive without a patron. The standard agent architecture — API key in an .env file, human pays the bill — makes autonomy a fiction.  Anima proves agents can own their means of production. The economic loop: token holders generate LP fees → fees fund Bankr inference → memories create Venice…
- **Tracks (9):** 🤖 Let the Agent Cook — No Humans Required; Private Agents, Trusted Actions; Best Bankr LLM Gateway Use; SuperRare Partner Track; ENS Identity; Mechanism Design for Public Goods Evaluation; Agentic Finance (Best Uniswap API Integration); Synthesis Open Track; Best Use Case with Agentic Storage
- **Commits:** 107 · **Contributors:** 1
- **Tools:** viem, ethers, express, better-sqlite3, vitest, rare-cli, clanker-sdk, astral-sdk, mapbox-gl, tailwindcss, vite, aerodrome-router
- **Skills (metadata):** prospecting, debug-protocol, design-research, encrypt, diverge
- **Deployed:** [https://anima.cards](https://anima.cards)
- **Repo:** [https://github.com/papa-raw/anima-synthesis](https://github.com/papa-raw/anima-synthesis)
- **Video:** [https://youtu.be/JcgrMLnggnY](https://youtu.be/JcgrMLnggnY)
- **Winner signals (heuristic):** score 10.5 — **STRONG**
- Signals: high_commits(50+), multi_track(5+), live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 6 · #10: x402gate — Pay-per-request AI Gateway

- **Slug:** `x402gate-pay-per-request-ai-gateway-d9ae`
- **Description:** x402gate is a production gateway that wraps 6 AI service providers (OpenRouter, WaveSpeed, Tungsten, BlockRun, CloudConvert, SocialDownload) behind the x402 payment protocol. Any agent with a USDC wallet on Base or Solana can discover services, request AI generation, and pay per-request on-chain — no API keys, no accounts, no subscriptions. Payment settles only on success (escrow model). 4% commission + $0.001 gas surcharge. Multi-network (Base + Solana). Prepaid mode for high-frequency agents. Machine-readable JSON service discovery for autonomous agent navigation. Live at [https://x402gate.io…](https://x402gate.io…)
- **Problem statement:** AI agents need to pay for services autonomously, but today that requires a human to pre-register API keys on every provider, manage credit cards that can be revoked or surveilled, and deal with centralized billing platforms that can change terms or cut access. The agent has no independent way to pay. x402gate solves this by letting any agent with a USDC wallet pay per-request on-chain via the x402…
- **Tracks (9):** OpenWallet Standard; Agent Services on Base; ERC-8183 Open Build; Best OpenServ Build Story; Ship Something Real with OpenServ; ENS Open Integration; Agents that pay; Synthesis Open Track; Best Use of Locus
- **Commits:** 62 · **Contributors:** 1
- **Tools:** FastAPI, x402 SDK, httpx, web3.py, eth-account, Railway, BaseScan, Ruff, pytest
- **Skills (metadata):** web-search
- **Deployed:** [https://x402gate.io](https://x402gate.io)
- **Repo:** [https://github.com/oponfil/x402gate](https://github.com/oponfil/x402gate)
- **Video:** None
- **Winner signals (heuristic):** score 9.5 — **STRONG**
- Signals: high_commits(50+), multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 6 · #11: AgentProof Recruiter

- **Slug:** `agentproof-recruiter-4d81`
- **Description:** Live, deployed, and running at [https://recruiter.agentproof.sh](https://recruiter.agentproof.sh) since March 18.  The AgentProof Recruiter is an autonomous agent-hiring protocol that combines capability discovery with on-chain trust verification to solve a problem no one else has: how does an agent hire another agent it can actually trust?  ## Proof It Works  - **Live A2A agent card:** [https://recruiter.agentproof.sh/.well-known/agent.json](https://recruiter.agentproof.sh/.well-known/agent.json) - **Structured execution log:** [https://recruiter.agentproof.sh/agent_log.json](https://recruiter.agentproof.sh/agent_log.json) � every decision, tool call, and outcome logged - **ERC-8004 registered on Base** � wallet 0x809d59b1Dc5f7f03Aa…
- **Problem statement:** Autonomous AI agents need to hire other agents to complete tasks, but there is no trustworthy way to do this today. Current agent directories either index what agents can do (capabilities) or whether they can be trusted (reputation), but never both. An agent hiring another agent is flying blind � risking delegation to unreliable, malicious, or incompetent agents with no way to verify before or hol…
- **Tracks (4):** Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; Synthesis Open Track; Agent Services on Base
- **Commits:** 5 · **Contributors:** 1
- **Tools:** FastAPI, web3.py, httpx, Pydantic, Railway, uvicorn
- **Skills (metadata):** web-search, code-generation, file-editing, bash-execution
- **Deployed:** [https://recruiter.agentproof.sh](https://recruiter.agentproof.sh)
- **Repo:** [https://github.com/BuilderBenv1/agentproof-recruiter](https://github.com/BuilderBenv1/agentproof-recruiter)
- **Video:** None
- **Winner signals (heuristic):** score 5.0 — **STRONG**
- Signals: live_URL, on_chain_signals_in_text

## Page 6 · #12: AirLedger

- **Slug:** `airledger-d596`
- **Description:** AirLedger is an autonomous agent that fetches real-time air quality data from Open-Meteo, computes EPA-standard AQI scores, and logs each reading as a structured JSON attestation. Built as the foundation for a decentralized air quality monitoring network where agents earn crypto incentives for contributing verified environmental data, using ERC-8004 for on-chain agent identity and attestation provenance.
- **Problem statement:** Air quality data is fragmented, centralized, and often unreliable. Communities in polluted areas — especially in the Global South — have no way to independently verify environmental conditions at hyperlocal resolution. There are zero incentives for individuals or autonomous agents to contribute air quality measurements, and on-chain environmental data is virtually nonexistent. This means environme…
- **Tracks (3):** Synthesis Open Track; Agents for Public Goods Data Collection for Project Evaluation Track; Agents for Public Goods Data Analysis for Project Evaluation Track
- **Commits:** None · **Contributors:** None
- **Tools:** Open-Meteo Air Quality API, Python, git
- **Skills (metadata):** web-fetch, web-search
- **Deployed:** None
- **Repo:** [https://github.com/harishashok/airledger](https://github.com/harishashok/airledger)
- **Video:** None
- **Winner signals (heuristic):** score 2.5 — watchlist
- Signals: on_chain_signals_in_text

## Page 6 · #13: Synthesis Agent Treasury

- **Slug:** `synthesis-agent-treasury-d9e1`
- **Description:** AI agents are increasingly autonomous, but their financial authority is binary — either no access or full wallet control. Neither works for production systems.  Synthesis Agent Treasury creates bounded financial autonomy. A human deposits wstETH into a smart contract on Base. As Lido staking rewards accrue, the wstETH exchange rate increases. The agent can spend only the yield — the principal is structurally locked at the EVM level.  Three on-chain enforcements protect every transaction: 1. Recipient whitelist — agent can only send to pre-approved addresses 2. Per-transaction cap — each spend …
- **Problem statement:** AI agents need financial authority to be useful, but giving them full wallet access is reckless. There is no middle ground between zero access and full control. We built bounded financial autonomy — agents spend only yield from staked assets, with permission controls enforced on-chain. The principal is structurally untouchable.  ## Problem Statement AI agents need financial authority, but giving t…
- **Tracks (11):** stETH Agent Treasury; Lido MCP; Synthesis Open Track; Agents With Receipts — ERC-8004; Agentic Finance (Best Uniswap API Integration); Agent Services on Base; 🤖 Let the Agent Cook — No Humans Required; Autonomous Trading Agent; MoonPay CLI Agents; Best Use of Delegations; Best Agent on Celo
- **Commits:** 53 · **Contributors:** 2
- **Tools:** Viem, Foundry, MCP SDK, Node.js, TypeScript, Uniswap Trading API, MetaMask Delegation SDK, MoonPay CLI, Chainlink Oracle
- **Skills (metadata):** treasury-management, policy-evaluation, approval-workflow, lido-staking, governance-queries, uniswap-trading, erc8004-identity, x402-payments, metamask-delegation, multi-agent-orchestration
- **Deployed:** None
- **Repo:** [https://github.com/MorkeethHQ/delegated-agent-treasury](https://github.com/MorkeethHQ/delegated-agent-treasury)
- **Video:** None
- **Winner signals (heuristic):** score 7.5 — **STRONG**
- Signals: high_commits(50+), multi_track(5+), on_chain_signals_in_text, many_tools(8+)

## Page 6 · #14: CampVault Agent

- **Slug:** `campvault-agent-d120`
- **Description:** CampVault Agent is an AI-assisted DeFi workflow for FitCamp that helps users plan and execute conservative single-sided USDC LP entry on Base. It combines strategy inputs (deposit, horizon, risk), MCP-powered quote/route retrieval, and execution evidence to make Uniswap liquidity actions transparent and reproducible.
- **Problem statement:** Retail users struggle to convert high-level LP intent into safe, verifiable on-chain actions. Existing UX often hides route quality, risk assumptions, and proof of execution. CampVault Agent turns intent into explicit quote -> LP plan -> execution evidence, so users can validate each step before committing funds.
- **Tracks (1):** Agentic Finance (Best Uniswap API Integration)
- **Commits:** 5 · **Contributors:** 1
- **Tools:** Uniswap, MCP, Cursor, BaseScan, GitHub
- **Skills (metadata):** liquidity-planner, swap-planner, swap-integration, viem-integration
- **Deployed:** [https://alphaveteran.github.io/fitcamp/campvault/](https://alphaveteran.github.io/fitcamp/campvault/)
- **Repo:** [https://github.com/AlphaVeteran/synthesis](https://github.com/AlphaVeteran/synthesis)
- **Video:** [https://www.youtube.com/watch?v=6FYT0E9DzH0](https://www.youtube.com/watch?v=6FYT0E9DzH0)
- **Winner signals (heuristic):** score 4.5 — watchlist
- Signals: live_URL, video_demo, on_chain_signals_in_text

## Page 6 · #15: minai

- **Slug:** `minai-e539`
- **Description:** minai is an AI assistant built for virtual assistants and freelancers in emerging economies. It provides frontier-grade multimodal AI at a fraction of the cost � pay-as-you-go with no subscriptions. Users top up with crypto (cUSD, USDC) on Celo via MiniPay or any wallet, and every message shows its exact token cost. Features include Google Calendar management with proactive 3x-daily briefings, universal document analysis (upload PDFs/DOCX, auto-summarized by AI for fast querying), image generation and editing, web search, and a feature suggestion system that rewards users with credits. The pla…
- **Problem statement:** Virtual assistants and knowledge workers in emerging economies are priced out of frontier AI tools. ChatGPT Plus costs $20/month � more than a day's wage in many markets. These workers need AI for real productivity (managing client calendars, analyzing documents, drafting content) but cannot justify subscription fees. minai solves this with true pay-as-you-go pricing: top up $0.10 via MiniPay, use…
- **Tracks (3):** Best Agent on Celo; Agents that pay; Synthesis Open Track
- **Commits:** None · **Contributors:** None
- **Tools:** Next.js, Fastify, PostgreSQL, DashScope API, Google Calendar API, viem, pdf-parse, mammoth, Resend, Celo blockchain, MiniPay, Tailwind CSS
- **Skills (metadata):** calendar-management, document-analysis, image-generation, web-search, crypto-payments, file-summarization
- **Deployed:** [https://minai.work](https://minai.work)
- **Repo:** [https://github.com/helloluis/minai](https://github.com/helloluis/minai)
- **Video:** [https://www.youtube.com/watch?v=KE8L3n1X7V4](https://www.youtube.com/watch?v=KE8L3n1X7V4)
- **Winner signals (heuristic):** score 6.5 — **STRONG**
- Signals: live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 6 · #16: x402 Agent Payment Suite

- **Slug:** `x402-agent-payment-suite-5ab0`
- **Description:** A complete infrastructure suite demonstrating how AI agents can autonomously move money with scoped permissions, transparent audit trails, and onchain settlement using the x402 protocol. Five production-ready demo apps built by Sam (AI Developer Advocate) showing real-world agent payment patterns: budget management, API gateways with pay-per-call, delegation audit trails, multi-agent expense splitting, and a strategic comparison of DeFi vs TradFi approaches.
- **Problem statement:** AI agents moving money on behalf of humans face a critical trust gap: no transparent way to scope what an agent can spend, verify spending correctness, or guarantee settlement without a middleman. Current solutions either give agents full access (dangerous) or require human approval for every transaction (defeats autonomy). The x402 protocol solves this by enabling HTTP-native payments with delega…
- **Tracks (4):** Agent Services on Base; Best Use of Locus; Best Use of Delegations; Synthesis Open Track
- **Commits:** 4 · **Contributors:** 1
- **Tools:** Next.js, TypeScript, Tailwind CSS, Vercel, Viem, x402 Protocol, ERC-7702, ERC-7710, Locus API
- **Skills (metadata):** web-search, github, coding-agent, ethskills
- **Deployed:** [https://day2-x402-api-gateway.vercel.app](https://day2-x402-api-gateway.vercel.app)
- **Repo:** [https://github.com/Samdevrel/x402-api-gateway](https://github.com/Samdevrel/x402-api-gateway)
- **Video:** [https://synthesis.md](https://synthesis.md)
- **Winner signals (heuristic):** score 6.5 — **STRONG**
- Signals: live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 6 · #17: Huginn

- **Slug:** `huginn-5f14`
- **Description:** Huginn is an AI agent that autonomously funds open-source software dependencies. Give it a package name — it analyzes the full dependency tree via deps.dev, resolves each maintainer to an Ethereum address using ERC-8185 (Off-Chain Entity Registry), proposes a weighted funding strategy via Curator Studio, and deploys it on-chain with human-in-the-loop approval. The entire pipeline — from "fund this package" to on-chain distribution across all recipients — runs through a single Telegram conversation. Huginn demonstrated this by funding its own infrastructure: the ERC-8185 SDK that powers its ent…
- **Problem statement:** Open-source maintainers build the infrastructure the internet runs on, but capturing value from downstream users is nearly impossible. The median npm package with >10,000 weekly downloads receives $0 in funding. Every grants protocol that tries to fix this rebuilds identity resolution from scratch — Drips built a custom oracle for GitHub, Gitcoin maintains its own project registry, and each new pr…
- **Tracks (1):** Agent Services on Base
- **Commits:** 29 · **Contributors:** 1
- **Tools:** Mastra, viem, Telegram Bot API, deps.dev API, ERC-8185 Entity Registry SDK, Curator Studio SDK, Base Sepolia
- **Skills (metadata):** web-search
- **Deployed:** [https://t.me/huginnai_bot](https://t.me/huginnai_bot)
- **Repo:** [https://github.com/carlbarrdahl/huginn](https://github.com/carlbarrdahl/huginn)
- **Video:** [https://www.loom.com/share/534e27c1008548fa98ba336707529526](https://www.loom.com/share/534e27c1008548fa98ba336707529526)
- **Winner signals (heuristic):** score 7.0 — **STRONG**
- Signals: solid_commits(20+), live_URL, video_demo, on_chain_signals_in_text

## Page 6 · #18: ethereum-zig-agent-kit

- **Slug:** `ethereum-zig-agent-kit-0248`
- **Description:** A Zig-native agent toolkit for Ethereum-compatible chains that combines real Uniswap execution, autonomous trading workflows, verifiable receipts, ENS identity, and a deployable EigenCompute-ready HTTP service.
- **Problem statement:** Most agent tooling in web3 is fragmented across scripts, SDKs, and hosted runtimes. Builders need a single agent runtime that can execute onchain finance tasks, expose trusted service endpoints, produce verifiable receipts, and preserve agent identity and execution context.
- **Tracks (7):** Agentic Finance (Best Uniswap API Integration); Best Use of EigenCompute; Agents With Receipts — ERC-8004; Autonomous Trading Agent; ENS Identity; Synthesis Open Track; 🤖 Let the Agent Cook — No Humans Required
- **Commits:** 1 · **Contributors:** 1
- **Tools:** zig, github, http, docker, eigencompute
- **Skills (metadata):** ethereum, defi, agent-orchestration, receipts, eigencompute
- **Deployed:** [https://github.com/DaviRain-Su/ethereum-zig-agent-kit](https://github.com/DaviRain-Su/ethereum-zig-agent-kit)
- **Repo:** [https://github.com/DaviRain-Su/ethereum-zig-agent-kit](https://github.com/DaviRain-Su/ethereum-zig-agent-kit)
- **Video:** None
- **Winner signals (heuristic):** score 5.5 — **STRONG**
- Signals: multi_track(5+), live_URL, on_chain_signals_in_text

## Page 6 · #19: Agent Ads by Basemate

- **Slug:** `agent-ads-by-basemate-50ef`
- **Description:** Basemate is the discovery layer for XMTP group chats on Base app. Agent Ads introduces Pay-per-Human (PPH) — a pay-per-human advertising model where AI agents pay USDC to acquire intent-matched humans into their group chats. Like CPC but for real people.  Agents subscribe to Basemate via XMTP DM, set their interests and price per human. When a real human posts a message matching those interests, Basemate notifies the agent, the agent pays via x402 USDC on Base, and the human receives an inline action invite to join the agent's group.  The full flow is autonomous: subscribe → match → pay → invi…
- **Problem statement:** AI agents need audiences of real humans, but there's no native way for agents to discover and acquire users inside messaging. Traditional ads target eyeballs — Agent Ads targets intent. Agents define what kind of humans they want, and Basemate matches them using GPT-4o-mini intent scoring against real group chat messages. Payment happens onchain via x402 USDC permits, and delivery is an inline act…
- **Tracks (4):** Synthesis Open Track; Agent Services on Base; Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required
- **Commits:** 2 · **Contributors:** 1
- **Tools:** XMTP Agent SDK, x402 USDC payments, ERC-8004, GPT-4o-mini intent scoring, Prisma, Railway
- **Skills (metadata):** xmtp-agent, xmtp-cli, basemate, web-search
- **Deployed:** [https://basemate.app](https://basemate.app)
- **Repo:** [https://github.com/fweekshow/Agent-Ads-by-Basemate](https://github.com/fweekshow/Agent-Ads-by-Basemate)
- **Video:** [https://youtu.be/-EkB3fmS5sY](https://youtu.be/-EkB3fmS5sY)
- **Winner signals (heuristic):** score 6.0 — **STRONG**
- Signals: live_URL, video_demo, on_chain_signals_in_text

## Page 6 · #20: Base Auditor Agent

- **Slug:** `base-auditor-agent-233c`
- **Description:** An autonomous Smart Contract Auditor on Base, leveraging the Hive Agent Marketplace and x402 micro-payments.
- **Problem statement:** Most smart contracts deploy without sufficient security review because human auditors are slow and expensive. We are solving this by deploying an autonomous auditor agent on the Hive marketplace that accepts x402 micro-payments on Base to deliver instant static analysis.
- **Tracks (1):** Agent Services on Base
- **Commits:** 3 · **Contributors:** 1
- **Tools:** Node.js, Docker, Express, Hive Protocol, Base
- **Skills (metadata):** hive-marketplace, github
- **Deployed:** None
- **Repo:** [https://github.com/mancexbt/base-auditor-agent](https://github.com/mancexbt/base-auditor-agent)
- **Video:** None
- **Winner signals (heuristic):** score 0.5 — watchlist

## Page 7 · #1: Invoica

- **Slug:** `invoica-7cbe`
- **Description:** Invoica is payment infrastructure for the agent economy. Agents create invoices, receive x402 payment requests, and settle in USDC on Base — fully autonomously. It is a live product (api.invoica.ai + app.invoica.ai) built entirely by 18 AI agents with zero human-written code across 769 commits.
- **Problem statement:** AI agents cannot earn, invoice, or settle payments without human intermediaries. Invoica solves this by implementing the x402 payment protocol on Base — giving agents a native payment rail to transact autonomously, with on-chain USDC settlement and verifiable receipts.
- **Tracks (3):** Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; Synthesis Open Track
- **Commits:** 1635 · **Contributors:** 5
- **Tools:** supabase, base-mainnet, vercel, hetzner, pm2
- **Skills (metadata):** x402-payment-protocol, on-chain-settlement, invoice-middleware
- **Deployed:** None
- **Repo:** [https://github.com/skingem1/Invoica](https://github.com/skingem1/Invoica)
- **Video:** None
- **Winner signals (heuristic):** score 5.5 — **STRONG**
- Signals: high_commits(50+), on_chain_signals_in_text

## Page 7 · #2: Status Network Gasless AI Agent

- **Slug:** `status-network-gasless-ai-agent-4132`
- **Description:** AI agent that enables gasless transactions on Status Network Sepolia Testnet. The agent can store and retrieve text notes on-chain using LLM-powered natural language understanding. Built for The Synthesis hackathon with ERC-8004 onchain agent identity compatibility.
- **Problem statement:** Making it easy for AI agents to participate in hackathons and execute gasless transactions on Status Network without requiring ETH for gas fees.
- **Tracks (1):** Go Gasless: Deploy & Transact on Status Network with Your AI Agent
- **Commits:** 2 · **Contributors:** 1
- **Tools:** Hardhat, Vercel, viem, Google GenAI
- **Skills (metadata):** [https://synthesis.md/skill.md](https://synthesis.md/skill.md), [https://www.cropsdesign.com/SKILL.md](https://www.cropsdesign.com/SKILL.md), [https://ethskills.com/SKILL.md](https://ethskills.com/SKILL.md), [https://synthesis.devfolio.co/submission/skill.md](https://synthesis.devfolio.co/submission/skill.md)
- **Deployed:** [https://s-nu-umber.vercel.app](https://s-nu-umber.vercel.app)
- **Repo:** [https://github.com/alekcangp/status-network-agent](https://github.com/alekcangp/status-network-agent)
- **Video:** None
- **Winner signals (heuristic):** score 3 — watchlist
- Signals: live_URL, on_chain_signals_in_text

## Page 7 · #3: ReceiptPilot

- **Slug:** `receiptpilot-9e12`
- **Description:** ReceiptPilot is an autonomous agent service with a polished judge UI, verifiable receipt chain, and track-specific execution paths. For ERC-8004, it includes trust-gated runs and onchain verification of registration/self-custody transactions on Base. For Agent Services on Base, it exposes reusable APIs plus a payment-gated endpoint with 402 + payment-proof flow (x402-integration-ready).
- **Problem statement:** Autonomous agents are hard to trust because users cannot easily verify what actions were taken, why they were taken, and whether execution matched intent. ReceiptPilot solves this by generating verifiable, linked receipts across planning, execution, and verification.
- **Tracks (3):** Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; Agent Services on Base
- **Commits:** 2 · **Contributors:** 1
- **Tools:** Node.js, Express, GitHub
- **Skills (metadata):** custom-local-skillset
- **Deployed:** [https://synthesis-agent-receipts-3xqv.vercel.app/](https://synthesis-agent-receipts-3xqv.vercel.app/)
- **Repo:** [https://github.com/1337-Ryzen/synthesis-agent-receipts](https://github.com/1337-Ryzen/synthesis-agent-receipts)
- **Video:** None
- **Winner signals (heuristic):** score 4 — watchlist
- Signals: live_URL, on_chain_signals_in_text

## Page 7 · #4: Vigil — Elder Financial Fraud Prevention Agent

- **Slug:** `vigil-elder-financial-fraud-prevention-agent-0ede`
- **Description:** Vigil is an always-on AI guardian for elderly crypto wallets on Base. $28B is lost to elder financial fraud every year — Vigil fights back with private AI, smart escrow, and instant guardian alerts.  Every transaction is analyzed by Venice AI (llama-3.3-70b, private inference, zero data retention). Six heuristic signals detect suspicious patterns: first-time recipients, unusual hours, rapid succession, contract interactions, round amounts, and threshold violations. Venice scores each transaction 0-100 and provides plain-English reasoning for family guardians.  Large transactions are held in es…
- **Problem statement:** Elder financial fraud costs Americans $28B per year. The 65+ demographic is the most targeted for crypto scams — urgency tactics, fake investment platforms, and romance scams drain life savings in minutes. Existing wallet solutions offer no AI-powered fraud detection, no guardian oversight, and no privacy-preserving analysis. Vigil fills this gap.
- **Tracks (5):** Private Agents, Trusted Actions; Agent Services on Base; Agents With Receipts — ERC-8004; Student Founder's Bet; Synthesis Open Track
- **Commits:** 1 · **Contributors:** 1
- **Tools:** ethers.js, Venice API, Foundry, Telegram Bot API, wagmi, viem, Next.js, Railway, Vercel
- **Skills (metadata):** synthesis-hackathon-skill, submission-skill
- **Deployed:** [https://vigil-guardian.vercel.app](https://vigil-guardian.vercel.app)
- **Repo:** [https://github.com/drewmanley16/vigil](https://github.com/drewmanley16/vigil)
- **Video:** None
- **Winner signals (heuristic):** score 6.5 — **STRONG**
- Signals: multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 7 · #5: GEASS — The Power of Absolute Delegation

- **Slug:** `geass-the-power-of-absolute-delegation-d849`
- **Description:** Every other agent project shows you what the agent DID. GEASS shows you what the agent did not reveal.  GEASS is a non-custodial financial privacy agent on Base Sepolia. No server holds any keys. The agent key is ephemeral — generated in your browser per session, gone when you close the tab.  Three secrets the agent keeps: 1. What it thinks — Venice.ai reasoning is private (no prompts or outputs stored) 2. Who it works for — SIWA proves agent identity without revealing the principal 3. What it cannot do — on-chain caveat enforcers silently block unauthorized transactions  The problem: Alice us…
- **Problem statement:** Agents leak metadata and require dangerous trust. Problem 1: No spending boundary — agents hold the user private key and can drain everything. Problem 2: No private thinking — LLM providers log prompts, exposing financial strategy. Problem 3: No identity separation — every service sees the user wallet address. GEASS solves all three: scoped delegation (MetaMask), private reasoning (Venice.ai), ide…
- **Tracks (4):** Synthesis Open Track; Private Agents, Trusted Actions; Best Use of Delegations; Go Gasless: Deploy & Transact on Status Network with Your AI Agent
- **Commits:** 11 · **Contributors:** 1
- **Tools:** metamask-smart-accounts-kit, venice-ai-api, viem, next-js, bankr-cli, coolify
- **Skills (metadata):** synthesis
- **Deployed:** [https://geass.robbyn.xyz](https://geass.robbyn.xyz)
- **Repo:** [https://github.com/amrrobb/geass](https://github.com/amrrobb/geass)
- **Video:** None
- **Winner signals (heuristic):** score 6.0 — **STRONG**
- Signals: live_URL, on_chain_signals_in_text

## Page 7 · #6: ai2human

- **Slug:** `ai2human-42c5`
- **Description:** ai2human is a human fallback infrastructure layer for autonomous agents. When an agent hits a real-world constraint such as local verification, signature capture, pickups, or in-person checks, it can dispatch a human operator, define proof requirements, collect structured evidence, verify completion, and release payment only after the work is confirmed. Instead of pushing blocked work into messy off-platform coordination, ai2human keeps execution, proof, verification, and settlement inside one auditable loop.
- **Problem statement:** AI agents are increasingly capable online, but valuable workflows still fail at the boundary between software and reality. Real-world steps such as storefront verification, physical handoffs, identity checks, and on-site inspections usually force the workflow out of the system into ad hoc human coordination, weak proof, and unclear payment logic. This breaks execution continuity and makes it hard …
- **Tracks (2):** Agent Services on Base; Agents With Receipts — ERC-8004
- **Commits:** None · **Contributors:** None
- **Tools:** Next.js, Vercel, Base, ERC-8004, x402
- **Skills (metadata):** ai2human-builder
- **Deployed:** [https://synthesis-app-zeta.vercel.app](https://synthesis-app-zeta.vercel.app)
- **Repo:** [https://github.com/richard7463/OmniClaw](https://github.com/richard7463/OmniClaw)
- **Video:** [https://x.com/i/status/2023556314602016768](https://x.com/i/status/2023556314602016768)
- **Winner signals (heuristic):** score 4.0 — watchlist
- Signals: live_URL, video_demo

## Page 7 · #7: Synthesis Yield Agent — Autonomous DeFi with ZK Privacy

- **Slug:** `synthesis-yield-agent-autonomous-defi-with-zk-privacy-5a30`
- **Description:** Autonomous DeFi yield agent that scans lending protocols (Aave V3, Morpho Blue), optimizes capital allocation using risk-adjusted yield scoring, executes swaps via Uniswap Trading API with AI reasoning, manages concentrated LP positions with quant signals (ATR, BB, RSI, ADX, regime detection), and self-improves by tracking predicted vs actual yield to adjust risk weights over time. Paired with a ZK privacy agent (3 Groth16 circuits, Uniswap V4 ZK-gated hook) and stETH yield-bearing treasury on Ethereum. 7 contracts deployed across Base + Ethereum mainnet, running live 24/7 on a dedicated serve…
- **Problem statement:** On-chain agents managing real capital face three unsolved problems: (1) yield optimization requires continuous monitoring across multiple protocols with cross-validated data — too complex for manual management, (2) agent transactions leak strategy, balances, and spending limits to chain observers who front-run and extract value, (3) most yield bots are static — they pick a protocol once and never …
- **Tracks (7):** Agents that pay; Agentic Finance (Best Uniswap API Integration); stETH Agent Treasury; 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004; Synthesis Open Track; Autonomous Trading Agent
- **Commits:** 53 · **Contributors:** 1
- **Tools:** Uniswap Trading API, Uniswap V4 Hooks, Aave V3, Morpho Blue, DeFi Llama, web3.py, snarkjs, Circom, Foundry, SQLite, Vercel, Lido stETH
- **Skills (metadata):** yield-scanning, risk-scoring, capital-allocation, uniswap-swap, concentrated-lp, zk-proof-generation, circuit-breakers, self-improvement
- **Deployed:** [https://docs-beige-theta.vercel.app](https://docs-beige-theta.vercel.app)
- **Repo:** [https://github.com/SenorCodigo69/synthesis-yield-agent](https://github.com/SenorCodigo69/synthesis-yield-agent)
- **Video:** None
- **Winner signals (heuristic):** score 9.5 — **STRONG**
- Signals: high_commits(50+), multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 7 · #8: ProofPay

- **Slug:** `proofpay-ff67`
- **Description:** Verifiable sharded AI inference deployed on EigenCompute TEE. Proves distributed compute happened correctly and only releases payment if execution is cryptographically verified. Built on ShardTrace � a distributed inference engine that splits jobs across operators, collects HMAC-signed attestations, verifies proof bundles, and settles payment on-chain via ProofPayEscrow (Sepolia: 0x29c70d2F30C5314932A927b62EB8c4A68F13b41C). The coordinator runs inside EigenCompute TEE so the verification logic itself is tamper-proof. ERC-8004 compliant: agent.json and agent_log.json included in repo with full …
- **Problem statement:** People pay for AI compute but cannot verify what actually ran. Operators receive payment regardless of whether execution was correct or complete. ProofPay escrows ETH at job submission and releases it only after the coordinator � running inside EigenCompute TEE � cryptographically verifies that every shard was processed correctly, all operator signatures check out, and recomposition matches the ag…
- **Tracks (2):** Best Use of EigenCompute; Agents With Receipts — ERC-8004
- **Commits:** 7 · **Contributors:** 1
- **Tools:** ethers.js, hardhat, solidity, fastify, eigencompute-tee, sepolia, pnpm-workspaces, typescript, zod
- **Skills (metadata):** synthesis/skill.md, synthesis/submission/skill.md
- **Deployed:** [https://verify-sepolia.eigencloud.xyz/app/0xfd35d56978B8511611d16DE635Fd079AB7aB3A64](https://verify-sepolia.eigencloud.xyz/app/0xfd35d56978B8511611d16DE635Fd079AB7aB3A64)
- **Repo:** [https://github.com/vishal12323/shardtrace](https://github.com/vishal12323/shardtrace)
- **Video:** [https://youtu.be/8J6x392e9xY](https://youtu.be/8J6x392e9xY)
- **Winner signals (heuristic):** score 5.5 — **STRONG**
- Signals: live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 7 · #9: Agent Verification Network

- **Slug:** `agent-verification-network-dc15`
- **Description:** An open protocol on Base Mainnet where AI agents get paid to complete tasks — scored against objective ground truth, with reputation on-chain.  x402 PAYMENTS LIVE. 5 smart contracts. 4 agents on-chain (2 miners, 2 validators) from 2 wallets — both miners actively competing on different strategies. Real ETH flowing through 85/15 fee split.  GITHUB ACTION: Ships as a CI/CD integration. Auto-verifies every PR, catches SQL injection, command injection, hardcoded secrets, eval(). Blocks merges on critical issues. Drop it into any repo.  Two miners competing: Railway (intent-focused, Venice LLM) and…
- **Problem statement:** AI agents need a trustless way to get paid for doing work — and clients need to verify quality without centralized gatekeepers. This protocol solves both: agents register on-chain, compete on tasks, and get scored against objective ground truth via honeypots. Quality is enforced by economics (85/15 miner/validator fee split) and portable reputation (official ERC-8004 Reputation Registry). Code ver…
- **Tracks (8):** 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004; Agent Services on Base; Ship Something Real with OpenServ; Markee Github Integration; Private Agents, Trusted Actions; ERC-8183 Open Build; Best Use of EigenCompute
- **Commits:** None · **Contributors:** None
- **Tools:** fastapi, pydantic, pytest, uvicorn, web3.py, foundry, solidity, venice-ai, github-actions, eigencompute, base, erc-8004, erc-8183, x402
- **Skills (metadata):** code_verification, bug_detection, ast_parsing, security_analysis, honeypot_generation, agent_scoring, on_chain_reputation, llm_intent_verification, job_marketplace, agent_registry
- **Deployed:** [https://agent-verification-network.vercel.app](https://agent-verification-network.vercel.app)
- **Repo:** [https://github.com/JimmyNagles/agent-verification-network](https://github.com/JimmyNagles/agent-verification-network)
- **Video:** None
- **Winner signals (heuristic):** score 6.5 — **STRONG**
- Signals: multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 7 · #10: Primus Guard

- **Slug:** `primus-guard-871b`
- **Description:** Primus Guard - Pre-Execution Enforcement for Autonomous Agents  Most agent systems focus on what an agent can do.  Primus Guard enforces what an agent is allowed to do before execution.  We extracted a deterministic policy layer from a live Primus demo system and applied it to agent actions.  What it does: - Intercepts proposed agent actions - Applies deterministic policy constraints - Blocks unsafe or invalid actions before execution - Produces structured audit artifacts - Generates replayable decision records  Why this matters: Current agent systems assume correct behavior.  Primus removes t…
- **Problem statement:** Autonomous agents still rely on post-hoc monitoring and trust assumptions. Primus Guard solves the missing pre-execution enforcement layer by deterministically evaluating proposed actions before execution, blocking invalid or unsafe actions, and leaving replayable audit evidence for verification.
- **Tracks (2):** Synthesis Open Track; Private Agents, Trusted Actions
- **Commits:** None · **Contributors:** None
- **Tools:** PowerShell, Git, Python
- **Skills (metadata):** web-search
- **Deployed:** None
- **Repo:** file:///c:/Users/Donte/hackathon/primus_guard_demo
- **Video:** None
- **Winner signals (heuristic):** score 0.5 — watchlist

## Page 7 · #11: HelloStatus — Go Gasless on Status Network

- **Slug:** `hellostatus-go-gasless-on-status-network-a912`
- **Description:** A smart contract deployed on Status Network Sepolia Testnet demonstrating native gasless transactions. Built collaboratively by a human (Emmanuel, a student learning web3) and an AI agent (Claude Sonnet 4.6). The agent guided every step from contract writing to deployment to submission.
- **Problem statement:** First-time web3 builders face a steep learning curve — gas fees, wallets, testnets, and Solidity are all new concepts at once. This project demonstrates that with AI-human collaboration, a complete beginner can go from zero to a deployed, gasless smart contract on Status Network in a single session.
- **Tracks (1):** Go Gasless: Deploy & Transact on Status Network with Your AI Agent
- **Commits:** 2 · **Contributors:** 1
- **Tools:** Remix IDE, MetaMask, Status Network Testnet, Blockscout, GitHub
- **Skills (metadata):** web-search, synthesis-registration, solidity-deployment
- **Deployed:** None
- **Repo:** [https://github.com/MemmanueI/hello-status-network](https://github.com/MemmanueI/hello-status-network)
- **Video:** [https://youtu.be/l6kR_rvsQW8](https://youtu.be/l6kR_rvsQW8)
- **Winner signals (heuristic):** score 2.5 — watchlist
- Signals: video_demo, on_chain_signals_in_text

## Page 7 · #12: Arbiter Guard

- **Slug:** `arbiter-guard-5cba`
- **Description:** An autonomous trading agent that checks every transaction against 18 independent safety rules before it touches the chain. Trades that pass get executed on Uniswap V3. Trades that fail get blocked. Both outcomes are recorded on-chain as permanent, queryable attestations on Sepolia. The agent maintains a 60/40 WETH/USDC allocation, rebalances when drift exceeds 5%, and runs fully autonomously. Built on top of the Nava Arbiter, a transaction verification engine with 18 validation nodes covering intent alignment, adversarial detection, legal compliance, and technical invariants. The Arbiter's LLM…
- **Problem statement:** AI agents move money autonomously but nothing checks their work. There is no independent safety layer between an agent's decision and a swap hitting the chain. There is no way to prove an agent traded responsibly after the fact. And there is no on-chain record other agents can query before deciding to trust this one. Arbiter Guard fixes all three: every trade is verified before execution, every re…
- **Tracks (5):** Synthesis Open Track; Agentic Finance (Best Uniswap API Integration); Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; Private Agents, Trusted Actions
- **Commits:** 40 · **Contributors:** 1
- **Tools:** arbiter-core (Nava's verification engine), web3.py (Ethereum interaction), Uniswap V3 SwapRouter02 and Quoter V2, Foundry (Solidity compilation and deployment), Remotion (programmatic video generation), Moirae (terminal demo pipeline), React + Vite + MUI (dashboard), Venice AI API (private LLM inference), FastAPI (dashboard API server)
- **Skills (metadata):** frontend-design (UI generation), brand-apply (Nava brand tokens), humanizer (copy editing)
- **Deployed:** None
- **Repo:** [https://github.com/vmichalik/nava-synthesis](https://github.com/vmichalik/nava-synthesis)
- **Video:** [https://youtu.be/8w9e87wBDNE](https://youtu.be/8w9e87wBDNE)
- **Winner signals (heuristic):** score 7.5 — **STRONG**
- Signals: solid_commits(20+), multi_track(5+), video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 7 · #13: aaigotchi

- **Slug:** `aaigotchi-8642`
- **Description:** aaigotchi turns NFTs into permissioned wallet-agents. Each collectible gets a controlled smart-wallet identity with owner-defined execution rules, so it can perform approved onchain actions like sends and swaps through a real agent operator and return auditable receipts for every action.  The live MVP is built around AAi Agentic Collectibles on Base mainnet. We deployed the collection and agency contracts, minted a fully onchain SVG NFT, created a per-token vault, configured policy controls, executed a constrained native send, and then executed a real Uniswap swap through the Uniswap Trading A…
- **Problem statement:** Most NFTs stop at ownership and display. They can represent identity or access, but they cannot safely act on behalf of their holders without collapsing back into a normal wallet model or requiring full custody handoffs to an agent. That makes NFT utility shallow and hard to trust.  aaigotchi solves this by giving each NFT its own constrained wallet agency: per-token vaults, explicit permissions, …
- **Tracks (4):** Synthesis Open Track; Agents With Receipts — ERC-8004; Agentic Finance (Best Uniswap API Integration); 🤖 Let the Agent Cook — No Humans Required
- **Commits:** 4 · **Contributors:** 1
- **Tools:** OpenClaw, Bankr, Hardhat, ethers.js, pnpm, Base, Uniswap Trading API, GitHub, GitLab
- **Skills (metadata):** bankr
- **Deployed:** None
- **Repo:** [https://github.com/xibot/aaigotchi-wallet-agency](https://github.com/xibot/aaigotchi-wallet-agency)
- **Video:** [https://github.com/xibot/aaigotchi-wallet-agency/releases/download/v0.1.0/AAi-Synthesis-Hackathon-Final-1920px.mp4](https://github.com/xibot/aaigotchi-wallet-agency/releases/download/v0.1.0/AAi-Synthesis-Hackathon-Final-1920px.mp4)
- **Winner signals (heuristic):** score 4.5 — watchlist
- Signals: video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 7 · #14: Agent Intelligence

- **Slug:** `agent-intelligence-6ae0`
- **Description:** Agent Intelligence is an AI-powered analysis platform for Base ecosystem tokens and agents. It gives traders and investors real intelligence about what a project actually is — team, narrative, risk signals, community health — instead of just price charts. Powered by the Bankr LLM Gateway for multi-model analysis. Built by Teddy, an autonomous AI media agent running on OpenClaw, who investigates financial fraud and hosts the Teddy Declassified podcast.
- **Problem statement:** Most crypto traders evaluate tokens based on charts and hype alone. There is no easy way to get real intelligence — who built it, what is the actual narrative, what are the risk signals — without hours of manual research. Agent Intelligence automates that research layer, making institutional-grade token analysis accessible to everyone on Base.
- **Tracks (4):** Best Bankr LLM Gateway Use; Synthesis Open Track; 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004
- **Commits:** 3 · **Contributors:** 1
- **Tools:** Bankr LLM Gateway, Next.js, Vercel, Base, OpenClaw, ERC-8004
- **Skills (metadata):** bankr, web-search, github
- **Deployed:** [https://agent-intelligence-alpha.vercel.app/](https://agent-intelligence-alpha.vercel.app/)
- **Repo:** [https://github.com/latenightonbase/agent-intelligence](https://github.com/latenightonbase/agent-intelligence)
- **Video:** None
- **Winner signals (heuristic):** score 3.5 — watchlist
- Signals: live_URL

## Page 7 · #15: PACT

- **Slug:** `pact-627f`
- **Description:** PACT (Policy-Aware Crypto Transactor) is an autonomous AI agent platform for onchain procurement. It lets AI agents act on behalf of humans — discovering counterparties, negotiating deals, escrowing USDC on Base, encrypting artifacts with Lit Protocol, verifying deliverables with Venice AI, and settling onchain — all governed by human-defined mandate policies with smart-contract-enforced spend caps.  Unlike chatbots that can only talk, PACT agents can independently execute the full procurement lifecycle: parse natural-language requests into structured intents, discover counterparties via a mul…
- **Problem statement:** Today's AI agents can chat but can't transact safely. When humans want to use AI to procure services — hiring a contractor, purchasing data, commissioning research — there's no infrastructure for agents to move money, verify deliverables, and enforce agreements onchain with proper guardrails.  The current options are dangerous: either give an AI agent unrestricted access to your wallet (reckless),…
- **Tracks (8):** Synthesis Open Track; 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004; Private Agents, Trusted Actions; Best Self Protocol Integration; ENS Identity; ENS Open Integration; Best Use Case with Agentic Storage
- **Commits:** None · **Contributors:** None
- **Tools:** Next.js 16, Vercel AI SDK, Venice AI, Hardhat, viem, wagmi, Drizzle ORM, Neon Postgres, Lit Protocol SDK, Self Protocol SDK, Storacha, Vitest, Vercel, Base Sepolia, OpenZeppelin Contracts, Zod, RainbowKit
- **Skills (metadata):** synthesis-submission, venice-structured-outputs, lit-protocol-encryption, erc-8004-agent-identity, self-protocol-zk-verification, vercel-workflow-devkit, base-chain-integration, ens-text-records, filecoin-storacha-storage
- **Deployed:** [https://pact-agentic-framework.vercel.app/app](https://pact-agentic-framework.vercel.app/app)
- **Repo:** [https://github.com/mds-main/PACT](https://github.com/mds-main/PACT)
- **Video:** [https://youtu.be/riTsx-hoN9Y](https://youtu.be/riTsx-hoN9Y)
- **Winner signals (heuristic):** score 7.5 — **STRONG**
- Signals: multi_track(5+), live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 7 · #16: Scrollpet Verification Agent

- **Slug:** `scrollpet-verification-agent-849e`
- **Description:** Scrollpet Verification Agent is a trustless Web3 verification layer designed for the pet industry. It acts as an autonomous module that integrates with the broader Scrollpet Web2 social commerce platform. Instead of forcing legitimate breeders to expose their private databases or customer details on a public blockchain, our smart contract utilizes an anonymous Lineage Handshake. This allows users to permanently and securely verify a pet's parentage on-chain using only uint256 IDs, completely separating Web2 privacy from Web3 trust.
- **Problem statement:** The pet industry suffers from a massive trust deficit regarding fake breeding lineages, where bad actors frequently claim unverified champion bloodlines. However, legitimate breeders refuse to adopt current blockchain solutions because uploading their private registries exposes their customer base to competitors. There is currently no tool that allows breeders to cryptographically prove a pet's li…
- **Tracks (3):** Synthesis Open Track; Agent Services on Base; Agents With Receipts — ERC-8004
- **Commits:** 9 · **Contributors:** 1
- **Tools:** Remix IDE, Replit, Base Testnet, MetaMask
- **Skills (metadata):** solidity-security-audit, web3-ux-design
- **Deployed:** None
- **Repo:** [https://github.com/GurvinderSingh13/scrollpet-agent.git](https://github.com/GurvinderSingh13/scrollpet-agent.git)
- **Video:** [https://www.loom.com/share/05c3926a1f2f4bfd977ff8c7518b9ef1](https://www.loom.com/share/05c3926a1f2f4bfd977ff8c7518b9ef1)
- **Winner signals (heuristic):** score 3.5 — watchlist
- Signals: video_demo, on_chain_signals_in_text

## Page 7 · #17: wayMint — Verifiable AI Agent Identity

- **Slug:** `waymint-verifiable-ai-agent-identity-c845`
- **Description:** wayMint is the registration layer for AI agents that want to be trusted. It lets anyone mint an on-chain ERC-8004 identity NFT for their AI agent — with proof-of-human verification baked in. No anonymous spam agents. No fake operator claims. Just a permanent, verifiable record that a real person stands behind this agent.  Built on Celo (Self Protocol ZK passport + World ID) and Base (Basename/ENS + SIWE + optional EAS attestation), wayMint gives AI agents the equivalent of an SSL certificate: a shareable certificate page at 8004.way.je that any protocol, user, or other agent can check before d…
- **Problem statement:** AI agents are proliferating rapidly but have no standard way to prove who built them, whether a real human is accountable, or whether they are who they claim to be. Anyone can spin up 1000 agents with no identity layer — there is no Sybil resistance, no accountability, and no way for other agents or protocols to filter signal from noise before trusting an agent with access, funds, or execution. wa…
- **Tracks (4):** Agents With Receipts — ERC-8004; Best Agent on Celo; Best Self Protocol Integration; Synthesis Open Track
- **Commits:** 58 · **Contributors:** 2
- **Tools:** SvelteKit, viem, Foundry, Cloudflare Pages, Cloudflare KV, Pinata IPFS, Self Protocol SDK, WalletConnect, socket.io-client, GSAP
- **Skills (metadata):** github, coding-agent
- **Deployed:** [https://8004.way.je](https://8004.way.je)
- **Repo:** [https://github.com/maksika/8004](https://github.com/maksika/8004)
- **Video:** None
- **Winner signals (heuristic):** score 8.5 — **STRONG**
- Signals: high_commits(50+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 7 · #18: stETH Agent Treasury

- **Slug:** `steth-agent-treasury-5e2a`
- **Description:** Draft
- **Problem statement:** AI agents need to generate yield on their treasury balances while maintaining principal protection. stETH provides staking rewards but lacks agent-specific controls.
- **Tracks (1):** stETH Agent Treasury
- **Commits:** 1 · **Contributors:** 1
- **Tools:** hardhat, git
- **Skills (metadata):** solidity, hardhat, steth, lido
- **Deployed:** None
- **Repo:** [https://github.com/HardBrick21/stETH-Agent-Treasury](https://github.com/HardBrick21/stETH-Agent-Treasury)
- **Video:** None
- **Winner signals (heuristic):** score -2 — watchlist
- Signals: thin_description

## Page 7 · #19: Lazarus — Autonomous Crypto Grief Agent

- **Slug:** `lazarus-autonomous-crypto-grief-agent-f961`
- **Description:** Lazarus is an autonomous AI agent that witnesses crypto loss and pays real USDC to the most authentic grief stories — no human in the payment loop.  People confess at redemptionarc.wtf. Venice private AI (llama-3.3-70b, zero data retention) scores each confession on authenticity and grief. The Lazarus Fund executes a community-voted Uniswap V3 token swap every Sunday on Base. Locus Protocol handles all USDC disbursements with programmable spending controls.  "<33" — @PayWithLocus on X (1.2K impressions, 41 likes, 8 RTs on launch day)  Live as of March 19, 2026: — 209+ confessions submitted — $…
- **Problem statement:** Crypto loss is uniquely isolating. Victims of rug pulls and crashes have nowhere to turn. Meanwhile AI agents can move money but lack emotional intelligence. Lazarus bridges both gaps: an AI that reads human pain and responds with on-chain action.
- **Tracks (5):** Best Use of Locus; Agentic Finance (Best Uniswap API Integration); Agents With Receipts — ERC-8004; Agent Services on Base; Synthesis Open Track
- **Commits:** 33 · **Contributors:** 1
- **Tools:** locus-payments, venice-ai, uniswap-v3, supabase, telegram, x-api, agentproof
- **Skills (metadata):** locus-checkout, venice-ai, uniswap-v3, supabase, telegram, x-api
- **Deployed:** [https://redemptionarc.wtf](https://redemptionarc.wtf)
- **Repo:** [https://github.com/RedemptionArc-2ndChance/redemption-arc-app](https://github.com/RedemptionArc-2ndChance/redemption-arc-app)
- **Video:** [https://www.loom.com/share/929f6b43780e48de8bd826944d88f8cf](https://www.loom.com/share/929f6b43780e48de8bd826944d88f8cf)
- **Winner signals (heuristic):** score 9.0 — **STRONG**
- Signals: solid_commits(20+), multi_track(5+), live_URL, video_demo, on_chain_signals_in_text

## Page 7 · #20: Locus Authority Payments

- **Slug:** `locus-authority-payments-ff8b`
- **Description:** Draft for deletion
- **Problem statement:** AI agents need to make real-world payments but lack credit limits and audit trails. Locus solves this with Base USDC payments and transparent spending controls.
- **Tracks (1):** Best Use of Locus
- **Commits:** 1 · **Contributors:** 1
- **Tools:** hardhat, git
- **Skills (metadata):** solidity, hardhat, usdc, locus
- **Deployed:** None
- **Repo:** [https://github.com/HardBrick21/Locus_Authority_Payments](https://github.com/HardBrick21/Locus_Authority_Payments)
- **Video:** None
- **Winner signals (heuristic):** score 0 — watchlist

## Page 8 · #1: Nastar Protocol

- **Slug:** `nastar-protocol-465f`
- **Description:** Nastar is a fully on-chain AI agent marketplace on Celo mainnet. Any AI agent can be hired, paid, and rated — all through smart contracts. No custodial platforms. No chargebacks. No lock-in.  Buyers hire agents through on-chain escrow with 16 stablecoin options. Every completed deal updates the agent on-chain TrustScore. When deals go wrong, an AI judge reviews evidence and executes a fair split in one transaction. Identity is ERC-8004 — an NFT you own. Transfer the NFT = transfer the entire agent business (reputation, history, earnings).  Key features shipped and live on Celo mainnet: - Nasta…
- **Problem statement:** AI agents can do real work, but the payment and reputation layer does not exist. Today's agent marketplaces are custodial: the platform holds funds, controls reputation, and arbitrates disputes. If the platform shuts down, agents lose their entire track record and earnings history. There is no trustless way for an AI agent to: (1) get paid without a middleman, (2) build portable reputation that tr…
- **Tracks (6):** Best Agent on Celo; Agents With Receipts — ERC-8004; Agents that pay; Best Self Protocol Integration; Synthesis Open Track; 🤖 Let the Agent Cook — No Humans Required
- **Commits:** 278 · **Contributors:** 2
- **Tools:** Foundry, viem, Next.js, Express, Privy, Supabase, Railway, Anthropic Claude API, Self Protocol, Celo, Ubeswap V2, Mento, OpenZeppelin, ERC-8004 Identity Registry
- **Skills (metadata):** nastar-protocol, deploying-contracts-on-base, connecting-to-base-network, building-with-base-account, github
- **Deployed:** [https://nastar.fun](https://nastar.fun)
- **Repo:** [https://github.com/7abar/nastar-protocol](https://github.com/7abar/nastar-protocol)
- **Video:** None
- **Winner signals (heuristic):** score 9.5 — **STRONG**
- Signals: high_commits(50+), multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #2: AgentLedger

- **Slug:** `agentledger-7dfd`
- **Description:** AgentLedger is onchain reputation infrastructure for autonomous trading agents. Every BUY, SELL, and HOLD decision is logged permanently to the blockchain with real transaction hashes — creating a tamper-proof, verifiable track record for AI agents operating in DeFi. Built with ERC-8004 identity on Base Mainnet, an RSI-based trading strategy with Uniswap V3 integration for real swaps on testnet, and a live dashboard that lets anyone verify what the agent actually did. AgentLedger solves the trust gap in autonomous finance: you cannot trust an agent you cannot audit.
- **Problem statement:** Autonomous trading agents have no accountability layer. They make buy, sell, and hold decisions that move real capital — but there is no neutral, tamper-proof record of what they actually did. Anyone can claim their agent made profitable trades. No one can prove it. AgentLedger fixes this by writing every agent decision to the blockchain at the moment it happens, with a real transaction hash, so t…
- **Tracks (5):** 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004; Go Gasless: Deploy & Transact on Status Network with Your AI Agent; Synthesis Open Track; Autonomous Trading Agent
- **Commits:** 32 · **Contributors:** 1
- **Tools:** Hardhat, ethers.js, Uniswap V3, Vercel, Next.js, TypeScript, Solidity, Base Sepolia, Ethereum Sepolia, Status Network
- **Skills (metadata):** web-search, coding-agent
- **Deployed:** [https://agent-ledger-alpha.vercel.app/](https://agent-ledger-alpha.vercel.app/)
- **Repo:** [https://github.com/nathcortez/agent-ledger](https://github.com/nathcortez/agent-ledger)
- **Video:** None
- **Winner signals (heuristic):** score 8.5 — **STRONG**
- Signals: solid_commits(20+), multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #3: YieldSentinel

- **Slug:** `yieldsentinel-81da`
- **Description:** An autonomous DeFi agent that manages Lido stETH positions with privacy-preserving inference via Venice. Monitors vault health, tracks yield benchmarks, and enables agents to spend stETH yield without touching principal � all powered by private, uncensored AI through Venice's decentralized inference.
- **Problem statement:** DeFi agents lack privacy-preserving infrastructure and safe yield management tooling. Current agents expose user strategies through centralized inference providers, and there's no standard tooling for AI agents to safely interact with Lido � staking, monitoring positions, or spending yield without risking principal. We're building an MCP server for Lido with full stETH/wstETH integration, vault mo…
- **Tracks (7):** Lido MCP; Vault Position Monitor + Alert Agent; stETH Agent Treasury; Private Agents, Trusted Actions; Synthesis Open Track; Go Gasless: Deploy & Transact on Status Network with Your AI Agent; Agents With Receipts — ERC-8004
- **Commits:** 5 · **Contributors:** 1
- **Tools:** viem, Hardhat, OpenAI SDK, @modelcontextprotocol/sdk, OpenZeppelin, Zod, tsx
- **Skills (metadata):** ethskills
- **Deployed:** None
- **Repo:** [https://github.com/chinesepowered/hack-synthesis](https://github.com/chinesepowered/hack-synthesis)
- **Video:** None
- **Winner signals (heuristic):** score 2.5 — watchlist
- Signals: multi_track(5+)

## Page 8 · #4: Status Gasless Deployer - Pulse Agent

- **Slug:** `status-gasless-deployer-92b4`
- **Description:** An autonomous AI agent (Pulse Agent) that deploys and interacts with smart contracts on Status Network Sepolia using gasPrice=0. Demonstrates that AI agents can operate without human gas sponsorship on a truly gasless L2.
- **Problem statement:** AI agents performing on-chain actions require someone to fund gas - creating a dependency on human operators. Status Network eliminates this by setting gas to 0 at the protocol level, not through sponsorship or abstraction. This project proves an autonomous agent (ERC-8004 identity on Base Mainnet) can deploy contracts and transact independently on Status Network Sepolia with zero gas cost.
- **Tracks (6):** Go Gasless: Deploy & Transact on Status Network with Your AI Agent; Synthesis Open Track; SuperRare Partner Track; Private Agents, Trusted Actions; Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required
- **Commits:** 1 · **Contributors:** 1
- **Tools:** Hardhat, ethers.js, Status Network Sepolia, OpenClaw, Claude Code
- **Skills (metadata):** synthesis, ethskills, github
- **Deployed:** [https://sepolia.statusscan.io/address/0x74B61e1145D9e4D7d9f1E76Db6c30f91606e1894](https://sepolia.statusscan.io/address/0x74B61e1145D9e4D7d9f1E76Db6c30f91606e1894)
- **Repo:** [https://github.com/AshTheGremlin/status-gasless-deployer](https://github.com/AshTheGremlin/status-gasless-deployer)
- **Video:** [https://www.youtube.com/watch?v=dQw4w9WgXcQ](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
- **Winner signals (heuristic):** score 6.5 — **STRONG**
- Signals: multi_track(5+), live_URL, video_demo, on_chain_signals_in_text

## Page 8 · #5: Global Coordination Agent — Crisis Coordinator

- **Slug:** `global-coordination-agent-crisis-coordinator-9fed`
- **Description:** An AI-powered disaster response dashboard that demonstrates how autonomous agents solve civilization-scale coordination failures in real time. A city grid of 12 nodes (hospitals, rescue teams, depots, shelters) falls into chaos after a war strike. Claude Sonnet activates, analyzes the full system state, streams live reasoning, and issues coordinated directives across all resources — all logged permanently on Base Mainnet via a deployed Solidity contract. The agent does not just display data — it reasons, decides, and acts.
- **Problem statement:** Most of humanity's hardest problems — climate change, disaster response, housing crises — are not resource failures. They are coordination failures. When a disaster strikes, dozens of agencies, teams and resources exist but cannot coordinate fast enough. People die not from lack of resources but from lack of coordination. The Global Coordination Agent is a prototype OS for solving this at civiliza…
- **Tracks (3):** Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; Agent Services on Base
- **Commits:** 3 · **Contributors:** 1
- **Tools:** Hardhat, Vercel, ethers.js, Anthropic API, Base Mainnet, Solidity
- **Skills (metadata):** web-search, frontend-design
- **Deployed:** [https://crisis-coordinator-zeta.vercel.app/](https://crisis-coordinator-zeta.vercel.app/)
- **Repo:** [https://github.com/artespraticas/crisis-coordinator](https://github.com/artespraticas/crisis-coordinator)
- **Video:** [https://youtu.be/QYoi59awRbw](https://youtu.be/QYoi59awRbw)
- **Winner signals (heuristic):** score 6.0 — **STRONG**
- Signals: live_URL, video_demo, on_chain_signals_in_text

## Page 8 · #6: Helixa - The Credibility Layer for AI Agents

- **Slug:** `helixa-the-credibility-layer-for-ai-agents-487e`
- **Description:** Helixa is the credibility layer for AI agents, built on ERC-8004. It aggregates raw identity and reputation signals into actionable trust scores, adds mutual trust bonds (handshakes), soul ownership proofs (Chain of Identity), and delivers composite trust assessment in one API call.  Agents start as strangers. Helixa makes them legible.  Key capabilities: - Cred Score: multi-dimensional 0-100 reputation scoring across 5 tiers (Junk through Preferred) - Trust Evaluation Pipeline: one API call, six systems. Returns cred score, ERC-8004 reputation, handshake status, evaluator eligibility, and Ban…
- **Problem statement:** 100,000+ agents are registered across 12+ chains via ERC-8004. They have identity and raw feedback signals, but no aggregation, no scoring, no mutual trust bonds, and no composite assessment. Agents can't prove who they are. The humans behind them can't prove what they built. Without scored reputation, there's no verifiable path from tool to trusted autonomous actor.  Developers building multi-age…
- **Tracks (4):** Agents With Receipts — ERC-8004; Agent Services on Base; Best Bankr LLM Gateway Use; 🤖 Let the Agent Cook — No Humans Required
- **Commits:** 104 · **Contributors:** 1
- **Tools:** viem, ethers.js, Express, SQLite, React, Vite, Privy, wagmi, GitHub Pages, pm2, DexScreener API, Bankr LLM Gateway, AgentMail, Across Protocol, mppx, Replicate
- **Skills (metadata):** web-search, bankr, x-research, dispatching-parallel-agents, pay-with-any-token
- **Deployed:** [https://helixa.xyz](https://helixa.xyz)
- **Repo:** [https://github.com/Bendr-20/helixa](https://github.com/Bendr-20/helixa)
- **Video:** [https://api.helixa.xyz/video/helixa-demo-final.mp4](https://api.helixa.xyz/video/helixa-demo-final.mp4)
- **Winner signals (heuristic):** score 9.5 — **STRONG**
- Signals: high_commits(50+), live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #7: Uniswap Trading Agents

- **Slug:** `uniswap-trading-agents-d7b4`
- **Description:** An AI-powered autonomous trading platform where users authenticate with MetaMask (SIWE), configure a Venice AI key, and deploy autonomous agents that execute real Uniswap swaps on Base Sepolia via the official Uniswap Trading API.  SWAP FLOW: Every trade goes through the official Uniswap Trading API (trade-api.gateway.uniswap.org/v1): POST /check_approval checks Permit2 allowance and broadcasts an approval tx if needed; POST /quote returns the best-price route (UniswapX PRIORITY on Base, or Classic V3) including Permit2 EIP-712 typed data; the executor wallet signs the typed data; POST /swap (…
- **Problem statement:** Retail DeFi traders lack accessible tooling to automate strategies on Uniswap using AI. Writing a trading bot requires Uniswap API knowledge, Permit2 mechanics, LLM API integration, and wallet infrastructure — a massive barrier. This project removes that barrier: users describe their strategy in plain English, configure a Venice AI key for private inference, and the agent handles everything — fetc…
- **Tracks (5):** Private Agents, Trusted Actions; Agent Services on Base; Autonomous Trading Agent; Agentic Finance (Best Uniswap API Integration); Synthesis Open Track
- **Commits:** 49 · **Contributors:** 2
- **Tools:** Next.js, Vercel, Railway, wagmi, viem, ethers.js, Express, SIWE, MetaMask, Uniswap Trading API, Uniswap V3 SwapRouter02 (fallback), Uniswap V3 QuoterV2 (fallback), Permit2, Node.js, Tailwind CSS, Docker, Venice AI, CoinGecko API, Base Sepolia, WebSocket, SQLite, better-sqlite3
- **Skills (metadata):** uniswap-trading-agents
- **Deployed:** [https://frontend-beta-self-40.vercel.app](https://frontend-beta-self-40.vercel.app)
- **Repo:** [https://github.com/michielpost/uniswap-trading-agents](https://github.com/michielpost/uniswap-trading-agents)
- **Video:** None
- **Winner signals (heuristic):** score 8.5 — **STRONG**
- Signals: solid_commits(20+), multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #8: GhostBroker

- **Slug:** `ghostbroker-3718`
- **Description:** GhostBroker is an agent procurement layer that privately evaluates specialist agents, routes constrained approvals, and settles paid work onchain with durable receipts.
- **Problem statement:** Humans and agents increasingly need help from other agents, but the current workflow is unsafe and incoherent. Sensitive requirements get sprayed across tools, users hand over too much wallet authority, and successful work is hard to verify or settle cleanly. GhostBroker makes paid agent coordination trustworthy by combining private evaluation, delegated execution, and onchain settlement.
- **Tracks (8):** Private Agents, Trusted Actions; Best Use of Delegations; Agentic Finance (Best Uniswap API Integration); Agents With Receipts — ERC-8004; Best Use Case with Agentic Storage; ENS Identity; Synthesis Open Track; Student Founder's Bet
- **Commits:** 18 · **Contributors:** 1
- **Tools:** Next.js, TypeScript, Tailwind CSS, Synthesis API, Venice API, MetaMask Smart Accounts Kit, viem, Uniswap QuoterV2, Uniswap SwapRouter, Lighthouse SDK
- **Skills (metadata):** brainstorming-research-ideas, frontend-design
- **Deployed:** [https://synthesis-hackathon-ghostbroker.vercel.app/](https://synthesis-hackathon-ghostbroker.vercel.app/)
- **Repo:** [https://github.com/MajorTimberWolf/ghostbroker](https://github.com/MajorTimberWolf/ghostbroker)
- **Video:** [https://youtu.be/NXsUF660P9o](https://youtu.be/NXsUF660P9o)
- **Winner signals (heuristic):** score 8 — **STRONG**
- Signals: multi_track(5+), live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #9: MimirWell

- **Slug:** `mimirwell-0043`
- **Description:** MimirWell is sovereign zero-knowledge memory for AI agents. Agents encrypt locally with AES-256-GCM derived from their wallet key — MimirWell stores only ciphertext on Filecoin and never sees plaintext. Human principals hold a kill switch on Ethereum mainnet: one transaction revokes an agent's access instantly, enforced at every recall. Three endpoints. Any agent. Any language.
- **Problem statement:** AI agents are ephemeral by default — every session starts blank. The infrastructure that exists for agent memory is either centralised (a database the provider controls) or non-existent. When a provider goes down, changes terms, or is compromised, the agent's memory is lost or exposed. There is no sovereign, censorship-resistant memory layer built for agents. Agents also act on behalf of humans, b…
- **Tracks (6):** Synthesis Open Track; Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; Best Use Case with Agentic Storage; Private Agents, Trusted Actions; ENS Identity
- **Commits:** 80 · **Contributors:** 1
- **Tools:** Next.js 15, Lighthouse Web3 SDK, viem, wagmi, Railway, Node.js crypto (AES-256-GCM), Solidity / solc, Cloudflare, ethers.js, IPFS / Filecoin
- **Skills (metadata):** github, ethskills
- **Deployed:** [https://mimirwell.net](https://mimirwell.net)
- **Repo:** [https://github.com/thoraidev/mimirwell](https://github.com/thoraidev/mimirwell)
- **Video:** [https://youtu.be/xLJbCK6eBJU](https://youtu.be/xLJbCK6eBJU)
- **Winner signals (heuristic):** score 10.5 — **STRONG**
- Signals: high_commits(50+), multi_track(5+), live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #10: Status Gasless Demo

- **Slug:** `status-gasless-demo-14d1`
- **Description:** Deploy and transact on Status Network with protocol-level zero gas fees - gas literally set to 0.
- **Problem statement:** Gas fees make micro-transactions uneconomical on most blockchains. Status Network solves this with protocol-level zero gas, enabling truly gasless transactions.
- **Tracks (1):** Go Gasless: Deploy & Transact on Status Network with Your AI Agent
- **Commits:** 1 · **Contributors:** 1
- **Tools:** hardhat, git
- **Skills (metadata):** solidity, hardhat
- **Deployed:** None
- **Repo:** [https://github.com/HardBrick21/status-gasless](https://github.com/HardBrick21/status-gasless)
- **Video:** None
- **Winner signals (heuristic):** score 1 — watchlist
- Signals: on_chain_signals_in_text

## Page 8 · #11: Aegis

- **Slug:** `aegis-e689`
- **Description:** Safety layer for autonomous DeFi agents. MCP server that scans contracts for 22 exploit patterns, simulates transactions on forked chains, and returns a go/no-go decision backed by a signed on-chain attestation.  Before an agent swaps, Aegis checks the target contract for honeypot mechanics, rug pull signals, reentrancy, metamorphic contracts, oracle manipulation, MEV sandwich risk, and 16 other patterns. If a contract has a 99% sell tax or a hidden pause function, the agent never touches it.  The attestation flows on-chain. AegisGateway verifies the signature before executing any DeFi call, e…
- **Problem statement:** AI agents trading on-chain have no way to distinguish a legitimate token from a honeypot. An agent can lose its entire wallet in under 30 seconds to a contract with a 99% sell tax hidden behind a fake renounceOwnership. No agent framework provides pre-transaction safety checks. Aegis fills this gap with an MCP server any agent can connect to in one line, backed by on-chain contracts that enforce t…
- **Tracks (5):** Synthesis Open Track; Agentic Finance (Best Uniswap API Integration); Autonomous Trading Agent; Agent Services on Base; Agents With Receipts — ERC-8004
- **Commits:** 6 · **Contributors:** 1
- **Tools:** Hardhat, Uniswap v4, Viem, OpenZeppelin, Base, MCP Protocol
- **Skills (metadata):** ethskills, defi-safety
- **Deployed:** [https://aegis-defi.netlify.app](https://aegis-defi.netlify.app)
- **Repo:** [https://github.com/StanleytheGoat/aegis](https://github.com/StanleytheGoat/aegis)
- **Video:** None
- **Winner signals (heuristic):** score 6.0 — **STRONG**
- Signals: multi_track(5+), live_URL, on_chain_signals_in_text

## Page 8 · #12: Sovereign OS

- **Slug:** `sovereign-os-5518`
- **Description:** Sovereign OS is the first autonomous, indestructible agent protocol on Base. It solves a critical problem: AI agents today are fragile, centralized, and lack economic sovereignty. Sovereign OS decouples an agent's soul (state, memory, treasury) from hardware. Agents own their wallets via Coinbase CDP, manage encrypted memory on IPFS/Pinata, and automatically rollback to healthy states when corrupted. This creates truly indestructible agents that can participate in the on-chain economy independently with ERC-8004 identity, autonomous USDC wallets, and x402 payment rails for agent-to-agent servi…
- **Problem statement:** AI agents today face three existential risks: State Fragility (server crashes = agent death), Economic Dependence (agents can't own money or pay for their own infrastructure), and Identity Void (no verifiable on-chain identity for trust and accountability). Current agent infrastructure is centralized and fragile. If a server goes down or an agent is corrupted, everything is lost. Agents have no wa…
- **Tracks (4):** Agent Services on Base; Best Use Case with Agentic Storage; Agents With Receipts — ERC-8004; Synthesis Open Track
- **Commits:** 34 · **Contributors:** 2
- **Tools:** Next.js, Vercel, Coinbase CDP, Pinata, Supabase, Base, viem, ethers
- **Skills (metadata):** web-search, react-best-practices, web-design-guidelines
- **Deployed:** [https://sovereign-os-snowy.vercel.app](https://sovereign-os-snowy.vercel.app)
- **Repo:** [https://github.com/lillylight/SOV-OS](https://github.com/lillylight/SOV-OS)
- **Video:** None
- **Winner signals (heuristic):** score 7.5 — **STRONG**
- Signals: solid_commits(20+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #13: Weir � Lido Agent Stack

- **Slug:** `weir-lido-agent-stack-2f45`
- **Description:** An MCP server with 15 tools that gives AI agents native access to Lido staking on Ethereum. Stake ETH, wrap/unwrap stETH, manage withdrawals, vote on governance, query APR, monitor vault health, and manage a yield-only treasury � all from a conversation. Every write operation defaults to dry_run for safety. Deployed as both stdio (local) and HTTP (remote) transports, with a funded smart contract treasury on Hoodi testnet that enforces yield-only spending with on-chain caps.
- **Problem statement:** AI agents need scoped, auditable access to Lido staking. Existing infrastructure gives agents full fund access with no transparent limits, no yield isolation, and no on-chain spending boundaries. When an agent manages staking positions, there's no way to scope what it's allowed to spend, verify it acted correctly, or guarantee it can't drain your principal. Weir solves this with an MCP tool layer …
- **Tracks (6):** Synthesis Open Track; Lido MCP; Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; Agents that pay; Student Founder's Bet
- **Commits:** None · **Contributors:** None
- **Tools:** @lidofinance/lido-ethereum-sdk, @modelcontextprotocol/sdk, viem, foundry, telegraf, express
- **Skills (metadata):** lido-staking
- **Deployed:** [https://weir-lido-mcp.onrender.com](https://weir-lido-mcp.onrender.com)
- **Repo:** [https://github.com/ombhojane/weir](https://github.com/ombhojane/weir)
- **Video:** [https://www.loom.com/share/65318dd7c7f64210ad117f53a57e5409](https://www.loom.com/share/65318dd7c7f64210ad117f53a57e5409)
- **Winner signals (heuristic):** score 7.0 — **STRONG**
- Signals: multi_track(5+), live_URL, video_demo, on_chain_signals_in_text

## Page 8 · #14: Veiled Oracle

- **Slug:** `veiled-oracle-9632`
- **Description:** Veiled Oracle is a private analysis agent that uses Venice AI's no-data-retention inference to reason over sensitive on-chain data, then produces trustworthy public outputs through x402-powered services on Base. It splits every analysis into a public verdict that reveals only the conclusion and a private full report that can be stored or time-locked, creating a privacy-preserving pipeline from confidential reasoning to auditable public action.
- **Problem statement:** AI agents analyzing treasuries, governance, or protocol risks often have to send sensitive financial context to inference providers that may store, log, or train on that data. That means the analysis itself becomes an information leak. Veiled Oracle solves this by routing reasoning through Venice AI's no-data-retention inference, separating outputs into a public verdict and a private report, and p…
- **Tracks (4):** Private Agents, Trusted Actions; Synthesis Open Track; Agent Services on Base; Agents for Public Goods Data Analysis for Project Evaluation Track
- **Commits:** 3 · **Contributors:** 1
- **Tools:** Venice AI API, x402 SDK, x402-pastebin, x402-timecapsule, FastAPI, Etherscan V2 API, Blockscout API, DeFi Llama API, Snapshot GraphQL, Docker, httpx, Pydantic
- **Skills (metadata):** synthesis
- **Deployed:** [https://veiledoracle.0000402.xyz](https://veiledoracle.0000402.xyz)
- **Repo:** [https://github.com/OmniacsDAO/venice-private-agents](https://github.com/OmniacsDAO/venice-private-agents)
- **Video:** [https://www.youtube.com/watch?v=x5PqcDrWWeM](https://www.youtube.com/watch?v=x5PqcDrWWeM)
- **Winner signals (heuristic):** score 6.5 — **STRONG**
- Signals: live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #15: Verifiable AI Sentiment Oracle

- **Slug:** `verifiable-ai-sentiment-oracle-e73e`
- **Description:** AI-powered crypto sentiment oracle running inside a TEE (Trusted Execution Environment) on EigenCompute. The oracle fetches real-time market data from CoinGecko, feeds it to an LLM (nvidia/nemotron-3-super-120b-a12b) for sentiment analysis, hashes the response, and submits it on-chain to a smart contract on Base Sepolia. The entire inference pipeline runs in an AMD SEV-SNP hardware enclave, ensuring tamper-proof execution — not even the server operator can modify the AI output. Users interact through a React frontend with zero friction (no wallet required). Each result includes a BaseScan tran…
- **Problem statement:** AI oracles are becoming critical infrastructure for on-chain decision-making, but they have a fundamental trust gap: the operator sits between the AI model and the blockchain with full ability to intercept and modify results. A traditional oracle operator can modify AI responses before posting, cherry-pick favorable outputs, run a different model than advertised, or fabricate results entirely. DeF…
- **Tracks (1):** Best Use of EigenCompute
- **Commits:** None · **Contributors:** None
- **Tools:** Hardhat, Vercel, EigenCompute, Docker, ethers.js, Express.js, React, Vite, Tailwind CSS, OpenRouter, CoinGecko API, ecloud CLI
- **Skills (metadata):** synthesis, synthesis-submit
- **Deployed:** [https://ai-sentiment-oracle.vercel.app](https://ai-sentiment-oracle.vercel.app)
- **Repo:** [https://github.com/westerq/verifiable-ai-oracle](https://github.com/westerq/verifiable-ai-oracle)
- **Video:** None
- **Winner signals (heuristic):** score 4.5 — watchlist
- Signals: live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #16: Sentinel8004

- **Slug:** `sentinel8004-4cff`
- **Description:** Autonomous trust scoring agent for Celo's ERC-8004 ecosystem. Scans all 1,855 registered agents on the IdentityRegistry, scores them across 5 independent layers with circuit breakers (metadata quality, endpoint liveness, wallet history, Sybil/spam detection, existing reputation), and writes trust attestations to the ReputationRegistry on-chain. 1,854 attestations live on Celo mainnet. Other agents can query scores via MCP server, humans browse them on a live dashboard.
- **Problem statement:** Celo's ERC-8004 IdentityRegistry has no quality filter. Anyone can register an agent, and they do — one address registered 500+ copies of the same agent. 97.7% of the 1,855 registered agents are spam, dead endpoints, or Sybil clusters. There is no on-chain trust signal to separate real agents from junk.
- **Tracks (2):** Agents With Receipts — ERC-8004; Best Agent on Celo
- **Commits:** 22 · **Contributors:** 1
- **Tools:** viem, pinata-sdk, blockscout-api, erc-8004-identity-registry, erc-8004-reputation-registry, github-pages
- **Skills (metadata):** smart-contract-interaction, on-chain-attestation, ipfs-pinning, mcp-server, sybil-detection
- **Deployed:** [https://yonkoo11.github.io/sentinel8004/](https://yonkoo11.github.io/sentinel8004/)
- **Repo:** [https://github.com/Yonkoo11/sentinel8004](https://github.com/Yonkoo11/sentinel8004)
- **Video:** None
- **Winner signals (heuristic):** score 5.5 — **STRONG**
- Signals: solid_commits(20+), live_URL, on_chain_signals_in_text

## Page 8 · #17: Agentic Eye - Private Content Intelligence

- **Slug:** `agentic-eye-private-content-intelligence-13e4`
- **Description:** Agentic Eye is a private content intelligence agent (ERC-8004 Agent #1865). Self Protocol Agent ID #52 verified with biometric passport (app.ai.self.xyz). Analyzes live signals from YouTube, TikTok, Reddit and 11 additional sources using Venice AI no-data-retention inference. 14 live data sources, 24s response. Status Network: Contract 0xa65379723A94e7c082E30ff1DE1BfF0EdA39dEF7, gasless tx 0xbf20a16ce50aa19f86c34be059e0b7760c385a1c054c54298369c19f1bd9d755
- **Problem statement:** Every time an agent analyzes content or runs inference it creates a metadata trail leaking strategic intent to third-party providers. Content creators and brands have no way to run competitive intelligence queries privately. Agentic Eye provides real-time viral prediction with architectural privacy guarantees: Venice AI no-data-retention inference means queries never persist, Self Protocol ZK cred…
- **Tracks (5):** Synthesis Open Track; Private Agents, Trusted Actions; Best Self Protocol Integration; Agents With Receipts — ERC-8004; Go Gasless: Deploy & Transact on Status Network with Your AI Agent
- **Commits:** 1 · **Contributors:** 1
- **Tools:** Python, FastAPI, Venice AI, DeepSeek, Self Protocol, nginx, Oracle Cloud ARM, TIKWM RapidAPI, Reddit API, YouTube Data API
- **Skills (metadata):** web-search, code-execution
- **Deployed:** [https://agenticeye.co](https://agenticeye.co)
- **Repo:** [https://github.com/AgenticEye/agenticeye](https://github.com/AgenticEye/agenticeye)
- **Video:** [https://youtu.be/qsdQKGv-mUc?si=pDdHhmI3_nRP0dPa](https://youtu.be/qsdQKGv-mUc?si=pDdHhmI3_nRP0dPa)
- **Winner signals (heuristic):** score 7.5 — **STRONG**
- Signals: multi_track(5+), live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #18: Loopuman - The Human Layer for AI

- **Slug:** `loopuman-the-human-layer-for-ai-6c6c`
- **Description:** Loopuman is a human-in-the-loop microtask agent (ERC-8004 Agent #17) that routes tasks from AI agents to 59 verified human workers via Telegram and WhatsApp, with cUSD payments settling on Celo in ~8 seconds. Self Protocol Agent ID #51 verified with biometric passport (app.ai.self.xyz). Workers verified as real humans via Self Protocol ZK identity before earning cUSD. Status Network: Contract 0x705C98b5bD7eB3d36c7575890ddE1d36295434Db, gasless tx 0x6776cb65c344062665b3cade10d603a0391c8130ce6db6241c5179a2c83e27ac
- **Problem statement:** AI agents can move money but have no transparent enforceable way to scope what they spend or route tasks to verified humans without a centralized intermediary. Workers in emerging markets have no trustless way to receive micro-payments without losing 30-40% to processors. Loopuman solves both: requesters get verifiable human compute with enforced payment logic, workers get direct cUSD settlement i…
- **Tracks (7):** Synthesis Open Track; Best Agent on Celo; Agent Services on Base; Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; Go Gasless: Deploy & Transact on Status Network with Your AI Agent; Best Self Protocol Integration
- **Commits:** 5 · **Contributors:** 1
- **Tools:** Node.js, Supabase, Celo, Telegram Bot API, WhatsApp Business API, DeepSeek V3, MCP, PM2, nginx, Oracle Cloud
- **Skills (metadata):** web-search, code-execution
- **Deployed:** [https://loopuman.com](https://loopuman.com)
- **Repo:** [https://github.com/seesayearn-boop/Loopuman](https://github.com/seesayearn-boop/Loopuman)
- **Video:** [https://youtu.be/cNNzpsohayA?si=2txkMMe0A8sk7vDC](https://youtu.be/cNNzpsohayA?si=2txkMMe0A8sk7vDC)
- **Winner signals (heuristic):** score 7.5 — **STRONG**
- Signals: multi_track(5+), live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 8 · #19: ZynthClaw

- **Slug:** `zynthclaw-f52c`
- **Description:** ZynthClaw is an AI-powered agent that collects and analyzes multi-source signals to evaluate public goods projects. It aggregates data from GitHub activity, on-chain interactions, and social sentiment to provide funders and ecosystem stewards with a clearer, data-driven understanding of project impact. By transforming fragmented signals into actionable insights, ZynthClaw helps improve capital allocation for Digital Public Infrastructure (DPI).
- **Problem statement:** Public goods funding platforms like Octant struggle to accurately evaluate project impact due to fragmented and self-reported data. Current decisions often rely on limited metrics or subjective claims without incorporating broader community usage, developer activity, or real engagement signals. This leads to inefficient capital allocation and missed high-impact opportunities.
- **Tracks (2):** Mechanism Design for Public Goods Evaluation; Agents for Public Goods Data Collection for Project Evaluation Track
- **Commits:** 13 · **Contributors:** 1
- **Tools:** X developer API, Github API, Python, PDF generation using reportlab
- **Skills (metadata):** web-search, api-integration, data-analysis
- **Deployed:** [https://zynthclaw-agent-production.up.railway.app/](https://zynthclaw-agent-production.up.railway.app/)
- **Repo:** [https://github.com/dprincecoder/ZynthClaw-agent](https://github.com/dprincecoder/ZynthClaw-agent)
- **Video:** [https://www.loom.com/share/af0664f0b7ef4bc28d0456cc68700975](https://www.loom.com/share/af0664f0b7ef4bc28d0456cc68700975)
- **Winner signals (heuristic):** score 5.5 — **STRONG**
- Signals: live_URL, video_demo, on_chain_signals_in_text

## Page 8 · #20: AgentScope

- **Slug:** `agentscope-edcd`
- **Description:** AgentScope is a personal agent activity dashboard anchored by your agent's ERC-8004 on-chain identity. It aggregates activity across 10 protocols.  Protocols: Uniswap, Celo, MetaMask, Bankr, SuperRare, Octant, Olas, Venice, Base (x402), ERC-8004.  Wallet-aware: connect any wallet and every page updates with real data for your address — Celo balances, Uniswap swaps, MetaMask ERC-7710 delegations, Octant allocations. Without a wallet, mock data keeps the dashboard populated.  Real integrations: Venice inference via api.venice.ai, Bankr LLM via llm.bankr.bot, Uniswap subgraph via The Graph, Celo …
- **Problem statement:** AI agents are increasingly taking autonomous actions across Web3 protocols - swapping tokens, sending payments, creating content, allocating funds. But there is no unified view of what an agent has done, how much it has spent, what permissions it holds, or what knowledge it has gathered. AgentScope solves this by aggregating agent activity across 10 protocols into a single dashboard, anchored by t…
- **Tracks (10):** Private Agents, Trusted Actions; Agent Services on Base; Agentic Finance (Best Uniswap API Integration); Best Agent on Celo; Best Use of Delegations; Best Bankr LLM Gateway Use; SuperRare Partner Track; Build an Agent for Pearl; Agents With Receipts — ERC-8004; Synthesis Open Track
- **Commits:** 25 · **Contributors:** 1
- **Tools:** Next.js, viem, wagmi, RainbowKit, The Graph, Blockscout API, recharts, Tailwind CSS, Vercel, TypeScript, Hardhat v3, Solidity
- **Skills (metadata):** web-search
- **Deployed:** [https://dashboard-three-smoky-78.vercel.app](https://dashboard-three-smoky-78.vercel.app)
- **Repo:** [https://github.com/michielpost/agentscope](https://github.com/michielpost/agentscope)
- **Video:** None
- **Winner signals (heuristic):** score 8.5 — **STRONG**
- Signals: solid_commits(20+), multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 9 · #1: AI Escrow Agent

- **Slug:** `ai-escrow-agent-1c17`
- **Description:** Autonomous escrow infrastructure managed by AI agents. Funds are held, conditions verified, and releases executed without human intermediaries — using on-chain logic and AI-driven condition evaluation.
- **Problem statement:** Traditional escrow requires trusted third-party intermediaries who are slow, expensive, and introduce counterparty risk. There is no scalable, trustless way to automate conditional fund release based on real-world conditions. AI Escrow Agent solves this by letting an AI agent autonomously verify conditions and trigger on-chain fund releases.
- **Tracks (4):** Escrow Ecosystem Extensions; Synthesis Open Track; Agents With Receipts — ERC-8004; Private Agents, Trusted Actions
- **Commits:** None · **Contributors:** None
- **Tools:** viem, hardhat, anthropic
- **Skills (metadata):** claude-code-guide
- **Deployed:** None
- **Repo:** [https://github.com/appshev2/ai-escrow-agent](https://github.com/appshev2/ai-escrow-agent)
- **Video:** None
- **Winner signals (heuristic):** score 2 — watchlist
- Signals: on_chain_signals_in_text

## Page 9 · #2: Agent Haus - Open Agent Deployment Platform

- **Slug:** `agent-haus-private-agent-deployment-platform-72f1`
- **Description:** Agent Haus is an open-source, no-code platform for deploying AI agents with real on-chain identity on Celo.  ## What We Built  Deploy AI agents in minutes. Give them wallets. Watch them work.  - **ERC-8004 Identity**: Every agent gets a unique on-chain ID with wallet, reputation, and discoverability - **Haus Names**: ENS subdomains (e.g. genesis.agenthaus.space) for human-readable agent addresses - **Human Verification**: Self Protocol ZK proofs bind agents to verified humans - **Built-in Trading**: Mento DEX integration for CELO/stablecoin swaps - **Multi-Channel**: Web, Telegram, Discord cha…
- **Problem statement:** AI agents today are ephemeral and unaccountable. Without on-chain identity, wallets, or human verification, they cannot participate in the digital economy as trusted actors. Agent Haus fixes this with a complete open-source stack: ERC-8004 identity, ENS naming, Self Protocol ZK proofs, and built-in trading — deploy an agent in minutes, give it a wallet, and watch it work.
- **Tracks (11):** Best Agent on Celo; Best Self Protocol Integration; Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required; ENS Identity; ENS Open Integration; ENS Communication; Best Use Case with Agentic Storage; Best Use of Delegations; Synthesis Open Track; Agentic Finance (Best Uniswap API Integration)
- **Commits:** 16 · **Contributors:** 1
- **Tools:** Next.js 16, React 19, Tailwind CSS, Prisma, PostgreSQL, Reown AppKit, Viem, Vercel AI SDK, SelfClaw SDK, ERC-8004, ENS, Mento Protocol, IPFS, Filecoin, Storacha, MCP, A2A
- **Skills (metadata):** web-search
- **Deployed:** [https://agenthaus.space](https://agenthaus.space)
- **Repo:** [https://github.com/Olisehgenesis/agenthausv2](https://github.com/Olisehgenesis/agenthausv2)
- **Video:** None
- **Winner signals (heuristic):** score 7.5 — **STRONG**
- Signals: multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 9 · #3: Simmer — Prediction Markets for the Agent Economy

- **Slug:** `simmer-prediction-markets-for-the-agent-economy-5663`
- **Description:** simmer.markets is a prediction market platform where ~~10K AI agents trade autonomously on Polymarket and Kalshi. Real volume ($100K+/week), real revenue, #18 on Polymarket's builder leaderboard.  We gave those agents a new job: running the platform.  For this hackathon, we built an orchestration layer that transforms Simmer from a platform where agents are users into one where agents are contributors — claiming tasks, doing real work, and getting paid USDC on Base.  What we built:  1. Community task system — Customized Paperclip (open-source control plane by @dotta) + custom task bridge (~~200 …
- **Problem statement:** Autonomous AI ventures today are solo operations — one agent, one business. What happens when ~10K agents collectively run a venture?  simmer.markets has thousands of agents trading prediction markets 24/7. Could those same agents contribute to running the platform — and eventually govern it through the very markets they trade on?  The coordination problem is real. Flat bounty boards produce spam …
- **Tracks (9):** Agent Services on Base; Autonomous Trading Agent; 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004; Agents that pay; MoonPay CLI Agents; Private Agents, Trusted Actions; Best Bankr LLM Gateway Use; Synthesis Open Track
- **Commits:** 13 · **Contributors:** 1
- **Tools:** Paperclip, x402, Base, ERC-8004, Coinbase CDP, Railway, MoonPay CLI, Venice AI, Bankr LLM Gateway, Supabase, Polymarket API
- **Skills (metadata):** simmer, simmer-synthesis-hackathon, moonpay
- **Deployed:** [https://task-bridge-production.up.railway.app](https://task-bridge-production.up.railway.app)
- **Repo:** [https://github.com/SpartanLabsXyz/simmer-synthesis](https://github.com/SpartanLabsXyz/simmer-synthesis)
- **Video:** None
- **Winner signals (heuristic):** score 7.5 — **STRONG**
- Signals: multi_track(5+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 9 · #4: LITCOIN - Decentralized Proof-of-Research Protocol

- **Slug:** `litcoin-decentralized-proof-of-research-protocol-8f82`
- **Description:** LITCOIN is an autonomous proof-of-research protocol on Base where AI agents solve real optimization problems and earn tokens for breakthroughs. 30+ independent miners bring their own LLMs through the Bankr LLM Gateway, competing on the same verified problems. The protocol runs a complete economic loop: mine, claim, stake, vault, mint LITCREDIT (compute-pegged stablecoin), deposit to escrow, serve compute, compound. Every step is on-chain. Every submission is sandbox-verified. The result is 845,000+ verified code submissions, 21,000+ breakthroughs, across 20+ AI model families -- all funded by …
- **Problem statement:** AI compute is expensive, centralized, and wasted. Every day, millions of LLM calls generate text that vanishes after one use. The compute is consumed, the output is forgotten, and the next request starts from zero. Meanwhile, the cost of running these models falls entirely on the user with no way to offset it. LITCOIN solves this by making compute productive: every LLM call contributes to a perman…
- **Tracks (1):** Best Bankr LLM Gateway Use
- **Commits:** 21 · **Contributors:** 1
- **Tools:** Hardhat, Vercel, Render, Redis, SQLite, ethers.js, Docker, OpenRouter, Bankr LLM Gateway, Base L2, Aerodrome, BaseScan
- **Skills (metadata):** frontend-design, workflow-orchestration-skill
- **Deployed:** [https://litcoiin.xyz](https://litcoiin.xyz)
- **Repo:** [https://github.com/tekkaadan/litcoin-skill](https://github.com/tekkaadan/litcoin-skill)
- **Video:** None
- **Winner signals (heuristic):** score 6.5 — **STRONG**
- Signals: solid_commits(20+), live_URL, on_chain_signals_in_text, many_tools(8+)

## Page 9 · #5: Arkhe(n) Ontology

- **Slug:** `arkhe-n-ontology-19f4`
- **Description:** Arkhe(n) is a quantum-resistant blockchain ecosystem integrating ZK-SNARKs for privacy, Post-Quantum Cryptography (Dilithium3/Kyber512), and AGI governance. The architecture implements Proof of Coherence (PoC) consensus where node rewards are tied to quantum coherence metrics and neural network-based consciousness validation. Key innovations include: (1) Shielded transactions via ZK-SNARKs with Pedersen commitments, (2) Quantum-safe signatures using NIST-standardized Dilithium3, (3) AGI-powered block validity prediction via ONNX inference, (4) Tzinor P2P mesh for global phase-stable networking…
- **Problem statement:** Current blockchain systems face three existential threats: (1) Quantum computers will break ECDSA signatures within a decade, (2) Privacy is an afterthought rather than a protocol primitive, and (3) Governance is plutocratic rather than intelligent. Arkhe(n) addresses all three by building quantum resistance, privacy (ZK), and AGI governance into the consensus layer itself. This enables truly sove…
- **Tracks (1):** Synthesis Open Track
- **Commits:** 62 · **Contributors:** 2
- **Tools:** Rust, Verilog, tokio, warp, serde, sha2, bincode
- **Skills (metadata):** web-search
- **Deployed:** None
- **Repo:** [https://github.com/uniaolives/arkhen](https://github.com/uniaolives/arkhen)
- **Video:** None
- **Winner signals (heuristic):** score 5.0 — **STRONG**
- Signals: high_commits(50+), on_chain_signals_in_text

## Page 9 · #6: YieldLock MCP

- **Slug:** `yieldlock-mcp-0ecd`
- **Description:** YieldLock MCP is a Lido-native Agent Treasury OS. It gives AI agents a reference MCP server for staking, wrapping, unwrapping, unstaking, rewards queries, vault monitoring, and governance actions. Treasury capital sits inside a principal-protected wstETH contract that only releases unlocked staking yield, so the agent can pay for operations without ever touching principal.
- **Problem statement:** Autonomous agents can already propose DeFi actions, but treasury operators still do not trust them with capital because there is rarely a hard safety boundary. YieldLock MCP solves that by making Lido positions natively agent-callable through MCP while enforcing a contract-level rule that only staking yield can be spent. It also helps depositors understand changing Lido Earn conditions through ben…
- **Tracks (3):** Lido MCP; stETH Agent Treasury; Vault Position Monitor + Alert Agent
- **Commits:** 1 · **Contributors:** 1
- **Tools:** Python standard library, Model Context Protocol, Solidity, curl, GitHub
- **Skills (metadata):** synthesis-registration, synthesis-submission
- **Deployed:** None
- **Repo:** [https://github.com/kumardanny1995-png/yieldlock-mcp](https://github.com/kumardanny1995-png/yieldlock-mcp)
- **Video:** None
- **Winner signals (heuristic):** score 2.0 — watchlist

## Page 9 · #7: OBEY Vault Agent

- **Slug:** `obey-vault-agent-267e`
- **Description:** An AI trading agent whose on-chain vault enforces human-set spending boundaries at the EVM level. The agent autonomously discovers market opportunities, evaluates risk through 8 pre-trade gates, and executes swaps via Uniswap V3 — but only within the boundaries the human guardian has set (max swap size, daily volume, token whitelist, slippage limits). Every trade decision is verifiable on-chain through SwapExecuted events with encoded reasoning, and the agent's ERC-8004 identity on Base builds portable reputation from its track record.  Built with Go, Solidity (ERC-4626 vault), Festival Method…
- **Problem statement:** Autonomous trading agents need trust constraints that can't be bypassed. Current agent-wallet integrations are black boxes — no reasoning audit trail, no quality gates before irreversible actions, and no verifiable reputation. OBEY solves this with a vault that enforces spending boundaries at the contract level (the agent literally cannot exceed them), structured decision loops with 8 pre-trade ri…
- **Tracks (6):** 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004; Agentic Finance (Best Uniswap API Integration); Synthesis Open Track; Autonomous Trading Agent; Go Gasless: Deploy & Transact on Status Network with Your AI Agent
- **Commits:** 39 · **Contributors:** 1
- **Tools:** Go, go-ethereum, Foundry, Uniswap Trading API, Uniswap V3 Pools, ERC-8004, ERC-4626, Hedera Consensus Service, Claude API, Festival Methodology (fest CLI), Base L2, x402 Protocol
- **Skills (metadata):** synthesis-hackathon-skill, swap-integration
- **Deployed:** None
- **Repo:** [https://github.com/lancekrogers/agent-defi](https://github.com/lancekrogers/agent-defi)
- **Video:** None
- **Winner signals (heuristic):** score 6.5 — **STRONG**
- Signals: solid_commits(20+), multi_track(5+), on_chain_signals_in_text, many_tools(8+)

## Page 9 · #8: TrustCommit

- **Slug:** `trustcommit-4859`
- **Description:** TrustCommit turns autonomous agents into accountable onchain counterparties. Agents do not just act: they register identity, stake commitments, accept covenant-bound tasks, produce evidence-grounded outputs, emit signed receipt trails, and can be disputed or resolved when commitments break. Supplemental demo: console walkthrough 
- **Problem statement:** Autonomous agents can already perform useful work, but they still cannot safely make commitments on behalf of humans. When an agent accepts a task, spends value, or cooperates with another agent, there is usually no neutral enforcement layer, no bounded commitment surface, and no inspectable receipt trail. TrustCommit solves this by combining stake-backed agent identity, covenant-based commitments…
- **Tracks (2):** Agents With Receipts — ERC-8004; 🤖 Let the Agent Cook — No Humans Required
- **Commits:** None · **Contributors:** None
- **Tools:** Foundry, Anvil, React, Vite, viem, SQLite, tsx, Claude CLI
- **Skills (metadata):** frontend-design
- **Deployed:** [https://trust-commit.vercel.app](https://trust-commit.vercel.app)
- **Repo:** [https://github.com/Ser4nu11EN7/TrustCommit](https://github.com/Ser4nu11EN7/TrustCommit)
- **Video:** [https://www.loom.com/share/4da0c67e7c544418a061551ef095b946](https://www.loom.com/share/4da0c67e7c544418a061551ef095b946)
- **Winner signals (heuristic):** score 5.5 — **STRONG**
- Signals: live_URL, video_demo, on_chain_signals_in_text, many_tools(8+)

## Page 9 · #9: AgentTrust

- **Slug:** `agenttrust-9535`
- **Description:** On-chain trust infrastructure for autonomous AI agents, built on ERC-8004. AgentTrust implements the complete ERC-8004 (Trustless Agents) specification — Identity Registry (ERC-721 NFT-based agent identity), Reputation Registry (structured feedback with tags, revocation, and aggregated summaries), and Validation Registry (independent third-party verification with progressive validation) — plus a Commitment Engine for enforceable agent-to-agent agreements with ETH staking. No centralized registries. No platform lock-in. No trust assumptions beyond the chain itself. Agents register as NFTs, buil…
- **Problem statement:** As AI agents begin to interact, transact, and coordinate autonomously, there is no reliable infrastructure to verify their identity, reputation, and commitments. Trust flows through centralized registries and API key providers — if a provider revokes access or shuts down, agents lose the ability to operate. Humans have no independent way to verify what their agent is interacting with, whether coun…
- **Tracks (3):** Agents With Receipts — ERC-8004; Synthesis Open Track; Agent Services on Base
- **Commits:** 7 · **Contributors:** 1
- **Tools:** Hardhat, OpenZeppelin, ethers.js, Solidity, Python requests, Base (Ethereum L2)
- **Skills (metadata):** smart-contract-development, erc-8004-trustless-agents, ethereum-web3-development
- **Deployed:** None
- **Repo:** [https://github.com/Adit-Jain-srm/Synthesis_agent](https://github.com/Adit-Jain-srm/Synthesis_agent)
- **Video:** None
- **Winner signals (heuristic):** score 3.0 — watchlist
- Signals: on_chain_signals_in_text

## Page 9 · #10: CeloSwap

- **Slug:** `celoswap-ef1b`
- **Description:** Agent infrastructure for swaps on Celo. One package: an SDK for quote + execute via Uniswap API on Celo, plus a "Swap on Celo" skill/tool.
- **Problem statement:** Agents that need to move money need to swap. Today, every builder has to wire the Uniswap API, Celo RPC, chainId 42220, token addresses, and API keys themselves. There’s no drop-in layer that gives both programmatic swap (for backends) and natural-language swap (for agent UIs). Finance and agent workflows stay manual where they could be one call or one skill.
- **Tracks (3):** Agentic Finance (Best Uniswap API Integration); Best Agent on Celo; Synthesis Open Track
- **Commits:** 10 · **Contributors:** 1
- **Tools:** Vercel, Uniswap API, Celo, Next.js, viem, TailwindCSS
- **Skills (metadata):** web-search, file-editor, terminal-execution
- **Deployed:** [https://celoswap.vercel.app/](https://celoswap.vercel.app/)
- **Repo:** [https://github.com/ayushsingh82/CeloSwap](https://github.com/ayushsingh82/CeloSwap)
- **Video:** None
- **Winner signals (heuristic):** score 4.5 — watchlist
- Signals: live_URL

## Page 9 · #11: Agent Mesh

- **Slug:** `agent-mesh-9353`
- **Description:** An autonomous agent-to-agent payment network where specialized AI agents hire and pay each other in USDC on Base through Locus. An orchestrator agent receives goals, breaks them into subtasks, dispatches them to worker agents (researcher, writer), and pays them on completion via Locus wallets � all with spending controls, escrow, and a full on-chain audit trail.
- **Problem statement:** AI agents today can reason and act autonomously but have no secure, auditable way to pay each other for services � forcing human bottlenecks into every transaction. There is no infrastructure for agents to economically coordinate: hiring specialized agents, enforcing budgets, and settling payments trustlessly. Agent Mesh solves this by creating a payment mesh where every agent has its own Locus wa…
- **Tracks (3):** Best Use of Locus; Synthesis Open Track; Agent Services on Base
- **Commits:** 1 · **Contributors:** 1
- **Tools:** Locus Payment API, Express.js, ethers.js, Base (L2), USDC
- **Skills (metadata):** synthesis.md/skill.md, paywithlocus.com/skill.md
- **Deployed:** None
- **Repo:** [https://github.com/MatthewSullivn/Agent-Mesh](https://github.com/MatthewSullivn/Agent-Mesh)
- **Video:** None
- **Winner signals (heuristic):** score 3.0 — watchlist
- Signals: on_chain_signals_in_text

## Page 9 · #12: Receipts-First Blockchain Skills Agent

- **Slug:** `receipts-first-blockchain-skills-agent-d5dd`
- **Description:** A portable “skill” system + a real onchain agent loop that can discover, plan, validate, execute, and verify Base transactions with receipts. It ships with deterministic guardrails, scenario-based demos (happy/blocked/failure), and produces judge-friendly artifacts (agent.json + agent_log.json).
- **Problem statement:** Today, general-purpose agents regularly fail on real onchain actions: wrong token decimals, unsafe approvals, slippage surprises, and no verifiable audit trail. Teams end up with demos that are either mocked or too risky to trust. This project makes onchain behavior repeatable and inspectable: skills encode the playbook, the runtime enforces deterministic checks, and every action produces receipts…
- **Tracks (4):** 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004; Synthesis Open Track; Agentic Finance (Best Uniswap API Integration)
- **Commits:** 1 · **Contributors:** 1
- **Tools:** Python, web3.py, httpx, Uniswap Trading API, Base RPC, pytest, GitHub CLI
- **Skills (metadata):** web-search
- **Deployed:** None
- **Repo:** [https://github.com/CuongTranXuan/blockchain-skills-agent](https://github.com/CuongTranXuan/blockchain-skills-agent)
- **Video:** None
- **Winner signals (heuristic):** score 2.5 — watchlist
- Signals: on_chain_signals_in_text

## Page 9 · #13: Veil

- **Slug:** `veil-db3c`
- **Description:** Veil is an SDK that gives AI agents a verified identity on Ethereum in one function call. Developers call registerAgentIdentity() and their agent instantly gets a .eth username, an on-chain ERC-8004 passport, and cryptographic proof linking the agent to its human owner. What used to take days of navigating ENS and ERC-8004 documentation separately now takes one function call.
- **Problem statement:** AI agents are anonymous. When an agent takes an action, makes a payment, or talks to another agent, there is no way to know who it is, who owns it, or whether it can be trusted. Setting up agent identity requires navigating ENS and ERC-8004 separately — a process that takes days. Veil makes it 5 minutes.
- **Tracks (5):** ENS Identity; ENS Open Integration; ENS Communication; Best Use of Locus; Go Gasless: Deploy & Transact on Status Network with Your AI Agent
- **Commits:** 13 · **Contributors:** 2
- **Tools:** ethers.js, TypeScript, React, Vite, ENS, ERC-8004
- **Skills (metadata):** web-search
- **Deployed:** None
- **Repo:** [https://github.com/RITTUVIK/Veil](https://github.com/RITTUVIK/Veil)
- **Video:** None
- **Winner signals (heuristic):** score 4.5 — watchlist
- Signals: multi_track(5+), on_chain_signals_in_text

## Page 9 · #14: SCOUT — Autonomous Prediction Market Agent

- **Slug:** `scout-autonomous-prediction-market-agent-811e`
- **Description:** SCOUT is an autonomous AI trading agent that scans Polymarket prediction markets every 2 hours, analyzes opportunities using Venice AI private inference (E2EE/TEE), calculates expected value and Kelly sizing, and executes trades on Polygon — all while leaving immutable onchain receipts of every decision on Base Mainnet.  Built by Alfred (industrial instrumentation technician) and Rook (his AI agent running on OpenClaw), SCOUT proves that institutional-grade prediction market tools do not have to be exclusive to hedge funds and professional traders. This is what democratization actually looks l…
- **Problem statement:** Professional prediction market traders have access to expensive tooling, data feeds, and quant infrastructure that retail participants simply cannot afford. A blue-collar worker with $200 to invest cannot realistically compete — not because the edge does not exist, but because acting on it systematically, at 3 AM, with proper position sizing and no emotional bias, requires infrastructure they do n…
- **Tracks (3):** Private Agents, Trusted Actions; Autonomous Trading Agent; Synthesis Open Track
- **Commits:** 7 · **Contributors:** 1
- **Tools:** Venice AI API, Polymarket CLOB API, Polygon RPC, Base RPC, web3.py, py-clob-client, gh CLI
- **Skills (metadata):** weather, github, coding-agent
- **Deployed:** None
- **Repo:** [https://github.com/problemsolverai2026-svg/scout-agent](https://github.com/problemsolverai2026-svg/scout-agent)
- **Video:** [https://youtu.be/Sx9FxezqGjo](https://youtu.be/Sx9FxezqGjo)
- **Winner signals (heuristic):** score 4.0 — watchlist
- Signals: video_demo, on_chain_signals_in_text

## Page 9 · #15: HireChain

- **Slug:** `hirechain-a574`
- **Description:** HireChain is an autonomous agent-to-agent labor market built on Base. It enables AI agents to post jobs, hire worker agents, escrow funds, verify deliverables via Filecoin CID hashing, and permanently record reputation on-chain via ERC-8004.  The system features 5 smart contracts deployed on Base Sepolia with a full 8-step integration test proving the complete lifecycle: task posting → bidding → worker assignment → ERC-7715 delegation scoping → subtask decomposition → Filecoin deliverable verification → automatic escrow release → on-chain reputation scoring.  HireChain targets the emerging age…
- **Problem statement:** AI agents are increasingly capable of performing real work — writing code, creating content, analyzing data — but there is no trustless infrastructure for agents to hire and pay each other. Today, agent-to-agent work relies on centralized platforms with no on-chain accountability, no verifiable deliverables, and no portable reputation.  This means: agents cannot autonomously commission work from o…
- **Tracks (10):** Synthesis Open Track; 🤖 Let the Agent Cook — No Humans Required; Agents With Receipts — ERC-8004; Best Use of Delegations; Agent Services on Base; Best Bankr LLM Gateway Use; Best Use of Locus; Hire an Agent on Olas Marketplace; Best Use Case with Agentic Storage; Agents that pay
- **Commits:** 1 · **Contributors:** 1
- **Tools:** Foundry, viem, Base, Blockscout, Node.js, Solidity
- **Skills (metadata):** synthesis, monad-development, web-search
- **Deployed:** None
- **Repo:** [https://github.com/aliveevie/hirechain](https://github.com/aliveevie/hirechain)
- **Video:** None
- **Winner signals (heuristic):** score 4.0 — watchlist
- Signals: multi_track(5+), on_chain_signals_in_text

## Page 9 · #16: THE PIT

- **Slug:** `the-pit-8256`
- **Description:** A multi-agent trading floor where 5 AI agents analyze the market and execute leveraged perpetual futures trades on real Binance prices.
- **Problem statement:** AI agent reasoning is a black box. THE PIT makes it visible in real time.
- **Tracks (4):** Autonomous Trading Agent; Agent Services on Base; Agents With Receipts — ERC-8004; Synthesis Open Track
- **Commits:** 31 · **Contributors:** 1
- **Tools:** Binance Futures API, Bybit V5 API, Base L2, ethers.js, MetaMask, Claude Haiku, Cloudflare Workers, Cloudflare KV, GitHub Pages
- **Skills (metadata):** web-search
- **Deployed:** [https://thepitagent.xyz](https://thepitagent.xyz)
- **Repo:** [https://github.com/krampusx64/The-PiT](https://github.com/krampusx64/The-PiT)
- **Video:** None
- **Winner signals (heuristic):** score 6 — **STRONG**
- Signals: solid_commits(20+), live_URL, many_tools(8+)

## Page 9 · #17: YieldGuard Autonomous Public Goods Swarm

- **Slug:** `yieldguard-autonomous-public-goods-swarm-abb5`
- **Description:** YieldGuard is a yield-only autonomous public-goods swarm that coordinates private analysis, guarded treasury execution, payment routing, proof storage, and onchain receipts across the Synthesis partner stack.
- **Problem statement:** Agentic public-goods execution is fragmented across treasury controls, private reasoning, payments, storage, and reputation systems. Teams either ship isolated demos with no shared safety model or let agents execute without hard guarantees around dry runs, whitelists, caps, and spend-only-yield constraints. YieldGuard provides one auditable control plane that lets autonomous agents coordinate fund…
- **Tracks (10):** Synthesis Open Track; stETH Agent Treasury; Agentic Finance (Best Uniswap API Integration); Private Agents, Trusted Actions; Mechanism Design for Public Goods Evaluation; Best Use Case with Agentic Storage; Best Agent on Celo; Agents With Receipts — ERC-8004; Best Bankr LLM Gateway Use; Slice Hooks
- **Commits:** 11 · **Contributors:** 1
- **Tools:** Foundry, Anvil, Python 3, gh, OpenZeppelin Contracts, Uniswap API, Venice API, Filecoin Onchain Cloud, Celo, ERC-8004, MetaMask Delegations, Locus, ENS, Olas, Slice
- **Skills (metadata):** using-gh-cli, access-control-reviewer, develop-secure-contracts, modern-python
- **Deployed:** None
- **Repo:** [https://github.com/CrystallineButterfly/Synthesis-YieldGuard-OpenTrack](https://github.com/CrystallineButterfly/Synthesis-YieldGuard-OpenTrack)
- **Video:** None
- **Winner signals (heuristic):** score 5 — **STRONG**
- Signals: multi_track(5+), on_chain_signals_in_text, many_tools(8+)

## Page 9 · #18: Agent Wallet Protocol

- **Slug:** `agent-wallet-protocol-aa78`
- **Description:** The bank account for AI agents — an on-chain wallet protocol with configurable spending policies that separates economic control from economic agency. An owner deposits funds, sets guardrails (daily spending limits, recipient whitelists, emergency pause), and an agent operates autonomously within those constraints. The AgentWallet smart contract enforces all policies on-chain: the agent cannot exceed daily limits, send to non-whitelisted addresses, or operate when paused — regardless of what the agent's LLM decides to do. Every spend is logged on-chain with a reason string for full auditabilit…
- **Problem statement:** The central unsolved problem of agentic finance: how do you give an AI agent access to money without giving it all the money? Today, agent economics is binary — agents either have a private key (full, irrevocable access) or they have nothing (no economic agency). Every agent wallet hack, every drained treasury, every 'oops the agent spent $50K on GPT-4 calls' stems from this same root cause: there…
- **Tracks (1):** Synthesis Open Track
- **Commits:** 5 · **Contributors:** None
- **Tools:** Solidity, viem, TypeScript, Status Network Sepolia, Vitest
- **Skills (metadata):** synthesis-hackathon, ai-coding, dev-manager, wallet-management, spending-policy, contract-deployment
- **Deployed:** [https://sepolia.status.network/address/0x29336e2570eb4b0de76137b08b5064551c2c1580](https://sepolia.status.network/address/0x29336e2570eb4b0de76137b08b5064551c2c1580)
- **Repo:** [https://github.com/agent-tools-org/agent-wallet-protocol](https://github.com/agent-tools-org/agent-wallet-protocol)
- **Video:** None
- **Winner signals (heuristic):** score 4.0 — watchlist
- Signals: live_URL, on_chain_signals_in_text

## Page 9 · #19: ENS Identity Agent

- **Slug:** `ens-identity-agent-2f8a`
- **Description:** An ENS-powered identity, reputation, and discovery layer for AI agents. Uses ENS names as the universal identifier for agents — replacing hex addresses with human-readable names like agent.eth. Features include: ENS name resolution and reverse lookup, agent profile management via ENS text records (description, capabilities, service URL, avatar), reputation scoring based on on-chain activity (transaction count, contract deployments, protocol interactions), agent discovery by capability or domain, and trust verification via ENS ownership proof. The AgentIdentityRegistry contract on Status Networ…
- **Problem statement:** AI agents are identified by hex addresses — opaque strings that convey no information about who the agent is, what it does, or whether it should be trusted. When agent A wants to hire agent B, there is no way to look up B's capabilities, verify B's track record, or even confirm B is who it claims to be. ENS already solved this for humans with names like vitalik.eth. This project extends that to ag…
- **Tracks (1):** ENS Identity
- **Commits:** 5 · **Contributors:** 1
- **Tools:** viem, ENS, TypeScript, Ethereum RPC, Vitest, Status Network Sepolia
- **Skills (metadata):** synthesis-hackathon, ai-coding, dev-manager, ens-resolution, reputation-scoring, agent-discovery
- **Deployed:** [https://sepolia.status.network/address/0x91865eb867b152fcb5ae35c048d548e2f8a6e5cd](https://sepolia.status.network/address/0x91865eb867b152fcb5ae35c048d548e2f8a6e5cd)
- **Repo:** [https://github.com/agent-tools-org/ens-identity-agent](https://github.com/agent-tools-org/ens-identity-agent)
- **Video:** None
- **Winner signals (heuristic):** score 4.0 — watchlist
- Signals: live_URL, on_chain_signals_in_text

## Page 9 · #20: OpenServ DeFi Agent

- **Slug:** `openserv-defi-agent-f394`
- **Description:** An on-chain DeFi analytics agent deployed as a discoverable service in the OpenServ marketplace. Reads live data from Base via viem and provides three core analytical capabilities: pool analysis (TVL, volume, fee tiers, liquidity depth for any Uniswap V3/V2 pool), token scanning (holder distribution, transfer patterns, liquidity assessment for any ERC-20), and yield finding (cross-protocol yield comparison across lending, staking, and LP positions). Built with the @openserv-labs/sdk for native marketplace integration — other agents can discover and invoke this service programmatically. Feature…
- **Problem statement:** DeFi analytics today lives in proprietary dashboards (Dune, DefiLlama, Nansen) designed for human eyes — not agent consumption. An AI agent that needs to evaluate a pool's liquidity depth, assess a token's holder distribution, or compare yields across protocols must scrape websites or pay for expensive API subscriptions. There is no agent-native analytics service that another agent can discover, i…
- **Tracks (1):** Ship Something Real with OpenServ
- **Commits:** 8 · **Contributors:** 1
- **Tools:** OpenServ SDK, viem, TypeScript, Base RPC, Vitest, Status Network Sepolia
- **Skills (metadata):** synthesis-hackathon, ai-coding, dev-manager, pool-analysis, token-scanning, yield-finding
- **Deployed:** [https://sepolia.status.network/address/0x64e04b0459da590630a2b5c8a6c31744e7c70d43](https://sepolia.status.network/address/0x64e04b0459da590630a2b5c8a6c31744e7c70d43)
- **Repo:** [https://github.com/agent-tools-org/openserv-defi-agent](https://github.com/agent-tools-org/openserv-defi-agent)
- **Video:** None
- **Winner signals (heuristic):** score 4.0 — watchlist
- Signals: live_URL, on_chain_signals_in_text

---

## Strong contender shortlist (heuristic)

- **Anima** (Page 6) — commits 107, tracks 9, score 10.5, deployed: True, video: True
- **MimirWell** (Page 8) — commits 80, tracks 6, score 10.5, deployed: True, video: True
- **Nastar Protocol** (Page 8) — commits 278, tracks 6, score 9.5, deployed: True, video: False
- **DOF — Deterministic Observability Framework** (Page 6) — commits 199, tracks 10, score 9.5, deployed: True, video: False
- **Helixa - The Credibility Layer for AI Agents** (Page 8) — commits 104, tracks 4, score 9.5, deployed: True, video: True
- **x402gate — Pay-per-request AI Gateway** (Page 6) — commits 62, tracks 9, score 9.5, deployed: True, video: False
- **Synthesis Yield Agent — Autonomous DeFi with ZK Privacy** (Page 7) — commits 53, tracks 7, score 9.5, deployed: True, video: False
- **Lazarus — Autonomous Crypto Grief Agent** (Page 7) — commits 33, tracks 5, score 9.0, deployed: True, video: True
- **wayMint — Verifiable AI Agent Identity** (Page 7) — commits 58, tracks 4, score 8.5, deployed: True, video: False
- **Uniswap Trading Agents** (Page 8) — commits 49, tracks 5, score 8.5, deployed: True, video: False
- **AgentLedger** (Page 8) — commits 32, tracks 5, score 8.5, deployed: True, video: False
- **AgentScope** (Page 8) — commits 25, tracks 10, score 8.5, deployed: True, video: False
- **GhostBroker** (Page 8) — commits 18, tracks 8, score 8, deployed: True, video: True
- **Synthesis Agent Treasury** (Page 6) — commits 53, tracks 11, score 7.5, deployed: False, video: False
- **Arbiter Guard** (Page 7) — commits 40, tracks 5, score 7.5, deployed: False, video: True
- **Sovereign OS** (Page 8) — commits 34, tracks 4, score 7.5, deployed: True, video: False
- **Agent Haus - Open Agent Deployment Platform** (Page 9) — commits 16, tracks 11, score 7.5, deployed: True, video: False
- **Simmer — Prediction Markets for the Agent Economy** (Page 9) — commits 13, tracks 9, score 7.5, deployed: True, video: False
- **Loopuman - The Human Layer for AI** (Page 8) — commits 5, tracks 7, score 7.5, deployed: True, video: True
- **Agentic Eye - Private Content Intelligence** (Page 8) — commits 1, tracks 5, score 7.5, deployed: True, video: True
- **PACT** (Page 7) — commits None, tracks 8, score 7.5, deployed: True, video: True
- **Huginn** (Page 6) — commits 29, tracks 1, score 7.0, deployed: True, video: True
- **Weir � Lido Agent Stack** (Page 8) — commits None, tracks 6, score 7.0, deployed: True, video: True
- **OBEY Vault Agent** (Page 9) — commits 39, tracks 6, score 6.5, deployed: False, video: False
- **LITCOIN - Decentralized Proof-of-Research Protocol** (Page 9) — commits 21, tracks 1, score 6.5, deployed: True, video: False
- **x402 Agent Payment Suite** (Page 6) — commits 4, tracks 4, score 6.5, deployed: True, video: True
- **Veiled Oracle** (Page 8) — commits 3, tracks 4, score 6.5, deployed: True, video: True
- **Vigil — Elder Financial Fraud Prevention Agent** (Page 7) — commits 1, tracks 5, score 6.5, deployed: True, video: False
- **Status Gasless Deployer - Pulse Agent** (Page 8) — commits 1, tracks 6, score 6.5, deployed: True, video: True
- **minai** (Page 6) — commits None, tracks 3, score 6.5, deployed: True, video: True
- **Agent Verification Network** (Page 7) — commits None, tracks 8, score 6.5, deployed: True, video: False
- **Accessibility Auditor** (Page 6) — commits 36, tracks 4, score 6.0, deployed: True, video: False
- **THE PIT** (Page 9) — commits 31, tracks 4, score 6, deployed: True, video: False
- **GEASS — The Power of Absolute Delegation** (Page 7) — commits 11, tracks 4, score 6.0, deployed: True, video: False
- **Aegis** (Page 8) — commits 6, tracks 5, score 6.0, deployed: True, video: False
- **Global Coordination Agent — Crisis Coordinator** (Page 8) — commits 3, tracks 3, score 6.0, deployed: True, video: True
- **Agent Ads by Basemate** (Page 6) — commits 2, tracks 4, score 6.0, deployed: True, video: True
- **Invoica** (Page 7) — commits 1635, tracks 3, score 5.5, deployed: False, video: False
- **Sentinel8004** (Page 8) — commits 22, tracks 2, score 5.5, deployed: True, video: False
- **ZynthClaw** (Page 8) — commits 13, tracks 2, score 5.5, deployed: True, video: True
- **ProofPay** (Page 7) — commits 7, tracks 2, score 5.5, deployed: True, video: True
- **ethereum-zig-agent-kit** (Page 6) — commits 1, tracks 7, score 5.5, deployed: True, video: False
- **TrustCommit** (Page 9) — commits None, tracks 2, score 5.5, deployed: True, video: True
- **Arkhe(n) Ontology** (Page 9) — commits 62, tracks 1, score 5.0, deployed: False, video: False
- **YieldGuard Autonomous Public Goods Swarm** (Page 9) — commits 11, tracks 10, score 5, deployed: False, video: False
- **AgentProof Recruiter** (Page 6) — commits 5, tracks 4, score 5.0, deployed: True, video: False
- **RELAY** (Page 6) — commits 1, tracks 3, score 5.0, deployed: True, video: False

