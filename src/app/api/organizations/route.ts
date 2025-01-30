import "@/services/firebase";
import { findAllOrganizations } from "@/services/db/organization";

export async function GET(request: Request) {
  let organizations = await findAllOrganizations();
  return new Response(JSON.stringify(organizations));
  
}
