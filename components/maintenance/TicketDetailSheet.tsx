"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useAppState } from "@/context/AppStateProvider";
import { MessageBubble } from "@/components/rent/MessageBubble";
import { Sparkles, CheckCircle2, TriangleAlert } from "lucide-react";
import type { Ticket } from "@/types";

export function TicketDetailSheet({
  ticket,
  onOpenChange,
}: {
  ticket: Ticket | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { tenants, moveTicket } = useAppState();

  if (!ticket) {
    return (
      <Sheet open={false} onOpenChange={onOpenChange}>
        <SheetContent />
      </Sheet>
    );
  }

  const tenant = tenants.find((t) => t.id === ticket.tenantId)!;

  return (
    <Sheet open={!!ticket} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-xl">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Badge variant={ticket.severity === "high" ? "error" : ticket.severity === "med" ? "warn" : "neutral"}>
              {ticket.severity === "high" ? "Urgent" : ticket.severity === "med" ? "Medium" : "Low"}
            </Badge>
            <Badge variant="neutral">{ticket.id.toUpperCase()}</Badge>
          </div>
          <SheetTitle>{ticket.title}</SheetTitle>
          <SheetDescription>{ticket.description}</SheetDescription>
          <div className="mt-2 flex items-center gap-3 rounded-xxl bg-surface-container-low p-3">
            <Avatar name={tenant.name} color={tenant.avatarColor} size={36} />
            <div>
              <p className="text-sm font-semibold text-on-surface">
                {tenant.name}
              </p>
              <p className="text-[11px] text-on-surface-variant">
                {tenant.building} · Unit {tenant.unit}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="scrollbar-subtle flex-1 overflow-y-auto px-6 py-2">
          <div className="mb-4 rounded-xxl bg-gradient-to-br from-tertiary-container/40 to-tertiary-container/20 p-4">
            <div className="flex items-center gap-2 text-tertiary">
              <Sparkles className="h-4 w-4" />
              <p className="text-[11px] font-semibold uppercase tracking-widest">
                AI Suggested Resolution
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-on-tertiary-container">
              {ticket.aiSuggestion}
            </p>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant">
            Conversation
          </p>
          <div className="space-y-3">
            {ticket.thread.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-0 bg-surface-container-low p-6">
          <Button
            variant="success"
            onClick={() => {
              moveTicket(ticket.id, "resolved");
              onOpenChange(false);
            }}
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark Resolved
          </Button>
          <Button
            variant="ai"
            onClick={() => moveTicket(ticket.id, "ai_handling")}
            disabled={ticket.column === "ai_handling"}
          >
            <Sparkles className="h-4 w-4" />
            Approve AI Plan
          </Button>
          <Button
            variant="outline"
            onClick={() => moveTicket(ticket.id, "escalated")}
            disabled={ticket.column === "escalated"}
            className="text-error"
          >
            <TriangleAlert className="h-4 w-4" />
            Escalate
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
