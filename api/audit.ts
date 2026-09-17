import { performWebsiteAudit } from '../src/utils/serverAudit.js';

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

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { url, device = 'mobile', categories = ['performance', 'seo', 'accessibility', 'bestPractices', 'security'] } = body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Valid website URL is required' });
    }

    const auditResult = await performWebsiteAudit(url, device, categories, null);
    return res.status(200).json({
      success: true,
      result: auditResult
    });
  } catch (err: any) {
    console.error('[Vercel Serverless] Audit execution error:', err);
    return res.status(500).json({
      error: 'Failed to complete website audit inspection',
      details: err?.message || String(err)
    });
  }
}
