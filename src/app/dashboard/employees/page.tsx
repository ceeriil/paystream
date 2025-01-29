"use client";
import { AddEmployeeDialog } from "@/components/AddEmployeeDialogue";
import { EmployeesTable } from "@/components/EmployeeTable";
import { employees } from "@/data/employees";

export default function Employees() {
  return (
    <section className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <AddEmployeeDialog />
      </div>
      <EmployeesTable employees={employees} />
    </section>
  );
}
