import React from "react";
import { Stream } from "@streamflow/stream";
import { convertTimestampToFormattedDate, convertBNToNumber } from "@/helpers";
import Image from "next/image";
import { Address } from "../Address.tsx";
import { Table } from "../ui/table.jsx";

export const ContractsTable = ({ streams }: { streams: any }) => {
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
