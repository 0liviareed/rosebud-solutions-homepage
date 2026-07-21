// Single source of truth for price maths — imported by the pricing page, the
// checkout order summary, and (server-side) the Stripe session builder. Per the
// brief: "Three implementations of this is three chances to show a client a price
// you don't charge them." Keep plan config in sync with the `plans` DB table +
// the Stripe catalogue (scripts/stripe-setup.cjs).

export type Cur = "GBP" | "USD";
export type Cycle = "monthly" | "yearly";
export type PlanKey = "start" | "grow" | "expand" | "scale";

export const YEARLY_MULT = 0.9; // 10% off, plans only

export const CUR: Record<Cur, { sym: string; locale: string; cla: number; seat: number; vat: number }> = {
  GBP: { sym: "£", locale: "en-GB", cla: 750, seat: 10, vat: 0.2 },
  USD: { sym: "$", locale: "en-US", cla: 950, seat: 13, vat: 0 },
};

export type Plan = {
  key: PlanKey; name: string; price: Record<Cur, number>;
  leadCap: number; baseSeats: number; seatCap: number; claDefault: boolean; selfServe: boolean;
};

export const PLANS: Plan[] = [
  { key: "start",  name: "Start",  price: { GBP: 660, USD: 850 },  leadCap: 500,  baseSeats: 2,  seatCap: 4,  claDefault: false, selfServe: true },
  { key: "grow",   name: "Grow",   price: { GBP: 1650, USD: 2100 }, leadCap: 1800, baseSeats: 5,  seatCap: 9,  claDefault: false, selfServe: true },
  { key: "expand", name: "Expand", price: { GBP: 2500, USD: 3200 }, leadCap: 3500, baseSeats: 10, seatCap: 19, claDefault: true,  selfServe: true },
  { key: "scale",  name: "Scale",  price: { GBP: 4900, USD: 6300 }, leadCap: 4000, baseSeats: 20, seatCap: 20, claDefault: true,  selfServe: true },
];

export const planByKey = (k: string): Plan | undefined => PLANS.find((p) => p.key === k);

export type Config = { plan: Plan; cycle: Cycle; currency: Cur; seats: number; claOn: boolean };

// ── the maths ────────────────────────────────────────────────────────────────
/** Per-month base for the plan (yearly shows the discounted monthly rate). */
export function basePrice(plan: Plan, cycle: Cycle, currency: Cur): number {
  const list = plan.price[currency];
  return cycle === "yearly" ? Math.round(list * YEARLY_MULT) : list;
}
/** Flat CLA add-on — never discounted. */
export function claAmount(currency: Cur, claOn: boolean): number {
  return claOn ? CUR[currency].cla : 0;
}
/** Extra seats above the plan's base allotment × flat per-seat rate. */
export function extraSeats(plan: Plan, seats: number): number {
  return Math.max(0, seats - plan.baseSeats);
}
export function seatCost(plan: Plan, seats: number, currency: Cur): number {
  return extraSeats(plan, seats) * CUR[currency].seat;
}
/** Displayed monthly total: base + CLA + seats. */
export function monthlyTotal(c: Config): number {
  return basePrice(c.plan, c.cycle, c.currency) + claAmount(c.currency, c.claOn) + seatCost(c.plan, c.seats, c.currency);
}

export type Totals = {
  base: number; cla: number; seats: number; extraSeatCount: number;
  monthlySubtotal: number; annualSubtotal: number | null; vat: number; dueToday: number; currency: Cur; cycle: Cycle;
};

/** Full order-summary breakdown. VAT only applied for GBP (UK); USD sales tax is
 *  calculated by Stripe Tax at the hosted step, so it's 0 here. */
export function computeTotals(c: Config, opts: { vatApplicable?: boolean } = {}): Totals {
  const base = basePrice(c.plan, c.cycle, c.currency);
  const cla = claAmount(c.currency, c.claOn);
  const seats = seatCost(c.plan, c.seats, c.currency);
  const monthlySubtotal = base + cla + seats;
  const annualSubtotal = c.cycle === "yearly" ? monthlySubtotal * 12 : null;
  const chargeable = annualSubtotal ?? monthlySubtotal;
  const vatRate = CUR[c.currency].vat;
  const vatApplicable = opts.vatApplicable ?? vatRate > 0;
  const vat = vatApplicable ? chargeable * vatRate : 0;
  return {
    base, cla, seats, extraSeatCount: extraSeats(c.plan, c.seats),
    monthlySubtotal, annualSubtotal, vat, dueToday: chargeable + vat, currency: c.currency, cycle: c.cycle,
  };
}

export function fmt(n: number, currency: Cur): string {
  const cfg = CUR[currency];
  return cfg.sym + Math.round(n).toLocaleString(cfg.locale);
}
