import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Download, ArrowRight } from 'lucide-react';

export default function CommandPalette({ isOpen, setIsOpen }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (window.lenis) window.lenis.start();
    }
  }, [isOpen]);

  const items = [
    { name: 'Jump to Overview', desc: 'Hero headline and status', icon: Compass, action: () => scrollToSection('hero') },
    { name: 'Jump to About Section', desc: 'Academic background and journey', icon: Compass, action: () => scrollToSection('about') },
    { name: 'Jump to Skills Section', desc: 'Technical stack & Thapar curriculum', icon: Compass, action: () => scrollToSection('skills') },
    { name: 'Jump to Portfolio Section', desc: 'AV Capstone, client PWAs & ML pipelines', icon: Compass, action: () => scrollToSection('projects') },
    { name: 'Jump to Certifications', desc: 'Kaggle rankings, NVIDIA DLI & credentials', icon: Compass, action: () => scrollToSection('achievements') },
    { name: 'Jump to Contact Section', desc: 'Send a message or inquiry', icon: Compass, action: () => scrollToSection('contact') },
    { name: 'Download Resume PDF', desc: 'Official copy of PDF resume', icon: Download, action: () => { downloadResume(); setIsOpen(false); } }
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
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

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Mansehaj_Preet_Singh_Resume.pdf';
    link.click();
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-neutral-900/30 backdrop-blur-xs"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.2 }}
            className="w-[90%] max-w-[560px] bg-white border border-neutral-300 rounded-2xl overflow-hidden shadow-xl flex flex-col font-sans relative z-10 max-h-[50vh]"
          >
            {/* Search Input Area */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 bg-neutral-50/80">
              <Search className="text-neutral-500 shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type to search sections or download resume..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400"
              />
              <span className="text-[10px] bg-neutral-200/80 px-1.5 py-0.5 rounded text-neutral-600 font-mono uppercase select-none shrink-0">
                ESC
              </span>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      onClick={item.action}
                      className="w-full flex items-center justify-between text-left p-2.5 rounded-xl hover:bg-neutral-100 group transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 transition-colors">
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-neutral-900">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-neutral-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })
              ) : (
                <div className="py-6 text-center text-xs text-neutral-500">
                  No results found matching "{query}".
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
