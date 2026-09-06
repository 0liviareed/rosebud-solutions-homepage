// Bucket timestamped rows into day keys. Pure and import-free (loadable by
// `node --test` without a resolver): the caller supplies the key function,
// normally `(d) => zonedDayKey(d, timeZone)` from ./period.
export function bucketDaily(
  timestamps: Iterable<string | Date>,
  dayKeys: readonly string[],
  keyOf: (d: Date) => string
): number[] {
  const index = new Map<string, number>();
  dayKeys.forEach((k, i) => index.set(k, i));
  const counts = new Array<number>(dayKeys.length).fill(0);
  for (const t of timestamps) {
    const d = typeof t === "string" ? new Date(t) : t;
    if (Number.isNaN(d.getTime())) continue;
    const i = index.get(keyOf(d));
    if (i !== undefined) counts[i] += 1;
  }
  return counts;
}
