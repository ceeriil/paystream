import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { StepperFormValues } from "@/types/hook-stepper";

const Review = () => {
  const { watch } = useFormContext<StepperFormValues>();
  const formValues = watch();

  // Calculate end date based on start date and duration
  const startDate = formValues.startDate
    ? new Date(formValues.startDate)
    : null;
  const endDate =
    startDate && typeof formValues.duration === "number"
      ? new Date(
          startDate.getTime() +
            formValues.duration * getDurationInMs(formValues.durationUnit)
        )
      : null;

  // Calculate amount per period
  const amountPerPeriod =
    typeof formValues.tokenAmount === "number" &&
    typeof formValues.duration === "number"
      ? formValues.tokenAmount / formValues.duration
      : 0;

  function getDurationInMs(unit: string | undefined): number {
    switch (unit) {
      case "hour":
        return 60 * 60 * 1000;
      case "day":
        return 24 * 60 * 60 * 1000;
      case "week":
        return 7 * 24 * 60 * 60 * 1000;
      case "month":
        return 30 * 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  }

  return (
    <div>
      <h4 className="stepper_step_heading">Review Contract</h4>
      <div className="stepper_step_container">
        <div className="grid grid-cols-2 gap-4">
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
            <p className="text-lg">{endDate ? format(endDate, "PPP") : "-"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Amount per {formValues.durationUnit || "period"}
            </label>
            <p className="text-lg">
              {amountPerPeriod > 0
                ? `${amountPerPeriod.toFixed(2)} ${formValues.token}`
                : "-"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Amount
            </label>
            <p className="text-lg">
              {formValues.tokenAmount ? `${formValues.tokenAmount} USDC` : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
