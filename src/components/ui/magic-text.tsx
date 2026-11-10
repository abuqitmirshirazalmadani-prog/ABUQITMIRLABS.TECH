"use client" 

import * as React from "react"
import { cn } from "../../lib/utils";
 
export interface MagicTextProps {
  text: string;
  className?: string;
}

export const MagicText: React.FC<MagicTextProps> = ({ text, className }) => {
  return (
    <p className={cn("leading-relaxed", className)}>
      {text}
    </p>
  );
};


