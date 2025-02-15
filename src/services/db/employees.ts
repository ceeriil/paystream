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
  organisationId: string;
}

export type EmployerDoc = Schema["organizations"]["Doc"];
export type EmployerResult = Result<Employee>;
/**
 * Finds all employees under the specified organization.
 *
 * @param {string} organizationId - The ID of the organization.
 * @returns {Promise<EmployerResult[]>} - A promise that resolves to an array of employee documents.
 *
 * @description
 * This function retrieves all employee documents from the `employees` sub-collection
 * under the specified organization. If the organization does not exist, it returns an empty array.
 */
export async function findAllEmployees(
  organizationId: string,
): Promise<EmployerResult[]> {
  // Get the organization document
  const org = await db.organizations.get(db.organizations.id(organizationId));
  if (!org) {
    return [];
  }

  const employeesRef = db.organizations(org.ref.id).employees;

  const employeesSnapshot = await employeesRef.all();

  const employees = employeesSnapshot.map((employee) =>
    toResult<Employee>(employee),
  );
  return employees;
}

/**
 * Finds a specific employee under the specified organization.
 *
 * @param {string} organizationId - The ID of the organization.
 * @param {string} employeeAddress - The wallet address of the employee (used as the employee ID).
 * @returns {Promise<EmployerResult>} - A promise that resolves to the employee document.
 *
 * @description
 * This function retrieves a specific employee document from the `employees` sub-collection
 * under the specified organization. If the organization or employee does not exist, it throws an error.
 */
export async function findEmployee(
  organizationId: string,
  employeeAddress: string,
): Promise<EmployerResult> {
  // Get the organization document
  const org = await db.organizations.get(db.organizations.id(organizationId));
  if (!org) {
    throw new Error("Organization not found");
  }

  const employeesRef = db.organizations(org.ref.id).employees;
  const employeeSnapshot = await employeesRef.get(
    employeesRef.id(employeeAddress),
  );

  if (!employeeSnapshot) {
    throw new Error("Employee not found");
  }

  return toResult<Employee>(employeeSnapshot);
}

/**
 * Creates an employee document as a sub-collection under the specified organization.
 *
 * @param {string} organizationId - The ID of the organization creating the employee.
 * @returns {Promise<EmployerResult>} - A promise that resolves to the created employee document.
 *
 * @description
 * This function first retrieves the organization document using the provided `organizationId`.
 * If the organization exists, it creates an employee document in the `employees` sub-collection
 * under the specific organization. The employee document includes details such as name, title,
 * wallet address, and other relevant information. The function returns the created employee document.
 */
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
  const employeesRef = db.organizations(org.ref.id).employees;
  const employeeId = employeesRef.id(walletAddress);
  const ref = await employeesRef.set(employeeId, {
    name,
    title,
    employmentType,
    walletAddress: walletAddress,
    additionalWallets: additionalWallets,
    email: email,
    status: status,
    estimatedSalary: estimatedSalary,
    employerNotes: employerNotes || "",
    organizationId: organizationId,
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
