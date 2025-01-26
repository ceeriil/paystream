"use client";
import Link from "next/link";
import { useAllStreams } from "@/hooks/useAllStream";
import { useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { BiError } from "react-icons/bi";
import { ContractsTable } from "@/components/ContractsTable";

export default function Payment() {
  const { streams, fetchStreams, loading, error } = useAllStreams();
  useEffect(() => {
    console.log("stream for account", streams);
  });

  if (error) {
    return (
      <div className="flex items-center justify-center mt-[4rem] font-bold text-gray-400 flex-col">
        <BiError className="text-[6rem] mb-3" />
        Error: {error.message}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Spinner />
      </div>
    );
  }

  if (!streams || streams.length === 0) {
    return <div>No Payment Contract found.</div>;
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Contracts</h1>
        <Link
          href="/dashboard/payments/create"
          className="btn-gradient px-4 py-3 rounded-xl font-medium text-sm"
        >
          Create Contract
        </Link>
      </div>
      <ContractsTable streams={streams} />
    </section>
  );
}
