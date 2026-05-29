import React from 'react';

export default function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, null, `#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/95 dark:bg-black/95 border-b border-slate-100 dark:border-zinc-900 py-4 px-6 sm:px-12 backdrop-blur-sm select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group font-sans text-sm font-extrabold tracking-tighter text-black dark:text-white"
        >
          {/* Typographic clean Logo */}
          <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs select-none">
            MP
          </div>
          <span>Mansehaj Preet Singh</span>
        </button>

        {/* Links */}
        <div className="flex items-center gap-6 sm:gap-8 font-sans">
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-[11px] sm:text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            About me
          </button>
          
          <button 
            onClick={() => scrollToSection('skills')} 
            className="text-[11px] sm:text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Skills
          </button>
          
          <button 
            onClick={() => scrollToSection('projects')} 
            className="text-[11px] sm:text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Portfolio
          </button>

          <button 
            onClick={() => scrollToSection('contact')} 
            className="hidden sm:inline-block px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-black dark:text-white border-2 border-black dark:border-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            CONTACT ME
          </button>
        </div>
      </div>
    </nav>
  );
}
