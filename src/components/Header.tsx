"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAssetPath } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import VariableProximity from "./animations/VariableProximity";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Domov" },
  { href: "/sutazny-tanec", label: "Súťažný tanec" },
  { href: "/ponuka", label: "Ponuka" },
  { href: "/rozpis-hodin", label: "Rozpis hodín" },
  { href: "/komercna-ponuka", label: "Komerčná ponuka" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef(null);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed w-full z-[100] bg-obsidian-900/40 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-3 md:py-4 flex justify-between items-center">
          {/* Logo Left */}
          <Link href="/" className="transition-transform hover:scale-105 shrink-0 z-[101]">
            <img 
              src={getAssetPath("/images/ellegance_logo_text.png")} 
              alt="Ellegance" 
              className="h-9 md:h-11 w-auto drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]"
            />
          </Link>
          
          {/* Links + Button Right */}
          <div className="flex items-center space-x-6 xl:space-x-10">
            <div ref={containerRef} className="hidden xl:flex space-x-5 xl:space-x-7 text-[15px] font-bold tracking-[0.05em] uppercase items-center">
              {NAV_LINKS.map((link) => {
                const normalize = (p: string) => p.replace(/\/$/, "") || "/";
                const isActive = normalize(pathname) === normalize(link.href);
                
                return (
                  <Link 
                    key={link.label}
                    href={link.href} 
                    className={cn(
                      "nav-link transition-colors duration-300 py-1",
                      isActive ? "text-gold-500 active" : "text-gray-400 hover:text-white"
                    )}
                  >
                    <VariableProximity
                      label={link.label}
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 800, 'opsz' 40"
                      containerRef={containerRef}
                      radius={80}
                      falloff="linear"
                      className="pointer-events-none whitespace-nowrap"
                    />
                  </Link>
                );
              })}
            </div>

            <Link 
              href="/kontakt" 
              className="hidden xl:flex btn-gold px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              Kontaktujte nás
            </Link>

            {/* Hamburger Button */}
            <label className="hamburger z-[101] xl:hidden">
              <input 
                type="checkbox" 
                checked={isMenuOpen} 
                onChange={(e) => setIsMenuOpen(e.target.checked)} 
              />
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-obsidian-900 flex items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {NAV_LINKS.map((link, i) => {
                const normalize = (p: string) => p.replace(/\/$/, "") || "/";
                const isActive = normalize(pathname) === normalize(link.href);

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      className={cn(
                        "text-4xl md:text-6xl font-serif font-bold uppercase tracking-tighter transition-colors",
                        isActive ? "text-gold-500" : "text-white hover:text-gold-500"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
              >
                <Link 
                  href="/kontakt"
                  className="text-gold-500 text-sm font-black uppercase tracking-[0.3em] mt-12 block"
                >
                  Kontaktujte nás
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
