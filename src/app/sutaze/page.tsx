"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Award, Search, Navigation } from "lucide-react";
import dynamic from "next/dynamic";

const MilitaryMap = dynamic(() => import("@/components/MilitaryMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[600/420] min-h-[380px] rounded-3xl border border-white/10 bg-obsidian-950/40 backdrop-blur-md flex items-center justify-center text-gray-400 text-xs font-mono tracking-widest uppercase">
      Načítavam 3D mapu...
    </div>
  )
});

// Mock data for Slovak competitions
const COMPETITIONS = [
  {
    id: "comp-1",
    title: "Grand Prix Košice 2026",
    date: "17. – 18. október 2026",
    city: "Košice",
    venue: "Spoločenský Pavilón, Jedlíkova 7",
    organizer: "TK Ellegance Košice & SZTŠ",
    categories: "WDSF International Open (Standard & Latina), Mládež, Deti",
    type: "WDSF International",
    description: "Náš domovský klub TK Ellegance organizuje prestížny medzinárodný turnaj za účasti svetovej tanečnej špičky. Nenechajte si ujsť fantastickú tanečnú šou priamo v Košiciach!",
    status: "Organizujeme",
    coords: { x: 520, y: 190 }
  },
  {
    id: "comp-2",
    title: "Majstrovstvá SR v 10 tancoch",
    date: "14. marec 2026",
    city: "Bratislava",
    venue: "Hant Aréna, Trnavská cesta 29",
    organizer: "SZTŠ & KST M-Dance",
    categories: "Dospelí, Mládež, Juniori",
    type: "Národný šampionát",
    description: "Najdôležitejšia súťaž roka v kombinácii 10 tancov. Naši najlepší reprezentanti budú bojovať o finálové umiestnenia a nominačné lístky na majstrovstvá sveta.",
    status: "Cestujeme",
    coords: { x: 60, y: 290 }
  },
  {
    id: "comp-3",
    title: "Pohár primátora mesta Banská Bystrica",
    date: "9. máj 2026",
    city: "Banská Bystrica",
    venue: "Športová hala Štiavničky",
    organizer: "Fáber Dance Team",
    categories: "Deti, Juniori, Dospelí, Hobby kategórie",
    type: "Pohárová súťaž",
    description: "Tradičná bodovacia a pohárová súťaž v srdci stredného Slovenska. Skvelá príležitosť pre naše začínajúce páry získať cenné body a finálové poháre.",
    status: "Cestujeme",
    coords: { x: 320, y: 210 }
  },
  {
    id: "comp-4",
    title: "Tatranský Pohár 2026",
    date: "6. jún 2026",
    city: "Poprad",
    venue: "Aréna Poprad, Uherova 2",
    organizer: "KST Poprad & SZTŠ",
    categories: "Mládež, Dospelí, Seniori",
    type: "Pohárová súťaž",
    description: "Súťaž s nádherným tatranským pozadím. Zameraná na kategórie dospelých a seniorov, kde sa predstavia aj naše nové seniorské páry.",
    status: "Cestujeme",
    coords: { x: 440, y: 150 }
  },
  {
    id: "comp-5",
    title: "Žilinská tanečná jeseň",
    date: "14. november 2026",
    city: "Žilina",
    venue: "Mestská športová hala, Športová 2",
    organizer: "TŠK Top Dance",
    categories: "Deti, Juniori, Mládež",
    type: "Bodovacia súťaž",
    description: "Jesenná pohárová súťaž na severe Slovenska s bohatou účasťou detských a juniorských kategórií. Skvelá atmosféra a skvelá príprava na zimnú časť sezóny.",
    status: "Cestujeme",
    coords: { x: 240, y: 140 }
  }
];

