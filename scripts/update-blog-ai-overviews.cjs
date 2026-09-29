const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const mdPath = path.join(rootDir, 'content/blog/ai-overviews-killed-traffic-what-40-companies-did-next.md');
const mdContent = fs.readFileSync(mdPath, 'utf8');

const parts = mdContent.split('---');
const meta = JSON.parse(parts[1].trim());
const body = parts.slice(2).join('---').trim();

// 1. Update src/data/staticBlogPosts.ts
const staticPostsPath = path.join(rootDir, 'src/data/staticBlogPosts.ts');
let staticPostsContent = fs.readFileSync(staticPostsPath, 'utf8');

const postCode = `
STATIC_BLOG_POSTS["ai-overviews-killed-traffic-what-40-companies-did-next"] = {
  "title": ${JSON.stringify(meta.title)},
  "content": ${JSON.stringify(body)},
  "excerpt": ${JSON.stringify(meta.excerpt)},
  "coverImage": "https://www.abuqitmirlabs.tech/images/blog/ai-overviews-traffic-recovery-2026-og.jpg",
  "coverImageAlt": "AI Overviews traffic recovery case study showing 40 companies and 7 recovery tactics with specific metrics",
  "category": "SEO Services",
  "createdAt": "2026-09-28",
  "author": "Abu Qitmir Mohammad Shiraz Al-Madani",
  "tags": ${JSON.stringify(meta.tags)}
};
STATIC_BLOG_POSTS["ai-overviews-traffic-recovery-what-40-companies-did-next"] = STATIC_BLOG_POSTS["ai-overviews-killed-traffic-what-40-companies-did-next"];
`;

if (!staticPostsContent.includes('ai-overviews-killed-traffic-what-40-companies-did-next')) {
  // Insert before export interface BlogPostSummary
  staticPostsContent = staticPostsContent.replace(
    'export interface BlogPostSummary {',
    postCode + '\nexport interface BlogPostSummary {'
  );

  // Add to canonicalSlugs
  staticPostsContent = staticPostsContent.replace(
    'const canonicalSlugs = [',
    'const canonicalSlugs = [\n    "ai-overviews-killed-traffic-what-40-companies-did-next",'
  );

  fs.writeFileSync(staticPostsPath, staticPostsContent, 'utf8');
  console.log('✓ Updated src/data/staticBlogPosts.ts');
} else {
  console.log('Static blog post already exists in staticBlogPosts.ts');
}

