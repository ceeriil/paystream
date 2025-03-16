import fs from "fs";
import path from "path";
import { db } from "@/services/db";
import { Employee, createEmployee } from "@/services/db/employees";
import { createOrganization } from "@/services/db/organization";
import { Organization } from "@/services/db";

export async function seedDatabase() {
  const existingUsers = await db.organizations.all();
  if (existingUsers.length > 0) {
    console.log("*** Local firebase is not empty. Skipping seed import...");
    return;
  }

  const EMPLOYEE_SEED_DATA = "/src/local_database/employees.json";
  const seedEmployees = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), EMPLOYEE_SEED_DATA), "utf8"),
  );

  // Use Promise.all with map instead of forEach
  await Promise.all(
    Object.entries(seedEmployees.employees).map(async ([_, employeeData]) => {
      const {
        name,
        title,
        employmentType,
        walletAddress,
        additionalWallets,
        email,
      } = employeeData as Employee & { id: string };
      return createEmployee(
        name,
        title,
        employmentType,
        walletAddress,
        additionalWallets,
        email,
        false,
        100,
        "dummy notes",
      );
    }),
  );

  const ORGANIZATION_SEED_DATA = "/src/local_database/organization.json";
  const seedOrganizations = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), ORGANIZATION_SEED_DATA), "utf8"),
  );

  // Use Promise.all with map for organizations too
  await Promise.all(
    Object.entries(seedOrganizations.organizations).map(
      async ([_, organizationsData]) => {
        const { name, walletAddress } = organizationsData as Organization & {
          id: string;
        };
        return createOrganization(name, walletAddress);
      },
    ),
  );
}
