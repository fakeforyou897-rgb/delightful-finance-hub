import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  Info,
  Moon,
  MoreVertical,
  ShoppingBag,
  Sun,
  Target,
  Trash2,
  Wallet,
} from "lucide-react";
import { BalanceDonut, RevenueChart } from "@/components/dashboard/charts";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { balanceSplit, transactions, type TxStatus } from "@/components/dashboard/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vorix — Finance Dashboard for Balances & Payments" },
      {
        name: "description",
        content:
          "Vorix finance dashboard: track balance, revenue reports, currency allocation and transaction history in one dark, focused workspace.",
      },
      { property: "og:title", content: "Vorix — Finance Dashboard" },
      {
        property: "og:description",
        content: "Track balance, revenue, currency allocation and transactions in one workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Total Revenue", value: "$47,255.00", icon: Wallet, delta: "+12.4%" },
  { label: "Avg. Order Value", value: "$98,747.00", icon: Target, delta: "+4.8%" },
  { label: "New Order", value: "$47,255.00", icon: ShoppingBag, delta: "-1.2%" },
];

const statusStyles: Record<TxStatus, string> = {
  Successful: "border-success/40 text-success bg-success/10",
  Pending: "border-warning/40 text-warning bg-warning/10",
  Failed: "border-destructive/40 text-destructive bg-destructive/10",
};

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 px-4 py-6 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, here is your money at a glance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-border bg-card p-1">
              <span className="flex size-8 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground">
                <Moon className="size-4" />
              </span>
              <span className="flex size-8 items-center justify-center rounded-full text-muted-foreground">
                <Sun className="size-4" />
              </span>
            </div>
            <button className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="size-4" />
            </button>
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-sm font-semibold">
              AV
            </span>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="surface-card flex items-center gap-4 p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary-soft">
                <stat.icon className="size-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-1 text-xl font-semibold">{stat.value}</p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">{stat.delta}</span>
            </article>
          ))}
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <article className="surface-hero p-6">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Wallet className="size-4" /> My Balance <Info className="size-3.5" />
                </p>
                <button className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs">
                  <span className="size-3 rounded-full bg-warning" /> xx25
                  <ChevronDown className="size-3" />
                </button>
              </div>
              <div className="mt-5 flex items-end gap-3">
                <p className="text-4xl font-semibold tracking-tight">$525,255.00</p>
                <span className="mb-1 rounded-full bg-success/15 px-2 py-0.5 text-xs text-success">
                  +55.58%
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-medium text-primary-foreground">
                  <ArrowUpRight className="size-4" /> Transfer
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-2.5 text-sm font-medium">
                  Request
                </button>
              </div>
            </article>

            <article className="surface-card p-6">
              <p className="flex items-center gap-2 text-sm font-medium">
                Balance Details <Info className="size-3.5 text-muted-foreground" />
              </p>
              <BalanceDonut />
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                {balanceSplit.map((slice) => (
                  <span key={slice.name} className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: slice.color }}
                    />
                    {slice.name}
                    <span className="ml-auto text-foreground">{slice.value}%</span>
                  </span>
                ))}
              </div>
            </article>
          </div>

          <article className="surface-card flex flex-col p-6">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-medium">
                Report <Info className="size-3.5 text-muted-foreground" />
              </p>
              <button className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
                This Year <ChevronDown className="size-3" />
              </button>
            </div>
            <RevenueChart />
            <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-primary" /> Income
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[var(--chart-5)]" /> Expense
              </span>
            </div>
          </article>
        </section>

        <section className="surface-card mt-4 p-6">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-medium">
              Transaction History <Info className="size-3.5 text-muted-foreground" />
            </p>
            <button className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
              This Month <ChevronDown className="size-3" />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-medium">Transaction</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Approx</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t border-border/70">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-xs font-semibold">
                          {tx.name.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <p className="font-medium">{tx.name}</p>
                          <p className="text-xs text-muted-foreground">{tx.ref}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-muted-foreground">{tx.date}</td>
                    <td className="py-4">{tx.amount}</td>
                    <td className="py-4">
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs",
                          statusStyles[tx.status],
                        )}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                        <button className="rounded-lg p-2 transition-colors hover:bg-muted hover:text-foreground">
                          <MoreVertical className="size-4" />
                        </button>
                        <button className="rounded-lg p-2 transition-colors hover:bg-muted hover:text-destructive">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
