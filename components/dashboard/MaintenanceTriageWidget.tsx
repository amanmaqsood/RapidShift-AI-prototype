"use client";

import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppState } from "@/context/AppStateProvider";

export function MaintenanceTriageWidget() {
  const { tickets } = useAppState();
  const rows = [
    { label: "New requests", count: tickets.filter((t) => t.column === "new").length, dot: "bg-on-surface-variant" },
    { label: "AI handling", count: tickets.filter((t) => t.column === "ai_handling").length, dot: "ai-pulse-bg" },
    { label: "Escalated", count: tickets.filter((t) => t.column === "escalated").length, dot: "bg-error" },
  ];

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-primary" />
          <h3 className="font-headline text-sm font-semibold tracking-tight text-on-surface">
            Maintenance triage
          </h3>
        </div>
        <Link
          href="/maintenance"
          className="flex items-center gap-1 text-[11px] font-semibold text-tertiary hover:text-tertiary-dim"
        >
          View board
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3">
            <span className={cn("h-2 w-2 rounded-full", r.dot)} />
            <span className="flex-1 text-[13px] text-on-surface">{r.label}</span>
            <span className="font-headline text-sm font-semibold text-on-surface">
              {r.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
