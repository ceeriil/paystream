import "@/services/firebase";
import { findAllOrganizations } from "@/services/db/organization";

export async function GET() {
  const organizations = await findAllOrganizations();
  return new Response(JSON.stringify(organizations));
}
