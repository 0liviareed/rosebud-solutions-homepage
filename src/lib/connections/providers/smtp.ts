import net from "net";
import tls from "tls";
import { registerProvider, type ProviderAdapter } from "./registry";

// SMTP — Method B (credential), §5.1: "SMTP host, user, password, and
// sending domain. Server verifies SPF / DKIM on the domain." This file does
// the live credential check (AUTH LOGIN handshake); SPF verification is a
// separate route (verify-domain) since it's a DNS check, not a connection
// check, and needs to be re-runnable on its own while the client fixes DNS
// records without re-entering the password.
//
// No existing SMTP/mail library in this repo's dependencies — hand-rolled
// rather than adding one, same posture as oauth.ts's hand-rolled HMAC state
// signing.
//
// TRANSPORT — two runtimes, one handshake (validated 2026-09-06):
//  - Cloudflare Workers (production, OpenNext): the `nodejs_compat` shim for
//    node:tls cannot upgrade an existing socket — `tls.connect({ socket })`
//    dies inside workerd with "Cannot call releaseLock() on a reader with
//    outstanding read promises", so every port-587 STARTTLS check failed
//    (Gmail, Zoho, Office 365 all reproduced). Implicit TLS on 465 worked.
//    Fix: on Workers use the native `cloudflare:sockets` connect() with
//    secureTransport "starttls" + socket.startTls(), which is the supported
//    upgrade path. Port 25 is blocked outbound on Workers — surfaced as a
//    clear reason rather than a 10s timeout.
//  - Node (next dev, any Node host): node:net / node:tls as before.

type Secret = {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  sending_domain?: string;
};

const TIMEOUT_MS = 10_000;

type SmtpResponse = { code: number; text: string };

// Minimal line-oriented transport: the handshake below only ever needs to
// write one line and wait for one (possibly multi-line) reply in lockstep.
type Transport = {
  read(): Promise<SmtpResponse>;
  write(line: string): Promise<void>;
  startTls(): Promise<void>;
  close(): Promise<void>;
};