// 2. Schema definition from user
const schemaObj = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.abuqitmirlabs.tech/#organization",
      "name": "AbuQitmirLabs",
      "url": "https://www.abuqitmirlabs.tech/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.abuqitmirlabs.tech/logo.png",
        "width": 512,
        "height": 512
      },
      "description": "Bespoke custom software, AI app development, and SEO services based in Karachi, Pakistan. Building enterprise-grade digital solutions for clients across the US, UK, and EU.",
      "foundingDate": "2024",
      "founder": {
        "@type": "Person",
        "name": "Abu Qitmir Mohammad Shiraz Al-Madani",
        "jobTitle": "Founder & Lead Systems Architect"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Karachi",
        "addressRegion": "Sindh",
        "addressCountry": "PK"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "url": "https://www.abuqitmirlabs.tech/contact",
        "availableLanguage": ["English", "Urdu"]
      },
      "sameAs": [
        "https://www.linkedin.com/company/abuqitmirlabs",
        "https://twitter.com/AbuQitmirLabs",
        "https://github.com/abuqitmirlabs",
        "https://clutch.co/profile/abuqitmirlabs"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.abuqitmirlabs.tech/#website",
      "url": "https://www.abuqitmirlabs.tech/",
      "name": "AbuQitmirLabs",
      "publisher": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.abuqitmirlabs.tech/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next/#webpage",
      "url": "https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next",
      "name": "AI Overviews Killed Your Traffic: What 40 Companies Did Next",
      "isPartOf": { "@id": "https://www.abuqitmirlabs.tech/#website" },
      "about": { "@id": "https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next/#article" },
      "description": "AI Overviews cut organic clicks by 61%. We analyzed 40 companies that recovered. Here are the 7 tactics that actually worked, with specific metrics.",
      "inLanguage": "en-US",
      "datePublished": "2026-09-28T00:00:00+00:00",
      "dateModified": "2026-09-28T00:00:00+00:00"
    },
    {
      "@type": "Article",
      "@id": "https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next/#article",
      "headline": "AI Overviews Killed Your Traffic: What 40 Companies Did Next",
      "description": "AI Overviews cut organic clicks by 61%. We analyzed 40 companies that recovered. Here are the 7 tactics that actually worked, with specific metrics.",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.abuqitmirlabs.tech/images/blog/ai-overviews-traffic-recovery-2026-og.jpg",
        "width": 1200,
        "height": 630
      },
      "author": {
        "@type": "Person",
        "name": "Abu Qitmir Mohammad Shiraz Al-Madani",
        "jobTitle": "Founder & Lead Systems Architect",
        "url": "https://www.abuqitmirlabs.tech/about",
        "sameAs": [
          "https://www.linkedin.com/in/abuqitmirmohammad",
          "https://twitter.com/AbuQitmirLabs"
        ]
      },
      "publisher": { "@id": "https://www.abuqitmirlabs.tech/#organization" },
      "datePublished": "2026-09-28T00:00:00+00:00",
      "dateModified": "2026-09-28T00:00:00+00:00",
      "mainEntityOfPage": { "@id": "https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next/#webpage" },
      "articleSection": "SEO Services",
      "keywords": [
        "AI Overviews traffic recovery",
        "recover traffic lost to AI Overviews",
        "AI Overviews SEO strategy",
        "how to get cited in AI Overviews",
        "AI search traffic recovery",
        "zero-click search recovery",
        "bottom-funnel SEO",
        "AI crawler access"
      ],
      "wordCount": 3100,
      "inLanguage": "en-US",
      "isAccessibleForFree": true
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is AI Overviews traffic loss permanent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For informational queries, largely yes. Google is not going to reverse AI Overviews. For transactional and bottom-funnel queries, most of the traffic is recoverable through content restructuring and citation optimization."
          }
        },
        {
          "@type": "Question",
          "name": "How do I know if AI Overviews are taking my traffic?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Check Google Search Console for a widening gap between impressions and clicks. If impressions are stable or growing while clicks decline, AI Overviews are likely the cause. You can also test by searching your target keywords in an incognito browser and checking whether an AI Overview appears."
          }
        },
        {
          "@type": "Question",
          "name": "Can I block AI Overviews from using my content?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can block Google-Extended in robots.txt, but doing so prevents Google from citing your content in AI Overviews. Most companies find this counterproductive. It is better to be cited than absent."
          }
        },
        {
          "@type": "Question",
          "name": "How long does recovery take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Across the 40 companies analyzed, the average recovery timeline was 4 to 6 months. Companies that diversified distribution channels recovered faster than those that tried to optimize their way back to the old baseline."
          }
        },
        {
          "@type": "Question",
          "name": "What metrics should I track instead of CTR?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Track citation rate (how often your brand appears in AI Overviews), AI referral traffic (users arriving from ChatGPT, Perplexity, Gemini), brand search volume, and bottom-funnel conversion rate."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to stop writing informational content entirely?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. But you should reduce it. Informational content still has value for brand awareness and citation potential. Just do not expect it to generate the same click volume it did before AI Overviews."
          }
        },
        {
          "@type": "Question",
          "name": "How do I get cited in AI Overviews?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lead every section with a 40 to 60 word direct answer. Add FAQPage schema. Include specific, verifiable data. Publish original research. Unblock Google-Extended in robots.txt."
          }
        },
        {
          "@type": "Question",
          "name": "What if I run a small business with limited resources?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Start with the highest-leverage steps: unblock AI crawlers, restructure your top 10 articles for direct answers, and add FAQPage schema. These are free or low-cost. Build from there."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.abuqitmirlabs.tech/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.abuqitmirlabs.tech/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Overviews Killed Your Traffic: What 40 Companies Did Next",
          "item": "https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next"
        }
      ]
    }
  ]
};

