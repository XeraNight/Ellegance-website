"use client";

import { useEffect } from "react";
import FuzzyText from "@/components/FuzzyText";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-[#d4af37] font-sans p-6 text-center">
      <div className="mb-8">
        <FuzzyText 
          baseIntensity={0.26}
          hoverIntensity={0.5}
          enableHover
          fontSize="clamp(3rem, 10vw, 8rem)"
        >
          ERROR
        </FuzzyText>
      </div>
      
      <h2 className="mt-4 text-2xl font-light tracking-widest uppercase text-white">
        Vyskytla sa neočakávaná chyba
      </h2>
      
      <p className="mt-4 text-gray-400 font-light max-w-md mx-auto mb-10 break-words">
        {error.message || "Niečo sa pokazilo počas načítavania stránky."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={() => reset()}
          className="px-8 py-3 rounded-full bg-[#d4af37] text-[#050505] hover:bg-white transition-all duration-300 font-bold uppercase tracking-widest text-sm"
        >
          Skúsiť znova
        </button>
        
        <a 
          href="/" 
          className="px-8 py-3 rounded-full border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-300 font-bold uppercase tracking-widest text-sm"
        >
          Domov
        </a>
      </div>
    </div>
  );
}
