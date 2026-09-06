import { buildLineChart, type ChartSeries } from "@/lib/app/chartPath";
import styles from "./dashboard.module.css";

// Pure SVG — same geometry as the demo's lineChart() (shared contract), so
// the two surfaces draw the identical frame. Series with `values: null` are
// listed in the legend as not live and draw nothing.
export default function ActivityChart({ dayLabels, series }: { dayLabels: string[]; series: ChartSeries[] }) {
  const g = buildLineChart(dayLabels, series);
  return (
    <div className={g.empty ? styles.chartEmpty : undefined}>
      <svg viewBox={`0 0 ${g.width} ${g.height}`} role="img" aria-label={`Daily activity, ${dayLabels[0]} to ${dayLabels[dayLabels.length - 1]}`}>
        <defs>
          <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={g.area?.color ?? "#1f9d78"} stopOpacity=".25" />
            <stop offset="1" stopColor={g.area?.color ?? "#1f9d78"} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#e7e6ee" strokeWidth="1">
          {g.grid.map((y) => (
            <line key={y} x1="60" y1={y} x2="1220" y2={y} />
          ))}
        </g>
        <g fill="#8a889b" fontSize="12" fontFamily="Inter,sans-serif" textAnchor="end">
          {g.yTicks.map((t) => (
            <text key={t.y} x="48" y={t.y}>{t.label}</text>
          ))}
        </g>
        {g.area && !g.empty && <path fill="url(#gc)" d={g.area.d} />}
        {g.lines.map((l, i) => (
          <path key={l.id} fill="none" stroke={l.color} strokeWidth={i === 0 ? 2.2 : 2} d={l.d} />
        ))}
        <g fill="#4f4c66" fontSize="12" fontFamily="Inter,sans-serif" textAnchor="middle">
          {g.xTicks.map((t) => (
            <text key={`${t.x}-${t.label}`} x={t.x} y="206">{t.label}</text>
          ))}
        </g>
      </svg>
      {g.empty && <div className={styles.overlay}>No enquiries in this range yet.</div>}
    </div>
  );
}
