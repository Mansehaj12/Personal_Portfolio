import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress from 0 to 100 over 1.4 seconds
    const duration = 1400;
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 150);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const nameLetters = ['M', 'A', 'N', 'S', 'E', 'H', 'A', 'J'];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        opacity: 0,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111110] text-[#F2EFE9] font-sans select-none"
    >
      <div className="w-[min(420px,80vw)] text-center space-y-4">
        
        {/* Name Letters */}
        <div className="flex justify-center gap-[0.1em] text-3xl sm:text-5xl font-bold tracking-[0.14em]">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-[2px] w-full bg-[rgba(242,239,233,0.18)] overflow-hidden my-4 rounded-full">
          <div
            className="h-full bg-[#F97316] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter */}
        <div className="font-mono text-xs text-[#F2EFE9]/60 tracking-wider">
          <span>{Math.floor(progress)}</span>
          <em className="serif-i ml-0.5 text-[#F97316] font-normal not-italic">%</em>
        </div>

      </div>
    </motion.div>
  );
}
