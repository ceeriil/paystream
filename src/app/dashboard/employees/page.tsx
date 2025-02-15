"use client";

import { useEffect, useState } from "react";
import { AddEmployeeDialog } from "@/components/AddEmployeeDialogue";
import { EmployeesTable } from "@/components/EmployeeTable";
import { useAuth } from "@/context/AuthContext";
import { Employee } from "@/services/db";


export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        if (!user) {
          throw new Error("Not authenticated");
        }

        const token = await user.getIdToken();
        const response = await fetch("/api/employees", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEmployees();
    } else {
      setLoading(false);
      setError("Not authenticated");
    }
  }, [user]);

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