// 3. Update src/data/seoRoutesMetadata.ts
const seoRoutesPath = path.join(rootDir, 'src/data/seoRoutesMetadata.ts');
let seoRoutesContent = fs.readFileSync(seoRoutesPath, 'utf8');

const seoEntryCode = `
  '/blog/ai-overviews-killed-traffic-what-40-companies-did-next': {
    title: 'AI Overviews Killed Traffic: What 40 Companies Did Next',
    description: 'AI Overviews cut organic clicks by 61%. We analyzed 40 companies that recovered. Here are the 7 tactics that actually worked, with specific metrics.',
    canonical: 'https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next',
    ogTitle: 'AI Overviews Killed Traffic: What 40 Companies Did Next',
    ogDescription: 'AI Overviews cut organic clicks by 61%. We analyzed 40 companies that recovered. Here are the 7 tactics that actually worked, with specific metrics.',
    ogImage: 'https://www.abuqitmirlabs.tech/images/blog/ai-overviews-traffic-recovery-2026-og.jpg',
    ogType: 'article',
    twitterTitle: 'AI Overviews Killed Traffic: What 40 Companies Did Next',
    twitterDescription: 'AI Overviews cut organic clicks by 61%. We analyzed 40 companies that recovered. Here are the 7 tactics that actually worked, with specific metrics.',
    twitterImage: 'https://www.abuqitmirlabs.tech/images/blog/ai-overviews-traffic-recovery-2026-og.jpg',
    schemaJsonLd: ${JSON.stringify(schemaObj, null, 2)}
  },
  '/blog/ai-overviews-traffic-recovery-what-40-companies-did-next': {
    title: 'AI Overviews Killed Traffic: What 40 Companies Did Next',
    description: 'AI Overviews cut organic clicks by 61%. We analyzed 40 companies that recovered. Here are the 7 tactics that actually worked, with specific metrics.',
    canonical: 'https://www.abuqitmirlabs.tech/blog/ai-overviews-traffic-recovery-what-40-companies-did-next',
    ogTitle: 'AI Overviews Killed Traffic: What 40 Companies Did Next',
    ogDescription: 'AI Overviews cut organic clicks by 61%. We analyzed 40 companies that recovered. Here are the 7 tactics that actually worked, with specific metrics.',
    ogImage: 'https://www.abuqitmirlabs.tech/images/blog/ai-overviews-traffic-recovery-2026-og.jpg',
    ogType: 'article',
    twitterTitle: 'AI Overviews Killed Traffic: What 40 Companies Did Next',
    twitterDescription: 'AI Overviews cut organic clicks by 61%. We analyzed 40 companies that recovered. Here are the 7 tactics that actually worked, with specific metrics.',
    twitterImage: 'https://www.abuqitmirlabs.tech/images/blog/ai-overviews-traffic-recovery-2026-og.jpg',
    schemaJsonLd: ${JSON.stringify(schemaObj, null, 2)}
  },
`;

if (!seoRoutesContent.includes('ai-overviews-killed-traffic-what-40-companies-did-next')) {
  // Replace the closing `};` of SEO_ROUTES_METADATA
  const lastIndex = seoRoutesContent.lastIndexOf('};');
  if (lastIndex !== -1) {
    seoRoutesContent = seoRoutesContent.slice(0, lastIndex) + seoEntryCode + '};\n';
    fs.writeFileSync(seoRoutesPath, seoRoutesContent, 'utf8');
    console.log('✓ Updated src/data/seoRoutesMetadata.ts');
  }
} else {
  console.log('SEO metadata already exists');
}
