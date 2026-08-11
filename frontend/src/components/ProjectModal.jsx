import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Sparkles, Cpu, Layers, Activity, CheckCircle2 } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header Bar */}
          <div className="p-6 pb-4 border-b border-slate-100 dark:border-zinc-800 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {project.isCapstone && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                    <Sparkles size={11} className="text-indigo-500 animate-pulse" /> Capstone Project
                  </span>
                )}
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                  {project.subtitle}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-black dark:text-white leading-tight">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto font-sans">
            {/* Highlights / Metrics */}
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-3">
              <Activity size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  Performance & Key Metrics
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                  {project.metrics}
                </div>
              </div>
            </div>

            {/* Overview Description */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Layers size={14} className="text-indigo-500" /> Project Overview
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* Architecture Pipeline Details */}
            {project.architecture && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Cpu size={14} className="text-indigo-500" /> System Architecture & Execution Pipeline
                </h3>
                <div className="space-y-2">
                  {project.architecture.map((layer, lIdx) => (
                    <div 
                      key={lIdx}
                      className="p-3 rounded-lg border border-slate-100 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-950/60 flex items-start gap-2.5"
                    >
                      <CheckCircle2 size={15} className="text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-black dark:text-white block">
                          {layer.name}
                        </span>
                        <span className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-relaxed block mt-0.5">
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
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-neutral-400">
                Technologies & Frameworks
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-[10px] font-mono font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 px-6 bg-slate-50 dark:bg-zinc-950 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-4">
            <span className="text-[11px] text-neutral-400 font-mono">
              Press ESC or click anywhere outside to close
            </span>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-mono font-bold tracking-wider uppercase hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors shadow-sm"
            >
              <Github size={14} /> View Source Code
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
