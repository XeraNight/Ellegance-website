"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

const SLIDE_IMAGES = [
  getAssetPath("/images/main_page_photo.jpg"),
  getAssetPath("/images/miculesqu.png"),
  getAssetPath("/images/image.png"),
  getAssetPath("/images/image copy.png"),
];

export default function EventyAKomercnaPonukaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-obsidian-900 overflow-x-hidden">
      {/* SECTION 1: Full Screen Image Slider */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={SLIDE_IMAGES[currentSlide]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Subtle Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-obsidian-900 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 p-8 md:p-24 flex flex-col justify-end items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-2xl"
        >
          <div className="h-px w-12 bg-gold-500 mb-8" />
          <h1 className="font-serif text-3xl md:text-5xl font-light leading-tight text-white/90">
            Ponúkame naše služby aj pre <br />
            <span className="text-gold-500 font-bold">rozne vystúpenia</span>, <br />
            <span className="text-gold-500 font-bold">venčekové plesy</span> alebo <br />
            <span className="text-gold-500 font-bold">priestory</span> pre komerčné využitie
          </h1>
        </motion.div>
      </div>
    </section>

      {/* SECTION 2: Venčekové Slávnosti (Split Layout) */}
      <section className="relative min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Floating Photo (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-[35vw] h-auto max-h-[65vh] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-gold-500/10 border border-white/5 mx-auto lg:mx-0"
          >
            <img 
              src={getAssetPath("/images/kurz_spolocenskych_tancov.png")} 
              alt="Venčekové slávnosti" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/40 to-transparent" />
          </motion.div>

          {/* Text Content (Right - on Obsidian background) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex flex-col items-start gap-10"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">Tradícia & Elegancia</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
                Venčekové <br /> Slávnosti
              </h2>
            </div>
            
            <div className="space-y-6 max-w-xl">
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Venček je nezabudnuteľným momentom dospievania, kedy sa elegancia spája s radosťou z prvého veľkého bálu.
              </p>
              <p className="text-gray-500 text-sm font-light leading-relaxed italic">
                Naša príprava zahŕňa nielen kroky klasických tancov, ale aj základy etikety a spoločenského vystupovania. Vytvárame komunitu, kde sa mladí ľudia cítia sebavedomo.
              </p>
            </div>

            <Link href="/kontakt?sluzba=venceky" className="btn-gold self-end mt-4 px-12 py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:scale-105 transition-transform shadow-xl shadow-gold-500/10">
              Zistiť viac o Venčekoch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Tanečné Vystúpenia (Mirrored Layout) */}
      <section className="relative min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex flex-col items-start gap-10 order-2 lg:order-1"
          >
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-500 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">eventy a vystúpenia</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
                Tanečné <br /> Vystúpenia
              </h2>
            </div>
            
            <div className="space-y-6 max-w-xl text-left">
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Prinášame energiu, eleganciu a profesionálne umenie na vaše podujatie, či už ide o gala večer alebo ples.
              </p>
              <p className="text-gray-500 text-sm font-light leading-relaxed italic">
                Naše choreografie sú prispôsobené charakteru eventu. Ponúkame širokú škálu štýlov od latinsko-amerických tancov až po klasické štandardné tance.
              </p>
            </div>

            <Link href="/kontakt?sluzba=vystupenie" className="btn-gold self-start mt-4 px-12 py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:scale-105 transition-transform shadow-xl shadow-gold-500/10">
              Zistiť viac o Vystúpeniach
            </Link>
          </motion.div>

          {/* Floating Photo (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-[35vw] h-auto max-h-[65vh] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-gold-500/10 border border-white/5 mx-auto lg:mx-0 order-1 lg:order-2"
          >
            <img 
              src={getAssetPath("/images/miculesqu.png")} 
              alt="Tanečné vystúpenia" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/40 to-transparent" />
          </motion.div>

        </div>
      </section>

      {/* SECTION 4: Komerčná Ponuka & Prenájom (Final Layout) */}
      <section className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <HallSwitcher />
        </div>
      </section>
    </div>
  );
}

