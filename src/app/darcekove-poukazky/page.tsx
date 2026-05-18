"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Mail, Printer, CheckCircle2, ChevronRight } from "lucide-react";

export default function DarcekovePoukazkyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState("50");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-40 pb-20 bg-obsidian-900 flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 border border-gold-500/20 p-12 rounded-3xl backdrop-blur-xl text-center max-w-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gold-500"></div>
          <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500 mb-8 mx-auto border border-gold-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tighter mb-4">Požiadavka prijatá</h2>
          <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm">
            Vaša objednávka bola zaevidovaná pod poradovým číslom #EG-{(Math.random() * 1000).toFixed(0)}. 
            Čoskoro vás budeme kontaktovať.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold border-b border-gold-500/30 hover:border-gold-500 transition-all pb-1"
          >
            Nová objednávka
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 bg-obsidian-900 overflow-hidden relative font-[family-name:var(--font-jakarta)]">
      {/* Precision Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-start mb-16 border-l border-gold-500/30 pl-8">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-gold-500 uppercase tracking-[0.5em] text-[9px] font-black mb-2"
          >
            Exclusive Gifting
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter"
          >
            Darčekové <span className="text-gold-500 italic font-light lowercase">poukážky</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Balanced Voucher Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="relative group">
              <div className="relative aspect-[16/9] bg-black rounded-3xl border border-gold-500/20 p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                {/* Balanced UI Elements */}
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-12 h-12 border-t border-r border-gold-500/30 rounded-tr-3xl"></div>
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex flex-col">
                    <div className="text-gold-500 text-[8px] uppercase tracking-[0.4em] font-black mb-1">Authentic Voucher</div>
                    <div className="text-white/40 text-[7px] uppercase tracking-widest font-light">Serial No. EL-2024-XXXX</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white tracking-tighter">{value} <span className="text-gold-500">EUR</span></div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="h-[0.5px] w-full bg-gradient-to-r from-gold-500/50 to-transparent mb-6"></div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-1">Ellegance Experience</h3>
                  <p className="text-white/20 text-[7px] uppercase tracking-[0.3em] font-medium leading-relaxed">
                    Valid for all studio services & masterclasses <br /> ellegance.sk / dance studio
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pl-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gold-500">
                  <Mail className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Digital PDF</span>
                </div>
                <p className="text-gray-600 text-[8px] uppercase tracking-wider leading-relaxed">Doručenie obratom <br /> na váš e-mail</p>
              </div>
              <div className="space-y-2 border-l border-white/5 pl-6">
                <div className="flex items-center gap-2 text-gold-500">
                  <Printer className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Physical Card</span>
                </div>
                <p className="text-gray-600 text-[8px] uppercase tracking-wider leading-relaxed">Tlačená verzia <br /> v darčekovom balení</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Sharp Precise Form with Moderate Corners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-black/40 border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-md relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 blur-3xl pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Technical Value Picker */}
              <div className="space-y-4">
                <label className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-black flex items-center gap-2">
                  <div className="w-1 h-1 bg-gold-500 rounded-full"></div> 01. Select Amount
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {["20", "50", "100", "Custom"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => v !== "Custom" && setValue(v)}
                      className={`py-3 rounded-xl border text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                        value === v 
                          ? "border-gold-500 bg-gold-500/10 text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                          : "border-white/5 bg-transparent text-gray-600 hover:border-white/20"
                      }`}
                    >
                      {v}{v !== "Custom" ? "€" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Precise Input Fields */}
              <div className="space-y-6">
                <label className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-black flex items-center gap-2">
                  <div className="w-1 h-1 bg-gold-500 rounded-full"></div> 02. Personal Data
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="group">
                    <input 
                      type="text" 
                      required
                      placeholder="MENO OBDAROVANÉHO" 
                      className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] text-white font-medium focus:outline-none focus:border-gold-500 transition-colors placeholder:text-gray-800 tracking-widest"
                    />
                  </div>
                  <div className="group">
                    <input 
                      type="text" 
                      required
                      placeholder="VAŠE MENO" 
                      className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] text-white font-medium focus:outline-none focus:border-gold-500 transition-colors placeholder:text-gray-800 tracking-widest"
                    />
                  </div>
                  <div className="group md:col-span-2">
                    <input 
                      type="email" 
                      required
                      placeholder="VÁŠ KONTAKTNÝ E-MAIL" 
                      className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] text-white font-medium focus:outline-none focus:border-gold-500 transition-colors placeholder:text-gray-800 tracking-widest"
                    />
                  </div>
                  <div className="group md:col-span-2">
                    <textarea 
                      placeholder="VENOVANIE (VOLITEĽNÉ)" 
                      rows={2}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] text-white font-medium focus:outline-none focus:border-gold-500 transition-colors placeholder:text-gray-800 tracking-widest resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="btn-gold w-full py-5 text-obsidian-900 font-black uppercase tracking-[0.3em] text-[10px] rounded-full overflow-hidden transition-all duration-500 shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.5)]"
                >
                  Potvrdiť rezerváciu
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
