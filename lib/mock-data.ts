import type {
  AIAction,
  Lease,
  Message,
  RentRecord,
  Tenant,
  Ticket,
} from "@/types";

const now = Date.now();
const iso = (minsAgo: number) => new Date(now - minsAgo * 60_000).toISOString();
const dayAhead = (days: number) =>
  new Date(now + days * 86_400_000).toISOString().slice(0, 10);

export const tenants: Tenant[] = [
  { id: "t1", name: "Maria Gonzalez", unit: "3B", building: "Brickell 204", language: "es", avatarColor: "#47664a" },
  { id: "t2", name: "James Whitmore", unit: "7A", building: "Wynwood 118", language: "en", avatarColor: "#4a50c8" },
  { id: "t3", name: "Jean-Pierre Augustin", unit: "2C", building: "Little Haiti 06", language: "ht", avatarColor: "#ac3434" },
  { id: "t4", name: "Sofia Hernandez", unit: "5D", building: "Brickell 204", language: "es", avatarColor: "#53644d" },
  { id: "t5", name: "Derrick Thompson", unit: "1A", building: "Wynwood 118", language: "en", avatarColor: "#3d43bc" },
  { id: "t6", name: "Ana Paula Ferreira", unit: "4B", building: "Coral Way 72", language: "es", avatarColor: "#47664a" },
  { id: "t7", name: "Marcus Johnson", unit: "6C", building: "Coral Way 72", language: "en", avatarColor: "#4a50c8" },
  { id: "t8", name: "Isabelle Clerveaux", unit: "8A", building: "Little Haiti 06", language: "ht", avatarColor: "#53644d" },
  { id: "t9", name: "Carlos Medina", unit: "2A", building: "Brickell 204", language: "es", avatarColor: "#ac3434" },
  { id: "t10", name: "Linda Park", unit: "9B", building: "Wynwood 118", language: "en", avatarColor: "#47664a" },
  { id: "t11", name: "Pierre Louis", unit: "3C", building: "Little Haiti 06", language: "ht", avatarColor: "#3d43bc" },
  { id: "t12", name: "Elena Rossi", unit: "5A", building: "Coral Way 72", language: "en", avatarColor: "#4a50c8" },
];

export const rentRecords: RentRecord[] = [
  { tenantId: "t1", amount: 1850, dueDate: dayAhead(-5), status: "late", daysLate: 5 },
  { tenantId: "t2", amount: 2200, dueDate: dayAhead(-2), status: "unpaid" },
  { tenantId: "t3", amount: 1650, dueDate: dayAhead(-1), status: "unpaid" },
  { tenantId: "t4", amount: 1950, dueDate: dayAhead(-10), status: "paid" },
  { tenantId: "t5", amount: 2100, dueDate: dayAhead(-8), status: "paid" },
  { tenantId: "t6", amount: 1800, dueDate: dayAhead(-11), status: "needs_human" },
  { tenantId: "t7", amount: 2050, dueDate: dayAhead(-7), status: "paid" },
  { tenantId: "t8", amount: 1700, dueDate: dayAhead(-3), status: "late", daysLate: 3 },
  { tenantId: "t9", amount: 1900, dueDate: dayAhead(-9), status: "paid" },
  { tenantId: "t10", amount: 2300, dueDate: dayAhead(-6), status: "paid" },
  { tenantId: "t11", amount: 1600, dueDate: dayAhead(-4), status: "unpaid" },
  { tenantId: "t12", amount: 2150, dueDate: dayAhead(-12), status: "paid" },
];

