"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface AutoConnectContextState {
  autoConnect: boolean;
  setAutoConnect(autoConnect: boolean): void;
}

export const AutoConnectContext = createContext<AutoConnectContextState>(
  {} as AutoConnectContextState
);

export function useAutoConnect(): AutoConnectContextState {
  return useContext(AutoConnectContext);
}

export const AutoConnectProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { open } = useAppKit();
  const { isConnected, status } = useAppKitAccount();

  const [autoConnect, setAutoConnect] = useLocalStorage("autoConnect", true);
  const [storedConnection, setStoredConnection] = useLocalStorage(
    "wallet_connection",
    {
      isConnected: false,
    }
  );

  useEffect(() => {
    // Store connection state
    if (isConnected !== storedConnection.isConnected) {
      setStoredConnection({
        isConnected,
      });
    }

    // Auto reconnect if enabled
    if (
      autoConnect &&
      !isConnected &&
      storedConnection.isConnected &&
      status !== "connecting"
    ) {
      open();
    }
  }, [
    isConnected,
    storedConnection,
    setStoredConnection,
    autoConnect,
    open,
    status,
  ]);

  return (
    <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
      {children}
    </AutoConnectContext.Provider>
  );
};
