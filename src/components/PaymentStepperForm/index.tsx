"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StepperFormValues } from "@/types/hook-stepper";
import StepperIndicator from "../ui/stepper-indicator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { createStream, useSolanaClient } from "@/services/streamflow";
import {
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
} from "@reown/appkit/react";
import { type Provider } from "@reown/appkit-adapter-solana/react";
import { Keypair } from "@solana/web3.js";
import { DELAY_IN_SECONDS } from "@/constants";
import { TimeUnit } from "@/types";
import { useToast } from "../ui/use-toast";
import { Spinner } from "../Spinner";
import { getBN } from "@streamflow/stream";
import {
  convertDurationToSeconds,
  getCurrentTimestampInSeconds,
  convertDateToTimestamp,
} from "@/helpers";
import { BN } from "@streamflow/stream/solana";
import Configuration from "./Configuration";
import Review from "./Review";
import Recipients from "./Recipients";
import { useRouter } from "next/navigation";
import { DEFAULT_TOKENS } from "@/constants";

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
  const { isConnected } = useAppKitAccount();
  const [isTransactionLoading, setIsTransactionLoading] =
    useState<boolean>(false);
  const [erroredInputName, setErroredInputName] = useState("");
  const methods = useForm<StepperFormValues>({
    mode: "onTouched",
  });
  const { walletProvider } = useAppKitProvider<Provider>("solana");
  const { solanaClient } = useSolanaClient();
  const { caipNetwork } = useAppKitNetwork();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
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
        return;
      }
    }

    setIsTransactionLoading(true);

    const {
      paymentType,
      duration,
      durationUnit,
      unlockSchedule,
      startDate,
      startTime,
      tokenAmount,
      recipientWallet,
    } = formData;

    const network =
      (caipNetwork as { network?: string })?.network || "solana-mainnet";
    const selectedToken =
      DEFAULT_TOKENS[network as keyof typeof DEFAULT_TOKENS]?.find(
        (t) => t.mint === formData.token,
      ) || DEFAULT_TOKENS[network as keyof typeof DEFAULT_TOKENS]?.[0];

    const totalAmountInLamports = getBN(Number(tokenAmount), 6);
    const start = convertDateToTimestamp(startDate, startTime);
    const unlockDurationInSeconds = convertDurationToSeconds(
      1,
      unlockSchedule as TimeUnit,
    );
    const periodInSeconds = convertDurationToSeconds(
      duration,
      durationUnit as TimeUnit,
    );
    const numberOfIntervals = periodInSeconds / unlockDurationInSeconds;
    const amountPerInterval = totalAmountInLamports.div(
      new BN(numberOfIntervals),
    );

    console.log(start);

    /* TODO: update this so it set based on payment type */

    const createStreamParams = {
      recipient: recipientWallet,
      tokenId:
        selectedToken?.mint || "So11111111111111111111111111111111111111112",
      start: getCurrentTimestampInSeconds() + DELAY_IN_SECONDS,
      amount: totalAmountInLamports,
      period: unlockDurationInSeconds,
      cliff: getCurrentTimestampInSeconds() + DELAY_IN_SECONDS,
      cliffAmount: getBN(0, 9),
      amountPerPeriod: amountPerInterval,
      name: "paystream-" + paymentType,
      canTopup: false,
      cancelableBySender: true,
      cancelableByRecipient: false,
      transferableBySender: true,
      transferableByRecipient: false,
      automaticWithdrawal: true,
      withdrawalFrequency: unlockDurationInSeconds,
      partner: undefined,
    };

    console.log(walletProvider, "wallet");

    console.log("createStreamParams", createStreamParams, "stream ready");

    if (!solanaClient) {
      return; //refactor this or show error message later
    }

    await createStream(
      solanaClient,
      createStreamParams,
      {
        sender: walletProvider as unknown as Keypair,
        isNative: false,
      },
      (stream) => {
        toast({
          title: "Success",
          description: `${stream.txId} created successfully.`,
        });
        router.push("/dashboard");
      },
      (error) => {
        toast({
          title: "Error",
          description: `${error} `,
        });
      },
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
    return (
      <div className="fixed z-[10] w-full h-screen left-0 right-0 bg-[#00000040] text-white items-center justify-center flex top-0 backdrop-blur-md">
        <Spinner />
      </div>
    );
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
              disabled={activeStep === 1}>
              Back
            </Button>
            {activeStep === 3 ? (
              <Button
                className="w-[100px] btn-gradient"
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}>
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                className="w-[100px] btn-gradient "
                onClick={handleNext}>
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
