"use client";

import { solanaWeb3JsAdapter, projectId, networks } from "@/config";
import { createAppKit } from "@reown/appkit/react";
import React, { useMemo, type ReactNode } from "react";
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletProvider } from "@solana/wallet-adapter-react";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "paystream",
  description: "paystream for employees",
  url: "https://github.com/0xoned",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
export const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks,
  metadata,
  themeMode: "dark",
  features: {
    analytics: true,
  },
  themeVariables: {
    "--w3m-font-family": "urbanist",
    "--w3m-accent": "#ffffff20",
  },
});

function ContextProvider({ children }: { children: ReactNode }) {
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  return (
    <>
      <WalletProvider wallets={wallets} autoConnect={true}>
        {children}
      </WalletProvider>
    </>
  );
}

export default ContextProvider;
