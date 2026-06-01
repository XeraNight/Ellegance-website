"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAssetPath, cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValue, animate, useInView } from "framer-motion";

const HERO_IMAGES = [
  getAssetPath("/images/IMG_1710.jpeg"),
  getAssetPath("/images/IMG_1686.jpeg"),
  getAssetPath("/images/d66319cd-ce83-45f6-9fea-97d6b4e680d8.JPG"),
  getAssetPath("/images/512F4A0F-AFDE-4CB4-B708-235B7FDBA9D1.JPG"),
  getAssetPath("/IMG_1940.JPG"),
];

function Counter({ end, suffix = "", prefix = "" }: { end: number, suffix?: string, prefix?: string }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, { 
        duration: 2, 
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
      return () => controls.stop();
    }
  }, [isInView, end, count]);

  return <span ref={nodeRef}>{prefix}{displayValue}{suffix}</span>;
}

export default function SutaznyTanecPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (expandedIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expandedIdx]);

  const selectedInstructor = expandedIdx !== null ? INSTRUCTORS[expandedIdx] : null;

  return (
    <>
      {/* ... Hero Section ... */}
      <section className="relative h-screen w-full overflow-hidden bg-obsidian-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[currentImage]}
              alt="Competitive Dance"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian-900/80 via-obsidian-900/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-60" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-4xl"
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Vychovávame <br />
              <span className="text-gold-500 italic font-light">Šampiónov</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
              Náš klub sa dlhodobo radí k slovenskej špičke v tanečnom športe. Spájame tvrdú drinu, profesionálny systém a radosť z tanca.
            </p>
            
            <div className="flex items-center gap-8">
              <Link href="/kontakt" className="btn-gold px-12 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform">
                Pridajte sa k nám
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-b border-gold-500/10 bg-obsidian-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="font-serif text-5xl text-gold-500 mb-2">
                <Counter end={36} suffix="+" />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Rokov skúseností</div>
            </div>
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
              <div className="font-serif text-5xl text-gold-500 mb-2">
                <Counter end={350} suffix="+" />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Získaných medailí</div>
            </div>
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <div className="font-serif text-5xl text-gold-500 mb-2">
                <Counter end={12} />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Reprezentantov SR</div>
            </div>
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.7s' }}>
              <div className="font-serif text-5xl text-gold-500 mb-2">
                <Counter end={5} prefix="Top " />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Klubov na Slovensku</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Tréneri & Odbornosť */}
      <section className="py-32 bg-obsidian-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">Naši lektori</span>
              <div className="h-px w-8 bg-gold-500" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Tréneri so <span className="text-gold-500 italic font-light">svetovými</span> skúsenosťami
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 lg:gap-x-12">
            {INSTRUCTORS.map((instructor, idx) => (
              <InstructorCard 
                key={instructor.name} 
                instructor={instructor} 
                index={idx} 
                isActive={expandedIdx === idx}
                isDimmed={(hoveredIdx !== null && hoveredIdx !== idx) || (expandedIdx !== null && expandedIdx !== idx)}
                onHover={() => setHoveredIdx(idx)}
                onLeave={() => setHoveredIdx(null)}
                onToggle={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              />
            ))}
          </div>
        </div>

        {/* Global Achievement Overlay (The "Bublina") */}
        <AnimatePresence>
          {expandedIdx !== null && selectedInstructor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-obsidian-950/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => setExpandedIdx(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className="w-full max-w-6xl bg-obsidian-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] p-8 md:p-16 relative overflow-y-auto max-h-[90vh] custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button - Sticky/Fixed relative to bubble */}
                <button 
                  onClick={() => setExpandedIdx(null)}
                  className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/5 hover:bg-gold-500 hover:text-obsidian-900 flex items-center justify-center text-white transition-all duration-300 z-50 group shadow-xl"
                  aria-label="Zatvoriť"
                >
                  <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex flex-col gap-10 md:gap-14">
                  <div className="flex items-center gap-6 md:gap-8">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl overflow-hidden border-2 border-gold-500/30 shadow-2xl shrink-0">
                      <img src={selectedInstructor.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2 md:mb-3">{selectedInstructor.name}</h3>
                      <div className="flex items-center gap-3">
                        <div className="h-px w-6 bg-gold-500/50" />
                        <p className="text-gold-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-black">Profil & Kariérne úspechy</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 relative">
                    {/* Vertical Dividers - Hidden on mobile */}
                    <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
                    <div className="hidden md:block absolute left-2/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

                    {/* Column 1 */}
                    <AchievementColumn 
                      items={selectedInstructor.achievements.slice(0, Math.ceil(selectedInstructor.achievements.length / 3))} 
                      startIndex={0}
                    />
                    {/* Column 2 */}
                    <AchievementColumn 
                      items={selectedInstructor.achievements.slice(Math.ceil(selectedInstructor.achievements.length / 3), Math.ceil(selectedInstructor.achievements.length / 3 * 2))} 
                      startIndex={Math.ceil(selectedInstructor.achievements.length / 3)}
                    />
                    {/* Column 3 */}
                    <AchievementColumn 
                      items={selectedInstructor.achievements.slice(Math.ceil(selectedInstructor.achievements.length / 3 * 2))} 
                      startIndex={Math.ceil(selectedInstructor.achievements.length / 3 * 2)}
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -left-20 -top-20 w-60 h-60 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

function AchievementColumn({ items, startIndex }: { items: string[], startIndex: number }) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: (startIndex + i) * 0.05 }}
          className="flex items-start gap-4 group/item"
        >
          <div className="shrink-0 mt-1.5 w-4 h-4 rounded-full border border-gold-500/30 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          </div>
          <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors">{item}</span>
        </motion.div>
      ))}
    </div>
  );
}

