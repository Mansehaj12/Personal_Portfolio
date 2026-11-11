import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, null, `#${id}`);
    }
  };

  const navLinks = [
    { num: '01', label: 'Projects', id: 'projects' },
    { num: '02', label: 'About', id: 'about' },
    { num: '03', label: 'Skills', id: 'skills' },
    { num: '04', label: 'Credentials', id: 'achievements' },
    { num: '05', label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F2EFE9]/90 backdrop-blur-md border-b border-[rgba(17,17,16,0.08)] py-4 px-6 sm:px-12 select-none transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Monogram Brand */}
        <button
          onClick={() => scrollToSection('hero')}
          className="font-bold text-xl sm:text-2xl tracking-tighter text-[#111110] flex items-baseline gap-0.5 cursor-pointer group"
        >
          <span>MP</span>
          <em className="serif-i text-xs font-normal text-[#F97316] select-none group-hover:rotate-12 transition-transform">&reg;</em>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[#111110]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-xs font-semibold tracking-wide hover:text-[#F97316] transition-colors relative py-1 group cursor-pointer"
            >
              <span className="font-mono text-[10px] text-[#6B6862] mr-1.5 opacity-60">
                {link.num}
              </span>
              <span>{link.label}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#111110] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Contact Quick Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#111110] text-[#111110] hover:bg-[#111110] hover:text-[#F2EFE9] text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer"
          >
            <span>Let's talk</span>
            <span className="text-[#F97316] font-bold">&rarr;</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#111110]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-[rgba(17,17,16,0.1)] mt-3 flex flex-col gap-2 bg-[#F2EFE9]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="w-full text-left px-2 py-2 text-sm font-bold text-[#111110] hover:text-[#F97316] flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="font-mono text-xs text-[#6B6862]">{link.num}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
