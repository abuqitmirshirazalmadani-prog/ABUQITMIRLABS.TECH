import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import {
  db,
  collection,
  addDoc,
  serverTimestamp,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';

export interface NewsletterSubscriptionFormProps {
  /**
   * Visual placement variant:
   * - 'footer': Designed for the high-contrast Neo-Brutalist #ccff00 footer.
   * - 'sidebar': Designed for dark (#0b0b0e / #050507) blog post templates or sidebars.
   */
  variant?: 'footer' | 'sidebar';
  /**
   * Optional custom source tag stored in Firestore ('footer' | 'sidebar' | 'blog')
   */
  source?: 'footer' | 'sidebar' | 'blog';
  className?: string;
}

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const NewsletterSubscriptionForm: React.FC<NewsletterSubscriptionFormProps> = ({
  variant = 'footer',
  source,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const resolvedSource: 'footer' | 'sidebar' | 'blog' =
    source || (variant === 'footer' ? 'footer' : 'sidebar');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (
      trimmedEmail.length < 5 ||
      trimmedEmail.length > 150 ||
      !EMAIL_REGEX.test(trimmedEmail)
    ) {
      setStatus('error');
      setErrorMessage('Please enter a valid work or personal email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const collectionPath = 'newsletter_subscribers';
    try {
      await addDoc(collection(db, collectionPath), {
        email: trimmedEmail,
        source: resolvedSource,
        status: 'active',
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Unable to complete subscription right now. Please try again.');
      try {
        handleFirestoreError(error, OperationType.CREATE, collectionPath);
      } catch {
        // Error logged with structured FirestoreErrorInfo context
      }
    }
  };

  if (variant === 'sidebar') {
    return (
      <div
        className={`bg-[#0b0b0e] border border-zinc-800/80 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden ${className}`}
        aria-label="Newsletter Subscription"
      >
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-[10px] font-mono font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              <span>ENGINEERING DISPATCH</span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-serif">
              Get Zero-Fluff Architecture &amp; AI Playbooks
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Join founders, CTOs, and product leaders receiving our bi-weekly technical benchmarks on AI agents, Next.js speed engineering, and organic growth.
            </p>
          </div>

          <div className="w-full lg:max-w-md shrink-0">
            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-3 p-4 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/40 text-[#ccff00]"
              >
                <CheckCircle2 size={20} className="shrink-0" />
                <div className="text-xs font-mono">
                  <span className="font-bold block uppercase tracking-wider">Subscription Confirmed</span>
                  <span className="text-zinc-300">You are on the list for future AbuQitmirLabs dispatches.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-grow">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                    />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="you@company.com"
                      aria-label="Email address for newsletter updates"
                      disabled={status === 'submitting'}
                      maxLength={150}
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-white placeholder:text-zinc-500 text-sm font-mono focus:outline-none focus:border-[#ccff00] transition-colors disabled:opacity-60"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#ccff00] text-black font-black uppercase tracking-widest text-xs hover:bg-[#b8e600] transition-all cursor-pointer disabled:opacity-60 shrink-0 shadow-lg shadow-[#ccff00]/10"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>

                {status === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 text-xs text-red-400 font-mono pt-1"
                  >
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <p className="text-[11px] text-zinc-500 font-mono">
                  Zero spam. Unsubscribe anytime. Stored securely via Firebase.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default: 'footer' variant (Neo-Brutalist high-contrast black-on-lime)
  return (
    <div
      className={`border-4 border-black rounded-2xl bg-black/5 p-6 md:p-8 ${className}`}
      aria-label="Footer Newsletter Subscription"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black text-[#ccff00] font-mono font-black text-[10px] uppercase tracking-widest">
            <Sparkles size={11} />
            <span>INSIDER BRIEFING</span>
          </div>
          <div className="text-xl md:text-2xl font-black text-black uppercase tracking-tight font-serif">
            Subscribe to Engineering &amp; AI Growth Updates
          </div>
          <p className="text-xs text-black/80 font-bold leading-relaxed normal-case">
            Direct production case studies, Core Web Vitals playbooks, and autonomous AI agent architectures delivered straight to your inbox.
          </p>
        </div>

        <div className="w-full lg:max-w-md shrink-0">
          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-3 p-4 rounded-xl bg-black text-[#ccff00] border-2 border-black brutalist-shadow"
            >
              <CheckCircle2 size={20} className="shrink-0" />
              <div className="text-xs font-mono normal-case">
                <span className="font-black block uppercase tracking-wider">You&apos;re Subscribed!</span>
                <span className="text-white/90">Your email has been saved for future technical dispatches.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-grow">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/60 pointer-events-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your work email..."
                    aria-label="Email address for newsletter subscription"
                    disabled={status === 'submitting'}
                    maxLength={150}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-black text-black placeholder:text-black/50 text-xs font-mono font-bold normal-case focus:outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black text-[#ccff00] hover:bg-zinc-900 font-black uppercase tracking-widest text-xs border-2 border-black brutalist-shadow transition-all cursor-pointer disabled:opacity-60 shrink-0"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && errorMessage && (
                <div
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-red-900 bg-red-100 border border-red-900 px-3 py-1.5 rounded-lg font-mono font-bold normal-case"
                >
                  <AlertCircle size={13} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscriptionForm;
