import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, ArrowDown } from 'lucide-react';

export default function Hero() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, null, `#${id}`);
    }
  };

  // Mouse tilt tracking variables
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dampened smooth springs for 3D card deck rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 90, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 90, damping: 20 });

  const springConfig = { stiffness: 120, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax displacement coordinates for each card layer (back to front)
  const card0_X = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const card0_Y = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const card1_X = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const card1_Y = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const card2_X = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const card2_Y = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-stretch overflow-hidden select-none font-sans pt-[68px] bg-[#FAF7F0] dark:bg-zinc-950 transition-colors duration-500"
    >
      {/* Background Layer: Split screen */}
      <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row -z-10">
        {/* Left Side: Light Gray with diagonal clip-path */}
        <div className="w-full md:w-[60%] bg-[#E5E5E5] dark:bg-zinc-900/40 clip-diagonal h-full absolute inset-y-0 left-0 transition-colors" />
        
        {/* Right Side: Black background */}
        <div className="w-full bg-[#000000] dark:bg-zinc-950 h-full absolute inset-y-0 right-0 -z-20 transition-colors" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 items-stretch relative z-10 px-6 sm:px-12">
        
        {/* Left Columns: Text Content (spans 7 columns on desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-7 flex flex-col justify-center py-16 pr-0 md:pr-12 text-[#1A1A1A] dark:text-white"
        >
          <div className="space-y-6 max-w-lg">
            
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-300">
              Hi, I am
            </h3>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-black dark:text-white">
              Mansehaj Preet Singh
            </h1>
            
            <p className="text-sm sm:text-base font-semibold text-neutral-550 dark:text-neutral-400 tracking-wide">
              Data Scientist / Machine Learning Engineer / Developer
            </p>

            {/* Social Buttons */}
            <div className="flex items-center gap-4 pt-6">
              <a
                href="mailto:sehajpreetsingh480@gmail.com"
                className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                title="Send Email"
              >
                <span className="font-sans font-bold text-lg">@</span>
              </a>
              <a
                href="https://github.com/Mansehaj12"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                title="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/mansehajpreet"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                title="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.kaggle.com/sehaj1104"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                title="Kaggle Profile"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.825 21.85h-4.887l-6.177-8.919v8.92H4.15V2.15h3.611v8.718l5.89-8.718h4.887l-7.222 9.805 7.509 9.895z" />
                </svg>
              </a>
            </div>

            {/* Hint scroll button */}
            <div className="pt-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-neutral-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors group"
              >
                SCROLL DOWN <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform animate-bounce" />
              </button>
            </div>

          </div>
        </motion.div>

        {/* Right Columns: Interactive 3D Parallax & Depth-Focus Collage */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="md:col-span-5 flex flex-col justify-center items-center py-12 md:py-0 select-none"
          style={{ perspective: 1200 }}
        >
          {/* Main 3D Card Stack Canvas */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-[460px] h-[520px] flex items-center justify-center cursor-crosshair"
          >
            
            {/* Card 0: Casual Mode (pprofile.JPG) - Floating Back-Left */}
            <motion.div
              style={{ 
                x: card0_X, 
                y: card0_Y, 
                z: hoveredCard === 0 ? 80 : 10,
                transformStyle: "preserve-3d"
              }}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`absolute top-[4%] left-[2%] w-[48%] aspect-[3/4.2] p-3 pb-8 rounded-xl bg-white dark:bg-zinc-900 border shadow-xl flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out ${
                hoveredCard === 0 
                  ? "scale-108 z-30 shadow-[0_20px_40px_rgba(245,158,11,0.3)] border-amber-500/50 dark:border-amber-400/50" 
                  : hoveredCard !== null 
                    ? "opacity-35 blur-[1.5px] grayscale-[20%] scale-95 z-0 border-slate-200/50 dark:border-zinc-800/50"
                    : "z-10 opacity-100 scale-100 border-slate-200/80 dark:border-zinc-800/80"
              }`}
            >
              <div className="w-full h-[85%] rounded-lg overflow-hidden bg-zinc-950">
                <img 
                  src="/pprofile.JPG" 
                  alt="Mansehaj Casual Look" 
                  className={`w-full h-full object-cover object-[center_12%] transition-transform duration-500 ${
                    hoveredCard === 0 ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>
              <div className="text-center font-mono text-[7px] text-zinc-500 dark:text-zinc-400 font-extrabold tracking-widest pt-2.5">
                [ MODE: CASUAL // SYS_L01 ]
              </div>
            </motion.div>

            {/* Card 1: Nature Mode (IMG_5355.JPG) - Floating Bottom-Left */}
            <motion.div
              style={{ 
                x: card1_X, 
                y: card1_Y, 
                z: hoveredCard === 1 ? 80 : 20,
                transformStyle: "preserve-3d"
              }}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`absolute bottom-[6%] left-[4%] w-[47%] aspect-[3/4.2] p-3 pb-8 rounded-xl bg-white dark:bg-zinc-900 border shadow-xl flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out ${
                hoveredCard === 1 
                  ? "scale-108 z-30 shadow-[0_20px_40px_rgba(16,185,129,0.3)] border-emerald-500/50 dark:border-emerald-400/50" 
                  : hoveredCard !== null 
                    ? "opacity-35 blur-[1.5px] grayscale-[20%] scale-95 z-0 border-slate-200/50 dark:border-zinc-800/50"
                    : "z-20 opacity-100 scale-100 border-slate-200/80 dark:border-zinc-800/80"
              }`}
            >
              <div className="w-full h-[85%] rounded-lg overflow-hidden bg-zinc-950">
                <img 
                  src="/IMG_5355.JPG" 
                  alt="Mansehaj Outdoors Look" 
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{
                    transform: hoveredCard === 1 ? 'scale(1.58)' : 'scale(1.5)',
                    transformOrigin: '72% 62%'
                  }}
                />
              </div>
              <div className="text-center font-mono text-[7px] text-zinc-500 dark:text-zinc-400 font-extrabold tracking-widest pt-2.5">
                [ ENV: OUTDOOR // RUN_L02 ]
              </div>
            </motion.div>

            {/* Card 2: Formal Mode (IMG_1385.JPG) - Floating Center-Front */}
            <motion.div
              style={{ 
                x: card2_X, 
                y: card2_Y, 
                z: hoveredCard === 2 ? 90 : 30,
                transformStyle: "preserve-3d"
              }}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`absolute bottom-[16%] right-[6%] w-[52%] aspect-[3/4.2] p-3.5 pb-9 rounded-2xl bg-white dark:bg-zinc-900 border shadow-2xl flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out ${
                hoveredCard === 2 
                  ? "scale-108 z-40 shadow-[0_25px_45px_rgba(99,102,241,0.4)] border-indigo-500/50 dark:border-indigo-400/50" 
                  : hoveredCard !== null 
                    ? "opacity-35 blur-[1.5px] grayscale-[20%] scale-95 z-0 border-slate-200/50 dark:border-zinc-800/50"
                    : "z-30 opacity-100 scale-100 border-slate-200/80 dark:border-zinc-800/80"
              }`}
            >
              <div className="w-full h-[85%] rounded-xl overflow-hidden bg-zinc-950">
                <img 
                  src="/IMG_1385.JPG" 
                  alt="Mansehaj Professional Suit" 
                  className={`w-full h-full object-cover object-[center_12%] transition-transform duration-500 ${
                    hoveredCard === 2 ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>
              <div className="flex items-center justify-center gap-1.5 font-mono text-[7px] text-zinc-500 dark:text-zinc-400 font-extrabold tracking-widest pt-2.5">
                <span>[ AUTH: SYSTEM // SEC ]</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

