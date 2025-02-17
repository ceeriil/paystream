import { AddEmployeeDialog } from "@/components/AddEmployeeDialogue";
import { EmployeesTable } from "@/components/EmployeeTable";
import { Employee } from "@/services/db/employees";

interface EmployeeListsProps {
  employees: Employee[];
}

export const EmployeeLists = ({ employees }: EmployeeListsProps) => {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <AddEmployeeDialog />
      </div>
      <EmployeesTable employees={employees} />
    </section>
  );
};
