"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, ArrowRight } from "lucide-react";

export default function NewsPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 1 second to ensure it's noticed almost immediately
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const scrollToNews = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
    const element = document.getElementById("news-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-8 right-8 z-[9999] max-w-[320px] w-full"
        >
          <div className="relative bg-obsidian-900 border border-gold-500/50 p-6 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.2)] group overflow-hidden">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-white/30 hover:text-white transition-all z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 bg-gold-500/20 rounded-xl flex items-center justify-center text-gold-500 border border-gold-500/30">
                <Bell className="w-5 h-5" />
              </div>
              
              <div className="flex flex-col gap-2 text-left">
                <span className="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-black">Aktuálne oznamy</span>
                <h4 className="text-white text-base font-bold leading-tight">Pozrite si naše novinky</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Práve sme pridali dôležité informácie o kurzoch a 2 % z daní.
                </p>
                
                <button 
                  onClick={scrollToNews}
                  className="mt-2 flex items-center gap-2 text-gold-500 text-[10px] font-black uppercase tracking-[0.2em] hover:gap-4 transition-all duration-300 w-fit border-b border-gold-500/20 pb-1"
                >
                  Ukázať karty <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Subtle light effect inside */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold-500/10 blur-[50px] pointer-events-none"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
