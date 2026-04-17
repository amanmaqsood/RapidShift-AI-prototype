"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { TicketCard } from "./TicketCard";
import type { Ticket, TicketColumn as Col } from "@/types";

const columnStyles: Record<Col, { accent: string; label: string }> = {
  new: { accent: "bg-on-surface-variant", label: "New Requests" },
  ai_handling: { accent: "ai-pulse-bg", label: "AI Handling" },
  escalated: { accent: "bg-error", label: "Escalated" },
  resolved: { accent: "bg-primary", label: "Resolved" },
};

export function KanbanColumn({
  id,
  tickets,
  onOpen,
}: {
  id: Col;
  tickets: Ticket[];
  onOpen: (ticket: Ticket) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id, data: { type: "column", column: id } });
  const meta = columnStyles[id];

  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className={cn("h-2 w-2 rounded-full", meta.accent)} />
        <h3 className="font-headline text-sm font-semibold tracking-tight text-on-surface">
          {meta.label}
        </h3>
        <span className="ml-auto rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] font-semibold text-on-surface-variant">
          {tickets.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[400px] flex-1 flex-col gap-3 rounded-xxl p-3 transition-colors",
          isOver
            ? "bg-tertiary-container/30 outline-2 outline-dashed outline-tertiary/40"
            : "bg-surface-container-low/50",
        )}
      >
        <SortableContext
          id={id}
          items={tickets.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} onOpen={onOpen} />
          ))}
        </SortableContext>
        {tickets.length === 0 && (
          <div className="flex flex-1 items-center justify-center text-center text-[11px] text-on-surface-variant/60">
            Drop tickets here
          </div>
        )}
      </div>
    </div>
  );
}
