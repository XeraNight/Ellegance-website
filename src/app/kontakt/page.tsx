"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import LiveLocation from "@/components/LiveLocation";

function KontaktForm() {
  const searchParams = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const kurz = searchParams.get("kurz");
    if (kurz) {
      setSelectedCourse(kurz);
    }
  }, [searchParams]);

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-40 flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Left Column: The "Tanečný Poriadok" Dance Card */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-10 text-center lg:text-left">Smieme prosiť?</h2>
          
          <motion.div
            initial={{ rotate: -2, scale: 0.95 }}
            whileHover={{ rotate: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative bg-[#fdf8f5] p-8 md:p-14 rounded-[1.8rem] shadow-[20px_20px_60px_rgba(0,0,0,0.5),-10px_-10px_30px_rgba(255,255,255,0.02)] overflow-hidden origin-center"
          >
            {/* Paper Texture/Pattern (Subtle) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}></div>
            
            <div className="relative z-10">
              <h1 className="font-serif text-3xl md:text-4xl text-[#2a2624] mb-10 text-center border-b border-[#c4b5a9] pb-6 italic">Tanečný Poriadok</h1>
              
              <form action="#" method="POST" className="flex flex-col gap-8">
                {/* Field 1: Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-nunito text-[9px] uppercase tracking-[0.3em] text-[#8c7e74] font-bold">1. S kým budeme mať tú česť?</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Vaše meno a priezvisko..." 
                    className="w-full bg-transparent border-b-2 border-dotted border-[#c4b5a9] py-2 px-1 text-xl font-handwriting text-[#2a4494] placeholder-[#c4b5a9]/50 focus:border-[#d4af37] focus:outline-none transition-all" 
                    required 
                  />
                </div>

                {/* Field 2: Contact */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact" className="font-nunito text-[9px] uppercase tracking-[0.3em] text-[#8c7e74] font-bold">2. Kam vám pošleme pozvánku?</label>
                  <input 
                    type="text" 
                    id="contact" 
                    name="contact" 
                    placeholder="Váš e-mail alebo telefón..." 
                    className="w-full bg-transparent border-b-2 border-dotted border-[#c4b5a9] py-2 px-1 text-xl font-handwriting text-[#2a4494] placeholder-[#c4b5a9]/50 focus:border-[#d4af37] focus:outline-none transition-all" 
                    required 
                  />
                </div>

                {/* Field 3: Course Selection */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="course" className="font-nunito text-[9px] uppercase tracking-[0.3em] text-[#8c7e74] font-bold">3. Do akého rytmu vás máme vziať?</label>
                  <select 
                    id="course" 
                    name="course" 
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-dotted border-[#c4b5a9] py-2 px-1 text-lg font-handwriting text-[#2a4494] focus:border-[#d4af37] focus:outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled className="font-sans text-sm">Vyberte tanec...</option>
                    <option value="svadba" className="font-sans text-sm">Svadobný tanec (Zachráňte nás!)</option>
                    <option value="latinfit" className="font-sans text-sm">Latin Fit (Len pre mňa)</option>
                    <option value="senior" className="font-sans text-sm">Spoločenské tance pre seniorov</option>
                    <option value="ine" className="font-sans text-sm">Mám iné prianie...</option>
                  </select>
                </div>

                {/* Submit Button - Now using btn-gold style */}
                <div className="mt-4 flex justify-center lg:justify-start">
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="btn-gold py-4 px-12 rounded-full font-serif text-lg italic tracking-wider shadow-xl"
                  >
                    Požiadať o tanec
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Info & Exact Contacts */}
        <div className="w-full lg:w-[45%] flex flex-col gap-10 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          
          <div className="bg-black p-8 rounded-3xl border border-gold-500/30 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
            <h3 className="font-serif text-2xl text-white mb-8 border-b border-gold-500/10 pb-4">Spojte sa s nami</h3>
            
            <div className="flex flex-col gap-8 font-sans">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gold-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Adresa klubu</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">Tanečný klub Ellegance<br />Fejova 1, 040 01 Košice</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gold-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Telefónne kontakty</h4>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-400 flex justify-between gap-4"><span>Verejnosť:</span> <span className="text-gold-400 font-mono">0902 529 395</span></p>
                    <p className="text-sm text-gray-400 flex justify-between gap-4"><span>Súťažný tanec:</span> <span className="text-gold-400 font-mono">0915 949 727</span></p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-gold-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">E-mail</h4>
                  <p className="text-sm text-gray-400 font-light">info@ellegance.sk</p>
                </div>
              </div>
            </div>
            
            {/* Live Location Widget */}
            <div className="mt-10 pt-6 border-t border-gold-500/10 flex items-center justify-between">
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-gray-600 font-bold">Kde nás nájdete</span>
              <LiveLocation />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function KontaktPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black text-gold-500">
        Načítavam...
      </div>
    }>
      <KontaktForm />
    </Suspense>
  );
}
