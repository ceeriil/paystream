"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StepperFormValues } from "@/types/hook-stepper";
import StepperIndicator from "../ui/stepper-indicator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { createStream } from "@/services/streamflow";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import {
  useAppKitConnection,
  type Provider,
} from "@reown/appkit-adapter-solana/react";
import { useWalletInfo } from "@reown/appkit/react";
import { Keypair } from "@solana/web3.js";
import { DELAY_IN_SECONDS } from "@/constants";
import { TimeUnit } from "@/types";
import { useToast } from "../ui/use-toast";

import { getBN } from "@streamflow/stream";
import {
  convertDurationToSeconds,
  getCurrentTimestampInSeconds,
  returnCancelableBy,
  returnTransferableBy,
  convertDateToTimestamp
} from "@/helpers";
import { BN } from "@streamflow/stream/solana";
import { WalletProvider } from "@solana/wallet-adapter-react";
import Configuration from "./Configuration";
import Review from "./Review";
import Recipients from "./Recipients";
import { useRouter } from "next/navigation";

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return <Configuration />;
    case 2:
      return <Recipients />;
    case 3:
      return <Review />;
    default:
      return "Unknown step";
  }
}

const PaymentStepperForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { toast } = useToast();
  const router = useRouter();
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
        await walletProvider.connect;
      } catch (error) {
        console.error("Wallet connection failed:", error);
        return;
      }
    }

    setIsTransactionLoading(true);
    const {
      paymentType,
      token,
  cliffAmount,
      duration,
      durationUnit,
      unlockSchedule,
      startDate,
      startTime,
      tokenAmount,
      recipientWallet,
      recipientEmail
    } = formData;

    console.log(
      "hmm",
      paymentType,
      token,
  cliffAmount,
      duration,
      durationUnit,
      unlockSchedule,
      startDate,
      startTime,
      tokenAmount,
      recipientWallet,
      recipientEmail
    );

    const totalAmountInLamports = getBN(Number(tokenAmount), 6);
    const start =  convertDateToTimestamp(startDate, startTime)
    const unlockDurationInSeconds = convertDurationToSeconds(
      1,
      unlockSchedule as TimeUnit
    );
    const periodInSeconds = convertDurationToSeconds(
      duration,
      durationUnit as TimeUnit
    );
    const numberOfIntervals = periodInSeconds / unlockDurationInSeconds;
    const amountPerInterval = totalAmountInLamports.div(
      new BN(numberOfIntervals)
    );
    const createStreamParams = {
      recipient: recipientWallet,
      tokenId:
        token !== "Native SOL"
          ? token
          : "So11111111111111111111111111111111111111112",
      start: start + DELAY_IN_SECONDS,
      amount: totalAmountInLamports,
      period: unlockDurationInSeconds,
      cliff: getCurrentTimestampInSeconds() + DELAY_IN_SECONDS,
      cliffAmount: totalAmountInLamports,
      amountPerPeriod: totalAmountInLamports,
      name: "paystream",
      canTopup: false,
      cancelableBySender: false,
      cancelableByRecipient: false,
      transferableBySender: false,
      transferableByRecipient: false,
      automaticWithdrawal: false,
      withdrawalFrequency: 0,
      partner: undefined,
    };

    console.log("createStreamParams", createStreamParams, "stream ready");

    await createStream(
      createStreamParams,
      {
        sender: walletProvider as unknown as Keypair,
        isNative: true,
      },
      (stream) => {
        toast({
          title: "Success",
          description: `${stream.txId} created successfully.`,
        });
        router.push("/");
      },
      (error) => {
        toast({
          title: "Error",
          description: `${error} `,
        });
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

export default PaymentStepperForm;
