import { getCanonicalSlug } from '../src/data/canonicalRedirects';
import { resolveOptimizedCoverImage } from '../src/data/localCoverImageMap';

export type SeoFixWarningType =
  | 'external_image'
  | 'duplicate_title'
  | 'duplicate_meta'
  | 'missing_title'
  | 'missing_meta'
  | 'future_publish_date'
  | 'missing_internal_links'
  | 'leading_h1_in_content'
  | 'broken_tags';

export interface SeoFixQueueItem {
  id: string;
  slug: string;
  title: string;
  type: SeoFixWarningType;
  severity: 'warning' | 'info';
  message: string;
  suggestedFix: string;
  field: 'coverImage' | 'title' | 'metaDescription' | 'publishedAt' | 'content' | 'tags';
  currentValue?: string;
  proposedValue?: string;
  autoFixable: boolean;
  createdAt: string;
  resolved?: boolean;
  resolvedAt?: string;
}

export interface ArticleInput {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  metaDescription?: string;
  content?: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  author?: string;
  publishedAt?: string | number | Date | any;
  createdAt?: string | number | Date | any;
  tags?: string[] | string;
  published?: boolean;
  [key: string]: any;
}

export interface AutoFixResult {
  article: ArticleInput & {
    title: string;
    slug: string;
    excerpt: string;
    metaDescription: string;
    content: string;
    coverImage: string;
    coverImageAlt: string;
    category: string;
    author: string;
    publishedAt: string;
    tags: string[];
  };
  appliedFixes: string[];
  warnings: SeoFixQueueItem[];
}

const CONTEXTUAL_INTERNAL_LINK_POOL: Array<{
  keywords: RegExp;
  anchor: string;
  href: string;
  contextSentence: string;
}> = [
  {
    keywords: /\b(ai|agent|llm|rag|automation|machine learning|gpt|openai|gemini)\b/i,
    anchor: 'custom AI agent development and enterprise RAG architecture',
    href: '/ai-agent-development',
    contextSentence:
      'For engineering teams deploying production workflows, explore our blueprint on [custom AI agent development and enterprise RAG architecture](/ai-agent-development) and our [AI automation solutions](/solutions/ai-automation).',
  },
  {
    keywords: /\b(seo|search|traffic|ranking|local seo|citation|google|geo|aeo|ai overview)\b/i,
    anchor: 'Generative Engine Optimization (GEO) and technical SEO mastery',
    href: '/seo-mastery',
    contextSentence:
      'To build compounding organic visibility across Google Search and AI Overviews, review our [Generative Engine Optimization (GEO) and technical SEO mastery](/seo-mastery) framework and our [Programmatic SEO TajweedPage case study](/case-studies/tajweedpage).',
  },
  {
    keywords: /\b(mobile|flutter|react native|ios|android|app)\b/i,
    anchor: 'cross-platform and native mobile app engineering',
    href: '/mobile-app-development',
    contextSentence:
      'If you are scoping a mobile product roadmap, see our guide to [cross-platform and native mobile app engineering](/mobile-app-development) and estimate your build with our [interactive project cost estimator](/tools/project-cost-estimator).',
  },
  {
    keywords: /\b(fintech|payment|banking|pci|kyc|compliance|healthcare|hipaa|ehr)\b/i,
    anchor: 'compliance-first custom software engineering',
    href: '/custom-software',
    contextSentence:
      'Regulated platforms require strict architectural guardrails from day one—learn how we architect [compliance-first custom software engineering](/custom-software) and [enterprise fintech systems](/solutions/fintech).',
  },
  {
    keywords: /\b(brand|design|logo|ui|ux|identity|visual)\b/i,
    anchor: 'strategic brand building and UI/UX design systems',
    href: '/brand-building',
    contextSentence:
      'High-converting software pairs engineering rigor with distinctive positioning—explore our [strategic brand building and UI/UX design systems](/brand-building) and [graphics design studio](/graphics-design).',
  },
  {
    keywords: /.*/,
    anchor: 'custom web application development',
    href: '/web-development',
    contextSentence:
      'Ready to turn these engineering principles into production software? Explore our [custom web application development](/web-development) services or run a live diagnostic with our [free technical website audit tool](/tools/website-audit).',
  },
];

