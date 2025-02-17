import { NextResponse } from "next/server";
import { z } from "zod";
import { admin } from "@/services/firebase";
import { createEmployee, findAllEmployees } from "@/services/db/employees";

const createEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  walletAddress: z.string().min(1, "Wallet address is required"),
  additionalWallets: z.array(z.string()).default([]),
  email: z.string().email("Invalid email address"),
  status: z.boolean(),
  estimatedSalary: z.number().min(0, "Salary must be non-negative"),
  employerNotes: z.string().optional(),
});

async function getOrganizationIdFromToken(request: Request) {
  const authHeader = request.headers.get("Authorization");

  console.log(authHeader, "ath");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized - Missing or invalid token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken.uid, "decoded");
    return decodedToken.uid;
  } catch (error) {
    throw new Error("Unauthorized - Invalid token");
  }
}

export async function GET(request: Request) {
  try {
    const organizationId = await getOrganizationIdFromToken(request);
    console.log(organizationId, "org id");
    const employees = await findAllEmployees(organizationId);

    console.log("emppp", employees);

    return NextResponse.json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: (error as Error).message.includes("Unauthorized") ? 401 : 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const organizationId = await getOrganizationIdFromToken(request);
    const body = await request.json();
    const validatedData = createEmployeeSchema.parse(body);

    const result = await createEmployee(
      organizationId,
      validatedData.name,
      validatedData.title,
      validatedData.employmentType,
      validatedData.walletAddress,
      validatedData.additionalWallets,
      validatedData.email,
      validatedData.status,
      validatedData.estimatedSalary,
      validatedData.employerNotes,
    );

    return NextResponse.json({
      message: "Employee created successfully",
      employee: result,
    });
  } catch (error) {
    console.error("Error creating employee:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: error instanceof z.ZodError ? 400 : 500 },
    );
  }
}
