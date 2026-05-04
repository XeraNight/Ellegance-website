"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function RotatingText({
  texts,
  rotationInterval = 3000, // Celkový čas predĺžený na 3s (1s animácia + 2s zobrazenie)
  mainClassName = "",
  staggerDuration = 0.08, // Spomalenie vypisovania písmeniek (cca 1s pre priemerné slovo)
  auto = true,
  loop = true
}: any) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!auto || !texts || texts.length <= 1) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);
    
    return () => clearInterval(interval);
  }, [auto, texts, rotationInterval]);

  return (
    <span className={cn("relative inline-flex items-center", mainClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="flex flex-wrap"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {texts[index].split("").map((char: string, i: number) => (
            <motion.span
              key={i}
              variants={{
                initial: { opacity: 0, y: 15 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -15 }
              }}
              transition={{ 
                duration: 0.6, // Samotný pohyb písmenka je o niečo pomalší
                delay: i * staggerDuration,
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
