import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CustomTooltip } from "./CustomToolTip";

const data = [
  { name: "Salaried Payment", value: 0, color: "#29C5EE" },
  { name: "Scheduled Payment", value: 0, color: "#5E54FB" },
  { name: "One-Time Payment", value: 0, color: "#19C8A7" },
  { name: "Commitment Pay", value: 0, color: "#CF1A2C" },
];

export const PaymentTypePieChart = () => {
  const allZero = data.every((item) => item.value === 0);

  const processedData = allZero
    ? data.map((item) => ({ ...item, value: 1 }))
    : data;

  return (
    <div className="flex flex-col items-center p-4 w-full mx-auto mb-12">
      <div className="flex items-center flex-col md:flex-row gap-y-2">
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
              stroke="#ffffff20"
              strokeWidth={5}>
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />

          </PieChart>
        </ResponsiveContainer>

        <div className="ml-6 space-y-2">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium text-sm">{entry.name}</span>
              <span className="text-gray-500">
                (${entry.value.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
