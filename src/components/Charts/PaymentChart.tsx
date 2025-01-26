"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { Button } from "../ui/button";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { RefreshCw, Loader2 } from "lucide-react";
import numeral from "numeral";
import { Card } from "../ui/card";

interface SalaryChartProps {
  timerange: "1d" | "1w" | "1m";
}

export function PaymentChart({ timerange }: SalaryChartProps) {
  const [data, setData] = useState<{ date: number; amount: number }[]>([]);
  const [left, setLeft] = useState<string | number>("dataMin");
  const [right, setRight] = useState<string | number>("dataMax");
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [zoomLevel, setZoomLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);

      // Dummy JSON data for salary over a month
      const dummyData = Array.from({ length: 30 }, (_, i) => ({
        date: Date.now() / 1000 + i * 86400,
        amount: Math.floor(Math.random() * 500 + 100),
      }));

      setData(dummyData);
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
        <Card className="bg-black p-3 rounded-lg shadow-lg border border-[ffffff80] items-center text-center">
          <p className="text-gray-300 text-sm mb-2">{formattedDate}</p>
          <p className="text-gray-400 font-medium text-sm bg-[#ffffff16] p-3 py-1 rounded-lg">
            Total Amount
            <span className="text-white text-lg ml-2">
              {`$${numeral(payload[0].value).format("0,0")}`}
            </span>
          </p>
        </Card>
      );
    }
    return null;
  };

  const zoomIn = () => {
    let leftIndex = data.findIndex((item) => item.date === Number(refAreaLeft));
    let rightIndex = data.findIndex(
      (item) => item.date === Number(refAreaRight)
    );

    if (leftIndex > rightIndex)
      [leftIndex, rightIndex] = [rightIndex, leftIndex];

    setLeft(data[leftIndex].date);
    setRight(data[rightIndex].date);

    setRefAreaLeft("");
    setRefAreaRight("");
    setZoomLevel(zoomLevel + 1);
  };

  const zoomOut = () => {
    setLeft("dataMin");
    setRight("dataMax");
    setZoomLevel(0);
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
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          onMouseDown={(e) => e && setRefAreaLeft(e.activeLabel || "")}
          onMouseMove={(e) =>
            e && refAreaLeft && setRefAreaRight(e.activeLabel || "")
          }
          onMouseUp={zoomIn}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            allowDataOverflow={true}
            domain={[left, right]}
            type="number"
            tick={{ fill: "#9096A2", fontSize: 12 }}
            tickLine={{ stroke: "#88800000" }}
            axisLine={{ stroke: "#88800000" }}
            tickFormatter={formatXAxis}
            interval={0}
          />
          <YAxis
            yAxisId="1"
            hide={true}
            allowDataOverflow={true}
            domain={[(dataMin: number) => dataMin * 0.01, "dataMax"]}
            type="number"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            yAxisId="1"
            type="monotone"
            dataKey="amount"
            stroke="#EA1BEF"
            strokeWidth={2.5}
            fill="url(#colorAmount)"
            activeDot={{ r: 6 }}
          />
          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
