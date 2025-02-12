import { Result, Schema, db, toResult } from "@/services/db";

export interface Employee {
  name: string;
  title: string;
  employmentType: string;
  walletAddress: string;
  additionalWallets: string[];
  email: string;
  status: boolean;
  estimatedSalary: number;
  employerNotes: string;
  createdBy: string;
}

export type EmployerDoc = Schema["organizations"]["Doc"];
export type EmployerResult = Result<Employee>;

export async function findAllEmployees(
  organizationId: string,
): Promise<EmployerResult[]> {
  const org = await db.organizations.get(db.organizations.id(organizationId));
  if (!org) {
    return [];
  }

  const employeesRef = db.organizations.sub.employees;
  const employeesSnapshot = await employeesRef.all();

  const employees = employeesSnapshot.map((employee) =>
    toResult<Employee>(employee),
  );
  return employees;
}

export async function findEmployee(
  organizationId: string,
  employeeAddress: string,
): Promise<EmployerResult> {
  const org = await db.organizations.get(db.organizations.id(organizationId));
  if (!org) {
    throw new Error("Organization not found");
  }

  const employeesRef = db.organizations.sub.employees;
  const employeeSnapshot = await employeesRef.get(
    employeesRef.id(employeeAddress),
  );
  return toResult<Employee>(employeeSnapshot);
}

export async function createEmployee(
  organizationId: string,
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
  const org = await db.organizations.get(db.organizations.id(organizationId));
  if (!org) {
    throw new Error("Organization not found");
  }

  const employeesRef = db.organizations.sub.employees;
  const employeeAddress = employeesRef.id(walletAddress);

  const ref = await employeesRef.set(employeeAddress, {
    name,
    title,
    employmentType,
    walletAddress: walletAddress,
    additionalWallets: additionalWallets,
    email: email,
    status: status,
    estimatedSalary: estimatedSalary,
    employerNotes: employerNotes || "",
    createdBy: organizationId,
  });

  const employeeSnapshot = await employeesRef.get(ref.id);
  return toResult<Employee>(employeeSnapshot);
}

export async function updateEmployee(
  organizationId: string,
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
  const org = await db.organizations.get(db.organizations.id(organizationId));
  if (!org) {
    throw new Error("Organization not found");
  }

  const employeesRef = db.organizations.sub.employees;
  const employeeSnapshot = await employeesRef.get(
    employeesRef.id(walletAddress),
  );

  if (!employeeSnapshot) {
    throw new Error("Employee not found");
  }

  // Check if the organization is the creator of this employee
  const employeeData = employeeSnapshot.data;
  if (employeeData.createdBy !== organizationId) {
    throw new Error(
      "Unauthorized: Only the organization that created this employee can update it",
    );
  }

  await employeeSnapshot.ref.update({
    name,
    title,
    employmentType,
    walletAddress: walletAddress,
    additionalWallets: additionalWallets,
    email: email,
    status: status,
    estimatedSalary: estimatedSalary,
    employerNotes: employerNotes || "",
    createdBy: organizationId, // Preserve the original creator
  });

  return toResult<Employee>(employeeSnapshot);
}
