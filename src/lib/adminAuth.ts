import { auth } from './firebase';

export const ADMIN_EMAIL = 'abuqitmirshirazalmadani@gmail.com';
export const ADMIN_UID = 'cRAf1wZFRRXMVadj7RDaC8WM4152';

export function isUserAdmin(u: any): boolean {
  if (!u) return false;
  const email = String(u.email || '').toLowerCase().trim();
  const uid = String(u.uid || '').trim();
  return email === ADMIN_EMAIL.toLowerCase().trim() || uid === ADMIN_UID;
}

export async function getAdminAuthHeaders(
  extra: Record<string, string> = {}
): Promise<Record<string, string>> {
  const headers: Record<string, string> = { ...extra };
  try {
    const current = auth.currentUser;
    if (current && typeof current.getIdToken === 'function') {
      const token = await current.getIdToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch {
    // Let server return 401 if token retrieval fails
  }
  return headers;
}
