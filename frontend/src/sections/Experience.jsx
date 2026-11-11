import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileCode2, Users, Trophy } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Experience() {
  const experiences = [
    {
      role: 'Freelance Web Developer & Client Solutions',
      company: 'Commercial Client Deployments',
      duration: 'Jul 2024 – Present',
      icon: Briefcase,
      color: 'emerald',
      bullets: [
        'Architected and delivered production web applications for commercial clients including Divine Cafe (Baradari Garden), The Home Delight Bakery, and FlawlessTips Luxury Nail Studio.',
        'Engineered 1-tap WhatsApp ordering workflows, past order memory (localStorage), dynamic product catalogues, and responsive mobile-first PWA architectures.',
        'Built full-stack booking and e-commerce SaaS platforms utilizing Next.js, Prisma ORM, Firebase Auth, and Recharts performance dashboards.',
        'Optimized Core Web Vitals across mobile devices, achieving sub-1.5s load times, offline service worker caching, and 95+ Google Lighthouse scores.'
      ]
    },
    {
      role: 'Project Developer & ML Pipeline Lead',
      company: 'Academic & Open Source Initiatives',
      duration: 'Aug 2023 – Present',
      icon: FileCode2,
      color: 'cyan',
      bullets: [
        'Designed and developed CareerLens, an AI-powered placement predictor & job intelligence SaaS with real-time what-if simulation dials and PDF resume gap analyzers.',
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
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
  };

  return (
    <section id="experience" className="py-24 px-6 sm:px-12 bg-transparent font-sans border-b border-[rgba(17,17,16,0.1)] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="font-mono text-xs font-bold text-[#6B6862] tracking-wider uppercase">
            [ 03 // WORK TIMELINE & LEADERSHIP ]
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111110]">
            Experience & <br />
            <span className="serif-i text-4xl sm:text-5xl lg:text-6xl text-[#111110]">
              Engagements
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6862] max-w-xl mx-auto">
            A vertical timeline tracing commercial client deployments, open-source ML pipeline leads, grassroots strategy research, and algorithm optimizations.
          </p>
        </div>

        {/* Timeline List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-3xl mx-auto border-l border-[rgba(17,17,16,0.18)] pl-6 sm:pl-10 space-y-8"
        >
          {experiences.map((exp, idx) => {
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline node */}
                <span className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-[#111110] border-2 border-[#F2EFE9] shadow-2xs" />

                {/* Card details */}
                <GlassCard className="p-5 sm:p-6 space-y-3 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#111110] leading-tight">
                        {exp.role}
                      </h3>
                      <div className="text-xs text-[#F97316] font-semibold mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono font-semibold tracking-wide text-[#111110] bg-[#E8E3D9] border border-[rgba(17,17,16,0.1)] px-2.5 py-1 rounded-md shrink-0 self-start sm:self-center">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-neutral-100">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-neutral-600 leading-relaxed flex items-start gap-2">
                        <span className="text-neutral-400 mt-1 shrink-0">&bull;</span>
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
