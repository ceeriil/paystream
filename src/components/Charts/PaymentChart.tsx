"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
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
        <div className="bg-black p-2 py-3 rounded shadow-lg border border-[ffffff80]">
          <p className="text-gray-300 text-xs mb-1">{formattedDate}</p>
          <p className="text-white font-medium text-xs">{`Total Amount: $${numeral(
            payload[0].value
          ).format("0,0")}`}</p>
        </div>
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
    <div className="relative h-[350px] mt-20">
      {isLoading && (
        <div className="absolute inset-0 bg-[#00000050] backdrop-blur-[2px] flex items-center justify-center z-10">
          <Loader2 className="h-6 w-6 animate-spin text-[#4f46e5]" />
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          onMouseDown={(e) => e && setRefAreaLeft(e.activeLabel || "")}
          onMouseMove={(e) =>
            e && refAreaLeft && setRefAreaRight(e.activeLabel || "")
          }
          onMouseUp={zoomIn}
        >
          <XAxis
            dataKey="date"
            allowDataOverflow={true}
            domain={[left, right]}
            type="number"
            tick={{ fill: "#888", fontSize: 10 }}
            tickLine={{ stroke: "#888" }}
            axisLine={{ stroke: "#888" }}
            tickFormatter={formatXAxis}
            interval={0}
          />
          <YAxis
            yAxisId="1"
            allowDataOverflow={true}
            domain={["dataMin", "dataMax"]}
            type="number"
            tick={{ fill: "#888", fontSize: 10 }}
            tickLine={{ stroke: "#888" }}
            axisLine={{ stroke: "#888" }}
            tickFormatter={formatYAxis}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="1"
            type="monotone"
            dataKey="amount"
            stroke="#4f46e5"
            strokeWidth={1.5}
            dot={false}
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
