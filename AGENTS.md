# Project Design & Brand Guidelines

- **Scroll & Movement:** Use smooth premium scrolling with GSAP and parallax depth on scroll for floating product tins/elements.
- **Theme & Aesthetics:** Full dark/black background with high-contrast, vibrant multi-color product photography. Generous white/negative space to evoke old-money luxury.
- **Typography:** Use Cormorant Garamond for typography to convey instant heritage and high-end elegance.
- **Layout Strategy:** Build each product section as a full-screen cinematic reveal (one product per scroll section) rather than standard grid cards.

# Permanent Instructions — Blog Articles

Jab bhi user blog article likhne ko kahe:
1. Sirf plain markdown/text content do.
2. Koi dedicated React component ya page file mat banana.
3. Koi interactive calculator, checklist tool, sidebar ya widget mat banana.
4. Article ka title exactly wohi rakho jo bataya gaya ho — apni marzi se change mat karna.
5. Koi second version ya alternate page mat banana.
6. Sirf content provide karo — deployment user ka kaam hai.

# Permanent Instructions — Quality, Integrity & Anti-Duplicate Guardrails

Hamesha (har update aur article add karte waqt) ye 8 strict rules enforce karo:
1. **Critical Rule 1 — Grounded Data & Case Studies:** Kabhi bhi ungrounded ya fabricated claims/numbers/fake corporate case studies mat banao. Case studies must cite real, verifiable sources or link to AbuQitmirLabs's real projects (e.g., TajweedPage.com).
2. **Critical Rule 2 — Canonical URL & Sitemap Consistency:** Sitemap (`public/sitemap.xml`, `sitemap.xml`, `pages-sitemap.xml`) mein SIRF aur SIRF 100% primary canonical URLs hone chahiye. Kabhi bhi redirect/alias slug ya non-canonical URL sitemap mein add mat karo. Har URL ka `<link rel="canonical">` aur `og:url` exact canonical URL se match hona chahiye.
3. **Critical Rule 3 — Zero Broken Hashtag Spam:** Tags ko spaces se split karke broken single-word badges (`#AI #TO #IN #AND #THE`) mat banao. Tags hamesha clean, intact multi-word semantic phrases honi chahiye (max 12, stop-words stripped, deduplicated).
4. **Critical Rule 4 — Zero Duplicate Headings:** Kisi bhi single article ke andar duplicate H1, H2 ya H3 headings nahi honi chahiye. Aur article ka title markdown body ke top par dobara repeat nahi hona chahiye (hamesha runtime ya build-time deduplicate karo).
5. **Critical Rule 5 — Automated Audit Verification:** Har change ke baad `npm run audit:seo` aur `compile_applet` chalao taake sitemap duplicates, canonical errors, aur heading duplicates turant detect aur auto-resolve ho jayein.
6. **Critical Rule 6 — Full Raw HTML Prerendering (H1, H2, H3, Tables, FAQs):** Har blog article (`staticBlogPosts.ts`, `content/blog/*.md`, aur Firestore) ka mukammal HTML (`<h1>`, tamam `<h2>`, `<h3>`, `<p>`, `<table>`) raw HTML (`dist/blog/<slug>/index.html` aur `public/blog/<slug>/index.html`) mein prerender hona lazmi hai. Raw HTML mein kabhi bhi khali loading spinner ya missing H1/H2 nahi hone chahiye, aur `<h1>` mein ` | AbuQitmirLabs` suffix nahi hona chahiye.
7. **Critical Rule 7 — Strictly Single `@graph` JSON-LD Schema Block:** Raw HTML aur client-rendered DOM dono mein har page par SIRF EK (`1`) `<script type="application/ld+json">` block (`@graph` format mein `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Article`, aur `FAQPage` ke sath) hona chahiye. Duplicate JSON-LD blocks bilkul nahi hone chahiye.
8. **Critical Rule 8 — Fast Local WebP Cover Images & Zero Unrelated Stock Photos:** Kisi bhi article mein slow external `i.postimg.cc` ya unoptimized PNG/JPG direct load nahi hona chahiye. Har cover image `public/images/blog-covers/<slug>-<hash>.webp` par local WebP mein optimize hokar preload aur serve honi chahiye, aur random stock photos article body ke darmiyan auto-inject nahi hone chahiye.

