"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface OfferBlockProps {
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
  className?: string;
  note?: string;
  noteRotation?: number;
}

export default function OfferBlock({
  title,
  description,
  price,
  image,
  link,
  className,
  note,
  noteRotation = -5,
}: OfferBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("group relative aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-xl bg-obsidian-800", className)}
    >
      {/* Background Image */}
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/20 transition-colors duration-500 rounded-[2.5rem]" />

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-gold-500 transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-[10px] md:text-xs font-light leading-relaxed mb-4 line-clamp-2 opacity-80">
              {description}
            </p>
          </div>
          
          <div className="flex justify-between items-end border-t border-white/10 pt-4">
            <div className="text-left">
              <span className="block text-[8px] uppercase tracking-[0.3em] text-gold-500/80 mb-0.5">Cena</span>
              <span className="font-serif text-xl font-bold text-white">{price}</span>
            </div>
            <Link 
              href={link} 
              className="text-white text-[9px] font-bold tracking-widest uppercase hover:text-gold-500 transition-colors"
            >
              Viac →
            </Link>
          </div>
        </div>
      </div>

      {/* Handwriting Note */}
      {note && (
        <div 
          className="absolute top-6 left-6 z-30 font-handwriting text-gold-400 text-lg md:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ transform: `rotate(${noteRotation}deg)` }}
        >
          {note}
        </div>
      )}
    </motion.div>
  );
}
