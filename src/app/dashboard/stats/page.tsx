"use client";

import { BarChart3, Users, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCard } from "@/components/DashboardCard";
import { PaymentTypePieChart } from "@/components/Charts/PaymentTypePieChart";
import TopPaidEmployees from "@/components/TopPaidEmployees";
import { useAllStreams } from "@/hooks/useAllStream";
import { useEffect } from "react";
import { getTotalDepositedAmount } from "@/helpers";


export default function Stats() {
  const { streams, fetchStreams, loading, error } = useAllStreams();

  useEffect(() => {
    console.log("stream for account", streams);
  }, [streams]);

  const totalPayout = loading || error ? 0 : getTotalDepositedAmount(streams);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <DashboardCard
          icon={BarChart3}
          label="Total Amount Spent"
          value={`${totalPayout.toLocaleString()} USDC`} 
          percentageChange={20.1}
        />

        <DashboardCard
          icon={Users}
          label="Funds in Active streams"
          value="0"
          percentageChange={0}
          color="#29C5EE"
        />

        <DashboardCard
          icon={CreditCard}
          label="Total Employees"
          value="0"
          color="#CF1A2C"
          percentageChange={0}
        />
      </div>

      <div className="grid grid-cols-[65%,35%] gap-5">
        <Card className="">
          <div className="p-10 mt-3 card-lg">
            <div className="text-lg mb-6 font-[600] flex justify-between">
              Payment History
              <Tabs>
                <TabsList className="space-x-5 h-8">
                  <TabsTrigger value="1w" className="text-xs px-2 py-1">
                    1W
                  </TabsTrigger>
                  <TabsTrigger value="1m" className="text-xs px-2 py-1">
                    1M
                  </TabsTrigger>
                  <TabsTrigger value="3m" className="text-xs px-2 py-1">
                    3M
                  </TabsTrigger>
                  <TabsTrigger value="1y" className="text-xs px-2 py-1">
                    1Y
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="text-5xl font-bold mb-4 gradient-text">
              ${totalPayout.toLocaleString()}<span className="text-3xl">.00</span>
            </div>
          </div>
          <PaymentTypePieChart />
        </Card>
        <Card>
          <TopPaidEmployees />
        </Card>
      </div>
    </div>
  );
}
