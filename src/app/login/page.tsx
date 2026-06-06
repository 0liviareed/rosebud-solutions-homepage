'use client';

import { useRef, useState } from 'react';
import styles from './login.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const codeRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!password.trim()) {
      setError('Enter your password.');
      return;
    }
    if (!/^\d{6}$/.test(code.trim())) {
      setError('Enter the 6-digit code from your authenticator.');
      codeRef.current?.focus();
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, code: code.trim() }),
      });
      if (res.ok) {
        // Land at "/" so the middleware rewrites to the dashboard.
        window.location.href = '/';
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (body.reason === 'bad_password') setError('Incorrect password.');
      else if (body.reason === 'bad_code') setError('Invalid authenticator code.');
      else if (body.reason === 'server_misconfigured') setError('Login is temporarily unavailable.');
      else setError('Login failed. Try again.');
      setLoading(false);
    } catch {
      setError('Something went wrong. Try again.');
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.atmosphere} />
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rosebud-brand-orb.png"
            alt="Rosebud Solutions"
            className={styles.brandMark}
            width={32}
            height={32}
          />
          <div>
            <div className={styles.brandText}>Rosebud Solutions</div>
            <div className={styles.brandSub}>Operating Infrastructure</div>
          </div>
        </div>

        <h1 className={styles.title}>
          Sign in to view <em>the engine</em>
        </h1>

        <p className={styles.subtitle}>
          Same login as the warroom. Password plus the 6-digit code from your
          authenticator.
        </p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="code">Authenticator code</label>
          <input
            id="code"
            ref={codeRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            autoComplete="one-time-code"
            placeholder="123456"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.errorSlot}>
          {error && <span className={styles.error}>{error}</span>}
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <div className={styles.footer}>
          Not invited? <a href="https://rosebud.global">Visit rosebud.global</a>
        </div>
      </form>
    </div>
  );
}
