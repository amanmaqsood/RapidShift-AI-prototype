"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/context/AppStateProvider";
import {
  Sparkles,
  Check,
  Eye,
  TriangleAlert,
  Wrench,
  Wallet,
  FileText,
} from "lucide-react";
import type { AIActionKind, AIActionStatus } from "@/types";

const kindIcon: Record<AIActionKind, typeof Wallet> = {
  rent: Wallet,
  maintenance: Wrench,
  lease: FileText,
};

const kindLabel: Record<AIActionKind, string> = {
  rent: "Rent",
  maintenance: "Maintenance",
  lease: "Lease",
};

const statusBadge: Record<
  AIActionStatus,
  { label: string; variant: Parameters<typeof Badge>[0]["variant"] }
> = {
  pending: { label: "Awaiting review", variant: "ai" },
  approved: { label: "Approved", variant: "success" },
  reviewing: { label: "Under review", variant: "warn" },
  escalated: { label: "Escalated", variant: "error" },
};

export function AIActionCenter() {
  const { aiActions, setAIActionStatus } = useAppState();

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-4 px-6 py-5">
        <div>
          <div className="flex items-center gap-2 text-tertiary">
            <Sparkles className="h-4 w-4" />
            <p className="text-[11px] font-semibold uppercase tracking-widest">
              AI Action Center
            </p>
          </div>
          <h2 className="mt-1 font-headline text-xl font-semibold text-on-surface">
            {aiActions.filter((a) => a.status === "pending").length} decisions
            awaiting a one-click review
          </h2>
        </div>
      </div>

      <div className="divide-y divide-surface-container">
        {aiActions.map((a) => {
          const Icon = kindIcon[a.kind];
          const badge = statusBadge[a.status];
          const isDone = a.status !== "pending";
          return (
            <div
              key={a.id}
              className={cn(
                "flex flex-col gap-3 px-6 py-4 transition-all md:flex-row md:items-center",
                isDone && "opacity-60",
              )}
            >
              <div className="flex items-start gap-3 md:flex-1">
                <div
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    a.status === "approved"
                      ? "bg-primary-container text-on-primary-container"
                      : a.status === "escalated"
                        ? "bg-error-container/60 text-on-error-container"
                        : "bg-surface-container-low text-on-surface-variant",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={cn(
                        "font-headline text-sm font-semibold text-on-surface",
                        a.status === "approved" && "line-through",
                      )}
                    >
                      {a.title}
                    </h3>
                    <Badge variant="neutral" className="uppercase">
                      {kindLabel[a.kind]}
                    </Badge>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-on-surface-variant">
                    {a.summary}
                  </p>
                  <p className="mt-1 text-[10px] text-on-surface-variant/70">
                    AI saved ~{a.savedMinutes} min · {a.tenantName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 md:shrink-0">
                <Button
                  size="sm"
                  variant="success"
                  disabled={a.status === "approved"}
                  onClick={() => setAIActionStatus(a.id, "approved")}
                >
                  <Check className="h-3.5 w-3.5" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={a.status === "reviewing"}
                  onClick={() => setAIActionStatus(a.id, "reviewing")}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Review
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-error"
                  disabled={a.status === "escalated"}
                  onClick={() => setAIActionStatus(a.id, "escalated")}
                >
                  <TriangleAlert className="h-3.5 w-3.5" />
                  Escalate
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
