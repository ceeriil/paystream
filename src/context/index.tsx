"use client";

import { wagmiAdapter, projectId } from "@/config/wagmi";
import { solanaAdapter } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { base, solana, sepolia, solanaDevnet } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const metadata = {
  name: "Paystream",
  description: "Paystream",
  url: "https://paystream.io",
  icons: ["https://paystream.io/favicon.ico"],
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

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default AppKitProvider;
