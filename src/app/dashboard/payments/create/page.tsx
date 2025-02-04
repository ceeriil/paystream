"use client";

import { Card } from "@/components/ui/card";
import PaymentStepperForm from "@/components/PaymentStepperForm";

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
