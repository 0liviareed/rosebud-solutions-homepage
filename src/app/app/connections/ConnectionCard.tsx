"use client";

import { useState } from "react";
import type { ConnectionSummary } from "@/app/api/connections/route";
import type { ProviderEntry, CategoryKey } from "./providerCatalogue";
import CredentialModal from "./CredentialModal";
import { startWhatsAppEmbeddedSignup } from "./whatsappEmbeddedSignup";
import styles from "./connections.module.css";

const REGIONS = [
  { value: "eu", label: "EU" },
  { value: "us", label: "US" },
  { value: "in", label: "IN" },
];

// Card-level state machine, exactly per the v3 doc §5:
//   disconnected --Connect--> connecting --ok--> active
//                                 |--fail--> error
//   active --health check fail--> expired/broken --Reconnect--> connecting
// `error` isn't a stored DB status (the record shape only has 5 values) — a
// row left `pending` with `health_reason` set is a failed callback, rendered
// here as the error state. Credential-method providers never actually land
// here in practice (their validation happens before any row is written),
// but the state machine handles it generically regardless of method.
//
// `in_review` is WhatsApp-specific — a successful Embedded Signup leaves the
// row `pending` with an "IN_REVIEW:" health_reason marker while Meta reviews
// the number (§5.1 Method C: "◐ In review · approval ~5d"). Checked before
// the generic error case below, or a legitimate in-review connection would
// render as a red error card.
type CardState = "disconnected" | "connecting" | "active" | "error" | "expired" | "broken" | "in_review";

function deriveState(connection: ConnectionSummary | undefined): CardState {
  if (!connection) return "disconnected";
  if (connection.status === "active") return "active";
  if (connection.status === "expired") return "expired";
  if (connection.status === "broken") return "broken";
  if (connection.status === "pending" && connection.health_reason?.startsWith("IN_REVIEW:")) return "in_review";
  if (connection.status === "pending" && connection.health_reason) return "error";
  if (connection.status === "pending") return "connecting";
  return "disconnected";
}

