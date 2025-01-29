import { useFormContext } from "react-hook-form";
import { Wallet } from "lucide-react";
import { StepperFormValues } from "@/types/hook-stepper";
import { FloatingLabelInput } from "../ui/floating-input";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Recipients = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<StepperFormValues>();

  return (
    <div>
      <h4 className="stepper_step_heading">Recipient Information</h4>
      <div className="stepper_step_container">
        <div>
        <label
            htmlFor="paymentType"
            className="text-sm text-neutral-300 mb-2 inline-block"
          >
            Token Amount
          </label>
        <Input
          id="tokenAmount"
          type="number"
          {...register("tokenAmount", { required: "Required" })}
        />
        </div>
  

<div>
<label
            htmlFor="recipientWallet"
            className="text-sm text-neutral-300 mb-2 inline-block"
          >
            Recipient Wallet
          </label>
<div className="relative">
          <Input
            id="recipientWallet"
            type="text"
            className="pr-12"
            {...register("recipientWallet", { required: "Required" })}
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
</div>
     

<div>
<label
            htmlFor="recipientEmail"
            className="text-sm text-neutral-300 mb-2 inline-block"
          >
            Recipient Email
          </label>
          <Input
          id="recipientEmail"
          type="email"
          {...register("recipientEmail", { required: "Required" })}
        />
</div>
      
      </div>
    </div>
  );
};

export default Recipients;
