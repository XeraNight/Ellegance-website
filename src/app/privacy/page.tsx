import React from "react";
import { Shield, FileText, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-obsidian-900 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
            <Shield className="w-8 h-8" />
          </div>
          <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold mb-4">Právne informácie</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Ochrana a spracovanie <br />
            <span className="text-gold-500 italic font-light">osobných údajov</span>
          </h1>
          <div className="w-24 h-1 bg-gold-500/20 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-300 font-light leading-relaxed">
          
          <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
            <h2 className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-4">
              <FileText className="text-gold-500 w-6 h-6" />
              Rozsah osobných údajov
            </h2>
            
            <p className="mb-8">
              V súlade s ustanovením § 13 ods. 1 a § 14 Zákona číslo 18/2018 Z.z. o ochrane osobných údajov (ďalej len „Zákon“) dávam týmto ako dotknutá osoba súhlas so spracúvaním mojich osobných údajov za podmienok nižšie stanovených:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Prevádzkovateľ", value: "TK Ellegance Košice o.z., Ondavská 3 04011 Košice" },
                { label: "Rozsah spracúvania", value: "meno, priezvisko, telefón, email" },
                { label: "Účel spracúvania", value: "vedenie evidencie ku jednotlivým tanečným kurzom" },
                { label: "Zoznam údajov", value: "meno, priezvisko, telefón, email" },
                { label: "Doba súhlasu", value: "na dobu neurčitú" },
                { label: "Forma zverejnenia", value: "výhradne na internú potrebu" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-gold-500/60 uppercase tracking-widest text-[10px] font-bold block mb-1">{item.label}</span>
                  <span className="text-white text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 space-y-6">
            <p>
              Dotknutá osoba týmto vyhlasujem, že dávam prevádzkovateľovi svoj výslovný a bezvýhradný súhlas, aby spracúval moje osobné údaje vo vyššie uvedenom rozsahu, na uvedený účel a počas vyššie uvedenej doby.
            </p>
            <p>
              Ako dotknutá osoba mám právo kedykoľvek odvolať svoj súhlas. Odvolanie súhlasu nemá vplyv na zákonnosť spracúvania vychádzajúceho zo súhlasu pred jeho odvolaním.
            </p>
            <p>
              Zároveň ako dotknutá osoba vyhlasujem, že som bola oboznámená s nasledujúcimi informáciami, ktorých správnosť a aktuálnosť svojím podpisom potvrdzujem.
            </p>
            <div className="pt-4 text-gray-500 italic text-sm">
              V Košiciach, dňa 2.9.2023
            </div>
          </section>

          <section className="bg-gold-500/5 border border-gold-500/10 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">Spracovanie osobných údajov</h2>
            <p className="text-sm">
              Súhlasom so spracovaní osobných údajov udeľuje dotknutá osoba svoj výslovný súhlas so spracovaním vyššie uvedených údajov. Súhlas možno vziať kedykoľvek späť, a to napríklad zaslaním emailu alebo zaslaním listu na kontaktné údaje.
            </p>
          </section>

          <section className="px-4">
            <h2 className="text-2xl font-serif font-bold text-white mb-8">Práva na opravu, zabudnutie a prístup</h2>
            <p className="mb-6 font-medium text-gray-200">
              Prosím vezmite na vedomie, že podľa zákona o ochrane osobných údajov má dotknutá osoba právo:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Vziať súhlas kedykoľvek späť",
                "Vyžiadať informáciu, aké údaje spracovávame",
                "Vyžiadať vysvetlenie ohľadne spracovania",
                "Vyžiadať výpis a nechať údaje aktualizovať",
                "Požadovať vymazanie osobných údajov",
                "Obrátiť sa na Úrad na ochranu osobných údajov",
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
