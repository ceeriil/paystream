"use client";

import { useAuth } from "@/context/AuthContext";
import { EmployeeLoader } from "./EmployeeLoader";
import { EmployeeLists } from "./EmployeeLists";
import { ConnectWallet } from "./ConnectWallet";
import { useFetchEmployees } from "@/hooks/useFetchEmployees";

export const Employees = () => {
  const { employees, loading } = useFetchEmployees();
  const { user } = useAuth();

  if (loading) return <EmployeeLoader />;
  if (!user) return <ConnectWallet />;

  return <EmployeeLists employees={employees} />;
};
