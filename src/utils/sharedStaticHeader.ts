/**
 * Single Source of Truth for Static HTML Navigation Header
 * Strictly synchronized with /src/components/Header.tsx & Logo.tsx
 * Used in build-time SSG pre-rendering so crawlers and users receive 100% identical markup.
 */

export function renderStaticHeader(activePath: string = '/'): string {
  return `
<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#ccff00] focus:text-black focus:font-bold focus:rounded-md focus:shadow-2xl focus:outline-none">
  Skip to main content
</a>

<header class="fixed top-0 left-0 w-full z-[100] transition-all duration-300 h-20 md:h-24 flex items-center bg-transparent">
  <div class="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
    <!-- Brand Logo -->
    <a href="/" class="flex flex-col no-underline group transition-all duration-300" aria-label="AbuQitmirLabs Home">
      <div class="flex flex-col leading-[0.8]">
        <span class="text-[#0066ff] font-black text-xl md:text-2xl tracking-tighter uppercase group-hover:text-white transition-colors">
          ABUQITMIR
        </span>
        <div class="bg-[#ccff00] text-black text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-sm tracking-[0.1em] uppercase self-start mt-1">
          LABS.TECH
        </div>
      </div>
    </a>

    <!-- Desktop Navigation -->
    <nav role="navigation" aria-label="Main Navigation" class="hidden xl:flex items-center gap-4 2xl:gap-7">
      <!-- Home -->
      <div class="relative group">
        <a href="/" class="text-xs xl:text-sm font-semibold transition-colors whitespace-nowrap ${activePath === '/' ? 'text-[#ccff00]' : 'text-gray-300 hover:text-white'}">
          Home
        </a>
      </div>

      <!-- Services Dropdown -->
      <div class="relative group">
        <a href="/#services" class="flex items-center gap-1 cursor-pointer py-4 text-xs xl:text-sm font-semibold text-gray-300 hover:text-white transition-colors whitespace-nowrap" aria-label="Services Submenu">
          <span>Services</span>
          <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </a>
      </div>

      <!-- Solutions Dropdown -->
      <div class="relative group">
        <a href="/solutions/fintech" class="flex items-center gap-1 cursor-pointer py-4 text-xs xl:text-sm font-semibold text-gray-300 hover:text-white transition-colors whitespace-nowrap" aria-label="Solutions Submenu">
          <span>Solutions</span>
          <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </a>
      </div>

      <!-- World Dropdown -->
      <div class="relative group">
        <a href="/us-market" class="flex items-center gap-1 cursor-pointer py-4 text-xs xl:text-sm font-semibold text-gray-300 hover:text-white transition-colors whitespace-nowrap" aria-label="World Markets Submenu">
          <span>World</span>
          <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </a>
      </div>

      <!-- News Dropdown -->
      <div class="relative group">
        <a href="/news/all" class="flex items-center gap-1 cursor-pointer py-4 text-xs xl:text-sm font-semibold text-gray-300 hover:text-white transition-colors whitespace-nowrap" aria-label="News Submenu">
          <span>News</span>
          <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </a>
      </div>

      <!-- About Dropdown -->
      <div class="relative group">
        <a href="/about/our-company" class="flex items-center gap-1 cursor-pointer py-4 text-xs xl:text-sm font-semibold text-gray-300 hover:text-white transition-colors whitespace-nowrap" aria-label="About Submenu">
          <span>About</span>
          <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </a>
      </div>

      <!-- Case Studies Dropdown -->
      <div class="relative group">
        <a href="/case-studies" class="flex items-center gap-1 cursor-pointer py-4 text-xs xl:text-sm font-semibold ${activePath === '/case-studies' ? 'text-[#ccff00]' : 'text-gray-300 hover:text-white'} transition-colors whitespace-nowrap" aria-label="Case Studies Submenu">
          <span>Case Studies</span>
          <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </a>
      </div>

      <!-- Blog -->
      <div class="relative group">
        <a href="/blog" class="text-xs xl:text-sm font-semibold transition-colors whitespace-nowrap ${activePath.startsWith('/blog') ? 'text-[#ccff00]' : 'text-gray-300 hover:text-white'}">
          Blog
        </a>
      </div>
    </nav>

    <!-- Right Header Actions -->
    <div class="flex items-center gap-3 shrink-0">
      <a href="/contact" aria-label="Book a Consultation" class="inline-flex items-center justify-center px-5 py-2.5 bg-[#ccff00] hover:bg-[#b0d600] !text-black font-black text-xs uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(204,255,0,0.35)] hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] transition-all duration-300 shrink-0 whitespace-nowrap">
        <span class="!text-black font-black text-xs uppercase tracking-wider whitespace-nowrap">
          Contact Now
        </span>
      </a>

      <!-- Mobile Menu Toggle Button -->
      <button class="xl:hidden p-2.5 text-white hover:text-[#ccff00] focus:outline-none transition-colors" aria-label="Open Navigation Menu">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
    </div>
  </div>
</header>
  `.trim();
}
