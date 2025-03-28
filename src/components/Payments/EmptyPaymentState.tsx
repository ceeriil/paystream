import { CircleDollarSign } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Card } from "../ui/card";

export const EmptyPaymentState = () => {
  return (
    <Card className="flex flex-col items-center justify-center min-h-[20rem] text-center text-gray-400 mt-[4rem] ">
      <CircleDollarSign size={80} className="mb-5" />
      <p className="text-lg font-semibold px-4 ">
        No payment contracts found. Create one, and it will appear here!
      </p>

      <Link
        href="/dashboard/payments/create"
        className="btn-gradient px-4 py-3 rounded-xl font-[600]  font-medium btn-hover color-6">
        Create Contract
      </Link>
    </Card>
  );
};
