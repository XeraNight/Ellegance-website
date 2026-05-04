import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ONasPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-obsidian-800 border-b border-gold-500/10">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="/assets/img/gallery_tango_1777364096830.png" 
            alt="Background" 
            fill
            className="object-cover filter blur-sm grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/50 to-obsidian-800"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <span className="block text-gold-500 font-sans tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in-up font-bold">Kto sme</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up text-glow" style={{ animationDelay: '0.2s' }}>
            Kde sa <i className="text-gold-500 font-light">profesionalita</i><br />stretáva s rodinou
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-obsidian-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-invert prose-lg prose-p:text-gray-400 prose-p:font-light prose-headings:font-serif prose-headings:text-white mx-auto">
            <p className="lead text-2xl text-gray-300 font-serif italic text-center mb-16 leading-relaxed">
              &quot;Našou misiou je rozvíjať spoločenský tanec, sprístupniť ho ľuďom rôzneho veku a budovať komunitu, pre ktorú je pohyb vášňou.&quot;
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 my-16 items-center">
              <div className="relative w-full h-[450px]">
                <Image 
                  src="/assets/img/hero_ballroom_dance_1777364065805.png" 
                  alt="O nás 1" 
                  fill
                  className="rounded-xl shadow-2xl object-cover border border-gold-500/20 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2">Majster Sveta a Európy</span>
                <h3 className="text-3xl font-bold mb-4">Ing. Peter Vidašič</h3>
                <p className="mb-4">
                  Srdcom klubu je prezident a hlavný tréner Peter Vidašič. Bývalý Majster sveta v tanci na vozíku a vicemajster sveta v latinskoamerických tancoch.
                </p>
                <p>
                  Svoje choreografické majstrovstvo predviedol miliónom divákov v úspešných televíznych projektoch <strong>Let&apos;s Dance</strong>, <strong>Bailando</strong> a <strong>Slovensko má talent</strong>. Pod jeho vedením vyrástla nová generácia majstrov Slovenska a finalistov medzinárodných súťaží.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 my-24 items-center">
              <div className="flex flex-col justify-center order-2 md:order-1">
                <h3 className="text-3xl font-bold mb-4">Top Tanečný Klub v EÚ</h3>
                <p className="mb-4">
                  Fungujeme ako unikátny hybrid. Sme profesionálny športový klub, ale rovnako dôležitá je pre nás hobby tanečná škola.
                </p>
                <p>
                  Či už ste manželia, ktorí sa chcú naučiť základné kroky na ples, nevesta so ženíchom, alebo mladý talent mieriaci na medzinárodné parkety – naši akreditovaní lektori vám odovzdajú svoje skúsenosti s úsmevom a trpezlivosťou.
                </p>
              </div>
              <div className="relative w-full h-[400px] order-1 md:order-2">
                <Image 
                  src="/assets/img/gallery_latin_1777364111041.png" 
                  alt="O nás 2" 
                  fill
                  className="rounded-xl shadow-2xl object-cover border border-gold-500/20 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold mb-8 text-center mt-32">Ellegance Dance Cup</h3>
            <p className="text-center mb-12 max-w-2xl mx-auto">Sme nielen škola, ale aj stabilná inštitúcia v tanečnom športe. Pravidelne organizujeme celoslovenskú a medzinárodnú súťaž <strong>Ellegance Dance Cup</strong>, ktorá buduje reputáciu mesta Košice v tanečnom svete a spája tú najlepšiu komunitu tanečníkov.</p>
            
            <div className="text-center mt-12">
              <Link href="/ponuka" className="btn-gold px-8 py-4 rounded-full font-sans text-sm font-bold tracking-widest uppercase inline-block">Vyberte si svoj kurz</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
