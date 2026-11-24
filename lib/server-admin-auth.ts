import fs from 'fs';
import path from 'path';

const DEFAULT_ADMIN_EMAIL = 'abuqitmirshirazalmadani@gmail.com';
const DEFAULT_ADMIN_UID = 'cRAf1wZFRRXMVadj7RDaC8WM4152';

interface FirebaseConfigLike {
  apiKey?: string;
  projectId?: string;
}

let cachedFirebaseConfig: FirebaseConfigLike | null = null;

function loadFirebaseConfig(): FirebaseConfigLike {
  if (cachedFirebaseConfig) return cachedFirebaseConfig;

  const candidates = [
    path.join(process.cwd(), 'firebase-applet-config.json'),
    path.resolve(process.cwd(), 'firebase-applet-config.json'),
  ];

  for (const cfgPath of candidates) {
    try {
      if (fs.existsSync(cfgPath)) {
        const parsed = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
        cachedFirebaseConfig = parsed;
        return parsed;
      }
    } catch {
      // Try next candidate
    }
  }

  return {
    apiKey: process.env.FIREBASE_API_KEY || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
  };
}

function getAllowedAdmins(): { emails: Set<string>; uids: Set<string> } {
  const extraEmails = String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const extraUids = String(process.env.ADMIN_UIDS || '')
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean);

  return {
    emails: new Set([DEFAULT_ADMIN_EMAIL.toLowerCase(), ...extraEmails]),
    uids: new Set([DEFAULT_ADMIN_UID, ...extraUids]),
  };
}

export interface AdminAuthResult {
  ok: boolean;
  status: number;
  error?: string;
  uid?: string;
  email?: string;
}

export async function verifyAdminRequest(req: any): Promise<AdminAuthResult> {
  try {
    const authHeader =
      String(req?.headers?.authorization || req?.headers?.Authorization || '').trim();

    if (!authHeader.toLowerCase().startsWith('bearer ')) {
      return { ok: false, status: 401, error: 'Authentication required' };
    }

    const idToken = authHeader.slice(7).trim();
    if (!idToken || idToken.length < 20 || idToken.length > 8192) {
      return { ok: false, status: 401, error: 'Invalid authentication token' };
    }

    const cfg = loadFirebaseConfig();
    const apiKey = String(cfg.apiKey || process.env.FIREBASE_API_KEY || '').trim();
    if (!apiKey) {
      return {
        ok: false,
        status: 500,
        error: 'Server authentication configuration unavailable',
      };
    }

    const lookupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!lookupRes.ok) {
      return { ok: false, status: 401, error: 'Invalid or expired authentication session' };
    }

    const lookupData: any = await lookupRes.json();
    const user = Array.isArray(lookupData?.users) ? lookupData.users[0] : null;
    if (!user || user.disabled) {
      return { ok: false, status: 401, error: 'Invalid or disabled user account' };
    }

    const uid = String(user.localId || '').trim();
    const email = String(user.email || '').trim().toLowerCase();
    const emailVerified = Boolean(user.emailVerified);

    const { emails, uids } = getAllowedAdmins();
    const isAuthorizedUid = uid !== '' && uids.has(uid);
    const isAuthorizedEmail = email !== '' && emailVerified && emails.has(email);

    if (!isAuthorizedUid && !isAuthorizedEmail) {
      return {
        ok: false,
        status: 403,
        error: 'Forbidden: Administrator privileges required',
      };
    }

    return { ok: true, status: 200, uid, email };
  } catch {
    return { ok: false, status: 401, error: 'Authentication verification failed' };
  }
}

export function isSafeAdminSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug) && slug.length <= 200;
}
