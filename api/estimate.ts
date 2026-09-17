import { generateAlgorithmicEstimate } from '../src/utils/estimatorLogic.js';

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
    const { idea, country = 'PK', projectType = 'fullstack', budget = 'medium' } = body;

    if (!idea || typeof idea !== 'string') {
      return res.status(400).json({ error: 'Project idea description is required' });
    }

    const estimate = generateAlgorithmicEstimate(idea, country, projectType, budget);
    return res.status(200).json({
      success: true,
      estimate
    });
  } catch (err: any) {
    console.error('[Vercel Serverless] Estimate execution error:', err);
    return res.status(500).json({
      error: 'Failed to generate project estimate',
      details: err?.message || String(err)
    });
  }
}
