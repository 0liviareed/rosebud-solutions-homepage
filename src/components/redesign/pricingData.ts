// Single source of truth for the pricing tiers. Imported by BOTH the interactive
// configurator (PricingV2, a client component) and the server-rendered pricing
// table + Offer/FAQPage schema (PricingSeo). Keeping the figures here means the
// machine-readable table and the human configurator can never drift apart.
//
// Commercial terms (confirmed): self-serve tiers have NO setup fee. Monthly
// billing has no minimum term — cancel any time. Annual billing is a 12-month
// commitment billed yearly at 10% off (YEARLY). Seats are £10 / $13 per seat per
// month above the tier base. Overage is £0.25 per lead in blocks of 50 above the
// monthly cap. Closed-loop attribution is a +£750 / +$950 per-month add-on.

export const YEARLY = 0.9; // annual billing = 10% off the monthly rate

export type Cur = "GBP" | "USD";
export const CUR: Record<Cur, { sym: string; locale: string; cla: number; seat: number; vat: number }> = {
  GBP: { sym: "£", locale: "en-GB", cla: 750, seat: 10, vat: 0.2 },
  USD: { sym: "$", locale: "en-US", cla: 950, seat: 13, vat: 0 },
};

export type PlanKey = "start" | "grow" | "expand" | "scale";
export type Plan = {
  key: PlanKey; name: string; rec: boolean; price: Record<Cur, number>;
  leads: string; leadNum: string; selfServe: boolean; desc: string; bestFor: string;
  baseSeats: number; seatCap: number; nextName: string | null; nextSeats: number | null;
  claDefault: boolean; feats: string[];
};

export const PLANS: Plan[] = [
  { key: "start", name: "Start", rec: false, price: { GBP: 660, USD: 850 }, leads: "Up to 500 leads / mo", leadNum: "Up to 500", selfServe: true, desc: "For solo operators getting their first automations live.", bestFor: "Best for getting started", baseSeats: 2, seatCap: 4, nextName: "Grow", nextSeats: 5, claDefault: false,
    feats: ["Channels: Email, SMS", "Nurture: 2 touches", "No-show recovery: 1 attempt", "Reminder cadence: 1 reminder"] },
  { key: "grow", name: "Grow", rec: true, price: { GBP: 1650, USD: 2100 }, leads: "600 – 1,800 leads / mo", leadNum: "600 – 1,800", selfServe: true, desc: "For growing teams qualifying and booking across channels.", bestFor: "Best value for most teams", baseSeats: 5, seatCap: 9, nextName: "Expand", nextSeats: 10, claDefault: false,
    feats: ["Channels: Email, SMS, WhatsApp", "Nurture: 3 touches", "No-show recovery: 1 attempt", "Reminder cadence: 2 reminders"] },
  { key: "expand", name: "Expand", rec: false, price: { GBP: 2500, USD: 3200 }, leads: "2,000 – 3,500 leads / mo", leadNum: "2,000 – 3,500", selfServe: true, desc: "For busy teams scaling volume with attribution built in.", bestFor: "Best for scaling", baseSeats: 10, seatCap: 19, nextName: "Scale", nextSeats: 20, claDefault: true,
    feats: ["Channels: Email, SMS, WhatsApp", "Nurture: 4 touches", "No-show recovery: 2 attempts", "Reminder cadence: 2 reminders"] },
  { key: "scale", name: "Scale", rec: false, price: { GBP: 4900, USD: 6300 }, leads: "4,000 leads / mo", leadNum: "4,000", selfServe: true, desc: "For high-volume operations that need every channel.", bestFor: "Best for high volume", baseSeats: 20, seatCap: 20, nextName: null, nextSeats: null, claDefault: true,
    feats: ["Channels: Email, SMS, WhatsApp, Instagram", "Nurture: 5 touches", "No-show recovery: 3 attempts", "Reminder cadence: 3 reminders"] },
];

// Modules are individually-priced add-ons on ANY plan (configured at checkout);
// the comparison shows the "from" anchor = cheapest module (Status updates).
export const MOD_FROM: Record<Cur, number> = { GBP: 50, USD: 65 };
