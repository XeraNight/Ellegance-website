"use client";

import React from "react";
import { getAssetPath } from "@/lib/utils";
import StickerPeel from "@/components/animations/StickerPeel";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PressKitPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 bg-obsidian-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Draggable Area - Full width/height */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 pointer-events-none">
            <StickerPeel
              imageSrc={getAssetPath("/images/ellegance_logo_full.png")}
              width={200}
              rotate={10}
              peelBackHoverPct={30}
              peelBackActivePct={40}
              shadowIntensity={0.5}
              lightingIntensity={0.1}
              initialPosition={{ x: "right", y: 40 }}
              peelDirection={0}
              className="z-20"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold-500 uppercase tracking-[0.4em] text-[10px] font-black mb-6"
          >
            Médiá & Branding
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-[family-name:var(--font-outfit)] font-bold text-white mb-4 tracking-tight"
          >
            Press <span className="text-gold-500 font-light italic">kit</span>
          </motion.h1>
        </div>

        {/* Main Grid: Smaller Assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-items-center mb-24">
          
          {/* Left Column: Smaller Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center w-full max-w-sm"
          >
            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 backdrop-blur-md group mb-6 flex items-center justify-center p-4">
              <Image
                src={getAssetPath("/image.png")}
                alt="Ellegance Banner"
                fill
                className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-gold-500/40 rounded-lg text-gold-500 hover:bg-gold-500 hover:text-obsidian-900 transition-all duration-300"
                title="Stiahnuť Banner"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
              <div className="flex flex-col items-start">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Hlavný Banner</span>
                <span className="text-gold-500/50 text-[8px] uppercase tracking-tighter font-medium">Plná kvalita (PNG)</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Smaller Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center w-full max-w-sm"
          >
            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 backdrop-blur-md group mb-6 flex items-center justify-center p-8">
              <div className="relative w-full h-full">
                <Image
                  src={getAssetPath("/images/ellegance_logo_full.png")}
                  alt="Ellegance Logo"
                  fill
                  className="object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-gold-500/40 rounded-lg text-gold-500 hover:bg-gold-500 hover:text-obsidian-900 transition-all duration-300"
                title="Stiahnuť Logo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
              <div className="flex flex-col items-start">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Logo Ellegance</span>
                <span className="text-gold-500/50 text-[8px] uppercase tracking-tighter font-medium">SVG & PNG (Priehľadné)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-sm w-full max-w-4xl mx-auto"
        >
          <p className="text-gold-500/50 text-[10px] uppercase tracking-widest font-bold text-center">Dodatočné zdroje</p>
          <div className="mt-4 flex flex-wrap justify-center gap-8 text-white/30 text-[10px] font-medium uppercase tracking-[0.2em]">
            <span>Profilové fotky</span>
            <span className="w-1 h-1 bg-white/10 rounded-full my-auto"></span>
            <span>Instagram Story</span>
            <span className="w-1 h-1 bg-white/10 rounded-full my-auto"></span>
            <span>Brand Manuál</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
