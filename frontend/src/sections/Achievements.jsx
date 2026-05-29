import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, ShieldCheck, ZoomIn, Eye, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Achievements() {
  const [activeCert, setActiveCert] = useState(null);

  const stats = [
    { label: 'Kaggle Rank', val: 'Global Expert', desc: 'Datasets & Notebooks' },
    { label: 'Deep Learning', val: 'NVIDIA Certified', desc: 'DLI Fundamentals' },
    { label: 'Algorithm Solves', val: '200+ Problems', desc: 'LeetCode & GFG' }
  ];

  const credentials = [
    {
      id: 'nvidia',
      title: 'Fundamentals of Deep Learning',
      issuer: 'NVIDIA Deep Learning Institute',
      date: 'Earned via Coursera',
      desc: 'Certified competence in training deep neural networks from scratch, leveraging transfer learning, and deploying neural architectures to solve computer vision and NLP tasks.',
      glow: 'purple',
      icon: Award,
      badgeText: 'NVIDIA DLI'
    },
    {
      id: 'kaggle',
      title: 'Kaggle Expert Tier Badge',
      issuer: 'Kaggle (Alphabet Inc.)',
      date: 'Datasets & Notebooks Track',
      desc: 'Ranked globally as a Kaggle Dataset and Notebook Expert, demonstrating predictive capability by deploying clean data pipelines and modeling configurations.',
      glow: 'cyan',
      icon: Trophy,
      badgeText: 'Kaggle Expert'
    },
    {
      id: 'dsa',
      title: 'Algorithmic Problem Solving Badge',
      issuer: 'Competitive Programming Tracks',
      date: '200+ Solves Verified',
      desc: 'Recognizes mastery over core data structures, graph traversals, greedy strategies, binary tree searches, and dynamic programming optimization grids.',
      glow: 'indigo',
      icon: ShieldCheck,
      badgeText: 'DSA Expert'
    }
  ];

  // Render a mock SVG certificate vector for display
  const renderCertificateVector = (id, title, issuer) => {
    return (
      <div className="w-full h-32 rounded-xl bg-slate-900 border border-slate-800 relative flex items-center justify-center overflow-hidden font-mono text-[7px] text-slate-400 select-none p-4">
        {/* Certificate borders */}
        <div className="absolute inset-2 border border-dashed border-slate-700 rounded" />
        <div className="absolute inset-3 border border-slate-800 rounded" />
        
        {/* Glowing badge background */}
        <div className={`absolute w-12 h-12 rounded-full blur-xl opacity-30 ${
          id === 'kaggle' ? 'bg-cyan-500' : id === 'nvidia' ? 'bg-purple-500' : 'bg-indigo-500'
        }`} />
        
        <div className="text-center z-10 space-y-1">
          <Sparkles size={12} className="text-yellow-400 mx-auto animate-pulse" />
          <div className="text-[6px] uppercase tracking-widest text-slate-500">CERTIFICATE OF RECOGNITION</div>
          <div className="font-extrabold text-slate-200 text-[8px] uppercase tracking-wide px-2 truncate max-w-[160px]">{title}</div>
          <div className="text-[5px] text-indigo-300">{issuer}</div>
          <div className="text-[4px] text-slate-600 uppercase tracking-widest mt-1">VERIFICATION CODE: MSPS-8493-27A</div>
        </div>
      </div>
    );
  };

  return (
    <section id="achievements" className="py-20 px-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/3 right-10 w-[200px] h-[200px] bg-cyan-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-glow-cyan">
            Milestones & Credentials
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            A verified ledger of my global engineering credentials, dataset optimization ranks, and competitive programming counts.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Counter grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="p-5 text-center bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-2xl flex flex-col justify-center space-y-2 hover:border-cyan-400/20 transition-all"
            >
              <div className="text-[9px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
              <div className="text-2xl font-extrabold text-slate-800 dark:text-white text-glow-blue">
                {stat.val}
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cert) => {
            const CertIcon = cert.icon;
            return (
              <GlassCard 
                key={cert.id} 
                glowColor={cert.glow}
                className="flex flex-col justify-between h-full group cursor-pointer"
              >
                <div onClick={() => setActiveCert(cert)} className="space-y-4">
                  {/* Visual mockup of the cert */}
                  <div className="relative overflow-hidden rounded-xl">
                    {renderCertificateVector(cert.id, cert.title, cert.issuer)}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                        <Eye size={12} /> Inspect Credential
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-indigo-400 font-semibold leading-none">
                      {cert.badgeText}
                    </span>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                      {cert.title}
                    </h3>
                    <div className="text-[9px] text-slate-400 dark:text-slate-500">
                      {cert.issuer} &bull; {cert.date}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-[90%] max-w-[500px] border border-slate-200/50 dark:border-white/10 glassmorphism dark:glassmorphism rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative z-10 text-center"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-2">
                <activeCert.icon size={20} className="animate-pulse" />
              </div>
              
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase font-mono tracking-widest text-indigo-400 font-bold">
                  Verified Credential Record
                </span>
                <h3 className="text-md sm:text-lg font-extrabold text-slate-800 dark:text-white leading-tight">
                  {activeCert.title}
                </h3>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">
                  {activeCert.issuer} &bull; {activeCert.date}
                </div>
              </div>

              {renderCertificateVector(activeCert.id, activeCert.title, activeCert.issuer)}

              <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto text-left">
                {activeCert.desc}
              </p>

              <button
                onClick={() => setActiveCert(null)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] uppercase font-mono tracking-wider font-bold transition-colors"
              >
                Close Certificate
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
