import { GoogleGenAI } from '@google/genai';
import { calculateScores, getReadinessLevel, getFallbackResult } from '../src/utils/aiReadinessEngine.js';

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

  const { answers, form } = body;

  if (!answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ error: 'Assessment answers are required' });
  }

  const { categoryResults, overallScore } = calculateScores(answers);
  const readinessLevel = getReadinessLevel(overallScore);
  const fallbackResult = getFallbackResult(answers, form || {});

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.trim() !== '') {
    try {
      const ai = new GoogleGenAI({ apiKey });

      const categorySummary = categoryResults
        .map((c) => `- ${c.title}: ${c.score}/100 (weight: ${c.weight}%)`)
        .join('\n');

      const prompt = `You are a senior AI strategist at AbuQitmirLabs. Analyze this business's AI readiness and provide a personalized strategic assessment.

BUSINESS PROFILE:
- Company Name: ${form?.companyName || 'Not specified'}
- Industry Vertical: ${form?.industry || 'General Business'}
- Team Size: ${form?.teamSize || 'Unspecified'}
- Current AI Usage Level: ${form?.currentAiUsage || 'Exploring'}

DETERMINISTIC COMPUTED BENCHMARKS:
- Overall AI Readiness Score: ${overallScore}/100
- Readiness Level: ${readinessLevel}

Category Scores:
${categorySummary}

TASK:
Generate a personalized AI readiness report as JSON. Base your strategic insights strictly on the calculated category scores above.
Provide:
1. scoreSummary: 2-3 sentence personalized summary of their AI readiness for ${form?.industry || 'their industry'}.
2. categoryScores: array with the exact scores provided above plus tailored 1-sentence feedback for each of the 6 categories.
3. strengths: 3-4 genuine strengths based on high-scoring categories.
4. gaps: 3-4 genuine gaps based on low-scoring categories.
5. roadmap: 3-phase roadmap (title, duration, goal, 4 specific actions, metrics) tailored to score level and ${form?.industry || 'business'}.
6. recommendedTools: 3 tool categories with 4 tools each.
7. nextSteps: Top 5 prioritized 30-day action steps (title, description).

Return ONLY valid JSON matching this schema:
{
  "scoreSummary": "string",
  "categoryScores": [
    { "id": "data", "icon": "📊", "title": "Data Infrastructure", "score": ${categoryResults[0]?.score || 50}, "weight": 25, "feedback": "string" }
  ],
  "strengths": ["string", "string", "string"],
  "gaps": ["string", "string", "string"],
  "roadmap": [
    {
      "title": "Phase 1: ...",
      "duration": "...",
      "goal": "...",
      "actions": ["...", "...", "...", "..."],
      "metrics": "..."
    }
  ],
  "recommendedTools": [
    { "icon": "🤖", "category": "...", "tools": ["...", "..."] }
  ],
  "nextSteps": [
    { "title": "...", "description": "..." }
  ]
}`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      });

      const rawText = aiResponse.text || '';
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const finalResult = {
          overallScore,
          readinessLevel,
          scoreSummary: parsed.scoreSummary || fallbackResult.scoreSummary,
          categoryScores: categoryResults.map((cat) => {
            const aiCat = parsed.categoryScores?.find((c: any) => c.id === cat.id);
            return {
              ...cat,
              feedback: aiCat?.feedback || cat.feedback
            };
          }),
          strengths: parsed.strengths && parsed.strengths.length ? parsed.strengths : fallbackResult.strengths,
          gaps: parsed.gaps && parsed.gaps.length ? parsed.gaps : fallbackResult.gaps,
          roadmap: parsed.roadmap && parsed.roadmap.length ? parsed.roadmap : fallbackResult.roadmap,
          recommendedTools: parsed.recommendedTools && parsed.recommendedTools.length ? parsed.recommendedTools : fallbackResult.recommendedTools,
          nextSteps: parsed.nextSteps && parsed.nextSteps.length ? parsed.nextSteps : fallbackResult.nextSteps,
          generatedAt: new Date().toISOString(),
          source: 'ai'
        };

        return res.json({ success: true, result: finalResult });
      }
    } catch (geminiError: any) {
      console.warn('Gemini AI readiness generation error; serving algorithmic baseline:', geminiError.message || geminiError);
    }
  }

  // Graceful fallback
  return res.json({
    success: true,
    result: fallbackResult,
    source: 'algorithmic'
  });
}
