import Link from "next/link";
import RotatingText from "@/components/RotatingText";
import { getAssetPath } from "@/lib/utils";

const ROTATING_WORDS = ['tanečníci', 'rodina', 'Ellegance'];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={getAssetPath("/images/main_page_photo.jpg")} 
            alt="Ellegance Ballroom" 
            className="w-full h-full object-cover animate-fade-in" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/40 via-obsidian-900/60 to-obsidian-900"></div>
          <div className="bg-blob blob-1"></div>
          <div className="bg-blob blob-2"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-gold-500 font-sans tracking-[0.2em] font-semibold uppercase text-xs mb-8 animate-fade-in-up opacity-0 shadow-lg" style={{ animationDelay: '0.2s' }}>
            Viac ako len tanečný klub
          </span>
          <div className="flex flex-col items-center justify-center mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="relative inline-block">
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white flex flex-wrap items-center justify-center gap-x-3 md:gap-x-4 tracking-tight relative z-10">
                <span>Sme</span>
                <RotatingText
                  texts={ROTATING_WORDS}
                  mainClassName="text-gold-500 font-script italic px-2"
                />
              </h1>
              <svg className="absolute -bottom-4 left-0 w-full h-4 text-gold-500/40" viewBox="0 0 300 20" preserveAspectRatio="none">
                <path d="M5,15 Q150,5 295,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-draw" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Novinky v Ellegance (Modern News Section) */}
      <section className="py-24 bg-obsidian-900 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]"></div>
        
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/20 to-transparent"></div>
          <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/20 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">Novinky v <span className="text-gold-500 italic font-light">Ellegance</span></h2>
            <div className="w-24 h-1 bg-gold-500/30 mx-auto rounded-full mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            
            {/* News Item 1: Miculescu */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-b from-gold-500/10 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              <div className="relative bg-obsidian-800/30 border border-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px]">
                <div className="h-72 overflow-hidden relative">
                  <img src={getAssetPath("/images/miculesqu.png")} alt="Miculescu Workshop" className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-[1px] bg-gold-500"></div>
                    <span className="text-gold-500 text-[10px] uppercase tracking-widest font-bold">Workshop</span>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4 leading-tight group-hover:text-gold-500 transition-colors">Vzácna návšteva: Miculescu & Păcurar</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                    Mali sme česť privítať legendy tanca. Nezabudnuteľný workshop plný inšpirácie pre našich súťažných tanečníkov.
                  </p>
                  <div className="mt-auto">
                    <button className="text-white text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:text-gold-500 transition-all">
                      Čítať viac <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* News Item 2: Kurz */}
            <div className="group relative md:mt-12">
              <div className="absolute -inset-1 bg-gradient-to-b from-gold-500/20 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              <div className="relative bg-obsidian-800/40 border border-gold-500/20 backdrop-blur-xl rounded-[2rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px]">
                <div className="h-72 overflow-hidden relative">
                  <img src={getAssetPath("/images/kurz spolocenskychtancov.PNG")} alt="Kurz spoločenských tancov" className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-70"></div>
                  <div className="absolute top-6 right-6 bg-gold-500 text-obsidian-900 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Nové termíny</div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-[1px] bg-gold-500"></div>
                    <span className="text-gold-500 text-[10px] uppercase tracking-widest font-bold">Kurzy</span>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4 leading-tight group-hover:text-gold-500 transition-colors">Kurzy spoločenských tancov</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                    Chystáte sa na ples alebo svadbu? Naše nové kurzy v Košiciach štartujú už čoskoro. Objavte radosť z pohybu.
                  </p>
                  <div className="mt-auto">
                    <button className="bg-gold-500 hover:bg-gold-400 text-obsidian-900 px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all shadow-lg shadow-gold-500/20">
                      Prihlásiť sa
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* News Item 3: 2% */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-b from-gold-500/10 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              <div className="relative bg-obsidian-800/30 border border-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px]">
                <div className="h-72 overflow-hidden relative">
                  <img src={getAssetPath("/images/2_ z dane.JPG")} alt="2 percentá z dane" className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-[1px] bg-gold-500"></div>
                    <span className="text-gold-500 text-[10px] uppercase tracking-widest font-bold">Komunita</span>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4 leading-tight group-hover:text-gold-500 transition-colors">Podporte nás: 2% z dane</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                    Pomôžte nám rozvíjať tanečné talenty v Košiciach. Vaša podpora nám umožňuje rásť a vychovávať novú generáciu šampiónov.
                  </p>
                  <div className="mt-auto">
                    <button className="text-white text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:text-gold-500 transition-all">
                      Viac informácií <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
