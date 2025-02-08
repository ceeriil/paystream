import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowLink } from "@/components/assets/ArrowLink";
import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  percentageChange: number;
  href?: string;
  color?: string;
}

export function DashboardCard({
  icon: Icon,
  label,
  value,
  percentageChange,
  href,
}: DashboardCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Card
        className={`p-6 py-8 card before:bg-[#CF1A2C] rounded-2xl z-[10] overflow-hidden`}
      >
        {href && (
          <Link
            href={href}
            className="absolute rounded-full bg-[#ffffff16] w-12 h-12 flex items-center justify-center right-4 top-4"
          >
            <ArrowLink />
          </Link>
        )}
        {children}
      </Card>
    );
  };

  return (
    <CardWrapper>
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-base font-medium text-muted-foreground">{label}</p>
          <h2 className="text-4xl font-bold mt-4 mb-1 gradient-text">
            {value}
          </h2>
          <p
            className={`text-xs ${percentageChange >= 0 ? "text-[#00B85E]" : "text-red-500"}`}
          >
            {percentageChange >= 0 ? "+" : ""}
            {percentageChange}% from last month
          </p>
        </div>
      </div>
    </CardWrapper>
  );
}
