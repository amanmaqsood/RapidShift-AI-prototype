"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { useAppState } from "@/context/AppStateProvider";
import type { Lease, LeaseStage } from "@/types";
import { LeaseCard } from "./LeaseCard";
import { LeaseDetailSheet } from "./LeaseDetailSheet";

const stages: { id: LeaseStage; label: string; sub: string; accent: string }[] = [
  { id: "t-60", label: "T-60 · Outreach", sub: "Opening conversation", accent: "bg-tertiary" },
  { id: "t-45", label: "T-45 · Nurturing", sub: "Offer on the table", accent: "bg-primary" },
  { id: "t-30", label: "T-30 · Final", sub: "Urgent close", accent: "bg-[#d97706]" },
  { id: "completed", label: "Completed", sub: "Signed & renewed", accent: "bg-primary-dim" },
];

function PipelineColumn({
  stage,
  leases,
  onOpen,
}: {
  stage: (typeof stages)[number];
  leases: Lease[];
  onOpen: (l: Lease) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: { type: "stage", stage: stage.id },
  });

  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className={cn("h-2 w-2 rounded-full", stage.accent)} />
        <div>
          <h3 className="font-headline text-sm font-semibold tracking-tight text-on-surface">
            {stage.label}
          </h3>
          <p className="text-[10px] text-on-surface-variant">{stage.sub}</p>
        </div>
        <span className="ml-auto rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] font-semibold text-on-surface-variant">
          {leases.length}
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
          id={stage.id}
          items={leases.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {leases.map((l) => (
            <LeaseCard key={l.id} lease={l} onOpen={onOpen} />
          ))}
        </SortableContext>
        {leases.length === 0 && (
          <div className="flex flex-1 items-center justify-center text-center text-[11px] text-on-surface-variant/60">
            Empty stage
          </div>
        )}
      </div>
    </div>
  );
}

export function PipelineView() {
  const { leases, moveLease } = useAppState();
  const [active, setActive] = useState<Lease | null>(null);
  const [open, setOpen] = useState<Lease | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const byStage = (s: LeaseStage) => leases.filter((l) => l.stage === s);

  const handleStart = (e: DragStartEvent) => {
    const l = leases.find((x) => x.id === e.active.id);
    if (l) setActive(l);
  };

  const handleEnd = (e: DragEndEvent) => {
    setActive(null);
    const { active: a, over } = e;
    if (!over) return;
    const overId = over.id as string;
    const stageIds = stages.map((s) => s.id);
    const destStage = (stageIds as string[]).includes(overId)
      ? (overId as LeaseStage)
      : (leases.find((l) => l.id === overId)?.stage ?? null);
    const lease = leases.find((l) => l.id === a.id);
    if (!lease || !destStage || lease.stage === destStage) return;
    moveLease(lease.id, destStage);
  };

  return (
    <>
      <DndContext sensors={sensors} onDragStart={handleStart} onDragEnd={handleEnd}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((s) => (
            <PipelineColumn
              key={s.id}
              stage={s}
              leases={byStage(s.id)}
              onOpen={(l) => setOpen(l)}
            />
          ))}
        </div>
        <DragOverlay>
          {active && <LeaseCard lease={active} onOpen={() => {}} />}
        </DragOverlay>
      </DndContext>
      <LeaseDetailSheet
        lease={open}
        onOpenChange={(o) => !o && setOpen(null)}
      />
    </>
  );
}
