import React from "react";
import Link from "next/link";

export default function EventyPage() {
  return (
    <>
      {/* Page Header */}
      <header className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900 via-obsidian-800 to-obsidian-900"></div>
          <div className="bg-blob blob-1" style={{ background: 'rgba(212, 175, 55, 0.1)', width: '600px', height: '600px', top: '10%', right: '-10%', animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gold-500 font-sans tracking-[0.2em] font-semibold uppercase text-xs mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
            B2B & Spoločenské Udalosti
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            Umenie, ktoré <i className="text-gold-500 font-light">ohromí</i>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-3xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
            Ponúkame exkluzívne tanečné vystúpenia, organizáciu reprezentačných plesov a profesionálne show pre firemné eventy. Dodajte vášmu podujatiu úroveň, ktorú si zaslúži.
          </p>
        </div>
      </header>

      {/* Služby Eventov */}
      <section className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Karta 1 */}
            <div className="segment-card p-10 md:p-14 group">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-8 border border-gold-500/30 group-hover:bg-gold-500/20 transition-colors">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
              </div>
              <h3 className="font-serif text-3xl font-bold text-white mb-4">Tanečné Vystúpenia</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Profesionálne show v štandardných a latinskoamerických tancoch, ktoré zaručene obohatia program vášho večera. Naši špičkoví tanečníci predvedú dychberúce choreografie s precíznou technikou a emóciou.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-gray-300"><span className="text-gold-500 mr-2">✦</span> Firemné večierky a gala večery</li>
                <li className="flex items-center text-sm text-gray-300"><span className="text-gold-500 mr-2">✦</span> Otváracie ceremoniály</li>
                <li className="flex items-center text-sm text-gray-300"><span className="text-gold-500 mr-2">✦</span> Tematické eventy (Gatsby, Latino night)</li>
              </ul>
            </div>

            {/* Karta 2 */}
            <div className="segment-card p-10 md:p-14 group">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-8 border border-gold-500/30 group-hover:bg-gold-500/20 transition-colors">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="font-serif text-3xl font-bold text-white mb-4">Plesy a Bály</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Zabezpečujeme kompletné tanečné zastrešenie plesov. Od slávnostného otváracieho valčíka, cez predtanečníkov, až po krátke lekcie tanca pre vašich hostí priamo na parkete.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-gray-300"><span className="text-gold-500 mr-2">✦</span> Predtancovanie (Otváracie choreografie)</li>
                <li className="flex items-center text-sm text-gray-300"><span className="text-gold-500 mr-2">✦</span> Animácie hostí na parkete</li>
                <li className="flex items-center text-sm text-gray-300"><span className="text-gold-500 mr-2">✦</span> Spolu-organizácia programovej štruktúry</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Galéria / Vizuál CTA */}
      <section className="py-24 bg-obsidian-800/30 border-t border-gold-500/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">Máte záujem o spoluprácu?</h2>
          <p className="text-gray-400 font-light mb-10 max-w-2xl mx-auto">
            Každé podujatie je jedinečné. Radi pre vás pripravíme cenovú ponuku a program na mieru, ktorý bude presne zodpovedať charakteru vašej udalosti.
          </p>
          <Link href="/kontakt?kurz=ine" className="btn-gold inline-block px-10 py-4 rounded-full font-sans text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            Vyžiadať ponuku
          </Link>
        </div>
      </section>
    </>
  );
}
