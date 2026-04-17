"use client";

import { KanbanBoard } from "@/components/maintenance/KanbanBoard";
import { useAppState } from "@/context/AppStateProvider";
import { Clock, Wrench, TriangleAlert, CheckCircle2 } from "lucide-react";

export default function MaintenancePage() {
  const { tickets } = useAppState();

  const counts = {
    new: tickets.filter((t) => t.column === "new").length,
    ai: tickets.filter((t) => t.column === "ai_handling").length,
    escalated: tickets.filter((t) => t.column === "escalated").length,
    resolved: tickets.filter((t) => t.column === "resolved").length,
  };

  const kpis = [
    { label: "Avg AI triage time", value: "42s", icon: Clock, accent: "text-tertiary" },
    { label: "In AI handling", value: counts.ai.toString(), icon: Wrench, accent: "text-primary" },
    { label: "Escalated today", value: counts.escalated.toString(), icon: TriangleAlert, accent: "text-error" },
    { label: "Resolved this week", value: (counts.resolved + 14).toString(), icon: CheckCircle2, accent: "text-primary" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">
          Maintenance · AI Dispatch & Triage
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold text-on-surface">
          Orchestrating repairs with{" "}
          <span className="ai-pulse-text">intelligent prioritization</span>.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
          Drag tickets between columns, or use the card menu. The AI suggests a
          resolution path for every new request.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon, accent }) => (
          <div key={label} className="card p-5">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                {label}
              </p>
              <Icon className={`h-4 w-4 ${accent}`} />
            </div>
            <p className={`mt-2 font-headline text-2xl font-bold ${accent}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      <KanbanBoard />
    </div>
  );
}
