import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const [childhoodErr, setChildhoodErr] = useState(false);

  const education = [
    {
      year: '2023 – 2027',
      title: 'B.E. in Computer Engineering (COE)',
      institution: 'Thapar Institute of Engineering & Technology (TIET), Patiala, Punjab',
      desc: 'Focusing on computational foundations, data structures, backend database configurations, and machine learning architectures.'
    },
    {
      year: '2023',
      title: 'Class 12th (PSEB Senior Secondary)',
      institution: 'Government Senior Secondary School (GSSS), Mulepur',
      desc: 'Completed with high-standing analytical foundations.'
    },
    {
      year: '2021',
      title: 'Class 10th (CBSE Secondary)',
      institution: 'Budha Dal Public School, Patiala',
      desc: 'Formed core scientific and logical baselines.'
    }
  ];

  return (
    <section id="about" className="py-20 px-6 sm:px-12 bg-white dark:bg-zinc-950 font-sans border-b border-slate-100 dark:border-zinc-900">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        
        {/* Left Side: Category Header & Childhood Image (Spans 4 columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 inline-block">
              About me
            </h2>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              My background as an engineering student and developer, exploring predictive data streams and automated software checks.
            </p>
          </div>

          {/* Childhood Photo with Error Fallback */}
          {!childhoodErr && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="pt-6 border-t border-slate-100 dark:border-zinc-900 flex flex-col items-start gap-2"
            >
              <div className="w-32 h-32 rounded-2xl overflow-hidden border border-slate-200/85 dark:border-zinc-800 shadow-sm transition-transform duration-300 hover:scale-[1.03] bg-slate-50 dark:bg-zinc-900">
                <img 
                  src="/childhood.jpg" 
                  alt="Childhood photo of Mansehaj Preet Singh" 
                  onError={() => setChildhoodErr(true)}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-400 dark:text-zinc-500 font-bold">
                Where it started (2004) 👶
              </span>
            </motion.div>
          )}
        </div>

        {/* Right Side: Paragraphs & Education (Spans 8 columns) */}
        <div className="lg:col-span-8 space-y-10 text-neutral-800 dark:text-neutral-300">
          
          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              I am a Computer Engineering undergraduate student at **Thapar Institute of Engineering and Technology (TIET)** (Class of 2027), Patiala, Punjab. I have hands-on experience building end-to-end data-driven applications, robust REST APIs, and machine learning pipelines.
            </p>
            <p>
              I am a ranked **Kaggle Expert** (approaching the Master tier in Datasets and Notebooks tracks) and **NVIDIA-certified in the Fundamentals of Deep Learning**. I enjoy writing clean, test-validated scripts in Python and JavaScript to automate complex workflows and solve logical problems.
            </p>
          </div>

          {/* Education Timeline */}
          <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-zinc-900">
            <h3 className="text-lg font-bold tracking-tight text-black dark:text-white uppercase">
              Education Timeline
            </h3>
            
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={idx} 
                  className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 text-sm"
                >
                  <span className="font-mono text-xs font-bold text-neutral-400 dark:text-zinc-500 sm:w-28 shrink-0">
                    {edu.year}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-black dark:text-white leading-tight">
                      {edu.title}
                    </h4>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      {edu.institution}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-zinc-400 leading-relaxed mt-1">
                      {edu.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
