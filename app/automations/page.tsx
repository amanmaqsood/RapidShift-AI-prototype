"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wallet, Wrench, FileText, Zap } from "lucide-react";

const automations = [
  {
    id: "rent-reminder",
    kind: "Rent",
    icon: Wallet,
    title: "Rent reminder at T-3 days",
    description: "Sends a WhatsApp reminder 3 days before rent is due in tenant's preferred language.",
    runs: "Daily · 9:00 AM ET",
    enabledByDefault: true,
  },
  {
    id: "rent-followup",
    kind: "Rent",
    icon: Wallet,
    title: "Adaptive follow-up cadence",
    description: "Re-engages unpaid tenants every 48h up to 3 times, then escalates.",
    runs: "Continuous",
    enabledByDefault: true,
  },
  {
    id: "maint-triage",
    kind: "Maintenance",
    icon: Wrench,
    title: "Maintenance auto-triage",
    description: "Classifies intent, applies troubleshooting KB, opens ticket if unresolved.",
    runs: "On inbound message",
    enabledByDefault: true,
  },
  {
    id: "maint-media",
    kind: "Maintenance",
    icon: Wrench,
    title: "WhatsApp media capture",
    description: "Downloads photos/videos via Graph API, attaches to ticket.",
    runs: "On media message",
    enabledByDefault: true,
  },
  {
    id: "lease-t60",
    kind: "Lease",
    icon: FileText,
    title: "Lease T-60 outreach",
    description: "Opens renewal conversation 60 days before lease end, bilingual.",
    runs: "Daily · calendar-triggered",
    enabledByDefault: true,
  },
  {
    id: "lease-pause",
    kind: "Lease",
    icon: FileText,
    title: "Pause outreach on open issues",
    description: "If tenant has open rent escalation, pauses renewal nudges until resolved.",
    runs: "Conditional",
    enabledByDefault: true,
  },
];

export default function AutomationsPage() {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(automations.map((a) => [a.id, a.enabledByDefault])),
  );

  const activeCount = Object.values(state).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">
          Automations
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold text-on-surface">
          <span className="ai-pulse-text">{activeCount}</span> automations
          powering your operation.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
          Each automation is observable, reversible, and respects the WhatsApp
          24-hour window. Flip the switch to pause any workflow instantly.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {automations.map((a) => {
          const Icon = a.icon;
          const enabled = state[a.id];
          return (
            <div key={a.id} className="card p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-low">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-sm font-semibold text-on-surface">
                      {a.title}
                    </h3>
                    <Badge variant="neutral">{a.kind}</Badge>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-on-surface-variant">
                    {a.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-on-surface-variant/70">
                    <Zap className="h-3 w-3" />
                    {a.runs}
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={enabled}
                  onClick={() => setState((s) => ({ ...s, [a.id]: !s[a.id] }))}
                  className={cn(
                    "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                    enabled ? "ai-pulse-bg" : "bg-surface-container-high",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                      enabled ? "translate-x-5" : "translate-x-0.5",
                    )}
                  />
                </button>
              </div>
              {enabled && (
                <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-primary-container/30 px-3 py-1.5 text-[11px] font-medium text-on-primary-container">
                  <Sparkles className="h-3 w-3" />
                  Active — AI is running this workflow
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
