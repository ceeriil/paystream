"use client";

import { BarChart3, CreditCard, HandCoins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCard } from "@/components/DashboardCard";
import { PaymentTypePieChart } from "@/components/Charts/PaymentTypePieChart";
import TopPaidEmployees from "@/components/TopPaidEmployees";
import { useAllStreams } from "@/hooks/useAllStream";
import { getTotalDepositedAmount } from "@/helpers";
import { Stream } from "@streamflow/stream";

export default function Stats() {
  const { streams, loading, error } = useAllStreams();

  const paystreamStreams = streams?.filter(([_, stream]: [string, Stream]) =>
    stream.name?.toLowerCase().includes("paystream"),
  );

  const totalPayout =
    loading || error ? 0 : getTotalDepositedAmount(paystreamStreams);
  const totalContract = loading || error ? 0 : paystreamStreams?.length;

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
          icon={HandCoins}
          label="Funds in Active streams"
          value="0"
          percentageChange={0}
        />

        <DashboardCard
          icon={CreditCard}
          label="Total Contracts Created"
          value={`${totalContract}`}
          percentageChange={0}
        />
      </div>

      <div className="grid lg:grid-cols-[65%,35%] gap-5">
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
              ${totalPayout.toLocaleString()}
              <span className="text-3xl">.00</span>
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
