import type { FlowConnector as FlowConnectorItem } from "@/lib/captureFlow";
import styles from "./flow.module.css";

export default function FlowConnector({ connector }: { connector: FlowConnectorItem }) {
  return (
    <div className={styles.c}>
      <div className={styles.cl} />
      {connector.label && (
        <span className={`${styles.cp} ${connector.tone === "yes" ? styles.yes : ""}`}>{connector.label}</span>
      )}
      <div className={styles.cl} />
    </div>
  );
}
