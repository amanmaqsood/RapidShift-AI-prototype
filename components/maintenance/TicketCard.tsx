"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreVertical, GripVertical, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, relativeTime } from "@/lib/utils";
import { useAppState } from "@/context/AppStateProvider";
import type { Ticket, TicketColumn } from "@/types";

const severityStyles: Record<
  "low" | "med" | "high",
  { variant: Parameters<typeof Badge>[0]["variant"]; label: string }
> = {
  low: { variant: "neutral", label: "Low" },
  med: { variant: "warn", label: "Medium" },
  high: { variant: "error", label: "Urgent" },
};

const columnOptions: { value: TicketColumn; label: string }[] = [
  { value: "new", label: "New Requests" },
  { value: "ai_handling", label: "AI Handling" },
  { value: "escalated", label: "Escalated" },
  { value: "resolved", label: "Resolved" },
];

export function TicketCard({
  ticket,
  onOpen,
}: {
  ticket: Ticket;
  onOpen: (ticket: Ticket) => void;
}) {
  const { tenants, moveTicket } = useAppState();
  const tenant = tenants.find((t) => t.id === ticket.tenantId)!;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: ticket.id, data: { type: "ticket", ticket } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const sev = severityStyles[ticket.severity];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group card cursor-pointer p-4 transition-shadow hover:shadow-lift",
      )}
      onClick={() => onOpen(ticket)}
    >
      <div className="flex items-start justify-between gap-2">
        <Badge variant={sev.variant}>{sev.label}</Badge>
        <div className="flex items-center gap-1">
          <button
            className="cursor-grab rounded-md p-1 text-on-surface-variant opacity-0 transition-opacity hover:bg-surface-container-high group-hover:opacity-100"
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-3.5 w-3.5" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              onClick={(e) => e.stopPropagation()}
            >
              <button className="rounded-md p-1 text-on-surface-variant transition-colors hover:bg-surface-container-high">
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Move to…</DropdownMenuLabel>
              {columnOptions.map((c) => (
                <DropdownMenuItem
                  key={c.value}
                  disabled={c.value === ticket.column}
                  onSelect={() => moveTicket(ticket.id, c.value)}
                >
                  {c.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <h4 className="mt-3 font-headline text-sm font-semibold leading-snug text-on-surface">
        {ticket.title}
      </h4>

      <div className="mt-3 flex items-center gap-2">
        <Avatar name={tenant.name} color={tenant.avatarColor} size={24} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium text-on-surface">
            {tenant.name}
          </p>
          <p className="truncate text-[10px] text-on-surface-variant">
            {tenant.building} · Unit {tenant.unit}
          </p>
        </div>
        <span className="text-[10px] text-on-surface-variant">
          {relativeTime(ticket.createdAt)}
        </span>
      </div>

      {(ticket.column === "ai_handling" || ticket.column === "new") && (
        <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-tertiary-container/30 p-2">
          <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-tertiary" />
          <p className="line-clamp-2 text-[10px] leading-snug text-on-tertiary-container">
            {ticket.aiSuggestion}
          </p>
        </div>
      )}
    </div>
  );
}
