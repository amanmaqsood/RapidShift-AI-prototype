"use client";

import { useState } from "react";
import { TenantList } from "@/components/rent/TenantList";
import { ChatPanel } from "@/components/rent/ChatPanel";
import { useAppState } from "@/context/AppStateProvider";
import { formatCurrency } from "@/lib/utils";
import { Wallet, AlertCircle, Sparkles, Building2 } from "lucide-react";

export default function RentPage() {
  const { rent, messages } = useAppState();
  const [selected, setSelected] = useState<string | null>("t1");

  const collected = rent
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + r.amount, 0);
  const outstanding = rent
    .filter((r) => r.status !== "paid")
    .reduce((sum, r) => sum + r.amount, 0);
  const aiInterventions = messages.filter((m) => m.author === "ai").length;
  const unitsTracked = rent.length;

  const kpis = [
    {
      icon: Wallet,
      label: "Collected this month",
      value: formatCurrency(collected),
      accent: "text-primary",
    },
    {
      icon: AlertCircle,
      label: "Outstanding",
      value: formatCurrency(outstanding),
      accent: "text-error",
    },
    {
      icon: Sparkles,
      label: "AI interventions",
      value: aiInterventions.toString(),
      accent: "text-tertiary",
    },
    {
      icon: Building2,
      label: "Units tracked",
      value: unitsTracked.toString(),
      accent: "text-on-surface",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">
          Rent Collection · AI Auto-Followup
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold text-on-surface">
          Monitoring <span className="text-primary">{unitsTracked}</span> units.
          AI is handling{" "}
          <span className="ai-pulse-text">
            {rent.filter((r) => r.status !== "paid" && r.status !== "needs_human").length}
          </span>{" "}
          active payment inquiries.
        </h1>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map(({ icon: Icon, label, value, accent }) => (
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

      <div className="card grid h-[calc(100vh-18rem)] min-h-[600px] grid-cols-[360px_1fr] overflow-hidden">
        <div className="border-0 bg-surface-container-low/50">
          <TenantList selectedId={selected} onSelect={setSelected} />
        </div>
        <div className="bg-surface-container-lowest">
          <ChatPanel tenantId={selected} />
        </div>
      </div>
    </div>
  );
}
