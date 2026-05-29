import React from 'react';

export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}>
      {children}
    </div>
  );
}
