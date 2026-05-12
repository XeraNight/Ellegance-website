"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAssetPath } from "@/lib/utils";
import { useRef } from "react";
import VariableProximity from "./animations/VariableProximity";

const NAV_LINKS = [
  { href: "/", label: "Domov" },
  { href: "/sutazny-tanec", label: "Súťažný tanec" },
  { href: "/eventy-a-komercna-ponuka", label: "Eventy & Komerčná ponuka" },
  { href: "/ponuka", label: "Kurzy pre verejnosť" },
];

export default function Header() {
  const pathname = usePathname();
  const containerRef = useRef(null);

  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="transition-transform hover:scale-105">
          <img 
            src={getAssetPath("/images/ellegance_logo_text.png")} 
            alt="Ellegance" 
            className="h-10 md:h-12 w-auto drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]"
          />
        </Link>
        <div ref={containerRef} className="hidden md:flex space-x-8 text-sm font-medium tracking-widest uppercase items-center">
          {NAV_LINKS.map((link) => {
            // Normalize paths by removing trailing slashes for comparison
            const normalize = (p: string) => p.replace(/\/$/, "") || "/";
            const isActive = normalize(pathname) === normalize(link.href);
            
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={cn(
                  "nav-link transition-colors duration-300",
                  isActive ? "text-gold-500 active" : "text-gray-300 hover:text-white"
                )}
              >
                <VariableProximity
                  label={link.label}
                  fromFontVariationSettings="'wght' 300, 'opsz' 9"
                  toFontVariationSettings="'wght' 800, 'opsz' 40"
                  containerRef={containerRef}
                  radius={100}
                  falloff="linear"
                  className="pointer-events-none"
                />
              </Link>
            );
          })}
          <Link href="/kontakt" className="btn-gold px-6 py-2.5 rounded-full text-xs text-obsidian-900 font-bold hover:text-obsidian-900 transition-all duration-300">
            Kontaktujte nás
          </Link>
        </div>
      </div>
    </nav>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
