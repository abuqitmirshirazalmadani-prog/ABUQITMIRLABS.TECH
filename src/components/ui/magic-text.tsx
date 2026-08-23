"use client" 

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
 
export interface MagicTextProps {
  text: string;
  className?: string;
}
 
interface ChunkProps {
  children: string;
  progress: any;
  range: number[];
}
 
const Chunk: React.FC<ChunkProps> = ({ children, progress, range }) => {
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

  // For very short texts (<= 4 words), animate as a single unit to save DOM nodes
  if (words.length <= 4) {
    return (
      <p ref={container} className={cn("leading-relaxed", className)}>
        <Chunk progress={scrollYProgress} range={[0, 1]}>
          {text}
        </Chunk>
      </p>
    );
  }

  // Group into 2-word micro-phrases for seamless reading flow with 50% fewer DOM elements
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += 2) {
    if (i + 1 < words.length) {
      chunks.push(`${words[i]} ${words[i + 1]}`);
    } else {
      chunks.push(words[i]);
    }
  }
 
  return (
    <p ref={container} className={cn("leading-relaxed", className)}>
      {chunks.map((chunk, i) => {
        const start = i / chunks.length;
        const end = Math.min(1, start + 1 / chunks.length);
 
        return (
          <Chunk key={`${chunk}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {chunk}
          </Chunk>
        );
      })}
    </p>
  );
};

