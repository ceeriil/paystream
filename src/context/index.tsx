"use client";

import { wagmiAdapter, projectId } from "@/config/wagmi";
import { solanaAdapter } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { base, solana, sepolia, solanaDevnet } from "@reown/appkit/networks";
import React, { useMemo, type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { suiDevnet, suiWallet } from "@/config/sui";
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const metadata = {
  name: "Paystream",
  description: "Paystream",
  url: "https://paystreamfi.vercel.app/logo.png",
  icons: ["https://paystreamfi.vercel.app/logo.png"],
};

export const modal = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  projectId,
  networks: [solana, base, sepolia, solanaDevnet],
  defaultNetwork: solanaDevnet,
  metadata: metadata,
  themeMode: "dark",
  features: {
    analytics: true,
  },
  tokens: {
    "solana:mainnet-beta": {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    },
  },
  themeVariables: {
    "--w3m-font-family": "urbanist",
    "--w3m-accent": "#ffffff20",
  },
});

function AppKitProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  return (
    <WalletProvider wallets={wallets} autoConnect={true}>
      <WagmiProvider
        config={wagmiAdapter.wagmiConfig as Config}
        initialState={initialState}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </WalletProvider>
  );
}

export default AppKitProvider;
