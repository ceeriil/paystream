"use client";
import Link from "next/link";
import { ContractsTable } from "@/components/ui/contracts-table";
import { useAllStreams } from "@/hooks/useAllStream";
import { useEffect } from "react";

export default function Payment() {
  const { streams, fetchStreams, loading, error } = useAllStreams();
  useEffect(() => {
    console.log("stream for account", streams);
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        Loading
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
          href="/dashboard/contracts/create"
          className="btn-gradient px-4 py-3 rounded-xl font-medium text-sm"
        >
          Create Contract
        </Link>
      </div>
      <ContractsTable streams={streams} />
    </section>
  );
}
