import "@/services/firebase";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { createEmployee, findAllEmployees } from "@/services/db/employees";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema for employee creation validation
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

// Helper function to get organization ID from user
function getOrganizationId(user: any): string {
  // Assuming the wallet address is stored in customClaims
  const customClaims = user.customClaims || {};
  const walletAddress = customClaims.walletAddress;

  if (!walletAddress) {
    throw new Error("Wallet address not found in user claims");
  }

  return walletAddress;
}

export async function GET(request: Request) {
  try {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Must be authenticated" },
        { status: 401 },
      );
    }

    const organizationId = getOrganizationId(user);
    const employees = await findAllEmployees(organizationId);

    return NextResponse.json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message.includes("Unauthorized") ? 401 : 500 },
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Must be authenticated" },
        { status: 401 },
      );
    }

    const organizationId = getOrganizationId(user);

    // Parse and validate request body
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

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message.includes("Unauthorized") ? 401 : 500 },
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
