import React, { useState } from "react";
import { Stream } from "@streamflow/stream";
import { convertTimestampToFormattedDate, convertBNToNumber } from "@/helpers";
import Image from "next/image";
import { Table } from "../ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link.js";
import { SquareArrowOutUpRight } from "lucide-react";
import { Address } from "../Address";

type SortField = "amount" | "startDate" | "endDate" | "nextPayment";
type SortDirection = "asc" | "desc" | null;

interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

export const PaymentsTable = ({ streams }: { streams: any }) => {
  const [sortState, setSortState] = useState<SortState>({
    field: null,
    direction: null,
  });

  const handleSort = (field: SortField) => {
    setSortState((prev) => ({
      field,
      direction:
        prev.field === field
          ? prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
              ? null
              : "asc"
          : "asc",
    }));
  };

  const getSortedStreams = () => {
    if (!sortState.field || !sortState.direction) return streams;

    return [...streams].sort(
      ([, a]: [string, Stream], [, b]: [string, Stream]) => {
        const multiplier = sortState.direction === "asc" ? 1 : -1;

        switch (sortState.field) {
          case "amount":
            return (
              (convertBNToNumber(a.depositedAmount, 6) -
                convertBNToNumber(b.depositedAmount, 6)) *
              multiplier
            );
          case "startDate":
            return (a.createdAt - b.createdAt) * multiplier;
          case "endDate":
            return (a.end - b.end) * multiplier;
          case "nextPayment":
            return (a.end - b.end) * multiplier;
          default:
            return 0;
        }
      },
    );
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    const isActive = sortState.field === field;
    const direction = isActive ? sortState.direction : null;

    return (
      <span
        className={cn(
          "inline-block ml-1",
          isActive && "text-primary",
          !isActive && "text-gray-400",
        )}>
        {direction === "asc" ? "↑" : direction === "desc" ? "↓" : "↕"}
      </span>
    );
  };

  return (
    <Table>
      <thead className="uppercase border-b border-[#272727] font-bold">
        <tr>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-400"
            onClick={() => handleSort("amount")}>
            Unlocked Total
            <SortIcon field="amount" />
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-400"
            onClick={() => handleSort("startDate")}>
            Start Date
            <SortIcon field="startDate" />
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Recipient Address
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Transaction Reciept
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-400"
            onClick={() => handleSort("nextPayment")}>
            End Date
            <SortIcon field="nextPayment" />
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-400"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#272727]">
        {getSortedStreams().map(([id, stream]: [string, Stream]) => (
          <tr key={id} className="hover:bg-[#ffffff15]">
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              <div className="flex ">
                <Image
                  src={"/img/token-logo.svg"}
                  width={20}
                  height={20}
                  alt="token logo"
                />
                <span className="ml-2">
                  <span className="font-[600]">
                    {" "}
                    {convertBNToNumber(stream.depositedAmount, 6)}
                  </span>
                  <span className="text-gray-300"> USDC</span>
                </span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              {convertTimestampToFormattedDate(stream.createdAt)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              <Address
                address={stream.recipient}
                type="account"
                length="short"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              {" "}
              <Address address={id} type="contract" length="short" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              {convertTimestampToFormattedDate(stream.end)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              <Link href={`/dashboard/payments/${id}`}>
                <SquareArrowOutUpRight color="#415CFC" size={20} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
