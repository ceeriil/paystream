"use client";
import { AddEmployeeDialog } from "@/components/ui/add-employee-dialog";
import { EmployeesTable } from "@/components/ui/employees-table";

export default function Employees() {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <AddEmployeeDialog />
      </div>
      <EmployeesTable />
    </section>
  );
}
