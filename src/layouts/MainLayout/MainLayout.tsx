import type { ChildrenProps } from "@/types";

export default function MainLayout({ children }: ChildrenProps) {
  return <div className="min-h-full bg-black">{children}</div>;
}