const STOP_WORD_TAGS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
  'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
  'would', 'shall', 'should', 'may', 'might', 'must', 'can', 'could',
  'it', 'its', 'this', 'that', 'these', 'those', 'vs', 'how', 'why', 'what',
]);

function stripOuterQuotes(val?: string): string {
  return String(val || '')
    .trim()
    .replace(/^(?:&quot;|["'“”`])+|(?:&quot;|["'“”`])+$/gi, '')
    .trim();
}

function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function humanizeSlug(slug: string): string {
  const cleaned = slug
    .replace(/^\/+|\/+$/g, '')
    .replace(/^blog\//i, '')
    .replace(/-/g, ' ')
    .trim();
  if (!cleaned) return 'Enterprise Engineering & Growth Insights';
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Extracts first # H1 or ## H2 heading from markdown content
 */
export function extractFirstHeading(markdown: string): string {
  if (!markdown) return '';
  const lines = markdown.split(/\r?\n/);
  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    const match = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (match && match[1]) {
      return match[1]
        .replace(/[*_`~]/g, '')
        .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
        .trim();
    }
  }
  return '';
}

/**
 * Generates a clean 140-160 character SEO meta description from H1/Title and opening paragraph
 */
export function generateMetaFromH1AndContent(titleOrH1: string, markdown: string): string {
  const cleanHeading = stripOuterQuotes(titleOrH1)
    .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
    .trim();

  const lines = String(markdown || '').split(/\r?\n/);
  const bodyParagraphs: string[] = [];
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const t = rawLine.trim();
    if (t.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (
      inCodeBlock ||
      !t ||
      t === '---' ||
      t.startsWith('#') ||
      t.startsWith('|') ||
      t.startsWith('![') ||
      t.startsWith('> ') ||
      /^(?:\*\*)?by\s+abu\s*qitmir/i.test(t)
    ) {
      continue;
    }
    const plain = t
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_~`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (plain.length >= 40) {
      bodyParagraphs.push(plain);
      if (bodyParagraphs.join(' ').length >= 180) break;
    }
  }

  const combined =
    bodyParagraphs.length > 0
      ? `${cleanHeading}: ${bodyParagraphs.join(' ')}`
      : `${cleanHeading} — practical 2026 engineering guide, architecture benchmarks, and implementation framework by AbuQitmirLabs.`;

  const normalized = combined.replace(/\s+/g, ' ').trim();
  if (normalized.length <= 160) return normalized;
  const sliced = normalized.slice(0, 157);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > 110 ? sliced.slice(0, lastSpace) : sliced).replace(/[.,;:-]+$/, '')}...`;
}

/**
 * Counts internal links in markdown content (relative /... or https://www.abuqitmirlabs.tech/...)
 */
export function countInternalLinksInContent(markdown: string): number {
  if (!markdown) return 0;
  const mdLinkRegex = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let count = 0;
  let match: RegExpExecArray | null;
  while ((match = mdLinkRegex.exec(markdown)) !== null) {
    const href = match[2].trim();
    if (
      (href.startsWith('/') && !href.startsWith('//')) ||
      href.startsWith('https://www.abuqitmirlabs.tech') ||
      href.startsWith('https://abuqitmirlabs.tech')
    ) {
      count++;
    }
  }
  return count;
}

/**
 * Auto-injects contextual internal links into markdown when missing
 */
export function injectContextualInternalLinks(
  markdown: string,
  title: string,
  category: string,
  currentSlug: string
): { content: string; addedCount: number } {
  const existingCount = countInternalLinksInContent(markdown);
  if (existingCount >= 2) {
    return { content: markdown, addedCount: 0 };
  }

  const combinedContext = `${title} ${category} ${markdown.slice(0, 1500)}`;
  const selectedLinks: string[] = [];

  for (const candidate of CONTEXTUAL_INTERNAL_LINK_POOL) {
    if (candidate.href.endsWith(`/${currentSlug}`)) continue;
    if (candidate.keywords.test(combinedContext) && !markdown.includes(candidate.href)) {
      selectedLinks.push(candidate.contextSentence);
      if (selectedLinks.length >= 2) break;
    }
  }

  if (selectedLinks.length === 0) {
    selectedLinks.push(
      CONTEXTUAL_INTERNAL_LINK_POOL[CONTEXTUAL_INTERNAL_LINK_POOL.length - 1].contextSentence
    );
  }

  const blockToInject = `\n\n## Related Engineering Resources\n\n${selectedLinks
    .map((s) => `- ${s}`)
    .join('\n')}\n`;

  const faqHeadingMatch = markdown.match(/\n##\s+(?:Frequently Asked Questions|FAQs?)\b/i);
  if (faqHeadingMatch && typeof faqHeadingMatch.index === 'number') {
    const idx = faqHeadingMatch.index;
    const updated = `${markdown.slice(0, idx)}${blockToInject}${markdown.slice(idx)}`;
    return { content: updated.trim(), addedCount: selectedLinks.length };
  }

  return {
    content: `${markdown.trim()}${blockToInject}`.trim(),
    addedCount: selectedLinks.length,
  };
}

/**
 * Removes leading or body `# H1` headings from markdown content and converts them to `## H2`
 * while deduplicating consecutive identical headings.
 */
export function convertContentH1ToH2(
  rawMarkdown: string,
  articleTitle: string
): { content: string; convertedCount: number } {
  if (!rawMarkdown) return { content: '', convertedCount: 0 };
  const lines = rawMarkdown.split(/\r?\n/);
  let inCodeBlock = false;
  let convertedCount = 0;

  const isMetaOrDividerLine = (lineStr: string) => {
    const t = lineStr.trim();
    return t === '' || t === '---' || /^(?:\*\*)?by\s+abu\s*qitmir/i.test(t);
  };

  while (lines.length > 0 && isMetaOrDividerLine(lines[0])) {
    lines.shift();
  }

  const transformed: string[] = [];
  const seenHeadingKeys = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      transformed.push(line);
      continue;
    }

    if (inCodeBlock) {
      transformed.push(line);
      continue;
    }

    // Match single `# Heading` (H1) and convert to `## Heading` (H2)
    if (/^#\s+/.test(trimmed)) {
      convertedCount++;
      const h1Text = trimmed
        .replace(/^#\s+/, '')
        .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
        .trim();

      // Look ahead: if there is already a `## ` heading right after, drop the redundant top `# H1`
      let lookahead = i + 1;
      while (lookahead < lines.length && isMetaOrDividerLine(lines[lookahead])) {
        lookahead++;
      }
      if (i === 0 && lookahead < lines.length && /^##\s+/.test(lines[lookahead].trim())) {
        continue;
      }

      const normKey = `h2:${h1Text.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      if (!seenHeadingKeys.has(normKey)) {
        seenHeadingKeys.add(normKey);
        transformed.push(`## ${h1Text}`);
      }
      continue;
    }

    // Also deduplicate exact duplicate H2/H3 headings inside the same article
    const hMatch = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (hMatch) {
      const level = hMatch[1];
      const text = hMatch[2].replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
      const normKey = `${level}:${text.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      if (seenHeadingKeys.has(normKey)) {
        convertedCount++;
        continue;
      }
      seenHeadingKeys.add(normKey);
      transformed.push(`${level} ${text}`);
      continue;
    }

    transformed.push(line);
  }

  if (
    transformed.length > 0 &&
    !/^#{2,6}\s+/.test(transformed[0].trim()) &&
    articleTitle
  ) {
    transformed.unshift(`## ${articleTitle}`, '');
  }

  return {
    content: transformed.join('\n').trim(),
    convertedCount,
  };
}

/**
 * Checks whether an image URL is external (not a local /images/... WebP asset)
 */
export function isExternalImageUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith('data:') || trimmed.startsWith('/')) return false;
  if (trimmed === 'https://www.abuqitmirlabs.tech/logo.png') return false;
  if (trimmed.startsWith('https://www.abuqitmirlabs.tech/images/blog-covers/')) return false;
  return /^https?:\/\//i.test(trimmed);
}

/**
 * Normalizes tags so there is zero broken single-word hashtag spam
 */
export function sanitizeArticleTags(rawTags?: string[] | string, fallbackCategory = 'AI'): string[] {
  const list = Array.isArray(rawTags)
    ? rawTags
    : typeof rawTags === 'string'
    ? rawTags.split(',')
    : [];

  const seen = new Set<string>();
  const cleaned: string[] = [];

  for (const item of list) {
    const tag = String(item || '')
      .replace(/^#+/, '')
      .replace(/["'“”`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!tag || tag.length < 2) continue;
    const lower = tag.toLowerCase();
    if (STOP_WORD_TAGS.has(lower)) continue;
    if (seen.has(lower)) continue;
    seen.add(lower);
    cleaned.push(tag);
    if (cleaned.length >= 12) break;
  }

  if (cleaned.length === 0) {
    cleaned.push(fallbackCategory || 'Software Engineering', 'AbuQitmirLabs');
  }
  return cleaned;
}

/**
 * Parses any date input and clamps future dates to today's YYYY-MM-DD
 */
export function parsePublishDateAndClampFuture(rawDate?: any): {
  dateIso: string;
  wasFuture: boolean;
  originalValue?: string;
} {
  const todayIso = new Date().toISOString().split('T')[0];
  if (!rawDate) {
    return { dateIso: todayIso, wasFuture: false };
  }

  let parsedDate: Date | null = null;
  if (typeof rawDate?.toDate === 'function') {
    parsedDate = rawDate.toDate();
  } else if (typeof rawDate?.seconds === 'number') {
    parsedDate = new Date(rawDate.seconds * 1000);
  } else if (rawDate instanceof Date) {
    parsedDate = rawDate;
  } else {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) parsedDate = d;
  }

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return { dateIso: todayIso, wasFuture: false };
  }

  const inputIso = parsedDate.toISOString().split('T')[0];
  if (inputIso > todayIso) {
    return {
      dateIso: todayIso,
      wasFuture: true,
      originalValue: inputIso,
    };
  }

  return { dateIso: inputIso, wasFuture: false };
}

/**
 * LAYER 1: Non-Blocking Auto-Fix on Save (CMS Hook)
 * Automatically fixes missing title, missing meta, future publish date,
 * missing internal links, and leading `# H1` in content.
 * Flags external images or un-resolved items as non-blocking warnings for `.fix-queue.json`.
 */
export function autoFixArticle(input: ArticleInput): AutoFixResult {
  const appliedFixes: string[] = [];
  const warnings: SeoFixQueueItem[] = [];
  const nowIso = new Date().toISOString();

  const rawContent = String(input.content || '').trim();
  const rawSlug = String(input.slug || '').trim();

  // 1. Title Missing -> Auto-set from first heading or slug
  let resolvedTitle = stripOuterQuotes(input.title)
    .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
    .trim();

  if (!resolvedTitle) {
    const extractedHeading = extractFirstHeading(rawContent);
    resolvedTitle = extractedHeading || humanizeSlug(rawSlug);
    appliedFixes.push(`Title was missing -> Auto-set to "${resolvedTitle}"`);
  }

  // Ensure canonical slug
  const baseSlug = rawSlug
    ? rawSlug.replace(/^\/+|\/+$/g, '').replace(/^blog\//i, '')
    : slugifyText(resolvedTitle);
  const resolvedSlug = getCanonicalSlug(baseSlug || slugifyText(resolvedTitle) || `article-${Date.now()}`);

  // 2. Content starts with `# H1` -> Auto-remove `# H1` and convert to `## H2`
  const h1Fix = convertContentH1ToH2(rawContent, resolvedTitle);
  let resolvedContent = h1Fix.content;
  if (h1Fix.convertedCount > 0) {
    appliedFixes.push(
      `Converted ${h1Fix.convertedCount} "# H1" / duplicate heading(s) in content to clean "## H2" hierarchy`
    );
  }

  // 3. Meta Missing -> Auto-generate from H1 / Title & opening content
  let resolvedMeta = stripOuterQuotes(input.metaDescription || input.excerpt);
  if (!resolvedMeta || resolvedMeta.length < 50) {
    resolvedMeta = generateMetaFromH1AndContent(resolvedTitle, resolvedContent);
    appliedFixes.push(`Meta description was missing/short -> Auto-generated (${resolvedMeta.length} chars)`);
  } else if (resolvedMeta.length > 160) {
    const sliced = resolvedMeta.slice(0, 157);
    const lastSpace = sliced.lastIndexOf(' ');
    resolvedMeta = `${(lastSpace > 110 ? sliced.slice(0, lastSpace) : sliced).replace(/[.,;:-]+$/, '')}...`;
    appliedFixes.push(`Clamped meta description to ${resolvedMeta.length} chars`);
  }

  const resolvedExcerpt = stripOuterQuotes(input.excerpt) || resolvedMeta;

  // 4. Publish Date in Future -> Clamp to Today's Date
  const dateCheck = parsePublishDateAndClampFuture(input.publishedAt || input.createdAt);
  const resolvedPublishedAt = dateCheck.dateIso;
  if (dateCheck.wasFuture) {
    appliedFixes.push(
      `Future publish date (${dateCheck.originalValue}) -> Auto-set to today (${resolvedPublishedAt})`
    );
  }

  // 5. Internal Links Missing -> Auto-add contextual internal links
  const linkInjection = injectContextualInternalLinks(
    resolvedContent,
    resolvedTitle,
    String(input.category || 'AI'),
    resolvedSlug
  );
  resolvedContent = linkInjection.content;
  if (linkInjection.addedCount > 0) {
    appliedFixes.push(
      `Internal links were missing -> Auto-injected ${linkInjection.addedCount} contextual internal link(s)`
    );
  }

  // 6. External Images -> Resolve if already mapped to local WebP, otherwise flag warning in .fix-queue.json
  const rawCover = String(input.coverImage || '').trim();
  const mappedLocalCover = resolveOptimizedCoverImage(rawCover, resolvedSlug);
  let resolvedCoverImage = rawCover || 'https://www.abuqitmirlabs.tech/logo.png';

  if (mappedLocalCover && mappedLocalCover.startsWith('/images/blog-covers/')) {
    if (rawCover !== `https://www.abuqitmirlabs.tech${mappedLocalCover}` && rawCover !== mappedLocalCover) {
      resolvedCoverImage = `https://www.abuqitmirlabs.tech${mappedLocalCover}`;
      appliedFixes.push(`Mapped external cover image to local WebP (${mappedLocalCover})`);
    }
  } else if (isExternalImageUrl(rawCover)) {
    warnings.push({
      id: `ext-img-${resolvedSlug}`,
      slug: resolvedSlug,
      title: resolvedTitle,
      type: 'external_image',
      severity: 'warning',
      field: 'coverImage',
      currentValue: rawCover,
      proposedValue: `/images/blog-covers/${resolvedSlug}.webp`,
      message: `Article "${resolvedTitle}" uses an external image URL (${rawCover}). Shift image to local WebP (/images/blog-covers/) for faster LCP.`,
      suggestedFix: 'Optimize & shift external cover image to local WebP in public/images/blog-covers/',
      autoFixable: true,
      createdAt: nowIso,
      resolved: false,
    });
  }

  // Also scan markdown inline images for external postimg/unsplash URLs
  const inlineImgRegex = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/gi;
  let imgMatch: RegExpExecArray | null;
  while ((imgMatch = inlineImgRegex.exec(resolvedContent)) !== null) {
    const inlineUrl = imgMatch[2];
    if (isExternalImageUrl(inlineUrl)) {
      warnings.push({
        id: `ext-inline-img-${resolvedSlug}-${warnings.length + 1}`,
        slug: resolvedSlug,
        title: resolvedTitle,
        type: 'external_image',
        severity: 'warning',
        field: 'content',
        currentValue: inlineUrl,
        proposedValue: `/images/blog-covers/${resolvedSlug}-inline.webp`,
        message: `Inline markdown image (${inlineUrl}) is hosted externally. Shift to local WebP asset.`,
        suggestedFix: 'Convert external inline markdown image to local WebP',
        autoFixable: true,
        createdAt: nowIso,
        resolved: false,
      });
    }
  }

  const resolvedTags = sanitizeArticleTags(input.tags, String(input.category || 'AI'));
  const resolvedCoverAlt =
    stripOuterQuotes(input.coverImageAlt) || `${resolvedTitle} — Engineering Guide by AbuQitmirLabs`;

  return {
    article: {
      ...input,
      title: resolvedTitle,
      slug: resolvedSlug,
      excerpt: resolvedExcerpt,
      metaDescription: resolvedMeta,
      content: resolvedContent,
      coverImage: resolvedCoverImage,
      coverImageAlt: resolvedCoverAlt,
      category: String(input.category || 'AI').trim() || 'AI',
      author: String(input.author || 'Abu Qitmir Mohammad Shiraz Al-Madani').trim(),
      publishedAt: resolvedPublishedAt,
      tags: resolvedTags,
    },
    appliedFixes,
    warnings,
  };
}
