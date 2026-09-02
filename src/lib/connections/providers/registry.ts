// One adapter per provider — every connections route reads through this
// registry, so adding a provider later never touches route code (only a new
// adapter file + one entry here).

export type ConnectionCategory = "crm" | "calendar" | "channel";

export type ProviderMethod = "oauth" | "credential" | "guided" | "meta_oauth" | "included";

export type OAuthTokens = {
  access_token: string;
  refresh_token?: string;
  expires_at?: number; // epoch ms
  // Region-scoped providers (Zoho: eu|us|in) need this on every refresh/
  // test/revoke call, which only receive `secret` — stored here rather than
  // threading region through every adapter method signature.
  region?: string;
  // Salesforce's OAuth response returns instance_url — the actual pod host
  // for that org, which every subsequent API call must target. Persisted
  // alongside the token (not just shown on the card) since test()/refresh()
  // only ever receive `secret`, never the connections row's display field.
  instance_url?: string;
};

export type ProviderResource = { id: string; label: string };

export type TestResult = {
  healthy: boolean;
  reason?: string;
  resources?: ProviderResource[];
  // Credential-method adapters (no OAuth profile lookup) set this so the
  // credential route has something real to display on the card — e.g. a
  // verified sender email, a sending domain, a masked account id.
  externalAccountRef?: string;
};

export type ProviderAdapter = {
  category: ConnectionCategory;
  method: ProviderMethod;
  // Zoho (eu/us/in), Salesforce (production/sandbox) read this; others ignore it.
  supportsRegion?: boolean;

  // OAuth methods only.
  buildAuthUrl?(args: { connectionId: string; state: string; region?: string }): string;
  exchangeCode?(args: {
    code: string;
    region?: string;
  }): Promise<OAuthTokens & { external_account_ref: string; scopes: string[] }>;
  refresh?(secret: OAuthTokens): Promise<OAuthTokens>;
  revoke?(secret: OAuthTokens): Promise<void>;

  // Every method implements a live health read against the provider.
  test(secret: Record<string, unknown>): Promise<TestResult>;
};

export const PROVIDERS: Record<string, ProviderAdapter> = {};

export function registerProvider(key: string, adapter: ProviderAdapter): void {
  PROVIDERS[key] = adapter;
}

export function getProvider(key: string): ProviderAdapter {
  const adapter = PROVIDERS[key];
  if (!adapter) throw new Error(`Unknown connection provider: ${key}`);
  return adapter;
}
