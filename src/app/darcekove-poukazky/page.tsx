"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gift, 
  Mail, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  CreditCard, 
  Eye, 
  Info,
  Clock,
  AlertCircle
} from "lucide-react";
import { getAssetPath } from "@/lib/utils";

type DesignTheme = "midnight" | "champagne" | "rosegold";
type DeliveryType = "digital" | "physical";

export default function DarcekovePoukazkyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState("");
  
  // Customizer States
  const [value, setValue] = useState("50");
  const [customValue, setCustomValue] = useState("");
  const [theme, setTheme] = useState<DesignTheme>("midnight");
  const [delivery, setDelivery] = useState<DeliveryType>("digital");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  
  // Custom interactive 3D Tilt Effect
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map mouse coordinates to degrees rotation
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const activeValue = value === "Custom" ? (customValue || "0") : value;
  const finalPrice = parseInt(activeValue) + (delivery === "physical" ? 5 : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSending(true);

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    try {
      if (!formspreeId) {
        // Fallback simulation in development to make testing smooth
        console.warn("[WARNING] NEXT_PUBLIC_FORMSPREE_ID is not defined. Simulating order submission.");
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Premium delay feel
        setSubmitted(true);
        setIsSending(false);
        return;
      }

      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientName: recipient.trim(),
          senderName: sender.trim(),
          email: email.trim(),
          dedication: message.trim() || "Bez venovania",
          amount: `${activeValue} €`,
          delivery: delivery === "digital" ? "Digitálne doručenie (E-mail)" : "Tlačená luxusná verzia (+5€)",
          voucherTheme: theme.toUpperCase(),
          totalPriceToPay: `${finalPrice} €`
        })
      });

      if (!response.ok) {
        throw new Error("Nepodarilo sa odoslať rezerváciu.");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Voucher submit error:", err);
      setFormError("Odoslanie zlyhalo. Skontrolujte prosím internetové pripojenie alebo skúste neskôr.");
    } finally {
      setIsSending(false);
    }
  };

  // Theme design mappings
  const themeStyles = {
    midnight: {
      gradient: "from-zinc-950 via-zinc-900 to-obsidian-950",
      border: "border-gold-500/30",
      accent: "text-gold-500",
      badge: "bg-gold-500/10 text-gold-400 border-gold-500/30",
      glow: "from-gold-500/15 via-transparent to-transparent",
      accentBg: "bg-gold-500"
    },
    champagne: {
      gradient: "from-stone-900 via-stone-950 to-stone-900",
      border: "border-amber-500/25",
      accent: "text-amber-500",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glow: "from-amber-500/15 via-transparent to-transparent",
      accentBg: "bg-amber-500"
    },
    rosegold: {
      gradient: "from-rose-950/60 via-zinc-950 to-zinc-900",
      border: "border-rose-500/30",
      accent: "text-rose-400",
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      glow: "from-rose-500/15 via-transparent to-transparent",
      accentBg: "bg-rose-400"
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-40 pb-20 bg-obsidian-900 overflow-hidden relative font-[family-name:var(--font-jakarta)] select-none">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Precision grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Success / Confirmation Screen */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto py-12"
            >
              <div className="bg-obsidian-950/60 border border-white/10 p-8 sm:p-12 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden text-center shadow-3xl">
                {/* Glow behind */}
                <div className={`absolute -top-12 -left-12 w-48 h-48 bg-gradient-to-br ${themeStyles[theme].glow} rounded-full blur-3xl pointer-events-none`}></div>
                
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto bg-white/5 border border-white/10 ${themeStyles[theme].accent}`}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-zinc-500 uppercase tracking-[0.3em] text-[9px] font-black block mb-2">
                  Rezervácia prijatá
                </span>
                <h2 className="text-3xl font-serif font-bold text-white tracking-tight mb-4">
                  Poukážka je <span className={`${themeStyles[theme].accent} font-light italic`}>pripravená!</span>
                </h2>
                
                <p className="text-zinc-300 text-sm font-light leading-relaxed mb-8 max-w-sm mx-auto">
                  Vaša požiadavka bola úspešne zaevidovaná pod číslom <strong className="text-white font-mono">#EG-{Math.floor(1000 + Math.random() * 9000)}</strong>. Platobné a doručovacie údaje sme vám odoslali na e-mail <span className="text-white font-medium">{email}</span>.
                </p>

                {/* Simulated Virtual Receipt */}
                <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6 text-left space-y-4 mb-8">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Typ poukážky:</span>
                    <span className="text-white uppercase font-bold tracking-widest">{theme} Edition</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Doručenie:</span>
                    <span className="text-white font-medium">{delivery === "digital" ? "E-mail (Digital PDF)" : "Luxusná Tlačená verzia"}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Meno obdarovaného:</span>
                    <span className="text-white font-medium font-sans uppercase tracking-wider">{recipient || "Meno"}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-white/5 pt-4">
                    <span className="text-zinc-400 text-sm font-bold">Celková hodnota:</span>
                    <span className={`text-xl font-serif font-bold ${themeStyles[theme].accent}`}>{finalPrice} €</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setRecipient("");
                      setSender("");
                      setMessage("");
                      setEmail("");
                      setCustomValue("");
                      setValue("50");
                    }}
                    className="btn-gold px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Nová poukážka
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div key="form">
              {/* Header */}
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
                <span className="text-gold-500 uppercase tracking-[0.4em] text-[10px] font-black mb-3 block">
                  Exkluzívny darček pre vašich blízkych
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
                  Darčekové <span className="text-gold-500 font-light italic">poukážky</span>
                </h1>
                <p className="text-zinc-300 text-sm font-light leading-relaxed">
                  Darujte nezabudnuteľný tanečný zážitok, lekcie spoločenských tancov, tréningy alebo exkluzívne workshopy v tanečnom štúdiu Ellegance.
                </p>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mt-6"></div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Left: Dynamic 3D Voucher Preview & Theme Picker */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-5 space-y-8 lg:sticky lg:top-24"
                >
                  <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest font-bold pl-1">
                    <Eye className="w-3.5 h-3.5 text-gold-500" />
                    <span>Živý náhľad poukážky (3D)</span>
                  </div>

                  {/* 3D Interactive Card Container */}
                  <div className="perspective-1000">
                    <motion.div
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                        transition: "transform 0.1s ease-out"
                      }}
                      className={`relative aspect-[1.58/1] w-full rounded-[2.25rem] border ${themeStyles[theme].border} bg-gradient-to-br ${themeStyles[theme].gradient} p-8 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] group select-none`}
                    >
                      {/* Dynamic light gradient shimmers */}
                      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] ${themeStyles[theme].glow} pointer-events-none transition-all duration-500`}></div>
                      
                      {/* Elegant fine lines background overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-40"></div>

                      {/* Card Header */}
                      <div className="flex justify-between items-start relative z-10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${themeStyles[theme].accentBg}`}></span>
                            <span className="text-white/40 text-[8px] uppercase tracking-[0.3em] font-black">
                              ELLEGANCE EXPERIENCE
                            </span>
                          </div>
                          <p className="text-[7px] text-zinc-500 tracking-widest font-mono">S.N. EG-2026-{(finalPrice * 17).toString(16).toUpperCase()}</p>
                        </div>

                        {/* Value display */}
                        <div className="text-right">
                          <motion.span 
                            key={activeValue}
                            initial={{ scale: 0.9, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight block"
                          >
                            {activeValue} <span className={`text-base font-sans font-bold uppercase tracking-wider ${themeStyles[theme].accent}`}>€</span>
                          </motion.span>
                        </div>
                      </div>

                      {/* Card Center: Dedicated text */}
                      <div className="relative z-10 py-4">
                        <div className="space-y-1">
                          <span className="text-zinc-500 text-[7px] uppercase tracking-widest block font-medium">Pre:</span>
                          <span className="text-white text-xs font-serif font-semibold tracking-wider block font-sans uppercase line-clamp-1 h-4">
                            {recipient || "MENO OBDAROVANÉHO"}
                          </span>
                        </div>
                        {sender && (
                          <div className="space-y-0.5 mt-2 transition-all">
                            <span className="text-zinc-500 text-[7px] uppercase tracking-widest block font-medium">Od:</span>
                            <span className="text-white/80 text-[10px] tracking-wider block font-sans line-clamp-1 h-3.5 uppercase">
                              {sender}
                            </span>
                          </div>
                        )}
                        {message && (
                          <div className="mt-3 border-t border-white/5 pt-2 transition-all">
                            <p className="text-zinc-400 text-[9px] italic font-light leading-relaxed line-clamp-2 h-7">
                              „{message}“
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="flex justify-between items-end border-t border-white/5 pt-4 relative z-10">
                        <div>
                          <h4 className="text-white text-[10px] uppercase tracking-[0.25em] font-bold font-serif">Tanečné štúdio Ellegance</h4>
                          <span className="text-zinc-500 text-[6.5px] uppercase tracking-widest block font-medium mt-0.5">Platí na všetky služby & kurzy • ellegance.sk</span>
                        </div>
                        {/* Delivery type badge */}
                        <span className={`text-[6.5px] uppercase tracking-[0.2em] font-black px-2 py-0.5 rounded-full border shrink-0 ${themeStyles[theme].badge}`}>
                          {delivery === "digital" ? "Digital PDF" : "Gold Premium Paper"}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Design theme selector */}
                  <div className="space-y-3 pl-1">
                    <label className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-black block">
                      Zvoľte luxusný motív poukážky
                    </label>
                    <div className="flex gap-4">
                      {/* Theme 1: Midnight */}
                      <button
                        type="button"
                        onClick={() => setTheme("midnight")}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                          theme === "midnight" 
                            ? "bg-white/[0.03] border-gold-500/50 text-white shadow-[0_4px_15px_rgba(212,175,55,0.06)]" 
                            : "bg-white/[0.01] border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300"
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 border border-gold-300/30"></span>
                        Temné Zlato
                      </button>

                      {/* Theme 2: Champagne */}
                      <button
                        type="button"
                        onClick={() => setTheme("champagne")}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                          theme === "champagne" 
                            ? "bg-white/[0.03] border-amber-500/50 text-white shadow-[0_4px_15px_rgba(245,158,11,0.06)]" 
                            : "bg-white/[0.01] border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300"
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-200 to-yellow-600 border border-amber-300/30"></span>
                        Šampanské
                      </button>

                      {/* Theme 3: Rose Gold */}
                      <button
                        type="button"
                        onClick={() => setTheme("rosegold")}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                          theme === "rosegold" 
                            ? "bg-white/[0.03] border-rose-500/50 text-white shadow-[0_4px_15px_rgba(244,63,94,0.06)]" 
                            : "bg-white/[0.01] border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300"
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-rose-300 to-rose-600 border border-rose-300/30"></span>
                        Ružové Zlato
                      </button>
                    </div>
                  </div>

                  {/* Delivery specifications */}
                  <div className="grid grid-cols-2 gap-4 pt-4 pl-1 text-left">
                    <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] space-y-1.5">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Digitálna PDF</span>
                      </div>
                      <p className="text-zinc-500 text-[10px] font-light leading-relaxed">Doručenie obratom po prijatí platby priamo na váš e-mail. Ideálne ako darček na poslednú chvíľu.</p>
                    </div>

                    <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] space-y-1.5">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Printer className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Tlačená Verzia (+5€)</span>
                      </div>
                      <p className="text-zinc-500 text-[10px] font-light leading-relaxed">Luxusný metalický papier s vysokou gramážou v štýlovom darčekovom balení (osobný odber / pošta).</p>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Sharp Precise Customizer Form */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-7 bg-obsidian-950/40 border border-white/10 p-8 sm:p-12 rounded-[2.5rem] backdrop-blur-md relative text-left"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl pointer-events-none"></div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Section 1: Choose amount */}
                    <div className="space-y-4">
                      <label className="text-zinc-500 text-[9px] uppercase tracking-[0.4em] font-black flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span> 01. Zvoľte hodnotu poukazu
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {["20", "50", "100", "Custom"].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setValue(v)}
                            className={`py-3 rounded-xl border text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                              value === v 
                                ? "border-gold-500/50 bg-gold-500/10 text-white shadow-[0_0_15px_rgba(212,175,55,0.08)]" 
                                : "border-white/5 bg-white/[0.01] text-zinc-400 hover:border-white/10 hover:text-zinc-200"
                            }`}
                          >
                            {v === "Custom" ? "Vlastná" : `${v} €`}
                          </button>
                        ))}
                      </div>

                      {/* Smooth slider or input for custom value */}
                      <AnimatePresence>
                        {value === "Custom" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pt-2"
                          >
                            <div className="flex gap-4 items-center bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                              <span className="text-zinc-400 text-xs font-bold shrink-0">Zadajte sumu (€):</span>
                              <input
                                type="number"
                                min="10"
                                max="1000"
                                required={value === "Custom"}
                                value={customValue}
                                onChange={(e) => setCustomValue(e.target.value)}
                                placeholder="napr. 75"
                                className="flex-1 bg-transparent text-white font-serif font-bold text-lg focus:outline-none border-b border-white/15 focus:border-gold-500/50 pb-1"
                              />
                            </div>
                            <span className="text-[10px] text-zinc-500 mt-1 block pl-2 font-light">Suma musí byť v rozmedzí od 10 € do 1000 €.</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Section 2: Delivery choice */}
                    <div className="space-y-4">
                      <label className="text-zinc-500 text-[9px] uppercase tracking-[0.4em] font-black flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span> 02. Spôsob doručenia
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setDelivery("digital")}
                          className={`py-4 px-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all duration-300 ${
                            delivery === "digital" 
                              ? "border-gold-500/50 bg-gold-500/10 text-white" 
                              : "border-white/5 bg-white/[0.01] text-zinc-400 hover:border-white/10"
                          }`}
                        >
                          <Mail className="w-5 h-5 shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Digitálny (E-mail)</span>
                          <span className="text-[9px] text-zinc-500 font-light">Zadarmo • PDF doručené ihneď</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDelivery("physical")}
                          className={`py-4 px-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all duration-300 ${
                            delivery === "physical" 
                              ? "border-gold-500/50 bg-gold-500/10 text-white" 
                              : "border-white/5 bg-white/[0.01] text-zinc-400 hover:border-white/10"
                          }`}
                        >
                          <Printer className="w-5 h-5 shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Luxusná Tlačená (+5€)</span>
                          <span className="text-[9px] text-zinc-500 font-light">Darčekový kartón a balenie</span>
                        </button>
                      </div>
                    </div>

                    {/* Section 3: Personalization & Info */}
                    <div className="space-y-5">
                      <label className="text-zinc-500 text-[9px] uppercase tracking-[0.4em] font-black flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span> 03. Venovanie a osobné údaje
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Meno obdarovaného *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Pre koho je darček" 
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder:text-zinc-600 font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Vaše meno (Darca) *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Od koho je darček" 
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder:text-zinc-600 font-medium"
                          />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Váš kontaktný e-mail *</label>
                          <input 
                            type="email" 
                            required
                            placeholder="Pre odoslanie inštrukcií a faktúry" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder:text-zinc-600 font-medium"
                          />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Osobné venovanie (nepovinné)</label>
                            <span className="text-[9px] text-zinc-600 font-mono">{message.length}/120 znakov</span>
                          </div>
                          <textarea 
                            placeholder="Napr. Veľa radosti z tanca a krásnych zážitkov na tanečnom parkete!" 
                            rows={2}
                            maxLength={120}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder:text-zinc-600 font-light resize-none leading-relaxed"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Summary price and submission */}
                    <div className="pt-6 border-t border-white/5 mt-4 space-y-4">
                      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:px-6">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs">
                          <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                          <span>Doručenie do 24 hodín (digitálne hneď)</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Konečná cena</span>
                          <span className="text-2xl font-serif font-bold text-white">{finalPrice} €</span>
                        </div>
                      </div>

                      {/* Form-level error message */}
                      {formError && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-2.5 p-3 rounded-xl border border-red-500/30 bg-red-500/[0.05] text-red-400 text-[10px] leading-relaxed"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{formError}</span>
                        </motion.div>
                      )}

                      <button 
                        type="submit"
                        disabled={isSending}
                        className="btn-gold w-full py-4 text-obsidian-900 font-black uppercase tracking-[0.25em] text-[10px] rounded-full overflow-hidden transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 disabled:opacity-55 disabled:cursor-not-allowed"
                      >
                        {isSending ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin"></div>
                            Odosielam...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-3.5 h-3.5 shrink-0" /> Potvrdiť objednávku poukážky
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
