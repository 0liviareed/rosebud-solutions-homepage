"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ConnectionSummary } from "@/app/api/connections/route";
import { PROVIDER_CATALOGUE } from "./providerCatalogue";
import ConnectionCard from "./ConnectionCard";
import styles from "./connections.module.css";

async function handleSignOut() {
  await fetch("/api/app/logout", { method: "POST" });
  window.location.href = "/login";
}

export default function ConnectionsView({
  initialConnections,
}: {
  initialConnections: ConnectionSummary[];
}) {
  const [connections, setConnections] = useState(initialConnections);
  const searchParams = useSearchParams();
  const connectedParam = searchParams.get("connected");
  const errorParam = searchParams.get("error");

  const refetch = useCallback(async () => {
    const res = await fetch("/api/connections");
    if (!res.ok) return;
    const json = (await res.json()) as { connections: ConnectionSummary[] };
    setConnections(json.connections);
  }, []);

  // The OAuth callback redirects back here with ?connected= or ?error= — no
  // extra client refetch needed for that case, since page.tsx's server
  // component already reads fresh connections on every full navigation
  // (including this one), and the callback route awaits its DB write before
  // issuing the redirect. `refetch` below is for post-mount actions
  // (Test/Remove) that happen without a navigation.
  const byCategoryProvider = new Map(
    connections.map((c) => [`${c.category}:${c.provider}`, c])
  );

  // required_ok mirrors §5's logic — computed here (not duplicated server +
  // client) since this is the only place it's rendered in Phase 1; the S0
  // checklist (Phase 3) will read the same GET /api/connections response
  // rather than recompute its own copy.
  const hasActive = (category: string) =>
    connections.some((c) => c.category === category && c.status === "active");
  const requiredOk = hasActive("crm") && hasActive("calendar") && hasActive("channel");

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <div className={styles.brand}>Rosebud</div>
          <div className={styles.brandSub}>Setup — Connections</div>
        </div>
        <button type="button" className={styles.signOut} onClick={handleSignOut}>
          Sign out
        </button>
      </header>

      <div className={styles.body}>
        <h1 className={styles.title}>Connections</h1>
        <p className={styles.intro}>
          Connect the tools you already use. We read and write through your own accounts. You
          need a CRM, a calendar, and at least one channel.
        </p>

        {connectedParam && (
          <div className={styles.banner}>Connected — your {connectedParam} account is linked.</div>
        )}
        {errorParam && <div className={`${styles.banner} ${styles.bannerError}`}>{errorParam}</div>}

        {PROVIDER_CATALOGUE.map((section) => (
          <section key={section.category} className={styles.section}>
            <div className={styles.sectionLabel}>
              {section.label} · {section.required === "one" ? "required" : "at least one required"} ·
              your account
            </div>
            <div className={styles.grid}>
              {section.providers.map((provider) => (
                <ConnectionCard
                  key={provider.key}
                  category={section.category}
                  provider={provider}
                  connection={byCategoryProvider.get(`${section.category}:${provider.key}`)}
                  onChanged={refetch}
                />
              ))}
            </div>
          </section>
        ))}

        {!requiredOk && (
          <div className={`${styles.banner} ${styles.bannerWarn}`}>
            You need an active CRM, calendar, and channel connection before you can go live.
          </div>
        )}
      </div>
    </div>
  );
}
