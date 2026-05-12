"use client";

import React from "react";
import { motion } from "framer-motion";
import HandwritingNote from "./HandwritingNote";

const timeline = [
  {
    time: "Ráno",
    status: "100%",
    label: "Všetci voňaví a plní energie.",
    color: "bg-green-500",
    width: "w-full",
  },
  {
    time: "Poobedie",
    status: "50%",
    label: "Nohy už trochu bolia, ale drží nás káva.",
    color: "bg-yellow-500",
    width: "w-1/2",
    note: "Kávu prosím vnútrožilovo...",
  },
  {
    time: "Večer",
    status: "5%",
    label: "Telo hovorí nie, srdce sa pýta či nejdeme na mekáč.",
    color: "bg-red-500 animate-pulse",
    width: "w-2",
    note: "Mekáč? Mekáč!",
  },
];

export default function EnergyBar() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
        <div className="min-w-[200px]">
          <h4 className="font-serif text-xl font-bold mb-1">Os únavy</h4>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Dni v Ellegance</p>
        </div>
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {timeline.map((item, i) => (
            <div key={i} className="relative group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold uppercase tracking-widest text-[9px] text-gray-500">{item.time}</span>
                <span className="font-mono text-[9px] text-gray-600">{item.status}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: item.status }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className={`h-full ${item.color}`}
                />
              </div>
              <p className="mt-2 text-[10px] text-gray-400 font-light leading-tight">{item.label}</p>
              
              {item.note && (
                <HandwritingNote 
                  className="absolute -top-6 -right-2 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  rotation={5}
                  delay={0}
                >
                  {item.note}
                </HandwritingNote>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
