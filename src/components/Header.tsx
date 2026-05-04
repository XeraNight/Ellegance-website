import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

export default function Header() {
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
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-widest uppercase text-gray-300 items-center">
          <Link href="/" className="nav-link hover:text-white">Domov</Link>
          <Link href="/sutazny-tanec" className="nav-link hover:text-white">Súťažný tanec</Link>
          <Link href="/eventy" className="nav-link hover:text-white">Eventy & Plesy</Link>
          <Link href="/ponuka" className="nav-link hover:text-white">Kurzy pre verejnosť</Link>
          <Link href="/kontakt" className="btn-gold px-6 py-2.5 rounded-full text-xs text-obsidian-900 font-bold hover:text-obsidian-900">Kontaktujte nás</Link>
        </div>
      </div>
    </nav>
  );
}
