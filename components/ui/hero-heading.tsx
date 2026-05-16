"use client";

import React from 'react';
import { motion } from 'motion/react';
import { cn } from "@/lib/utils";

interface HeroHeadingProps {
    className?: string;
}

const HeroHeading = ({ className }: HeroHeadingProps) => {
    return (
        <div className={cn("flex flex-col items-center text-center", className)}>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-black uppercase tracking-tighter leading-[0.95] flex flex-col items-center"
            >
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white">
                    Affordable App Development Company
                </span>
                <div className="flex items-center gap-4 mt-4">
                    <span className="hidden md:block text-5xl lg:text-7xl text-white/20">|</span>
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#ccff00]">
                        AbuQitmirLabs
                    </span>
                </div>
            </motion.h1>
        </div>
    );
};

export default HeroHeading;
