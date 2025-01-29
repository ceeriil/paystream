import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { name: "Salaried Payment", value: 50000, color: "#29C5EE" }, // Green
  { name: "Scheduled Payment", value: 30000, color: "#5E54FB" }, // Blue
  { name: "One-Time Payment", value: 15000, color: "#19C8A7" }, // Yellow
  { name: "Commitment Pay", value: 25000, color: "#CF1A2C" }, // Orange
];

export const PaymentTypePieChart = () => {
  return (
    <div className="flex flex-col items-center p-4 w-full mx-auto mb-12">
      <div className="flex items-center">
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
                stroke="#ffffff20"
                strokeWidth={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="ml-6 space-y-2">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium text-sm">{entry.name}</span>
              <span className="text-gray-500">(${entry.value.toLocaleString()})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

