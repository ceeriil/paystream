"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "./ui/button";

export const ConnectButton = () => {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const [storedConnection, setStoredConnection] = useLocalStorage<boolean>(
    "wallet_connected",
    false
  );

  useEffect(() => {
    if (isConnected !== storedConnection) {
      setStoredConnection(isConnected);
    }
  }, [isConnected, setStoredConnection, storedConnection]);

  const handleConnect = () => {
    open();
  };

  const displayAddress = address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : "";

  return (
    <Button onClick={handleConnect} variant="outline" className="font-medium">
      {isConnected ? displayAddress : "Connect Wallet"}
    </Button>
  );
};
