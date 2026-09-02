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
// against Node's built-in net/tls rather than adding one, same posture as
// oauth.ts's hand-rolled HMAC state signing.

type Secret = {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  sending_domain?: string;
};

const TIMEOUT_MS = 10_000;

function readResponse(socket: net.Socket): Promise<{ code: number; text: string }> {
  return new Promise((resolve, reject) => {
    let buf = "";
    const onData = (chunk: Buffer) => {
      buf += chunk.toString("utf8");
      // Multi-line SMTP responses use "250-" continuation, final line is
      // "250 " (space, not dash) — only resolve once the final line lands.
      const lines = buf.split("\r\n").filter(Boolean);
      const last = lines[lines.length - 1];
      if (last && /^\d{3} /.test(last)) {
        cleanup();
        resolve({ code: Number(last.slice(0, 3)), text: buf });
      }
    };
    const onError = (err: Error) => {
      cleanup();
      reject(err);
    };
    function cleanup() {
      socket.off("data", onData);
      socket.off("error", onError);
    }
    socket.on("data", onData);
    socket.on("error", onError);
  });
}

function writeLine(socket: net.Socket, line: string): void {
  socket.write(`${line}\r\n`);
}

async function connectSocket(host: string, port: number): Promise<net.Socket> {
  return new Promise((resolve, reject) => {
    const socket =
      port === 465
        ? tls.connect({ host, port, timeout: TIMEOUT_MS })
        : net.connect({ host, port, timeout: TIMEOUT_MS });
    socket.once("connect", () => resolve(socket));
    socket.once("secureConnect", () => resolve(socket));
    socket.once("error", reject);
    socket.once("timeout", () => reject(new Error("Connection timed out")));
  });
}

async function upgradeToTls(socket: net.Socket, host: string): Promise<net.Socket> {
  return new Promise((resolve, reject) => {
    const secure = tls.connect({ socket, host, timeout: TIMEOUT_MS });
    secure.once("secureConnect", () => resolve(secure));
    secure.once("error", reject);
  });
}

async function checkSmtpAuth(secret: Secret): Promise<{ healthy: boolean; reason?: string }> {
  const { host, port, user, password } = secret;
  if (!host || !port || !user || !password) {
    return { healthy: false, reason: "Host, port, username, and password are all required" };
  }

  let socket: net.Socket | null = null;
  try {
    socket = await connectSocket(host, port);
    const greeting = await readResponse(socket);
    if (greeting.code !== 220) return { healthy: false, reason: `Server did not greet with 220: ${greeting.text.trim()}` };

    writeLine(socket, `EHLO ${secret.sending_domain ?? "rosebud.global"}`);
    const ehlo = await readResponse(socket);
    if (ehlo.code !== 250) return { healthy: false, reason: `EHLO rejected: ${ehlo.text.trim()}` };

    // Plaintext ports need STARTTLS before AUTH; port 465 is already TLS
    // from connectSocket().
    if (port !== 465 && /STARTTLS/i.test(ehlo.text)) {
      writeLine(socket, "STARTTLS");
      const starttls = await readResponse(socket);
      if (starttls.code !== 220) return { healthy: false, reason: `STARTTLS rejected: ${starttls.text.trim()}` };
      socket = await upgradeToTls(socket, host);
      writeLine(socket, `EHLO ${secret.sending_domain ?? "rosebud.global"}`);
      const ehlo2 = await readResponse(socket);
      if (ehlo2.code !== 250) return { healthy: false, reason: `EHLO after STARTTLS rejected: ${ehlo2.text.trim()}` };
    }

    writeLine(socket, "AUTH LOGIN");
    const authStart = await readResponse(socket);
    if (authStart.code !== 334) return { healthy: false, reason: `Server does not support AUTH LOGIN: ${authStart.text.trim()}` };

    writeLine(socket, Buffer.from(user).toString("base64"));
    const userResp = await readResponse(socket);
    if (userResp.code !== 334) return { healthy: false, reason: `Username rejected: ${userResp.text.trim()}` };

    writeLine(socket, Buffer.from(password).toString("base64"));
    const passResp = await readResponse(socket);
    if (passResp.code !== 235) return { healthy: false, reason: `Authentication failed: ${passResp.text.trim()}` };

    writeLine(socket, "QUIT");
    return { healthy: true };
  } catch (err) {
    return { healthy: false, reason: err instanceof Error ? err.message : "SMTP connection failed" };
  } finally {
    socket?.end();
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
