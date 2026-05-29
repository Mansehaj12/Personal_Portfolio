import React from 'react';
import { motion } from 'framer-motion';

export default function Skills() {
  const skillGroups = [
    {
      category: 'Languages',
      items: ['Python', 'JavaScript', 'C/C++', 'SQL', 'R', 'Java', 'C# (.NET)']
    },
    {
      category: 'Data Science & Machine Learning',
      items: ['Pandas & NumPy', 'Scikit-learn', 'Deep Learning (PyTorch)', 'Random Forest', 'XGBoost', 'Exploratory Data Analysis (EDA)']
    },
    {
      category: 'Backend & APIs',
      items: ['Flask', 'Node.js', 'Express', 'FastAPI', 'REST APIs Integration', 'OpenAI API']
    },
    {
      category: 'Frontend & Visualizations',
      items: ['React.js', 'Next.js', 'Tailwind CSS', 'Recharts', 'Matplotlib & Seaborn', 'Power BI']
    },
    {
      category: 'Databases & Tools',
      items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Git & GitHub', 'CI/CD (GitHub Actions)', 'PyTest (Unit Testing)', 'Postman API Client']
    }
  ];

  // Motion variants for staggered badge layout
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } }
  };

  return (
    <section id="skills" className="py-20 px-6 sm:px-12 bg-[#FAF7F0] dark:bg-zinc-900 font-sans border-b border-slate-100 dark:border-zinc-800">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        
        {/* Left Side: Header (Spans 4 columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 inline-block">
            Skills
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
            My technology toolset organized by categories, spanning machine learning, core languages, and test platforms.
          </p>
        </div>

        {/* Right Side: Skill Tags (Spans 8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillGroups.map((group, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                key={idx} 
                className="p-5 border border-slate-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-950 rounded-2xl space-y-3 shadow-sm"
              >
                <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-zinc-900 pb-2">
                  {group.category}
                </h3>
                
                {/* Staggered badge rendering container */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-1.5 pt-1"
                >
                  {group.items.map((item, itemIdx) => (
                    <motion.span 
                      variants={badgeVariants}
                      key={itemIdx} 
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200/30 dark:border-zinc-800 text-[#1A1A1A] dark:text-zinc-300 text-[10px] font-semibold leading-none cursor-default hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>

      </motion.div>
    </section>
  );
}
