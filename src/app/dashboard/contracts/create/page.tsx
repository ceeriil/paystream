"use client";

import { useState } from "react";
import { Stepper } from "@/components/ui/stepper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HookMultiStepForm from "@/components/hook-multi-step";

type StepStatus = "complete" | "current" | "upcoming";

interface Step {
  id: number;
  name: string;
  status: StepStatus;
}

const steps: Step[] = [
  { id: 1, name: "Configuration", status: "current" as const },
  { id: 2, name: "Recipients", status: "upcoming" as const },
  { id: 3, name: "Review", status: "upcoming" as const },
];

export default function CreateContract() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepStatus, setStepStatus] = useState(steps);

  const updateStepStatus = (step: number) => {
    const newStatus = stepStatus.map((s) => ({
      ...s,
      status:
        s.id < step
          ? ("complete" as const)
          : s.id === step
            ? ("current" as const)
            : ("upcoming" as const),
    }));
    setStepStatus(newStatus);
    setCurrentStep(step);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Contract</h1>
      </div>

      <Card className="p-6">
        <HookMultiStepForm />
      </Card>
    </div>
  );
}
