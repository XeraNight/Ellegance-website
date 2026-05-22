"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageBackground from "@/components/PageBackground";
import HandwritingNote from "@/components/HandwritingNote";
import CourseCategoryNav from "@/components/CourseCategoryNav";
import RotatingText from "@/components/RotatingText";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";
import { Heart, Award, ArrowRight, Sparkles } from "lucide-react";

const CATEGORY_IMAGES: Record<string, string[]> = {
  latin: [
    "/images/IMG_1693.jpeg",
    "/images/image copy 4.png",
    "/images/image.png"
  ],
  svadba: [
    "/images/IMG_1710.jpeg",
    "/images/IMG_1699.jpeg",
    "/images/image copy.png"
  ],
  spolocenske: [
    "/images/kurz_spolocenskych_tancov.png",
    "/images/IMG_1686.jpeg",
    "/images/IMG_1658.jpeg"
  ],
  tango: [
    "/images/miculesqu.png",
    "/images/IMG_1693.jpeg",
    "/images/main_page_photo.jpg"
  ],
  deti: [
    "/images/IMG_1680.jpeg",
    "/images/image copy 3.png",
    "/images/image copy 2.png"
  ],
};

const CATEGORY_TAGLINES: Record<string, string> = {
  latin: "Energia, ženskosť a latino rytmy bez partnera",
  svadba: "Nezabudnuteľný prvý svadobný tanec bez stresu",
  spolocenske: "Krása spoločenského tanca a etikety pre každého",
  tango: "Hĺbka, objatie a vášeň priamo z Buenos Aires",
  deti: "Radosť z pohybu, disciplína a nové priateľstvá",
};

