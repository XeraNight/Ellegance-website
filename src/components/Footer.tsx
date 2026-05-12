"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getAssetPath } from "@/lib/utils";
import { useRef } from "react";
import VariableProximity from "./animations/VariableProximity";

const SPONSORS = [
  { name: "KSK", src: "/images/logo-ksk-removebg-preview.png" },
  { name: "KE Region", src: "/images/ke-region-removebg-preview.png" },
  { name: "MK SR", src: "/images/mk-sr-removebg-preview.png" },
  { name: "SZTS", src: "/images/szts-removebg-preview.png" },
  { name: "SPV", src: "/images/spv-removebg-preview.png" },
  { name: "Synergy", src: "/images/synergy1.png" },
  { name: "Viktoria Kral", src: "/images/viktoria-kral-removebg-preview.png" },
  { name: "Cabo", src: "/images/cabo-removebg-preview.png" },
];

export default function Footer() {
  const containerRef = useRef(null);

  return (
    <footer className="relative bg-[#020202] mt-24">
      {/* ... Divider ... */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[99%]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]"
        >
          <path 
            d="M0,0V120H1200V0C1100,80,950,110,800,100C600,85,500,20,350,15C200,10,100,60,0,0Z" 
            fill="#020202"
          ></path>
          <path 
            d="M0,0C100,60,200,10,350,15C500,20,600,85,800,100C950,110,1100,80,1200,0" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="3"
            className="drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-12 relative z-10">
        {/* Top Section: Logo and Links */}
        <div className="flex flex-col items-center mb-10 text-center">
          <Link href="/" className="mb-8 transition-transform hover:scale-105 inline-block">
            <img 
              src={getAssetPath("/images/ellegance_logo_text.png")} 
              alt="Ellegance" 
              className="h-12 md:h-14 w-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            />
          </Link>

          <div ref={containerRef} className="grid grid-cols-2 gap-16 md:gap-32">
            <div className="flex flex-col gap-3">
              <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-1">Stránky</span>
              <FooterLink href="/" label="Domov" containerRef={containerRef} />
              <FooterLink href="/o-nas" label="O nás" containerRef={containerRef} />
              <FooterLink href="/ponuka" label="Ponuka" containerRef={containerRef} />
              <FooterLink href="/kontakt" label="Kontakt" containerRef={containerRef} />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-1">Sledujte nás</span>
              <FooterLink href="https://www.instagram.com/ellegance_danceclub/" label="Instagram" containerRef={containerRef} isExternal />
              <FooterLink href="https://www.facebook.com/ellegance.koce" label="Facebook" containerRef={containerRef} isExternal />
              <FooterLink href="https://www.tiktok.com/@ellegance_danceclub" label="TikTok" containerRef={containerRef} isExternal />
              <FooterLink href="https://www.youtube.com/@ellegance_danceclub" label="YouTube" containerRef={containerRef} isExternal />
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="border-t border-white/5 pt-10 pb-4">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5">
            {SPONSORS.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gold-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-32 h-16 md:w-36 md:h-18 rounded-xl flex items-center justify-center p-3 shadow-lg overflow-hidden transition-all duration-500
                                bg-gradient-to-br from-[#d4af37] via-[#aa8122] to-[#d4af37]
                                border border-white/20">
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000"></div>
                  <img 
                    src={getAssetPath(sponsor.src)}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain filter brightness-0 opacity-80 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <span className="text-gray-600 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Ellegance Dance Club. Všetky práva vyhradené.
          </span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-600 text-[10px] uppercase tracking-widest hover:text-gold-500 transition-colors">Súkromie</Link>
            <Link href="/terms" className="text-gray-600 text-[10px] uppercase tracking-widest hover:text-gold-500 transition-colors">Podmienky</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label, containerRef, isExternal }: { href: string; label: string; containerRef: any; isExternal?: boolean }) {
  const Component = isExternal ? 'a' : Link;
  const props = isExternal ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

  return (
    <Component {...props as any} className="text-white/60 hover:text-white text-sm font-light tracking-wide transition-all block">
      <VariableProximity
        label={label}
        fromFontVariationSettings="'wght' 300, 'opsz' 9"
        toFontVariationSettings="'wght' 800, 'opsz' 40"
        containerRef={containerRef}
        radius={100}
        falloff="linear"
      />
    </Component>
  );
}
