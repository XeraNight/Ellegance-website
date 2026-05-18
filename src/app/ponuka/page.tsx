"use client";

import React from "react";
import { motion } from "framer-motion";
import BentoCard from "@/components/BentoCard";
import PageBackground from "@/components/PageBackground";
import HandwritingNote from "@/components/HandwritingNote";
import CourseCategoryNav from "@/components/CourseCategoryNav";
import RotatingText from "@/components/RotatingText";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

export default function PonukaPage() {
  return (
    <div className="relative bg-obsidian-900 min-h-screen text-white selection:bg-gold-500/30">
      <PageBackground />
      
      {/* Editorial Header */}
      <header className="relative pt-32 pb-16 px-6 z-10">
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
          
          <p className="max-w-2xl mx-auto text-gray-500 text-sm md:text-base font-light leading-relaxed">
            Objavte svet tanca v jeho plnej kráse. Od pravidelných kurzov pre deti aj dospelých, cez individuálnu prípravu na svadbu, až po profesionálne tanečné vystúpenia pre vaše eventy.
          </p>
        </div>
      </header>

      <CourseCategoryNav />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        {/* SECTION 1: Tanečné Kurzy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto mb-24">
          
          {/* Latin Fit Section (8 cols) */}
          <BentoCard id="latin" className="md:col-span-8 p-8 md:p-12 scroll-mt-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-pink-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-2 block">Pre ženy a dievčatá</span>
                <h2 className="font-serif text-4xl font-bold mb-4">Latin Fit <span className="text-pink-500">&</span> Salsa</h2>
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                  Lekcie latinsko-amerických tancov pre dámy, kde nepotrebujete partnera. 
                  Objavte tance ako salsa, bachata, chacha, rumba a jive.
                </p>
                <div className="flex gap-4 mb-8">
                  <div className="text-2xl font-serif font-bold text-white">8€ <span className="text-xs font-sans text-gray-500 font-light">/ lekcia</span></div>
                </div>
                <Link href="/kontakt?kurz=latinfit" className="btn-outline px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  Rezervovať lekciu
                </Link>
              </div>
              <div className="bg-gradient-to-br from-pink-500/10 to-transparent p-6 rounded-3xl border border-pink-500/10">
                <ul className="space-y-4">
                  {["Nepotrebujete partnera", "Formovanie postavy", "Skvelá komunita", "Vhodné pre začiatočníčky"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs text-gray-300 font-light">
                      <span className="text-pink-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </BentoCard>

          {/* Svadobné Tance Intro (4 cols) */}
          <BentoCard id="svadba" className="md:col-span-4 p-8 scroll-mt-32 flex flex-col justify-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Svadobné Tance</h2>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
              Pripravíme vás na váš veľký deň. Od základných krokov až po dychberúcu choreografiu.
            </p>
            <HandwritingNote className="text-base" rotation={5}>
              "Zachránime aj drevených ženíchov"
            </HandwritingNote>
          </BentoCard>

          {/* Svadobné Balíky */}
          <div className="md:col-span-12 grid md:grid-cols-2 gap-6">
            <BentoCard className="p-8 border-white/5 bg-obsidian-800/20">
              <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Základný Balík</span>
              <h3 className="font-serif text-2xl font-bold mb-4">Svadobná Pohoda</h3>
              <div className="text-3xl font-serif font-bold text-white mb-4">140€</div>
              <ul className="text-xs text-gray-400 space-y-3 mb-8">
                <li>• 4 x 45 minút individuálne</li>
                <li>• Vlastný výber hudby</li>
                <li>• Základná choreografia</li>
              </ul>
              <Link href="/kontakt?kurz=svadba-basic" className="text-gold-500 text-[10px] font-bold tracking-widest uppercase hover:underline">Vybrať základ →</Link>
            </BentoCard>
            <BentoCard className="p-8 border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent relative">
              <div className="absolute top-6 right-6 px-3 py-1 bg-gold-500 text-obsidian-900 text-[8px] font-bold rounded-full uppercase tracking-widest">Najobľúbenejšie</div>
              <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Premium Balík</span>
              <h3 className="font-serif text-2xl font-bold mb-4">Svadobná Hviezda</h3>
              <div className="text-3xl font-serif font-bold text-white mb-4">250€</div>
              <ul className="text-xs text-gray-400 space-y-3 mb-8">
                <li>• 8 x 60 minút individuálne</li>
                <li>• Waltz, Valčík, Polka a Čardáš</li>
                <li>• Nácvik možný priamo na mieste</li>
              </ul>
              <Link href="/kontakt?kurz=svadba-premium" className="btn-gold block text-center py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase">Chcem Premium</Link>
            </BentoCard>
          </div>

          {/* Spoločenské Tance */}
          <BentoCard id="spolocenske" className="md:col-span-12 p-12 scroll-mt-32">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7">
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-blue-400">Spoločenské Tance</h2>
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-8 max-w-xl">
                  Začíname poznávacím základným levelom, kde si osvojíte základy 9 spoločenských tancov. 
                  Ideálny spôsob, ako si oddýchnuť a načerpať novú energiu po práci.
                </p>
                <div className="flex items-center gap-8">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Trvanie</span>
                    <span className="text-sm font-bold">8 týždňov - 8 lekcií</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Cena</span>
                    <span className="text-sm font-bold">75€ / osoba</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 relative">
                 <blockquote className="border-l-2 border-blue-500/30 pl-8 py-4 italic text-gray-400 text-lg">
                  "U nás môžete načerpať novú energiu, alebo nájsť nový zmysel života!"
                </blockquote>
              </div>
            </div>
          </BentoCard>

          {/* Tango Argentíno */}
          <BentoCard id="tango" className="md:col-span-6 p-10 scroll-mt-32 bg-gradient-to-br from-red-500/5 to-transparent">
            <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-2 block">Vášeň a hĺbka</span>
            <h2 className="font-serif text-3xl font-bold mb-4">Tango Argentíno</h2>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
              Pre Tango neexistujú vekové hranice. Naučíme vás základné kroky i zložité choreografie v priebehu pár lekcií.
            </p>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-serif font-bold text-white">50€</div>
              <Link href="/kontakt?kurz=tango" className="btn-outline px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase">Prihlásiť sa</Link>
            </div>
          </BentoCard>

          {/* Detská Prípravka */}
          <BentoCard id="deti" className="md:col-span-6 p-10 scroll-mt-32 border-dashed">
            <h2 className="font-serif text-3xl font-bold mb-4">Tanečná Prípravka</h2>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
              Tanec pre deti už od 4 rokov. Lekcie sú vedené formou zábavy a hier, kde rozvíjame pohybovú zdatnosť.
            </p>
            <div className="flex items-center justify-between">
               <span className="text-[10px] text-gray-500 uppercase tracking-widest">Od 4 rokov</span>
               <Link href="/kontakt?kurz=deti" className="text-gold-500 text-[10px] font-bold tracking-widest uppercase hover:underline">Mám záujem →</Link>
            </div>
          </BentoCard>
        </div>

        {/* SECTION 2: Venčekové Slávnosti (New integration) */}
        <div id="venceky" className="scroll-mt-32 mb-24">
          <BentoCard className="p-8 md:p-16 border-gold-500/10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square">
                <img src={getAssetPath("/images/kurz spolocenskychtancov.PNG")} alt="Venčeky" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-gold-500 uppercase tracking-widest text-[10px] font-bold">Spoločenská Výchova</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tighter">Venčekové <br /> Slávnosti</h2>
                </div>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  Tradičná príprava na prvý veľký bál. Okrem tanca učíme mladých ľudí aj základom spoločenskej etikety a sebavedomému vystupovaniu.
                </p>
                <Link href="/kontakt?sluzba=venceky" className="btn-gold inline-block px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Viac o venčekoch
                </Link>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* SECTION 3: Tanečné Vystúpenia (New integration) */}
        <div id="vystupenia" className="scroll-mt-32">
          <BentoCard className="p-8 md:p-16 bg-gradient-to-br from-obsidian-800 to-black/40">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1 text-right lg:text-left">
                <div className="space-y-4">
                  <span className="text-gold-500 uppercase tracking-widest text-[10px] font-bold">Profesionálna Show</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tighter">Eventy & <br /> Vystúpenia</h2>
                </div>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  Dodajte svojmu podujatiu eleganciu a vášeň. Ponúkame širokú škálu tanečných choreografií – od energickej latiny až po klasický štandard.
                </p>
                <Link href="/kontakt?sluzba=vystupenia" className="btn-outline px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Objednať vystúpenie
                </Link>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square order-1 lg:order-2">
                <img src={getAssetPath("/images/miculesqu.png")} alt="Vystúpenia" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </BentoCard>
        </div>

      </main>
    </div>
  );
}
