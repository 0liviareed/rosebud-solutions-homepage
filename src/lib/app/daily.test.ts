import { test } from "node:test";
import assert from "node:assert/strict";
import { bucketDaily } from "./daily.ts";
import { zonedDayKey } from "./period.ts";

test("buckets across a timezone day boundary", () => {
  const keys = ["2026-09-05", "2026-09-06", "2026-09-07"];
  const rows = [
    "2026-09-06T23:30:00Z", // 7 Sep in London, 6 Sep in UTC
    "2026-09-06T10:00:00Z",
    "2026-09-04T23:30:00Z", // 5 Sep in London, 4 Sep in UTC (out of range)
    "not-a-date",
  ];
  assert.deepEqual(bucketDaily(rows, keys, (d) => zonedDayKey(d, "Europe/London")), [1, 1, 1]);
  assert.deepEqual(bucketDaily(rows, keys, (d) => zonedDayKey(d, "UTC")), [0, 2, 0]);
});
