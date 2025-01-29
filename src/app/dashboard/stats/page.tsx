"use client";

import { PaymentChart } from "@/components/Charts/PaymentChart";
import { BarChart3, Users, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCard } from "@/components/DashboardCard";
import { DicebearAvatar } from "@/components/ui/dicebear-avatar";
import { PaymentTypePieChart } from "@/components/Charts/PaymentTypePieChart";
import TopPaidEmployees from "@/components/TopPaidEmployees";

export default function Stats() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <DashboardCard
          icon={BarChart3}
          label="Total Amount Spent"
          value="22,374 USDC"
          percentageChange={20.1}
        />

        <DashboardCard
          icon={Users}
          label="Funds in Active streams"
          value="234"
          percentageChange={12.3}
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

<div className="grid grid-cols-[65%,35%] gap-5">
<Card className="">
        <div className="p-10 mt-3 card-lg">
          <div className="text-lg mb-6 font-[600] flex justify-between ">
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
            $12,300<span className="text-3xl">.24</span>
          </div>
        </div>
       <PaymentTypePieChart/>
       
      </Card>
      <Card>
<TopPaidEmployees/>
      </Card>
</div>
     
    </div>
  );
}
