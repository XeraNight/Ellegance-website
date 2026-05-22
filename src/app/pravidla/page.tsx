"use client";

import React from "react";
import { Award, BookOpen, UserCheck, ShieldCheck, ExternalLink, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function PravidlaPage() {
  return (
    <div className="min-h-screen bg-obsidian-900 pt-32 pb-20">
      {/* Hero Header */}
      <section className="relative px-6 mb-20 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold-500 uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
          >
            SZTŠ & Legislatíva
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-8"
          >
            Oficiálne pravidlá <br />
            <span className="text-gold-500 italic font-light">tanečného športu</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Sme hrdým členom Slovenského zväzu tanečného športu (SZTŠ). Naše páry sa riadia oficiálnymi stanovami a poriadkami platnými pre súťažnú sezónu 2026.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 space-y-24">
        
        {/* Section 1: Výkonnostné triedy */}
        <section id="triedy">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Výkonnostné triedy</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "E", n: "Začiatočníci" },
              { t: "D", n: "Mierne pokročilí" },
              { t: "C", n: "Pokročilí" },
              { t: "B", n: "Zvlášť pokročilí" },
              { t: "A", n: "Vyspelí" },
              { t: "S", n: "Zvlášť vyspelí" },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-obsidian-800 border border-white/5 hover:border-gold-500/30 transition-all group">
                <div className="text-4xl font-serif font-bold text-gold-500 mb-4 group-hover:scale-110 transition-transform origin-left">{item.t}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.n}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
            <Info className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-400 font-light">
              Postup do vyššej triedy je podmienený získaním stanoveného počtu bodov a finálových umiestnení na oficiálnych súťažiach SZTŠ.
            </p>
          </div>
        </section>

        {/* Section 2: Vekové kategórie */}
        <section id="kategorie">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
              <UserCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Vekové kategórie</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-obsidian-800 rounded-3xl overflow-hidden shadow-2xl">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-6 text-gold-500 uppercase tracking-widest text-xs font-bold">Kategória</th>
                  <th className="p-6 text-gold-500 uppercase tracking-widest text-xs font-bold">Vek páru</th>
                  <th className="p-6 text-gold-500 uppercase tracking-widest text-xs font-bold">Poznámka</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 font-light">
                <tr className="border-b border-white/5">
                  <td className="p-6 font-bold text-white">Deti I</td>
                  <td className="p-6">9 rokov a menej</td>
                  <td className="p-6">Platí pre páry, v ktorých starší z partnerov dovŕši v danom roku max. 9 rokov.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-6 font-bold text-white">Deti II</td>
                  <td className="p-6">10 a 11 rokov</td>
                  <td className="p-6">Starší z partnerov dovŕši v kalendárnom roku 10 alebo 11 rokov.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-6 font-bold text-white">Juniori I</td>
                  <td className="p-6">12 a 13 rokov</td>
                  <td className="p-6">Starší z partnerov dovŕši v kalendárnom roku 12 alebo 13 rokov.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-6 font-bold text-white">Juniori II</td>
                  <td className="p-6">14 a 15 rokov</td>
                  <td className="p-6">Starší z partnerov dovŕši v kalendárnom roku 14 alebo 15 rokov.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-6 font-bold text-white">Mládež</td>
                  <td className="p-6">16 až 18 rokov</td>
                  <td className="p-6">Páry tejto kategórie sa zúčastňujú bodovacích súťaží kategórie Dospelí.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-6 font-bold text-white">Do 21</td>
                  <td className="p-6">19 až 20 rokov</td>
                  <td className="p-6">Súťaž párov kategórie Do 21 sa vyhlasuje len na MSR.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-6 font-bold text-white">Dospelí</td>
                  <td className="p-6">21 rokov a viac</td>
                  <td className="p-6">Starší z partnerov dovŕši v roku konania súťaže aspoň 21 rokov.</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-white">Seniori I-IV</td>
                  <td className="p-6">35 až 65+ rokov</td>
                  <td className="p-6">Rozdelené podľa veku oboch partnerov (I: 35/30+, II: 45/40+, III: 55/50+, IV: 65/60+).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Súťažné odievanie (Článok 15) */}
        <section id="odievanie">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">Pravidlá odievania (Článok 15)</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-1.5 h-6 bg-gold-500 rounded-full"></span>
                Všeobecné princípy
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Súťažné oblečenie musí byť v súlade s dobrými mravmi a primerané veku tanečníkov. Cieľom pravidiel SZTŠ a WDSF je zachovať estetickú úroveň športu a v nižších triedach minimalizovať finančné rozdiely.
              </p>
              <ul className="space-y-4">
                {[
                  "Intímne časti tela musia byť riadne a nepriehľadne zakryté.",
                  "Ozdoby a šperky nesmú ohrozovať tanečného partnera ani iné páry.",
                  "Používanie reklám a log na oblečení je limitované veľkosťou a umiestnením.",
                ].map((li, i) => (
                  <li key={i} className="flex gap-4 text-gray-400 text-sm">
                    <span className="w-1 h-1 bg-gold-500 rounded-full mt-2 shrink-0"></span>
                    {li}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Obmedzenia pre Deti a triedu E/D</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-2">Dievčatá</h4>
                  <p className="text-gray-400 text-sm font-light">Zakázané sú flitre, perly, kamene, púdrové perie a strapce. Materiály nesmú mať metalický alebo svetlo odrážajúci efekt. Povolené sú len jednoduché strihy bez rozstrihov v intímnych zónach.</p>
                </div>
                <div>
                  <h4 className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-2">Chlapci</h4>
                  <p className="text-gray-400 text-sm font-light">Biela košeľa s dlhým rukávom, čierne nohavice a tmavý motýlik (Standard) alebo rozhalenka (Latina). Zakázané sú smokingy a fraky v kategórii Deti a triedach E.</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                    Presné technické nákresy a materiálové špecifikácie nájdete v prílohe Článku 15 Súťažného poriadku.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Dokumenty a odkazy */}
        <section className="pt-20 border-t border-white/5">
          <div className="flex flex-col items-center text-center">
            <BookOpen className="w-12 h-12 text-gold-500 mb-6" />
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Oficiálna dokumentácia</h2>
            <p className="text-gray-400 max-w-2xl font-light mb-10">
              Pre najaktuálnejšie znenia poriadkov a smerníc odporúčame vždy kontrolovať legislatívnu sekciu na webe Slovenského zväzu tanečného športu.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
              <a 
                href="https://szts.sk/informacie/poriadky-smernice/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <ExternalLink className="w-5 h-5 text-gold-500" />
                  <span className="text-white font-medium">Poriadky/Smernice</span>
                </div>
                <span className="text-gray-600 group-hover:text-gold-500 transition-colors">szts.sk</span>
              </a>
              <a 
                href="https://szts.sk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <ExternalLink className="w-5 h-5 text-gold-500" />
                  <span className="text-white font-medium">Oficiálna stránka SZTŠ</span>
                </div>
                <span className="text-gray-600 group-hover:text-gold-500 transition-colors">szts.sk</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
