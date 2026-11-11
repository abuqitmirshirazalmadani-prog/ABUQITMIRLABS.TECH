import { performWebsiteAudit } from '../src/utils/serverAudit.js';
import { checkAnonymousRateLimit, SsrfBlockedError } from '../src/utils/ssrfGuard.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Anonymous IP Rate Limiting
  const forwardedFor = req.headers?.['x-forwarded-for'];
  const clientIp =
    (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : '') ||
    req.socket?.remoteAddress ||
    'anonymous';

  const rateLimit = checkAnonymousRateLimit(clientIp);
  res.setHeader('X-RateLimit-Limit', String(rateLimit.limit));
  res.setHeader('X-RateLimit-Remaining', String(rateLimit.remaining));

  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: `Rate limit exceeded. Please wait ${rateLimit.retryAfterSeconds} seconds before running another website audit.`
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const {
      url,
      mode = 'complete',
      objective = 'complete',
      device = 'mobile',
      deviceSelection,
      advanced,
      categories = ['performance', 'seo', 'accessibility', 'bestPractices', 'security']
    } = body;

    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({ error: 'Valid website URL is required' });
    }

    const effectiveDeviceSelection = deviceSelection || device || 'mobile';
    const primaryDevice = effectiveDeviceSelection === 'desktop' ? 'desktop' : 'mobile';

    const auditResult = await performWebsiteAudit(url, primaryDevice, categories, null, undefined, {
      mode,
      objective,
      deviceSelection: effectiveDeviceSelection,
      advanced,
      categories
    });

    return res.status(200).json({
      success: true,
      result: auditResult
    });
  } catch (err: any) {
    if (err instanceof SsrfBlockedError || err?.name === 'SsrfBlockedError') {
      return res.status(403).json({
        error: err.message
      });
    }
    console.error('[Vercel Serverless] Audit execution error:', err);
    return res.status(400).json({
      error: err?.message || 'Failed to complete website audit inspection'
    });
  }
}
