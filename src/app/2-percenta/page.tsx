"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle2, FileText, Heart } from "lucide-react";

export default function DvePercentaPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 bg-obsidian-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-8 border border-gold-500/20 shadow-xl shadow-gold-500/5"
          >
            <Heart className="w-8 h-8" />
          </motion.div>
          
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold-500 uppercase tracking-[0.5em] text-[10px] font-black mb-4"
          >
            Pomôžte nám rásť
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-tighter"
          >
            2% z vašich <span className="text-gold-500 italic font-light lowercase">daní</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-light leading-relaxed max-w-2xl text-lg"
          >
            Vaša podpora nám umožňuje vychovávať novú generáciu tanečníkov a realizovať športové aktivity pre vozičkárov. Ďakujeme, že nám pomáhate šíriť radosť z tanca.
          </motion.p>
        </div>

        {/* Club Details Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 border border-gold-500/20 p-8 md:p-12 rounded-3xl backdrop-blur-xl mb-16 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-white text-xl font-bold uppercase tracking-tight">Údaje o prijímateľovi</h2>
              <div className="space-y-4">
                <div className="border-b border-white/5 pb-2">
                  <p className="text-gold-500/50 text-[9px] uppercase tracking-widest font-bold">Obchodné meno / Názov</p>
                  <p className="text-white font-medium text-sm">Ellegance</p>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <p className="text-gold-500/50 text-[9px] uppercase tracking-widest font-bold">Právna forma</p>
                  <p className="text-white font-medium text-sm">Občianske združenie</p>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <p className="text-gold-500/50 text-[9px] uppercase tracking-widest font-bold">IČO</p>
                  <p className="text-white font-medium text-sm">42246417</p>
                </div>
                <div className="pb-2">
                  <p className="text-gold-500/50 text-[9px] uppercase tracking-widest font-bold">Sídlo</p>
                  <p className="text-white font-medium text-sm">Žriedlová 13, 040 01 Košice</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
              <h3 className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-4">Ako postupovať?</h3>
              <ul className="space-y-4">
                {[
                  "Požiadajte zamestnávateľa o Ročné zúčtovanie preddavkov na dane.",
                  "Stiahnite a vyplňte Vyhlásenie o poukázaní podielu zaplatenej dane.",
                  "Obe tlačivá doručte na daňový úrad podľa vášho bydliska."
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-xs text-gray-400 font-light leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Download Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-gold-500/30 transition-all duration-500 text-center"
          >
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white mb-6 mx-auto group-hover:bg-gold-500 group-hover:text-obsidian-900 transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-white text-lg font-bold mb-2 uppercase tracking-tight">Vyhlásenie 2024</h3>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-6">Predvyplnené tlačivo (PDF)</p>
            <button className="btn-gold w-full py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Stiahnuť PDF
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-gold-500/30 transition-all duration-500 text-center"
          >
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white mb-6 mx-auto group-hover:bg-gold-500 group-hover:text-obsidian-900 transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-white text-lg font-bold mb-2 uppercase tracking-tight">Potvrdenie o dani</h3>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-6">Prázdne tlačivo (PDF)</p>
            <button className="btn-gold w-full py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Stiahnuť PDF
            </button>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-medium italic">
            Vaše 2 % pre nás znamenajú 100 % radosti pre naše deti.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
