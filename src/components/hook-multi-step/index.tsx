"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { STEPPER_FORM_KEYS } from "@/lib/constants/hook-stepper-constants";
import { StepperFormKeysType, StepperFormValues } from "@/types/hook-stepper";

import StepperIndicator from "../ui/stepper-indicator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import AddressInfo from "./recipients";
import ApplicantInfo from "./configuration";
import EmploymentInfo from "./review";
import { createStream } from "@/services/streamflow";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import {
  useAppKitConnection,
  type Provider,
} from "@reown/appkit-adapter-solana/react";

import { getBN } from "@streamflow/stream";
import {
  convertDurationToSeconds,
  getCurrentTimestampInSeconds,
  returnCancelableBy,
  returnTransferableBy,
} from "@/helpers";
import { BN } from "@streamflow/stream/solana";
import { useWalletInfo } from "@reown/appkit/react";
import { WalletProvider } from "@solana/wallet-adapter-react";

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return <ApplicantInfo />;
    case 2:
      return <AddressInfo />;
    case 3:
      return <EmploymentInfo />;
    default:
      return "Unknown step";
  }
}

const HookMultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { walletInfo } = useWalletInfo();
  const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
    useAppKitAccount();
  const [isTransactionLoading, setIsTransactionLoading] =
    useState<boolean>(false);
  const [erroredInputName, setErroredInputName] = useState("");
  const methods = useForm<StepperFormValues>({
    mode: "onTouched",
  });
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  console.log(useAppKitAccount(), "hii");

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  // focus errored input on submit
  useEffect(() => {
    if (walletProvider) {
      console.log("this iswallet info", walletProvider.publicKey);
    }
    const erroredInputElement =
      document.getElementsByName(erroredInputName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setErroredInputName("");
    }
  }, [erroredInputName, walletProvider]);

  const onSubmit = async (formData: StepperFormValues) => {
    console.log({ formData });

    if (!isConnected) {
      try {
        await wallet.connect();
      } catch (error) {
        console.error("Wallet connection failed:", error);
        return;
      }
    }

    setIsTransactionLoading(true);
    const {
      recipient,
      mint,
      tokenAmount,
      vestingDuration,
      vestingDurationUnit,
      unlockSchedule,
    } = formData;

    console.log(
      "hmm",
      recipient,
      mint,
      tokenAmount,
      vestingDuration,
      vestingDurationUnit,
      unlockSchedule
    );

    const totalAmountInLamports = getBN(tokenAmount, 9);
    const unlockDurationInSeconds = convertDurationToSeconds(1, unlockSchedule);
    const periodInSeconds = convertDurationToSeconds(
      vestingDuration,
      vestingDurationUnit
    );
    const numberOfIntervals = periodInSeconds / unlockDurationInSeconds;
    const amountPerInterval = totalAmountInLamports.div(
      new BN(numberOfIntervals)
    );
    const createStreamParams = {
      recipient,
      tokenId:
        mint !== "Native SOL"
          ? mint
          : "So11111111111111111111111111111111111111112",
      start: getCurrentTimestampInSeconds() + DELAY_IN_SECONDS,
      amount: totalAmountInLamports,
      period: unlockDurationInSeconds,
      cliff: getCurrentTimestampInSeconds() + DELAY_IN_SECONDS,
      cliffAmount: totalAmountInLamports,
      amountPerPeriod: totalAmountInLamports,
      name: "TEST TOKEN LOCK",
      canTopup: false,
      cancelableBySender: false,
      cancelableByRecipient: false,
      transferableBySender: false,
      transferableByRecipient: false,
      automaticWithdrawal: false,
      withdrawalFrequency: 0,
      partner: undefined,
    };

    await createStream(
      createStreamParams,
      {
        sender: wallet as unknown as Keypair,
        isNative: true,
      },
      (stream) => {
        showMessage(`${stream.txId} created successfully.`, "success");
        router.push("/");
      },
      (error) => {
        showMessage(`${error}`, "error");
      }
    );
    setIsTransactionLoading(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (isTransactionLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <StepperIndicator activeStep={activeStep} />
      {errors.root?.formError && (
        <Alert variant="destructive" className="mt-[28px]">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Form Error</AlertTitle>
          <AlertDescription>{errors.root?.formError?.message}</AlertDescription>
        </Alert>
      )}
      <FormProvider {...methods}>
        <form noValidate>
          {getStepContent(activeStep)}
          <div className="flex justify-between mt-12">
            <Button
              type="button"
              className="w-[100px]"
              variant="secondary"
              onClick={handleBack}
              disabled={activeStep === 1}
            >
              Back
            </Button>
            {activeStep === 3 ? (
              <Button
                className="w-[100px] btn-gradient"
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                className="w-[100px] btn-gradient "
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default HookMultiStepForm;
