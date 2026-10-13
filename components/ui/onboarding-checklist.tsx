"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, PlayCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export interface ChecklistItem {
  id: number | string;
  text: string;
  helperText?: string;
  helperLink?: {
    href: string;
    text: string;
  };
}

export interface OnboardingChecklistProps {
  title: string;
  description: string;
  items: ChecklistItem[];
  videoThumbnailUrl: string;
  videoUrl: string;
  className?: string;
}

/**
 * A responsive and animated onboarding checklist component.
 * @param title - The main heading for the checklist.
 * @param description - A short description displayed below the title.
 * @param items - An array of checklist items to display.
 * @param videoThumbnailUrl - The URL for the video thumbnail image.
 * @param videoUrl - The URL for the video to be played in a modal.
 * @param className - Optional additional class names for the container.
 */
export const OnboardingChecklist = ({
  title,
  description,
  items,
  videoThumbnailUrl,
  videoUrl,
  className,
}: OnboardingChecklistProps) => {
  const [completedItems, setCompletedItems] = React.useState<Record<string | number, boolean>>(() => {
    // By default, mark first items as completed or interactive
    const initial: Record<string | number, boolean> = {};
    if (items && items.length > 0) {
      initial[items[0].id] = true;
    }
    return initial;
  });

  const toggleItem = (id: string | number) => {
    setCompletedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Helper to determine if videoUrl is a direct file or embeddable iframe
  const isEmbedVideo = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") || videoUrl.includes("vimeo.com");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "relative rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl overflow-hidden",
        className
      )}
    >
      {/* Background radial gradient accent */}
      <div 
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#ccff00]/10 blur-3xl" 
        aria-hidden="true" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Title, Description, Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] text-xs font-mono uppercase tracking-wider mb-3">
              Production Deployment Blueprint
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-snug">
              {title}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
              {description}
            </p>
          </div>

          <motion.div className="space-y-3.5 pt-2">
            {items.map((item) => {
              const isChecked = !!completedItems[item.id];
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "group flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer select-none",
                    isChecked
                      ? "bg-white/[0.04] border-[#ccff00]/30 hover:border-[#ccff00]/50"
                      : "bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.03]"
                  )}
                >
                  <div className="mt-0.5 shrink-0 transition-transform duration-200 group-hover:scale-110">
                    <CheckCircle2
                      className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        isChecked ? "text-[#ccff00] fill-[#ccff00]/20" : "text-zinc-600 group-hover:text-zinc-400"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors duration-200",
                          isChecked ? "text-white" : "text-zinc-300 group-hover:text-white"
                        )}
                      >
                        {item.text}
                      </span>
                    </div>

                    {item.helperText && (
                      <p className="mt-1 text-xs text-zinc-400 leading-relaxed font-light">
                        {item.helperText}
                      </p>
                    )}

                    {item.helperLink && (
                      <a
                        href={item.helperLink.href}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-1.5 text-xs font-mono text-[#ccff00] hover:underline"
                      >
                        <span>{item.helperLink.text}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column: Video Preview Card & Dialog Modal */}
        <div className="lg:col-span-5">
          <Dialog>
            <DialogTrigger asChild>
              <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-300 hover:border-[#ccff00]/60 hover:shadow-[#ccff00]/10">
                {/* Thumbnail Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <img
                    src={videoThumbnailUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-[#ccff00]/20 opacity-75" />
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950/90 border border-[#ccff00]/40 text-[#ccff00] shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ccff00] group-hover:text-black">
                        <PlayCircle className="w-7 h-7" />
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-zinc-300">
                    <span className="rounded bg-black/60 px-2 py-1 backdrop-blur-sm border border-white/10">
                      Watch Walkthrough
                    </span>
                    <span className="text-[#ccff00] flex items-center gap-1 font-semibold">
                      Full HD 4K
                    </span>
                  </div>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-zinc-800">
              <div className="p-4 sm:p-6 pb-2">
                <DialogTitle className="text-xl font-serif text-white">
                  {title} — Video Walkthrough
                </DialogTitle>
                <DialogDescription className="text-xs text-zinc-400 mt-1 font-light">
                  Direct client workflow and cinematic generation pipeline overview by AbuQitmirLabs.
                </DialogDescription>
              </div>

              <div className="relative aspect-video w-full bg-black">
                {isEmbedVideo ? (
                  <iframe
                    src={videoUrl}
                    title={title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingChecklist;
