import { DashboardLayout } from "@/components/DashBoardLayout";

DashboardLayout;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>;
    </>
  );
}
