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

export default function EventyAVystupeniaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-obsidian-900 overflow-x-hidden pt-20">
      {/* SECTION 1: Full Screen Image Slider */}
      <section className="relative h-[80vh] w-full overflow-hidden">
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

        <div className="absolute inset-0 z-10 p-8 md:p-24 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-4xl"
          >
            <span className="text-gold-500 uppercase tracking-[0.5em] text-[10px] font-black mb-6 block">Umenie & Show</span>
            <h1 className="font-serif text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
              Eventy & <span className="text-gold-500 italic font-light lowercase">Vystúpenia</span>
            </h1>
            <div className="h-px w-24 bg-gold-500 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Venčekové Slávnosti */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/5 shadow-2xl"
          >
            <img src={getAssetPath("/images/kurz_spolocenskych_tancov.png")} alt="Venčeky" className="absolute inset-0 w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-gold-500 uppercase tracking-widest text-[10px] font-bold">Tradícia Ellegance</span>
              <h2 className="text-5xl font-serif font-bold text-white uppercase tracking-tighter">Venčekové <br /> Slávnosti</h2>
            </div>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Venček je nezabudnuteľným momentom dospievania, kedy sa elegancia spája s radosťou z prvého veľkého bálu.
            </p>
            <Link href="/kontakt?sluzba=venceky" className="btn-gold inline-block px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Zistiť viac
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Tanečné Vystúpenia */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <span className="text-gold-500 uppercase tracking-widest text-[10px] font-bold">Show program</span>
              <h2 className="text-5xl font-serif font-bold text-white uppercase tracking-tighter">Tanečné <br /> Vystúpenia</h2>
            </div>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Prinášame energiu, eleganciu a profesionálne umenie na vaše podujatie, či už ide o gala večer alebo ples.
            </p>
            <Link href="/kontakt?sluzba=vystupenie" className="btn-gold inline-block px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Rezervovať show
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/5 shadow-2xl order-1 lg:order-2"
          >
            <img src={getAssetPath("/images/miculesqu.png")} alt="Vystúpenia" className="absolute inset-0 w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
