"use client";

export default function SignOutButton() {
  async function signOut() {
    await fetch("/api/app/logout", { method: "POST" });
    window.location.href = "/login";
  }
  return (
    <button
      type="button"
      onClick={signOut}
      style={{ font: "inherit", fontWeight: 500, padding: "9px 16px", borderRadius: 999, border: "1px solid var(--violet)", background: "var(--violet)", color: "#fff", cursor: "pointer", boxShadow: "0 6px 18px -6px rgba(91,75,182,.55)" }}
    >
      Sign out
    </button>
  );
}
