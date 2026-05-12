"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PageBackgroundProps {
  image?: string;
}

export default function PageBackground({ image }: PageBackgroundProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Background Image Layer */}
      {image ? (
        <motion.div 
          style={{ y }}
          className="absolute inset-0"
        >
          <img 
            src={image} 
            alt="Background" 
            className="w-full h-full object-cover opacity-10 grayscale" 
          />
        </motion.div>
      ) : (
        <>
          {/* Default Abstract Shapes if no image */}
          <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-gold-500/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-obsidian-700 blur-[150px] rounded-full" />
        </>
      )}

      {/* Vignette / Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900 via-transparent to-obsidian-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_100%)]" />
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
