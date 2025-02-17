import { NextResponse } from "next/server";
import { admin } from "@/services/firebase";
import { findEmployee } from "@/services/db/employees";

async function getOrganizationIdFromToken(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized - Missing or invalid token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    throw new Error("Unauthorized - Invalid token");
  }
}

// Fetch a single employee by wallet address
export async function GET(
  request: Request,
  { params }: { params: { walletAddress: string } },
) {
  try {
    const organizationId = await getOrganizationIdFromToken(request);
    const { walletAddress } = params;

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 },
      );
    }

    const employee = await findEmployee(organizationId, walletAddress);

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ employee });
  } catch (error) {
    console.error("Error fetching employee:", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: (error as Error).message.includes("Unauthorized") ? 401 : 500 },
    );
  }
}
