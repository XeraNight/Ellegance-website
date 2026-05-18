"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Calendar, MapPin, Users, Star, Clock, 
  Package, Utensils, Tag, Phone, Download,
  Bell
} from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  date: string;
  location: string;
  venue: string;
  categories: string;
  trainers: { name: string; image: string }[];
  agenda: { time: string; activity: string }[];
  whatToBring: string;
  food: string;
  price: string;
  contact: { email: string; phone: string };
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: NewsItem | null;
}

export default function NewsModal({ isOpen, onClose, data }: NewsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-xl bg-white md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-full md:h-auto md:max-h-[90vh]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-xl"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto scrollbar-hide flex-1 bg-white">
              {/* HERO SECTION */}
              <div className="relative h-[450px] md:h-[500px] flex items-end">
                <img src={getAssetPath(data.image)} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="relative z-10 p-8 md:p-10 w-full">
                  <span className="inline-block px-4 py-1.5 bg-gold-500/20 backdrop-blur-md border border-gold-500/30 text-gold-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                    {data.badge}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-[0.9] mb-4 uppercase tracking-tighter">
                    {data.title}
                  </h2>
                  <p className="text-gold-500 font-serif italic text-lg mb-6">
                    {data.subtitle}
                  </p>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 text-[11px] font-bold uppercase tracking-widest text-white/70">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold-500" /> {data.date}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold-500" /> {data.location}</div>
                  </div>

                  <button className="w-full mt-6 py-5 bg-gold-500 text-obsidian-900 font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                    Prihlásiť sa
                  </button>
                </div>
              </div>

              {/* CONTENT SECTION (White Card Overlay effect) */}
              <div className="relative -mt-12 bg-white px-8 md:px-10 py-12 space-y-12">
                {/* Original Footer Wavy Divider */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] pointer-events-none">
                  <svg 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[100px]"
                  >
                    <path 
                      d="M0,0V120H1200V0C1100,80,950,110,800,100C600,85,500,20,350,15C200,10,100,60,0,0Z" 
                      fill="white"
                    ></path>
                    <path 
                      d="M0,0C100,60,200,10,350,15C500,20,600,85,800,100C950,110,1100,80,1200,0" 
                      fill="none" 
                      stroke="#D4AF37" 
                      strokeWidth="4"
                      className="drop-shadow-[0_0_10px_rgba(212,175,55,0.9)]"
                    ></path>
                  </svg>
                </div>
                
                {/* Info Rows */}
                <div className="space-y-10">
                  <InfoRow icon={MapPin} label="Miesto konania" content={data.venue} />
                  <InfoRow icon={Users} label="Kategórie" content={data.categories} />
                  
                  {/* Trainers with avatars */}
                  <div className="flex gap-5">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
                      <Star className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-4">Tréneri</span>
                      <div className="flex flex-wrap gap-5">
                        {data.trainers.map((t, i) => (
                          <div key={i} className="text-center group">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold-500/20 mb-2 group-hover:border-gold-500 transition-colors">
                              <img src={getAssetPath(t.image)} alt={t.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-bold">{t.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Agenda List */}
                  <InfoRow icon={Clock} label="Agenda" content={
                    <div className="space-y-3 mt-4">
                      <p className="text-xs text-gray-400 mb-4 font-light">Denne 6 vyučovacích hodín tanca</p>
                      {data.agenda.map((item, i) => (
                        <div key={i} className="flex gap-4 text-xs group">
                          <span className="font-black text-obsidian-900 w-24 tracking-tighter">{item.time}</span>
                          <span className="text-gray-500 font-light group-hover:text-gold-500 transition-colors">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  } />

                  <InfoRow icon={Package} label="Čo si priniesť" content={data.whatToBring} />
                  <InfoRow icon={Utensils} label="Strava" content={data.food} />
                  <InfoRow icon={Tag} label="Cena" content={data.price} />
                  
                  <InfoRow icon={Phone} label="Kontakt" content={
                    <div className="space-y-1 text-sm font-bold text-obsidian-900 mt-2">
                      <p>{data.contact.email}</p>
                      <p>{data.contact.phone}</p>
                    </div>
                  } />
                </div>

                {/* Footer Action */}
                <div className="space-y-6">
                  <button className="w-full py-5 border-2 border-gold-500/20 text-gold-500 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-gold-500/5 transition-all">
                    <Download className="w-4 h-4" /> Stiahnuť info PDF
                  </button>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gold-500">
                      <Star className="w-4 h-4 fill-gold-500" />
                      <span className="text-[10px] uppercase font-black tracking-widest text-obsidian-900">Sledujte nás</span>
                    </div>
                    <div className="flex gap-4">
                      <a href="#" className="w-5 h-5 text-gray-400 hover:text-gold-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                      <a href="#" className="w-5 h-5 text-gray-400 hover:text-gold-500 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button onClick={onClose} className="text-gray-300 hover:text-gold-500 text-[10px] font-black uppercase tracking-widest transition-colors">
                    Zatvoriť detaily
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ icon: Icon, label, content }: { icon: any, label: string, content: any }) {
  return (
    <div className="flex gap-5 group">
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500 border border-gold-500/20 group-hover:bg-gold-500 group-hover:text-obsidian-900 transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 pt-1">
        <span className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-1">{label}</span>
        <div className="text-sm text-gray-600 leading-relaxed font-light">{content}</div>
        <div className="h-px w-full bg-gray-100 mt-6" />
      </div>
    </div>
  );
}
