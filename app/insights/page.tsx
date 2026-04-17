"use client";

import { KPICard } from "@/components/dashboard/KPICard";
import { Sparkles, Clock, Languages, Zap } from "lucide-react";
import { useAppState } from "@/context/AppStateProvider";

export default function InsightsPage() {
  const { messages, tenants } = useAppState();

  const aiMessages = messages.filter((m) => m.author === "ai").length;
  const humanMessages = messages.filter((m) => m.author === "human").length;
  const totalMessages = messages.length || 1;

  const langCount = {
    en: tenants.filter((t) => t.language === "en").length,
    es: tenants.filter((t) => t.language === "es").length,
    ht: tenants.filter((t) => t.language === "ht").length,
  };

  const bars = [
    { label: "Rent reminders", value: 58, color: "#47664a" },
    { label: "Payment link shares", value: 34, color: "#4a50c8" },
    { label: "Maintenance triage", value: 27, color: "#d97706" },
    { label: "Renewal outreach", value: 19, color: "#53644d" },
    { label: "Escalations to human", value: 6, color: "#ac3434" },
  ];
  const maxBar = Math.max(...bars.map((b) => b.value));

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">
          AI Insights
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold text-on-surface">
          How the AI is spending{" "}
          <span className="ai-pulse-text">its week</span>.
        </h1>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KPICard
          label="Automation rate"
          value={`${Math.round((aiMessages / totalMessages) * 100)}%`}
          subValue={`${aiMessages} AI msgs · ${humanMessages} human msgs`}
          icon={Sparkles}
          accent="tertiary"
        />
        <KPICard
          label="Avg AI response"
          value="38s"
          subValue="From tenant message → AI reply"
          icon={Zap}
          accent="primary"
          trend="▼ 6s vs last week"
        />
        <KPICard
          label="Hours saved / week"
          value="12"
          subValue="Equivalent to 0.3 FTE"
          icon={Clock}
          accent="tertiary"
        />
        <KPICard
          label="Languages in play"
          value="3"
          subValue={`${langCount.en} EN · ${langCount.es} ES · ${langCount.ht} HT`}
          icon={Languages}
          accent="primary"
        />
      </div>

      <div className="card p-6">
        <h2 className="font-headline text-lg font-semibold text-on-surface">
          AI actions this week — by category
        </h2>
        <p className="mt-1 text-xs text-on-surface-variant">
          Counts across WhatsApp, SMS, and internal decisions.
        </p>
        <div className="mt-6 space-y-4">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className="font-medium text-on-surface">{b.label}</span>
                <span className="font-semibold text-on-surface-variant">
                  {b.value}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-container-high">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(b.value / maxBar) * 100}%`,
                    background: b.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
