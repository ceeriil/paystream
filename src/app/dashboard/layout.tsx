import { DashboardLayout } from "@/components/DashBoardLayout";
import ContextProvider from "@/context";
import { headers } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");
  return (
    <ContextProvider cookies={cookies}>
      <DashboardLayout>{children}</DashboardLayout>;
    </ContextProvider>
  );
}
