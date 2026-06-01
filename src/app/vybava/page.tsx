"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "@/lib/utils";
import { 
  Check, 
  Tag, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface EquipmentItem {
  id: string;
  title: string;
  category: "practice" | "competition" | "care";
  categoryLabel: string;
  importance: "Povinné" | "Odporúčané" | "Užitočné";
  priceRange: string;
  brandRecommendation: string;
  description: string;
  whyNeeded: string;
  imagePlaceholder: string;
  imageUrl: string;
  specs: string[];
}

const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: "eq-1",
    title: "Dievčenská súťažná obuv (Deti/Juniori)",
    category: "competition",
    categoryLabel: "Súťažná obuv",
    importance: "Povinné",
    priceRange: "55 € - 95 €",
    brandRecommendation: "Supadance 1025 / International Dance Shoes",
    description: "Špeciálna tanečná obuv so semišovou podrážkou. Pre kategóriu Deti je prísne predpísaný široký kockový podpätok (block heel) s maximálnou výškou 3.5 cm.",
    whyNeeded: "Zaisťuje správny sklz a stabilitu na parkete. Semišová podrážka zabraňuje nekontrolovanému pošmyknutiu, zatiaľ čo predpísaný podpätok chráni rastúcu detskú nohu.",
    imagePlaceholder: "👠",
    imageUrl: "/images/bazaar_dance_shoes.png",
    specs: ["Hrubý kockový podpätok (block heel) do 3.5 cm", "Svetlá saténová alebo telová farba", "Semišová kožená podrážka"]
  },
  {
    id: "eq-2",
    title: "Chlapčenská súťažná obuv (Deti/Juniori)",
    category: "competition",
    categoryLabel: "Súťažná obuv",
    importance: "Povinné",
    priceRange: "50 € - 85 €",
    brandRecommendation: "Supadance / International / Kozdra",
    description: "Čierne kožené alebo lakované tanečné topánky s nízkym podpätkom (cca 2 - 2.5 cm) určené pre chlapčenské kategórie.",
    whyNeeded: "Poskytujú optimálnu oporu päty a umožňujú presné vedenie chodidla po parkete. Semišová podrážka je kľúčom k bezpečným rotáciám.",
    imagePlaceholder: "👞",
    imageUrl: "/images/bazaar_dance_shoes.png",
    specs: ["Nízky chlapčenský podpätok do 2.5 cm", "Čierna matná koža (lakovaná len pre juniorov)", "Šnurovanie a semišový grip"]
  },
  {
    id: "eq-3",
    title: "Oceľová kefa na semišové podrážky",
    category: "care",
    categoryLabel: "Starostlivosť o obuv",
    importance: "Povinné",
    priceRange: "8 € - 12 €",
    brandRecommendation: "Supadance / Werner Kern",
    description: "Špeciálna kefa s oceľovými drôtmi na čistenie a vyčesávanie nánosov špiny, vosku a prachu zo semišovej podrážky tanečných topánok.",
    whyNeeded: "Bez tejto kefy sa semišová podrážka rýchlo zanesie, vyleští na hladko a začne sa extrémne šmýkať. Pravidelné kefovanie pred každým vstupom na parket obnovuje grip.",
    imagePlaceholder: "🧹",
    imageUrl: "/images/dance_shoe_brush.png",
    specs: ["Oceľové drôtené štetiny", "Drevená alebo plastová ergonomická rúčka", "Kožený ochranný kryt na štetiny"]
  },
  {
    id: "eq-4",
    title: "Silikónové chrániče na podpätky",
    category: "care",
    categoryLabel: "Ochrana obuvi",
    importance: "Odporúčané",
    priceRange: "3 € - 6 € / pár",
    brandRecommendation: "International / IDS",
    description: "Priehľadné silikónové chrániče, ktoré sa tesne nasadzujú na podpätky dievčenských tanečných topánok.",
    whyNeeded: "Chránia samotný podpätok a opätok pred rýchlym zodratím. Na väčšine oficiálnych súťaží sú povinné, pretože chránia drevené parkety športových hál pred poškriabaním.",
    imagePlaceholder: "🛡️",
    imageUrl: "/images/heel_protectors.png",
    specs: ["Vysoko odolný číry silikón", "Tvar presne zladený s typom podpätku", "Zvyšuje stabilitu a tlmí nárazy"]
  },
  {
    id: "eq-5",
    title: "Detské dievčenské súťažné šaty",
    category: "competition",
    categoryLabel: "Súťažné oblečenie",
    importance: "Povinné",
    priceRange: "70 € - 150 €",
    brandRecommendation: "Šitie na mieru v tanečnom salóne",
    description: "Jednofarebné súťažné šaty pre dievčatá v detských kategóriách (Deti I a II) spĺňajúce strihové a materiálové pravidlá SZTŠ.",
    whyNeeded: "Pravidlá pre deti sú mimoriadne prísne. Šaty nesmú mať žiadne kamienky, lesklú čipku ani sieťovinu. Odporúčame šitie na mieru, aby šaty spĺňali dĺžku tesne pod koleno.",
    imagePlaceholder: "👗",
    imageUrl: "/images/bazaar_magenta_dress.png",
    specs: ["Výhradne jednofarebné bez ozdôb", "Dĺžka sukne po stred/spodok kolien", "Povolená lycra, zamat, satén a krep"]
  },
  {
    id: "eq-6",
    title: "Chlapčenské súťažné body (košeľa)",
    category: "competition",
    categoryLabel: "Súťažné oblečenie",
    importance: "Povinné",
    priceRange: "35 € - 60 €",
    brandRecommendation: "Grand Prix / DSI London",
    description: "Biela hladká košeľa alebo elastické body s dlhým rukávom pre mladých tanečníkov.",
    whyNeeded: "Body zaručuje, že košeľa sa pri pohybe rúk a rotáciách nevyťahuje z nohavíc a chlapec vyzerá na parkete vždy dokonale upravene a štýlovo.",
    imagePlaceholder: "👔",
    imageUrl: "/images/bazaar_white_shirt.png",
    specs: ["Zapínanie v rozkroku (body)", "Biela elastická bavlna alebo lycra", "Matný povrch (satén je zakázaný)"]
  },
  {
    id: "eq-7",
    title: "Tréningové oblečenie (Legíny & Sukne)",
    category: "practice",
    categoryLabel: "Tréningové oblečenie",
    importance: "Odporúčané",
    priceRange: "20 € - 45 €",
    brandRecommendation: "Decathlon / Tanečné značky",
    description: "Pohodlné, elastické čierne oblečenie určené na každodenné lekcie a klubové tréningy.",
    whyNeeded: "Správny strih tréningového oblečenia umožňuje trénerovi dobre vidieť prácu kolien a členkov. Dievčatá potrebujú ľahkú širšiu sukňu na precvičenie rotácií a chlapci klasické legíny alebo voľné nohavice.",
    imagePlaceholder: "🖤",
    imageUrl: "/images/children_dance_outfit.png",
    specs: ["Elastický, priedušný rýchloschnúci materiál", "Čierna neutrálna farba", "Strih nebrániaci plnému rozsahu pohybu"]
  },
  {
    id: "eq-8",
    title: "Priedušný obal na šaty a obleky",
    category: "care",
    categoryLabel: "Prenášanie výbavy",
    importance: "Užitočné",
    priceRange: "15 € - 25 €",
    brandRecommendation: "Klubový obal Ellegance / Samsonite",
    description: "Látkový priedušný obal so zipsom a rúčkami určený na bezpečný transport súťažného oblečenia.",
    whyNeeded: "Zabraňuje pokrčeniu luxusných súťažných šiat, chráni ich pred prachom, dažďom a zatrhnutím materiálu počas cestovania v aute alebo autobuse.",
    imagePlaceholder: "💼",
    imageUrl: "/images/garment_bag.png",
    specs: ["Priedušná netkaná textília", "Dĺžka minimálne 100 - 120 cm", "Vrecká na uloženie topánok a doplnkov"]
  },
  {
    id: "eq-9",
    title: "Extrémny fixačný gél Got2b Glued",
    category: "care",
    categoryLabel: "Styling vlasov",
    importance: "Odporúčané",
    priceRange: "5 € - 8 €",
    brandRecommendation: "Schwarzkopf Got2b (žltý gél)",
    description: "Vodoodolný gél s extrémnou fixáciou (stupeň 6) pre dokonalé uhladenie vlasov tanečníka.",
    whyNeeded: "Tanečný styling musí prežiť hodiny tancovania, potenia a prudkých otočiek pod silnými reflektormi. Tento gél vytvorí 'cementový' efekt, ktorý udrží každý vlas na svojom mieste.",
    imagePlaceholder: "💈",
    imageUrl: "/images/boys_dance_hair.png",
    specs: ["Extrémna betónová fixácia", "Nezanecháva biele šupiny", "Ľahko umývateľný šampónom"]
  }
];

