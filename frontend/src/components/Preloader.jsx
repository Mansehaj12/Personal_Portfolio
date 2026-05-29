import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress from 0 to 100 over 2.2 seconds
    const duration = 2200;
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300); // Small pause at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Clean formatted percentage (e.g. 05%, 42%, 100%)
  const formatPercent = (val) => {
    const rounded = Math.floor(val);
    if (rounded < 10) return `0${rounded}%`;
    return `${rounded}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white font-sans select-none"
    >
      {/* Visual background grid pattern for tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center max-w-sm px-6 w-full text-center space-y-8">
        
        {/* Name and title card */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans"
          >
            Mansehaj Preet Singh
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase font-mono tracking-widest text-zinc-400 font-bold"
          >
            Computer Engineer
          </motion.p>
        </div>

        {/* Futuristic Ticker and Progress Bar */}
        <div className="w-full space-y-3 pt-6">
          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 font-bold uppercase">
            <span>SYS_INIT</span>
            <span className="text-cyan-400 font-extrabold animate-pulse">
              {formatPercent(progress)}
            </span>
          </div>

          {/* Bar container */}
          <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden relative shadow-inner">
            {/* Glowing progress line */}
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full shadow-[0_0_12px_#06b6d4]"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 font-bold">
            <span>SPEED: OPTIMAL</span>
            <span className="animate-pulse">LOADING...</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
