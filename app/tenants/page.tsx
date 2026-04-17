"use client";

import { useMemo, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/context/AppStateProvider";
import { formatCurrency } from "@/lib/utils";
import { Search, Users } from "lucide-react";
import type { RentStatusKind } from "@/types";

const langLabel = { en: "English", es: "Spanish", ht: "Haitian Creole" } as const;

const statusStyle: Record<
  RentStatusKind,
  { variant: Parameters<typeof Badge>[0]["variant"]; label: string }
> = {
  paid: { variant: "success", label: "Paid" },
  unpaid: { variant: "warn", label: "Unpaid" },
  late: { variant: "error", label: "Late" },
  needs_human: { variant: "error", label: "Needs Human" },
};

export default function TenantsPage() {
  const { tenants, rent } = useAppState();
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return tenants
      .map((t) => ({ tenant: t, record: rent.find((r) => r.tenantId === t.id) }))
      .filter(
        ({ tenant }) =>
          !term ||
          tenant.name.toLowerCase().includes(term) ||
          tenant.unit.toLowerCase().includes(term) ||
          tenant.building.toLowerCase().includes(term),
      );
  }, [tenants, rent, q]);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">
          Portfolio · Tenants
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold text-on-surface">
          <span className="text-primary">{tenants.length}</span> tenants across
          3 Miami buildings
        </h1>
      </header>

      <div className="card overflow-hidden">
        <div className="flex items-center gap-3 border-0 px-6 py-4">
          <Users className="h-4 w-4 text-on-surface-variant" />
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-on-surface-variant" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, unit, or building…"
              className="w-full rounded-full bg-surface-container-high/70 py-2 pl-8 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <span className="text-[11px] text-on-surface-variant">
            Showing {rows.length} of {tenants.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container-low text-left text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                <th className="px-6 py-3">Tenant</th>
                <th className="px-6 py-3">Building · Unit</th>
                <th className="px-6 py-3">Language</th>
                <th className="px-6 py-3">Rent</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ tenant, record }) => {
                const st = record ? statusStyle[record.status] : null;
                return (
                  <tr
                    key={tenant.id}
                    className="border-0 transition-colors hover:bg-surface-container-low/40"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={tenant.name}
                          color={tenant.avatarColor}
                          size={32}
                        />
                        <span className="font-medium text-on-surface">
                          {tenant.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-on-surface-variant">
                      {tenant.building} · {tenant.unit}
                    </td>
                    <td className="px-6 py-3 text-on-surface-variant">
                      {langLabel[tenant.language]}
                    </td>
                    <td className="px-6 py-3 font-semibold text-on-surface">
                      {record ? formatCurrency(record.amount) : "—"}
                    </td>
                    <td className="px-6 py-3">
                      {st && <Badge variant={st.variant}>{st.label}</Badge>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
