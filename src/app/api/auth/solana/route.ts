import { NextResponse } from "next/server";
import {
  createOrganization,
  findOrganization,
} from "@/services/db/organization";
import { verifyMessage } from "@/lib/utils";
import { admin } from "@/services/firebase";

export async function POST(request: Request) {
  try {
    const { signatureHex, publicKey, nonce } = await request.json();

    const isValid = verifyMessage(publicKey, signatureHex, nonce);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let organization;
    try {
      organization = await findOrganization(publicKey);

      if (!organization?.exist) {
        try {
          organization = await createOrganization("Default Name", publicKey);
          console.log("Organization created:", organization);
        } catch (createError) {
          console.error("Error creating organization:", createError);
          throw createError;
        }
      } else {
        console.log("Organization exists:", organization);
      }
    } catch (dbError) {
      console.error("Database operation error:", dbError);
      throw dbError;
    }

    const firebaseToken = await admin.auth().createCustomToken(publicKey);

    return NextResponse.json({ firebaseToken });
  } catch (error) {
    console.error("Error verifying message or creating token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