function withTimeout<T>(promise: Promise<T>, what: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${what} timed out`)), TIMEOUT_MS);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

// Multi-line SMTP responses use "250-" continuation, final line is "250 "
// (space, not dash) — a reply is only complete once the final line lands.
function parseComplete(buf: string): SmtpResponse | null {
  const lines = buf.split("\r\n").filter(Boolean);
  const last = lines[lines.length - 1];
  if (last && /^\d{3} /.test(last)) return { code: Number(last.slice(0, 3)), text: buf };
  return null;
}

// ---------------------------------------------------------------------------
// Cloudflare Workers transport (cloudflare:sockets)
// ---------------------------------------------------------------------------

type CfSocket = {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;
  opened: Promise<unknown>;
  closed: Promise<void>;
  close(): Promise<void>;
  startTls(): CfSocket;
};
type CfSockets = {
  connect(
    address: { hostname: string; port: number },
    options?: { secureTransport?: "off" | "on" | "starttls"; allowHalfOpen?: boolean }
  ): CfSocket;
};

async function loadCloudflareSockets(): Promise<CfSockets | null> {
  if (typeof navigator === "undefined" || navigator.userAgent !== "Cloudflare-Workers") return null;
  // The build passes through Turbopack (next build), then OpenNext's esbuild,
  // then wrangler's esbuild — none of them can resolve `cloudflare:sockets`
  // (workerd provides it at runtime). `turbopackIgnore` stops Turbopack
  // resolving it; the `.catch()` is what makes OpenNext's esbuild (which has
  // no externals hook) leave the unresolved import in place instead of
  // failing the build — esbuild's documented escape hatch for dynamic
  // imports. Don't "simplify" it away. wrangler treats `cloudflare:*` as
  // external natively.
  const mod = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ "cloudflare:sockets").catch(() => null);
  return mod as CfSockets | null;
}

async function openCloudflareTransport(sockets: CfSockets, host: string, port: number): Promise<Transport> {
  if (port === 25) throw new Error("Port 25 is blocked from this host — use 465 (TLS) or 587 (STARTTLS)");

  let socket = sockets.connect({ hostname: host, port }, { secureTransport: port === 465 ? "on" : "starttls" });
  await withTimeout(socket.opened, "Connection");
  let reader = socket.readable.getReader();
  let writer = socket.writable.getWriter();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buf = "";

  return {
    async read() {
      for (;;) {
        const done = parseComplete(buf);
        if (done) {
          buf = "";
          return done;
        }
        const chunk = await withTimeout(reader.read(), "Read");
        if (chunk.done) throw new Error("Connection closed by server");
        buf += decoder.decode(chunk.value, { stream: true });
      }
    },
    async write(line) {
      await withTimeout(writer.write(encoder.encode(`${line}\r\n`)), "Write");
    },
    async startTls() {
      // startTls() closes the plaintext socket; its reader/writer must be
      // released first and fresh ones taken from the secure socket. No read
      // is ever outstanding here — read() only returns once a reply completes.
      reader.releaseLock();
      writer.releaseLock();
      socket = socket.startTls();
      await withTimeout(socket.opened, "TLS handshake");
      reader = socket.readable.getReader();
      writer = socket.writable.getWriter();
      buf = "";
    },
    async close() {
      try {
        reader.releaseLock();
        writer.releaseLock();
      } catch {
        // A timed-out read still holds the lock — close() below tears it down.
      }
      try {
        await socket.close();
      } catch {
        // Already closed by the server after QUIT — nothing to do.
      }
    },
  };
}

// ---------------------------------------------------------------------------
// Node transport (node:net / node:tls)
// ---------------------------------------------------------------------------

async function openNodeTransport(host: string, port: number): Promise<Transport> {
  let socket: net.Socket = await new Promise((resolve, reject) => {
    const s =
      port === 465
        ? tls.connect({ host, port, servername: host, timeout: TIMEOUT_MS })
        : net.connect({ host, port, timeout: TIMEOUT_MS });
    s.once("connect", () => resolve(s));
    s.once("secureConnect", () => resolve(s));
    s.once("error", reject);
    s.once("timeout", () => reject(new Error("Connection timed out")));
  });

  let buf = "";
  let waiter: { resolve: (r: SmtpResponse) => void; reject: (e: Error) => void } | null = null;

  const flush = () => {
    if (!waiter) return;
    const done = parseComplete(buf);
    if (!done) return;
    buf = "";
    const w = waiter;
    waiter = null;
    w.resolve(done);
  };
  const fail = (err: Error) => {
    const w = waiter;
    waiter = null;
    w?.reject(err);
  };
  const onData = (chunk: Buffer) => {
    buf += chunk.toString("utf8");
    flush();
  };
  const onError = (err: Error) => fail(err);
  const onClose = () => fail(new Error("Connection closed by server"));
  const attach = (s: net.Socket) => {
    s.on("data", onData);
    s.on("error", onError);
    s.on("close", onClose);
  };
  const detach = (s: net.Socket) => {
    s.off("data", onData);
    s.off("error", onError);
    s.off("close", onClose);
  };
  attach(socket);

  return {
    read() {
      return withTimeout(
        new Promise<SmtpResponse>((resolve, reject) => {
          waiter = { resolve, reject };
          flush();
        }),
        "Read"
      );
    },
    async write(line) {
      socket.write(`${line}\r\n`);
    },
    async startTls() {
      detach(socket);
      const secure: tls.TLSSocket = await withTimeout(
        new Promise((resolve, reject) => {
          const s = tls.connect({ socket, host, servername: host });
          s.once("secureConnect", () => resolve(s));
          s.once("error", reject);
        }),
        "TLS handshake"
      );
      socket = secure;
      buf = "";
      attach(socket);
    },
    async close() {
      detach(socket);
      socket.end();
    },
  };
}

// ---------------------------------------------------------------------------
// Handshake
// ---------------------------------------------------------------------------

async function checkSmtpAuth(secret: Secret): Promise<{ healthy: boolean; reason?: string }> {
  const { host, port, user, password } = secret;
  if (!host || !port || !user || !password) {
    return { healthy: false, reason: "Host, port, username, and password are all required" };
  }
  const ehloName = secret.sending_domain ?? "rosebud.global";

  let transport: Transport | null = null;
  try {
    const cf = await loadCloudflareSockets();
    transport = cf ? await openCloudflareTransport(cf, host, port) : await openNodeTransport(host, port);

    const greeting = await transport.read();
    if (greeting.code !== 220) return { healthy: false, reason: `Server did not greet with 220: ${greeting.text.trim()}` };

    await transport.write(`EHLO ${ehloName}`);
    const ehlo = await transport.read();
    if (ehlo.code !== 250) return { healthy: false, reason: `EHLO rejected: ${ehlo.text.trim()}` };

    // Plaintext ports need STARTTLS before AUTH; port 465 is already TLS.
    // A server that doesn't offer STARTTLS never gets the password — AUTH
    // LOGIN is base64, not encryption.
    if (port !== 465) {
      if (!/STARTTLS/i.test(ehlo.text)) {
        return { healthy: false, reason: "Server does not offer STARTTLS — refusing to send credentials in plaintext (use port 465 or 587)" };
      }
      await transport.write("STARTTLS");
      const starttls = await transport.read();
      if (starttls.code !== 220) return { healthy: false, reason: `STARTTLS rejected: ${starttls.text.trim()}` };
      await transport.startTls();
      await transport.write(`EHLO ${ehloName}`);
      const ehlo2 = await transport.read();
      if (ehlo2.code !== 250) return { healthy: false, reason: `EHLO after STARTTLS rejected: ${ehlo2.text.trim()}` };
    }

    await transport.write("AUTH LOGIN");
    const authStart = await transport.read();
    if (authStart.code !== 334) return { healthy: false, reason: `Server does not support AUTH LOGIN: ${authStart.text.trim()}` };

    await transport.write(Buffer.from(user).toString("base64"));
    const userResp = await transport.read();
    if (userResp.code !== 334) return { healthy: false, reason: `Username rejected: ${userResp.text.trim()}` };

    await transport.write(Buffer.from(password).toString("base64"));
    const passResp = await transport.read();
    if (passResp.code !== 235) return { healthy: false, reason: `Authentication failed: ${passResp.text.trim()}` };

    await transport.write("QUIT");
    return { healthy: true };
  } catch (err) {
    return { healthy: false, reason: err instanceof Error ? err.message : "SMTP connection failed" };
  } finally {
    await transport?.close();
  }
}

const adapter: ProviderAdapter = {
  category: "channel",
  method: "credential",

  async test(secret: Secret) {
    const result = await checkSmtpAuth(secret);
    if (!result.healthy) return result;
    return {
      healthy: true,
      externalAccountRef: secret.sending_domain ? `${secret.user}@ (${secret.sending_domain})` : secret.user,
    };
  },
};

registerProvider("channel:smtp", adapter);
export default adapter;
