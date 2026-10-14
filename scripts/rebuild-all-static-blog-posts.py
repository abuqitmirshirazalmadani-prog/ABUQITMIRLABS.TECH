import json
import re
import os

with open('firestore_posts.json') as f:
    fp_posts = json.load(f)

with open('src/data/staticBlogPosts.ts') as f:
    existing_code = f.read()

# Helper to normalize title for matching
def normalize(text):
    return re.sub(r'[^a-zA-Z0-9]', '', (text or '').lower())

# Extract existing posts from staticBlogPosts.ts
existing_posts = {}
slug_matches = list(re.finditer(r'STATIC_BLOG_POSTS\[\"([^\"]+)\"\]\s*=\s*(\{[\s\S]*?\n\};)', existing_code))
for m in slug_matches:
    slug = m.group(1)
    body = m.group(2)
    existing_posts[slug] = body

print(f"Extracted {len(existing_posts)} existing post entries from staticBlogPosts.ts")

# Map of firestore posts by slug and by normalized title
fp_by_slug = {}
fp_by_norm_title = {}
for p in fp_posts:
    s = p.get('slug')
    if s:
        fp_by_slug[s] = p
    t = p.get('title')
    if t:
        fp_by_norm_title[normalize(t)] = p

# List of known alias mappings (alias -> canonical)
ALIAS_MAPPINGS = {
    "generative-ai-chatbot-development-cost-2026": "generative-ai-chatbot-development-what-it-actually-costs-in-2026",
    "how-to-choose-mobile-app-development-company-2026": "how-to-choose-a-mobile-app-development-company-2026",
    "how-to-choose-mobile-app-development-company": "how-to-choose-a-mobile-app-development-company-2026",
    "ai-agent-development-agency-vs-in-house": "ai-agent-development-agency-vs-in-house-abuqitmirlabs",
    "the-go-to-guide-to-ai-agent-development-agency-vs-building-in-house": "the-go-to-guide-ai-agent-development-agency-vs-in-house",
    "flutter-vs-react-native-choosing-mobile-app-stack-2026": "flutter-vs-react-native-vs-native-your-mobile-app-stack-2026",
    "flutter-vs-react-native-2026": "flutter-vs-react-native-vs-native-your-mobile-app-stack-2026",
    "flutter-vs-react-native": "flutter-vs-react-native-vs-native-your-mobile-app-stack-2026",
    "flutter-vs-native-mobile-app-development-2026": "flutter-vs-react-native-which-framework-is-better-for-mobile-app-development-in-2026",
    "flutter-vs-native-2026": "flutter-vs-react-native-which-framework-is-better-for-mobile-app-development-in-2026",
    "flutter-vs-native-mobile-app-development": "flutter-vs-react-native-which-framework-is-better-for-mobile-app-development-in-2026",
    "custom-web-development-company": "custom-software-development-company-karachi-pakistan-abuqitmirlabs",
    "custom-web-development-company-2026": "custom-software-development-company-karachi-pakistan-abuqitmirlabs",
    "custom-web-development-vs-templates": "custom-web-development-vs-website-templates-2026-guide",
    "custom-web-development-vs": "custom-web-development-vs-website-templates-2026-guide",
    "rag-ai-integration-for-startups": "rag-ai-integration-for-startups-abuqitmirlabs",
    "rag-ai-integration": "rag-ai-integration-for-startups-abuqitmirlabs",
    "what-are-healthcare-ai-agents": "what-are-healthcare-ai-agents-complete-guide-2026",
    "local-business-visibility": "local-business-visibility-2026-seo-geo-aio-aeo-sxo",
    "what-seo-services-actually-means": "what-seo-services-actually-mean-in-2026-abuqitmirlabs",
    "custom-ai-solutions-for-corporate-events": "custom-ai-solutions-for-corporate-events-2026-guide",
    "retail-logistics-software-development-2026-complete-guide": "custom-retail-logistics-software-development-2026-enterprise"
}

# Update existing posts with matching user cover image if found in firestore
updated_existing = 0
for slug, body in existing_posts.items():
    matching_fp = fp_by_slug.get(slug)
    if not matching_fp and slug in ALIAS_MAPPINGS:
        matching_fp = fp_by_slug.get(ALIAS_MAPPINGS[slug])
    if not matching_fp:
        tm = re.search(r'\"title\":\s*\"([^\"]+)\"', body)
        if tm:
            matching_fp = fp_by_norm_title.get(normalize(tm.group(1)))

    if matching_fp and matching_fp.get('coverImage'):
        user_img = matching_fp['coverImage']
        # replace coverImage using lambda to avoid re.sub template escapes
        new_body = re.sub(r'\"coverImage\":\s*\"[^\"]+\"', lambda _: f'\"coverImage\": \"{user_img}\"', body)
        if matching_fp.get('coverImageAlt'):
            alt = json.dumps(matching_fp['coverImageAlt'])
            new_body = re.sub(r'\"coverImageAlt\":\s*\"[^\"]+\"', lambda _: f'\"coverImageAlt\": {alt}', new_body)
        existing_posts[slug] = new_body
        updated_existing += 1

