import React from "react";
import Link from "next/link";

export default function PonukaPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-16 bg-obsidian-900">
        <div className="text-center px-4 max-w-3xl mx-auto">
          <span className="block text-gold-500 font-sans tracking-[0.3em] uppercase text-xs font-bold mb-4 animate-fade-in-up">Kompletná ponuka</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up text-glow" style={{ animationDelay: '0.1s' }}>Tanečné Kurzy</h1>
          <p className="text-gray-400 font-light text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Vyberte si balíček, ktorý vyhovuje vašim cieľom. V cene kurzov sú výukové materiály a certifikát o absolvovaní.</p>
        </div>
      </section>

      {/* Main Pricing Grid */}
      <section className="py-12 bg-obsidian-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Spoločenské tance */}
          <article id="dospeli" className="price-card rounded-2xl p-8 flex flex-col opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="text-gold-500 text-sm font-bold tracking-widest uppercase mb-2">Pre Dospelých & Páry</div>
            <h3 className="font-serif text-3xl font-bold text-white mb-4">Spoločenské Tance</h3>
            <p className="text-gray-400 font-light text-sm mb-6 flex-grow">Naučíme vás tancovať Waltz, Valčík, Foxtrot, Tango aj latino tance. Vďaka nášmu systému 5 úrovní získate istotu a s partnerom si užijete každú zábavu či ples.</p>
            
            <div className="mb-8">
              <span className="font-serif text-4xl font-bold text-white">€75</span>
              <span className="text-gray-500 font-light text-sm"> / osoba za 8 týždňov</span>
            </div>
            
            <ul className="text-sm text-gray-300 font-light space-y-3 mb-8">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 8 lekcií po 90 minút</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Výukové CD zadarmo</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Postupný systém výučby</li>
            </ul>
            <Link href="/kontakt?kurz=spolocenske" className="btn-outline block w-full py-3 rounded-xl text-center font-bold tracking-widest uppercase text-xs">Prihlásiť sa</Link>
          </article>

          {/* Svadobný Tanec (Premium) */}
          <article id="svadba" className="price-card premium rounded-2xl p-8 flex flex-col relative overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="absolute top-0 right-0 bg-gold-500 text-obsidian-900 text-xs font-bold px-4 py-1 rounded-bl-lg tracking-widest uppercase">VIP Služba</div>
            <div className="text-gold-500 text-sm font-bold tracking-widest uppercase mb-2">Pre Snúbencov</div>
            <h3 className="font-serif text-3xl font-bold text-white mb-4">Svadobný Tanec</h3>
            <p className="text-gray-400 font-light text-sm mb-6 flex-grow">Pripravíme vám prvý novomanželský tanec bez zbytočného stresu. Naučíme vás kroky a vytvoríme choreografiu priamo na vašu pieseň.</p>
            
            <div className="mb-8">
              <span className="font-serif text-4xl font-bold text-white">od €150</span>
              <span className="text-gray-500 font-light text-sm"> / balíček</span>
            </div>
            
            <ul className="text-sm text-gray-300 font-light space-y-3 mb-8">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 100% Individuálny prístup</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Strih hudby v cene</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Návrh choreografie</li>
            </ul>
            <Link href="/kontakt?kurz=svadba" className="btn-gold block w-full py-3 rounded-xl text-center font-bold tracking-widest uppercase text-xs">Rezervovať termín</Link>
          </article>

          {/* Latin Fit */}
          <article id="latinfit" className="price-card rounded-2xl p-8 flex flex-col opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <div className="text-gold-500 text-sm font-bold tracking-widest uppercase mb-2">Pre Ženy (Sólo)</div>
            <h3 className="font-serif text-3xl font-bold text-white mb-4">Latin Fit & Salsa</h3>
            <p className="text-gray-400 font-light text-sm mb-6 flex-grow">Zatancujte si sólo na latino rytmy. Urobíte niečo pre svoju kondíciu a objavíte v sebe novú ženskú eleganciu.</p>
            
            <div className="mb-8">
              <span className="font-serif text-4xl font-bold text-white">€8</span>
              <span className="text-gray-500 font-light text-sm"> / lekcia (zvyčajne v bloku)</span>
            </div>
            
            <ul className="text-sm text-gray-300 font-light space-y-3 mb-8">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Nepotrebujete partnera</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Formovanie postavy</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Skvelá hudba a energia</li>
            </ul>
            <Link href="/kontakt?kurz=latinfit" className="btn-outline block w-full py-3 rounded-xl text-center font-bold tracking-widest uppercase text-xs">Prihlásiť sa</Link>
          </article>

        </div>
      </section>

      {/* Additional Offerings */}
      <section className="py-16 bg-obsidian-800 border-t border-gold-500/10 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-white mb-12 text-center">Ďalšie možnosti v klube</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tango */}
            <div className="flex items-center gap-6 p-6 bg-obsidian-900 rounded-xl border border-gold-500/10 hover:border-gold-500/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 flex-shrink-0 flex items-center justify-center text-gold-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h4 className="font-serif text-xl text-white mb-1">Tango Argentíno</h4>
                <p className="text-sm text-gray-400 font-light mb-2">Vášeň a hĺbka komunikácie v páre. <strong>Cena: 50€/kurz</strong>.</p>
                <Link href="/kontakt?kurz=tango" className="text-gold-500 text-xs tracking-widest uppercase font-bold hover:underline">Zistiť viac</Link>
              </div>
            </div>

            {/* Kids / Competitive */}
            <div id="sutaze" className="flex items-center gap-6 p-6 bg-obsidian-900 rounded-xl border border-gold-500/10 hover:border-gold-500/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 flex-shrink-0 flex items-center justify-center text-gold-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div>
                <h4 className="font-serif text-xl text-white mb-1">Deti & Súťažný Tanec</h4>
                <p className="text-sm text-gray-400 font-light mb-2">Výchova mladých talentov s jasnou cestou až do profi športu.</p>
                <Link href="/kontakt?kurz=deti" className="text-gold-500 text-xs tracking-widest uppercase font-bold hover:underline">Zistiť viac</Link>
              </div>
            </div>

            {/* Commercial */}
            <div className="flex items-center gap-6 p-6 bg-obsidian-900 rounded-xl border border-gold-500/10 hover:border-gold-500/30 transition-colors md:col-span-2">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 flex-shrink-0 flex items-center justify-center text-gold-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <div>
                <h4 className="font-serif text-xl text-white mb-1">Komerčná Ponuka (Prenájom & Eventy)</h4>
                <p className="text-sm text-gray-400 font-light mb-2">Prenájom priestorov Hornej a Dolnej sály, alebo zorganizovanie tanečného eventu / plesu na kľúč (Ellegance Dance Cup a iné).</p>
                <Link href="/kontakt?kurz=prenajom" className="text-gold-500 text-xs tracking-widest uppercase font-bold hover:underline">Kontaktujte nás pre cenovú ponuku</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
