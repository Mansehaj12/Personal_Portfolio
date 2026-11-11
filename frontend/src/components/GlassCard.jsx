import React from 'react';

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white border border-[rgba(17,17,16,0.13)] rounded-2xl shadow-[0_2px_8px_rgba(17,17,16,0.03)] hover:border-[rgba(17,17,16,0.35)] hover:shadow-[0_8px_24px_rgba(17,17,16,0.06)] transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
