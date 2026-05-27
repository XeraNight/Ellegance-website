"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Award, Star, Search, ChevronRight } from "lucide-react";
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

const CITIES = [
  { name: "Bratislava", x: 60, y: 290 },
  { name: "Žilina", x: 240, y: 140 },
  { name: "Banská Bystrica", x: 320, y: 210 },
  { name: "Poprad", x: 440, y: 150 },
  { name: "Košice", x: 520, y: 190 }
];

export default function SutazePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const filteredCompetitions = COMPETITIONS.filter(comp => {
    const matchesCity = selectedCity ? comp.city === selectedCity : true;
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 bg-obsidian-900 relative overflow-hidden selection:bg-gold-500/30">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Map Area */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6 self-start flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-500" /> Interaktívna mapa turnajov
            </h3>

            {/* 3D SVG Globe Container */}
            <div className="w-full aspect-[600/480] min-h-[480px] rounded-[2rem] border border-white/10 bg-obsidian-950/60 backdrop-blur-md overflow-hidden shadow-2xl relative group">
              <MilitaryMap 
                activeMarkerLabel={selectedCity}
                onMarkerSelect={(city) => setSelectedCity(selectedCity === city ? null : city)}
              />
            </div>

            {/* Clear Filters indicator */}
            {selectedCity && (
              <button
                onClick={() => setSelectedCity(null)}
                className="mt-4 text-[9px] font-bold uppercase tracking-wider text-gold-500/60 hover:text-gold-500 border-b border-gold-500/20 hover:border-gold-500/60 pb-0.5"
              >
                Zrušiť filter mesta: {selectedCity} (zobraziť všetky)
              </button>
            )}
          </div>

          {/* RIGHT COLUMN: Competitions List */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="flex items-center gap-4 w-full text-left">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Hľadať súťaže..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-2xl px-4 py-3 text-xs font-light text-white focus:outline-none transition-all pl-10"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {filteredCompetitions.length === 0 ? (
                  <div className="py-16 text-center rounded-2xl border border-white/5 bg-white/[0.01]">
                    <p className="text-gray-400 text-sm font-light">Nenašli sa žiadne vyhovujúce súťaže.</p>
                  </div>
                ) : (
                  filteredCompetitions.map((comp) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      key={comp.id}
                      onClick={() => setSelectedCity(comp.city)}
                      className={`p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer text-left group ${
                        selectedCity === comp.city
                          ? "bg-gradient-to-br from-gold-500/[0.05] via-gold-500/[0.01] to-transparent border-gold-500/40 shadow-lg"
                          : "bg-obsidian-950/40 border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                      }`}
                    >
                      {/* Header row */}
                      <div className="flex justify-between items-start gap-4 mb-3.5">
                        <div className="space-y-1">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                            comp.status === "Organizujeme" ? "bg-gold-500/10 text-gold-500 border border-gold-500/20" : "bg-white/5 text-gray-400"
                          }`}>
                            {comp.status}
                          </span>
                          <h3 className="font-serif text-base md:text-lg font-bold text-white group-hover:text-gold-500 transition-colors leading-tight">
                            {comp.title}
                          </h3>
                        </div>
                        <span className="text-[10px] font-light text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full shrink-0 font-mono">
                          {comp.type}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
                        {comp.description}
                      </p>

                      {/* Meta Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3.5 border-t border-white/5 text-[10px] text-gray-500 font-sans">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gold-500/60" />
                          <span>{comp.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-gold-500/60" />
                          <span className="truncate">{comp.venue} ({comp.city})</span>
                        </div>
                        <div className="flex items-center gap-2 col-span-full border-t border-white/5 pt-2 border-dashed">
                          <Award className="w-3.5 h-3.5 text-gold-500/60" />
                          <span className="truncate">Kategórie: <strong className="text-gray-300 font-light">{comp.categories}</strong></span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Parent's Guide Section */}
        <div className="mt-20 border-t border-white/5 pt-16 text-left">
          <div className="max-w-3xl mb-12">
            <span className="text-gold-500 uppercase tracking-[0.4em] text-[10px] font-black mb-3 block">
              Dôležité informácie pre rodiny
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mb-4">
              Sprievodca rodiča <span className="text-gold-500 font-light italic">na súťažiach</span>
            </h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Súťažný tanec prináša nezabudnuteľné zážitky, no vyžaduje si aj pochopenie pravidiel a dôveru v trénera. Prečítajte si, ako prebieha prihlasovanie a ako sa správne správať na parkete a mimo neho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Prihlasovanie */}
            <div className="p-8 rounded-[2rem] bg-obsidian-950/50 border border-white/5 relative overflow-hidden group hover:border-gold-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-all duration-500"></div>
              <h3 className="font-serif text-lg font-bold text-white mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/10 text-gold-500 text-xs font-mono font-bold">1</span>
                Prihlasovanie na súťaže
              </h3>
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                Upozorňujeme rodičov, že <strong className="text-white font-medium">prihlasovanie detí na oficiálne súťaže SZTŠ vykonáva výhradne tréner</strong> ako oficiálny zástupca nášho klubu. Prihlásenie neprebieha individuálne zo strany rodičov. 
              </p>
              <div className="mt-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] text-gray-500 font-sans leading-relaxed">
                <strong className="text-gold-500 font-bold uppercase tracking-wider block mb-1">Postup:</strong>
                Rodičia sa pred každou súťažou osobne alebo správou dohodnú s trénerom (buď ho kontaktujú sami, alebo tréner osloví ich), aby včas potvrdili účasť tanečného páru a tréner vedel vyhotoviť oficiálnu klubovú prihlášku.
              </div>
            </div>

            {/* Box 2: Štartovné poplatky */}
            <div className="p-8 rounded-[2rem] bg-obsidian-950/50 border border-white/5 relative overflow-hidden group hover:border-gold-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-all duration-500"></div>
              <h3 className="font-serif text-lg font-bold text-white mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/10 text-gold-500 text-xs font-mono font-bold">2</span>
                Štartovné a registrácia
              </h3>
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                Štartovné poplatky za tanečné páry sú úplne oddelené od bežných vstupeniek pre divákov. <strong className="text-white font-medium">Štartovné sa neplatí vopred, ale až priamo na mieste konania.</strong>
              </p>
              <div className="mt-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] text-gray-500 font-sans leading-relaxed">
                <strong className="text-gold-500 font-bold uppercase tracking-wider block mb-1">Kde platiť:</strong>
                Po príchode vyhľadajte stolík usporiadateľského klubu (zvyčajne označený ako „Prezentácia“), kde zaplatíte štartovné a vyzdvihnete si štartovné číslo. Vstupenky pre sprevádzajúcich rodičov sa kupujú samostatne na pokladni pre divákov.
              </div>
            </div>

            {/* Box 3: Dôvera v trénera */}
            <div className="p-8 rounded-[2rem] bg-obsidian-950/50 border border-white/5 relative overflow-hidden group hover:border-gold-500/20 transition-all duration-300 md:col-span-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl group-hover:bg-gold-500/10 transition-all duration-500"></div>
              <h3 className="font-serif text-lg font-bold text-white mb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/10 text-gold-500 text-xs font-mono font-bold">3</span>
                Profesionálny odstup a porotovanie (Kódex SZTŠ)
              </h3>
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                Náš klubový tréner TK Ellegance je na mnohých celoštátnych súťažiach nominovaný ako <strong className="text-white font-medium">oficiálny rozhodca SZTŠ</strong>. Podľa prísnych medzinárodných aj národných športových pravidiel platí, že <strong className="text-gold-500 font-medium">porotcovia nesmú počas celej súťaže verbálne ani neverbálne komunikovať so svojimi klubovými pármi</strong>, pomáhať im na tanečnej ploche ani stáť v ich blízkosti.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-[10px] text-gray-500 leading-relaxed">
                  <strong className="text-white font-medium block mb-1">Rešpekt k pravidlám:</strong>
                  Prosíme rodičov, aby dbali na toto nariadenie. Ak je tréner v porote, nečakajte od neho povzbudzovanie na ploche. Musí ostať striktne nestranný, inak hrozí diskvalifikácia páru. Dôverujte jeho profesionalite.
                </div>
                <div className="p-4 rounded-xl bg-gold-500/[0.02] border border-gold-500/10 text-[10px] text-gold-500/85 leading-relaxed">
                  <strong className="text-gold-500 font-bold uppercase tracking-wider block mb-1">💡 Trénerský Pro Tip pre rodičov:</strong>
                  Ak ste na súťaži noví, nebuďte v tom sami! V hľadisku je vždy skvelá skupina skúsenejších rodičov z nášho klubu TK Ellegance. Neváhajte sa s nimi poradiť a spojiť sily – radi vám vysvetlia zákulisné chody a pomôžu s akoukoľvek otázkou.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
