import { Controller, useFormContext } from "react-hook-form";
import { StepperFormValues } from "@/types/hook-stepper";
import { DatePickerField } from "../DatePickerField";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  unlockScheduleOptions,
  vestingDurationOptions,
  DEFAULT_TOKENS,
} from "@/constants";
import { useState } from "react";
import { useAppKitNetwork } from "@reown/appkit/react";

const Configuration = () => {
  const { control, register, watch } = useFormContext<StepperFormValues>();

  const selectedPaymentType = watch("paymentType");
  const [cliffAmount, setCliffAmount] = useState(0);
  const { caipNetwork } = useAppKitNetwork();
  const network =
    (caipNetwork as { network?: string })?.network ?? "solana-devnet";
  const tokens =
    DEFAULT_TOKENS[network as keyof typeof DEFAULT_TOKENS] ||
    DEFAULT_TOKENS["solana-devnet"];

  return (
    <div>
      <h4 className="stepper_step_heading">Configuration</h4>
      <div className=" my-8 gap-8 gap-y-4 lg:gap-y-8 grid sm:grid-cols-2">
        <div>
          <label
            htmlFor="paymentType"
            className="text-sm text-neutral-300 mb-2 inline-block">
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
                  <SelectTrigger className=" bg-[#171818] h-10 border-none rounded-xl">
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
            className="text-sm text-neutral-300 mb-2 inline-block">
            Token
          </label>
          <Controller
            name="token"
            control={control}
            rules={{ required: "Required" }}
            defaultValue={tokens[0].mint}
            render={({ field: { value }, fieldState: { error } }) => (
              <div>
                <Select value={value || tokens[0].mint} disabled>
                  <SelectTrigger className=" bg-[#171818] h-10 border-none rounded-xl">
                    <SelectValue>{tokens[0].name}</SelectValue>
                  </SelectTrigger>
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
              className="text-sm text-neutral-300 mb-2 inline-block">
              Cliff Amount (%)
            </label>
            <Input
              id="cliffAmount"
              type="number"
              min="0"
              max="100"
              className="rounded-xl bg-[#171818] h-10 border-none"
              value={cliffAmount}
              {...register("cliffAmount", {
                required: "Cliff amount is required for this payment type",
                validate: (value) =>
                  Number(value) >= 0 && Number(value) <= 100
                    ? true
                    : "Cliff amount must be between 0 and 100",
                onChange: (e) => {
                  setCliffAmount(e.target.value);
                },
              })}
            />
          </div>
        )}
        {/* Duration and Duration Unit */}
        <div>
          <label
            htmlFor="duration"
            className="text-sm text-neutral-300 mb-2 inline-block">
            Payment Duration
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="duration"
              type="number"
              placeholder="0"
              className=" bg-[#171818] h-10 border-none rounded-xl"
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
                    <SelectTrigger className=" bg-[#171818] h-10 border-none rounded-xl">
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
            className="text-sm text-neutral-300 mb-2 inline-block">
            Unlock Schedule
          </label>
          <Controller
            name="unlockSchedule"
            control={control}
            rules={{ required: "Required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className=" bg-[#171818] h-10 border-none rounded-xl">
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

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="text-sm text-neutral-300 mb-2 inline-block">
              Start Date
            </label>
            <DatePickerField
              name="startDate"
              control={control}
              rules={{ required: "Start date is required" }}
              placeholder="Select start date"
            />
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="text-sm text-neutral-300 mb-2 inline-block ">
              Start Time
            </label>
            <Input
              id="startTime"
              className=" bg-[#171818] h-10 border-none rounded-xl "
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
