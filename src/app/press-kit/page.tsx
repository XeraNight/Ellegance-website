"use client";

import React, { useState } from "react";
import { getAssetPath } from "@/lib/utils";
import StickerPeel from "@/components/animations/StickerPeel";
import { motion } from "framer-motion";
import Image from "next/image";
import IPhoneMockup from "@/components/IPhoneMockup";
import InstagramOverlay from "@/components/InstagramOverlay";

export default function PressKitPage() {
  const [instaMode, setInstaMode] = useState<"feed" | "reels">("feed");
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
        {/* Intro Section with iPhone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-start text-left space-y-6"
          >
            <div className="flex flex-col items-start mb-4">
              <span className="text-gold-500 uppercase tracking-[0.4em] text-[10px] font-black mb-4">
                Médiá & Branding
              </span>
              <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-outfit)] font-bold text-white tracking-tight">
                Press <span className="text-gold-500 font-light italic">kit</span>
              </h1>
            </div>
            
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl md:text-4xl font-bold text-white leading-tight">
              Tvoríte <span className="text-gold-500">obsah</span> pre sociálne siete?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Pripravili sme pre vás všetky potrebné materiály na jednom mieste. Ak potrebujete vytvoriť príspevok, story alebo článok o Ellegance, nižšie nájdete naše oficiálne logá, bannery a dodatočné zdroje.
            </p>
            <div className="pt-4">
              <a href="#assets" className="btn-gold px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] inline-block hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                Stiahnuť podklady
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center lg:items-end justify-center"
          >
            <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-full mb-6 border border-white/10">
              <button 
                onClick={() => setInstaMode("feed")}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${instaMode === "feed" ? "bg-gold-500 text-obsidian-900 shadow-md" : "text-white/60 hover:text-white"}`}
              >
                KLASICKÝ POST
              </button>
              <button 
                onClick={() => setInstaMode("reels")}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${instaMode === "reels" ? "bg-gold-500 text-obsidian-900 shadow-md" : "text-white/60 hover:text-white"}`}
              >
                REELS / STORY
              </button>
            </div>
            
            <div className="relative">
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-gold-500/20 blur-[60px] rounded-full scale-75 pointer-events-none" />
              <IPhoneMockup 
                showReflection={true}
                showControls={false}
                mediaType={instaMode === "reels" ? "image" : "none"}
                imageSrc={instaMode === "reels" ? getAssetPath("/images/miculesqu.png") : undefined}
              >
                <InstagramOverlay mode={instaMode} imageSrc={getAssetPath("/images/miculesqu.png")} />
              </IPhoneMockup>
            </div>
          </motion.div>
        </div>

        {/* Main Grid: Smaller Assets */}
        <div id="assets" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-items-center mb-24 pt-8">
          
          {/* Left Column: Smaller Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                href={getAssetPath("/image.png")}
                download="ellegance_banner.png"
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                href={getAssetPath("/images/ellegance_logo_full.png")}
                download="ellegance_logo.png"
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



        {/* EPK Components Section */}
        <div className="w-full max-w-5xl mx-auto mb-32 pt-16 border-t border-white/5">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Minimalistické Rohy", desc: "IG Feed (4:5)", file: "corners-minimal-white.png", aspect: "aspect-[4/5]" },
              { name: "Prémiové Zlaté Rohy", desc: "IG Feed (4:5)", file: "corners-gold-deco.png", aspect: "aspect-[4/5]" },
              { name: "Story Rámček", desc: "IG Story (9:16)", file: "story-border-overlay.png", aspect: "aspect-[9/16]" },
              { name: "Odznak 'Ellegance'", desc: "UGC Nálepka", file: "badge-ellegance.png", aspect: "aspect-square" },
              { name: "Odznak 'Idem pre Zlato'", desc: "UGC Nálepka", file: "badge-idem-pre-zlato.png", aspect: "aspect-square" },
              { name: "Odznak 'Budem tam!'", desc: "UGC Nálepka", file: "badge-budem-tam.png", aspect: "aspect-square" }
            ].map((asset, i) => (
              <motion.div
                key={asset.file}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col group"
              >
                <div className={`relative w-full ${asset.aspect} bg-[#050505] rounded-xl border border-white/10 overflow-hidden mb-4 flex items-center justify-center p-4`}>
                  {/* Checkerboard pattern for transparency indication */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #111 25%, transparent 25%), linear-gradient(-45deg, #111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111 75%), linear-gradient(-45deg, transparent 75%, #111 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}></div>
                  
                  <Image
                    src={getAssetPath(`/epk/${asset.file}`)}
                    alt={asset.name}
                    fill
                    className="object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105 z-10 drop-shadow-2xl"
                  />
                </div>
                
                <div className="flex items-center justify-between px-1">
                  <div className="flex flex-col">
                    <span className="text-white text-xs font-bold uppercase tracking-wider mb-1">{asset.name}</span>
                    <span className="text-gold-500/60 text-[9px] uppercase tracking-widest">{asset.desc} • PNG</span>
                  </div>
                  <a
                    href={`/epk/${asset.file}`}
                    download
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-gold-500 hover:text-obsidian-900 text-gold-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
