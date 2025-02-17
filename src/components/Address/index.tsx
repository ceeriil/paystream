import React, { useState } from "react";
import Link from "next/link";
import {
  DocumentDuplicateIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import CopyToClipboard from "react-copy-to-clipboard";

type AddressProps = {
  address: string;
  type: "transaction" | "account" | "contract";
  className?: string;
  length?: "short" | "long" | "full";
};

export const Address: React.FC<AddressProps> = ({
  address,
  type,
  className,
  length = "short",
}) => {
  const [addressCopied, setAddressCopied] = useState(false);

  const truncateAddress = (
    address: string,
    length: "short" | "long" | "full",
  ): string => {
    if (length === "full") return address;

    const maxLength = length === "short" ? 10 : 15;
    if (address.length <= maxLength) return address;

    const halfLength = Math.floor((maxLength - 3) / 2);
    return `${address.slice(0, halfLength)}...${address.slice(-halfLength)}`;
  };

  if (!address) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  const url =
    type === "transaction"
      ? `https://solscan.io/tx/${address}`
      : type === "account"
        ? `https://solscan.io/account/${address}`
        : `https://app.streamflow.finance/contract/solana/mainnet/${address}`;

  return (
    <div className={`flex items-center text-center w-full ${className}`}>
      <span>
        <Link href={url} passHref target="_blank">
          {truncateAddress(address, length)}
        </Link>
      </span>
      {addressCopied ? (
        <CheckCircleIcon
          className="ml-2.5 text-xl font-normal text-primary-content h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
      ) : (
        <CopyToClipboard
          text={address}
          onCopy={() => {
            setAddressCopied(true);
            setTimeout(() => {
              setAddressCopied(false);
            }, 800);
          }}
        >
          <DocumentDuplicateIcon
            className="ml-2.5 text-xl font-normal text-primary-content h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
        </CopyToClipboard>
      )}
    </div>
  );
};
