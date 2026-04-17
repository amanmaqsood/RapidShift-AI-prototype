import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function KPICard({
  label,
  value,
  subValue,
  icon: Icon,
  accent = "primary",
  trend,
}: {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  accent?: "primary" | "tertiary" | "warn" | "error";
  trend?: string;
}) {
  const accentClass = {
    primary: "text-primary",
    tertiary: "text-tertiary",
    warn: "text-[#6b4b00]",
    error: "text-error",
  }[accent];

  return (
    <div className="card flex flex-col justify-between p-5">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
          {label}
        </p>
        <Icon className={cn("h-4 w-4", accentClass)} />
      </div>
      <div className="mt-4">
        <p className={cn("font-headline text-3xl font-bold", accentClass)}>
          {value}
        </p>
        {subValue && (
          <p className="mt-1 text-[11px] text-on-surface-variant">{subValue}</p>
        )}
        {trend && (
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-container/50 px-2 py-0.5 text-[10px] font-semibold text-on-primary-container">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}
