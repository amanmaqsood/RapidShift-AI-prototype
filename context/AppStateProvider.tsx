"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  aiActions as seedActions,
  leases as seedLeases,
  messages as seedMessages,
  rentRecords as seedRent,
  tenants as seedTenants,
  tickets as seedTickets,
} from "@/lib/mock-data";
import type {
  AIAction,
  AIActionStatus,
  Lease,
  LeaseStage,
  Message,
  RentRecord,
  RentStatusKind,
  Tenant,
  Ticket,
  TicketColumn,
} from "@/types";

interface State {
  tenants: Tenant[];
  rent: RentRecord[];
  messages: Message[];
  tickets: Ticket[];
  leases: Lease[];
  aiActions: AIAction[];
}

type Action =
  | { type: "reset" }
  | { type: "appendMessage"; message: Message }
  | { type: "setRentStatus"; tenantId: string; status: RentStatusKind }
  | { type: "moveTicket"; ticketId: string; to: TicketColumn }
  | { type: "moveLease"; leaseId: string; to: LeaseStage }
  | { type: "setAIActionStatus"; id: string; status: AIActionStatus };

const initial: State = {
  tenants: seedTenants,
  rent: seedRent,
  messages: seedMessages,
  tickets: seedTickets,
  leases: seedLeases,
  aiActions: seedActions,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "reset":
      return {
        tenants: seedTenants,
        rent: seedRent,
        messages: seedMessages,
        tickets: seedTickets,
        leases: seedLeases,
        aiActions: seedActions,
      };
    case "appendMessage":
      return { ...state, messages: [...state.messages, action.message] };
    case "setRentStatus":
      return {
        ...state,
        rent: state.rent.map((r) =>
          r.tenantId === action.tenantId ? { ...r, status: action.status } : r,
        ),
      };
    case "moveTicket":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.ticketId ? { ...t, column: action.to } : t,
        ),
      };
    case "moveLease":
      return {
        ...state,
        leases: state.leases.map((l) =>
          l.id === action.leaseId ? { ...l, stage: action.to } : l,
        ),
      };
    case "setAIActionStatus":
      return {
        ...state,
        aiActions: state.aiActions.map((a) =>
          a.id === action.id ? { ...a, status: action.status } : a,
        ),
      };
    default:
      return state;
  }
}

interface Ctx extends State {
  reset: () => void;
  appendMessage: (m: Omit<Message, "id" | "ts"> & { id?: string; ts?: string }) => void;
  setRentStatus: (tenantId: string, status: RentStatusKind) => void;
  moveTicket: (ticketId: string, to: TicketColumn) => void;
  moveLease: (leaseId: string, to: LeaseStage) => void;
  setAIActionStatus: (id: string, status: AIActionStatus) => void;
}

const AppStateContext = createContext<Ctx | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const appendMessage: Ctx["appendMessage"] = useCallback((m) => {
    dispatch({
      type: "appendMessage",
      message: {
        id: m.id ?? `m-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        ts: m.ts ?? new Date().toISOString(),
        tenantId: m.tenantId,
        author: m.author,
        body: m.body,
        via: m.via,
        attachmentLabel: m.attachmentLabel,
      },
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      reset: () => dispatch({ type: "reset" }),
      appendMessage,
      setRentStatus: (tenantId, status) =>
        dispatch({ type: "setRentStatus", tenantId, status }),
      moveTicket: (ticketId, to) =>
        dispatch({ type: "moveTicket", ticketId, to }),
      moveLease: (leaseId, to) => dispatch({ type: "moveLease", leaseId, to }),
      setAIActionStatus: (id, status) =>
        dispatch({ type: "setAIActionStatus", id, status }),
    }),
    [state, appendMessage],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
