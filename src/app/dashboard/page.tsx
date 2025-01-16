"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { BarChart3, Users, CreditCard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          icon={BarChart3}
          label="Last Month's Payout"
          value="12.33 Sol"
          percentageChange={20.1}
        />

        <DashboardCard
          icon={Users}
          label="Active Contracts"
          value="234"
          percentageChange={12.3}
          href="/contracts"
          color="#29C5EE"
        />

        <DashboardCard
          icon={CreditCard}
          label="Total Employess"
          value="34"
          color="#CF1A2C"
          percentageChange={19}
        />
      </div>
    </div>
  );
}