print(f"Updated {updated_existing} existing posts with user cover images")

# Build map of all posts to include
final_posts_entries = {}

# First, add all existing posts
for slug, body in existing_posts.items():
    final_posts_entries[slug] = f'STATIC_BLOG_POSTS["{slug}"] = {body}'

# Next, ensure every post from firestore_posts.json is present in STATIC_BLOG_POSTS
added_from_fp = 0
for p in fp_posts:
    slug = p.get('slug')
    if not slug:
        continue
    if slug not in final_posts_entries:
        post_obj = {
            "canonical": f"https://www.abuqitmirlabs.tech/blog/{slug}",
            "title": p.get("title", ""),
            "content": p.get("content", ""),
            "excerpt": p.get("excerpt", ""),
            "coverImage": p.get("coverImage", ""),
            "coverImageAlt": p.get("coverImageAlt", f"{p.get('title', '')} | AbuQitmirLabs"),
            "category": p.get("category", "Software"),
            "createdAt": p.get("createdAt", "2026-05-15"),
            "author": p.get("author", "AbuQitmirLabs"),
            "tags": p.get("tags", [])
        }
        json_str = json.dumps(post_obj, indent=2)
        final_posts_entries[slug] = f'STATIC_BLOG_POSTS["{slug}"] = {json_str};'
        added_from_fp += 1

print(f"Added {added_from_fp} new posts from firestore_posts.json")
print(f"Total entries in STATIC_BLOG_POSTS: {len(final_posts_entries)}")

# Now generate the file content
header = """export interface StaticBlogPost {
  id?: string;
  slug?: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  createdAt: any;
  updatedAt?: any;
  author: string;
  tags?: string[];
  canonical?: string;
}

export const STATIC_BLOG_POSTS: Record<string, StaticBlogPost> = {};
"""

footer = """
export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  category: string;
  createdAt: string;
  author: string;
  tags: string[];
}

/**
 * Returns all canonical blog posts for instant, zero-lag listing on /blog
 * Deduplicated and sorted by publication date descending.
 */
export function getStaticBlogList(): BlogPostSummary[] {
  const seenTitles = new Set<string>();
  const results: BlogPostSummary[] = [];

  // Exclude legacy redirect alias slugs from list view
  const aliasSlugs = new Set([
    "custom-web-development-company-2026",
    "custom-web-development-company-2026-built-in-visibility",
    "tailor-made-software-solutions-when-off-the-shelf-fails-2026",
    "tailor-made-software-solutions",
    "when-off-the-shelf-software-fails",
    "native-mobile-app-development-ios-vs-android-cost-2026",
    "native-mobile-app-development-ios-vs-android",
    "ios-vs-android-cost-2026",
    "app-development-agency-uk-2026",
    "app-development-agency-uk",
    "flutter-vs-react-native-2026",
    "flutter-vs-react-native",
    "flutter-vs-native-2026",
    "flutter-vs-native-mobile-app-development",
    "rag-ai-integration",
    "custom-web-development-vs-templates",
    "custom-web-development-vs",
    "custom-ai-solutions-for-corporate-events",
    "local-business-visibility",
    "what-seo-services-actually-means",
    "how-to-choose-mobile-app-development-company",
    "what-are-healthcare-ai-agents",
    "the-go-to-guide-to-ai-agent-development-agency-vs-building-in-house"
  ]);

  for (const [slug, post] of Object.entries(STATIC_BLOG_POSTS)) {
    if (!post || !post.title || aliasSlugs.has(slug)) continue;

    // Normalize title to prevent duplicate cards
    const norm = post.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenTitles.has(norm)) continue;
    seenTitles.add(norm);

    let excerpt = post.excerpt || "";
    if (!excerpt && post.content) {
      const cleanContent = post.content
        .replace(/^#+ .*/gm, "")
        .replace(/> .*/gm, "")
        .replace(/\\[([^\\]]+)\\]\\([^)]+\\)/g, "$1")
        .replace(/[*_~`]/g, "")
        .trim();
      excerpt = cleanContent.slice(0, 180).trim() + "...";
    }

    results.push({
      id: slug,
      slug,
      title: post.title,
      excerpt,
      coverImage: post.coverImage,
      coverImageAlt: post.coverImageAlt || `${post.title} | AbuQitmirLabs`,
      category: post.category || "AI & Software",
      createdAt: typeof post.createdAt === 'string' ? post.createdAt : '2026-05-15',
      author: post.author || "AbuQitmirLabs",
      tags: post.tags || []
    });
  }

  // Sort descending by date
  results.sort((a, b) => {
    const tA = new Date(a.createdAt).getTime() || 0;
    const tB = new Date(b.createdAt).getTime() || 0;
    return tB - tA;
  });

  return results;
}
"""

all_posts_code = "\n\n".join(final_posts_entries.values())
full_file_content = header + "\n" + all_posts_code + "\n" + footer

with open('src/data/staticBlogPosts.ts', 'w') as f:
    f.write(full_file_content)

print("Successfully wrote updated src/data/staticBlogPosts.ts")
