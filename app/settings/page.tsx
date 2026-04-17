"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MessageSquare, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-tertiary">
          Settings
        </p>
        <h1 className="mt-2 font-headline text-3xl font-bold text-on-surface">
          Workspace & oversight preferences
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <Avatar name="Natalia Rivera" color="#4a50c8" size={56} />
            <div>
              <h2 className="font-headline text-lg font-semibold text-on-surface">
                Natalia Rivera
              </h2>
              <p className="text-xs text-on-surface-variant">
                Property Manager · Deals with Dignity
              </p>
              <Badge variant="ai" className="mt-2">
                Sole oversight · AI first
              </Badge>
            </div>
          </div>
          <Button className="mt-5 w-full" variant="secondary">
            Edit profile
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="font-headline text-sm font-semibold text-on-surface">
                Portfolio
              </h3>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-on-surface-variant">Buildings</dt>
                <dd className="mt-0.5 font-semibold text-on-surface">
                  Brickell 204 · Wynwood 118 · Little Haiti 06 · Coral Way 72
                </dd>
              </div>
              <div>
                <dt className="text-on-surface-variant">Integration</dt>
                <dd className="mt-0.5 font-semibold text-on-surface">
                  Buildium (synced)
                </dd>
              </div>
            </dl>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <h3 className="font-headline text-sm font-semibold text-on-surface">
                Default languages
              </h3>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              RapidShift auto-detects tenant language; these are templates
              approved by Meta.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="primary">English · approved</Badge>
              <Badge variant="primary">Spanish · approved</Badge>
              <Badge variant="primary">Haitian Creole · approved</Badge>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="font-headline text-sm font-semibold text-on-surface">
                Oversight rules
              </h3>
            </div>
            <ul className="mt-3 space-y-2 text-xs text-on-surface-variant">
              <li>• Escalate automatically after 11 days of no response</li>
              <li>• Any maintenance issue flagged &ldquo;safety&rdquo; goes to human review</li>
              <li>• Rent proposals above +3% require manual approval</li>
            </ul>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <h3 className="font-headline text-sm font-semibold text-on-surface">
                Notifications
              </h3>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Desk-side pings for high-severity maintenance and rent escalations.
              Everything else flows to the AI Action Center.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
