import { z } from "zod";

export const configurationSchema = z.object({
  paymentType: z.string().min(1, "Payment type is required"),
  token: z.string().min(1, "Required"),
  cliffAmount: z
    .string()
    .optional()
    .refine((val) => val === undefined || (Number(val) >= 0 && Number(val) <= 100), {
      message: "Cliff amount must be between 0 and 100",
    }),
  duration: z
    .string()
    .min(1, "Required")
    .refine((val) => Number(val) > 0, {
      message: "Duration must be greater than 0",
    }),
  durationUnit: z.string().min(1, "Required"),
  unlockSchedule: z.string().min(1, "Required"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((val) => new Date(val) >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Start date cannot be in the past",
    }),
  startTime: z.string().min(1, "Required"),
});

export const recipientSchema = z.object({
  recipientWallet: z.string().min(1, "Recipient wallet is required"),
  tokenAmount: z.string().min(1, "Token amount is required"),
  recipientEmail: z.string().email("Invalid email format").optional(),
});
