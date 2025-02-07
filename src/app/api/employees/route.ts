import "@/services/firebase";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import {
  getOrganizationEmployees,
  createEmployee,
} from "@/services/db/employees";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (!user || !user.uid) {
    return NextResponse.json(
      { error: "Unauthorized - Must be authenticated with a wallet" },
      { status: 401 }
    );
  }

  const employees = await getOrganizationEmployees(user.walletAddress);
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (!user || !user.walletAddress) {
    return NextResponse.json(
      { error: "Unauthorized - Must be authenticated with a wallet" },
      { status: 401 }
    );
  }

  try {
    const {
      name,
      title,
      employmentType,
      walletAddress,
      additionalWallets,
      email,
      status,
      estimatedSalary,
      employerNotes,
    } = await request.json();

    const result = await createEmployee(
      user.walletAddress, // Use the organization's wallet address
      name,
      title,
      employmentType,
      walletAddress,
      additionalWallets,
      email,
      status,
      estimatedSalary,
      employerNotes
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json(
      { error: "Failed to add employee" },
      { status: 500 }
    );
  }
}
