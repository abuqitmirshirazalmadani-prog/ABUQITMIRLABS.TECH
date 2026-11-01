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
  issueType?: SeoFixWarningType;
  severity: 'warning' | 'info';
  message: string;
  suggestedFix: string;
  field: 'coverImage' | 'title' | 'metaDescription' | 'publishedAt' | 'content' | 'tags';
  currentValue?: string;
  proposedValue?: string;
  suggestedValue?: string;
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
  fixedActions: string[];
  warnings: SeoFixQueueItem[];
  unfixedWarnings: SeoFixQueueItem[];
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

const LEGACY_INTERNAL_PATH_MAP: Record<string, string> = {
  '/services/custom-software': '/custom-software',
  '/services/web-development': '/web-development',
  '/services/mobile-app-development': '/mobile-app-development',
  '/services/ai-agent-development': '/ai-agent-development',
  '/services/ai-agents': '/ai-agent-development',
  '/services/seo': '/seo-mastery',
  '/services/seo-mastery': '/seo-mastery',
  '/services/digital-marketing': '/digital-marketing',
  '/services/brand-building': '/brand-building',
  '/services/content-writing': '/content-writing',
  '/services/graphics-design': '/graphics-design',
  '/case-studies/tajweed-page': '/case-studies/tajweedpage',
  '/contact-us': '/contact',
  '/book-call': '/contact',
};

/**
 * Normalizes internal links in markdown without altering the author's anchor text or placement:
 * 1. Converts full https://www.abuqitmirlabs.tech/... links to clean relative canonical paths (/...)
 * 2. Resolves legacy /blog/<old-slug> links via getCanonicalSlug and legacy /services/... paths
 */
