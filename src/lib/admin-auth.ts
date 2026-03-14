const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const ADMIN_AUTH_COOKIE_NAME = 'admin-auth';
export const ADMIN_AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type AdminAuthTokenPayload = {
  exp: number;
  iat: number;
  nonce: string;
  v: 1;
};

function getAdminAuthSecret(): string | null {
  return process.env.ADMIN_AUTH_SECRET ?? process.env.ADMIN_PASSWORD ?? null;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function encodePayload(payload: AdminAuthTokenPayload): string {
  return toBase64Url(encoder.encode(JSON.stringify(payload)));
}

function decodePayload(value: string): AdminAuthTokenPayload | null {
  try {
    const parsed = JSON.parse(decoder.decode(fromBase64Url(value)));

    if (
      parsed?.v !== 1 ||
      !Number.isInteger(parsed.exp) ||
      !Number.isInteger(parsed.iat) ||
      typeof parsed.nonce !== 'string'
    ) {
      return null;
    }

    return parsed as AdminAuthTokenPayload;
  } catch {
    return null;
  }
}

async function importSigningKey(secret: string, usage: KeyUsage): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    [usage]
  );
}

async function signValue(value: string, secret: string): Promise<string> {
  const key = await importSigningKey(secret, 'sign');
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));

  return toBase64Url(new Uint8Array(signature));
}

async function verifySignature(value: string, signature: string, secret: string): Promise<boolean> {
  try {
    const key = await importSigningKey(secret, 'verify');

    return crypto.subtle.verify(
      'HMAC',
      key,
      fromBase64Url(signature),
      encoder.encode(value)
    );
  } catch {
    return false;
  }
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getAdminAuthSecret());
}

export async function createAdminAuthToken(): Promise<string> {
  const secret = getAdminAuthSecret();

  if (!secret) {
    throw new Error('Admin auth secret is not configured.');
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: AdminAuthTokenPayload = {
    exp: now + ADMIN_AUTH_COOKIE_MAX_AGE,
    iat: now,
    nonce: crypto.randomUUID(),
    v: 1,
  };
  const encodedPayload = encodePayload(payload);
  const signature = await signValue(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminAuthToken(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }

  const [encodedPayload, signature, ...extraParts] = token.split('.');
  const secret = getAdminAuthSecret();

  if (!secret || !encodedPayload || !signature || extraParts.length > 0) {
    return false;
  }

  const hasValidSignature = await verifySignature(encodedPayload, signature, secret);

  if (!hasValidSignature) {
    return false;
  }

  const payload = decodePayload(encodedPayload);

  if (!payload) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);

  if (payload.exp <= now || payload.iat > now + 60) {
    return false;
  }

  return true;
}