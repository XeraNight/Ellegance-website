"use client";

import React, { useState } from "react";
import { getAssetPath } from "@/lib/utils";
import StickerPeel from "@/components/animations/StickerPeel";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import IPhoneMockup from "@/components/IPhoneMockup";
import InstagramOverlay from "@/components/InstagramOverlay";
import { Maximize2, X, Download } from "lucide-react";

export default function PressKitPage() {
  const [instaMode, setInstaMode] = useState<"feed" | "reels">("feed");
  const [selectedAsset, setSelectedAsset] = useState<{ name: string; desc: string; file: string; aspect: string } | null>(null);
  const [modalBg, setModalBg] = useState<"transparent" | "dark" | "light">("transparent");
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
                src={getAssetPath("/baner.png")}
                alt="Ellegance Banner"
                fill
                className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href={getAssetPath("/baner.png")}
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
              { name: "Minimalistické Rohy", desc: "IG Feed (4:5)", file: "corners-minimal-white.svg", aspect: "aspect-[4/5]" },
              { name: "Prémiové Zlaté Rohy", desc: "IG Feed (4:5)", file: "corners-gold-deco.svg", aspect: "aspect-[4/5]" },
              { name: "Story Rámček", desc: "IG Story (9:16)", file: "story-border-overlay.svg", aspect: "aspect-[9/16]" },
              { name: "Odznak 'Ellegance'", desc: "UGC Nálepka", file: "badge-ellegance.svg", aspect: "aspect-square" },
              { name: "Odznak 'Idem pre Zlato'", desc: "UGC Nálepka", file: "badge-idem-pre-zlato.svg", aspect: "aspect-square" },
              { name: "Odznak 'Budem tam!'", desc: "UGC Nálepka", file: "badge-budem-tam.svg", aspect: "aspect-square" }
            ].map((asset, i) => (
              <motion.div
                key={asset.file}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                onClick={() => {
                  setSelectedAsset(asset);
                  setModalBg("transparent");
                }}
                className="flex flex-col group/card cursor-pointer"
              >
                <div className={`relative w-full ${asset.aspect} bg-[#050505] rounded-xl border border-white/10 overflow-hidden mb-4 flex items-center justify-center p-4`}>
                  {/* Checkerboard pattern for transparency indication */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #111 25%, transparent 25%), linear-gradient(-45deg, #111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111 75%), linear-gradient(-45deg, transparent 75%, #111 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}></div>
                  
                  <Image
                    src={getAssetPath(`/epk/${asset.file}`)}
                    alt={asset.name}
                    fill
                    className="object-contain p-8 md:p-12 transition-transform duration-700 group-hover/card:scale-105 z-10 drop-shadow-2xl"
                  />

                  {/* High-end Hover Zoom Overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20">
                    <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/35 flex items-center justify-center mb-3 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5 text-gold-500" />
                    </div>
                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300 delay-75">
                      Zväčšiť detail
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between px-1">
                  <div className="flex flex-col">
                    <span className="text-white text-xs font-bold uppercase tracking-wider mb-1">{asset.name}</span>
                    <span className="text-gold-500/60 text-[9px] uppercase tracking-widest">{asset.desc} • PNG</span>
                  </div>
                  <a
                    href={getAssetPath(`/epk/${asset.file.replace(".svg", ".png")}`)}
                    download={asset.file.replace(".svg", ".png")}
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-gold-500 hover:text-obsidian-900 text-gold-500 transition-colors z-20"
                    title="Stiahnuť transparentné PNG"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedAsset(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl bg-obsidian-950/95 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] grid grid-cols-1 md:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAsset(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-30"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Preview area (8 cols) */}
              <div className="md:col-span-8 p-6 flex flex-col h-[50vh] md:h-[70vh] border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden bg-[#050505]">
                {/* Background Toggles */}
                <div className="absolute top-4 left-4 flex gap-1 bg-[#0c0c0c]/80 backdrop-blur-md p-1 rounded-lg border border-white/10 z-20">
                  <button
                    onClick={() => setModalBg("transparent")}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                      modalBg === "transparent"
                        ? "bg-gold-500 text-obsidian-900 shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Mriežka
                  </button>
                  <button
                    onClick={() => setModalBg("dark")}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                      modalBg === "dark"
                        ? "bg-gold-500 text-obsidian-900 shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Tmavé
                  </button>
                  <button
                    onClick={() => setModalBg("light")}
                    className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                      modalBg === "light"
                        ? "bg-gold-500 text-obsidian-900 shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Svetlé
                  </button>
                </div>

                {/* Main Preview */}
                <div
                  className={`w-full h-full relative rounded-lg overflow-hidden flex items-center justify-center transition-colors duration-300 ${
                    modalBg === "dark"
                      ? "bg-black"
                      : modalBg === "light"
                      ? "bg-white"
                      : "bg-[#090909]"
                  }`}
                >
                  {modalBg === "transparent" && (
                    <div
                      className="absolute inset-0 opacity-25 pointer-events-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #111 25%, transparent 25%), linear-gradient(-45deg, #111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111 75%), linear-gradient(-45deg, transparent 75%, #111 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                      }}
                    ></div>
                  )}

                  <div className="relative w-[90%] h-[90%] flex items-center justify-center">
                    <Image
                      src={getAssetPath(`/epk/${selectedAsset.file}`)}
                      alt={selectedAsset.name}
                      fill
                      className={`object-contain p-4 transition-all duration-300 ${
                        modalBg === "light" && selectedAsset.file.includes("white") ? "invert" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Info & Details (4 cols) */}
              <div className="md:col-span-4 p-8 flex flex-col justify-between h-[40vh] md:h-[70vh] bg-obsidian-950">
                <div className="space-y-6">
                  <div>
                    <span className="text-gold-500 uppercase tracking-[0.3em] text-[9px] font-black block mb-2">
                      Detaily podkladu
                    </span>
                    <h3 className="text-2xl font-[family-name:var(--font-outfit)] font-bold text-white leading-tight">
                      {selectedAsset.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-500 text-[10px] uppercase tracking-wider block">
                        Typ súboru
                      </span>
                      <span className="text-white text-xs font-semibold">
                        SVG Vector (Bezstratový)
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500 text-[10px] uppercase tracking-wider block">
                        Odporúčané použitie
                      </span>
                      <span className="text-white text-xs font-semibold">
                        {selectedAsset.desc}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500 text-[10px] uppercase tracking-wider block">
                        Rozlíšenie
                      </span>
                      <span className="text-white text-xs font-semibold">
                        Nekonečné / Škálovateľné
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-3">
                  <a
                    href={getAssetPath(`/epk/${selectedAsset.file.replace(".svg", ".png")}`)}
                    download={selectedAsset.file.replace(".svg", ".png")}
                    className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg shadow-gold-500/10 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Stiahnuť transparentné PNG
                  </a>
                  <a
                    href={getAssetPath(`/epk/${selectedAsset.file}`)}
                    download={selectedAsset.file}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold py-2 px-6 rounded-xl text-[10px] uppercase tracking-widest transition-colors border border-white/10 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Stiahnuť originál SVG (Vektor)
                  </a>
                  <p className="text-[9px] text-gray-500 text-center uppercase tracking-wider">
                    PNG obrázok je už plne transparentný (bez pozadia), vhodný ako Instagram nálepka
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
