"use client";

import { useState } from "react";
import type { CategoryKey, ProviderEntry } from "./providerCatalogue";
import styles from "./connections.module.css";

export default function CredentialModal({
  category,
  provider,
  onClose,
  onConnected,
}: {
  category: CategoryKey;
  provider: ProviderEntry;
  onClose: () => void;
  onConnected: () => void;
}) {
  const fields = provider.credentialFields ?? [];
  const [values, setValues] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      // Numeric fields (SMTP port) travel as strings from the form —
      // coerce before sending so the adapter's `secret.port` check works.
      const body: Record<string, string | number> = {};
      for (const f of fields) {
        body[f.key] = f.type === "number" ? Number(values[f.key]) : (values[f.key] ?? "");
      }

      const res = await fetch(`/api/connections/${category}/${provider.key}/credential`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as { ok?: boolean; reason?: string; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.reason ?? json.error ?? "Couldn't validate that credential.");
        setBusy(false);
        return;
      }
      onConnected();
    } catch {
      setError("Couldn't reach the server.");
      setBusy(false);
    }
  }

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.modalTitle}>Connect {provider.label}</div>
        <div className={styles.modalFields}>
          {fields.map((f) => (
            <label key={f.key} className={styles.modalField}>
              <span>{f.label}</span>
              <input
                type={f.type === "number" ? "number" : f.type}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                disabled={busy}
                autoComplete="off"
              />
            </label>
          ))}
        </div>
        {error && <div className={styles.inlineError}>{error}</div>}
        <div className={styles.modalActions}>
          <button type="button" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button type="button" className={styles.connectBtn} onClick={submit} disabled={busy}>
            {busy ? "Validating…" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
}
