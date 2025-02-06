import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Provider } from "@reown/appkit-adapter-solana/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  if (email.length > 254) {
    return "Email is too long";
  }

  return undefined;
};

export const composeFormValidation = (
  ...validators: ((value: any) => any | undefined)[]
) => {
  return (value: any) =>
    validators.reduce(
      (error: string | undefined, validator) => error || validator(value),
      undefined
    );
};

export abstract class FormValidators {
  static required(value: any) {
    return value ? undefined : "Required";
  }
}

/**
 * Signs a message using the Solana wallet provider.
 * @param {object} walletProvider - The connected wallet provider.
 * @param {string} nonce - A unique nonce for the message.
 * @returns {Promise<string>} - The signed message in hexadecimal format.
 */
export const signMessage = async (walletProvider: Provider, nonce: string) => {
  try {
    const message = `Sign this message to authenticate to Paystream. This request will not trigger a blockchain transaction or cost any gas fees. iat: ${nonce}`;

    const encodedMessage = new TextEncoder().encode(message);

    const signature = await walletProvider.signMessage(encodedMessage);

    const signatureHex = Buffer.from(signature).toString("hex");

    return signatureHex;
  } catch (error) {
    console.error("Error signing message:", error);
    throw error;
  }
};

import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

/**
 * Verifies a signed message using the wallet's public key.
 * @param {string} publicKey - The wallet's public key.
 * @param {string} signatureHex - The signed message in hexadecimal format.
 * @param {string} nonce - The nonce used in the original message.
 * @returns {boolean} - True if the signature is valid, false otherwise.
 */
export const verifyMessage = (
  publicKey: string,
  signatureHex: string,
  nonce: string
) => {
  try {
    const message = `Sign this message to authenticate to Paystream. This request will not trigger a blockchain transaction or cost any gas fees. iat: ${nonce}`;

    const encodedMessage = new TextEncoder().encode(message);

    const signatureBuffer = Buffer.from(signatureHex, "hex");
    const publicKeyBytes = new PublicKey(publicKey).toBytes();

    const isValid = nacl.sign.detached.verify(
      encodedMessage,
      signatureBuffer,
      publicKeyBytes
    );

    return isValid;
  } catch (error) {
    console.error("Error verifying message:", error);
    return false;
  }
};
