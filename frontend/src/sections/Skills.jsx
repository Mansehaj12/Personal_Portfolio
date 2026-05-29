import React from 'react';

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

  return (
    <section id="skills" className="py-20 px-6 sm:px-12 bg-[#FAF7F0] dark:bg-zinc-900 font-sans border-b border-slate-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
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
              <div 
                key={idx} 
                className="p-5 border border-slate-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-950 rounded-2xl space-y-3 shadow-sm"
              >
                <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-zinc-900 pb-2">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {group.items.map((item, itemIdx) => (
                    <span 
                      key={itemIdx} 
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200/30 dark:border-zinc-800 text-[#1A1A1A] dark:text-zinc-300 text-[10px] font-semibold leading-none"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