// Reusable elegant slideshow component for auto-rotating pictures
function CategorySlideshow({ images, alt, className }: { images: string[], alt: string, className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500); // changes every 4.5 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="w-full h-full bg-obsidian-950" />;
  }

  const currentImage = images[index] || images[0];

  return (
    <div className={`relative w-full h-full overflow-hidden ${className || ""}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={getAssetPath(currentImage)}
          alt={alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}

export default function PonukaPage() {
  const [activeTab, setActiveTab] = useState("latin");

  return (
    <div className="relative bg-obsidian-900 min-h-screen text-white selection:bg-gold-500/30">
      <PageBackground />
      
      {/* Editorial Header */}
      <header className="relative pt-32 pb-6 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">
              Kompletná Ponuka Ellegance
            </span>
            <div className="h-px w-8 bg-gold-500" />
          </motion.div>
          
          <h1 className="font-serif text-5xl md:text-8xl font-bold mb-8 leading-tight">
            Viac než len <br />
            <RotatingText 
              texts={["Kurzy", "Tanec", "Vášeň", "Vystúpenia", "Zábava"]} 
              mainClassName="text-gold-500"
              staggerDuration={0.1}
            />
          </h1>
        </div>
      </header>

      {/* Sticky Tab Selector (Remains at the top permanently snug under Header) */}
      <CourseCategoryNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Layout: SPLIT SCREEN */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Sticky Visual Canvas (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-[160px]">
            <div className="relative w-full h-[calc(100vh-260px)] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-obsidian-950/40 backdrop-blur-md">
              <CategorySlideshow images={CATEGORY_IMAGES[activeTab] || []} alt={activeTab} />
              
              {/* Subtle Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,2,2,0.6)_100%)] pointer-events-none" />

              {/* Dynamic Catalog Caption overlay */}
              <div className="absolute bottom-12 left-8 right-8 space-y-3 pointer-events-none z-10">
                <span className="text-gold-500/80 text-[10px] uppercase font-bold tracking-[0.3em] block">
                  TK Ellegance Košice
                </span>
                <h3 className="text-3xl font-serif font-bold text-white capitalize leading-none">
                  {activeTab === "spolocenske" ? "Spoločenské" : activeTab === "latin" ? "Latin Fit" : activeTab}
                </h3>
                <p className="text-gray-300 text-xs font-light tracking-wide leading-relaxed">
                  {CATEGORY_TAGLINES[activeTab]}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Scrollable Content Dossier */}
          <div className="lg:col-span-7 space-y-24 lg:space-y-36">
            
            {/* 1. LATIN FIT & SALSA */}
            <section id="latin" className="scroll-mt-36 space-y-8">
              {/* Mobile Only Header Slideshow */}
              <div className="lg:hidden w-full aspect-video rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-xl">
                <CategorySlideshow images={CATEGORY_IMAGES.latin} alt="Latin Fit" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Pre ženy a dievčatá
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tight animate-fade-in">
                  Latin Fit <span className="text-pink-500 italic font-light">&</span> Salsa
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                  Lekcie latinsko-amerických tancov pre dámy, kde nepotrebujete partnera. Objavte tance ako salsa, bachata, chacha, rumba a jive v uvoľnenej a priateľskej atmosfére.
                </p>
              </div>

              {/* Chic Boutique Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] border-l-4 border-pink-500/80 border-t border-r border-b border-white/5 bg-obsidian-850/60 backdrop-blur-sm space-y-5 shadow-[0_15px_30px_rgba(244,114,182,0.03)] hover:bg-obsidian-800/20 transition-all duration-300">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500/25 animate-pulse" /> Prečo Latin Fit?
                  </h3>
                  <ul className="space-y-3.5 text-xs text-gray-300 font-light">
                    <li className="flex items-start gap-2.5">
                      <span className="text-pink-500 text-sm leading-none">✦</span>
                      <span>Nepotrebujete tanečného partnera</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-pink-500 text-sm leading-none">✦</span>
                      <span>Formovanie postavy a kardio tréning</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-pink-500 text-sm leading-none">✦</span>
                      <span>Skvelá komunita a nová ženská energia</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-pink-500 text-sm leading-none">✦</span>
                      <span>Vhodné pre úplné začiatočníčky aj pokročilé</span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 rounded-[2rem] border border-pink-500/10 bg-gradient-to-br from-pink-500/[0.03] to-transparent backdrop-blur-sm flex flex-col justify-between shadow-[0_15px_40px_rgba(244,114,182,0.05)] hover:border-pink-500/30 transition-all duration-500 group">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] uppercase tracking-widest text-pink-400 font-bold block">Pravidelná lekcia</span>
                      <Sparkles className="w-4 h-4 text-pink-500/40 group-hover:text-pink-500 group-hover:rotate-12 transition-all duration-500" />
                    </div>
                    <div className="text-4xl font-serif font-bold text-white tracking-tight flex items-baseline gap-1">
                      8€ <span className="text-xs font-sans text-gray-400 font-light">/ lekcia</span>
                    </div>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      Možnosť zakúpenia výhodnej permanentky na recepcii pred začiatkom lekcie.
                    </p>
                  </div>
                  <Link 
                    href="/kontakt?kurz=latinfit" 
                    className="mt-6 w-full text-center py-4 rounded-xl text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 shadow-[0_10px_20px_rgba(244,114,182,0.2)] hover:scale-[1.02] transition-all duration-300"
                  >
                    Rezervovať lekciu
                  </Link>
                </div>
              </div>
            </section>

            {/* 2. SVADOBNÉ TANCE */}
            <section id="svadba" className="scroll-mt-36 space-y-8">
              {/* Mobile Only Header Slideshow */}
              <div className="lg:hidden w-full aspect-video rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-xl">
                <CategorySlideshow images={CATEGORY_IMAGES.svadba} alt="Svadobné tance" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Pre snúbencov
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Svadobné Tance
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                  Pripravíme vás na váš veľký deň. Od úplne základných krokov až po dychberúcu svadobnú choreografiu na mieru na vašu obľúbenú pieseň.
                </p>
              </div>

              {/* Invitation Envelope Style Banner */}
              <div className="p-8 rounded-[2rem] border border-gold-500/20 bg-gradient-to-r from-gold-500/[0.04] to-transparent relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6 shadow-[0_15px_30px_rgba(212,175,55,0.02)]">
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                    <Award className="w-4 h-4 text-gold-500" /> Individuálny prístup
                  </h3>
                  <p className="text-gray-400 text-xs font-light max-w-sm">
                    Lekcie prebiehajú v úplnom súkromí s profesionálnym trénerom, ktorý sa venuje výhradne iba vám dvom.
                  </p>
                </div>
                <div className="shrink-0 bg-obsidian-950/60 p-4 rounded-2xl border border-white/5 shadow-inner">
                  <HandwritingNote className="text-base text-gold-500" rotation={3}>
                    "Zachránime aj drevených ženíchov"
                  </HandwritingNote>
                </div>
              </div>

              {/* Svadobné Balíky - Luxury Voucher Design */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-8 rounded-[2rem] border border-white/5 bg-obsidian-850/60 backdrop-blur-sm flex flex-col justify-between h-full relative overflow-hidden shadow-lg hover:border-gold-500/20 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none rounded-bl-full" />
                  <div>
                    <span className="text-gold-500/60 text-[9px] font-bold uppercase tracking-widest mb-3 block">Základný Balík</span>
                    <h3 className="font-serif text-2xl font-bold text-white mb-4 group-hover:text-gold-500 transition-colors">Svadobná Pohoda</h3>
                    <div className="text-4xl font-serif font-bold text-white mb-6">140€</div>
                    <ul className="text-xs text-gray-400 space-y-3.5 mb-8">
                      <li className="flex items-center gap-2.5">
                        <span className="text-gold-500/40 text-sm">•</span> 4 x 45 minút individuálne
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="text-gold-500/40 text-sm">•</span> Vlastný výber hudby na mieru
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="text-gold-500/40 text-sm">•</span> Jednoduchá, pekná choreografia
                      </li>
                    </ul>
                  </div>
                  <Link 
                    href="/kontakt?kurz=svadba-basic" 
                    className="text-gold-500 text-[10px] font-bold tracking-widest uppercase hover:text-white flex items-center gap-2 group-hover:translate-x-1 transition-all duration-300"
                  >
                    Vybrať základ <ArrowRight className="w-3.5 h-3.5 text-gold-500/60 group-hover:text-white" />
                  </Link>
                </div>

                <div className="p-8 rounded-[2rem] border border-gold-500/30 bg-gradient-to-br from-gold-500/[0.04] via-obsidian-900/90 to-transparent relative flex flex-col justify-between h-full shadow-[0_20px_50px_rgba(212,175,55,0.06)] hover:border-gold-500 transition-all duration-500 group">
                  <div className="absolute top-6 right-6 px-3 py-1 bg-gold-500 text-obsidian-900 text-[8px] font-black rounded-full uppercase tracking-widest z-10 shadow-[0_5px_15px_rgba(212,175,55,0.2)]">
                    Najobľúbenejšie
                  </div>
                  <div>
                    <span className="text-gold-500 text-[9px] font-bold uppercase tracking-widest mb-3 block">Premium Balík</span>
                    <h3 className="font-serif text-2xl font-bold text-white mb-4">Svadobná Hviezda</h3>
                    <div className="text-4xl font-serif font-bold text-gold-500 mb-6">250€</div>
                    <ul className="text-xs text-gray-300 space-y-3.5 mb-8">
                      <li className="flex items-center gap-2.5">
                        <span className="text-gold-500 text-sm">★</span> 8 x 60 minút individuálne
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="text-gold-500 text-sm">★</span> Waltz, Valčík, Polka a Čardáš
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="text-gold-500 text-sm">★</span> Nácvik možný priamo na mieste sály
                      </li>
                    </ul>
                  </div>
                  <Link 
                    href="/kontakt?kurz=svadba-premium" 
                    className="btn-gold block text-center py-4 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:scale-[1.02] shadow-[0_10px_20px_rgba(212,175,55,0.15)] transition-transform"
                  >
                    Chcem Premium
                  </Link>
                </div>
              </div>
            </section>

            {/* 3. SPOLOČENSKÉ TANCE & VENČEKY */}
            <section id="spolocenske" className="scroll-mt-36 space-y-8">
              {/* Mobile Only Header Slideshow */}
              <div className="lg:hidden w-full aspect-video rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-xl">
                <CategorySlideshow images={CATEGORY_IMAGES.spolocenske} alt="Spoločenské tance" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Pre páry aj jednotlivcov
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Spoločenské Tance
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                  Začíname poznávacím základným levelom, kde si osvojíte základy 9 spoločenských tancov (štandardné a latinsko-americké). Ideálny spôsob, ako si oddýchnuť a načerpať novú energiu po práci.
                </p>
              </div>

              {/* Academy Dossier Layout */}
              <div className="p-8 rounded-[2rem] border border-white/5 bg-obsidian-850/60 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-lg">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-white/10 rounded-2xl p-4 bg-white/[0.01]">
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest block mb-1">Trvanie</span>
                      <span className="text-sm font-bold text-white font-serif">8 týždňov</span>
                      <span className="text-[10px] text-gray-400 block font-light">8 plných lekcií</span>
                    </div>
                    <div className="border border-white/10 rounded-2xl p-4 bg-white/[0.01]">
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest block mb-1">Cena</span>
                      <span className="text-sm font-bold text-gold-500 font-serif">75€</span>
                      <span className="text-[10px] text-gray-400 block font-light">za jednu osobu</span>
                    </div>
                  </div>
                  <Link 
                    href="/kontakt?kurz=spolocenske" 
                    className="btn-outline text-center block w-full py-3.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-white/5"
                  >
                    Prihlásiť sa na kurz
                  </Link>
                </div>
                
                <div className="relative border-l-2 border-blue-500/30 pl-8 py-3">
                  <span className="absolute -top-6 left-6 text-7xl font-serif text-blue-500/10 pointer-events-none select-none">“</span>
                  <p className="font-serif italic text-gray-300 text-sm leading-relaxed relative z-10">
                    "U nás môžete načerpať novú energiu, spoznať skvelých ľudí alebo nájsť novú vášeň pre život."
                  </p>
                </div>
              </div>

              {/* Grand Ball Invitation Layout for Venčeky */}
              <div className="p-8 rounded-[2rem] border border-gold-500/20 bg-gradient-to-r from-obsidian-950 to-gold-500/[0.03] space-y-6 relative overflow-hidden shadow-[0_15px_40px_rgba(212,175,55,0.03)] hover:border-gold-500/40 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />
                <div className="space-y-3">
                  <span className="text-gold-500 uppercase tracking-widest text-[9px] font-bold block">Tradičná spoločenská výchova</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                    Venčekové Slávnosti
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed max-w-xl">
                    Tradičná príprava stredoškolákov na ich prvý veľký bál. Okrem tanca učíme mladých ľudí aj základom spoločenskej etikety, slušnému správaniu a sebavedomému vystupovaniu v spoločnosti.
                  </p>
                </div>
                <Link 
                  href="/kontakt?sluzba=venceky" 
                  className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform"
                >
                  Mám záujem o Venček <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* 4. TANGO ARGENTÍNO */}
            <section id="tango" className="scroll-mt-36 space-y-8">
              {/* Mobile Only Header Slideshow */}
              <div className="lg:hidden w-full aspect-video rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-xl">
                <CategorySlideshow images={CATEGORY_IMAGES.tango} alt="Tango Argentíno" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Vášeň a hĺbka
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Tango Argentíno
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                  Pre argentínske tango neexistujú vekové hranice. Naučíme vás základné kroky, komunikáciu v tanečnom objatí i zložité improvizácie, ktoré sú základom tohto podmanivého štýlu.
                </p>
              </div>

              {/* Crimson Passion Lounge Card */}
              <div className="p-8 rounded-[2rem] border border-red-500/20 bg-gradient-to-br from-red-950/20 to-obsidian-900/90 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_15px_40px_-15px_rgba(239,68,68,0.15)] hover:shadow-[0_20px_50px_-10px_rgba(239,68,68,0.22)] hover:border-red-500/30 transition-all duration-500 group">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-red-400 font-bold block">Úvodný mesačný kurz</span>
                    <div className="text-4xl font-serif font-bold text-white">50€</div>
                    <p className="text-gray-400 text-xs font-light max-w-xs">
                      4 intenzívne skupinové lekcie plné objatia, prepojenia a improvizácie.
                    </p>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-400 font-light">
                    <li className="flex items-center gap-2">
                      <span className="text-red-500 text-xs">◆</span> Improvizácia a vášeň
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500 text-xs">◆</span> Tréning správneho držania tela
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500 text-xs">◆</span> Tanečná komunikácia v objatí
                    </li>
                  </ul>
                </div>
                <Link 
                  href="/kontakt?kurz=tango" 
                  className="btn-outline px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-red-500/20 hover:text-white shadow-[0_5px_15px_rgba(239,68,68,0.05)] transition-all duration-300 shrink-0 text-center w-full md:w-auto"
                >
                  Prihlásiť sa na Tango
                </Link>
              </div>
            </section>

            {/* 5. TANEČNÁ PRÍPRAVKA & EVENTY */}
            <section id="deti" className="scroll-mt-36 space-y-8">
              {/* Mobile Only Header Slideshow */}
              <div className="lg:hidden w-full aspect-video rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-xl">
                <CategorySlideshow images={CATEGORY_IMAGES.deti} alt="Detská prípravka" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Pre najmenších
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Tanečná Prípravka
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                  Pohybový a tanečný rozvoj pre deti už od 4 rokov. Lekcie sú vedené hravou formou s profesionálnymi trénermi, kde deti rozvíjajú koordináciu, motoriku a hudobný sluch.
                </p>
              </div>

              {/* Friendly Playful Amber Card */}
              <div className="p-8 rounded-[2rem] border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.02] via-obsidian-850/60 to-transparent flex flex-col sm:flex-row justify-between items-center gap-6 shadow-[0_15px_40px_-15px_rgba(245,158,11,0.05)] hover:border-amber-500/30 transition-all duration-300">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[8px] uppercase tracking-widest text-amber-400 font-bold block">Veková skupina</span>
                  <div className="text-2xl font-bold text-white font-serif">Deti od 4 do 7 rokov</div>
                  <p className="text-gray-400 text-xs font-light max-w-sm">
                    Hravé, bezpečné a inšpiratívne prostredie v plne vybavených sálach pod dohľadom milých trénerov.
                  </p>
                </div>
                <Link 
                  href="/kontakt?kurz=deti" 
                  className="btn-gold px-8 py-4 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:scale-[1.02] transition-transform shrink-0"
                >
                  Zistiť viac info
                </Link>
              </div>

              {/* VIP Corporate Event Offer Card */}
              <div className="pt-10 border-t border-white/5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3 py-1 bg-gold-500/15 border border-gold-500/20 text-gold-500 text-[9px] font-bold uppercase tracking-widest rounded-full">
                    Pre firemné akcie & svadby
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-white leading-tight">
                  Eventy & Profesionálne Vystúpenia
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                  Dodajte svojmu podujatiu eleganciu, vášeň a nezabudnuteľnú šou. Ponúkame širokú škálu profesionálnych tanečných vystúpení na kľúč – od vášnivej latiny cez klasické elegantné tance až po interaktívne tanečné workshopy priamo pre hostí.
                </p>
                
                <div className="p-8 rounded-[2.5rem] border border-gold-500/25 bg-gradient-to-br from-obsidian-950 via-obsidian-900 to-gold-500/[0.04] flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-gold-500/50 hover:shadow-[0_25px_60px_rgba(212,175,55,0.06)] transition-all duration-500 group">
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2 group-hover:text-gold-500 transition-colors">
                      <Sparkles className="w-4 h-4 text-gold-500 animate-spin-slow" /> Chcete ohúriť svojich hostí?
                    </h4>
                    <p className="text-gray-400 text-xs font-light max-w-sm">
                      Navrhneme vám program presne podľa vašej predstavy a charakteru akcie.
                    </p>
                  </div>
                  <Link 
                    href="/kontakt?sluzba=vystupenia" 
                    className="btn-gold px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center w-full md:w-auto hover:scale-[1.02] transition-transform shadow-[0_5px_15px_rgba(212,175,55,0.1)]"
                  >
                    Objednať vystúpenie
                  </Link>
                </div>
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}
