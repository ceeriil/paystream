export const DRAWER_WIDTH = "240";
export const DELAY_IN_SECONDS = 60;

export const vestingDurationOptions = [
  "Second",
  "Minute",
  "Hour",
  "Day",
  "Week",
  "Bi-week",
  "Month",
  "Quarter",
  "Year",
];

export const unlockScheduleOptions = [
  { label: "Per Second", value: "Second" },
  { label: "Per Minute", value: "Minute" },
  { label: "Per Hour", value: "Hour" },
  { label: "Daily", value: "Day" },
  { label: "Weekly", value: "Week" },
  { label: "Bi-week", value: "Bi-week" },
  { label: "Monthly", value: "Month" },
  { label: "Quarterly", value: "Quarter" },
  { label: "Yearly", value: "Year" },
];

export const cancellationRights = ["Recipient", "Sender", "Both", "Neither"];
export const transferableRights = ["Recipient", "Sender", "Both", "Neither"];
