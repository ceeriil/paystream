"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import numeral from "numeral";
import { Card } from "../ui/card";

interface SalaryChartProps {
  timerange: "1d" | "1w" | "1m";
}

export function PaymentChart({ timerange }: SalaryChartProps) {
  const [data, setData] = useState<{ date: number; amount: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);

      let fetchedData: any = [];

      if (fetchedData.length === 0) {
        const last7Days = Array.from({ length: 7 }, (_, i) => ({
          date: Math.floor(Date.now() / 1000) - (6 - i) * 86400,
          amount: 0,
        }));
        setData(last7Days);
      } else {
        setData(fetchedData);
      }

      setIsLoading(false);
    };

    fetchChartData();
  }, [timerange]);

  function formatYAxis(value: number) {
    return numeral(Number(value)).format("0.[00]a").toUpperCase();
  }

  const formatXAxis = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label * 1000);
      const formattedDate = date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      });

      return (
        <Card className="bg-black p-3 rounded-lg shadow-lg border border-white/50 items-center text-center">
          <p className="text-gray-300 text-sm mb-2">{formattedDate}</p>
          <p className="text-gray-400 font-medium text-sm bg-white/10 p-3 py-1 rounded-lg">
            Total Amount
            <span className="text-white text-lg ml-2">
              ${numeral(payload[0].value).format("0,0")}
            </span>
          </p>
        </Card>
      );
    }
    return null;
  };

  return (
    <div className="relative h-[320px] mt-4 mb-6">
      {isLoading && (
        <div className="absolute inset-0 bg-[#00000050] backdrop-blur-[2px] flex items-center justify-center z-10">
          <Loader2 className="h-6 w-6 animate-spin text-[#4f46e5]" />
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            type="number"
            tick={{ fill: "#9096A2", fontSize: 12 }}
            tickLine={{ stroke: "#88800000" }}
            axisLine={{ stroke: "#88800000" }}
            tickFormatter={formatXAxis}
            domain={[
              Math.floor(Date.now() / 1000) - 6 * 86400,
              Math.floor(Date.now() / 1000),
            ]}
          />
          <YAxis
            yAxisId="1"
            type="number"
            domain={[0, "dataMax"]}
            tick={{ fill: "#9096A2", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            yAxisId="1"
            type="monotone"
            dataKey="amount"
            stroke="#EA1BEF"
            strokeWidth={2.5}
            fill="url(#colorAmount)"
            fillOpacity={1}
            strokeOpacity={0.7}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
