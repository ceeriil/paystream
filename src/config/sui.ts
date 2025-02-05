import { defineChain } from "@reown/appkit/networks";
import type {
  Wallet,
  WalletAccount,
  WalletWithRequiredFeatures,
} from "@mysten/wallet-standard";
import { SuietWalletAdapter } from "@suiet/wallet-adapter";

export const customNetwork = defineChain({
  id: 123456789,
  caipNetworkId: "eip155:123456789",
  chainNamespace: "eip155",
  name: "Custom Network",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["RPC_URL"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "BLOCK_EXPLORER_URL" },
  },
  contracts: {
    // Add the contracts here
  },
});

export const suiDevnet = defineChain({
  id: 2,
  caipNetworkId: "sui:devnet",
  chainNamespace: "sui",
  name: "Sui Devnet",
  nativeCurrency: {
    decimals: 9,
    name: "Sui",
    symbol: "SUI",
  },
  rpcUrls: {
    default: {
      http: ["https://sui-testnet-rpc.publicnode.com"],
    },
  },
  blockExplorers: {
    default: { name: "Sui Explorer", url: "https://suiscan.xyz/devnet/home" },
  },
});

export const suiWallet = new SuietWalletAdapter();