export default function SutazePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompetitions = COMPETITIONS.filter(comp => {
    const matchesCity = selectedCity ? comp.city === selectedCity : true;
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const activeComp = filteredCompetitions.find(c => c.city === selectedCity) || COMPETITIONS[0];
  const trasaUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeComp.venue + ", " + activeComp.city)}`;

  return (
    <div className="min-h-screen pt-[58px] pb-8 md:pt-28 md:pb-20 bg-obsidian-900 relative selection:bg-gold-500/30">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="hidden md:block text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <span className="text-gold-500 uppercase tracking-[0.4em] text-[10px] font-black mb-3 block">
            Kde nás môžete podporiť
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Kalendár <span className="text-gold-500 font-light italic">súťaží</span>
          </h1>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            Pozrite si, kde naši tanečníci reprezentujú klub Ellegance. Kliknite na mestá na mape alebo filtrujte zoznam súťaží.
          </p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
          
          {/* LEFT COLUMN: Map & Search Area (Sticky on mobile below header) */}
          <div className="lg:col-span-7 flex flex-col items-center sticky top-[58px] z-30 bg-obsidian-900/95 backdrop-blur-md md:relative md:top-0 md:z-10 md:bg-transparent -mx-6 md:-mx-0 px-0 pt-0 pb-0 border-b-0 md:border-b-0 md:px-0 md:pt-0 md:pb-0 shadow-lg md:shadow-none w-screen md:w-full relative">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 self-start flex items-center gap-2 md:block hidden">
              <MapPin className="w-4 h-4 text-gold-500 inline-block mr-2" /> Interaktívna mapa turnajov
            </h3>

            {/* 3D SVG Globe Container (Edge-to-edge on mobile, roomy height) */}
            <div className="w-full aspect-[600/500] md:aspect-[600/480] h-[360px] sm:h-[420px] md:h-auto rounded-none md:rounded-[2rem] border-x-0 border-t-0 border-b border-white/10 md:border border-white/10 bg-obsidian-900 overflow-hidden relative group">
              <MilitaryMap 
                activeMarkerLabel={selectedCity}
                onMarkerSelect={(city) => setSelectedCity(selectedCity === city ? null : city)}
                layout={{
                  cornerRadius: 0,
                  padding: 0,
                  showBorder: false,
                }}
              />
            </div>

            {/* Search Bar - Placed as absolute floating overlay on mobile (top-4), standard search box on desktop */}
            <div className="absolute top-4 left-0 right-0 max-w-[280px] sm:max-w-[320px] mx-auto px-4 z-20 md:relative md:top-0 md:left-auto md:right-auto md:max-w-none md:px-0 md:mt-4 md:z-auto text-left">
              <div className="relative shadow-2xl md:shadow-none">
                <input
                  type="text"
                  placeholder="Hľadať súťaže..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-obsidian-800 border border-white/15 hover:border-white/30 focus:border-gold-500 focus:bg-obsidian-700 rounded-2xl pl-10 pr-12 py-2.5 text-xs font-light text-white focus:outline-none transition-all duration-100 shadow-inner"
                />
                <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <a
                  href={trasaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Trasa do ${activeComp.city}`}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-gold-500/10 border border-gold-500/20 hover:bg-gold-500/20 active:scale-95 transition-all duration-100 flex items-center justify-center cursor-pointer group/nav"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold-500 group-hover/nav:text-gold-400 transition-colors rotate-45" />
                </a>
              </div>
            </div>

            {/* Clear Filters indicator - Floating capsule badge above sticky bottom sheet on mobile, text button below on desktop */}
            {selectedCity && (
              <div className="absolute bottom-14 left-6 z-50 md:relative md:bottom-auto md:left-auto md:mt-2">
                <button
                  onClick={() => setSelectedCity(null)}
                  className="px-2.5 py-1.5 rounded-xl bg-obsidian-800 border border-gold-500/40 text-[9px] font-bold uppercase tracking-wider text-gold-500 hover:text-gold-400 hover:border-gold-500 active:scale-95 hover:scale-102 transition-all duration-100 shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                  Zrušiť filter: {selectedCity}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Competitions List (Sticky bottom sheet on mobile, clean list on desktop) */}
          <div className="lg:col-span-5 sticky top-[340px] sm:top-[400px] md:relative md:top-auto z-40 -mt-12 md:-mt-20 -mx-6 md:-mx-0 w-screen md:w-full bg-obsidian-900 border-t border-x-0 border-b-0 border-gold-500/30 md:border-none rounded-t-[2.5rem] md:rounded-none shadow-2xl md:shadow-none overflow-hidden md:overflow-visible flex flex-col h-[360px] md:h-auto pt-0">
            
            {/* Drag Handle Indicator for mobile bottom sheet */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-3.5 shrink-0 md:hidden"></div>

            {/* List (2 columns on mobile, 1 column on desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4 overflow-y-auto flex-1 min-h-0 px-4 pb-4 md:px-0 md:pb-0 md:max-h-[520px] pr-1">
              <AnimatePresence mode="popLayout">
                {filteredCompetitions.length === 0 ? (
                  <div className="py-16 text-center rounded-2xl border border-white/5 bg-white/[0.01] col-span-2">
                    <p className="text-gray-400 text-sm font-light">Nenašli sa žiadne vyhovujúce súťaže.</p>
                  </div>
                ) : (
                  filteredCompetitions.map((comp) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 450, damping: 30, mass: 0.6 }}
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      key={comp.id}
                      onClick={() => setSelectedCity(selectedCity === comp.city ? null : comp.city)}
                      className={`p-3.5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border transition-colors duration-150 cursor-pointer text-left group w-full relative overflow-hidden ${
                        selectedCity === comp.city
                          ? "bg-gradient-to-br from-gold-500/[0.12] to-obsidian-800 border-gold-500/70 shadow-lg shadow-gold-500/10 col-span-2"
                          : "bg-obsidian-800 border-white/10 hover:border-white/20 hover:bg-obsidian-700 col-span-1"
                      }`}
                    >
                      {/* Subtle hover background highlight glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/[0.02] rounded-full blur-2xl group-hover:bg-gold-500/[0.05] transition-all duration-300 pointer-events-none"></div>

                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 md:gap-3 mb-2 md:mb-3 relative z-10">
                        <div className="space-y-1 min-w-0">
                          <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            comp.status === "Organizujeme" ? "bg-gold-500/10 text-gold-500 border border-gold-500/20" : "bg-white/5 text-gray-400"
                          }`}>
                            {comp.status}
                          </span>
                          <h3 className="font-serif text-[11px] sm:text-xs md:text-base font-bold text-white group-hover:text-gold-500 transition-colors leading-tight line-clamp-2">
                            {comp.title}
                          </h3>
                        </div>
                        <span className="text-[7px] md:text-[9px] font-light text-gray-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full shrink-0 font-mono">
                          {comp.type}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs font-light leading-relaxed mb-3 md:mb-4 relative z-10 line-clamp-2 md:line-clamp-none">
                        {comp.description}
                      </p>

                      {/* Meta Details (Neatly separated boxes) */}
                      <div className="mt-2.5 pt-2.5 border-t border-white/5 space-y-1.5 md:space-y-2 text-[8px] md:text-[10px] text-gray-500 font-sans relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-2">
                          <div className="flex items-center gap-1.5 md:gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-1.5 md:p-2.5">
                            <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-gold-500/75 shrink-0" />
                            <div className="space-y-0.5 min-w-0 flex-1">
                              <span className="text-[6.5px] md:text-[8px] uppercase tracking-wider text-gray-500 block leading-none">Dátum</span>
                              <span className="text-gray-200 font-light block truncate leading-tight text-[8px] md:text-[10px]">{comp.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-1.5 md:p-2.5 overflow-hidden">
                            <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-gold-500/75 shrink-0" />
                            <div className="space-y-0.5 min-w-0 flex-1">
                              <span className="text-[6.5px] md:text-[8px] uppercase tracking-wider text-gray-500 block leading-none">Miesto</span>
                              <span className="text-gray-200 font-light truncate block leading-tight text-[8px] md:text-[10px]">
                                <span className="md:hidden">{comp.city}</span>
                                <span className="hidden md:inline">{comp.venue} ({comp.city})</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 md:gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-1.5 md:p-2.5 border-dashed">
                          <Award className="w-3 h-3 md:w-3.5 md:h-3.5 text-gold-500/75 shrink-0 mt-0.5" />
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <span className="text-[6.5px] md:text-[8px] uppercase tracking-wider text-gray-500 block leading-none">Kategórie</span>
                            <span className="text-gray-300 font-light truncate block leading-tight text-[8px] md:text-[10px]">{comp.categories}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
