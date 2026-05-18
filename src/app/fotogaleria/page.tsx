"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "@/lib/utils";
import { X } from "lucide-react";

const CATEGORIES = ["Všetko", "Párové súťaže", "Venčeky", "Latin Fit", "Vystúpenia", "Kurzy"];

const GALLERY_ITEMS = [
  { id: 1, category: "Párové súťaže", src: "/assets/img/hero_ballroom_dance_1777364065805.png", title: "Súťažná elegancia", size: "large" },
  { id: 2, category: "Venčeky", src: "/assets/img/gallery_waltz_1777364079670.png", title: "Slávnostný valčík", size: "medium" },
  { id: 3, category: "Latin Fit", src: "/assets/img/gallery_latin_1777364111041.png", title: "Energia Latiny", size: "small" },
  { id: 4, category: "Párové súťaže", src: "/assets/img/gallery_tango_1777364096830.png", title: "Vášeň na parkete", size: "medium" },
  { id: 5, category: "Vystúpenia", src: "/images/IMG_1658.jpeg", title: "Showdance vystúpenie", size: "large" },
  { id: 6, category: "Kurzy", src: "/images/kurz_spolocenskych_tancov.png", title: "Základy tanca", size: "medium" },
  { id: 7, category: "Vystúpenia", src: "/images/IMG_1680.jpeg", title: "Komerčná show", size: "small" },
  { id: 8, category: "Kurzy", src: "/images/IMG_1686.jpeg", title: "Detské kurzy", size: "medium" },
  { id: 9, category: "Párové súťaže", src: "/images/main_page_photo.jpg", title: "Vrcholová súťaž", size: "large" },
];

export default function FotogaleriaPage() {
  const [activeCategory, setActiveCategory] = useState("Všetko");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = activeCategory === "Všetko" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-obsidian-900 pt-32 pb-24">
      {/* Header Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold-500 font-[family-name:var(--font-jakarta)] tracking-[0.4em] text-[10px] font-black mb-4 block uppercase"
          >
            Vizuálny príbeh
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-outfit)] text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
          >
            Foto<span className="text-gold-500 font-light italic">galéria</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-px w-32 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto"
          />
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-500 border ${
                activeCategory === cat 
                  ? "bg-gold-500 text-obsidian-900 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                  : "bg-white/5 text-white/50 border-white/10 hover:border-gold-500/50 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden border border-white/5 bg-white/5 shadow-2xl"
                onClick={() => setSelectedImage(getAssetPath(item.src))}
              >
                <div className="relative aspect-auto">
                  <img
                    src={getAssetPath(item.src)}
                    alt={item.title}
                    className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-obsidian-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <span className="text-gold-500 font-[family-name:var(--font-jakarta)] tracking-[0.3em] text-[8px] font-black mb-2 uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.category}
                  </span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-xl text-white font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.title}
                  </h3>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold-500/30 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian-900/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full overflow-hidden rounded-2xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
