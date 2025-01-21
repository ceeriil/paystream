export const STEPPER_FORM_KEYS = {
  1: [
    "token",
    "duration",
    "durationUnit",
    "unlockSchedule",
    "startDate",
    "startTime",
  ],
  2: ["tokenAmount", "recipientWallet", "recipientEmail"],
  3: ["employmentStatus", "employerName", "jobTitle", "annualIncome"],
  4: ["loanAmount", "loanPurpose", "repaymentTerms", "repaymentStartDate"],
  5: ["bankName", "accountNumber", "routingNumber", "creditScore"],
} as const;
