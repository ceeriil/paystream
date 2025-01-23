import { PermissionRole, TimeUnit } from "@/types";
import BN from "bn.js";

export interface TransferPermissions {
  transferableBySender: boolean;
  transferableByRecipient: boolean;
}

export interface CancelPermissions {
  cancelableBySender: boolean;
  cancelableByRecipient: boolean;
}

export interface ReviewTransaction {
  cancellationRights: PermissionRole;
  mint: string;
  recipient: string;
  tokenAmount: string;
  transferableRights: PermissionRole;
  unlockSchedule: string;
  vestingDuration: number;
  vestingDurationUnit: TimeUnit;
}

/**
 * Returns the current timestamp in seconds
 *
 * @returns {number}
 */
export const getCurrentTimestampInSeconds = (): number => {
  return Math.ceil(new Date().getTime() / 1000);
};

/**
 * Returns the TransferPermissions object based on the PermissionRole
 *
 * @param {PermissionRole} value
 * @returns {TransferPermissions}
 */
export const returnTransferableBy = (
  value: PermissionRole
): TransferPermissions => {
  switch (value) {
    case "Recipient":
      return { transferableBySender: false, transferableByRecipient: true };
    case "Sender":
      return { transferableBySender: true, transferableByRecipient: false };
    case "Both":
      return { transferableBySender: true, transferableByRecipient: true };
    case "Neither":
      return { transferableBySender: false, transferableByRecipient: false };
  }
};

/**
 * return the CancelPermissions object based on the PermissionRole
 *
 * @param {PermissionRole} value
 * @returns {CancelPermissions}
 */
export const returnCancelableBy = (
  value: PermissionRole
): CancelPermissions => {
  switch (value) {
    case "Recipient":
      return { cancelableBySender: false, cancelableByRecipient: true };
    case "Sender":
      return { cancelableBySender: true, cancelableByRecipient: false };
    case "Both":
      return { cancelableBySender: true, cancelableByRecipient: true };
    case "Neither":
      return { cancelableBySender: false, cancelableByRecipient: false };
  }
};

/**
 * Convert the duration to seconds
 *
 * @param {number} duration
 * @param {TimeUnit} unit
 * @returns {number}
 */
export const convertDurationToSeconds = (
  duration: number,
  unit: TimeUnit
): number => {
  const unitToSeconds: { [key in TimeUnit]: number } = {
    Second: 1,
    Minute: 60,
    Hour: 3600,
    Day: 86400,
    Week: 604800,
    "Bi-week": 1209600,
    Month: 2592000,
    Quarter: 7776000,
    Year: 31536000,
  };

  return duration * (unitToSeconds[unit] || 0);
};

export const convertTimestampToFormattedDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

/**
 * Convert a BN value to a number with a specified number of decimal places
 *
 * @param {BN} bnValue - The BN value to convert
 * @param {number} decimals - The number of decimal places
 * @returns {number}
 */
export const convertBNToNumber = (bnValue: BN, decimals: number): number => {
  const divisor = new BN(10).pow(new BN(decimals));
  const result =
    bnValue.div(divisor).toNumber() +
    bnValue.mod(divisor).toNumber() / divisor.toNumber();
  return Number(result.toFixed(1));
};
