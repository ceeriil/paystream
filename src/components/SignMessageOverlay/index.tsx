"use client";

import React, { useState } from "react";
import { signMessage } from "@/lib/utils";
import { Button } from "../ui/button";
import { type Provider } from "@reown/appkit-adapter-solana/react";
import { useAppKitProvider, useDisconnect } from "@reown/appkit/react";
import { useAuth } from "@/context/AuthContext";

interface SignMessageOverlayProps {
  onClose: () => void;
  onSignSuccess: (signatureHex: string) => void;
}

export const SignMessageOverlay: React.FC<SignMessageOverlayProps> = ({
  onClose,
  onSignSuccess,
}) => {
  const [isSigning, setIsSigning] = useState(false);
  const { walletProvider } = useAppKitProvider<Provider>("solana");
  const { signIn } = useAuth();
  const { disconnect } = useDisconnect();

  const handleClose = async () => {
    await disconnect();
    onClose();
  };

  const handleSignMessage = async () => {
    setIsSigning(true);
    try {
      const nonce = new Date().getTime().toString();
      const signatureHex = await signMessage(walletProvider, nonce);
      const publicKey = walletProvider?.publicKey?.toBase58();

      if (!publicKey) {
        throw new Error("No public key available");
      }

      await signIn(signatureHex, publicKey, nonce);
      onSignSuccess(signatureHex);
      onClose();
    } catch (error) {
      console.error("Error signing message:", error);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#ffffff14] backdrop-blur-sm flex items-center justify-center z-50 text-center  ">
      <div className="bg-[#121212] p-6 rounded-2xl border border-[#272727]">
        <h2 className="text-xl font-semibold mb-4">Sign Message</h2>
        <p className="mb-4">
          Please sign the message to authenticate your wallet.
        </p>
        <div className="flex space-x-2">
          <Button
            onClick={handleClose}
            className="px-4 flex-1 py-2 rounded-md dark"
            variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSignMessage}
            disabled={isSigning}
            className="px-4 flex-1 py-2 btn-gradient text-white rounded-md">
            {isSigning ? "Signing..." : "Sign Message"}
          </Button>
        </div>
      </div>
    </div>
  );
};
