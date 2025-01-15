"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  LucideIcon,
  Home,
  Users,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Contracts",
    href: "/contracts",
    icon: Home,
  },
  {
    title: "Payments",
    href: "/payments",
    icon: Users,
  },
  {
    title: "Employee",
    href: "/Employees",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen  w-full ">
        <Sidebar className="bg-black   border-[#272727]">
          <SidebarHeader>
            <div className="flex h-16 items-center px-6">
              <span className="text-xl font-semibold">PayStream</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="space-y-4 p-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href} className="px-2 ">
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a
                      href={item.href}
                      className={`flex items-center text-base font-medium p-2 rounded-md transition-all py-5 ${
                        usePathname() === item.href
                          ? "btn-gradient text-white"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <item.icon className="mr-4 h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">© 2024 PayStream</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-y-auto ">
          <header className="sticky top-0 z-10 border-b border-[#272727]">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1" />
              {/* Add any header actions here */}
            </div>
          </header>
          <div className="container mx-auto p-6 px-12">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
