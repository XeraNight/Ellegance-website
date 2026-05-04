import Link from 'next/link';
import FuzzyText from '@/components/FuzzyText';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-[#d4af37] font-sans">
      <FuzzyText 
        baseIntensity={0.26}
        hoverIntensity={0.5}
        enableHover
      >
        404
      </FuzzyText>
      
      <h2 className="mt-8 text-2xl font-light tracking-widest uppercase text-white">
        Stránka sa nenašla
      </h2>
      
      <p className="mt-4 text-gray-400 font-light max-w-md text-center mb-10">
        Je nám ľúto, ale stránka, ktorú hľadáte, neexistuje alebo bola presunutá.
      </p>

      <Link 
        href="/" 
        className="px-8 py-3 rounded-full border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#050505] transition-all duration-300 font-bold uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
      >
        Späť na úvod
      </Link>
    </div>
  );
}