export const messages: Message[] = [
  { id: "m1", tenantId: "t1", author: "ai", body: "Hola Maria, te recordamos que el alquiler de octubre aún está pendiente. ¿Podemos ayudarte con el pago?", ts: iso(60 * 26), via: "whatsapp" },
  { id: "m2", tenantId: "t1", author: "tenant", body: "Hola, mi salario llega el viernes. ¿Puedo pagar el sábado?", ts: iso(60 * 25), via: "whatsapp" },
  { id: "m3", tenantId: "t1", author: "ai", body: "Claro, Maria. He marcado una extensión hasta el sábado y te enviaré el enlace de pago por la mañana. 💚", ts: iso(60 * 24), via: "whatsapp" },

  { id: "m4", tenantId: "t2", author: "ai", body: "Hi James — quick reminder that this month's rent is 2 days past due. Here's your secure payment link.", ts: iso(60 * 8), via: "whatsapp", attachmentLabel: "pay.rapidshift.ai/j7-92k" },
  { id: "m5", tenantId: "t2", author: "tenant", body: "Thanks! Can you resend that? First link seemed to have expired.", ts: iso(60 * 2), via: "whatsapp" },

  { id: "m6", tenantId: "t3", author: "ai", body: "Bonjou Jean-Pierre! Lwaye w la poko peye. Èske w bezwen èd?", ts: iso(60 * 12), via: "whatsapp" },
  { id: "m7", tenantId: "t3", author: "tenant", body: "Mwen ap pran yon plan peman. Èske nou kapab divize an 2?", ts: iso(60 * 11), via: "whatsapp" },

  { id: "m8", tenantId: "t4", author: "ai", body: "Sofia, confirmamos que tu pago de $1,950 fue recibido. Gracias!", ts: iso(60 * 240), via: "whatsapp" },

  { id: "m9", tenantId: "t6", author: "ai", body: "Hola Ana Paula, llevamos 11 días sin respuesta. He escalado al equipo humano.", ts: iso(60 * 40), via: "whatsapp" },
  { id: "m10", tenantId: "t6", author: "human", body: "Ana Paula — this is Natalia from the office. Please give me a call when you can.", ts: iso(60 * 38), via: "whatsapp" },

  { id: "m11", tenantId: "t8", author: "ai", body: "Bonjou Isabelle, lwaye w la gen 3 jou an reta. Men yon lyen pou peye an sekirite.", ts: iso(60 * 14), via: "whatsapp", attachmentLabel: "pay.rapidshift.ai/is-44a" },

  { id: "m12", tenantId: "t11", author: "ai", body: "Bonjou Pierre! Lwaye w la poko peye. Èske w ta vle yon lyen peman?", ts: iso(60 * 5), via: "whatsapp" },
];

