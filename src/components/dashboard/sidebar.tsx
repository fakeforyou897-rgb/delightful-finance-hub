import {
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Receipt,
  Search,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Payment", icon: Wallet },
  { label: "Cards", icon: CreditCard, chevron: true },
  { label: "Transactions", icon: Receipt },
  { label: "Texes", icon: Receipt },
  { label: "Users", icon: Users },
];

const generalMenu = [
  { label: "Settings", icon: Settings },
  { label: "Support", icon: LifeBuoy },
];

export function DashboardSidebar() {
  return (
    <aside className="hidden w-[248px] shrink-0 flex-col gap-6 border-r border-sidebar-border bg-sidebar px-4 py-6 lg:flex">
      <div className="flex items-center gap-2 px-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground">
          V
        </span>
        <span className="text-lg font-semibold tracking-tight">Vorix</span>
      </div>

      <label className="flex items-center gap-2 rounded-xl border border-sidebar-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
        <Search className="size-4" />
        <input
          placeholder="Search"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="rounded-md border border-border px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </label>

      <nav className="flex flex-1 flex-col gap-1">
        <p className="px-3 pb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Main Menu
        </p>
        {mainMenu.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
              item.active
                ? "bg-sidebar-accent text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <item.icon className="size-4" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.chevron ? <ChevronRight className="size-4" /> : null}
          </button>
        ))}

        <p className="px-3 pb-2 pt-6 text-xs uppercase tracking-wider text-muted-foreground">
          General
        </p>
        {generalMenu.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <item.icon className="size-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="rounded-2xl border border-sidebar-border bg-[image:var(--gradient-glow)] p-4">
        <p className="text-sm font-medium">Upgrade to Pro</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Unlimited cards, deeper reports and priority support.
        </p>
        <button className="mt-3 w-full rounded-lg bg-[image:var(--gradient-primary)] px-3 py-2 text-xs font-semibold text-primary-foreground">
          Upgrade
        </button>
      </div>
    </aside>
  );
}
