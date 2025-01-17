import React from "react";
import { Table } from "./table";

const dummyData = [
  {
    name: "John Doe",
    title: "Senior Developer",
    employmentType: "Full Time",
    walletAddress: "0x1234...5678",
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    title: "Product Manager",
    employmentType: "Full Time",
    walletAddress: "0x8765...4321",
    email: "jane.smith@example.com",
  },
  {
    name: "Bob Wilson",
    title: "UI Designer",
    employmentType: "Part Time",
    walletAddress: "0x9876...1234",
    email: "bob.wilson@example.com",
  },
];

export const EmployeesTable = () => {
  return (
    <Table>
      <thead className="uppercase border-b border-[#272727] font-bold">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Employment Type
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Wallet Address
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#272727]">
        {dummyData.map((row, index) => (
          <tr key={index} className="hover:bg-black">
            <td className="px-6 py-4 whitespace-nowrap text-sm">{row.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{row.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {row.employmentType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {row.walletAddress}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{row.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
