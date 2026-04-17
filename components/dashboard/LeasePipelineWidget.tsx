"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { useAppState } from "@/context/AppStateProvider";

export function LeasePipelineWidget() {
  const { leases } = useAppState();
  const active = leases.filter((l) => l.stage !== "completed");
  const total = active.length || 1;

  const segments = [
    { label: "T-60", count: active.filter((l) => l.stage === "t-60").length, color: "#4a50c8" },
    { label: "T-45", count: active.filter((l) => l.stage === "t-45").length, color: "#47664a" },
    { label: "T-30", count: active.filter((l) => l.stage === "t-30").length, color: "#d97706" },
  ];

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <h3 className="font-headline text-sm font-semibold tracking-tight text-on-surface">
            Renewal pipeline
          </h3>
        </div>
        <Link
          href="/lease"
          className="flex items-center gap-1 text-[11px] font-semibold text-tertiary hover:text-tertiary-dim"
        >
          View pipeline
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-surface-container-high">
        {segments.map((s) => (
          <div
            key={s.label}
            style={{
              width: `${(s.count / total) * 100}%`,
              background: s.color,
            }}
          />
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: s.color }}
            />
            <span className="flex-1 text-[13px] text-on-surface">
              {s.label} — {s.count === 1 ? "1 lease" : `${s.count} leases`}
            </span>
          </div>
        ))}
        <p className="pt-1 text-[11px] text-on-surface-variant">
          {active.length} active cycles · avg{" "}
          {Math.round(
            active.reduce((s, l) => s + l.probability, 0) / (active.length || 1),
          )}
          % renewal likelihood
        </p>
      </div>
    </div>
  );
}
