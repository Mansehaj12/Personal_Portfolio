import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileCode2, Users, Trophy } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Experience() {
  const experiences = [
    {
      role: 'Project Developer & ML Pipeline Lead',
      company: 'Academic & Open Source Initiatives',
      duration: 'Aug 2023 – Present',
      icon: FileCode2,
      color: 'cyan',
      bullets: [
        'Designed and developed MediSmart, a client-side AI-assisted e-pharmacy platform & generic medicine swap portal using Tesseract.js OCR and Recharts.',
        'Engineered GameIQ, an end-to-end player churn analytics pipeline processing 90k mobile gamer logs, securing 86.8% prediction accuracy.',
        'Developed PowerMRO, a real-time sensor simulator calculating machinery remaining useful life (RUL) with Next.js & TypeScript.',
        'Wrote robust unit test validations using PyTest and integrated automated GitHub Actions tests.'
      ]
    },
    {
      role: 'Political Researcher & Grassroots Analyst',
      company: 'Grassroots Surveys & Strategic Planning',
      duration: 'May 2025 – Present',
      icon: Users,
      color: 'purple',
      bullets: [
        'Monitored and parsed Punjab state legislative updates, socio-economic variables, and demographics.',
        'Conducted physical field surveys, gathering qualitative public narratives and transforming raw insights into campaign recommendations.',
        'Formulated data-driven dashboards to cross-examine polling figures and grassroots voter sentiment.'
      ]
    },
    {
      role: 'Competitive Programmer & DSA Specialist',
      company: 'LeetCode & GeeksForGeeks Arrays',
      duration: 'Aug 2023 – Present',
      icon: Trophy,
      color: 'indigo',
      bullets: [
        'Solved 200+ advanced logical problems in Data Structures and Algorithms.',
        'Refined code optimization, computational limits, and complexity bounds using C++ and Python.',
        'Implemented graph algorithms, dynamic programming grids, and tree traversals.'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', damping: 20 } }
  };

  return (
    <section id="experience" className="py-20 px-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-10 w-[200px] h-[200px] bg-purple-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-glow-indigo">
            Experience Timeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            A vertical timeline tracing my technical project leads, grassroots strategy research, and algorithm optimizations.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Timeline List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-3xl mx-auto border-l border-slate-200 dark:border-white/10 pl-6 sm:pl-10 space-y-10"
        >
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline node */}
                <span className={`absolute -left-[39px] sm:-left-[53px] top-1.5 w-6 h-6 rounded-full border-4 border-slate-100 dark:border-darkBg flex items-center justify-center transition-all group-hover:scale-115 ${
                  exp.color === 'indigo'
                    ? 'bg-indigo-600 border-indigo-600/30 shadow-neon-indigo'
                    : exp.color === 'purple'
                    ? 'bg-purple-600 border-purple-600/30 shadow-neon-purple'
                    : 'bg-cyan-500 border-cyan-500/30 shadow-neon-blue'
                }`}>
                  <Icon size={10} className="text-white" />
                </span>

                {/* Card details */}
                <GlassCard glowColor={exp.color} className="p-5 sm:p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                        {exp.role}
                      </h3>
                      <div className="text-[10px] text-indigo-400 dark:text-indigo-300 font-semibold mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                    <span className="text-[9px] uppercase font-mono font-medium tracking-wide text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-white/5 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-center">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-1 border-t border-slate-200/50 dark:border-white/5">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-1 shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
