"use client";

import { wagmiAdapter, projectId } from "@/services/reown/wagmi";
import { solanaAdapter } from "@/services/reown/solana";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { base, solana, sepolia, solanaDevnet } from "@reown/appkit/networks";
import React, { useMemo, type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { WalletProvider } from "@solana/wallet-adapter-react";
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

function ContextProvider({
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

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
