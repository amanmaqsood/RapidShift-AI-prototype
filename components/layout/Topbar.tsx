"use client";

import {
  Bell,
  Search,
  RotateCcw,
  HelpCircle,
  Sparkles,
  Wrench,
  FileText,
  Wallet,
  BookOpen,
  MessageCircle,
  Keyboard,
  LifeBuoy,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useAppState } from "@/context/AppStateProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
  {
    id: "n1",
    icon: Wallet,
    iconClass: "text-error",
    title: "Maria Gonzalez — rent 5 days late",
    body: "AI extended payment window to Saturday. No action needed yet.",
    time: "12m ago",
    unread: true,
  },
  {
    id: "n2",
    icon: Wrench,
    iconClass: "text-error",
    title: "Escalated: AC not cooling — Unit 3B",
    body: "Severity high. AI dispatched vendor request, awaiting confirmation.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "n3",
    icon: FileText,
    iconClass: "text-tertiary",
    title: "Sofia Hernandez lease renewed",
    body: "Auto-completed at T-30. Proposed +2.5% accepted.",
    time: "3h ago",
    unread: false,
  },
  {
    id: "n4",
    icon: Sparkles,
    iconClass: "text-primary",
    title: "6 AI actions awaiting your review",
    body: "Open the Action Center on the dashboard to approve or escalate.",
    time: "today",
    unread: false,
  },
];

export function Topbar() {
  const { reset } = useAppState();
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-0 bg-background/70 px-8 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="search"
            placeholder="Search tenants, units, tickets…"
            className="w-full rounded-full bg-surface-container-high/70 py-2 pl-9 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-primary-container/60 px-3 py-1.5 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ai-pulse rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-on-primary-container">
            AI Active
          </span>
        </div>

        <button
          onClick={reset}
          title="Reset demo data"
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              title="Help & resources"
              className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Help & resources</DropdownMenuLabel>
            <DropdownMenuItem>
              <BookOpen className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Demo walkthrough</p>
                <p className="text-[11px] text-on-surface-variant">
                  How to present RapidShift to a client
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Sparkles className="h-4 w-4 text-tertiary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">What the AI does</p>
                <p className="text-[11px] text-on-surface-variant">
                  Automations, oversight rules, escalation logic
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Keyboard className="h-4 w-4 text-on-surface-variant" />
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Keyboard shortcuts</p>
                <p className="text-[11px] text-on-surface-variant">
                  Speed up the demo with hotkeys
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <MessageCircle className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Contact support</p>
                <p className="text-[11px] text-on-surface-variant">
                  hello@rapidshift.ai · replies within 4h
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="h-4 w-4 text-on-surface-variant" />
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Status & uptime</p>
                <p className="text-[11px] text-on-surface-variant">
                  All systems operational
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              title="Notifications"
              className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[22rem] p-0">
            <div className="flex items-center justify-between px-4 pb-2 pt-3">
              <div>
                <p className="font-headline text-sm font-semibold text-on-surface">
                  Notifications
                </p>
                <p className="text-[11px] text-on-surface-variant">
                  {unreadCount} unread · AI handled 47 today
                </p>
              </div>
              <button className="text-[11px] font-semibold uppercase tracking-wider text-tertiary hover:underline">
                Mark all read
              </button>
            </div>
            <div className="max-h-[22rem] overflow-y-auto border-t border-surface-container-high">
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    className={`flex gap-3 px-4 py-3 transition-colors hover:bg-surface-container-low ${
                      n.unread ? "bg-primary-container/15" : ""
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-low">
                      <Icon className={`h-3.5 w-3.5 ${n.iconClass}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-on-surface">
                        {n.title}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-on-surface-variant">
                        {n.body}
                      </p>
                      <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-on-surface-variant/70">
                        {n.time}
                      </p>
                    </div>
                    {n.unread && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-tertiary" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-surface-container-high px-4 py-2 text-center">
              <button className="text-[11px] font-semibold uppercase tracking-wider text-tertiary hover:underline">
                Open AI Action Center
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="ml-2 flex items-center gap-2">
          <Avatar name="Natalia Rivera" color="#4a50c8" size={34} />
          <div className="hidden leading-tight md:block">
            <p className="text-xs font-semibold text-on-surface">Natalia Rivera</p>
            <p className="text-[10px] text-on-surface-variant">
              Property Manager
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
