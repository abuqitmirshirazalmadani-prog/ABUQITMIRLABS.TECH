import { GoogleGenAI } from '@google/genai';
import { generateAlgorithmicChecklist } from '../src/utils/seoChecklistGenerator.js';

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

  let body: any = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch (e) {
    body = req.body || {};
  }

  const { businessType, industry, stage, goal, teamSize, time } = body;

  if (!businessType || !industry || !stage || !goal) {
    return res.status(400).json({ error: 'Business type, industry, stage, and goal are required' });
  }

  // Check if Gemini API key exists
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.trim() !== '') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
You are a senior SEO strategist at AbuQitmirLabs. Generate a personalized, step-by-step SEO checklist for this business.

BUSINESS PROFILE:
- Business Type: ${businessType}
- Industry: ${industry}
- Website Stage: ${stage}
- Primary Goal: ${goal}
- Team Size: ${teamSize || 'not specified'}
- Weekly Time Available: ${time || 'not specified'}

REQUIREMENTS:
- Generate 40-55 actionable SEO tasks organized across 6 distinct phases:
  1. Phase 1: Foundation & Technical Setup (Weeks 1-2)
  2. Phase 2: On-Page Optimization & Core Web Vitals (Weeks 3-4)
  3. Phase 3: Content Architecture & E-E-A-T Signals (Weeks 5-8)
  4. Phase 4: Off-Page Authority & Digital PR (Weeks 9-12)
  5. Phase 5: Niche / Local / E-commerce Vertical Optimization (Weeks 10-14)
  6. Phase 6: Monitoring, AI Engine Optimization (GEO/AIO) & SXO (Ongoing)
- Each task must have: id, title, description, priority ("high"|"medium"|"low"), estimatedTime, impact, howTo, tools (array of strings).
- Provide topPriorities (array of 3 items with title & reason), expectedImpact, commonMistakes (array of 4-5 strings), and quickWins (array of 4 strings).

Return ONLY valid JSON with this exact structure:
{
  "totalTasks": 42,
  "estimatedWeeks": 12,
  "priorityTasks": 14,
  "phases": [
    {
      "id": "phase-1",
      "icon": "📋",
      "title": "Phase 1: Foundation & Technical Setup",
      "description": "Establish search engine tracking, indexing protocols, and site speed benchmarks.",
      "timeframe": "Weeks 1-2",
      "tasks": [
        {
          "id": "f-1",
          "title": "Setup Google Search Console",
          "description": "Verify domain ownership and submit XML sitemap.",
          "priority": "high",
          "estimatedTime": "30 mins",
          "impact": "Critical",
          "howTo": "1. Go to search.google.com/search-console. 2. Verify via DNS.",
          "tools": ["Google Search Console"]
        }
      ]
    }
  ],
  "topPriorities": [
    {
      "title": "Core Web Vitals Optimization",
      "reason": "Direct ranking signal for mobile search."
    }
  ],
  "expectedImpact": "...",
  "commonMistakes": ["..."],
  "quickWins": ["..."]
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '';
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        parsed.businessType = businessType;
        parsed.industry = industry;
        parsed.stage = stage;
        parsed.goal = goal;
        parsed.teamSize = teamSize;
        parsed.time = time;
        parsed.generatedAt = new Date().toISOString();
        parsed.source = 'ai';

        return res.status(200).json({ success: true, checklist: parsed });
      }
    } catch (aiErr) {
      console.warn('[Vercel Serverless] Gemini generation failed, switching to algorithmic checklist engine:', aiErr);
    }
  }

  // Fallback to high-precision algorithmic engine
  const checklist = generateAlgorithmicChecklist(businessType, industry, stage, goal, teamSize, time);
  return res.status(200).json({
    success: true,
    checklist
  });
}
