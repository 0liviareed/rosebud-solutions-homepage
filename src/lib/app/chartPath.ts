// SHARED CONTRACT — identical geometry on demo and app (mockup svg viewBox 1240x240).
export type ChartSeries = { id: string; label: string; color: string; values: number[] | null };
export type ChartGeometry = {
  width: 1240; height: 240;
  grid: number[]; yTicks: { y: number; label: string }[]; xTicks: { x: number; label: string }[];
  lines: { id: string; color: string; d: string }[];
  area: { id: string; color: string; d: string } | null;
  empty: boolean;
};
const X0 = 60, X1 = 1220, Y0 = 20, Y1 = 180;
const STEPS = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000];
export function niceMax(max: number): number {
  for (const s of STEPS) if (4 * s >= max) return 4 * s;
  return Math.ceil(max / 40000) * 40000;
}
export function buildLineChart(dayLabels: string[], series: ChartSeries[]): ChartGeometry {
  const n = dayLabels.length;
  const live = series.filter((s) => s.values !== null) as Array<ChartSeries & { values: number[] }>;
  const dataMax = Math.max(0, ...live.flatMap((s) => s.values));
  const max = niceMax(dataMax);
  const step = n > 1 ? (X1 - X0) / (n - 1) : 0;
  const x = (i: number) => (n > 1 ? X0 + i * step : (X0 + X1) / 2);
  const y = (v: number) => Y1 - (v / max) * (Y1 - Y0);
  const pt = (i: number, v: number) => `${Math.round(x(i))},${Math.round(y(v))}`;
  const grid = [Y0, Y0 + 40, Y0 + 80, Y0 + 120, Y1];
  const yTicks = grid.map((gy, k) => ({ y: gy + 4, label: String(Math.round(max - (k * max) / 4)) }));
  const xTicks: { x: number; label: string }[] = [];
  for (let i = 0; i < n; i++) if (i % 5 === 0 || i === n - 1) xTicks.push({ x: Math.round(x(i)), label: dayLabels[i] });
  const lines = live.map((s) => ({ id: s.id, color: s.color, d: s.values.map((v, i) => `${i === 0 ? "M" : "L"}${pt(i, v)}`).join(" ") }));
  const first = live[0];
  const area = first && n > 0
    ? { id: first.id, color: first.color, d: `${lines[0].d} L${Math.round(x(n - 1))},${Y1} L${X0},${Y1} Z` }
    : null;
  return { width: 1240, height: 240, grid, yTicks, xTicks, lines, area, empty: dataMax === 0 };
}
