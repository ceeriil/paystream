import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { StepperFormValues } from "@/types/hook-stepper";
import { calculateUnlockDate } from "@/helpers";

const Review = () => {
  const { watch } = useFormContext<StepperFormValues>();
  const formValues = watch();

  const startDate = formValues.startDate
    ? new Date(formValues.startDate)
    : null;
  const duration = formValues.duration ? Number(formValues.duration) : 0;
  const endDate =
    startDate && duration
      ? calculateUnlockDate(startDate, duration, formValues.durationUnit)
      : null;

  const tokenAmount = formValues.tokenAmount
    ? Number(formValues.tokenAmount)
    : 0;
  const amountPerPeriod = duration ? tokenAmount / duration : 0;

  return (
    <div>
      <h4 className="stepper_step_heading">Review Contract</h4>
      <div className="stepper_step_container">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Start Date
            </label>
            <p className="text-lg">
              {startDate ? format(startDate, "PPP") : "-"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              End Date
            </label>
            <p className="text-lg">{endDate ? format(endDate, "PPP") : "_"}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Amount per {formValues.durationUnit || "period"}
            </label>
            <p className="text-lg">
              {amountPerPeriod > 0 ? `${amountPerPeriod.toFixed(2)} USDC` : "-"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Amount
            </label>
            <p className="text-lg">
              {tokenAmount ? `${tokenAmount.toFixed(2)} USDC` : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
