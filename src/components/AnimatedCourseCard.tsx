"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AnimatedCourseCardProps {
  title: string;
  category: string;
  description: string;
  price: string;
  unit: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  themeColor?: string; // e.g., 'gold', 'magenta', 'red', 'blue'
  isPremium?: boolean;
  className?: string;
}

export default function AnimatedCourseCard({
  title,
  category,
  description,
  price,
  unit,
  features,
  ctaText,
  ctaLink,
  themeColor = "gold",
  isPremium = false,
  className,
}: AnimatedCourseCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${mouseYSpring}deg) rotateY(${mouseXSpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = (mouseY / height - 0.5) * -15;
    const rY = (mouseX / width - 0.5) * 15;

    x.set(rY);
    y.set(rX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getThemeClasses = () => {
    switch (themeColor) {
      case "magenta":
        return {
          category: "text-pink-500",
          border: "hover:border-pink-500/50",
          glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
          icon: "text-pink-500",
        };
      case "red":
        return {
          category: "text-red-500",
          border: "hover:border-red-500/50",
          glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
          icon: "text-red-500",
        };
      case "blue":
        return {
          category: "text-blue-400",
          border: "hover:border-blue-400/50",
          glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]",
          icon: "text-blue-400",
        };
      default:
        return {
          category: "text-gold-500",
          border: "hover:border-gold-500/50",
          glow: "group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]",
          icon: "text-gold-500",
        };
    }
  };

  const themes = getThemeClasses();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
      className={cn("w-full h-full", className)}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform, transformStyle: "preserve-3d" }}
        className={cn(
          "group relative flex flex-col h-full rounded-[2.5rem] p-8 md:p-10 transition-all duration-500",
          "bg-obsidian-800/40 backdrop-blur-xl border border-white/5",
          themes.border,
          themes.glow,
          isPremium && "bg-gradient-to-br from-obsidian-800/60 to-gold-900/10 border-gold-500/20"
        )}
      >
        {isPremium && (
          <div className="absolute top-6 right-6 bg-gold-500 text-obsidian-900 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
            Premium
          </div>
        )}

        <div className={cn("text-xs font-bold tracking-[0.2em] uppercase mb-4", themes.category)}>
          {category}
        </div>

        <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {title}
        </h3>

        <p className="text-gray-400 font-light text-base mb-8 leading-relaxed">
          {description}
        </p>

        <div className="mt-auto">
          <div className="mb-8 flex items-baseline gap-1">
            <span className="font-serif text-4xl md:text-5xl font-bold text-white">{price}</span>
            <span className="text-gray-500 font-light text-sm">{unit}</span>
          </div>

          <ul className="space-y-4 mb-10">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-light group/item">
                <div className={cn("mt-1 flex-shrink-0 transition-transform group-hover/item:scale-110", themes.icon)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={ctaLink}
              className={cn(
                "block w-full py-4 rounded-2xl text-center font-bold tracking-widest uppercase text-xs transition-all duration-300",
                themeColor === "gold" || isPremium 
                  ? "btn-gold" 
                  : "btn-outline"
              )}
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gold-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>
  );
}
