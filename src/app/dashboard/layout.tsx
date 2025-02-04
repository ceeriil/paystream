import { DashboardLayout } from "@/components/DashBoardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>;
    </>
  );
}
