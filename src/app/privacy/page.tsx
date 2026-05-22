"use client";

import React from "react";
import { Shield, FileText, CheckCircle2, Scale, MapPin, User, Clock, Lock, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-obsidian-900 pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Ambient background light reflections */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-gold-600/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
          >
            <Shield className="w-8 h-8" />
          </motion.div>
          
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-4"
          >
            Právne informácie & Ochrana súkromia
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Zásady spracúvania <br />
            <span className="text-gold-500 italic font-light">osobných údajov</span>
          </motion.h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full" />
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-gray-300 font-light leading-relaxed">
          
          {/* Section 1: Intro & Prevádzkovateľ */}
          <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-serif text-white mb-6 flex items-center gap-4 italic border-b border-white/10 pb-4">
              <User className="text-gold-500 w-5 h-5 shrink-0" />
              1. Identifikácia prevádzkovateľa
            </h2>
            
            <p className="mb-8 text-sm text-gray-400 font-light">
              Tieto Zásady spracúvania osobných údajov sú vypracované v súlade s <strong>Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679</strong> o ochrane fyzických osôb pri spracúvaní osobných údajov (všeobecné nariadenie o ochrane údajov alebo <strong>„GDPR“</strong>) a <strong>zákonom č. 18/2018 Z. z.</strong> o ochrane osobných údajov a o zmene a doplnení niektorých zákonov v znení neskorších predpisov (ďalej len „Zákon“).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Prevádzkovateľ", value: "TK Ellegance Košice" },
                { label: "Právna forma", value: "Občianske združenie (o.z.)" },
                { label: "Oficiálne sídlo (register)", value: "Ondavská 3, 040 11 Košice" },
                { label: "Prevádzka (tanečná sála)", value: "Fejova 1, 040 01 Košice" },
                { label: "IČO", value: "42096456" },
                { label: "DIČ", value: "2022417144" },
                { label: "Kontakt (e-mail)", value: "info@tkellegance.sk" },
                { label: "Kontakt (telefón)", value: "0902 529 395" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-gold-500/10 transition-colors">
                  <span className="text-gold-500/60 uppercase tracking-widest text-[9px] font-bold block mb-1">{item.label}</span>
                  <span className="text-white text-xs md:text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Rozsah a Účel */}
          <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-serif text-white mb-6 flex items-center gap-4 italic border-b border-white/10 pb-4">
              <FileText className="text-gold-500 w-5 h-5 shrink-0" />
              2. Účely, rozsah a právny základ spracúvania
            </h2>

            <div className="space-y-6 text-sm">
              <p>
                Osobné údaje dotknutých osôb (napr. záujemcov o kurzy, tanečníkov, zákonných zástupcov) spracúvame výhradne v rozsahu potrebnom na plnenie našich úloh a poskytovanie tanečných služieb.
              </p>

              <div className="space-y-4 mt-6">
                {/* Purpose 1 */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 flex items-center justify-center font-serif shrink-0 italic">A</div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Evidencia záujemcov a realizácia kurzov</h4>
                    <p className="text-gray-400 font-light text-xs leading-relaxed mb-2">
                      <strong>Rozsah:</strong> Meno, priezvisko, e-mailová adresa, telefónne číslo, vybraný tanečný kurz (prípadne vek a meno dieťaťa pri detských kurzoch).
                    </p>
                    <p className="text-gray-400 font-light text-xs leading-relaxed">
                      <strong>Právny základ:</strong> Plnenie zmluvy resp. predzmluvné vzťahy (v zmysle čl. 6 ods. 1 písm. b) GDPR). Poskytnutie týchto údajov je podmienkou na registráciu do kurzu.
                    </p>
                  </div>
                </div>

                {/* Purpose 2 */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 flex items-center justify-center font-serif shrink-0 italic">B</div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Cookies a optimalizácia webu</h4>
                    <p className="text-gray-400 font-light text-xs leading-relaxed mb-2">
                      <strong>Rozsah:</strong> IP adresa, typ prehliadača a zariadenia, interakcie na webe, cookies identifikátory.
                    </p>
                    <p className="text-gray-400 font-light text-xs leading-relaxed">
                      <strong>Právny základ:</strong> Súhlas dotknutej osoby (v zmysle čl. 6 ods. 1 písm. a) GDPR), udelený dobrovoľne prostredníctvom našej cookie lišty pre analytické a marketingové účely. Nevyhnutné cookies spracúvame na základe oprávneného záujmu (zabezpečenie chodu webu).
                    </p>
                  </div>
                </div>

                {/* Purpose 3 */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 flex items-center justify-center font-serif shrink-0 italic">C</div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Oprávnené záujmy prevádzkovateľa</h4>
                    <p className="text-gray-400 font-light text-xs leading-relaxed mb-2">
                      <strong>Rozsah:</strong> História e-mailovej a telefonickej komunikácie so záujemcom.
                    </p>
                    <p className="text-gray-400 font-light text-xs leading-relaxed">
                      <strong>Právny základ:</strong> Oprávnený záujem (čl. 6 ods. 1 písm. f) GDPR) na účely obhajoby právnych nárokov o.z., ochrany bezpečnosti, predchádzania sporom a udržiavania korektnej komunikácie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Doba uchovávania a Bezpečnosť */}
          <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-serif text-white mb-6 flex items-center gap-4 italic border-b border-white/10 pb-4">
              <Clock className="text-gold-500 w-5 h-5 shrink-0" />
              3. Doba uchovávania a príjemcovia údajov
            </h2>

            <div className="space-y-4 text-sm font-light">
              <p>
                Vaše osobné údaje uchovávame len po dobu nevyhnutnú na dosiahnutie stanovených účelov:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-400">
                <li><strong>Údaje z registrácií a kontaktov:</strong> Počas trvania kurzu / zmluvného vzťahu, resp. maximálne 3 roky od ukončenia posledného kurzu (pre účely prípadnej reklamácie či právnych nárokov).</li>
                <li><strong>Marketing a marketingové cookies:</strong> Do odvolania súhlasu (súhlas je možné v cookie lište alebo mailom kedykoľvek odvolať).</li>
                <li><strong>Účtovné a daňové doklady:</strong> V súlade so zákonom o účtovníctve po dobu 10 rokov.</li>
              </ul>
              
              <div className="mt-6 p-4 rounded-xl bg-white/[0.01] border border-white/5 flex gap-3 items-center">
                <Lock className="text-gold-500 w-5 h-5 shrink-0" />
                <p className="text-xs text-gray-400">
                  <strong>Bezpečnosť a príjemcovia:</strong> Vaše údaje sú chránené a neposkytujeme ich žiadnym neoprávneným osobám. Prístup k nim majú iba poverení lektori a zmluvní spracovatelia (napr. správa IT infraštruktúry webu, účtovníctvo o.z. a analytické platformy Google / Meta výhradne na základe vášho cookie súhlasu). Data neopúšťajú územie EÚ bez plného súladu so zákonnými požiadavkami.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Práva dotknutej osoby */}
          <section className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-serif text-white mb-6 flex items-center gap-4 italic border-b border-white/10 pb-4">
              <Scale className="text-gold-500 w-5 h-5 shrink-0" />
              4. Vaše práva ako dotknutej osoby
            </h2>

            <p className="mb-6 text-sm text-gray-300">
              V súlade s GDPR a Zákonom o ochrane osobných údajov máte ako návštevník webu a záujemca o naše služby nasledujúce neodňateľné práva:
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Právo na prístup k údajom", desc: "Máte právo vedieť, či a aké vaše osobné údaje spracúvame a získať k nim výpis." },
                { title: "Právo na opravu a doplnenie", desc: "Zabezpečíme okamžitú zmenu nesprávnych či neúplných údajov, ak nám o tom dáte vedieť." },
                { title: "Právo na vymazanie (Zabudnutie)", desc: "Máte právo žiadať vymazanie údajov, ak pominul účel ich spracovania alebo odvoláte súhlas." },
                { title: "Právo na obmedzenie spracúvania", desc: "V špecifických prípadoch (napr. spochybnenie správnosti) môžeme spracúvanie dočasne obmedziť." },
                { title: "Právo na prenosnosť údajov", desc: "Môžete požiadať o prenos vašich údajov v štruktúrovanom formáte inému prevádzkovateľovi." },
                { title: "Právo kedykoľvek odvolať súhlas", desc: "Pri spracovaní na základe súhlasu (cookies) môžete súhlas okamžite odobrať." },
              ].map((text, i) => (
                <li key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-gold-500/10 transition-colors">
                  <span className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-sans">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                    {text.title}
                  </span>
                  <span className="text-[11px] text-gray-400 font-light leading-relaxed">{text.desc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-5 rounded-2xl bg-gold-500/[0.02] border border-gold-500/10 flex flex-col gap-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Ako si svoje práva uplatniť?</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Všetky vaše žiadosti, otázky, námietky alebo odvolanie súhlasov vybavíme bezodkladne. Stačí nás kontaktovať elektronicky na e-mail: <a href="mailto:info@tkellegance.sk" className="text-gold-500 hover:underline">info@tkellegance.sk</a> alebo písomne na korešpondenčnú adresu <strong>Tanečný klub Ellegance, Fejova 1, 040 01 Košice</strong>.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Máte tiež právo podať návrh na začatie konania o ochrane osobných údajov na <strong>Úrad na ochranu osobných údajov Slovenskej republiky</strong> (Hraničná 12, 820 07 Bratislava, <a href="https://dataprotection.gov.sk" target="_blank" className="text-gold-500 hover:underline">dataprotection.gov.sk</a>).
              </p>
            </div>
          </section>

          {/* Date of update */}
          <div className="pt-4 text-center text-gray-500 italic text-[11px] font-light uppercase tracking-widest">
            Tieto zásady boli aktualizované a nadobúdajú účinnosť dňa 22.5.2026
          </div>

        </div>
      </div>
    </div>
  );
}
