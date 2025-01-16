"use client";
import Link from "next/link";
import { ContractsTable } from "@/components/ui/contracts-table";

export default function Contract() {
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
      <ContractsTable />
    </section>
  );
}
