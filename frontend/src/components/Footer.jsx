import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black border-t border-slate-100 dark:border-zinc-900 py-10 px-6 sm:px-12 font-sans select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand/Initials */}
        <div className="font-mono text-xs font-bold tracking-tight text-neutral-400 dark:text-zinc-600">
          MP.COE()
        </div>

        {/* Copy */}
        <div className="text-[10px] text-neutral-400 dark:text-zinc-500 uppercase tracking-widest font-semibold text-center">
          &copy; {currentYear} Mansehaj Preet Singh. All Rights Reserved.
        </div>

        {/* Social Connections */}
        <div className="flex items-center gap-4 text-neutral-500 dark:text-zinc-400">
          <a
            href="https://github.com/Mansehaj12"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
            title="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://linkedin.com/in/mansehajpreet"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="https://www.kaggle.com/sehaj1104"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors flex items-center justify-center"
            title="Kaggle"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
              <path d="M18.825 21.85h-4.887l-6.177-8.919v8.92H4.15V2.15h3.611v8.718l5.89-8.718h4.887l-7.222 9.805 7.509 9.895z" />
            </svg>
          </a>
          <a
            href="mailto:sehajpreetsingh480@gmail.com"
            className="hover:text-black dark:hover:text-white transition-colors"
            title="Email"
          >
            <Mail size={15} />
          </a>
        </div>

      </div>
    </footer>
  );
}
