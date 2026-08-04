import type { FlowSplit as FlowSplitItem } from "@/lib/captureFlow";
import FlowNode from "./FlowNode";
import styles from "./flow.module.css";

export default function FlowSplit({
  split,
  selectedId,
  onSelect,
}: {
  split: FlowSplitItem;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className={styles.split}>
      {split.branches.map((branch) => (
        <div className={styles.branch} key={branch.node.id}>
          <span className={`${styles.cp} ${branch.connector.tone === "yes" ? styles.yes : ""}`}>
            {branch.connector.label}
          </span>
          <div className={styles.cl} />
          <FlowNode node={branch.node} selected={selectedId === branch.node.id} onSelect={onSelect} />
          <span className={styles.weight}>{branch.weightPct}% of enquiries</span>
        </div>
      ))}
    </div>
  );
}
