export type Language = "en" | "es" | "ht";

export type RentStatusKind = "paid" | "unpaid" | "late" | "needs_human";

export interface Tenant {
  id: string;
  name: string;
  unit: string;
  building: string;
  language: Language;
  avatarColor: string;
}

export type MessageAuthor = "tenant" | "ai" | "human";

export interface Message {
  id: string;
  tenantId: string;
  author: MessageAuthor;
  body: string;
  ts: string;
  via?: "whatsapp" | "sms";
  attachmentLabel?: string;
}

export interface RentRecord {
  tenantId: string;
  amount: number;
  dueDate: string;
  status: RentStatusKind;
  daysLate?: number;
}

export type TicketColumn = "new" | "ai_handling" | "escalated" | "resolved";
export type TicketSeverity = "low" | "med" | "high";

export interface Ticket {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  severity: TicketSeverity;
  column: TicketColumn;
  createdAt: string;
  aiSuggestion: string;
  thread: Message[];
}

export type LeaseStage = "t-60" | "t-45" | "t-30" | "completed";

export interface Lease {
  id: string;
  tenantId: string;
  endDate: string;
  stage: LeaseStage;
  aiSummary: string;
  probability: number;
  currentRent: number;
  proposedRent: number;
}

export type AIActionKind = "rent" | "maintenance" | "lease";
export type AIActionStatus = "pending" | "approved" | "reviewing" | "escalated";

export interface AIAction {
  id: string;
  kind: AIActionKind;
  title: string;
  summary: string;
  tenantName: string;
  savedMinutes: number;
  status: AIActionStatus;
}