export default function ConnectionCard({
  category,
  provider,
  connection,
  onChanged,
  recommended = false,
}: {
  category: CategoryKey;
  provider: ProviderEntry;
  connection: ConnectionSummary | undefined;
  onChanged: () => void;
  // Pre-selected from the welcome flow's connection_intent — the client told us
  // they use this tool (§0 "each selection pre-highlights a card"). Guidance
  // only; every card stays connectable regardless.
  recommended?: boolean;
}) {
  const [region, setRegion] = useState(REGIONS[0].value);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const state = deriveState(connection);

  async function connectOAuth() {
    setBusy(true);
    setLocalError(null);
    try {
      const res = await fetch(`/api/connections/${category}/${provider.key}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(provider.supportsRegion ? { region } : {}),
      });
      const json = (await res.json()) as { auth_url?: string; error?: string };
      if (!res.ok || !json.auth_url) {
        setLocalError(json.error ?? "Couldn't start the connection.");
        setBusy(false);
        return;
      }
      window.location.href = json.auth_url;
    } catch {
      setLocalError("Couldn't reach the server.");
      setBusy(false);
    }
  }

  async function connectWhatsApp() {
    setBusy(true);
    setLocalError(null);
    try {
      const startRes = await fetch(`/api/connections/${category}/${provider.key}/start`, { method: "POST" });
      const startJson = (await startRes.json()) as { appId?: string; configId?: string; state?: string; error?: string };
      if (!startRes.ok || !startJson.appId || !startJson.configId || !startJson.state) {
        setLocalError(startJson.error ?? "Couldn't start the connection.");
        setBusy(false);
        return;
      }

      const signup = await startWhatsAppEmbeddedSignup(startJson.appId, startJson.configId);

      const completeRes = await fetch(`/api/connections/${category}/${provider.key}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: startJson.state, ...signup }),
      });
      const completeJson = (await completeRes.json()) as { ok?: boolean; error?: string };
      if (!completeRes.ok || !completeJson.ok) {
        setLocalError(completeJson.error ?? "Couldn't complete the connection.");
        setBusy(false);
        return;
      }
      onChanged();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "WhatsApp signup didn't complete.");
    } finally {
      setBusy(false);
    }
  }

  function connect() {
    if (provider.method === "credential") {
      setLocalError(null);
      setShowModal(true);
      return;
    }
    if (provider.method === "guided") {
      connectWhatsApp();
      return;
    }
    connectOAuth();
  }

  async function test() {
    if (!connection) return;
    setBusy(true);
    setLocalError(null);
    try {
      const res = await fetch(`/api/connections/conn/${connection.id}/test`, { method: "POST" });
      const json = (await res.json()) as { healthy?: boolean; reason?: string };
      if (!json.healthy) setLocalError(json.reason ?? "Test failed.");
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!connection) return;
    setBusy(true);
    try {
      await fetch(`/api/connections/conn/${connection.id}/disconnect`, { method: "POST" });
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  if (!provider.built) {
    return (
      <div className={`${styles.card} ${styles.cardDisabled}`}>
        <div className={styles.cardName}>{provider.label}</div>
        <div className={styles.cardStatus}>Coming soon</div>
      </div>
    );
  }

  const showRecommend = recommended && state === "disconnected";

  return (
    <div className={`${styles.card} ${showRecommend ? styles.cardRecommended : ""}`}>
      <div className={styles.cardName}>
        {provider.label}
        {showRecommend && <span className={styles.recommendBadge}>Yours</span>}
      </div>

      {state === "disconnected" && (
        <>
          {provider.supportsRegion && (
            <select
              className={styles.regionSelect}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              disabled={busy}
            >
              {REGIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          )}
          <button type="button" className={styles.connectBtn} onClick={connect} disabled={busy}>
            {busy ? "Connecting…" : "Connect"}
          </button>
        </>
      )}

      {state === "connecting" && (
        <div className={styles.cardStatus}>
          <span className={styles.spinner} /> Connecting…
        </div>
      )}

      {state === "active" && (
        <>
          <div className={`${styles.cardStatus} ${styles.ok}`}>✓ Connected</div>
          {connection?.external_account_ref && (
            <div className={styles.cardRef}>{connection.external_account_ref}</div>
          )}
          <div className={styles.cardActions}>
            <button type="button" onClick={test} disabled={busy}>
              Test
            </button>
            <button type="button" onClick={remove} disabled={busy}>
              Remove
            </button>
          </div>
        </>
      )}

      {(state === "expired" || state === "broken") && (
        <>
          <div className={`${styles.cardStatus} ${styles.amber}`}>
            {state === "expired" ? "Expired" : "Broken"}
            {connection?.health_reason ? ` — ${connection.health_reason}` : ""}
          </div>
          <button type="button" className={styles.connectBtn} onClick={connect} disabled={busy}>
            Reconnect
          </button>
        </>
      )}

      {state === "error" && (
        <>
          <div className={`${styles.cardStatus} ${styles.error}`}>
            {connection?.health_reason ?? "Couldn't connect."}
          </div>
          <button type="button" className={styles.connectBtn} onClick={connect} disabled={busy}>
            Connect again
          </button>
        </>
      )}

      {state === "in_review" && (
        <>
          <div className={`${styles.cardStatus} ${styles.amber}`}>
            ◐ In review — approval typically ~5 business days
          </div>
          {connection?.external_account_ref && (
            <div className={styles.cardRef}>{connection.external_account_ref}</div>
          )}
        </>
      )}

      {localError && <div className={styles.inlineError}>{localError}</div>}

      {showModal && (
        <CredentialModal
          category={category}
          provider={provider}
          onClose={() => setShowModal(false)}
          onConnected={() => {
            setShowModal(false);
            onChanged();
          }}
        />
      )}
    </div>
  );
}
