import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  props?: any;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);

    // Solve classic modern SPA dynamic import ChunkLoadErrors safely
    const isChunkError = 
      error.name === 'ChunkLoadError' || 
      /chunk|loading|css|dynamic/i.test(error.message) ||
      error.message.includes('Failed to fetch dynamically imported module');

    if (isChunkError) {
      console.warn('Chunk loading or dynamic import failed. Attempting automatic route recovery...');
      try {
        const lastReloaded = sessionStorage.getItem('last_chunk_reload');
        const now = Date.now();
        // Prevent infinite reload loops (only reload if we haven't reloaded the chunk in the last 10 seconds)
        if (!lastReloaded || now - parseInt(lastReloaded, 10) > 10000) {
          sessionStorage.setItem('last_chunk_reload', now.toString());
          window.location.reload();
          return;
        }
      } catch (e) {
        // Fallback reload if sessionStorage cache is blocked
        window.location.reload();
        return;
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Return beautiful, premium recovery screen styled with midnight brutalism
      return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full border border-zinc-800 rounded-2xl bg-zinc-950 p-8 text-center shadow-2xl relative overflow-hidden">
            {/* Ambient Accent Decor */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
            
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">
              !
            </div>
            
            <h1 className="text-xl font-bold tracking-tight mb-2">
              System Recovered
            </h1>
            
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              We encountered a minor asset synchronisation issue. Click below to continue navigating securely.
            </p>

            <button
              onClick={() => {
                sessionStorage.removeItem('last_chunk_reload');
                window.location.href = '/';
              }}
              className="w-full py-3 bg-white text-black font-semibold text-sm rounded-xl hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_4px_12px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Return Home
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full mt-3 py-3 bg-transparent text-zinc-400 border border-zinc-800 font-semibold text-sm rounded-xl hover:text-white hover:border-zinc-700 transition-all cursor-pointer active:scale-95"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
