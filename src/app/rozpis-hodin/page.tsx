"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Sparkles } from "lucide-react";

export default function RozpisHodinPage() {
  const [selectedSala, setSelectedSala] = useState<"hlavna" | "vedlajsia">("hlavna");

  return (
    <div className="min-h-screen pt-28 pb-14 bg-obsidian-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-gold-500 uppercase tracking-[0.4em] text-[9px] font-black mb-3 block">
            Kedy tancujeme
          </span>
          <h1 className="text-3xl md:text-5xl font-[family-name:var(--font-outfit)] font-bold text-white tracking-tight mb-4">
            Rozvrh <span className="text-gold-500 font-light italic">kurzov</span>
          </h1>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            Prihláste sa včas do našich tréningových skupín. Tréningy prebiehajú v našich dvoch profesionálne vybavených sálach.
          </p>
          <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-6"></div>
        </div>

        {/* Sala Toggle Switches */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 relative">
            <button
              onClick={() => setSelectedSala("hlavna")}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative z-10 ${
                selectedSala === "hlavna" ? "text-obsidian-900" : "text-white/60 hover:text-white"
              }`}
            >
              {selectedSala === "hlavna" && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-gold-500 rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              HLAVNÁ SÁLA
            </button>
            <button
              onClick={() => setSelectedSala("vedlajsia")}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative z-10 ${
                selectedSala === "vedlajsia" ? "text-obsidian-900" : "text-white/60 hover:text-white"
              }`}
            >
              {selectedSala === "vedlajsia" && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-gold-500 rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              VEDĽAJŠIA SÁLA
            </button>
          </div>
        </div>

        {/* Timetables */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {selectedSala === "hlavna" ? (
              <motion.div
                key="hlavna-sala"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-obsidian-950/70 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)] mb-6">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 text-gray-500 font-bold text-[9px] uppercase tracking-widest text-center w-[12%] bg-black/40 border-b border-white/10">Čas</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Pondelok</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Utorok</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Streda</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Štvrtok</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Piatok</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px]">
                      {/* 15:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">15:00</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 15:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">15:30</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 16:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">16:00</td>
                        {/* Monday K3 */}
                        <td className="p-1 border-r border-white/5" rowSpan={3}>
                          <div className="bg-white/[0.02] border border-white/10 hover:bg-white/5 hover:border-gold-500/30 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-gray-400 font-light min-h-[86px]">
                            <span className="font-semibold text-[10px] text-gray-300 uppercase tracking-wider block">Súťažný tanec (K3)</span>
                            <span className="text-[8px] text-gray-500 font-bold mt-1 tracking-widest uppercase">16:00 - 17:30</span>
                          </div>
                        </td>
                        {/* Tuesday K2 */}
                        <td className="p-1 border-r border-white/5" rowSpan={3}>
                          <div className="bg-gold-500/5 border border-gold-500/30 shadow-[0_0_8px_rgba(212,175,55,0.06)] hover:bg-gold-500/15 hover:border-gold-500/60 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-gold-400/90 font-light min-h-[86px]">
                            <span className="font-semibold text-[10px] text-gold-400 uppercase tracking-widest block">Súťažný tanec (K2)</span>
                            <span className="text-[8px] text-gold-500/60 font-bold mt-1 tracking-widest uppercase">16:00 - 17:30</span>
                          </div>
                        </td>
                        <td className="p-1 border-r border-white/5"></td>
                        {/* Thursday K2 */}
                        <td className="p-1 border-r border-white/5" rowSpan={3}>
                          <div className="bg-gold-500/5 border border-gold-500/30 shadow-[0_0_8px_rgba(212,175,55,0.06)] hover:bg-gold-500/15 hover:border-gold-500/60 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-gold-400/90 font-light min-h-[86px]">
                            <span className="font-semibold text-[10px] text-gold-400 uppercase tracking-widest block">Súťažný tanec (K2)</span>
                            <span className="text-[8px] text-gold-500/60 font-bold mt-1 tracking-widest uppercase">16:00 - 17:30</span>
                          </div>
                        </td>
                        {/* Friday CP */}
                        <td className="p-1" rowSpan={4}>
                          <div className="bg-gold-500/5 border border-gold-500/30 hover:bg-gold-500/15 hover:border-gold-500/60 hover:-translate-y-0.5 hover:shadow-[0_3px_15px_rgba(212,175,55,0.12)] transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-gold-400 font-light min-h-[116px]">
                            <span className="font-bold text-[10px] uppercase tracking-wider block">Súťažný tanec (CP)</span>
                            <span className="text-[8px] text-gold-500/60 font-bold mt-1 tracking-widest uppercase">16:00 - 18:00</span>
                          </div>
                        </td>
                      </tr>

                      {/* 16:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">16:30</td>
                        {/* Mon, Tue, Thu, Fri are covered */}
                        <td className="p-1 border-r border-white/5"></td>
                      </tr>

                      {/* 17:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">17:00</td>
                        {/* Mon, Tue, Thu, Fri are covered */}
                        <td className="p-1 border-r border-white/5"></td>
                      </tr>

                      {/* 17:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">17:30</td>
                        <td className="p-1 border-r border-white/5"></td>
                        {/* Tuesday K1 */}
                        <td className="p-1 border-r border-white/5" rowSpan={3}>
                          <div className="bg-gold-500/15 border-2 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:bg-gold-500/25 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-white min-h-[86px]">
                            <Sparkles className="w-3.5 h-3.5 text-gold-500 mb-1 animate-pulse" />
                            <span className="font-black text-[10px] text-gold-400 uppercase tracking-widest block">Súťažný tanec (K1)</span>
                            <span className="text-[8px] text-gold-500 font-black mt-1 tracking-widest uppercase">17:30 - 19:00</span>
                          </div>
                        </td>
                        <td className="p-1 border-r border-white/5"></td>
                        {/* Thursday K1 */}
                        <td className="p-1 border-r border-white/5" rowSpan={3}>
                          <div className="bg-gold-500/15 border-2 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:bg-gold-500/25 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-white min-h-[86px]">
                            <Sparkles className="w-3.5 h-3.5 text-gold-500 mb-1 animate-pulse" />
                            <span className="font-black text-[10px] text-gold-400 uppercase tracking-widest block">Súťažný tanec (K1)</span>
                            <span className="text-[8px] text-gold-500 font-black mt-1 tracking-widest uppercase">17:30 - 19:00</span>
                          </div>
                        </td>
                        {/* Friday is free after 18:00 (CP ends at 18:00) */}
                      </tr>

                      {/* 18:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">18:00</td>
                        <td className="p-1 border-r border-white/5"></td>
                        {/* Tue & Thu covered by K1 */}
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 18:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">18:30</td>
                        <td className="p-1 border-r border-white/5"></td>
                        {/* Tue & Thu covered by K1 */}
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 19:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">19:00</td>
                        {/* Monday Spol. Tance */}
                        <td className="p-1 border-r border-white/5" rowSpan={3}>
                          <div className="bg-gold-500/10 border border-gold-500 shadow-[0_0_12px_rgba(212,175,55,0.12)] hover:bg-gold-500/15 hover:border-gold-500/50 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-white min-h-[86px]">
                            <span className="font-bold text-[10px] uppercase tracking-wider block">Spoločenské tance</span>
                            <span className="text-[8px] text-gold-400 mt-1 font-bold tracking-wider uppercase">19:00 - 20:30 (Dospelí)</span>
                          </div>
                        </td>
                        {/* Tuesday Spol. Tance */}
                        <td className="p-1 border-r border-white/5" rowSpan={3}>
                          <div className="bg-gold-500/10 border border-gold-500 shadow-[0_0_12px_rgba(212,175,55,0.12)] hover:bg-gold-500/15 hover:border-gold-500/50 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-white min-h-[86px]">
                            <span className="font-bold text-[10px] uppercase tracking-wider block">Spoločenské tance</span>
                            <span className="text-[8px] text-gold-400 mt-1 font-bold tracking-wider uppercase">19:00 - 20:30 (Dospelí)</span>
                          </div>
                        </td>
                        <td className="p-1 border-r border-white/5"></td>
                        {/* Thursday Tango */}
                        <td className="p-1 border-r border-white/5" rowSpan={3}>
                          <div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-white min-h-[86px]">
                            <span className="font-bold text-[10px] uppercase tracking-wider block">Tango Argentíno</span>
                            <span className="text-[8px] text-gray-400 mt-1 font-bold tracking-wider uppercase">19:00 - 20:30</span>
                          </div>
                        </td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 19:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">19:30</td>
                        {/* Mon, Tue, Thu covered */}
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 20:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">20:00</td>
                        {/* Mon, Tue, Thu covered */}
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>
                      
                      {/* 20:30 */}
                      <tr className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">20:30</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="vedlajsia-sala"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-obsidian-950/70 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)] mb-6">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 text-gray-500 font-bold text-[9px] uppercase tracking-widest text-center w-[12%] bg-black/40 border-b border-white/10">Čas</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Pondelok</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Utorok</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Streda</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Štvrtok</th>
                        <th className="py-3 px-4 text-white font-bold text-[9px] uppercase tracking-widest text-center w-[17.6%] bg-black/40 border-b border-white/10 border-l border-white/5">Piatok</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px]">
                      {/* 15:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">15:00</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 15:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">15:30</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 16:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">16:00</td>
                        {/* Monday Deti 1 */}
                        <td className="p-1 border-r border-white/5" rowSpan={2}>
                          <div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-gray-300 min-h-[56px]">
                            <span className="font-bold text-[10px] uppercase tracking-wider block">Deti 1</span>
                            <span className="text-[8px] text-gray-400 font-bold mt-1 tracking-widest uppercase">16:00 - 17:00</span>
                          </div>
                        </td>
                        <td className="p-1 border-r border-white/5"></td>
                        {/* Wednesday Deti 1 */}
                        <td className="p-1 border-r border-white/5" rowSpan={2}>
                          <div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-gray-300 min-h-[56px]">
                            <span className="font-bold text-[10px] uppercase tracking-wider block">Deti 1</span>
                            <span className="text-[8px] text-gray-400 font-bold mt-1 tracking-widest uppercase">16:00 - 17:00</span>
                          </div>
                        </td>
                        {/* Thursday K3 */}
                        <td className="p-1 border-r border-white/5" rowSpan={3}>
                          <div className="bg-white/[0.02] border border-white/10 hover:bg-white/5 hover:border-gold-500/30 hover:-translate-y-0.5 transition-all p-2 rounded-lg text-center h-full flex flex-col items-center justify-center text-gray-400 font-light min-h-[86px]">
                            <span className="font-semibold text-[10px] text-gray-300 uppercase tracking-wider block">Súťažný tanec (K3)</span>
                            <span className="text-[8px] text-gray-500 font-bold mt-1 tracking-widest uppercase">16:00 - 17:30</span>
                          </div>
                        </td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 16:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">16:30</td>
                        {/* Mon & Wed covered by Deti 1, Thu covered by K3 */}
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 17:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">17:00</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        {/* Thu covered by K3 */}
                        <td className="p-1"></td>
                      </tr>

                      {/* 17:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">17:30</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 18:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">18:00</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 18:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">18:30</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 19:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">19:00</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 19:30 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">19:30</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 20:00 */}
                      <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">20:00</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>

                      {/* 20:30 */}
                      <tr className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-1.5 px-3 text-gray-500 text-center font-mono font-medium border-r border-white/5">20:30</td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1 border-r border-white/5"></td>
                        <td className="p-1"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Informational Cards & Booking Link */}
        <div className="max-w-4xl mx-auto mt-10 space-y-4">
          <div className="p-4 md:p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 font-bold shrink-0 text-base">
              i
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-0.5">
                Individuálne lekcie & Voľný tréning
              </h4>
              <p className="text-gray-400 text-[11px] font-light leading-relaxed">
                V časoch, kedy v sálach neprebiehajú skupinové kurzy, sú priestory vyhradené na individuálne lekcie s trénermi, súkromný prenájom alebo voľné praktiky našich registrovaných tanečných párov.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/kontakt"
              className="text-gold-500/60 hover:text-gold-500 transition-colors text-[10px] font-bold uppercase tracking-[0.2em] inline-block border-b border-gold-500/20 hover:border-gold-500/60 pb-0.5"
            >
              Nenašli ste svoj termín? Napíšte nám
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
