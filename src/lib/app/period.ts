// Period windows for the client console — pure (no runtime imports) so the
// dashboard, Capture, Usage AND `node --test` all share one definition.
//
// Windows are DAY-ALIGNED in the tenant's timezone (tenant_profile.timezone,
// UTC when unset) so a daily chart and its headline count agree:
//   today    → [start of today, now]                       1 bucket
//   week     → [start of today − 6 days, now]              7 buckets  ("7 days")
//   month    → [start of today − 29 days, now]             30 buckets ("30 days")
//   calmonth → [start of this calendar month, now]         1..31 buckets ("This month")
// The rolling windows were previously "now − N×24h" (UTC); day alignment is
// the honest reading of "7 days" / "30 days" on a chart with one point per day.

export type Period = "today" | "week" | "month" | "calmonth";

export const PERIODS: readonly Period[] = ["today", "week", "month", "calmonth"];

export const PERIOD_LABEL: Record<Period, string> = {
  today: "Today",
  week: "7 days",
  month: "30 days",
  calmonth: "This month",
};

export const PERIOD_SENTENCE: Record<Period, string> = {
  today: "today",
  week: "the last 7 days",
  month: "the last 30 days",
  calmonth: "this month",
};

export const DEFAULT_PERIOD: Period = "month";

export function parsePeriod(value: string | undefined | null, fallback: Period = DEFAULT_PERIOD): Period {
  return (PERIODS as readonly string[]).includes(value ?? "") ? (value as Period) : fallback;
}

export function isValidTimezone(tz: string | null | undefined): tz is string {
  if (!tz) return false;
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

type Parts = { y: number; m: number; d: number; hh: number; mm: number; ss: number };

function zonedParts(date: Date, timeZone: string): Parts {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const p: Record<string, number> = {};
  for (const part of fmt.formatToParts(date)) {
    if (part.type !== "literal") p[part.type] = Number(part.value);
  }
  return { y: p.year, m: p.month, d: p.day, hh: p.hour % 24, mm: p.minute, ss: p.second };
}

// "YYYY-MM-DD" of `date` as seen in `timeZone` — the bucket key for daily series.
export function zonedDayKey(date: Date, timeZone: string): string {
  const { y, m, d } = zonedParts(date, timeZone);
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

// The UTC instant of local midnight (y, m, d) in `timeZone`. Two-pass so a
// DST transition on that day still resolves to the true local midnight.
export function zonedMidnightUtc(y: number, m: number, d: number, timeZone: string): Date {
  let guess = Date.UTC(y, m - 1, d, 0, 0, 0);
  for (let i = 0; i < 2; i++) {
    const p = zonedParts(new Date(guess), timeZone);
    const seenAsUtc = Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mm, p.ss);
    const want = Date.UTC(y, m - 1, d, 0, 0, 0);
    const diff = seenAsUtc - want;
    if (diff === 0) break;
    guess -= diff;
  }
  return new Date(guess);
}

export function zonedStartOfDay(date: Date, timeZone: string): Date {
  const { y, m, d } = zonedParts(date, timeZone);
  return zonedMidnightUtc(y, m, d, timeZone);
}

export function zonedStartOfMonth(date: Date, timeZone: string): Date {
  const { y, m } = zonedParts(date, timeZone);
  return zonedMidnightUtc(y, m, 1, timeZone);
}

export function zonedStartOfNextMonth(date: Date, timeZone: string): Date {
  const { y, m } = zonedParts(date, timeZone);
  return m === 12 ? zonedMidnightUtc(y + 1, 1, 1, timeZone) : zonedMidnightUtc(y, m + 1, 1, timeZone);
}

function addDays(date: Date, days: number, timeZone: string): Date {
  // Step by calendar days in the zone (not 24h) so DST days keep midnight aligned.
  const { y, m, d } = zonedParts(date, timeZone);
  const utcDay = Date.UTC(y, m - 1, d + days);
  const t = new Date(utcDay);
  return zonedMidnightUtc(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), timeZone);
}

export type PeriodRange = {
  period: Period;
  timeZone: string;
  since: Date;          // inclusive lower bound
  until: Date;          // `now` (exclusive upper bound for queries)
  dayKeys: string[];    // one "YYYY-MM-DD" per bucket, oldest first
  dayLabels: string[];  // "Aug 7" … for the chart axis (en-US, month short)
};

function dayLabel(key: string, timeZone: string): string {
  const [y, m, d] = key.split("-").map(Number);
  const inst = zonedMidnightUtc(y, m, d, timeZone);
  return new Intl.DateTimeFormat("en-US", { timeZone, month: "short", day: "numeric" }).format(inst);
}

export function periodRange(period: Period, timeZone: string, now: Date = new Date()): PeriodRange {
  const tz = isValidTimezone(timeZone) ? timeZone : "UTC";
  const startToday = zonedStartOfDay(now, tz);
  let since: Date;
  if (period === "today") since = startToday;
  else if (period === "week") since = addDays(startToday, -6, tz);
  else if (period === "month") since = addDays(startToday, -29, tz);
  else since = zonedStartOfMonth(now, tz);

  const dayKeys: string[] = [];
  const todayKey = zonedDayKey(now, tz);
  for (let cursor = since, i = 0; i < 62; i++) {
    const key = zonedDayKey(cursor, tz);
    dayKeys.push(key);
    if (key === todayKey) break;
    cursor = addDays(cursor, 1, tz);
  }
  return { period, timeZone: tz, since, until: now, dayKeys, dayLabels: dayKeys.map((k) => dayLabel(k, tz)) };
}
