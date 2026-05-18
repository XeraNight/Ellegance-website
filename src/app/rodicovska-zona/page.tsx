import React from "react";
import { Lock } from "lucide-react";

export default function RodicovskaZonaPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 bg-obsidian-900 flex flex-col items-center justify-center px-6">
      <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 mb-8 border border-gold-500/20">
        <Lock className="w-8 h-8" />
      </div>
      <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold mb-4">Privátna sekcia</span>
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 text-center">Zóna pre rodičov</h1>
      <div className="w-24 h-1 bg-gold-500/20 rounded-full mb-12"></div>
      <p className="text-gray-400 text-center max-w-lg font-light leading-relaxed">
        Pripravujeme pre vás bezpečný prístup k dôležitým informáciám, harmonogramom a interným oznamom klubu.
      </p>
    </div>
  );
}