export default function VybavaPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "practice" | "competition" | "care">("all");
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({
    "topanky": false,
    "saty": false,
    "kefa": false,
    "cislo": false,
    "zicherky": false,
    "lak": false,
    "pančuchy": false,
    "občerstvenie": false
  });

  const filteredItems = activeCategory === "all" 
    ? EQUIPMENT_ITEMS 
    : EQUIPMENT_ITEMS.filter(item => item.category === activeCategory);

  const togglePacked = (id: string) => {
    setPackedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-obsidian-900 relative overflow-hidden selection:bg-gold-500/30 text-left">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-500 uppercase tracking-[0.4em] text-[10px] font-black mb-3 block">
            Profesionálny sprievodca tanečníka
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Tanečná <span className="text-gold-500 font-light italic">výbava</span>
          </h1>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            Odporúčaná a povinná tanečná výbava pre tréningy aj oficiálne súťaže SZTŠ. Uľahčite si nákupy vďaka radám našich trénerov.
          </p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mt-6"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: "all", label: "Všetka výbava" },
            { id: "practice", label: "Na tréningy" },
            { id: "competition", label: "Na súťaže" },
            { id: "care", label: "Starostlivosť & Doplnky" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gold-500 text-obsidian-900 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:scale-105"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Equipment Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col bg-obsidian-950/40 border border-white/10 rounded-[2.5rem] p-6 justify-between space-y-6 hover:border-gold-500/25 transition-colors group shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              >
                <div className="space-y-4">
                  {/* Photo area */}
                  <div className="relative aspect-[16/10] bg-obsidian-900 overflow-hidden border border-white/5 rounded-[2rem] group-hover:border-gold-500/20 transition-colors shadow-inner">
                    <img
                      src={getAssetPath(item.imageUrl)}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-obsidian-950/80 backdrop-blur-md border border-white/10 w-8 h-8 rounded-full flex items-center justify-center text-[15px] select-none shadow-lg">
                      {item.imagePlaceholder}
                    </div>
                  </div>

                  {/* Category & Importance Row */}
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase tracking-widest text-gold-500 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full font-bold">
                      {item.categoryLabel}
                    </span>
                    <span className={`text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-black ${
                      item.importance === "Povinné" ? "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse" :
                      item.importance === "Odporúčané" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                      "bg-white/5 text-gray-400 border border-white/10"
                    }`}>
                      {item.importance}
                    </span>
                  </div>

                  {/* Title & Brand */}
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-500 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-gray-500 font-light block italic mt-1.5">Odporúčame: {item.brandRecommendation}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Why Needed Callout */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] leading-relaxed text-gray-300 font-light">
                    <span className="text-[9px] font-black uppercase text-gold-500 tracking-wider block mb-1">Prečo je to dôležité:</span>
                    {item.whyNeeded}
                  </div>

                  {/* Key specs */}
                  <div className="space-y-1.5 pt-2">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex gap-2 items-center text-[10px] text-gray-400 font-light">
                        <Check className="w-3 h-3 text-gold-500 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Recommendation */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-gray-300 font-bold font-mono">
                    <Tag className="w-3.5 h-3.5 text-gold-500" /> {item.priceRange}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest font-black text-gold-500 group-hover:translate-x-1.5 transition-transform duration-300 cursor-default">
                    Rada trénera <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Section 2: Interactive Súťažná taška Checklist */}
        <section className="p-8 md:p-12 rounded-[3rem] border border-white/10 bg-obsidian-950/40 backdrop-blur-md shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-gold-500 uppercase tracking-[0.3em] text-[9px] font-black block">Súťažný deň bez stresu</span>
            <h2 className="text-2xl md:text-3xl font-serif text-white font-bold">Interaktívna taška na súťaž</h2>
            <p className="text-gray-400 text-xs font-light leading-relaxed">
              Kliknutím si postupne odškrtajte veci, ktoré balíte na súťaž, aby ste na nič nezabudli. Pomôže vám to vyhnúť sa stresu priamo na mieste!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {[
              { id: "topanky", label: "Tanečné topánky", desc: "Základ výbavy (+ chrániče opätkov)", icon: "👠" },
              { id: "saty", label: "Súťažné šaty / košeľa", desc: "Čisté, ožehlené v obale", icon: "👗" },
              { id: "kefa", label: "Kefa na podrážky", desc: "Nevyhnutný grip na parket", icon: "🧹" },
              { id: "cislo", label: "Registračný preukaz", desc: "Licenčný doklad tanečníka", icon: "🪪" },
              { id: "zicherky", label: "Zatváracie špendlíky", desc: "Na pripevnenie štartového čísla", icon: "🧷" },
              { id: "lak", label: "Stylingový set (Got2b)", desc: "Hrebeň, sponky, gél a silný lak", icon: "💈" },
              { id: "pančuchy", label: "Rezervné pančuchy", desc: "Pre dievčatá (vždy 2 páry navyše)", icon: "🧦" },
              { id: "občerstvenie", label: "Snacky a dostatok vody", desc: "Rýchla energia (banán, hroznový cukor)", icon: "🍌" }
            ].map((checkItem) => (
              <div
                key={checkItem.id}
                onClick={() => togglePacked(checkItem.id)}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-3 select-none ${
                  packedItems[checkItem.id]
                    ? "bg-gradient-to-br from-gold-500/[0.06] via-gold-500/[0.02] to-transparent border-gold-500/40 shadow-[0_4px_20px_rgba(212,175,55,0.05)] translate-y-[-2px]"
                    : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-2xl filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]">{checkItem.icon}</span>
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                    packedItems[checkItem.id]
                      ? "bg-gold-500 border-gold-400 text-obsidian-950 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                      : "border-white/20 text-transparent"
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
                <div>
                  <h4 className={`text-xs font-bold transition-colors ${packedItems[checkItem.id] ? "text-gold-500" : "text-white"}`}>
                    {checkItem.label}
                  </h4>
                  <p className="text-gray-500 text-[10px] font-light leading-snug mt-1">
                    {checkItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl border border-gold-500/20 bg-gold-500/[0.02] flex gap-3.5 items-start mt-6 text-left max-w-3xl mx-auto">
            <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-gold-500 text-[10px] font-black uppercase tracking-widest block mb-0.5">Trénerské odporúčanie na záver:</span>
              <p className="text-gray-300 text-xs leading-relaxed font-light">
                Zbaľte si veci na súťaž už večer vopred. Ranné balenie v zhone je najčastejším dôvodom, prečo tanečníci zabudnú kľúčové drobnosti (ako zicherky alebo kefe na podrážky). A pamätajte: ak ste na súťaži nováčikom, neváhajte sa na mieste poradiť s ostatnými skúsenejšími rodičami nášho klubu, ktorí majú rovnaké klubové bundy – radi vám pomôžu!
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
