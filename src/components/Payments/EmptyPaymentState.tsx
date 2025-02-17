import { CircleDollarSign } from "lucide-react";
import React from "react";
import Link from "next/link";

export const EmptyPaymentState = () => {
  return (
    <div>
      <div className="flex items-center justify-center mt-[4rem] font-bold text-gray-400 flex-col text-center">
        <CircleDollarSign className=" mb-4" size={60} />
        No Payment Contract Found
        <Link
          href="/dashboard/payments/create"
          className="btn-gradient px-4 py-3 rounded-xl font-[600] text-sm mt-5">
          Create Contract
        </Link>
      </div>
    </div>
  );
};
