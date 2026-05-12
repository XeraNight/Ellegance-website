"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { id: "latin", label: "Latin Fit" },
  { id: "svadba", label: "Svadba" },
  { id: "spolocenske", label: "Spoločenské" },
  { id: "tango", label: "Tango" },
  { id: "deti", label: "Deti" },
];

export default function CourseCategoryNav() {
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);

      // Simple intersection observer logic
      const sections = categories.map((cat) => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveTab(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "sticky top-24 z-40 w-full px-4 mb-12 flex justify-center transition-all duration-500",
          isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-obsidian-800/60 backdrop-blur-md border border-white/5 rounded-full p-1.5 flex gap-1 shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className={cn(
                "relative px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors duration-300",
                activeTab === cat.id ? "text-obsidian-900" : "text-gray-400 hover:text-white"
              )}
            >
              {activeTab === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gold-500 rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
