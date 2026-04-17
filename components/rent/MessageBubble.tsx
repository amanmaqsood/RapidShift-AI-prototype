import { Link2, Sparkles, UserRound } from "lucide-react";
import { cn, relativeTime } from "@/lib/utils";
import type { Message } from "@/types";

export function MessageBubble({ message }: { message: Message }) {
  const { author, body, ts, attachmentLabel } = message;
  const isAI = author === "ai";
  const isTenant = author === "tenant";
  const isHuman = author === "human";

  return (
    <div
      className={cn(
        "flex gap-2",
        isTenant ? "justify-start" : "justify-end",
      )}
    >
      {isTenant && (
        <div className="mt-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
          <UserRound className="h-3.5 w-3.5" />
        </div>
      )}
      <div className="flex max-w-[78%] flex-col">
        {isAI && (
          <div className="mb-1 flex items-center gap-1 pl-1 text-[10px] font-semibold uppercase tracking-widest text-tertiary">
            <Sparkles className="h-3 w-3" />
            RapidShift AI
          </div>
        )}
        {isHuman && (
          <div className="mb-1 pl-1 text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
            Natalia (Property Manager)
          </div>
        )}
        <div
          className={cn(
            "rounded-xxl px-4 py-2.5 text-[13px] leading-relaxed ambient-shadow",
            isTenant &&
              "bg-surface-container-lowest text-on-surface rounded-bl-md",
            isAI &&
              "bg-gradient-to-br from-tertiary-container/60 to-tertiary-container text-on-tertiary-container rounded-br-md",
            isHuman && "bg-primary text-on-primary rounded-br-md",
          )}
        >
          <p className="whitespace-pre-wrap">{body}</p>
          {attachmentLabel && (
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={cn(
                "mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium",
                isAI
                  ? "bg-white/70 text-tertiary-dim hover:bg-white"
                  : "bg-on-surface/10 text-on-surface",
              )}
            >
              <Link2 className="h-3 w-3" />
              {attachmentLabel}
            </a>
          )}
        </div>
        <span
          className={cn(
            "mt-1 px-2 text-[10px] text-on-surface-variant",
            isTenant ? "text-left" : "text-right",
          )}
        >
          {relativeTime(ts)} · WhatsApp
        </span>
      </div>
    </div>
  );
}
