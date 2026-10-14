// Vercel Edge Middleware to ensure AI crawlers and search bots always receive prerendered HTML with schemas
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - _vercel
     * - static files (images, css, js, fonts, etc.)
     */
    '/((?!api|_vercel|assets|images|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(request: Request) {
  // AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot, etc.) receive standard edge pass-through
  // allowing Vercel Edge CDN to serve the pre-rendered static HTML containing route-specific JSON-LD schemas in <head>
  const userAgent = request.headers.get('user-agent') || '';
  const isAICrawler = /GPTBot|ClaudeBot|anthropic|PerplexityBot|CCBot|Bytespider|Googlebot|bingbot/i.test(userAgent);

  // Return undefined/next() equivalent for edge pass-through
  return undefined;
}
