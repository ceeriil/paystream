import { Result, Schema, db, toResult } from "@/services/db";

export interface Employee {
  name: string;
  title: string;
  employmentType: string;
  walletAddress: string; // primary wallet address
  additionalWallets: string[]; // additional wallet addresses for payments
  email: string;
  status: boolean;
  estimatedSalary: number; // yearly salary
  employerNotes: string; // optional notes about the employee
}


export type EmployerDoc = Schema["employees"]["Doc"];
export type EmployerResult = Result<Employee>;


export async function findAllEmployees(): Promise<EmployerResult[]> {
  const employeesSnaphot = await db.employees.all();
   const employees = employeesSnaphot.map(employee => toResult<Employee>(employee));
   return employees;
 }


export async function findEmployee(address: string): Promise<EmployerResult> {
  const userSnapshot = await db.employees.get(db.employees.id(address));
  return toResult<Employee>(userSnapshot);
}

export async function createEmployee(
  name: string,
  title: string,
  employmentType: string,
  walletAddress: string, 
  additionalWallets: string[], 
  email: string,
  status: boolean,
  estimatedSalary: number,
  employerNotes?: string,
): Promise<EmployerResult> {
  const employeeAddress = db.employees.id(walletAddress);
  const ref = await db.employees.set(employeeAddress, () => ({
    name, title,
    employmentType,
    walletAddress: walletAddress,
    additionalWallets: additionalWallets, 
    email: email,
    status: status,
    estimatedSalary: estimatedSalary,
    employerNotes: employerNotes || "",
  }));
  const employeeSnapshot = await db.employees.get(ref.id);
  return toResult<Employee>(employeeSnapshot);
}

export async function updateEmployee(
  name: string,
  title: string,
  employmentType: string,
  walletAddress: string, 
  additionalWallets: string[], 
  email: string,
  status: boolean,
  estimatedSalary: number,
  employerNotes?: string,
): Promise<EmployerResult> {
  const employeeSnapshot = await db.employees.get(db.employees.id(walletAddress));
  await employeeSnapshot?.ref?.update(() => ({
    name, title,
    employmentType,
    walletAddress: walletAddress,
    additionalWallets: additionalWallets, 
    email: email,
    status: status,
    estimatedSalary: estimatedSalary,
    employerNotes: employerNotes || "",
  }));
  return toResult<EmployerResult>(employeeSnapshot);
}