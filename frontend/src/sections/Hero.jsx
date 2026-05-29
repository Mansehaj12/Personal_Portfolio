import React, { useState } from 'react';
import { Github, Linkedin, ArrowDown, User } from 'lucide-react';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, null, `#${id}`);
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-stretch overflow-hidden select-none font-sans pt-[68px]"
    >
      {/* Background Layer: Split screen */}
      <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row -z-10">
        {/* Left Side: Light Gray with diagonal clip-path */}
        <div className="w-full md:w-[60%] bg-[#E5E5E5] clip-diagonal h-full absolute inset-y-0 left-0" />
        
        {/* Right Side: Black background */}
        <div className="w-full bg-[#000000] h-full absolute inset-y-0 right-0 -z-20" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 items-stretch relative z-10 px-6 sm:px-12">
        
        {/* Left Columns: Text Content (spans 7 columns on desktop) */}
        <div className="md:col-span-7 flex flex-col justify-center py-16 pr-0 md:pr-12 text-[#1A1A1A]">
          <div className="space-y-6 max-w-lg">
            
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-800">
              Hi, I am
            </h3>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-black">
              Mansehaj Preet Singh
            </h1>
            
            <p className="text-sm sm:text-base font-semibold text-neutral-500 tracking-wide">
              Data Scientist / Machine Learning Engineer / Developer
            </p>

            {/* Social Buttons: Minimal squares with raised shadow */}
            <div className="flex items-center gap-4 pt-6">
              <a
                href="mailto:sehajpreetsingh480@gmail.com"
                className="w-12 h-12 rounded-xl bg-white border border-slate-300 text-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                title="Send Email"
              >
                <span className="font-sans font-bold text-lg">@</span>
              </a>
              <a
                href="https://github.com/Mansehaj12"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-white border border-slate-300 text-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                title="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/mansehajpreet"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-white border border-slate-300 text-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                title="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.kaggle.com/sehaj1104"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-white border border-slate-300 text-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
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
        </div>

        {/* Right Columns: User Portrait Photo (spans 5 columns on desktop) */}
        <div className="md:col-span-5 flex flex-col justify-center items-center py-12 md:py-0">
          
          {/* Portrait Editorial Card Frame */}
          <div className="w-full max-w-[320px] aspect-[3/4] rounded-[28px] overflow-hidden border border-zinc-800/80 shadow-2xl bg-zinc-950 relative flex items-center justify-center group">
            
            {imgError ? (
              /* Fallback simple user icon if loading fails */
              <div className="text-zinc-700 flex flex-col items-center gap-2 font-mono">
                <User size={40} className="text-zinc-500 animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Image offline</span>
              </div>
            ) : (
              /* Rendered Profile Photo */
              <img 
                src="/profile.jpg" 
                alt="Mansehaj Preet Singh" 
                onError={() => setImgError(true)} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
