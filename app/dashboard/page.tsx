"use client";

import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { KPICard } from "@/components/dashboard/KPICard";
import { AIActionCenter } from "@/components/dashboard/AIActionCenter";
import { MaintenanceTriageWidget } from "@/components/dashboard/MaintenanceTriageWidget";
import { LeasePipelineWidget } from "@/components/dashboard/LeasePipelineWidget";
import { useAppState } from "@/context/AppStateProvider";
import { Clock, AlertCircle, Building2, TrendingUp, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const { rent, aiActions, tenants } = useAppState();

  const collectionRate = Math.round(
    (rent.filter((r) => r.status === "paid").length / rent.length) * 100,
  );
  const outstanding = rent
    .filter((r) => r.status !== "paid")
    .reduce((s, r) => s + r.amount, 0);
  const pendingActions = aiActions.filter((a) => a.status === "pending").length;

  return (
    <div className="flex flex-col gap-6">
      <HeroBanner />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KPICard
          label="AI saved this week"
          value="12 hrs"
          subValue="Across 148 automated touchpoints"
          icon={Clock}
          accent="tertiary"
          trend="▲ 3.5 hrs vs last week"
        />
        <KPICard
          label="Tasks needing attention"
          value={pendingActions.toString()}
          subValue="Review in AI Action Center"
          icon={AlertCircle}
          accent="warn"
        />
        <KPICard
          label="Active tenants"
          value={tenants.length.toString()}
          subValue={`3 buildings · Miami`}
          icon={Building2}
          accent="primary"
        />
        <KPICard
          label="Collection rate"
          value={`${collectionRate}%`}
          subValue={`${formatCurrency(outstanding)} outstanding`}
          icon={TrendingUp}
          accent="primary"
          trend="On pace for 96% this month"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <AIActionCenter />

        <div className="flex flex-col gap-6">
          <MaintenanceTriageWidget />
          <LeasePipelineWidget />

          <div className="card ai-glow relative overflow-hidden p-5">
            <div className="flex items-center gap-2 text-tertiary">
              <Sparkles className="h-4 w-4" />
              <p className="text-[11px] font-semibold uppercase tracking-widest">
                AI insight of the day
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-on-surface">
              Tenants receiving proactive maintenance check-ins are{" "}
              <span className="font-semibold text-primary">34% more likely</span>{" "}
              to renew. Consider enabling auto check-ins for units aged 18+ months.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
