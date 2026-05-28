"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getAssetPath } from "@/lib/utils";
import { useRef } from "react";
import { Lock, Gift } from "lucide-react";
import VariableProximity from "./animations/VariableProximity";

const SPONSORS = [
  { name: "KSK", src: "/images/logo-ksk-removebg-preview.png", url: "https://old.vucke.sk/sk" },
  { name: "KE Region", src: "/images/ke-region-removebg-preview.png", url: "https://www.kosiceregion.com/sk" },
  { name: "MK SR", src: "/images/mk-sr-removebg-preview.png", url: "https://www.culture.gov.sk" },
  { name: "SZTS", src: "/images/szts-removebg-preview.png", url: "https://szts.sk" },
  { name: "SPV", src: "/images/spv-removebg-preview.png", url: "https://paraolympic.sk" },
  { name: "Synergy", src: "/images/synergy1.png" },
  { name: "Viktoria Kral", src: "/images/viktoria-kral-removebg-preview.png", url: "https://www.viktoria-kral.net" },
  { name: "Cabo", src: "/images/cabo-removebg-preview.png", url: "https://cabo.sk/sk_sk" },
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
          <defs>
            <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
            </clipPath>
          </defs>
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

          <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 w-full max-w-7xl mx-auto text-left">
            {/* Column 1: Hlavná navigácia */}
            <div className="flex flex-col gap-4">
              <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Navigácia</span>
              <FooterLink href="/ponuka" label="Ponuka" containerRef={containerRef} />
              <FooterLink href="/rozpis-hodin" label="Rozpis hodín" containerRef={containerRef} />
              <FooterLink href="/komercna-ponuka" label="Komerčná ponuka" containerRef={containerRef} />
              <FooterLink href="/sutazny-tanec" label="Súťažný tanec" containerRef={containerRef} />
              <FooterLink href="/kontakt" label="Kontakt" containerRef={containerRef} />
            </div>

            {/* Column 2: O klube a Médiá */}
            <div className="flex flex-col gap-4">
              <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Klub a Médiá</span>
              <FooterLink href="/" label="Domov" containerRef={containerRef} />
              <FooterLink href="/fotogaleria" label="Fotogaléria" containerRef={containerRef} />
              <FooterLink href="/sutaze" label="Súťaže" containerRef={containerRef} />
              <FooterLink href="/press-kit" label="Press kit" containerRef={containerRef} />
            </div>

            {/* Column 3: Pre tanečníkov a rodičov */}
            <div className="flex flex-col gap-4">
              <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Pre tanečníkov</span>
              <FooterLink href="/rodicovska-zona" label="Zóna pre rodičov" containerRef={containerRef} />
              <FooterLink href="/vybava" label="Tanečná výbava" containerRef={containerRef} />
              <FooterLink href="/pravidla" label="Oficiálne pravidlá SZTŠ" containerRef={containerRef} />
              
              <div className="mt-4 flex flex-col gap-5">
                <span className="text-white/30 uppercase tracking-[0.2em] text-[9px] font-medium">Sledujte nás</span>
                
                <div className="relative flex items-center gap-x-3">
                  {/* Instagram */}
                  <a href="https://www.instagram.com/ellegance_danceclub/" target="_blank" rel="noopener noreferrer" className="group relative">
                    <div
                      className="w-11 h-11 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(253,29,29,0.3)] border border-white/10"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5.5 w-5.5 text-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28-.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/></svg>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a href="https://www.facebook.com/ellegance.koce" target="_blank" rel="noopener noreferrer" className="group relative">
                    <div
                      className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] border border-white/10"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5.5 w-5.5 text-white"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.403h2.94v-2.511c0-2.91 1.777-4.493 4.371-4.493 1.242 0 2.311.092 2.622.134v3.04l-1.799.001c-1.412 0-1.685.671-1.685 1.655v2.174h3.363l-.438 3.403h-2.925v8.74h6.028c.733 0 1.325-.592 1.325-1.324v-21.351c0-.732-.592-1.325-1.325-1.325z"/></svg>
                    </div>
                  </a>

                  {/* TikTok */}
                  <a href="https://www.tiktok.com/@ellegance_danceclub" target="_blank" rel="noopener noreferrer" className="group relative">
                    <div
                      className="w-11 h-11 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] border border-white/10"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5.5 w-5.5 text-white"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.03-1.03-2.28-1.39-3.41-4.14-2.85-6.68.48-2.32 2.33-4.12 4.67-4.64.91-.2 1.85-.2 2.76-.03v4.11c-.55-.19-1.15-.24-1.72-.15-1.12.18-2.07.96-2.43 2.03-.43 1.25.1 2.73 1.25 3.45.92.59 2.14.65 3.12.14 1.04-.54 1.68-1.6 1.76-2.76.04-3.56.01-7.12.02-10.68z"/></svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: Podpora klubu */}
            <div className="flex flex-col gap-4">
              <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Podpora a Darčeky</span>
              <FooterLink href="/darcekove-poukazky" label="Darčekové poukážky" containerRef={containerRef} />
              {/* <FooterLink href="/merch" label="Klubový merch" containerRef={containerRef} /> */}
              <Link href="/2-percenta" className="mt-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/40 hover:bg-gold-500/[0.03] transition-all duration-300 block group/card">
                <p className="text-[10px] text-gray-500 group-hover/card:text-gold-500 leading-relaxed uppercase tracking-wider transition-colors">
                  Podporte nás 2% z vašich daní a pomôžte nám vychovávať nové talenty.
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="border-t border-white/5 pt-10 pb-4">
          <div className="text-center mb-6">
            <span className="text-white/60 text-sm font-medium tracking-wide">Partneri</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5">
            {SPONSORS.map((sponsor) => {
              const SponsorContent = (
                <div className="relative w-24 h-12 sm:w-28 sm:h-14 md:w-36 md:h-18 rounded-xl flex items-center justify-center p-2 md:p-3 shadow-lg overflow-hidden transition-all duration-500
                                bg-gradient-to-br from-[#d4af37] via-[#aa8122] to-[#d4af37]
                                border border-white/20">
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000"></div>
                  <img 
                    src={getAssetPath(sponsor.src)}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain filter brightness-0 opacity-80 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              );

              return (
                <motion.div
                  key={sponsor.name}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gold-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {sponsor.url ? (
                    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" title={`Navštíviť ${sponsor.name}`}>
                      {SponsorContent}
                    </a>
                  ) : SponsorContent}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <span className="text-gray-400 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Ellegance Dance Club. Všetky práva vyhradené.
          </span>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-gray-400 text-[9px] uppercase tracking-[0.2em] hover:text-gold-500 transition-colors">Ochrana osobných údajov</Link>
            <button 
              onClick={() => window.dispatchEvent(new Event("openCookieSettings"))} 
              className="text-gray-400 text-[9px] uppercase tracking-[0.2em] hover:text-gold-500 transition-colors focus:outline-none cursor-pointer"
            >
              Nastavenie Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label, containerRef, isExternal, icon }: { href: string; label: string; containerRef: any; isExternal?: boolean; icon?: React.ReactNode }) {
  const Component = isExternal ? 'a' : Link;
  const props = isExternal ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

  return (
    <Component {...props as any} className="group/link flex items-center gap-2 text-white/50 hover:text-gold-400 text-sm font-light tracking-wide transition-all block py-0.5">
      {icon && <span className="text-gold-500/50 group-hover/link:text-gold-500 transition-colors">{icon}</span>}
      <VariableProximity
        label={label}
        fromFontVariationSettings="'wght' 300, 'opsz' 9"
        toFontVariationSettings="'wght' 600, 'opsz' 40"
        containerRef={containerRef}
        radius={80}
        falloff="linear"
      />
    </Component>
  );
}
