"use client";

import { Card } from "@/components/ui/card";
import { BarChart3, Users, CreditCard, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <h2 className="text-2xl font-bold">$45,231.89</h2>
              <p className="text-xs text-green-500">+20.1% from last month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Users
              </p>
              <h2 className="text-2xl font-bold">2,350</h2>
              <p className="text-xs text-green-500">+12.3% from last month</p>
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

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Now
              </p>
              <h2 className="text-2xl font-bold">573</h2>
              <p className="text-xs text-green-500">+201 since last hour</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
