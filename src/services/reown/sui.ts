import { defineChain } from "@reown/appkit/networks";
import { SuietWalletAdapter } from "@suiet/wallet-adapter";

export const suiDevnet = defineChain({
  id: 2,
  caipNetworkId: "eip155:1",
  chainNamespace: "eip155",
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
