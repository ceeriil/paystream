"use client";

import { PaymentChart } from "@/components/Charts/PaymentChart";
import { BarChart3, Users, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCard } from "@/components/DashboardCard";
import { DicebearAvatar } from "@/components/ui/dicebear-avatar";
import { useAllStreams } from "@/hooks/useAllStream";
import { useEffect } from "react";

export default function DashboardPage() {
  const { streams, fetchStreams, loading, error } = useAllStreams();

  useEffect(() => {
    console.log("stream for account", streams);
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex space-x-6 mt-4 mb-6 items-center">
          <DicebearAvatar className="h-16 w-16" seed="12" size={80} />
          <div>
            {" "}
            <h1 className="text-2xl font-bold">Hello 0x...34b3</h1>
            <p className="mt-1 text-gray-400 font-bold">
              We hope you are having a great day
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#ffffff20] mb-8"></div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <DashboardCard
          icon={BarChart3}
          label="Last Month's Payout"
          value="0 USDC"
          percentageChange={0}
        />

        <DashboardCard
          icon={CreditCard}
          label="Active Contracts"
          value="0"
          percentageChange={0}
          href="/contracts"
          color="#29C5EE"
        />

        <DashboardCard
          icon={Users}
          label="Total Employess"
          value="0"
          color="#CF1A2C"
          percentageChange={0}
        />
      </div>

      <Card className="">
        <div className="p-10 mt-3 card-lg">
          <div className="text-lg mb-6 font-[600] flex md:flex-row flex-col justify-between gap-y-2 ">
            Payment History
            <Tabs>
              <TabsList className="space-x-5 h-8">
                <TabsTrigger value="1m" className="text-xs px-2 py-1">
                  1W
                </TabsTrigger>
                <TabsTrigger value="1m" className="text-xs px-2 py-1">
                  1M
                </TabsTrigger>
                <TabsTrigger value="1w" className="text-xs px-2 py-1">
                  3M
                </TabsTrigger>
                <TabsTrigger value="1d" className="text-xs px-2 py-1">
                  1Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="text-5xl font-bold mb-4 gradient-text">
            $00<span className="text-3xl">.00</span>
          </div>
        </div>

        <PaymentChart timerange="1w" />
      </Card>
    </div>
  );
}
