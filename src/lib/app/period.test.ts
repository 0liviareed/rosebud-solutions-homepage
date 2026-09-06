import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parsePeriod,
  periodRange,
  zonedDayKey,
  zonedMidnightUtc,
  zonedStartOfMonth,
  zonedStartOfNextMonth,
} from "./period.ts";

test("parsePeriod falls back", () => {
  assert.equal(parsePeriod("week"), "week");
  assert.equal(parsePeriod("calmonth"), "calmonth");
  assert.equal(parsePeriod("nope"), "month");
  assert.equal(parsePeriod(undefined, "today"), "today");
});

test("zonedDayKey uses the zone's calendar day", () => {
  // 23:30 UTC on 6 Sep is 7 Sep 00:30 in London (BST) and 6 Sep 16:30 in LA.
  const d = new Date("2026-09-06T23:30:00Z");
  assert.equal(zonedDayKey(d, "UTC"), "2026-09-06");
  assert.equal(zonedDayKey(d, "Europe/London"), "2026-09-07");
  assert.equal(zonedDayKey(d, "America/Los_Angeles"), "2026-09-06");
});

test("zonedMidnightUtc resolves local midnight across DST", () => {
  // London BST: midnight 6 Sep local = 23:00 UTC on 5 Sep.
  assert.equal(zonedMidnightUtc(2026, 9, 6, "Europe/London").toISOString(), "2026-09-05T23:00:00.000Z");
  // London GMT (after the October change): midnight 1 Dec local = 00:00 UTC.
  assert.equal(zonedMidnightUtc(2026, 12, 1, "Europe/London").toISOString(), "2026-12-01T00:00:00.000Z");
  // DST change day itself (25 Oct 2026, clocks back at 02:00 BST).
  assert.equal(zonedMidnightUtc(2026, 10, 25, "Europe/London").toISOString(), "2026-10-24T23:00:00.000Z");
  // Auckland NZST (+12) in June.
  assert.equal(zonedMidnightUtc(2026, 6, 15, "Pacific/Auckland").toISOString(), "2026-06-14T12:00:00.000Z");
});

test("periodRange windows are day-aligned in the zone", () => {
  const now = new Date("2026-09-06T12:00:00Z"); // 13:00 BST
  const today = periodRange("today", "Europe/London", now);
  assert.equal(today.since.toISOString(), "2026-09-05T23:00:00.000Z");
  assert.deepEqual(today.dayKeys, ["2026-09-06"]);

  const week = periodRange("week", "Europe/London", now);
  assert.equal(week.dayKeys.length, 7);
  assert.equal(week.dayKeys[0], "2026-08-31");
  assert.equal(week.dayKeys[6], "2026-09-06");

  const month = periodRange("month", "Europe/London", now);
  assert.equal(month.dayKeys.length, 30);
  assert.equal(month.dayKeys[0], "2026-08-08");
  assert.equal(month.dayLabels[0], "Aug 8");
  assert.equal(month.dayLabels[29], "Sep 6");

  const cal = periodRange("calmonth", "Europe/London", now);
  assert.equal(cal.since.toISOString(), "2026-08-31T23:00:00.000Z");
  assert.equal(cal.dayKeys.length, 6);
});

test("periodRange across the London DST edge keeps 30 buckets", () => {
  const now = new Date("2026-11-03T10:00:00Z");
  const r = periodRange("month", "Europe/London", now);
  assert.equal(r.dayKeys.length, 30);
  assert.equal(new Set(r.dayKeys).size, 30);
  assert.equal(r.dayKeys[29], "2026-11-03");
});

test("invalid timezone falls back to UTC", () => {
  const now = new Date("2026-09-06T12:00:00Z");
  const r = periodRange("today", "Mars/Olympus", now);
  assert.equal(r.timeZone, "UTC");
  assert.equal(r.since.toISOString(), "2026-09-06T00:00:00.000Z");
});

test("month boundaries", () => {
  const now = new Date("2026-09-06T12:00:00Z");
  assert.equal(zonedStartOfMonth(now, "UTC").toISOString(), "2026-09-01T00:00:00.000Z");
  assert.equal(zonedStartOfNextMonth(now, "UTC").toISOString(), "2026-10-01T00:00:00.000Z");
  assert.equal(zonedStartOfNextMonth(new Date("2026-12-20T00:00:00Z"), "UTC").toISOString(), "2027-01-01T00:00:00.000Z");
});
