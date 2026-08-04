import type { CaptureMetrics } from "@/lib/captureMetrics";
import type { FlowItem, FlowStepNode } from "@/lib/captureFlow";
import { activityLine } from "@/lib/captureFlow";
import styles from "./inspector.module.css";

function findNode(flow: FlowItem[], id: string): FlowStepNode | null {
  for (const item of flow) {
    if (item.kind === "node" && item.id === id) return item;
    if (item.kind === "split") {
      for (const b of item.branches) if (b.node.id === id) return b.node;
    }
  }
  return null;
}

function NodeDetail({ node }: { node: FlowStepNode }) {
  return (
    <>
      <div className={styles.ih}>
        <div className={styles.ihK}>Capture · flow step</div>
        <div className={styles.ihT}>{node.title}</div>
        <div className={styles.ihS}>{node.subtitle}</div>
      </div>
      <div className={styles.sec}>
        <div className={styles.k}>This period</div>
        {node.metrics.map((m) => (
          <div className={styles.v} key={m.label}>
            <b>{m.value}</b> {m.label}
          </div>
        ))}
      </div>
      <div className={styles.sec}>
        <div className={styles.k}>Why it matters</div>
        {node.why.map((w) => (
          <p className={styles.recM} style={{ marginBottom: 8 }} key={w}>
            {w}
          </p>
        ))}
      </div>
    </>
  );
}

function Overview({ metrics }: { metrics: CaptureMetrics }) {
  return (
    <>
      <div className={styles.ih}>
        <div className={styles.ihK}>CAP</div>
        <div className={styles.ihT}>Capture</div>
        <div className={styles.ihS}>Answer every enquiry in seconds and catch leads before they go elsewhere.</div>
      </div>
      <div className={styles.sec}>
        <div className={styles.secH}>
          <div className={styles.k}>Intake channels this period</div>
        </div>
        {metrics.channelMix.length === 0 ? (
          <div className={styles.empty}>Nothing captured yet this period.</div>
        ) : (
          <div className={styles.chips}>
            {metrics.channelMix.map((c) => (
              <span className={styles.chip} key={c.channel}>
                {c.channel}
                <b>{c.count}</b>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.sec}>
        <div className={styles.k}>Recent</div>
        {metrics.recentRecords.length === 0 ? (
          <div className={styles.empty}>Nothing captured yet this period.</div>
        ) : (
          metrics.recentRecords.slice(0, 6).map((r) => (
            <div className={styles.rec} key={r.id}>
              <span className={styles.recT}>{r.channel}</span>
              <span className={styles.recM}>{activityLine(r)}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default function Inspector({
  metrics,
  flow,
  selectedId,
}: {
  metrics: CaptureMetrics;
  flow: FlowItem[];
  selectedId: string | null;
}) {
  const node = selectedId ? findNode(flow, selectedId) : null;
  return <div className={styles.insp}>{node ? <NodeDetail node={node} /> : <Overview metrics={metrics} />}</div>;
}
