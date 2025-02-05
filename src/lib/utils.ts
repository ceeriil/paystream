import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const handleSignMessage = async (walletProvider: any) => {
  try {
    const encodedMessage = new TextEncoder().encode(
      "Sign this message to authenticate with Paystream. This request will not trigger a blockchain transaction or cost any gas fees."
    );
    const signature = await walletProvider.signMessage(encodedMessage);
    const signatureHex = Buffer.from(signature).toString("hex");

    console.log("Signed Message:", signatureHex);

    return signatureHex;
  } catch (error) {
    console.error("Error signing message:", error);
  }
};
