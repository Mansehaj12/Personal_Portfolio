import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F2EFE9] border-t border-[rgba(17,17,16,0.12)] py-12 px-6 sm:px-12 font-sans select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand Monogram */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-[#111110] tracking-tight">MP</span>
          <span className="font-mono text-xs text-[#6B6862]">
            &mdash; Mansehaj Preet Singh &bull; TIET COE '27
          </span>
        </div>

        {/* Copy */}
        <div className="text-xs text-[#6B6862] text-center font-mono">
          &copy; {currentYear} &bull; Patiala, Punjab
        </div>

        {/* Social Connections & Scroll Top */}
        <div className="flex items-center gap-4 text-[#111110]">
          <a
            href="https://github.com/Mansehaj12"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F97316] transition-colors"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/mansehajpreet"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F97316] transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://www.kaggle.com/sehaj1104"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F97316] transition-colors flex items-center justify-center"
            title="Kaggle"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.825 21.85h-4.887l-6.177-8.919v8.92H4.15V2.15h3.611v8.718l5.89-8.718h4.887l-7.222 9.805 7.509 9.895z" />
            </svg>
          </a>
          <a
            href="mailto:sehajpreetsingh480@gmail.com"
            className="hover:text-[#F97316] transition-colors"
            title="Email"
          >
            <Mail size={16} />
          </a>

          <div className="h-4 w-px bg-[rgba(17,17,16,0.15)]" />

          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-md hover:bg-[#E8E3D9] text-[#6B6862] hover:text-[#111110] transition-colors cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp size={15} />
          </button>
        </div>

      </div>
    </footer>
  );
}
