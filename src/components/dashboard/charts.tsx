import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { balanceSplit, revenueData } from "./data";

export function RevenueChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueData} barGap={-14} margin={{ top: 10, right: 8, bottom: 0, left: 0 }}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={44}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickFormatter={(v: number) => `$${v}K`}
          />
          <Tooltip
            cursor={{ fill: "color-mix(in oklab, var(--primary) 10%, transparent)" }}
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              color: "var(--popover-foreground)",
              fontSize: 12,
            }}
            formatter={(value: number, name: string) => [`$${Math.abs(value)}K`, name]}
          />
          <Bar dataKey="income" fill="var(--chart-1)" radius={[8, 8, 8, 8]} barSize={18} />
          <Bar dataKey="expense" fill="var(--chart-5)" radius={[8, 8, 8, 8]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BalanceDonut() {
  return (
    <div className="relative h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={balanceSplit}
            dataKey="value"
            innerRadius={68}
            outerRadius={98}
            paddingAngle={3}
            cornerRadius={10}
            stroke="none"
          >
            {balanceSplit.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              color: "var(--popover-foreground)",
              fontSize: 12,
            }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold">100%</span>
        <span className="text-xs text-muted-foreground">Allocated</span>
      </div>
    </div>
  );
}
