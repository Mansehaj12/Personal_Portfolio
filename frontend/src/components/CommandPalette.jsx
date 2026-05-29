import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Sun, Moon, Download, Play, Terminal, ArrowRight } from 'lucide-react';

export default function CommandPalette({ isOpen, setIsOpen, toggleTheme, theme }) {
  const [query, setQuery] = useState('');
  const overlayRef = useRef(null);
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
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const items = [
    { name: 'Jump to Hero Section', desc: 'Introduction and headline', icon: Compass, action: () => scrollToSection('hero') },
    { name: 'Jump to About Section', desc: 'Journey and background summary', icon: Compass, action: () => scrollToSection('about') },
    { name: 'Jump to Skills Section', desc: 'Technical skills and language progress', icon: Compass, action: () => scrollToSection('skills') },
    { name: 'Jump to Projects Section', desc: 'ML models, fullstack engines, and dashboards', icon: Compass, action: () => scrollToSection('projects') },
    { name: 'Jump to Achievements Section', desc: 'Kaggle rankings, competitive programming, and NVIDIA certifications', icon: Compass, action: () => scrollToSection('achievements') },
    { name: 'Jump to Experience Section', desc: 'Career path and academic journey timeline', icon: Compass, action: () => scrollToSection('experience') },
    { name: 'Jump to Contact Section', desc: 'Send a message or connect on social media', icon: Compass, action: () => scrollToSection('contact') },
    { name: 'Toggle Light / Dark Mode', desc: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme layout`, icon: theme === 'dark' ? Sun : Moon, action: () => { toggleTheme(); setIsOpen(false); } },
    { name: 'Download Resume PDF', desc: 'Get a copy of the official PDF resume', icon: Download, action: () => { downloadResume(); setIsOpen(false); } }
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-[90%] max-w-[600px] border border-slate-200/50 dark:border-white/10 glassmorphism dark:glassmorphism rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans relative z-10 max-h-[50vh]"
          >
            {/* Search Input Area */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200/20 dark:border-white/10 bg-slate-900/10 dark:bg-slate-950/20">
              <Search className="text-slate-400 shrink-0" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands, navigate sections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm text-slate-800 dark:text-white placeholder:text-slate-500 caret-indigo-500"
              />
              <span className="text-[10px] bg-slate-200 dark:bg-white/10 px-2 py-1 rounded text-slate-500 dark:text-slate-400 uppercase select-none shrink-0">
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
                      className="w-full flex items-center justify-between text-left p-3 rounded-xl hover:bg-indigo-600/10 hover:text-indigo-400 group transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-200/50 dark:bg-white/5 group-hover:bg-indigo-600/20 group-hover:text-indigo-400 text-slate-500 dark:text-slate-400 transition-colors">
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-indigo-400">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })
              ) : (
                <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                  No commands match your query. Try searching 'dark' or 'resume'.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
