"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";
import { TicketDetailSheet } from "./TicketDetailSheet";
import { useAppState } from "@/context/AppStateProvider";
import type { Ticket, TicketColumn as Col } from "@/types";
import { TicketCard } from "./TicketCard";

const columns: Col[] = ["new", "ai_handling", "escalated", "resolved"];

export function KanbanBoard() {
  const { tickets, moveTicket } = useAppState();
  const [active, setActive] = useState<Ticket | null>(null);
  const [open, setOpen] = useState<Ticket | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const byColumn = (col: Col) => tickets.filter((t) => t.column === col);

  const handleStart = (e: DragStartEvent) => {
    const t = tickets.find((x) => x.id === e.active.id);
    if (t) setActive(t);
  };

  const handleEnd = (e: DragEndEvent) => {
    setActive(null);
    const { active: a, over } = e;
    if (!over) return;

    // Determine destination column — either the over is a column id or a ticket id
    const overId = over.id as string;
    const destCol = (columns as string[]).includes(overId)
      ? (overId as Col)
      : (tickets.find((t) => t.id === overId)?.column ?? null);

    const ticket = tickets.find((t) => t.id === a.id);
    if (!ticket || !destCol || ticket.column === destCol) return;
    moveTicket(ticket.id, destCol);
  };

  return (
    <>
      <DndContext sensors={sensors} onDragStart={handleStart} onDragEnd={handleEnd}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((col) => (
            <KanbanColumn
              key={col}
              id={col}
              tickets={byColumn(col)}
              onOpen={(t) => setOpen(t)}
            />
          ))}
        </div>
        <DragOverlay>
          {active && <TicketCard ticket={active} onOpen={() => {}} />}
        </DragOverlay>
      </DndContext>
      <TicketDetailSheet
        ticket={open}
        onOpenChange={(o) => !o && setOpen(null)}
      />
    </>
  );
}
