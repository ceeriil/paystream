import React from "react";
import { HiOutlineWallet } from "react-icons/hi2";
import { Card } from "../ui/card";
import { ConnectButton } from "../ConnectButton";

export const ConnectWallet = () => {
  return (
    <Card className="flex flex-col items-center justify-center min-h-[20rem] text-center text-gray-400 mt-[4rem] ">
      <HiOutlineWallet size={80} className="mb-5" />
      <p className="text-lg font-semibold mb-4">
        Connect your wallet to start creating and viewing payments.
      </p>
      <ConnectButton />
    </Card>
  );
};
