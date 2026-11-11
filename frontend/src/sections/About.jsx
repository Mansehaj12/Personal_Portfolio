import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Compass } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function About() {
  const [childhoodErr, setChildhoodErr] = useState(false);

  const education = [
    {
      year: '2023 – 2027',
      title: 'B.E. in Computer Engineering (COE)',
      institution: 'Thapar Institute of Engineering & Technology (TIET), Patiala',
      desc: 'Computational foundations, data structures & algorithms, computer vision architectures, operating systems, and machine learning pipelines.',
      current: true
    },
    {
      year: '2023',
      title: 'Class 12th (PSEB Senior Secondary)',
      institution: 'Government Senior Secondary School (GSSS), Mulepur',
      desc: 'Completed with academic distinction across Mathematics, Physics, and Chemistry foundations.',
      current: false
    },
    {
      year: '2021',
      title: 'Class 10th (CBSE Secondary)',
      institution: 'Budha Dal Public School, Patiala',
      desc: 'Formed core scientific interest and early foundations in computational logic.',
      current: false
    }
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-12 bg-transparent font-sans border-b border-[rgba(17,17,16,0.1)] relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        
        {/* Left Side: Header & Childhood Photo (Spans 4 columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#6B6862] tracking-wider uppercase">
              [ 02 // ABOUT ME ]
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111110]">
              Background & <br />
              <span className="serif-i text-4xl sm:text-5xl lg:text-6xl text-[#111110]">
                Education
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed max-w-sm">
              Computer Engineering student at Thapar Institute, interested in machine learning, computer vision, and building web applications.
            </p>
          </div>

          {/* Quick Focus Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['TIET Patiala (COE)', 'Kaggle Expert', 'NVIDIA Certified', 'Autonomous Driving', 'Full-Stack Developer'].map((tag, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-[rgba(17,17,16,0.12)] text-xs font-mono text-[#111110] shadow-2xs">
                {tag}
              </span>
            ))}
          </div>

          {/* Photo Studio Cards: Origin & Present */}
          <div className="pt-2 flex items-center gap-3">
            {!childhoodErr && (
              <div className="flex flex-col items-start gap-1.5">
                <div className="w-24 h-28 p-1.5 bg-white rounded-xl border border-[rgba(17,17,16,0.15)] shadow-2xs hover:border-[#111110] transition-colors">
                  <img 
                    src="/childhood.jpg" 
                    alt="Childhood photo of Mansehaj Preet Singh" 
                    onError={() => setChildhoodErr(true)}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#6B6862] font-semibold">
                  Origin &bull; 2004
                </span>
              </div>
            )}

            <div className="flex flex-col items-start gap-1.5">
              <div className="w-24 h-28 p-1.5 bg-white rounded-xl border border-[rgba(17,17,16,0.15)] shadow-2xs hover:border-[#111110] transition-colors">
                <img 
                  src="/showcase-2.png" 
                  alt="Mansehaj Preet Singh Present" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#6B6862] font-semibold">
                Present &bull; 2026
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Narrative & Education Timeline (Spans 8 columns) */}
        <div className="lg:col-span-8 space-y-8 text-[#111110]">
          
          {/* Narrative Glass Card */}
          <GlassCard className="p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-[#111110] tracking-tight flex items-center gap-2">
              <Compass size={17} className="text-[#F97316]" />
              <span>A bit about me</span>
            </h3>
            <p className="text-sm leading-relaxed text-[#6B6862]">
              I am an undergraduate student at <strong className="text-[#111110] font-semibold">Thapar Institute of Engineering and Technology (TIET)</strong>, Patiala (Class of 2027). Most of my work centers around machine learning, computer vision for autonomous systems, and practical full-stack web applications.
            </p>
            <p className="text-sm leading-relaxed text-[#6B6862]">
              Outside college coursework, I spend time competing on <strong className="text-[#111110] font-semibold">Kaggle</strong> as a global Expert, working through certifications from NVIDIA and IBM, and building real-world web tools for clients and users.
            </p>
          </GlassCard>

          {/* Education Timeline */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-[#111110] font-bold text-lg">
              <GraduationCap size={19} className="text-[#111110]" />
              <span>Education Timeline</span>
            </div>
            
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <GlassCard key={idx} className="p-5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="text-sm font-bold text-[#111110]">
                      {edu.title}
                    </h4>
                    <span className="font-mono text-[11px] font-bold text-[#111110] bg-[#E8E3D9]/60 px-2.5 py-0.5 rounded-md self-start sm:self-auto">
                      {edu.year}
                    </span>
                  </div>

                  <div className="text-xs text-[#6B6862] font-medium">
                    {edu.institution}
                  </div>

                  <p className="text-xs text-[#6B6862] leading-relaxed pt-1">
                    {edu.desc}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