export const tickets: Ticket[] = [
  {
    id: "k1",
    tenantId: "t2",
    title: "Kitchen sink leaking under cabinet",
    description: "Water pooling under sink for 2 days. Tenant attached photo of P-trap.",
    severity: "med",
    column: "ai_handling",
    createdAt: iso(60 * 6),
    aiSuggestion: "Likely P-trap loosening. Dispatch plumber within 24h. Provide tenant with bucket + shut-off guidance in the interim.",
    thread: [
      { id: "kt1-1", tenantId: "t2", author: "tenant", body: "There's water under my kitchen sink, it's been leaking since yesterday.", ts: iso(60 * 6) },
      { id: "kt1-2", tenantId: "t2", author: "ai", body: "Sorry to hear that, James. Can you check if the valve under the sink turns off the water?", ts: iso(60 * 6) },
      { id: "kt1-3", tenantId: "t2", author: "tenant", body: "Yes, I turned it off. The leak stopped.", ts: iso(60 * 5) },
      { id: "kt1-4", tenantId: "t2", author: "ai", body: "Perfect. I've opened a ticket and will schedule a plumber for tomorrow morning between 9-11am. Does that work?", ts: iso(60 * 5) },
    ],
  },
  {
    id: "k2",
    tenantId: "t5",
    title: "AC not cooling, runs constantly",
    description: "Tenant reports indoor temp 82°F with AC on max.",
    severity: "high",
    column: "escalated",
    createdAt: iso(60 * 3),
    aiSuggestion: "High-priority. Miami climate + heat advisory. Escalate to senior tech today.",
    thread: [
      { id: "kt2-1", tenantId: "t5", author: "tenant", body: "My AC is running but it's 82 degrees in here. Can someone come today?", ts: iso(60 * 3) },
      { id: "kt2-2", tenantId: "t5", author: "ai", body: "Absolutely — I'm flagging this as urgent and notifying a technician now.", ts: iso(60 * 3) },
    ],
  },
  {
    id: "k3",
    tenantId: "t7",
    title: "Dishwasher won't drain",
    description: "Standing water in bottom of dishwasher.",
    severity: "low",
    column: "new",
    createdAt: iso(60 * 1),
    aiSuggestion: "Common blockage. Walk tenant through clearing the filter before dispatching.",
    thread: [
      { id: "kt3-1", tenantId: "t7", author: "tenant", body: "Dishwasher has water at the bottom and won't drain.", ts: iso(60 * 1) },
    ],
  },
  {
    id: "k4",
    tenantId: "t10",
    title: "Garbage disposal humming but not grinding",
    description: "Tenant reports humming sound when turned on.",
    severity: "low",
    column: "ai_handling",
    createdAt: iso(60 * 4),
    aiSuggestion: "Likely jammed. Walk through hex-key reset from underside before dispatch.",
    thread: [
      { id: "kt4-1", tenantId: "t10", author: "tenant", body: "Garbage disposal is humming but not actually grinding anything.", ts: iso(60 * 4) },
      { id: "kt4-2", tenantId: "t10", author: "ai", body: "That usually means it's jammed. There's a small hex-key slot on the underside — can you try the reset? I'll walk you through it.", ts: iso(60 * 4) },
    ],
  },
  {
    id: "k5",
    tenantId: "t1",
    title: "Bathroom light fixture flickering",
    description: "Intermittent flicker, 2-3 times per evening.",
    severity: "low",
    column: "resolved",
    createdAt: iso(60 * 48),
    aiSuggestion: "Resolved — bulb replaced by tenant under AI guidance.",
    thread: [
      { id: "kt5-1", tenantId: "t1", author: "tenant", body: "La luz del baño parpadea.", ts: iso(60 * 48) },
      { id: "kt5-2", tenantId: "t1", author: "ai", body: "Quizás sea el foco. ¿Tienes uno de repuesto? Te muestro cómo cambiarlo.", ts: iso(60 * 48) },
      { id: "kt5-3", tenantId: "t1", author: "tenant", body: "Sí, lo cambié y funciona perfecto.", ts: iso(60 * 46) },
    ],
  },
  {
    id: "k6",
    tenantId: "t3",
    title: "Front door lock sticking",
    description: "Tenant says key barely turns.",
    severity: "med",
    column: "new",
    createdAt: iso(60 * 2),
    aiSuggestion: "Lubricate with graphite before full replacement. Schedule tech within 48h.",
    thread: [
      { id: "kt6-1", tenantId: "t3", author: "tenant", body: "Kle pòt la preske pa vire. Mwen bezwen èd.", ts: iso(60 * 2) },
    ],
  },
  {
    id: "k7",
    tenantId: "t8",
    title: "Hot water intermittent",
    description: "Hot water cuts out after ~5 minutes.",
    severity: "med",
    column: "ai_handling",
    createdAt: iso(60 * 10),
    aiSuggestion: "Likely heating element nearing end-of-life. Schedule inspection this week.",
    thread: [
      { id: "kt7-1", tenantId: "t8", author: "tenant", body: "Dlo cho a kanpe apre 5 minit.", ts: iso(60 * 10) },
      { id: "kt7-2", tenantId: "t8", author: "ai", body: "Mwen pral pwograme yon enspeksyon chofe dlo semèn sa.", ts: iso(60 * 10) },
    ],
  },
  {
    id: "k8",
    tenantId: "t12",
    title: "Balcony railing loose",
    description: "Tenant reports wobble, safety concern.",
    severity: "high",
    column: "escalated",
    createdAt: iso(60 * 20),
    aiSuggestion: "Safety issue — escalated to property manager. Dispatch today.",
    thread: [
      { id: "kt8-1", tenantId: "t12", author: "tenant", body: "The balcony railing feels loose — this seems unsafe.", ts: iso(60 * 20) },
      { id: "kt8-2", tenantId: "t12", author: "ai", body: "This is a safety priority. I'm escalating to the property manager now.", ts: iso(60 * 20) },
    ],
  },
];

