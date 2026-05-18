import React from "react";

export default function VybavaPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 bg-obsidian-900 flex flex-col items-center justify-center px-6">
      <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold mb-4">E-shop</span>
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 text-center">Tanečná výbava</h1>
      <div className="w-24 h-1 bg-gold-500/20 rounded-full mb-12"></div>
      <p className="text-gray-400 text-center max-w-lg font-light leading-relaxed">
        Pripravujeme pre vás odporúčania a ponuku tanečnej obuvi a oblečenia pre začiatočníkov aj pokročilých.
      </p>
    </div>
  );
}
