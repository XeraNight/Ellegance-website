import React from "react";
import Link from "next/link";

export default function RozpisHodinPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-10 bg-obsidian-900">
        <div className="text-center px-4 max-w-3xl mx-auto">
          <span className="block text-gold-500 font-sans tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in-up font-bold">Kedy tancujeme</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up text-glow" style={{ animationDelay: '0.1s' }}>Rozvrh kurzov</h1>
          <p className="text-gray-400 font-light mb-8">Prihláste sa včas, kapacita sál je pre komfort tancovania obmedzená.</p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold-500 to-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-obsidian-900 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          
          <h2 className="font-serif text-3xl font-bold text-white mb-8 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Horná Sála</h2>
          
          <div className="overflow-x-auto rounded-xl border border-gold-500/20 bg-obsidian-800 shadow-2xl mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <table className="w-full text-left border-collapse min-w-[800px] schedule-table">
              <thead>
                <tr>
                  <th className="p-4 text-gray-400 font-sans font-medium text-sm tracking-wider uppercase text-center w-[10%] bg-[#0a0a0a] border-b border-gold-500/30">Čas</th>
                  <th className="p-4 text-white font-sans font-medium text-sm tracking-wider uppercase text-center w-[12.8%] bg-[#0a0a0a] border-b border-gold-500/30">Pondelok</th>
                  <th className="p-4 text-white font-sans font-medium text-sm tracking-wider uppercase text-center w-[12.8%] bg-[#0a0a0a] border-b border-gold-500/30">Utorok</th>
                  <th className="p-4 text-white font-sans font-medium text-sm tracking-wider uppercase text-center w-[12.8%] bg-[#0a0a0a] border-b border-gold-500/30">Streda</th>
                  <th className="p-4 text-white font-sans font-medium text-sm tracking-wider uppercase text-center w-[12.8%] bg-[#0a0a0a] border-b border-gold-500/30">Štvrtok</th>
                  <th className="p-4 text-white font-sans font-medium text-sm tracking-wider uppercase text-center w-[12.8%] bg-[#0a0a0a] border-b border-gold-500/30">Piatok</th>
                  <th className="p-4 text-gold-500 font-sans font-medium text-sm tracking-wider uppercase text-center w-[12.8%] bg-[#0a0a0a] border-b border-gold-500/30">Sobota</th>
                  <th className="p-4 text-gold-500 font-sans font-medium text-sm tracking-wider uppercase text-center w-[12.8%] bg-[#0a0a0a] border-b border-gold-500/30">Nedeľa</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5 hover:bg-gold-500/5 transition-colors">
                  <td className="p-4 text-gray-500 text-center font-mono border-r border-white/5">14:00</td>
                  <td className="p-2 border-r border-white/5"><div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all p-3 rounded-lg text-center h-full text-gray-300">Individuálne lekcie</div></td>
                  <td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2"></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-gold-500/5 transition-colors">
                  <td className="p-4 text-gray-500 text-center font-mono border-r border-white/5">15:00</td>
                  <td className="p-2 border-r border-white/5" rowSpan={2}><div className="bg-gold-500/5 border border-gold-500/20 hover:bg-gold-500/15 hover:border-gold-500/50 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(212,175,55,0.1)] transition-all p-3 rounded-lg text-center h-full flex flex-col items-center justify-center text-gold-400 font-medium">Súťažný tanec (K2)<br /><span className="text-xs text-gold-500/50">15:00-16:30</span></div></td>
                  <td className="p-2 border-r border-white/5"></td>
                  <td className="p-2 border-r border-white/5" rowSpan={2}><div className="bg-gold-500/5 border border-gold-500/20 hover:bg-gold-500/15 hover:border-gold-500/50 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(212,175,55,0.1)] transition-all p-3 rounded-lg text-center h-full flex flex-col items-center justify-center text-gold-400 font-medium">Súťažný tanec (K2)<br /><span className="text-xs text-gold-500/50">15:00-16:30</span></div></td>
                  <td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2"></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-gold-500/5 transition-colors">
                  <td className="p-4 text-gray-500 text-center font-mono border-r border-white/5">16:00</td>
                  <td className="p-2 border-r border-white/5"><div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all p-3 rounded-lg text-center h-full text-gray-300">Deti 1 (16:00-17:00)</div></td>
                  <td className="p-2 border-r border-white/5"></td>
                  <td className="p-2 border-r border-white/5"><div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all p-3 rounded-lg text-center h-full text-gray-300">Deti 1 (16:00-17:00)</div></td>
                  <td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2"></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-gold-500/5 transition-colors">
                  <td className="p-4 text-gray-500 text-center font-mono border-r border-white/5">17:00</td>
                  <td className="p-2 border-r border-white/5" rowSpan={2}><div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all p-3 rounded-lg text-center h-full flex flex-col items-center justify-center text-white">Prípravka (K1)<br /><span className="text-xs text-gray-500">16:30-18:00</span></div></td>
                  <td className="p-2 border-r border-white/5" rowSpan={2}><div className="bg-gold-500/5 border border-gold-500/20 hover:bg-gold-500/15 hover:border-gold-500/50 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(212,175,55,0.1)] transition-all p-3 rounded-lg text-center h-full flex flex-col items-center justify-center text-gold-400 font-medium">Súťažný tanec (CP)<br /><span className="text-xs text-gold-500/50">17:00-18:30</span></div></td>
                  <td className="p-2 border-r border-white/5" rowSpan={2}><div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all p-3 rounded-lg text-center h-full flex flex-col items-center justify-center text-white">Prípravka (K1)<br /><span className="text-xs text-gray-500">16:30-18:00</span></div></td>
                  <td className="p-2 border-r border-white/5" rowSpan={2}><div className="bg-gold-500/5 border border-gold-500/20 hover:bg-gold-500/15 hover:border-gold-500/50 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(212,175,55,0.1)] transition-all p-3 rounded-lg text-center h-full flex flex-col items-center justify-center text-gold-400 font-medium">Súťažný tanec (CP)<br /><span className="text-xs text-gold-500/50">17:00-18:30</span></div></td>
                  <td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2"></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-gold-500/5 transition-colors">
                  <td className="p-4 text-gray-500 text-center font-mono border-r border-white/5">18:00</td>
                  <td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2"></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-gold-500/5 transition-colors">
                  <td className="p-4 text-gray-500 text-center font-mono border-r border-white/5">19:00</td>
                  <td className="p-2 border-r border-white/5" rowSpan={2}><div className="bg-gold-500/10 border border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-gold-500/15 hover:border-gold-500/50 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(212,175,55,0.1)] transition-all p-3 rounded-lg text-center h-full flex flex-col items-center justify-center text-white"><span className="font-bold">Spoločenské tance</span><br /><span className="text-xs text-gold-400 mt-1">19:00-20:30 (Dospelí)</span></div></td>
                  <td className="p-2 border-r border-white/5" rowSpan={2}><div className="bg-gold-500/10 border border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-gold-500/15 hover:border-gold-500/50 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(212,175,55,0.1)] transition-all p-3 rounded-lg text-center h-full flex flex-col items-center justify-center text-white"><span className="font-bold">Spoločenské tance</span><br /><span className="text-xs text-gold-400 mt-1">19:00-20:30 (Dospelí)</span></div></td>
                  <td className="p-2 border-r border-white/5"></td>
                  <td className="p-2 border-r border-white/5" rowSpan={2}><div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all p-3 rounded-lg text-center h-full flex flex-col items-center justify-center text-white"><span className="font-bold">Tango Argentíno</span><br /><span className="text-xs text-gray-400 mt-1">19:00-20:30</span></div></td>
                  <td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2"></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-gold-500/5 transition-colors">
                  <td className="p-4 text-gray-500 text-center font-mono border-r border-white/5">20:00</td>
                  <td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2 border-r border-white/5"></td><td className="p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center">
            <Link href="/kontakt" className="btn-gold px-8 py-4 rounded-full font-sans text-sm font-bold tracking-widest uppercase inline-block">Nenašli ste termín? Napíšte nám</Link>
          </div>

        </div>
      </section>
    </>
  );
}
