"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HandwritingNoteProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  delay?: number;
}

export default function HandwritingNote({
  children,
  className,
  rotation = -5,
  delay = 0.5,
}: HandwritingNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay, 
        type: "spring", 
        stiffness: 100 
      }}
      className={cn(
        "font-handwriting text-gold-400 text-xl md:text-2xl pointer-events-none select-none",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
