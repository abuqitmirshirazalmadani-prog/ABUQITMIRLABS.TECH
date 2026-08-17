"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  fontSize?: number
  minWeight?: number
  maxWeight?: number
  animationDuration?: number
  delayMultiplier?: number
  className?: string
}

export function AnimatedBreathingText({
  text,
  className = ""
}: AnimatedTextProps) {
  return (
    <span className={cn("inline-block font-sans leading-tight tracking-tight transition-colors duration-300", className)}>
      {text}
    </span>
  )
}

