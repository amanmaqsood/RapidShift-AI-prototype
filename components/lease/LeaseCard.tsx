"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreVertical, GripVertical, Sparkles, CalendarDays } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatCurrency } from "@/lib/utils";
import { useAppState } from "@/context/AppStateProvider";
import type { Lease, LeaseStage } from "@/types";

const stageOptions: { value: LeaseStage; label: string }[] = [
  { value: "t-60", label: "T-60 Outreach" },
  { value: "t-45", label: "T-45 Nurturing" },
  { value: "t-30", label: "T-30 Final" },
  { value: "completed", label: "Completed" },
];

function probabilityVariant(
  p: number,
): Parameters<typeof Badge>[0]["variant"] {
  if (p >= 70) return "success";
  if (p >= 40) return "warn";
  return "error";
}

export function LeaseCard({
  lease,
  onOpen,
}: {
  lease: Lease;
  onOpen: (lease: Lease) => void;
}) {
  const { tenants, moveLease } = useAppState();
  const tenant = tenants.find((t) => t.id === lease.tenantId)!;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: lease.id, data: { type: "lease", lease } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onOpen(lease)}
      className={cn(
        "group card cursor-pointer p-4 transition-shadow hover:shadow-lift",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Badge variant={probabilityVariant(lease.probability)}>
          {lease.probability}% likely
        </Badge>
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
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <button className="rounded-md p-1 text-on-surface-variant transition-colors hover:bg-surface-container-high">
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Move to…</DropdownMenuLabel>
              {stageOptions.map((s) => (
                <DropdownMenuItem
                  key={s.value}
                  disabled={s.value === lease.stage}
                  onSelect={() => moveLease(lease.id, s.value)}
                >
                  {s.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Avatar name={tenant.name} color={tenant.avatarColor} size={30} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-headline text-sm font-semibold text-on-surface">
            {tenant.name}
          </p>
          <p className="truncate text-[10px] text-on-surface-variant">
            {tenant.building} · Unit {tenant.unit}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-on-surface-variant">
        <CalendarDays className="h-3 w-3" />
        <span>Ends {new Date(lease.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        <span className="ml-auto font-semibold text-on-surface">
          {formatCurrency(lease.currentRent)} → {formatCurrency(lease.proposedRent)}
        </span>
      </div>

      {lease.stage !== "completed" && (
        <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-tertiary-container/30 p-2">
          <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-tertiary" />
          <p className="line-clamp-2 text-[10px] leading-snug text-on-tertiary-container">
            {lease.aiSummary}
          </p>
        </div>
      )}
    </div>
  );
}
