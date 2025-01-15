"use client";

import { ArrowLink } from "@/components/assets/ArrowLink";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, CreditCard, Activity } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Month's Payou
              </p>
              <h2 className="text-2xl font-bold">$45,231.89</h2>
              <p className="text-xs text-green-500">+20.1% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 py-8 card before:bg-[#CF1A2C] rounded-2xl z-[10] overflow-hidden ">
          <Link
            href="/contracts"
            className="absolute rounded-full bg-[#ffffff16] w-12 h-12 flex items-center justify-center right-4 top-4"
          >
            <ArrowLink />
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-base font-medium text-muted-foreground">
                Active Contracts
              </p>
              <h2 className="text-4xl font-bold mt-4 mb-1">2,350</h2>
              <p className="text-xs text-[#00B85E]">+12.3% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Transactions
              </p>
              <h2 className="text-2xl font-bold">12,234</h2>
              <p className="text-xs text-green-500">+19% from last month</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
