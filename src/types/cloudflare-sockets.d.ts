// Minimal ambient declaration for the Workers-native TCP socket module, used
// by src/lib/connections/providers/smtp.ts for the STARTTLS upgrade that
// workerd's node:tls shim cannot do. The repo doesn't depend on
// @cloudflare/workers-types (no `wrangler types` output either), so declare
// just the surface we call. Full API:
// https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/
declare module "cloudflare:sockets" {
  export type SocketAddress = { hostname: string; port: number };
  export type SocketOptions = {
    secureTransport?: "off" | "on" | "starttls";
    allowHalfOpen?: boolean;
  };
  export type Socket = {
    readable: ReadableStream<Uint8Array>;
    writable: WritableStream<Uint8Array>;
    opened: Promise<unknown>;
    closed: Promise<void>;
    close(): Promise<void>;
    startTls(): Socket;
  };
  export function connect(address: SocketAddress | string, options?: SocketOptions): Socket;
}
