import {
  createPublicClient,
  createWalletClient,
  http,
  type Address,
  type Hex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { config } from "./config.js";

const STATUS_SEPOLIA_CHAIN = {
  id: 1660990954,
  name: "Status Network Sepolia",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [config.rpc.statusSepolia] },
  },
  blockExplorers: {
    default: { name: "StatusScan", url: "https://sepoliascan.status.network" },
  },
} as const;

const EXPLORER = "https://sepoliascan.status.network";

const SIMPLE_STORAGE_BYTECODE: Hex =
  "0x6080604052348015600f57600080fd5b506101508061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea264697066735822122036ab49e9ab9e3974fea0a0b7b8efa1a692961355577259fb2332c58033f32b6a64736f6c63430008220033";

const SIMPLE_STORAGE_ABI = [
  {
    inputs: [],
    name: "retrieve",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "num", type: "uint256" }],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

async function main() {
  console.log("=== Status Network Sepolia — Gasless Deploy & Interact ===\n");

  if (config.wallet.privateKey === "0x") {
    console.error("ERROR: WALLET_PRIVATE_KEY not set in .env");
    process.exit(1);
  }

  const account = privateKeyToAccount(config.wallet.privateKey);
  console.log(`Wallet: ${account.address}`);

  const rpcUrl = config.rpc.statusSepolia;
  console.log(`RPC:    ${rpcUrl}`);

  const publicClient = createPublicClient({
    chain: STATUS_SEPOLIA_CHAIN,
    transport: http(rpcUrl),
  });

  const walletClient = createWalletClient({
    account,
    chain: STATUS_SEPOLIA_CHAIN,
    transport: http(rpcUrl),
  });

  // Step 1: Deploy SimpleStorage contract (gasPrice = 0)
  console.log("\n[1/3] Deploying SimpleStorage contract (gasPrice=0)...");

  const deployHash = await walletClient.sendTransaction({
    data: SIMPLE_STORAGE_BYTECODE,
    gasPrice: 0n,
  });

  console.log(`  Deploy tx: ${deployHash}`);
  console.log(`  Explorer:  ${EXPLORER}/tx/${deployHash}`);

  const deployReceipt = await publicClient.waitForTransactionReceipt({
    hash: deployHash,
  });

  const contractAddress = deployReceipt.contractAddress;
  if (!contractAddress) {
    console.error("ERROR: Contract deployment failed (no address in receipt)");
    process.exit(1);
  }

  console.log(`  Contract:  ${contractAddress}`);
  console.log(`  Status:    ${deployReceipt.status}`);
  console.log(`  Block:     ${deployReceipt.blockNumber}`);

  // Step 2: Gasless interaction — store a value
  console.log("\n[2/3] Storing value 42 (gasless interaction)...");

  const { request: storeRequest } = await publicClient.simulateContract({
    account,
    address: contractAddress,
    abi: SIMPLE_STORAGE_ABI,
    functionName: "store",
    args: [42n],
    gasPrice: 0n,
  });

  const storeTxHash = await walletClient.writeContract(storeRequest);
  console.log(`  Store tx:  ${storeTxHash}`);
  console.log(`  Explorer:  ${EXPLORER}/tx/${storeTxHash}`);

  const storeReceipt = await publicClient.waitForTransactionReceipt({
    hash: storeTxHash,
  });
  console.log(`  Status:    ${storeReceipt.status}`);

  // Step 3: Read back value
  console.log("\n[3/3] Reading stored value...");

  const value = await publicClient.readContract({
    address: contractAddress,
    abi: SIMPLE_STORAGE_ABI,
    functionName: "retrieve",
  });

  console.log(`  Value:     ${value}`);

  // Summary
  console.log("\n=== STATUS NETWORK PROOF ARTIFACTS ===");
  console.log(`Chain:           Status Network Sepolia (${STATUS_SEPOLIA_CHAIN.id})`);
  console.log(`Wallet:          ${account.address}`);
  console.log(`Contract:        ${contractAddress}`);
  console.log(`Deploy TX:       ${deployHash}`);
  console.log(`Gasless TX:      ${storeTxHash}`);
  console.log(`Contract Link:   ${EXPLORER}/address/${contractAddress}`);
  console.log(`Deploy Link:     ${EXPLORER}/tx/${deployHash}`);
  console.log(`Gasless Link:    ${EXPLORER}/tx/${storeTxHash}`);
  console.log("\nDone! Add these to your hackathon submission.");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
