import React, { useEffect } from "react";
import Link from "next/link";
import { Stream } from "@streamflow/stream";
import { useAllStreams } from "@/hooks/useAllStream";
import { PaymentError } from "./PaymentError";
import { PaymentLoader } from "./PaymentLoader";
import { PaymentsTable } from "../PaymentsTable";
import { EmptyPaymentState } from "./EmptyPaymentState";

export const Payments = () => {
  const { streams, loading, error } = useAllStreams();

  const paystreamStreams = streams?.filter(([, stream]: [string, Stream]) =>
    stream.name?.toLowerCase().includes("paystream"),
  );
  useEffect(() => {
    console.log("stream for account", streams);
  });

  if (error) {
    return <PaymentError errorMessage={error.message} />;
  }

  if (loading) {
    return <PaymentLoader />;
  }

  if (!paystreamStreams || paystreamStreams.length === 0) {
    return <EmptyPaymentState />;
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <Link
          href="/dashboard/payments/create"
          className="btn-gradient px-4 py-3 rounded-xl font-medium text-sm">
          Create Contract
        </Link>
      </div>
      <PaymentsTable streams={paystreamStreams} />
    </section>
  );
};
