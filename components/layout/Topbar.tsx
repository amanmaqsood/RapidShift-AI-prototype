"use client";

import { Bell, Search, RotateCcw, HelpCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useAppState } from "@/context/AppStateProvider";

export function Topbar() {
  const { reset } = useAppState();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-0 bg-background/70 px-8 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="search"
            placeholder="Search tenants, units, tickets…"
            className="w-full rounded-full bg-surface-container-high/70 py-2 pl-9 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-primary-container/60 px-3 py-1.5 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ai-pulse rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-on-primary-container">
            AI Active
          </span>
        </div>

        <button
          onClick={reset}
          title="Reset demo data"
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <button
          title="Help"
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        <button
          title="Notifications"
          className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-error" />
        </button>

        <div className="ml-2 flex items-center gap-2">
          <Avatar name="Natalia Rivera" color="#4a50c8" size={34} />
          <div className="hidden leading-tight md:block">
            <p className="text-xs font-semibold text-on-surface">Natalia Rivera</p>
            <p className="text-[10px] text-on-surface-variant">
              Property Manager
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
