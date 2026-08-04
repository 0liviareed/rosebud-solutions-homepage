"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Period } from "@/lib/captureMetrics";
import { CAPABILITY_RAIL } from "@/lib/captureFlow";
import NodeIcon from "./icons";
import styles from "./shell.module.css";

const PERIOD_LABEL: Record<Period, string> = { today: "Today", week: "This week", month: "This month" };

async function handleSignOut() {
  await fetch("/api/app/logout", { method: "POST" });
  window.location.href = "/app/login";
}

export default function CaptureShell({
  period,
  children,
  inspector,
}: {
  period: Period;
  children: ReactNode;
  inspector: ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <div className={styles.rail}>
        <div className={styles.rhead}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/rosebud-brand-orb.png" alt="" className={styles.bm} width={32} height={32} />
          <div>
            <div className={styles.bn}>Rosebud</div>
            <span className={styles.bnSub}>Console</span>
          </div>
        </div>
        <div className={styles.grp}>Capabilities</div>
        <div className={styles.navwrap}>
          {CAPABILITY_RAIL.map((cap) =>
            cap.live ? (
              <Link href="/app/capture" key={cap.id} className={`${styles.nv} ${styles.on}`}>
                <span className={styles.nvI}>
                  <NodeIcon icon="in" />
                </span>
                <span className={styles.nvN}>{cap.name}</span>
              </Link>
            ) : (
              <div className={`${styles.nv} ${styles.dim}`} key={cap.id}>
                <span className={styles.nvI}>{cap.code}</span>
                <span className={styles.nvN}>{cap.name}</span>
                <span className={styles.offPip}>Not live yet</span>
              </div>
            )
          )}
        </div>
        <div className={styles.acct}>
          <button type="button" className={styles.acctB} onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>

      <div className={styles.mid}>
        <div className={styles.tb}>
          <span className={styles.tbT}>Capture</span>
          <span className={styles.sp} />
          <span className={styles.seg}>
            {(["today", "week", "month"] as Period[]).map((p) => (
              <Link
                key={p}
                href={`/app/capture?period=${p}`}
                className={p === period ? styles.on : ""}
              >
                {PERIOD_LABEL[p]}
              </Link>
            ))}
          </span>
        </div>
        <div className={styles.scroll}>{children}</div>
      </div>

      {inspector}
    </div>
  );
}
