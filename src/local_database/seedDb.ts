import fs from "fs";
import path from "path";
import { db } from "@/services/db";
import { Employee, createEmployee } from "@/services/db/employees";
import { Organization, createOrganization } from "@/services/db/organization";

export async function seedDatabase() {
  const existingUsers = await db.employees.all();
  if (existingUsers.length > 0) {
    console.log("*** Local firebase is not empty. Skipping seed import...");
    return;
  }

  const EMPLOYEE_SEED_DATA = "/src/local_database/employees.json";
  const seedEmployees = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), EMPLOYEE_SEED_DATA), "utf8")
  );

  Object.entries(seedEmployees.employees).forEach(async ([_, employeeData]) => {
    const {
      name,
      title,
      employmentType,
      walletAddress,
      additionalWallets,
      email,
    } = employeeData as Employee & { id: string };
    await createEmployee(
      name,
      title,
      employmentType,
      walletAddress,
      additionalWallets,
      email,
      false,
      100,
      "dummy notes"
    );
  });

  const ORGANIZATION_SEED_DATA = "/src/local_database/organization.json";
  const seedOrganizations = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), ORGANIZATION_SEED_DATA), "utf8")
  );

  Object.entries(seedOrganizations.organizations).forEach(
    async ([_, organizationsData]) => {
      const { name, walletAddress, id } = organizationsData as Organization & {
        id: string;
      };
      await createOrganization(name, walletAddress);
    }
  );
}
