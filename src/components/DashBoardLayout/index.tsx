"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TestnetBanner from "../TestnetBanner";
import {
  LucideIcon,
  Users,
  Settings,
  LayoutDashboard,
  BarChart2,
  CircleDollarSign,
  BookOpen,
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
import { ConnectButton } from "../ConnectButton";
import { useAppKitNetwork, useAppKitAccount } from "@reown/appkit/react";
import Link from "next/link";
import FaucetButton from "../FaucetButton";
import { SignMessageOverlay } from "../SignMessageOverlay";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  inactive?: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CircleDollarSign,
  },
  {
    title: "Employee",
    href: "/dashboard/employees",
    icon: Users,
  },
  {
    title: "Stats",
    href: "/dashboard/stats",
    icon: BarChart2,
  },
  {
    title: "Docs",
    href: "https://paystream.gitbook.io/paystream",
    icon: BookOpen,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    inactive: true,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { caipNetwork } = useAppKitNetwork();
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const { isConnected } = useAppKitAccount();
  const { user } = useAuth();

  const network = (caipNetwork as { network?: string })?.network;

  useEffect(() => {
    console.log("Network", network);
  });

  const handleSignSuccess = (signatureHex: string) => {
    console.log("Signature:", signatureHex);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full dark">
        <Sidebar className="bg-black border-[#272727]">
          <SidebarHeader className="border-[#272727] border-b">
            <Link
              href={"/"}
              className="flex items-center px-6  pb-[0.4rem] pt-[0.4rem] ">
              <Image alt="app logo" src="/logo.png" width={20} height={20} />
              <span className="text-xl font-semibold ml-2">PayStream</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="space-y-4 p-4 pt-6">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href} className="px-2">
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.inactive ? "/#" : item.href}
                      className={`flex items-center text-base font-medium p-2 rounded-md transition-all py-5  ${
                        item.inactive
                          ? "text-gray-500 cursor-not-allowed"
                          : pathname === item.href
                            ? "btn-gradient text-white"
                            : " hover:text-[#ff00ed]"
                      }`}
                      onClick={(e) => {
                        if (item.inactive) e.preventDefault();
                      }}>
                      <item.icon className="mr-4 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">© 2025 PayStream</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-y-auto bg-black">
          <header className="sticky top-0 z-20 border-b border-[#272727] backdrop-blur-lg bg-[#00000040]">
            <div className="flex h-14 items-center gap-4 px-6 justify-between">
              <SidebarTrigger />
              <div className="flex-1" />
              <div className="flex space-x-2">
                <ConnectButton />

                {network === "solana-devnet" && <FaucetButton />}
              </div>
            </div>
          </header>
          {network === "solana-devnet" && <TestnetBanner network={network} />}

          <div className="container mx-auto p-6 lg:px-12 px-4 pb-12">
            {children}
          </div>
        </main>
      </div>

      {isOverlayVisible && isConnected && !user && (
        <SignMessageOverlay
          onClose={() => setIsOverlayVisible(false)}
          onSignSuccess={handleSignSuccess}
        />
      )}
    </SidebarProvider>
  );
}