export function normalizeExistingInternalLinks(markdown: string): {
  content: string;
  normalizedCount: number;
} {
  if (!markdown) return { content: '', normalizedCount: 0 };
  let normalizedCount = 0;

  const updated = String(markdown).replace(
    /\[([^\]]+)\]\(([^)\s]+)(\s+"[^"]*")?\)/g,
    (fullMatch, anchorText, rawHref, titleAttr = '') => {
      let href = String(rawHref || '').trim();
      const origHref = href;

      if (/^https?:\/\/(?:www\.)?abuqitmirlabs\.tech$/i.test(href)) {
        href = '/';
      } else if (/^https?:\/\/(?:www\.)?abuqitmirlabs\.tech(\/[^#\s?]*)(.*)$/i.test(href)) {
        href = href.replace(/^https?:\/\/(?:www\.)?abuqitmirlabs\.tech/i, '');
      }

      if (href.startsWith('/') && !href.startsWith('//')) {
        const [pathPart, hashOrQuery = ''] = href.split(/(?=[#?])/);
        const cleanPath = pathPart.length > 1 ? pathPart.replace(/\/+$/, '') : pathPart;
        const lowerPath = cleanPath.toLowerCase();

        if (LEGACY_INTERNAL_PATH_MAP[lowerPath]) {
          href = `${LEGACY_INTERNAL_PATH_MAP[lowerPath]}${hashOrQuery}`;
        } else if (lowerPath.startsWith('/blog/')) {
          const rawBlogSlug = cleanPath.slice('/blog/'.length);
          const canonBlogSlug = getCanonicalSlug(rawBlogSlug);
          href = `/blog/${canonBlogSlug}${hashOrQuery}`;
        } else {
          href = `${cleanPath}${hashOrQuery}`;
        }
      }

      if (href !== origHref) {
        normalizedCount++;
        return `[${anchorText}](${href}${titleAttr})`;
      }
      return fullMatch;
    }
  );

  return { content: updated, normalizedCount };
}

/**
 * Preserves all existing internal links placed by the author, normalizes non-canonical internal URLs,
 * and surgically appends only missing core SEO/GEO entity links if they are not already present.
 */
export function injectContextualInternalLinks(
  markdown: string,
  title: string,
  category: string,
  currentSlug: string
): { content: string; addedCount: number } {
  const { content: normalizedMd, normalizedCount } = normalizeExistingInternalLinks(markdown);
  let addedCount = normalizedCount;

  const hasHref = (md: string, targetPath: string): boolean => {
    const escaped = targetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rx = new RegExp(`\\]\\((?:https?:\\/\\/(?:www\\.)?abuqitmirlabs\\.tech)?${escaped}(?:[\\/#?\\s)]|$)`, 'i');
    return rx.test(md);
  };

  const missingCoreSnippets: string[] = [];
  if (!hasHref(normalizedMd, '/custom-software')) {
    missingCoreSnippets.push('[custom software engineering](/custom-software)');
  }
  if (!hasHref(normalizedMd, '/ai-agent-development')) {
    missingCoreSnippets.push('[AI agent development](/ai-agent-development)');
  }
  if (!hasHref(normalizedMd, '/contact')) {
    missingCoreSnippets.push('[book a strategy diagnostic](/contact)');
  }

  const existingCount = countInternalLinksInContent(normalizedMd);
  if (existingCount >= 3 && missingCoreSnippets.length === 0) {
    return { content: normalizedMd, addedCount };
  }

  const selectedBlocks: string[] = [];

  if (missingCoreSnippets.length > 0) {
    const formattedList =
      missingCoreSnippets.length === 1
        ? missingCoreSnippets[0]
        : missingCoreSnippets.length === 2
        ? `${missingCoreSnippets[0]} and ${missingCoreSnippets[1]}`
        : `${missingCoreSnippets[0]}, ${missingCoreSnippets[1]}, or ${missingCoreSnippets[2]}`;
    selectedBlocks.push(
      `For teams scaling production architecture, explore our ${formattedList} with AbuQitmirLabs.`
    );
    addedCount += missingCoreSnippets.length;
  }

  const combinedContext = `${title} ${category} ${normalizedMd.slice(0, 1500)}`;
  if (existingCount + missingCoreSnippets.length < 3) {
    for (const candidate of CONTEXTUAL_INTERNAL_LINK_POOL) {
      if (candidate.href.endsWith(`/${currentSlug}`)) continue;
      if (candidate.keywords.test(combinedContext) && !hasHref(normalizedMd, candidate.href)) {
        selectedBlocks.push(candidate.contextSentence);
        addedCount++;
        if (existingCount + addedCount >= 3) break;
      }
    }
  }

  if (selectedBlocks.length === 0) {
    return { content: normalizedMd, addedCount };
  }

  const blockToInject = `\n\n${selectedBlocks.join('\n\n')}\n`;

  const faqHeadingMatch = normalizedMd.match(/\n##\s+(?:Frequently Asked Questions|FAQs?)\b/i);
  if (faqHeadingMatch && typeof faqHeadingMatch.index === 'number') {
    const idx = faqHeadingMatch.index;
    const updated = `${normalizedMd.slice(0, idx)}${blockToInject}${normalizedMd.slice(idx)}`;
    return { content: updated.trim(), addedCount };
  }

  return {
    content: `${normalizedMd.trim()}${blockToInject}`.trim(),
    addedCount,
  };
}

/**
 * Surgically cleans H1/H2/H3 hierarchy for SEO, AEO (Answer Engine Optimization), and GEO
 * while preserving the author's original content, intro paragraphs, and structure:
 * 1. Strips duplicate top `# H1` if it repeats the article title; converts other `# H1` in body to `## H2`.
 * 2. Preserves opening AEO direct-answer paragraphs before the first `## H2` (never prepends a duplicate title H2 if body already has H2s).
 * 3. Fixes skipped heading levels (e.g. H2 -> H4 without H3) and capitalizes accidental lowercase heading starts (`## introduction` -> `## Introduction`).
 * 4. Disambiguates duplicate H2/H3 headings using parent section context instead of deleting the author's headings.
 * 5. Converts bold question lines inside FAQ sections into `### Question?` so AEO `FAQPage` schema extracts them cleanly.
 */
export function convertContentH1ToH2(
  rawMarkdown: string,
  articleTitle: string
): { content: string; convertedCount: number } {
  if (!rawMarkdown) return { content: '', convertedCount: 0 };
  const lines = rawMarkdown.split(/\r?\n/);
  let inCodeBlock = false;
  let convertedCount = 0;

  const cleanArticleTitle = String(articleTitle || '')
    .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
    .trim();
  const normArticleTitle = cleanArticleTitle.toLowerCase().replace(/[^a-z0-9]/g, '');

  const isMetaOrDividerLine = (lineStr: string) => {
    const t = lineStr.trim();
    return t === '' || t === '---' || /^(?:\*\*)?by\s+abu\s*qitmir/i.test(t);
  };

  while (lines.length > 0 && isMetaOrDividerLine(lines[0])) {
    lines.shift();
  }

  // Check if the body already has any H2/H3 headings
  let bodyHasH2 = false;
  let h2BeforeFaq = 0;
  let h3BeforeFaq = 0;
  let scanCode = false;
  let scanFaq = false;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t.startsWith('```')) {
      scanCode = !scanCode;
      continue;
    }
    if (scanCode) continue;
    if (/^#{2,3}\s+(?:frequently asked questions|faqs?\b)/i.test(t)) {
      scanFaq = true;
      bodyHasH2 = true;
      continue;
    }
    if (/^##\s+/.test(t)) {
      bodyHasH2 = true;
      if (!scanFaq) h2BeforeFaq++;
    } else if (/^###\s+/.test(t) && !scanFaq) {
      h3BeforeFaq++;
    }
  }

  // Only promote body H3 -> H2 if the author wrote the entire article with 0 H2s and >= 3 H3s
  const shouldPromoteOrphanH3s = h2BeforeFaq === 0 && h3BeforeFaq >= 3;

  const transformed: string[] = [];
  const seenHeadingCounts = new Map<string, number>();
  let lastParentH2 = '';
  let lastHeadingLevel = 1;
  let inFaqSection = false;
  let lastAddedHeadingNorm = '';

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

    // Clean raw GFM task list syntax: `- [ ] Done when:` -> `- **Done when:**`
    if (/^[-*+]\s+\[[ xX]\]\s+/.test(trimmed)) {
      convertedCount++;
      const indent = (line.match(/^(\s*)/) || ['', ''])[1];
      const cleanedItem = trimmed
        .replace(/^([-*+])\s+\[[ xX]\]\s+/, '$1 ')
        .replace(/^([-*+]\s+)Done when:\s*/i, '$1**Done when:** ');
      transformed.push(`${indent}${cleanedItem}`);
      continue;
    }

    // Inside FAQ section, promote bold standalone questions `**Question?**` to `### Question?` for AEO FAQPage schema
    if (inFaqSection && /^\*\*[^*]+\?\*\*\s*$/.test(trimmed)) {
      const qText = trimmed.replace(/^\*\*|\*\*\s*$/g, '').trim();
      transformed.push(`### ${qText}`);
      lastHeadingLevel = 3;
      convertedCount++;
      continue;
    }

    // Handle any markdown heading (# to ####)
    const hMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (hMatch) {
      let hashes = hMatch[1];
      let text = hMatch[2].replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
      const textNorm = text.toLowerCase().replace(/[^a-z0-9]/g, '');

      // 1. If `# Heading` (H1) appears in markdown content:
      if (hashes === '#') {
        convertedCount++;
        const isSameAsTitle =
          normArticleTitle.length > 0 &&
          (textNorm === normArticleTitle ||
            textNorm.includes(normArticleTitle) ||
            normArticleTitle.includes(textNorm));

        // If top H1 duplicates the article title and the article already has H2 headings, drop the redundant top H1
        if (i === 0 && (isSameAsTitle || bodyHasH2)) {
          while (i + 1 < lines.length && isMetaOrDividerLine(lines[i + 1])) {
            i++;
          }
          continue;
        }
        hashes = '##';
      }

      // 2. If the first H2 at line 0 is an exact duplicate of the H1 article title and another H2 follows right after, drop the redundant title H2
      if (i === 0 && hashes === '##' && normArticleTitle && textNorm === normArticleTitle) {
        let lookahead = i + 1;
        while (lookahead < lines.length && isMetaOrDividerLine(lines[lookahead])) {
          lookahead++;
        }
        if (lookahead < lines.length && /^##\s+/.test(lines[lookahead].trim())) {
          convertedCount++;
          i = lookahead - 1;
          continue;
        }
      }

      // 3. Detect FAQ section for AEO
      if (/^(?:frequently asked questions|faqs?\b)/i.test(text)) {
        inFaqSection = true;
        if (hashes !== '##') {
          hashes = '##';
          convertedCount++;
        }
      } else if (hashes === '##') {
        inFaqSection = false;
      }

      // 4. Promote orphan H3s to H2 only if the article had 0 H2s before FAQ
      if (shouldPromoteOrphanH3s && !inFaqSection && hashes === '###') {
        hashes = '##';
        convertedCount++;
      }

      // 5. Fix skipped heading level (e.g. H2 -> H4 directly without H3)
      if (hashes === '####' && lastHeadingLevel <= 2) {
        hashes = '###';
        convertedCount++;
      }

      // 6. Capitalize accidental lowercase first character (e.g. `## introduction` -> `## Introduction`)
      if (text.length > 0 && /^[a-z]/.test(text)) {
        text = text.charAt(0).toUpperCase() + text.slice(1);
        convertedCount++;
      }

      // 7. Drop only if it's an immediate consecutive duplicate heading; otherwise disambiguate if repeated later
      const dedupeKey = text.toLowerCase().replace(/[:\s]+/g, ' ').trim();
      if (dedupeKey === lastAddedHeadingNorm) {
        convertedCount++;
        continue;
      }

      if (seenHeadingCounts.has(dedupeKey)) {
        const count = (seenHeadingCounts.get(dedupeKey) || 1) + 1;
        seenHeadingCounts.set(dedupeKey, count);
        if (
          hashes.length >= 3 &&
          lastParentH2 &&
          !text.toLowerCase().includes(lastParentH2.toLowerCase())
        ) {
          text = `${text} (${lastParentH2})`;
        } else {
          text = `${text} (Part ${count})`;
        }
        convertedCount++;
      } else {
        seenHeadingCounts.set(dedupeKey, 1);
      }

      if (hashes === '##') {
        lastParentH2 = text.replace(/^[\d.\-\s]+/, '').trim();
      }
      lastHeadingLevel = hashes.length;
      lastAddedHeadingNorm = text.toLowerCase().replace(/[:\s]+/g, ' ').trim();

      transformed.push(`${hashes} ${text}`);
      continue;
    }

    if (trimmed.length > 0) {
      lastAddedHeadingNorm = '';
    }
    transformed.push(line);
  }

  // Only add an H2 if the entire article has ZERO H2 headings anywhere (required by Rule 6)
  const hasAnyH2 = transformed.some((l) => /^##\s+/.test(l.trim()));
  if (!hasAnyH2 && transformed.length > 0 && cleanArticleTitle) {
    transformed.unshift(`## ${cleanArticleTitle}`, '');
    convertedCount++;
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

  // 1. Title Missing -> Auto-set from first heading or slug (NEVER append "| AbuQitmirLabs" to H1 title — Rule 6)
  let resolvedTitle = stripOuterQuotes(input.title)
    .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
    .trim();

  if (!resolvedTitle) {
    const extractedHeading = extractFirstHeading(rawContent);
    resolvedTitle = extractedHeading || humanizeSlug(rawSlug);
    appliedFixes.push(`Title was missing -> Auto-set to "${resolvedTitle}"`);
  }

  // Ensure canonical slug (strip brand suffix when generating slug from title)
  const titleWithoutBrandForSlug = resolvedTitle.replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '').trim();
  const baseSlug = rawSlug
    ? rawSlug.replace(/^\/+|\/+$/g, '').replace(/^blog\//i, '')
    : slugifyText(titleWithoutBrandForSlug || resolvedTitle);
  const resolvedSlug = getCanonicalSlug(baseSlug || slugifyText(titleWithoutBrandForSlug || resolvedTitle) || `article-${Date.now()}`);

  // 2. Content starts with `# H1` -> Auto-remove `# H1` and convert to `## H2`
  const h1Fix = convertContentH1ToH2(rawContent, titleWithoutBrandForSlug || resolvedTitle);
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
    fixedActions: appliedFixes,
    warnings,
    unfixedWarnings: warnings,
  };
}
