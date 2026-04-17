"use client";

import { useState } from "react";
import { Bell, Link2, TriangleAlert, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/context/AppStateProvider";
import type { Tenant } from "@/types";

const reminderByLang = {
  en: (name: string) =>
    `Hi ${name.split(" ")[0]}, just a friendly reminder that this month's rent is past due. Would you like me to share a secure payment link?`,
  es: (name: string) =>
    `Hola ${name.split(" ")[0]}, te recordamos que el alquiler de este mes está pendiente. ¿Quieres que te envíe un enlace de pago seguro?`,
  ht: (name: string) =>
    `Bonjou ${name.split(" ")[0]}, lwaye mwa sa a poko peye. Èske w ta vle yon lyen pou peye an sekirite?`,
};

const payLinkByLang = {
  en: "Here's your secure payment link — valid 24 hours.",
  es: "Aquí está tu enlace de pago seguro — válido 24 horas.",
  ht: "Men lyen peman an sekirite — valab pou 24 èdtan.",
};

export function ChatActionBar({ tenant }: { tenant: Tenant }) {
  const { appendMessage, setRentStatus, rent } = useAppState();
  const [draft, setDraft] = useState("");
  const record = rent.find((r) => r.tenantId === tenant.id);

  const sendReminder = () => {
    appendMessage({
      tenantId: tenant.id,
      author: "ai",
      body: reminderByLang[tenant.language](tenant.name),
      via: "whatsapp",
    });
  };

  const sharePaymentLink = () => {
    appendMessage({
      tenantId: tenant.id,
      author: "ai",
      body: payLinkByLang[tenant.language],
      via: "whatsapp",
      attachmentLabel: `pay.rapidshift.ai/${tenant.id}-${Math.random().toString(36).slice(2, 6)}`,
    });
  };

  const escalate = () => {
    setRentStatus(tenant.id, "needs_human");
    appendMessage({
      tenantId: tenant.id,
      author: "human",
      body: `${tenant.name.split(" ")[0]} — this is Natalia from Deals with Dignity. I'll reach out personally to help resolve this.`,
      via: "whatsapp",
    });
  };

  const sendCustom = () => {
    if (!draft.trim()) return;
    appendMessage({
      tenantId: tenant.id,
      author: "human",
      body: draft.trim(),
      via: "whatsapp",
    });
    setDraft("");
  };

  const isEscalated = record?.status === "needs_human";

  return (
    <div className="border-0 bg-surface-container-low px-6 py-4">
      {isEscalated && (
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-error-container/40 px-3 py-2 text-[12px] font-medium text-on-error-container">
          <TriangleAlert className="h-3.5 w-3.5" />
          Escalated to human oversight — AI actions paused for this tenant.
        </div>
      )}
      <div className="mb-3 flex flex-wrap gap-2">
        <Button size="sm" variant="ai" onClick={sendReminder}>
          <Bell className="h-3.5 w-3.5" />
          Send Reminder
        </Button>
        <Button size="sm" variant="secondary" onClick={sharePaymentLink}>
          <Link2 className="h-3.5 w-3.5" />
          Share Payment Link
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={escalate}
          disabled={isEscalated}
          className="text-error hover:bg-error-container/20"
        >
          <TriangleAlert className="h-3.5 w-3.5" />
          Escalate to Human
        </Button>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-surface-container-lowest px-4 py-1.5 ambient-shadow">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendCustom()}
          placeholder="Type a message (sent as Natalia)…"
          className="flex-1 bg-transparent py-2 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
        />
        <Button size="icon" onClick={sendCustom} disabled={!draft.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
