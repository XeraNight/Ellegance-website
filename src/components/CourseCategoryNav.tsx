"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { id: "latin", label: "Latin Fit" },
  { id: "svadba", label: "Svadba" },
  { id: "spolocenske", label: "Spoločenské" },
  { id: "tango", label: "Tango" },
  { id: "deti", label: "Deti" },
];

interface CourseCategoryNavProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function CourseCategoryNav({ activeTab, setActiveTab }: CourseCategoryNavProps) {
  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map((cat) => document.getElementById(cat.id));
      const threshold = 200; // Trigger threshold (px from viewport top)

      let currentActive = categories[0].id;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the top of the section has scrolled above the trigger line (200px from top)
          if (rect.top <= threshold) {
            currentActive = categories[i].id;
          }
        }
      }

      if (currentActive !== activeTab) {
        setActiveTab(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to set correct active state if user loaded page in scrolled position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, setActiveTab]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Land the section top exactly snug at 160px from viewport top (below the fixed header & tab bar)
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 160;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
      setActiveTab(id);
    }
  };

  return (
    <div className="sticky top-[64px] md:top-[80px] z-40 w-full px-4 mb-16 flex justify-center transition-all duration-300">
      <div className="bg-obsidian-950/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollToSection(cat.id)}
            className={cn(
              "relative px-4 py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300",
              activeTab === cat.id ? "text-obsidian-900" : "text-gray-400 hover:text-white"
            )}
          >
            {activeTab === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gold-500 rounded-full z-0"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
