import React from "react";
import { useRouter } from "next/navigation";
import { Address } from "../Address";
import { Table } from "../ui/table";
import { Employee } from "@/services/db/employees.js";

export const EmployeesTable = ({ employees }: { employees: Employee[] }) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/employees/${id}`);
  };

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
        {employees.map((employee) => (
          <tr
            key={employee.walletAddress}
            className="hover:bg-black cursor-pointer"
            onClick={() => handleRowClick(employee.walletAddress)}>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {employee.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {employee.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {employee.employmentType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <Address address={employee.walletAddress} type="account" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {employee.email}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
