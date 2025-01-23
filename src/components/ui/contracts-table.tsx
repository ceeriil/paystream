import React from "react";
import { Table } from "./table";
import { Stream } from "@streamflow/stream";
import { convertTimestampToFormattedDate, convertBNToNumber } from "@/helpers";
import { Address } from "../Address.tsx";

const dummyData = [
  {
    unlockedTotal: "1000 USDC",
    startDate: "2024-01-15",
    recipientAddress: "0x1234...5678",
    recipientName: "John Doe",
    nextPayment: "2024-02-15",
  },
  {
    unlockedTotal: "2500 USDC",
    startDate: "2024-01-10",
    recipientAddress: "0x8765...4321",
    recipientName: "Jane Smith",
    nextPayment: "2024-02-10",
  },
  {
    unlockedTotal: "5000 USDC",
    startDate: "2024-01-01",
    recipientAddress: "0x9876...1234",
    recipientName: "Bob Wilson",
    nextPayment: "2024-02-01",
  },
];

export const ContractsTable = ({ streams }) => {
  return (
    <Table>
      <thead className="uppercase border-b border-[#272727] font-bold">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Unlocked Total
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Start Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Recipient Address
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Recipient Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Next Payment
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#272727]">
        {streams.map(([id, stream]: [string, Stream]) => (
          <tr key={id} className="hover:bg-black">
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              {convertBNToNumber(stream.depositedAmount, 6)}
              {}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              {convertTimestampToFormattedDate(stream.end)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              <Address
                address={stream.recipient}
                type="account"
                length="short"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">-</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              Next Payment
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
