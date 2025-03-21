import { STEPPER_FORM_KEYS } from "@/lib/constants/hook-stepper-constants";

export type StepperFormKeysType =
  (typeof STEPPER_FORM_KEYS)[keyof typeof STEPPER_FORM_KEYS][number];

export type StepperFormValues = {
  [FieldName in StepperFormKeysType]: FieldName extends "duration"
    ? number
    : FieldName extends "startDate"
      ? Date
      : string;
};
