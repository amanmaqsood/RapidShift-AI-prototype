"use client";

import { PipelineView } from "@/components/lease/PipelineView";
import { useAppState } from "@/context/AppStateProvider";
import { TrendingUp, Clock, CheckCircle2, Users } from "lucide-react";

export default function LeasePage() {
  const { leases } = useAppState();

  const active = leases.filter((l) => l.stage !== "completed").length;
  const completed = leases.filter((l) => l.stage === "completed").length;
  const avgProb =
    active === 0
      ? 0
      : Math.round(
          leases
            .filter((l) => l.stage !== "completed")
            .reduce((s, l) => s + l.probability, 0) / active,
        );

  const kpis = [
    { label: "Active renewal cycles", value: active.toString(), icon: Users, accent: "text-primary" },
    { label: "Avg renewal likelihood", value: `${avgProb}%`, icon: TrendingUp, accent: "text-tertiary" },
    { label: "Hours saved this quarter", value: "18.5", icon: Clock, accent: "text-primary" },
    { label: "Completed this quarter", value: (completed + 9).toString(), icon: CheckCircle2, accent: "text-primary" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">
          Lease Renewals · Predictive Pipeline
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold text-on-surface">
          Managing{" "}
          <span className="ai-pulse-text">{active} active renewal cycles</span>{" "}
          with AI precision.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
          Calendar-triggered outreach at T-60 / T-45 / T-30. Drag leases
          between stages or use the card menu to override the AI cadence.
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

      <PipelineView />
    </div>
  );
}
