import {
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  Receipt,
  Search,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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

function SidebarContent() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      <div className="flex min-w-0 items-center gap-2 px-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-sm font-bold text-primary-foreground">
          V
        </span>
        <span className="truncate text-lg font-semibold tracking-tight">Vorix</span>
      </div>

      <label className="flex min-w-0 items-center gap-2 rounded-xl border border-sidebar-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
        <Search className="size-4 shrink-0" />
        <input
          placeholder="Search"
          className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden shrink-0 rounded-md border border-border px-1.5 py-0.5 text-[10px] sm:block">
          ⌘K
        </kbd>
      </label>

      <nav className="scroll-area flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        <p className="px-3 pb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Main Menu
        </p>
        {mainMenu.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
              item.active
                ? "bg-sidebar-accent text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <item.icon className="size-4 shrink-0" />
            <span className="flex-1 truncate text-left">{item.label}</span>
            {item.chevron ? <ChevronRight className="size-4 shrink-0" /> : null}
          </button>
        ))}

        <p className="px-3 pb-2 pt-6 text-xs uppercase tracking-wider text-muted-foreground">
          General
        </p>
        {generalMenu.map((item) => (
          <button
            key={item.label}
            className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <item.icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="shrink-0 rounded-2xl border border-sidebar-border bg-[image:var(--gradient-glow)] p-4">
        <p className="text-sm font-medium">Upgrade to Pro</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Unlimited cards, deeper reports and priority support.
        </p>
        <button className="mt-3 w-full rounded-lg bg-[image:var(--gradient-primary)] px-3 py-2 text-xs font-semibold text-primary-foreground">
          Upgrade
        </button>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 border-r border-sidebar-border bg-sidebar px-4 py-6 lg:block">
      <SidebarContent />
    </aside>
  );
}

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <Menu className="size-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-sidebar px-4 py-6">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
