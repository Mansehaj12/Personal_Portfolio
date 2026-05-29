import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Projects() {
  const projects = [
    {
      title: 'PowerMRO: Telemetry Simulation & Health Dashboard',
      subtitle: 'Industrial Equipment Telemetry',
      desc: 'Designed and developed a simulation platform mimicking enterprise-level control room dashboards. Engineered a real-time telemetry engine simulating live sensor data (temp, vibration) and calculated Remaining Useful Life (RUL) using failure interval variables.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'React Hooks', 'Vercel'],
      metrics: 'Telemetry frequency: 10 streams/sec | latency: <15ms',
      github: 'https://github.com/Mansehaj12/PowerMRO'
    },
    {
      title: 'GameIQ: Player Behavior Analytics Platform',
      subtitle: 'Data Science & Machine Learning',
      desc: 'Built an end-to-end Machine Learning pipeline to predict user churn using a mobile gamer log database of 90,000+ players. Integrated features capturing milestones, deployed a Random Forest model, and hosted it behind a Flask REST API and React dashboard.',
      tech: ['Python', 'Flask', 'Scikit-learn', 'Random Forest', 'Pandas & NumPy', 'Node.js'],
      metrics: 'Test Accuracy: 86.8% | ROC-AUC: 0.912',
      github: 'https://github.com/Mansehaj12/GameIQ'
    },
    {
      title: 'Robust Weather & Environmental Dashboard',
      subtitle: 'Asynchronous API Tracker',
      desc: 'Developed a responsive weather dashboard fetching environmental metrics via REST API. Engineered robust data validations and input cache mechanisms using localStorage to preserve state queries and prevent runtime exceptions.',
      tech: ['JavaScript', 'REST APIs', 'OpenWeather API', 'HTML5/CSS3', 'Local Storage'],
      metrics: 'API latency: <100ms | Input-guard verified',
      github: 'https://github.com/Mansehaj12/weather-dashboard'
    },
    {
      title: 'Real-Time Financial Converter Engine',
      subtitle: 'Financial Data Analytics',
      desc: 'Engineered a highly responsive web application utilizing exchange rate APIs to execute currency conversions across 150+ international assets in real-time.',
      tech: ['JavaScript', 'ExchangeRate API', 'HTML/CSS', 'DOM Scripting'],
      metrics: 'Assets Tracked: 150+ Currencies | Precision: 4 decimals',
      github: 'https://github.com/Mansehaj12/currency-converter'
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 sm:px-12 bg-white dark:bg-zinc-950 font-sans border-b border-slate-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Header (Spans 4 columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 inline-block">
            Portfolio
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
            A verified catalog of my full-stack utilities, automated industrial telemetry simulators, and machine learning pipelines.
          </p>
        </div>

        {/* Right Side: Flat Cards Grid (Spans 8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {projects.map((p, idx) => (
              <GlassCard 
                key={idx} 
                className="hover:-translate-y-1 transition-all border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-400 font-bold">
                      {p.subtitle}
                    </span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                      {p.metrics}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-black dark:text-white leading-tight">
                    {p.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-500 dark:text-zinc-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-900 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap gap-1">
                    {p.tech.map((t, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 text-[8px] font-mono leading-none"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider font-bold text-neutral-800 dark:text-zinc-300 hover:text-indigo-600 transition-colors"
                  >
                    <Github size={12} /> Source Code
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
