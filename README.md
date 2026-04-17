# RapidShift AI — Demo Prototype

An interactive frontend prototype of an AI-first property management dashboard, built for the **Deals with Dignity** (Miami) pitch. Next.js 15 App Router · TypeScript · Tailwind · `@dnd-kit` · pure client state (no backend).

## Quick start

```bash
cd app
npm install
npm run dev
```

Open `http://localhost:3000` — it redirects to `/dashboard`.

Production build:

```bash
npm run build
npm run start
```

## Routes

| Route | Purpose |
|---|---|
| `/dashboard` | Hero ("Your AI is handling 78% of tenant communication"), KPIs, **AI Action Center** with Approve/Review/Escalate, triage & pipeline widgets |
| `/rent` | Tenant list + WhatsApp-style chat. **Send Reminder / Share Payment Link / Escalate** all append real messages to the thread |
| `/maintenance` | 4-column Kanban (New / AI Handling / Escalated / Resolved). Drag cards between columns or use the "Move to…" menu. Click a card → detail sheet with AI suggestion |
| `/lease` | 4-stage pipeline (T-60 / T-45 / T-30 / Completed). Same drag-drop + detail sheet pattern, with renewal likelihood scoring |
| `/tenants` | Searchable tenants table across 3 buildings, with language + rent status |
| `/insights` | AI automation rate, hours saved, actions-by-category breakdown |
| `/automations` | Toggleable list of 6 active automations (rent reminder, auto-triage, T-60 outreach, etc.) |
| `/settings` | Workspace profile, portfolio, language defaults, oversight rules |

## What's interactive (demo walkthrough)

1. **Dashboard** — In the AI Action Center, click **Approve** → row strikes through. Click **Escalate** → red badge. All three buttons persist state across navigation.
2. **Rent Collection** — Select Maria Gonzalez (Spanish). Click **Send Reminder** → AI bubble appends in Spanish. Click **Share Payment Link** → message with mock `pay.rapidshift.ai/…` link pill. Click **Escalate to Human** → red banner, "Needs Human" badge.
3. **Maintenance** — Drag the urgent AC ticket from Escalated → Resolved. Open any card → detail sheet shows the full WhatsApp thread and the AI-suggested fix. Approve / Escalate from inside the sheet.
4. **Lease Renewal** — Drag Sofia's lease from T-45 → Completed. Open any lease → AI summary explains the renewal likelihood and shows current → proposed rent with uplift %.
5. **Reset** — The circular arrow button in the topbar restores all mock data to its seeded state. Use this between demo runs.

## Stack

- **Next.js 15.0.3** (App Router, static export — every page is `○ Static`)
- **React 18**, **TypeScript 5.6**
- **Tailwind 3.4** — full design-system port from `ui/ethereal_flow/DESIGN.md` ("Ethereal Professional" tokens: sage primary `#47664a`, AI tertiary `#4a50c8`, surface hierarchy instead of borders)
- **@dnd-kit** for Kanban + Pipeline drag-drop
- **Radix UI** primitives (Dialog, Dropdown Menu, Slot) styled to match
- **lucide-react** icons
- **next/font** for Manrope (headlines) + Inter (body)

No database, no API routes, no auth — all state lives in a single `useReducer` context (`context/AppStateProvider.tsx`). Pure frontend, perfect for demo.

## Project layout

```
app/
├── app/               # Next.js routes (/dashboard, /rent, /maintenance, /lease, …)
├── components/
│   ├── layout/        # Sidebar, Topbar, DashboardLayout
│   ├── dashboard/     # HeroBanner, KPICard, AIActionCenter, widgets
│   ├── rent/          # TenantList, ChatPanel, MessageBubble, ChatActionBar
│   ├── maintenance/   # KanbanBoard, KanbanColumn, TicketCard, TicketDetailSheet
│   ├── lease/         # PipelineView, LeaseCard, LeaseDetailSheet
│   └── ui/            # button, badge, avatar, sheet, dropdown-menu
├── context/           # AppStateProvider (in-memory tenants/messages/tickets/leases)
├── lib/               # utils, mock-data seed
├── types/             # Tenant, Message, Ticket, Lease, AIAction
└── tailwind.config.ts # full color-token port
```

## Deploying to Vercel

This app has **no server dependencies** and **no environment variables** — it's the easiest possible deploy.

### Option A — push to GitHub, connect on Vercel (recommended)

On vercel.com → **New Project** → import this repo → framework detected as Next.js → **Deploy**. Done.

### Option B — Vercel CLI

```bash
cd app
npx vercel
npx vercel --prod
```

## Out of scope (intentionally)

This is a **demo prototype**, not the production system. Deferred to later phases per the architecture doc:

- Real backend (PostgreSQL, Redis, PM2, Nginx)
- WhatsApp / Meta Graph API + templates
- Buildium integration + tenant sync
- Real AI (Claude / OpenAI) — all "AI" responses are canned strings
- Auth / login
- Mobile (<768px)
- Dark mode

## Design reference

Visual source of truth lives at `../ui/` (static HTML mockups + `ethereal_flow/DESIGN.md`). If you need to extend a page, reference the matching mockup folder:

| Page | Mockup |
|---|---|
| `/dashboard` | `../ui/tenantflow_ai_dashboard/code.html` |
| `/rent` | `../ui/rent_collection_ai_auto_followup/code.html` |
| `/maintenance` | `../ui/maintenance_ai_dispatch_triage/code.html` |
| `/lease` | `../ui/lease_renewals_predictive_pipeline/code.html` |
