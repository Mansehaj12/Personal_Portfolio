import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Sparkles, Cpu, Layers, Activity, CheckCircle2, ExternalLink, Briefcase } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Freeze page scroll and pause Lenis smoothly
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (window.lenis) {
      window.lenis.stop();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow || 'unset';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs font-sans"
      >
        {/* Backdrop click to close */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window */}
        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl border border-[rgba(17,17,16,0.15)] shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="p-6 pb-4 border-b border-[rgba(17,17,16,0.1)] flex items-start justify-between gap-4 bg-white">
            <div className="space-y-1.5 pr-2">
              <div className="flex items-center gap-2 flex-wrap">
                {project.isCapstone && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20">
                    <Sparkles size={11} className="text-[#F97316]" /> Capstone Project
                  </span>
                )}
                {project.isClient && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                    <Briefcase size={11} className="text-emerald-700" /> Commercial Client Project
                  </span>
                )}
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6B6862]">
                  {project.subtitle}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111110] leading-tight">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#F2EFE9] text-[#111110] hover:bg-[#111110] hover:text-white transition-colors shrink-0 cursor-pointer"
              aria-label="Close modal (Esc)"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body - Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="p-6 space-y-6 overflow-y-auto flex-1 overscroll-contain"
          >
            {/* Highlights / Metrics */}
            {project.metrics && (
              <div className="p-4 rounded-xl bg-white border border-[rgba(17,17,16,0.1)] flex items-center gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
                  <Activity size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono font-bold text-[#6B6862] tracking-wider">
                    Performance & Key Metrics
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#111110] mt-0.5">
                    {project.metrics}
                  </div>
                </div>
              </div>
            )}

            {/* Overview Description */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-[#6B6862] flex items-center gap-1.5">
                <Layers size={14} className="text-[#F97316]" /> Project Overview
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* Architecture Pipeline Details */}
            {project.architecture && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-[#6B6862] flex items-center gap-1.5">
                  <Cpu size={14} className="text-[#F97316]" /> System Architecture & Execution Pipeline
                </h3>
                <div className="space-y-2.5">
                  {project.architecture.map((layer, lIdx) => (
                    <div 
                      key={lIdx}
                      className="p-3.5 rounded-xl border border-[rgba(17,17,16,0.1)] bg-white flex items-start gap-3 shadow-2xs"
                    >
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-[#111110] block">
                          {layer.name}
                        </span>
                        <span className="text-xs text-[#6B6862] leading-relaxed block mt-1">
                          {layer.details}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-[#6B6862]">
                Technologies & Frameworks
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-2.5 py-1 rounded-md bg-white border border-[rgba(17,17,16,0.1)] text-[#111110] text-[11px] font-mono font-medium shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 px-6 bg-white border-t border-[rgba(17,17,16,0.1)] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] text-[#6B6862] font-mono">
              Press ESC or click anywhere outside to close
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-semibold transition-colors shadow-2xs"
                >
                  <ExternalLink size={13} />
                  <span>Live Demo</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#111110] hover:bg-neutral-800 text-[#F2EFE9] text-xs font-mono font-semibold transition-colors shadow-2xs"
                >
                  <Github size={13} />
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
