"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/context/AppStateProvider";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, CheckCircle2, Send, Pause } from "lucide-react";
import type { Lease } from "@/types";

export function LeaseDetailSheet({
  lease,
  onOpenChange,
}: {
  lease: Lease | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { tenants, moveLease } = useAppState();

  if (!lease) {
    return (
      <Sheet open={false} onOpenChange={onOpenChange}>
        <SheetContent />
      </Sheet>
    );
  }

  const tenant = tenants.find((t) => t.id === lease.tenantId)!;
  const uplift = (
    ((lease.proposedRent - lease.currentRent) / lease.currentRent) *
    100
  ).toFixed(1);

  return (
    <Sheet open={!!lease} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-xl">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Badge variant={lease.probability >= 70 ? "success" : lease.probability >= 40 ? "warn" : "error"}>
              {lease.probability}% renewal likelihood
            </Badge>
            <Badge variant="neutral">
              Ends {new Date(lease.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </Badge>
          </div>
          <SheetTitle>{tenant.name}</SheetTitle>
          <SheetDescription>
            {tenant.building} · Unit {tenant.unit} · Lease {lease.id.toUpperCase()}
          </SheetDescription>
          <div className="mt-2 flex items-center gap-3 rounded-xxl bg-surface-container-low p-3">
            <Avatar name={tenant.name} color={tenant.avatarColor} size={40} />
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant">
                Preferred language
              </p>
              <p className="text-sm font-semibold text-on-surface">
                {tenant.language === "es"
                  ? "Spanish"
                  : tenant.language === "ht"
                    ? "Haitian Creole"
                    : "English"}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="scrollbar-subtle flex-1 space-y-4 overflow-y-auto px-6 py-2">
          <div className="rounded-xxl bg-gradient-to-br from-tertiary-container/40 to-tertiary-container/20 p-4">
            <div className="flex items-center gap-2 text-tertiary">
              <Sparkles className="h-4 w-4" />
              <p className="text-[11px] font-semibold uppercase tracking-widest">
                AI Summary
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-on-tertiary-container">
              {lease.aiSummary}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-surface-container-low p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                Current
              </p>
              <p className="mt-1 font-headline text-lg font-bold text-on-surface">
                {formatCurrency(lease.currentRent)}
              </p>
            </div>
            <div className="rounded-xl bg-surface-container-low p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                Proposed
              </p>
              <p className="mt-1 font-headline text-lg font-bold text-primary">
                {formatCurrency(lease.proposedRent)}
              </p>
            </div>
            <div className="rounded-xl bg-surface-container-low p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                Uplift
              </p>
              <p className="mt-1 font-headline text-lg font-bold text-tertiary">
                +{uplift}%
              </p>
            </div>
          </div>

          <div className="rounded-xxl bg-surface-container-low p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant">
              Next AI-planned touchpoint
            </p>
            <p className="mt-1 text-sm text-on-surface">
              {lease.stage === "completed"
                ? "Renewal complete. No further outreach needed."
                : lease.stage === "t-60"
                  ? "Send bilingual opening message via WhatsApp in 2 days."
                  : lease.stage === "t-45"
                    ? "Follow up with personalized offer this week."
                    : "Urgent: schedule human call within 48 hours."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-0 bg-surface-container-low p-6">
          {lease.stage !== "completed" && (
            <Button
              variant="success"
              onClick={() => {
                moveLease(lease.id, "completed");
                onOpenChange(false);
              }}
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark Renewed
            </Button>
          )}
          <Button variant="ai" disabled={lease.stage === "completed"}>
            <Send className="h-4 w-4" />
            Send AI Outreach
          </Button>
          <Button variant="outline" disabled={lease.stage === "completed"}>
            <Pause className="h-4 w-4" />
            Pause Automation
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
