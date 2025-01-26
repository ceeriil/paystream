/* "use client";

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
 */

"use client";

import { useWrappedReownAdapter } from "@/components/useWrapperRewonedAdapter";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

export const ContextProvider = ({ children }: { children: any }) => {
  // Refer to https://reown.com/appkit
  const { reownAdapter, jupiterAdapter } = useWrappedReownAdapter({
    appKitOptions: {
      metadata: {
        name: "",
        description: ``,
        url: "<YOUR_DOMAIN>", // origin must match your domain & subdomain
        icons: [
          // add icons here
        ],
      },
      projectId: "8f9114c699535670c248f7a3c3b0a007",
      features: {
        analytics: false,
      },
      enableWallets: true,
    },
  });

  const wallets = useMemo(
    () => [
      reownAdapter,
      jupiterAdapter,
      // add more wallets here
    ],
    []
  );

  return (
    <WalletProvider wallets={wallets} autoConnect>
      {children}
    </WalletProvider>
  );
};
