"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import PaymentStepperForm from "@/components/PaymentStepperForm";

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
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Payment</h1>
      </div>

      <Card className="p-6">
        <PaymentStepperForm />
      </Card>
    </div>
  );
}
