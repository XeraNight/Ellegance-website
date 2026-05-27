"use client";

import React, { useState } from "react";
import Link from "next/link";
import RotatingText from "@/components/RotatingText";
import { getAssetPath } from "@/lib/utils";
import NewsPopup from "@/components/NewsPopup";
import NewsModal, { NewsItem } from "@/components/NewsModal";

const ROTATING_WORDS = ['tanečníci', 'rodina', 'Ellegance'];

const CAMP_DATA: NewsItem = {
  id: "camp-2026",
  title: "Letný kemp Ellegance",
  subtitle: "5 dní tanca, zábavy a nových kamarátstiev",
  badge: "Summer 2025",
  image: "/images/image copy.png",
  date: "20. – 25. júl 2026",
  location: "Košice, Slovakia",
  venue: "Féjová 123, 040 01 Košice",
  categories: "Deti (7-11 rokov) • Juniors (12-15 rokov) • Teens (16+) • Pokročilí",
  trainers: [
    { name: "Zuzana K.", image: "/images/peter_vidasic.jpg" },
    { name: "Martin D.", image: "/images/peter_vidasic.jpg" },
    { name: "Laura B.", image: "/images/peter_vidasic.jpg" },
    { name: "Tomáš H.", image: "/images/peter_vidasic.jpg" }
  ],
  agenda: [
    { time: "09:00 – 10:30", activity: "Tréning 1" },
    { time: "10:45 – 12:15", activity: "Tréning 2" },
    { time: "13:30 – 15:00", activity: "Tréning 3" },
    { time: "15:15 – 16:45", activity: "Tréning 4" },
    { time: "17:00 – 18:30", activity: "Workshop / Choreografia" }
  ],
  whatToBring: "Pohodlné tanečné oblečenie, tenisky, fľašu na vodu, uterák, dobrú náladu 🥰",
  food: "Obed a pitný režim zabezpečený",
  price: "45 € / deň (okrem individuálnych lekcií). Zľava pri prihlásení do 31. 5. 2025: 200 € / 5 dní",
  contact: { email: "info@tkellegance.sk", phone: "+421 902 529 395" }
};

