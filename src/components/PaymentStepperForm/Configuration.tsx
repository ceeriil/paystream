import { Controller, useFormContext } from "react-hook-form";
import { StepperFormValues } from "@/types/hook-stepper";
import { DatePickerSingle } from "../ui/date-picker-single";
import { DatePickerField } from "../DatePickerField";
import { FloatingLabelInput } from "../ui/floating-input";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { unlockScheduleOptions, vestingDurationOptions } from "@/constants";
import useSolanaTokens from "@/hooks/useSolanaTokens";
import { useState } from "react";

const Configuration = () => {
  const { tokens } = useSolanaTokens();
  const {
    control,
    formState: { errors },
    register,
    watch,
  } = useFormContext<StepperFormValues>();

  // Watch the selected payment type to conditionally render the cliff amount input
  const selectedPaymentType = watch("paymentType");
  const [cliffAmount, setCliffAmount] = useState("");

  return (
    <div>
      <h4 className="stepper_step_heading">Configuration</h4>
      <div className="stepper_step_container">
        {/* Payment Type Select */}
        <div>
          <label
            htmlFor="paymentType"
            className="text-sm text-neutral-300 mb-2 inline-block"
          >
            Payment Type
          </label>
          <Controller
            name="paymentType"
            control={control}
            rules={{ required: "Payment type is required" }}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried Payment</SelectItem>
                    <SelectItem value="contract">Contract Payment</SelectItem>
                    <SelectItem value="one-time">One-Time Payment</SelectItem>
                    <SelectItem value="commitment">
                      Commitment Payment
                    </SelectItem>
                  </SelectContent>
                </Select>
                {error && (
                  <span className="text-destructive block !mt-[5px] text-[12px]">
                    {error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        {/* Token Selection */}
        <div>
          <label
            htmlFor="token"
            className="text-sm text-neutral-300 mb-2 inline-block"
          >
            Token
          </label>
          <Controller
            name="token"
            control={control}
            rules={{ required: "Required" }}
            defaultValue="SOL"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.mint} value={token.mint || ""}>
                        <div className="flex items-center justify-between w-full">
                          <span className="mr-3">
                            {token.name || token.symbol}
                          </span>
                          <span className="text-muted-foreground">
                            {token.balance.toFixed(4)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {error && (
                  <span className="text-destructive block !mt-[5px] text-[12px]">
                    {error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        {(selectedPaymentType === "contract" ||
          selectedPaymentType === "one-time") && (
          <div>
            <label
              htmlFor="cliffAmount"
              className="text-sm text-neutral-300 mb-2 inline-block"
            >
              Cliff Amount (%)
            </label>
            <Input
              id="cliffAmount"
              type="number"
              min="0"
              max="100"
              value={cliffAmount}
              onChange={(e) => setCliffAmount(e.target.value)}
              error={errors.cliffAmount?.message}
              {...register("cliffAmount", {
                required: "Cliff amount is required for this payment type",
                validate: (value) =>
                  value >= 0 && value <= 100
                    ? true
                    : "Cliff amount must be between 0 and 100",
              })}
            />
          </div>
        )}

        {/* Duration and Duration Unit */}
        <div>
          <label
            htmlFor="duration"
            className="text-sm text-neutral-300 mb-2 inline-block"
          >
            Payment Duration
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="duration"
              type="number"
              {...register("duration", { required: "Required" })}
            />

            <Controller
              name="durationUnit"
              control={control}
              rules={{ required: "Required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div>
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {vestingDurationOptions.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {error && (
                    <span className="text-destructive block !mt-[5px] text-[12px]">
                      {error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Unlock Schedule */}
        <div>
          <label
            htmlFor="Unlock Schedule"
            className="text-sm text-neutral-300 mb-2 inline-block"
          >
            Unlock Schedule
          </label>
          <Controller
            name="unlockSchedule"
            control={control}
            rules={{ required: "Required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unlock schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    {unlockScheduleOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {error && (
                  <span className="text-destructive block !mt-[5px] text-[12px]">
                    {error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Start Date */}
          <div>
            <label
              htmlFor="startTime"
              className="text-sm text-neutral-300 mb-2 inline-block"
            >
              Start Date
            </label>
            <DatePickerField
              name="startDate"
              control={control}
              rules={{ required: "Start date is required" }}
              placeholder="Select start date"
            />
          </div>

          {/* Start Time */}
          <div>
            <label
              htmlFor="startTime"
              className="text-sm text-neutral-300 mb-2 inline-block"
            >
              Start Time
            </label>
            <Input
              id="startTime"
              type="time"
              {...register("startTime", { required: "Required" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
