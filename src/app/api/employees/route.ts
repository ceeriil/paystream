import "@/services/firebase";
import { findAllEmployees } from "@/services/db/employees";

export async function GET(request: Request) {
  let employees = await findAllEmployees();
  return new Response(JSON.stringify(employees));
}
