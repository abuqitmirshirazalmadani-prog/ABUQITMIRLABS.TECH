"use client" 

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
 
export interface MagicTextProps {
  text: string;
  className?: string;
}
 
interface WordProps {
  children: string;
  progress: any;
  range: number[];
}
 
const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.35, 1]);
 
  return (
    <motion.span 
      style={{ opacity }} 
      className="inline-block mr-[0.28em] transition-opacity duration-150"
    >
      {children}
    </motion.span>
  );
};
 
export const MagicText: React.FC<MagicTextProps> = ({ text, className }) => {
  const container = useRef<HTMLParagraphElement>(null);
 
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.95", "start 0.35"],
  });

  const words = text.split(/\s+/).filter(Boolean);
 
  return (
    <p ref={container} className={cn("leading-relaxed", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1 / words.length);
 
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
