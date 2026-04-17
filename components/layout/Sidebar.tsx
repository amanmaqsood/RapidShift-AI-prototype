"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Wrench,
  FileText,
  Users,
  Sparkles,
  Zap,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    label: "Operations",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/rent", label: "Rent Collection", icon: Wallet },
      { href: "/maintenance", label: "Maintenance", icon: Wrench },
      { href: "/lease", label: "Lease Renewals", icon: FileText },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { href: "/tenants", label: "Tenants", icon: Users },
      { href: "/insights", label: "AI Insights", icon: Sparkles },
      { href: "/automations", label: "Automations", icon: Zap },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-surface-container px-4 py-6">
      <Link href="/dashboard" className="mb-8 px-3">
        <div className="flex items-center gap-2">
          <div className="ai-pulse-bg h-8 w-8 rounded-xl" />
          <div>
            <h1 className="font-headline text-[15px] font-bold tracking-tight text-primary leading-none">
              RapidShift AI
            </h1>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/70">
              Digital Concierge
            </p>
          </div>
        </div>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto scrollbar-subtle">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant/60">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-surface-container-lowest text-primary shadow-ambient translate-x-0.5"
                          : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-4 rounded-xxl bg-surface-container-lowest p-4 ambient-shadow">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-on-surface-variant" />
          <Link
            href="/settings"
            className="text-xs font-medium text-on-surface hover:text-primary"
          >
            Settings
          </Link>
        </div>
        <p className="mt-2 text-[10px] text-on-surface-variant">
          Deals with Dignity — Miami
        </p>
      </div>
    </aside>
  );
}
