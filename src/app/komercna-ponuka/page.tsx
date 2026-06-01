"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "@/lib/utils";

const SLIDE_IMAGES = [
  getAssetPath("/images/image copy.png"),
  getAssetPath("/images/image.png"),
  getAssetPath("/images/main_page_photo.jpg"),
];

export default function KomercnaPonukaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-obsidian-900 overflow-x-hidden">
      {/* SECTION 1: Full Screen Image Slider (The original hero) */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-obsidian-900 opacity-80" />
        </div>

        <div className="absolute inset-0 z-10 p-8 md:p-24 flex flex-col justify-end items-start pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-3xl"
          >
            <div className="h-px w-12 bg-gold-500 mb-8" />
            <h1 className="font-serif text-3xl md:text-6xl font-light leading-tight text-white/90">
              Prémiové priestory pre <br />
              <span className="text-gold-500 font-bold">váš biznis</span>, <br />
              <span className="text-gold-500 font-bold">workshopy</span> alebo <br />
              <span className="text-gold-500 font-bold">súkromné akcie</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Hall Switcher Details */}
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-start mb-20 border-l border-gold-500/30 pl-8">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-gold-500 uppercase tracking-[0.5em] text-[10px] font-black mb-2"
          >
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter">
            Vybavenie <span className="text-gold-500 italic font-light lowercase">sál</span>
          </h2>
        </div>

        <HallSwitcher />
      </div>
    </div>
  );
}

function HallSwitcher() {
  const [activeHall, setActiveHall] = useState<'horna' | 'dolna'>('horna');
  
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
    const updated = [clickedImage, currentBig, ...newImages.filter((_, i) => i !== 0 && i !== index)];
    if (activeHall === 'horna') setHornaImages(updated);
    else setDolnaImages(updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
        <div className="relative">
          <div className="absolute top-6 left-6 z-20 flex gap-3">
            <button 
              onClick={() => setActiveHall('horna')}
              className={`px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md ${
                activeHall === 'horna' ? "bg-gold-500 border-gold-500 text-obsidian-900" : "bg-black/40 border-white/20 text-white"
              }`}
            >
              Horná sála
            </button>
            <button 
              onClick={() => setActiveHall('dolna')}
              className={`px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md ${
                activeHall === 'dolna' ? "bg-gold-500 border-gold-500 text-obsidian-900" : "bg-black/40 border-white/20 text-white"
              }`}
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
              className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl border border-white/5"
            >
              <img src={activeImages[0]} alt="Main" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-4">
          {activeImages.slice(1).map((img, idx) => (
            <button
              key={activeHall + img + idx}
              onClick={() => handleImageClick(idx + 1)}
              className="relative w-20 md:w-24 aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-colors group shrink-0"
            >
              <img src={img} alt="Thumb" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
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
          <p className="text-gray-400 text-xs font-light leading-relaxed border border-white/5 bg-white/[0.02] p-4 rounded-2xl relative overflow-hidden">
            <span className="text-gold-500 font-bold block mb-1 uppercase tracking-wider text-[9px]">Kapacita a obsadenosť</span>
            V rámci presťahovania nášho tanečného klubu do nových priestorov na Fejovej 1 sme sa rozhodli naše doterajšie sály na Žriedlovej 13 (Cassovar) ponúknuť na prenájom pre komerčné účely.
          </p>

          <div className="flex items-center justify-between gap-12 mt-8 border-t border-white/5 pt-8">
            <div>
              <p className="text-[9px] text-gold-500 uppercase tracking-widest mb-1 font-bold">Adresa</p>
              <p className="text-white text-xl font-serif font-medium leading-tight">Žriedlová 13, Košice</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest opacity-60">Budova Cassovar</p>
            </div>
            <div className="w-32 aspect-square rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-2xl">
              <img src={getAssetPath("/images/image copy 4.png")} alt="Map" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
