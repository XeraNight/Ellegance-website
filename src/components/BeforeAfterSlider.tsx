"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { getAssetPath } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Pod svetlami",
  afterLabel = "Backstage",
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onMouseDown={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Backstage) */}
      <div className="absolute inset-0">
        <img 
          src={afterImage} 
          alt={afterLabel} 
          className="w-full h-full object-cover grayscale-[0.5]"
        />
        <div className="absolute bottom-6 right-6 px-4 py-2 bg-obsidian-900/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Pro) - Clipped */}
      <div 
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt={beforeLabel} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 px-4 py-2 bg-gold-500 text-obsidian-900 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line */}
      <div 
        className="absolute inset-y-0 z-20 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-obsidian-900">
          <svg className="w-6 h-6 text-obsidian-900" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