export default function Home() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <>
      <NewsPopup />
      <NewsModal 
        isOpen={!!selectedNews} 
        onClose={() => setSelectedNews(null)} 
        data={selectedNews} 
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={getAssetPath("/images/main_page_photo.jpg")} 
            alt="Ellegance Ballroom" 
            className="w-full h-full object-cover animate-fade-in" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/40 via-obsidian-900/60 to-obsidian-900"></div>
          <div className="bg-blob blob-1"></div>
          <div className="bg-blob blob-2"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gold-500 font-sans tracking-[0.2em] font-semibold uppercase text-xs mb-8 animate-fade-in-up opacity-0 shadow-lg" style={{ animationDelay: '0.2s' }}>
            Viac ako len tanečný klub
          </span>
          <div className="flex flex-col items-center justify-center mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="relative inline-block">
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white flex flex-wrap items-center justify-center gap-x-3 md:gap-x-4 tracking-tight relative z-10">
                <span>Sme</span>
                <RotatingText
                  texts={ROTATING_WORDS}
                  mainClassName="text-gold-500 font-script italic px-2"
                />
              </h1>
              <svg className="absolute -bottom-4 left-0 w-full h-4 text-gold-500/40" viewBox="0 0 300 20" preserveAspectRatio="none">
                <path d="M5,15 Q150,5 295,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Kto Sme Section */}
      <section className="py-24 bg-obsidian-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-8 space-y-8 lg:space-y-12">
              <div className="text-left">
                <span className="text-gold-500/60 tracking-[0.4em] text-[10px] font-bold mb-4 block uppercase">Predstavenie klubu</span>
                <h2 className="text-4xl md:text-6xl flex items-baseline gap-x-4">
                  <span className="font-serif font-light text-white tracking-tight">Kto</span>
                  <span className="font-serif font-light italic text-gold-500 text-3xl md:text-5xl">sme?</span>
                </h2>
              </div>

              <div className="space-y-6 lg:space-y-8 text-gray-400 font-light leading-relaxed text-sm lg:text-lg text-justify">
                {/* Mobile: Text and Banner next to each other | Desktop: Normal block */}
                <div className="flex gap-6 lg:block">
                  <div className="flex-[7] lg:flex-none">
                    <p>
                      Hlavným cieľom <strong className="text-white">Tanečného klubu Ellegance Košice</strong> je rozvíjanie všetkých foriem spoločenského tanca a tanečného športu určeného pre všetkých záujemcov bez ohľadu na vek a pohlavie. Sprístupniť a priblížiť spoločenské správanie a spoločenský tanec ľuďom rôznych vekových kategórií, no najmä vyvinúť talent a potenciál malých detí a dať im možnosť byť <span className="italic text-gold-500">“úspešný.”</span>
                    </p>
                  </div>
                  
                  {/* Mobile-only side banner */}
                  <div className="flex-[5] lg:hidden">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-full min-h-[160px]">
                      <img 
                        src={getAssetPath("/baner.png")} 
                        alt="Ellegance Banner" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                </div>

                <p>
                  V dnešnej dobe je veľmi dôležité sa hýbať, obzvlášť keď si táto doba vybrala daň a to hlavne v tom, že musíme sedieť doma. Preto ponúkame širokú škálu možností kurzov a tréningov či už v online podobe alebo priamo u nás v priestoroch tanečného klubu. Okrem výuky spoločenského tanca, máme pre vás pripravené rôzne pohybové kurzy a aktivity pre rozvoj motoriky vašich ratolestí, rozvoj kondičnej zručnosti pre väčších.
                </p>

                <div className="py-6 border-y border-white/5 flex flex-col items-center justify-center text-center space-y-2">
                  <span className="text-gold-500/60 uppercase tracking-[0.3em] text-[10px] font-bold">Naše motto je:</span>
                  <p className="font-serif text-2xl lg:text-3xl text-white italic">"Vychutnaj si radosť z pohybu"</p>
                </div>

                <p>
                  Občianske združenie Ellegance vzniklo aj za účelom realizácie športových a rehabilitačných aktivít pre ľudí s telesným postihnutím – <strong className="text-white">vozičkárov</strong>. Špecializuje sa na integrovanú paraolympijskú disciplínu – tanečný šport na vozíčku, pri ktorej dochádza k priamej integrácii tým, že jeden z tanečných partnerov je na vozíčku a druhý je zdravý – chodiaci. Sme prvým občianskym združením na východnom Slovensku, ktoré sa venuje tomuto druhu športu. Všetci ste u nás srdečne vítaní!
                </p>

                <div className="pt-10 border-t border-white/5 mt-12 flex items-center justify-end gap-6">
                  <div className="text-right">
                    <h4 className="text-xl lg:text-2xl font-bold text-white mb-1 tracking-tight">Ing. Peter Vidašič</h4>
                    <p className="text-gold-500 text-[8px] lg:text-[9px] uppercase tracking-[0.3em] font-black">Prezident TK Ellegance Košice</p>
                  </div>
                  <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden border-2 border-gold-500/30 shadow-2xl">
                    <img 
                      src={getAssetPath("/images/Peter Vidašič.png")} 
                      alt="Ing. Peter Vidašič" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-4 relative mt-12 lg:mt-0">
              <div className="sticky top-32 group">
                <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={getAssetPath("/baner.png")} 
                    alt="Ellegance Banner" 
                    className="w-full h-auto" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Novinky v Ellegance (Modern News Section) */}
      <section id="novinky" className="py-24 bg-obsidian-900 relative overflow-hidden border-t border-white/5 scroll-mt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">Novinky v <span className="text-gold-500 italic font-light">Ellegance</span></h2>
            <div className="w-24 h-1 bg-gold-500/30 mx-auto rounded-full mt-8"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="group relative">
              <div className="absolute -inset-2 bg-gold-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div 
                onClick={() => setSelectedNews(CAMP_DATA)}
                className="relative flex items-center gap-6 p-4 cursor-pointer"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img src={getAssetPath(CAMP_DATA.image)} alt={CAMP_DATA.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold-500 text-[9px] uppercase tracking-widest font-black">Eventy</span>
                    <span className="text-gray-600 text-[10px]">•</span>
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider">{CAMP_DATA.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2 truncate group-hover:text-gold-500 transition-colors">{CAMP_DATA.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                    {CAMP_DATA.subtitle}. Pridajte sa k nám a zažite nezabudnuteľné leto plné tanca.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-2 bg-gold-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Link href="/ponuka" className="relative flex items-center gap-6 p-4 cursor-pointer">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img src={getAssetPath("/images/kurz_spolocenskych_tancov.png")} alt="Kurzy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold-500 text-[9px] uppercase tracking-widest font-black">Kurzy</span>
                    <span className="text-gray-600 text-[10px]">•</span>
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider">Pripravujeme</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2 truncate group-hover:text-gold-500 transition-colors">Kurzy spoločenských tancov</h3>
                  <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                    Chystáte sa na ples alebo svadbu? Naše nové kurzy v Košiciach štartujú už čoskoro. Objavte radosť z pohybu.
                  </p>
                </div>
              </Link>
            </div>

            <div className="group relative">
              <div className="absolute -inset-2 bg-gold-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Link href="/2-percenta" className="relative flex items-center gap-6 p-4 cursor-pointer">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img src={getAssetPath("/images/2_zdane.jpg")} alt="2%" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold-500 text-[9px] uppercase tracking-widest font-black">Komunita</span>
                    <span className="text-gray-600 text-[10px]">•</span>
                    <span className="text-gray-500 text-[10px] uppercase tracking-wider">Podpora</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2 truncate group-hover:text-gold-500 transition-colors">Podporte nás: 2% z dane</h3>
                  <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed line-clamp-2">
                    Pomôžte nám rozvíjať tanečné talenty v Košiciach. Vaša podpora nám umožňuje rásť.
                  </p>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
