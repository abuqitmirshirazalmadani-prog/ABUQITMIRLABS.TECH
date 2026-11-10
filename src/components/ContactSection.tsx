"use client";

import React, { useState } from 'react';
import ObfuscatedEmail from './ObfuscatedEmail';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    requestAudit: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`${formData.requestAudit ? '[AUDIT REQUEST] ' : ''}Inquiry from ${formData.name}`);
    const bodyText = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nRequest Free Tech Audit: ${formData.requestAudit ? 'YES' : 'NO'}\n\nMessage:\n${formData.message}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@abuqitmirlabs.tech&su=${subject}&body=${bodyText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = gmailUrl;
    }, 600);
  };

  return (
    <section id="contact-hub" className="py-20 md:py-28 bg-[#030303] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center md:text-left mb-12">
          <p className="text-xs uppercase font-mono tracking-[0.2em] text-[#ccff00] mb-3 font-bold">
            Direct Engineering Contact.
          </p>
          <h2 className="text-3xl md:text-5xl font-serif italic text-white">
            Start Your Custom Software &amp; AI Project
          </h2>
          <p className="text-zinc-300 text-base md:text-lg font-light max-w-2xl leading-relaxed mt-3">
            Want to build a fast web app, launch an AI agent, or grow your search traffic? Send us a short note below or book a free 30-minute discovery call.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-zinc-950 border-2 border-[#ccff00] rounded-2xl space-y-3">
              <p className="font-mono text-xs text-[#ccff00] font-bold uppercase tracking-wider">Free 30-Minute Review.</p>
              <h3 className="text-xl font-bold text-white">Free Technical &amp; SEO Audit</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Get a free 45-point check of your site speed, schema data, mobile layout, and Google search coverage.
              </p>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, requestAudit: true })}
                className="font-mono text-xs text-[#ccff00] uppercase font-bold tracking-wider hover:underline"
              >
                Select Free Audit Below →
              </button>
            </div>

            <div className="space-y-4 bg-zinc-950 border border-white/10 rounded-2xl p-6 text-sm">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#ccff00]">Contact Directory</h3>
              <div>
                <p className="text-xs font-mono text-zinc-400">Email:</p>
                <ObfuscatedEmail user="hello" domain="abuqitmirlabs.tech" className="font-bold text-white hover:text-[#ccff00] hover:underline block" />
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-400">WhatsApp &amp; Phone:</p>
                <a href="https://wa.me/923233260859" target="_blank" rel="noopener noreferrer" className="font-bold text-[#25D366] hover:underline block">
                  +92 323 3260859 (WhatsApp Chat)
                </a>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-400">Studio Address:</p>
                <p className="text-zinc-300">Shahrah-e-Faisal, PECHS, Karachi, 75400, Pakistan.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} aria-label="Project Contact Form" className="bg-zinc-950 border border-white/15 rounded-2xl p-6 md:p-8 space-y-5">
              <div className="flex items-start gap-3 p-3.5 bg-[#ccff00]/5 border border-[#ccff00]/20 rounded-xl">
                <input
                  type="checkbox"
                  id="requestAudit"
                  checked={formData.requestAudit}
                  onChange={(e) => setFormData({ ...formData, requestAudit: e.target.checked })}
                  className="w-5 h-5 accent-[#ccff00] mt-0.5 cursor-pointer"
                />
                <label htmlFor="requestAudit" className="text-sm font-bold text-white cursor-pointer">
                  Yes, send me a free technical, speed, and SEO audit of my website.
                </label>
              </div>

              <div>
                <label htmlFor="contact-section-name" className="font-mono text-xs text-[#ccff00] mb-2 block">Your Name or Company.</label>
                <input
                  id="contact-section-name"
                  name="name"
                  autoComplete="name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-white rounded-xl"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="contact-section-email" className="font-mono text-xs text-[#ccff00] mb-2 block">Your Email Address.</label>
                <input
                  id="contact-section-email"
                  name="email"
                  autoComplete="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-white rounded-xl"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="contact-section-message" className="font-mono text-xs text-[#ccff00] mb-2 block">Project Goals &amp; Timeline.</label>
                <textarea
                  id="contact-section-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-white rounded-xl"
                  placeholder="Tell us what you want to build or improve..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="w-full px-8 py-4 bg-[#ccff00] hover:bg-white text-black font-black uppercase text-sm rounded-xl cursor-pointer transition-colors"
              >
                {isSubmitting ? 'Sending Message...' : submitted ? 'Message Ready in Email' : 'Send Project Brief →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
