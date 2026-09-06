import styles from "./shell.module.css";

// The honest empty state for pages / panels whose runtime doesn't exist yet.
// Never renders a number. Same copy shape as the demo's "Not live yet" pips.
export default function NotLiveYet({
  title,
  line,
  compact = false,
}: {
  title: string;
  line: string;
  compact?: boolean;
}) {
  return (
    <div className={`${styles.panel} ${styles.notLive}`} style={compact ? { padding: "18px 20px" } : undefined}>
      <span className={styles.notLivePill}>Not live yet</span>
      {compact ? <p><strong style={{ color: "var(--ink)" }}>{title}.</strong> {line}</p> : (
        <>
          <h2>{title}</h2>
          <p>{line}</p>
        </>
      )}
    </div>
  );
}
