import { useFormContext } from "react-hook-form";
import { Wallet } from "lucide-react";
import { StepperFormValues } from "@/types/hook-stepper";
import { FloatingLabelInput } from "../ui/floating-input";
import { Button } from "../ui/button";

const Recipients = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Recipient Information</h4>
      <div className="stepper_step_container">
        <FloatingLabelInput
          id="tokenAmount"
          label="Amount"
          type="number"
          {...register("tokenAmount", { required: "Required" })}
          error={errors.tokenAmount?.message}
        />

        <div className="relative">
          <FloatingLabelInput
            id="recipientWallet"
            label="Recipient Wallet Address"
            type="text"
            className="pr-12"
            {...register("recipientWallet", { required: "Required" })}
            error={errors.recipientWallet?.message}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => {
              // Will be implemented later
              console.log("Select wallet");
            }}
          >
            <Wallet className="h-5 w-5" />
          </Button>
        </div>

        <FloatingLabelInput
          id="recipientEmail"
          label="Recipient Email"
          type="email"
          {...register("recipientEmail", { required: "Required" })}
          error={errors.recipientEmail?.message}
        />
      </div>
    </div>
  );
};

export default Recipients;
