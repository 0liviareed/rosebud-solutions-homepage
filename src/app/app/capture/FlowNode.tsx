import type { FlowStepNode } from "@/lib/captureFlow";
import NodeIcon from "./icons";
import styles from "./flow.module.css";

export default function FlowNode({
  node,
  selected,
  onSelect,
}: {
  node: FlowStepNode;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.n} ${selected ? styles.sel : ""} ${node.variant === "warn" ? styles.warn : ""}`}
      onClick={() => onSelect(node.id)}
    >
      <div className={styles.nh}>
        <div className={styles.ni}>
          <NodeIcon icon={node.icon} />
        </div>
        <div className={styles.nw}>
          <div className={styles.nt}>{node.title}</div>
          <div className={styles.ns}>{node.subtitle}</div>
        </div>
      </div>
      <div className={styles.nm}>
        {node.metrics.map((m) => (
          <div className={styles.nmi} key={m.label}>
            <span className={styles.nmv}>{m.value}</span>
            <span className={styles.nmk}>{m.label}</span>
          </div>
        ))}
      </div>
    </button>
  );
}
