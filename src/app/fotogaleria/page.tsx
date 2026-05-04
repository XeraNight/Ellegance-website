import React from "react";
import Image from "next/image";

export default function FotogaleriaPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-10 bg-obsidian-900">
        <div className="text-center px-4 max-w-3xl mx-auto">
          <span className="block text-gold-500 font-sans tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in-up font-bold">Naše momenty</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up text-glow" style={{ animationDelay: '0.1s' }}>Fotogaléria</h1>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold-500 to-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-obsidian-900 pb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
          
          <div className="gallery-item relative rounded-xl overflow-hidden group col-span-1 lg:col-span-2 row-span-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <Image 
              src="/assets/img/hero_ballroom_dance_1777364065805.png" 
              alt="Gallery Image 1" 
              fill
              className="gallery-image object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <span className="font-serif text-3xl text-white">Elegancia pohybu</span>
            </div>
          </div>

          <div className="gallery-item relative rounded-xl overflow-hidden group opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <Image 
              src="/assets/img/gallery_tango_1777364096830.png" 
              alt="Gallery Image 2" 
              fill
              className="gallery-image object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="font-serif text-xl text-white">Tango Argentíno</span>
            </div>
          </div>

          <div className="gallery-item relative rounded-xl overflow-hidden group opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <Image 
              src="/assets/img/gallery_latin_1777364111041.png" 
              alt="Gallery Image 3" 
              fill
              className="gallery-image object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="font-serif text-xl text-white">Dynamika & Rytmus</span>
            </div>
          </div>

          <div className="gallery-item relative rounded-xl overflow-hidden group col-span-1 sm:col-span-2 lg:col-span-3 row-span-1 md:row-span-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Image 
              src="/assets/img/gallery_waltz_1777364079670.png" 
              alt="Gallery Image 4" 
              fill
              className="gallery-image object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <span className="font-serif text-3xl text-white">Grand Ballroom</span>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
