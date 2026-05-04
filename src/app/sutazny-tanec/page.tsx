import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export default function SutaznyTanecPage() {
  return (
    <>
      {/* Page Header */}
      <header className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900 via-obsidian-800 to-obsidian-900"></div>
          <div className="bg-blob blob-1" style={{ background: 'rgba(212, 175, 55, 0.08)', width: '800px', height: '800px', top: '-200px', left: '50%', transform: 'translateX(-50%)' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gold-500 font-sans tracking-[0.2em] font-semibold uppercase text-xs mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
            Vrcholový Tanečný Šport
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            Vychovávame <i className="text-gold-500 font-light">šampiónov</i>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-3xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
            Náš klub sa dlhodobo radí k slovenskej špičke v tanečnom športe. Spájame tvrdú drinu, profesionálny systém a vášeň pre umenie. Pridajte sa k nám na ceste za medailami.
          </p>
        </div>
      </header>

      {/* Staty / Úspechy */}
      <section className="py-12 border-t border-b border-gold-500/10 bg-obsidian-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="font-serif text-5xl text-gold-500 mb-2">20+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Rokov skúseností</div>
            </div>
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
              <div className="font-serif text-5xl text-gold-500 mb-2">350+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Získaných medailí</div>
            </div>
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <div className="font-serif text-5xl text-gold-500 mb-2">12</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Reprezentantov SR</div>
            </div>
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.7s' }}>
              <div className="font-serif text-5xl text-gold-500 mb-2">Top 5</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Klubov na Slovensku</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cesta Tanečníka (Timeline) */}
      <section id="deti" className="py-24 relative z-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Cesta <span className="text-gold-500 italic font-light">Tanečníka</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Ako prebieha vývoj talentu v našom klube? Náš systém zaručuje postupný, bezpečný a motivujúci rast pre každé dieťa a mládež.</p>
          </div>
          
          <div className="relative pl-12 md:pl-0">
            {/* Timeline lines - handled with custom Tailwind classes in globals.css if needed, or inline styles */}
            <div className="absolute left-6 md:left-1/2 md:-ml-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500/50 to-gold-500/10"></div>

            {/* Krok 1 */}
            <div className="relative mb-16 md:mb-24 flex justify-between items-center w-full md:flex-row-reverse group">
              <div className="order-1 md:w-5/12"></div>
              <div className="z-20 absolute left-[12px] md:left-1/2 md:-ml-3 w-6 h-6 rounded-full bg-obsidian-900 border-4 border-gold-500 group-hover:scale-125 transition-transform"></div>
              <div className="order-1 md:w-5/12 pl-6 md:pl-0 md:text-right segment-card p-8">
                <span className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-2 block">Krok 1 (Deti 5-9 rokov)</span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">Tanečná Prípravka</h3>
                <p className="text-gray-400 font-light text-sm">Všetko začína hravou formou. Deti získavajú správne držanie tela, rytmiku, koordináciu a základy tanca. Budujeme disciplínu a lásku k pohybu v bezpečnom prostredí.</p>
              </div>
            </div>

            {/* Krok 2 */}
            <div className="relative mb-16 md:mb-24 flex justify-between items-center w-full group">
              <div className="order-1 md:w-5/12"></div>
              <div className="z-20 absolute left-[12px] md:left-1/2 md:-ml-3 w-6 h-6 rounded-full bg-obsidian-900 border-4 border-gold-500 group-hover:scale-125 transition-transform"></div>
              <div className="order-1 md:w-5/12 pl-6 md:pl-0 segment-card p-8">
                <span className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-2 block">Krok 2</span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">Základný Klubový Tréning</h3>
                <p className="text-gray-400 font-light text-sm">Prechod na reálne zostavy. Deti začínajú tancovať v pároch alebo v sólo dívčích skupinách. Učia sa prvé 4 základné tance a zúčastňujú sa svojich prvých hobby súťaží.</p>
              </div>
            </div>

            {/* Krok 3 */}
            <div className="relative mb-16 md:mb-24 flex justify-between items-center w-full md:flex-row-reverse group">
              <div className="order-1 md:w-5/12"></div>
              <div className="z-20 absolute left-[12px] md:left-1/2 md:-ml-3 w-6 h-6 rounded-full bg-obsidian-900 border-4 border-gold-500 group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
              <div className="order-1 md:w-5/12 pl-6 md:pl-0 md:text-right segment-card p-8 border-gold-500/30 bg-[rgba(10,10,10,0.8)]">
                <span className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-2 block">Krok 3 (Vrcholový šport)</span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">Súťažný Výkonnostný Šport</h3>
                <p className="text-gray-400 font-light text-sm">Zaradenie do národného a medzinárodného registru súťažiacich. 10 tancov na vysokej úrovni (STT aj LAT), pravidelné sústredenia, medzinárodné súťaže a individuálny mentoring u top lektorov klubu.</p>
              </div>
            </div>

          </div>
          
          <div className="text-center mt-12">
            <Link href="/kontakt?kurz=deti" className="btn-gold inline-block px-10 py-4 rounded-full font-sans text-sm font-bold tracking-widest uppercase">
              Prihlásiť dieťa na skúšobný tréning
            </Link>
          </div>
        </div>
      </section>

      {/* Tréneri a Odbornosť */}
      <section className="py-24 bg-obsidian-900/50 relative overflow-hidden">
        <div className="bg-blob blob-2" style={{ background: 'rgba(212, 175, 55, 0.05)', width: '800px', top: '0', left: '-20%' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Tréneri so <span className="text-gold-500 italic font-light">svetovými</span> skúsenosťami</h2>
              <p className="text-gray-400 font-light leading-relaxed mb-6 text-lg">
                Aby ste boli najlepší, musíte sa učiť od najlepších. Náš trénersky kolektív tvoria certifikovaní odborníci s najvyššou trénerskou triedou.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  </div>
                  <p className="text-gray-300 font-light text-sm">Garantujeme <strong>špičkovú metodiku</strong> podľa medzinárodných štandardov (WDSF).</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  </div>
                  <p className="text-gray-300 font-light text-sm">Organizujeme pravidelné workshopy a kempy s <strong>medzinárodnými lektormi</strong> z celého sveta.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  </div>
                  <p className="text-gray-300 font-light text-sm">Sme hrdí organizátori prestížnych medzinárodných a národných pohárov a súťaží v Košiciach.</p>
                </li>
              </ul>
              <Link href="/o-nas" className="btn-outline inline-block px-8 py-3 rounded-full font-sans text-xs font-bold tracking-widest uppercase">Viac o tíme</Link>
            </div>
            <div className="relative">
              <img src={getAssetPath("/assets/img/gallery_tango_1777364079860.png")} alt="Súťažný Tanec Ellegance" className="w-full rounded-[2rem] object-cover h-[500px] shadow-2xl filter brightness-90 border border-white/5" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
