import type { FlowItem } from "@/lib/captureFlow";
import FlowNode from "./FlowNode";
import FlowConnector from "./FlowConnector";
import FlowSplit from "./FlowSplit";
import styles from "./flow.module.css";

export default function FlowDiagram({
  flow,
  selectedId,
  onSelect,
}: {
  flow: FlowItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className={styles.flow}>
      {flow.map((item, i) => {
        if (item.kind === "node") {
          return (
            <div className={styles.row} key={item.id}>
              <FlowNode node={item} selected={selectedId === item.id} onSelect={onSelect} />
            </div>
          );
        }
        if (item.kind === "connector") {
          return <FlowConnector connector={item} key={`c-${i}`} />;
        }
        if (item.kind === "split") {
          return <FlowSplit split={item} selectedId={selectedId} onSelect={onSelect} key={`s-${i}`} />;
        }
        // out node — inert, Qualify isn't live yet
        return (
          <div className={styles.row} key={`out-${i}`}>
            <div className={`${styles.n} ${styles.out} ${styles.inert}`}>
              <div className={styles.nh}>
                <div className={styles.nt}>{item.title}</div>
                <span className={styles.ngo}>→</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
