"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  overlayOpacity?: number;
  hoverScale?: boolean;
  id?: string;
}

export default function BentoCard({
  children,
  className,
  bgImage,
  overlayOpacity = 0.8,
  hoverScale = true,
  id,
}: BentoCardProps) {
  return (
    <motion.div
      id={id}
      whileHover={hoverScale ? { y: -5, scale: 1.01 } : {}}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className={cn(
        "relative rounded-3xl overflow-hidden border border-white/5 bg-obsidian-800/40 backdrop-blur-sm group",
        className
      )}
    >
      {/* Background Image with Overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="Card background" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div 
            className="absolute inset-0 bg-obsidian-900/80 group-hover:bg-obsidian-900/70 transition-colors duration-500"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {/* Decorative Border Glow */}
      <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/20 transition-colors duration-500 rounded-3xl z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </motion.div>
  );
}
