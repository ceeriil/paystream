import { Controller, useFormContext } from "react-hook-form";
import { StepperFormValues } from "@/types/hook-stepper";
import { DatePickerSingle } from "../ui/date-picker-single";
import { FloatingLabelInput } from "../ui/floating-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Configuration = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Configuration</h4>
      <div className="stepper_step_container">
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
                  <SelectItem value="SOL">SOL</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
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

        <div className="grid grid-cols-2 gap-4">
          <FloatingLabelInput
            id="duration"
            label="Duration"
            type="number"
            {...register("duration", { required: "Required" })}
            error={errors.duration?.message}
          />

          <Controller
            name="durationUnit"
            control={control}
            rules={{ required: "Required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hour">Hour</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
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
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="cliff">Cliff</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
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

        <Controller
          name="startDate"
          control={control}
          rules={{ required: "Required" }}
          render={({
            field: { onChange, value },
            fieldState: { invalid, error },
          }) => (
            <div>
              <DatePickerSingle
                placeholder="Pick a date"
                onSelect={(date: Date) => onChange(date)}
                selectedDate={value}
                floatingLabel="Start date"
              />
              {invalid && (
                <span className="text-destructive block !mt-[5px] text-[12px]">
                  {error?.message}
                </span>
              )}
            </div>
          )}
        />

        <FloatingLabelInput
          id="startTime"
          label="Start Time"
          type="time"
          {...register("startTime", { required: "Required" })}
          error={errors.startTime?.message}
        />
      </div>
    </div>
  );
};

export default Configuration;
