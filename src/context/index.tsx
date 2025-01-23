"use client";

import { solanaWeb3JsAdapter, projectId, networks } from "@/config";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";

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
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    "--w3m-font-family": "urbanist",
  },
});

function ContextProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ContextProvider;