// Sub-component for the interactive part to keep code clean
function HallSwitcher() {
  const [activeHall, setActiveHall] = useState<'horna' | 'dolna'>('horna');
  
  // Gallery state for each hall
  const [hornaImages, setHornaImages] = useState([
    getAssetPath("/images/image copy.png"),
    getAssetPath("/images/image.png"),
    getAssetPath("/images/main_page_photo.jpg"),
    getAssetPath("/images/miculesqu.png"),
  ]);

  const [dolnaImages, setDolnaImages] = useState([
    getAssetPath("/images/image copy 3.png"),
    getAssetPath("/images/image copy 2.png"),
    getAssetPath("/images/kurz_spolocenskych_tancov.png"),
    getAssetPath("/images/image.png"),
  ]);

  const activeImages = activeHall === 'horna' ? hornaImages : dolnaImages;

  const handleImageClick = (index: number) => {
    const newImages = [...activeImages];
    const clickedImage = newImages[index];
    const currentBig = newImages[0];
    
    // Logic: Clicked goes to [0], previous [0] goes to [1], others shift
    const updated = [clickedImage, currentBig, ...newImages.filter((_, i) => i !== 0 && i !== index)];
    
    if (activeHall === 'horna') setHornaImages(updated);
    else setDolnaImages(updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      
      {/* Photo & Gallery (Left) */}
      <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
        {/* Main Photo Display with Buttons INSIDE */}
        <div className="relative">
          {/* Floating Buttons in top-left */}
          <div className="absolute top-6 left-6 z-20 flex gap-3">
            <button 
              onClick={() => setActiveHall('horna')}
              className={cn(
                "px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md",
                activeHall === 'horna' 
                  ? "bg-gold-500 border-gold-500 text-obsidian-900" 
                  : "bg-black/40 border-white/20 text-white hover:bg-black/60"
              )}
            >
              Horná sála
            </button>
            <button 
              onClick={() => setActiveHall('dolna')}
              className={cn(
                "px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md",
                activeHall === 'dolna' 
                  ? "bg-gold-500 border-gold-500 text-obsidian-900" 
                  : "bg-black/40 border-white/20 text-white hover:bg-black/60"
              )}
            >
              Dolná sála
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeHall + activeImages[0]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl border border-white/5"
            >
              <img 
                src={activeImages[0]} 
                alt="Main view" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails (Even smaller) */}
        <div className="flex gap-4">
          {activeImages.slice(1).map((img, idx) => (
            <button
              key={activeHall + img + idx}
              onClick={() => handleImageClick(idx + 1)}
              className="relative w-20 md:w-24 aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-colors group shrink-0"
            >
              <img 
                src={img} 
                alt={`Thumbnail ${idx}`} 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Text Content & Controls (Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="lg:col-span-5 flex flex-col items-start gap-12 order-1 lg:order-2"
      >
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">Komerčný Prenájom</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight">
            Naše <span className="text-gold-500">Priestory</span>
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
            Prenajímame dve sály na komerčné účely s možnosťou platby na hodinu alebo na určený dátum. Ideálne pre tréningy, workshopy alebo súkromné akcie.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <Link href="/kontakt" className="btn-gold self-start px-8 py-3 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase hover:scale-105 transition-transform shadow-xl shadow-gold-500/20 text-center">
            Rezervovať priestor
          </Link>

          {/* More Compact Location Info with Shifted Photo */}
          <div className="flex items-center justify-between gap-12 mt-2">
            <div className="pt-4">
              <p className="text-[9px] text-gold-500 uppercase tracking-widest mb-1">Adresa prevádzky</p>
              <p className="text-white text-xl font-serif font-medium leading-tight">Žriedlová 13, Košice</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest opacity-60">Budova Cassovar</p>
            </div>
            <div className="relative -top-8 w-44 aspect-square rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-2xl transition-transform hover:scale-105">
              <img src={getAssetPath("/images/image copy 4.png")} alt="Map view" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

// Utility to merge classes
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