export const leases: Lease[] = [
  { id: "l1", tenantId: "t1", endDate: dayAhead(60), stage: "t-60", aiSummary: "On-time payments last 9 months. Engaged via WhatsApp. Likely to renew.", probability: 82, currentRent: 1850, proposedRent: 1895 },
  { id: "l2", tenantId: "t2", endDate: dayAhead(58), stage: "t-60", aiSummary: "One late payment. Still responsive. Moderate renewal likelihood.", probability: 64, currentRent: 2200, proposedRent: 2255 },
  { id: "l3", tenantId: "t3", endDate: dayAhead(55), stage: "t-60", aiSummary: "Haitian Creole preferred. Stable payment history. Engage via WhatsApp templates.", probability: 76, currentRent: 1650, proposedRent: 1695 },
  { id: "l4", tenantId: "t4", endDate: dayAhead(44), stage: "t-45", aiSummary: "Perfect payment record. High renewal likelihood. Offer flat rate.", probability: 91, currentRent: 1950, proposedRent: 1990 },
  { id: "l5", tenantId: "t5", endDate: dayAhead(42), stage: "t-45", aiSummary: "One open maintenance issue. Resolve before renewal outreach.", probability: 55, currentRent: 2100, proposedRent: 2160 },
  { id: "l6", tenantId: "t7", endDate: dayAhead(40), stage: "t-45", aiSummary: "Stable tenant, 2 years. Likely to renew at market rate.", probability: 78, currentRent: 2050, proposedRent: 2110 },
  { id: "l7", tenantId: "t6", endDate: dayAhead(28), stage: "t-30", aiSummary: "Escalated rent issue — pause renewal outreach until resolved.", probability: 32, currentRent: 1800, proposedRent: 1800 },
  { id: "l8", tenantId: "t8", endDate: dayAhead(25), stage: "t-30", aiSummary: "Haitian Creole. Late payment history. Consider retention incentive.", probability: 48, currentRent: 1700, proposedRent: 1720 },
  { id: "l9", tenantId: "t9", endDate: dayAhead(-5), stage: "completed", aiSummary: "Renewed 12-month term at $1,940.", probability: 100, currentRent: 1900, proposedRent: 1940 },
  { id: "l10", tenantId: "t10", endDate: dayAhead(-12), stage: "completed", aiSummary: "Renewed 12-month term at $2,350.", probability: 100, currentRent: 2300, proposedRent: 2350 },
  { id: "l11", tenantId: "t11", endDate: dayAhead(20), stage: "t-30", aiSummary: "Limited engagement. Send follow-up via WhatsApp + call.", probability: 58, currentRent: 1600, proposedRent: 1640 },
  { id: "l12", tenantId: "t12", endDate: dayAhead(-20), stage: "completed", aiSummary: "Renewed 12-month term at $2,200.", probability: 100, currentRent: 2150, proposedRent: 2200 },
];

export const aiActions: AIAction[] = [
  { id: "a1", kind: "rent", title: "Approve payment extension", summary: "Maria Gonzalez requested rent extension until Saturday. AI recommends approval — 9 months on-time history.", tenantName: "Maria Gonzalez", savedMinutes: 15, status: "pending" },
  { id: "a2", kind: "maintenance", title: "Dispatch plumber for unit 7A", summary: "Kitchen leak contained by tenant. AI proposes scheduling plumber 9-11am tomorrow.", tenantName: "James Whitmore", savedMinutes: 25, status: "pending" },
  { id: "a3", kind: "lease", title: "Send renewal offer — 91% likelihood", summary: "Sofia Hernandez hits T-45. AI drafted bilingual offer with +2% adjustment. Ready to send.", tenantName: "Sofia Hernandez", savedMinutes: 20, status: "pending" },
  { id: "a4", kind: "maintenance", title: "Escalate AC outage — unit 1A", summary: "Derrick Thompson reports 82°F indoor temp. Heat advisory active. Senior tech required today.", tenantName: "Derrick Thompson", savedMinutes: 30, status: "pending" },
  { id: "a5", kind: "rent", title: "Human review — unit 4B", summary: "Ana Paula Ferreira has not responded in 11 days. AI escalated to Natalia.", tenantName: "Ana Paula Ferreira", savedMinutes: 10, status: "pending" },
  { id: "a6", kind: "lease", title: "Pause renewal outreach — unit 4B", summary: "Ana Paula has open rent issue. AI paused automatic T-30 outreach pending human resolution.", tenantName: "Ana Paula Ferreira", savedMinutes: 12, status: "pending" },
];

export function tenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id);
}
