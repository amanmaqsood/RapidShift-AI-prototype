"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import { useAppState } from "@/context/AppStateProvider";
import type { RentStatusKind } from "@/types";
import { Languages } from "lucide-react";

const languageLabel = { en: "EN", es: "ES", ht: "HT" } as const;

const statusStyles: Record<
  RentStatusKind,
  { variant: Parameters<typeof Badge>[0]["variant"]; label: string }
> = {
  paid: { variant: "success", label: "Paid" },
  unpaid: { variant: "warn", label: "Unpaid" },
  late: { variant: "error", label: "Late" },
  needs_human: { variant: "error", label: "Needs Human" },
};

export function TenantList({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const { tenants, rent, messages } = useAppState();

  const rows = tenants.map((t) => {
    const record = rent.find((r) => r.tenantId === t.id);
    const msgs = messages.filter((m) => m.tenantId === t.id);
    const lastMsg = msgs[msgs.length - 1];
    const aiHandled = lastMsg?.author === "ai";
    return { tenant: t, record, lastMsg, aiHandled };
  });

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 pb-4 pt-5">
        <h3 className="font-headline text-lg font-semibold text-on-surface">
          Tenants
        </h3>
        <span className="text-[11px] text-on-surface-variant">
          {rows.length} active
        </span>
      </div>
      <div className="scrollbar-subtle flex-1 overflow-y-auto">
        {rows.map(({ tenant, record, aiHandled }) => {
          const status = record ? statusStyles[record.status] : null;
          const isSelected = selectedId === tenant.id;
          return (
            <button
              key={tenant.id}
              onClick={() => onSelect(tenant.id)}
              className={cn(
                "flex w-full items-center gap-3 px-6 py-3 text-left transition-colors",
                isSelected
                  ? "bg-surface-container-low"
                  : "hover:bg-surface-container-low/60",
              )}
            >
              <Avatar name={tenant.name} color={tenant.avatarColor} size={40} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-on-surface">
                    {tenant.name}
                  </p>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-surface-container-high px-1.5 py-[1px] text-[9px] font-bold tracking-wider text-on-surface-variant">
                    <Languages className="h-2.5 w-2.5" />
                    {languageLabel[tenant.language]}
                  </span>
                </div>
                <p className="truncate text-[11px] text-on-surface-variant">
                  {tenant.building} · Unit {tenant.unit}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {status && <Badge variant={status.variant}>{status.label}</Badge>}
                  {aiHandled && record?.status !== "needs_human" && (
                    <Badge variant="ai">Handled by AI</Badge>
                  )}
                </div>
              </div>
              {record && (
                <div className="text-right">
                  <p className="text-sm font-semibold text-on-surface">
                    {formatCurrency(record.amount)}
                  </p>
                  {record.status === "late" && record.daysLate && (
                    <p className="text-[10px] font-medium text-error">
                      {record.daysLate}d late
                    </p>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
