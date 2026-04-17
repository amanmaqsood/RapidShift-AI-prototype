"use client";

import { useEffect, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageBubble } from "./MessageBubble";
import { ChatActionBar } from "./ChatActionBar";
import { useAppState } from "@/context/AppStateProvider";
import { Phone, Video, MoreHorizontal, Sparkles } from "lucide-react";

export function ChatPanel({ tenantId }: { tenantId: string | null }) {
  const { tenants, messages, rent } = useAppState();
  const scrollRef = useRef<HTMLDivElement>(null);

  const tenant = tenants.find((t) => t.id === tenantId);
  const thread = messages
    .filter((m) => m.tenantId === tenantId)
    .sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
  const record = rent.find((r) => r.tenantId === tenantId);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [thread.length, tenantId]);

  if (!tenant) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center px-8">
        <div className="ai-pulse-bg mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-headline text-lg font-semibold text-on-surface">
          Select a tenant to view the AI conversation
        </h3>
        <p className="mt-1 max-w-xs text-sm text-on-surface-variant">
          RapidShift is handling 78% of incoming rent inquiries automatically.
        </p>
      </div>
    );
  }

  const aiHandled = thread[thread.length - 1]?.author === "ai";

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-6 py-4">
        <Avatar name={tenant.name} color={tenant.avatarColor} size={42} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-headline text-base font-semibold text-on-surface">
              {tenant.name}
            </h3>
            {aiHandled && record?.status !== "needs_human" && (
              <Badge variant="ai">Handled by AI</Badge>
            )}
            {record?.status === "needs_human" && (
              <Badge variant="error">Needs Human</Badge>
            )}
          </div>
          <p className="text-[11px] text-on-surface-variant">
            {tenant.building} · Unit {tenant.unit} · WhatsApp
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high">
            <Phone className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high">
            <Video className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-subtle flex-1 space-y-4 overflow-y-auto bg-surface-container-low/40 px-6 py-4"
      >
        {thread.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-on-surface-variant">
            <p className="text-sm">No conversation yet.</p>
            <p className="text-xs mt-1">
              Tap &ldquo;Send Reminder&rdquo; to let the AI open the conversation.
            </p>
          </div>
        ) : (
          thread.map((m) => <MessageBubble key={m.id} message={m} />)
        )}
      </div>

      <ChatActionBar tenant={tenant} />
    </div>
  );
}
