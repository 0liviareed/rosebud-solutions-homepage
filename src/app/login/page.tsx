'use client';

import { useState } from 'react';
import styles from './login.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim() || loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        // Land at "/" so the middleware rewrites to the dashboard.
        window.location.href = '/';
      } else {
        setError('Incorrect password');
        setLoading(false);
      }
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
          <div className={styles.brandMark}>
            <div className={styles.brandMarkInner} />
          </div>
          <div>
            <div className={styles.brandText}>Rosebud Solutions</div>
            <div className={styles.brandSub}>Operating Infrastructure</div>
          </div>
        </div>

        <h1 className={styles.title}>
          Sign in to view <em>the engine</em>
        </h1>

        <p className={styles.subtitle}>
          Access is restricted. Enter the password you were given.
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