function InstructorCard({ instructor, index, isActive, isDimmed, onHover, onLeave, onToggle }: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isStaggered = index % 2 !== 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    onLeave();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{ 
        opacity: isActive ? 1 : (isDimmed ? 0.6 : 1),
        scale: isActive ? 1.02 : (isDimmed ? 0.98 : 1),
        filter: isActive ? "blur(0px)" : (isDimmed ? "blur(4px)" : "blur(0px)"),
        zIndex: isActive ? 50 : (isDimmed ? 10 : 20)
      }}
      transition={{ 
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className={cn(
        "relative flex flex-col group transition-all duration-500",
        isStaggered ? "lg:mt-20" : ""
      )}
    >
      {/* 3D Tilt Wrapper */}
      <motion.div
        animate={{
          rotateY: mousePos.x * 20,
          rotateX: -mousePos.y * 20,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative z-10"
      >
        {/* Photo Container */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/5 bg-white/10 group-hover:border-gold-500/30 transition-colors duration-500">
          <img 
            src={instructor.image} 
            alt={instructor.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-90" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />

          {/* Expand Arrow */}
          <button 
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-obsidian-900 shadow-2xl z-20 hover:scale-110 transition-transform active:scale-95"
          >
            <motion.svg 
              animate={{ rotate: isActive ? 180 : 0 }}
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          <div className="absolute bottom-6 left-6 pr-16 pointer-events-none">
            <p className="text-white text-2xl font-serif font-bold leading-tight group-hover:text-gold-500 transition-colors">{instructor.name}</p>
            <p className="text-gold-500/80 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">{instructor.role}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const INSTRUCTORS = [
  {
    name: "Štefan Stropko",
    role: "Lektor a choreograf",
    image: getAssetPath("/images/Stefan Stropko.png"),
    achievements: [
      "Lektor tanečnej prípravky pre deti od 3 rokov",
      "Lektor spoločenských tancov pre deti od 6 rokov",
      "Lektor a choreograf svadobných tancov",
      "Lektor venčekových kurzov",
      "Majster Slovenska vo formáciách",
      "Finalista GOC v tanci na vozíku v štandardných a latinsko-amerických tancoch",
      "Majster sveta v tanci na vozíku (LAT a Freestyle): 2019 (Nemecko, Bonn)",
      "Finalista majstrovstiev sveta v tanci na vozíku (STT): 2023 (Taliansko, Genoa)",
      "Finalista majstrovstiev Európy v tanci na vozíku (STT a Freestyle): 2024 (Česko, Praha)"
    ]
  },
  {
    name: "Petra Chomová",
    role: "Lektorka tanečnej prípravky",
    image: getAssetPath("/images/Petra Chomová.png"),
    achievements: [
      "Lektorka tanečnej prípravky pre deti od 3 rokov",
      "Lektorka spoločenských tancov pre deti od 6 rokov",
      "1. miesto na Európskom pohári Showtime dance vo formáciách - 2024",
      "Finalistka Majstrovstiev sveta v tanci na vozíku v štandardných tancoch - 2023",
      "Vicemajsterka Európy v tanci na vozíku v štandardných tancoch - 2024",
      "3. miesto na svetovom pohári v tanci na vozíku vo Freestyle: 2024 (Antalya, Turecko)",
      "3. miesto na svetovom pohári v tanci na vozíku vo Freestyle: 2024 (Košice)"
    ]
  },
  {
    name: "Linda Sanislová",
    role: "Lektorka tanečnej prípravky",
    image: getAssetPath("/images/Linda Sanislová.png"),
    achievements: [
      "Lektorka spoločenských tancov pre deti od 6 rokov",
      "Lektorka tanečného športu - štandardných tancov v kat. deti a mládež",
      "Majsterka Slovenska v plesových choreografiách - 2023",
      "Finalistka MSR v 10 tancoch do 21 rokov - 2023"
    ]
  },
  {
    name: "Yelyzaveta Peregudová",
    role: "Lektorka spoločenských tancov",
    image: getAssetPath("/images/Yelizaveta Peregudová.png"),
    achievements: [
      "Lektorka tanečného športu - latinsko-amerických tancov (deti, mládež, dospelí)",
      "Vicemajsterka Európy v kategórii deti: 2016 (Assen, Holandsko)",
      "Majsterka sveta v kategórii deti: 2017 (Paríž, Francúzsko)",
      "Majsterka Európy: 2017 (Blackpool, Anglicko)",
      "Absolútna víťazka súťaže Blackpool (4 prvé miesta): 2017 (Anglicko)",
      "3. miesto na majstrovstvách Európy (juniori): 2018 (Blackpool)",
      "Finalistka súťaže Blackpool (juniori): 2018 (Anglicko)",
      "Pozvaný hosť na Showtime – Liang, Čína",
      "3. miesto na majstrovstvách sveta (mládež): 2021 (Neapol, Taliansko)",
      "Vicemajsterka Slovenska v kategórii mládež - 2023",
      "Finalistka MSR v kategórii mládež - 2025",
      "Kandidátka na Majsterku športu Ukrajiny",
      "Laureátka ocenenia primátora mesta „Pýcha Kharkova“"
    ]
  },
  {
    name: "Zuzana Šiminská",
    role: "Lektorka tanečnej prípravky",
    image: getAssetPath("/images/Zuzaná šimická.png"),
    achievements: [
      "Diplomovaná trénerka 1. kvalifikačného stupňa",
      "Lektorka tanečnej prípravky pre deti od 3 rokov",
      "Lektorka spoločenských tancov pre deti od 6 rokov",
      "Lektorka latino tancov pre dievčatá",
      "Lektorka kurzov Latin Fit",
      "Vicemajsterka MSR v LAT (Junior 1) - 2012",
      "Vicemajsterka MSR v LAT (Junior 2) - 2014",
      "Finalistka MSR LAT do 21 rokov - 2019",
      "Semifinalistka MSR LAT dospelých - 2020"
    ]
  },
  {
    name: "Ing. Dominika Vidašičová",
    role: "Lektorka a trénerka",
    image: getAssetPath("/images/Dominika Vidašičová.png"),
    achievements: [
      "Diplomovaná trénerka 1. kvalifikačného stupňa",
      "Lektorka Tanga Argentína",
      "Lektorka venčekových kurzov",
      "Lektorka a choreografka svadobných tancov",
      "Lektorka kurzov spoločenských tancov pre dospelých",
      "Diplomovaná lektorka Port De Bras",
      "Diplomovaná nutričná poradkyňa",
      "Vicemajsterka Majstrovstiev Slovenska v plesových choreografiách",
      "Vicemajsterka Európskeho pohára v plesových choreografiách"
    ]
  },
  {
    name: "Mgr. Helenka Kašická",
    role: "Administratíva a PARA DANCE",
    image: getAssetPath("/images/Helenka Kašická.png"),
    achievements: [
      "Administratívny správca tanečného klubu (prihlášky, registrácie, platby)",
      "Lektorka súťažného tanca v Para dance",
      "Lektorka kurzov tanca na vozíku",
      "10-násobná Majsterka Sveta v tanci na vozíku",
      "Niekoľkonásobná Majsterka Európy v tanci na vozíku"
    ]
  },
  {
    name: "Ing. Peter Vidašič",
    role: "Hlavný tréner a prezident",
    image: getAssetPath("/images/Peter Vidašič.png"),
    achievements: [
      "Prezident tanečného klubu – BOSS",
      "Lektor tanečného športu – LAT a STT (deti, mládež, dospelí a seniori)",
      "Lektor komerčných tancov",
      "Choreograf pre showdance, freestyle a plesové choreografie",
      "Diplomovaný tréner 3. kvalifikačného stupňa",
      "Diplomovaný učiteľ tanca",
      "TOP rozhodca S stupňa",
      "Medzinárodný rozhodca a lektor v Para dance",
      "Reprezentačný tréner Para dance (SZTPŠ)",
      "Finalista MSR v LAT (dospelí) a STT/LAT (mládež)",
      "Majster Slovenska vo formáciách (STT a LAT)",
      "Semifinalista MS vo formáciách",
      "Finalista medzinárodných súťaží v STT a LAT",
      "Vicemajster sveta v tanci na vozíku (LAT): 2008 (Minsk), 2010 (Hannover), 2013 (Tokyo), 2015 (Rím)",
      "Majster sveta v tanci na vozíku (STT): 2013 (Tokyo), 2015 (Rím)",
      "Majster sveta v tanci na vozíku (Freestyle): 2015 (Rím)",
      "4-násobný Majster Európy v Para dance (LAT, STT, Freestyle) 2016",
      "Projekty: Bailando (5. miesto), Modré z neba, Integrácia, Slovensko má talent, Na kolesách proti rakovine, Hodina deťom, Kaviareň slávia"
    ]
  }
];

