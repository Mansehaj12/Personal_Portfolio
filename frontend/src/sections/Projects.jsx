import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Sparkles, ChevronDown, ChevronUp, Layers, Eye, Cpu } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ProjectModal from '../components/ProjectModal';

export default function Projects() {
  const [expandedMap, setExpandedMap] = useState({});
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  const toggleExpand = (e, idx) => {
    e.stopPropagation();
    setExpandedMap(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const openModal = (project) => {
    setSelectedModalProject(project);
  };

  const projects = [
    {
      title: 'Scenario-Based ODD Safety Framework for Automation in Indian Road Environments',
      subtitle: 'Autonomous Vehicle Vision & Dynamic ODD Engine',
      isCapstone: true,
      desc: 'Engineered an end-to-end perception-to-action safety pipeline for autonomous vehicles on Indian road environments using IDD-Lite. Integrates PyTorch SegNet semantic segmentation (with AMP & CUDA acceleration), YOLOv8 object detection, GPU weather perturbation engines, and an interactive Leaflet.js dynamic road-map dashboard calculating real-time 18-feature Operational Design Domain (ODD) safety metrics and SAE Level 3 disengagement rules.',
      tech: ['PyTorch', 'SegNet', 'YOLOv8', 'Python', 'OpenCV', 'CARLA', 'Leaflet.js', 'GeoJSON', 'Scikit-learn'],
      metrics: '350+ False Alarms Reduced | 2x GPU AMP Speed | SAE L1-L3 ODD Engine',
      github: 'https://github.com/Mansehaj12/capstone-odd-safety-framework',
      architecture: [
        {
          name: 'Layer 1: Semantic Segmentation & Object Detection',
          details: 'Deep 3-layer SegNet encoder-decoder model with Batch Normalization & PyTorch AMP CUDA acceleration paired with YOLOv8 object detection on IDD-Lite dataset.'
        },
        {
          name: 'Layer 2: GPU Weather & Perturbation Simulation Engine',
          details: 'Real-time GPU tensor transformations simulating radial fog (T(x) = e^(-δ_ec·d(x))), camera contrast drops, heavy rain, and noise interference.'
        },
        {
          name: 'Layer 3: 18-Feature ODD Parameter Extraction',
          details: 'Real-time extraction of drivable road area, pothole density, wetness, traffic density, and camera confidence levels.'
        },
        {
          name: 'Layer 4: SAE Level 3 Dynamic ODD Scoring Engine',
          details: 'Evaluates score thresholds (L3 Green ≥70, L2 Orange 40-69, L1 Red <40) and triggers RTI fallback disengagement alerts. Reduced disengagement false alarms by 350+ count.'
        },
        {
          name: 'Layer 5: Interactive Road Map Dashboard',
          details: 'Spatial cluster visualization on Leaflet.js with OSM GeoJSON road network updating automation status dynamically.'
        }
      ]
    },
    {
      title: 'CareerLens: AI-Powered Job Market Intelligence & Placement Analytics',
      subtitle: 'Data Engineering & Predictive ML SaaS',
      desc: 'Engineered an end-to-end job market intelligence and predictive placement SaaS. Features a Ridge Regression engine for real-time salary estimation, an NLP-based PDF resume skill gap analyzer, and a Decision Tree classifier trained on 5,000+ academic profiles to simulate student placement probabilities in real-time.',
      tech: ['React.js', 'Flask', 'Python', 'Scikit-learn', 'Tailwind CSS', 'Recharts', 'SQLite'],
      metrics: 'ETL: 52k jobs | Salary RMSE: ~$24k',
      github: 'https://github.com/Mansehaj12/careerlens-placement-platform',
      architecture: [
        {
          name: 'Module 1: Job Scraping & ETL Data Pipeline',
          details: 'Automated scrapers ingesting 52,000+ live market listings into normalized SQLite database schemas.'
        },
        {
          name: 'Module 2: Salary Estimation ML Engine',
          details: 'Ridge Regression predictive engine with feature scaling & cross-validation (Salary RMSE ~$24k).'
        },
        {
          name: 'Module 3: NLP Resume Skill Gap Analyzer',
          details: 'PyMuPDF skill extractor mapping candidate PDF resumes against real-time job requirement vectors.'
        },
        {
          name: 'Module 4: Student Placement Simulator',
          details: 'Decision Tree classifier trained on 5,000+ academic profiles with real-time what-if scenario dials.'
        }
      ]
    },
    {
      title: 'MediSmart: AI-Assisted E-Pharmacy & Generic Swap Portal',
      subtitle: 'Client-Side AI & Healthcare Tech',
      desc: 'Engineered a client-side AI-assisted e-pharmacy platform featuring a generic medicine substitution engine to swap brand-name drugs for bio-equivalents, saving up to 80%. Integrated a client-side OCR prescription scanner using Tesseract.js and structured dynamic Recharts-powered spend analytics.',
      tech: ['React.js', 'Tesseract.js', 'Recharts', 'React Router', 'CSS Variables', 'Vite'],
      metrics: 'Cost Savings: up to 80% | OCR speed: <3s',
      github: 'https://github.com/Mansehaj12/Medismart',
      architecture: [
        {
          name: 'Module 1: Client-Side OCR Prescription Scanner',
          details: 'Tesseract.js OCR engine reading dosage and chemical names directly in browser in under 3 seconds.'
        },
        {
          name: 'Module 2: Bio-Equivalent Generic Substitution Engine',
          details: 'Matches high-cost brand-name drugs against bio-equivalent generic compounds, reducing costs by up to 80%.'
        },
        {
          name: 'Module 3: Spend Analytics Dashboard',
          details: 'Dynamic Recharts visualization tracking user health savings and monthly budget allocations.'
        }
      ]
    },
    {
      title: 'PowerMRO: Telemetry Simulation & Health Dashboard',
      subtitle: 'Industrial Equipment Telemetry',
      desc: 'Designed and developed a simulation platform mimicking enterprise-level control room dashboards. Engineered a real-time telemetry engine simulating live sensor data (temp, vibration) and calculated Remaining Useful Life (RUL) using failure interval variables.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'React Hooks', 'Vercel'],
      metrics: 'Telemetry frequency: 10 streams/sec | latency: <15ms',
      github: 'https://github.com/Mansehaj12/PowerMRO',
      architecture: [
        {
          name: 'Module 1: High-Frequency Telemetry Generator',
          details: 'Real-time telemetry stream generating 10 sensor channels/sec (temperature, vibration, pressure) at <15ms latency.'
        },
        {
          name: 'Module 2: Remaining Useful Life (RUL) Estimator',
          details: 'Mathematical failure-rate degradation model calculating maintenance intervals.'
        },
        {
          name: 'Module 3: Enterprise Control Room UI',
          details: 'Built with Next.js, TypeScript, Tailwind CSS, and custom Recharts gauge meters.'
        }
      ]
    },
    {
      title: 'GameIQ: Player Behavior Analytics Platform',
      subtitle: 'Data Science & Machine Learning',
      desc: 'Built an end-to-end Machine Learning pipeline to predict user churn using a mobile gamer log database of 90,000+ players. Integrated features capturing milestones, deployed a Random Forest model, and hosted it behind a Flask REST API and React dashboard.',
      tech: ['Python', 'Flask', 'Scikit-learn', 'Random Forest', 'Pandas & NumPy', 'Node.js'],
      metrics: 'Test Accuracy: 86.8% | ROC-AUC: 0.912',
      github: 'https://github.com/Mansehaj12/GameIQ-Player-Churn-Prediction',
      architecture: [
        {
          name: 'Module 1: Gamer Session Log Pipeline',
          details: 'ETL processing engine ingesting 90,000+ player session logs and milestone achievements.'
        },
        {
          name: 'Module 2: Churn Prediction ML Model',
          details: 'Deployed Random Forest Classifier achieving 86.8% accuracy and 0.912 ROC-AUC score.'
        },
        {
          name: 'Module 3: Flask REST API & Analytics Dashboard',
          details: 'Python Flask backend serving inference endpoints to a React dashboard.'
        }
      ]
    },
    {
      title: 'Robust Weather & Environmental Dashboard',
      subtitle: 'Asynchronous API Tracker',
      desc: 'Developed a responsive weather dashboard fetching environmental metrics via REST API. Engineered robust data validations and input cache mechanisms using localStorage to preserve state queries and prevent runtime exceptions.',
      tech: ['JavaScript', 'REST APIs', 'OpenWeather API', 'HTML5/CSS3', 'Local Storage'],
      metrics: 'API latency: <100ms | Input-guard verified',
      github: 'https://github.com/Mansehaj12/weather-web-dashboard',
      architecture: [
        {
          name: 'Module 1: Async REST API Data Ingestion',
          details: 'Fetches real-time weather and pollution metrics from OpenWeather REST API (<100ms response time).'
        },
        {
          name: 'Module 2: Input Guard & Caching Layer',
          details: 'Validation logic preventing runtime exceptions and caching query results in localStorage.'
        }
      ]
    },
    {
      title: 'Real-Time Financial Converter Engine',
      subtitle: 'Financial Data Analytics',
      desc: 'Engineered a highly responsive web application utilizing exchange rate APIs to execute currency conversions across 150+ international assets in real-time.',
      tech: ['JavaScript', 'ExchangeRate API', 'HTML/CSS', 'DOM Scripting'],
      metrics: 'Assets Tracked: 150+ Currencies | Precision: 4 decimals',
      github: 'https://github.com/Mansehaj12/currency-converter',
      architecture: [
        {
          name: 'Module 1: Live FX Rate Pipeline',
          details: 'Ingests live exchange rates across 150+ international assets with 4-decimal precision.'
        },
        {
          name: 'Module 2: DOM Scripting & State Engine',
          details: 'Lightweight Vanilla JavaScript state manager for instant conversion calculation.'
        }
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 16
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-6 sm:px-12 bg-white dark:bg-zinc-950 font-sans border-b border-slate-100 dark:border-zinc-900">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        
        {/* Left Side: Header */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 inline-block">
            Portfolio
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
            A verified catalog of my full-stack utilities, automated industrial telemetry simulators, and machine learning pipelines.
          </p>
          <div className="pt-2 flex items-center gap-2 text-neutral-400 dark:text-zinc-500 text-[11px] font-mono">
            <Layers size={14} className="text-indigo-500 shrink-0" />
            <span>Click any project card to view full architecture & source code.</span>
          </div>
        </div>

        {/* Right Side: 2-Column Compact Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p, idx) => {
              const isExpanded = !!expandedMap[idx];
              return (
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  key={idx}
                  className={p.isCapstone ? "md:col-span-2" : "md:col-span-1"}
                >
                  <GlassCard 
                    onClick={() => openModal(p)}
                    className={`cursor-pointer transition-all duration-300 border p-5 flex flex-col justify-between select-none group ${
                      p.isCapstone 
                        ? 'border-indigo-500/40 dark:border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent dark:bg-zinc-950 shadow-md hover:border-indigo-500 hover:shadow-indigo-500/10' 
                        : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-indigo-500/50 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-2.5">
                      {/* Subtitle & Badge & Metrics */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {p.isCapstone && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                              <Sparkles size={10} className="text-indigo-500 animate-pulse" /> Capstone Project
                            </span>
                          )}
                          <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-400 font-bold">
                            {p.subtitle}
                          </span>
                        </div>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                          {p.metrics}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-sm font-bold text-black dark:text-white leading-snug flex items-start justify-between gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <span>{p.title}</span>
                        <span 
                          onClick={(e) => toggleExpand(e, idx)}
                          className="p-1 rounded text-neutral-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 shrink-0 mt-0.5 transition-colors"
                          title="Toggle inline expansion"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </h3>

                      {/* Tech Chips (Compact View shows first 4 tags) */}
                      {!isExpanded && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {p.tech.slice(0, 4).map((t, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 text-[8px] font-mono leading-none"
                            >
                              {t}
                            </span>
                          ))}
                          {p.tech.length > 4 && (
                            <span className="px-1 py-0.5 text-neutral-400 text-[8px] font-mono">
                              +{p.tech.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* View Full Architecture Link */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100/60 dark:border-zinc-900/60">
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          <Eye size={12} /> View Full Architecture & Details
                        </span>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[10px] uppercase font-mono font-bold text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <Github size={11} /> Code
                        </a>
                      </div>
                    </div>

                    {/* Expandable Inline Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-zinc-900 space-y-3">
                            <p className="text-xs text-neutral-600 dark:text-zinc-300 leading-relaxed">
                              {p.desc}
                            </p>

                            {/* Architecture Steps Summary */}
                            {p.architecture && (
                              <div className="space-y-1.5 pt-1">
                                <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 flex items-center gap-1">
                                  <Cpu size={12} className="text-indigo-500" /> Key Architecture Steps:
                                </span>
                                <div className="space-y-1 pl-2 border-l-2 border-indigo-500/30">
                                  {p.architecture.map((arch, aIdx) => (
                                    <div key={aIdx} className="text-[11px] text-neutral-600 dark:text-zinc-300">
                                      <strong className="text-black dark:text-white font-mono text-[10px]">{arch.name}:</strong> {arch.details}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-1 pt-1">
                              {p.tech.map((t, tIdx) => (
                                <span 
                                  key={tIdx} 
                                  className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[8px] font-mono font-medium leading-none"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                              <button
                                onClick={() => openModal(p)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 text-white text-[10px] uppercase font-mono tracking-wider font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                              >
                                <Eye size={12} /> Open Full Architecture Modal
                              </button>

                              <span 
                                onClick={(e) => toggleExpand(e, idx)}
                                className="text-[10px] text-neutral-400 hover:text-black dark:hover:text-white font-mono cursor-pointer"
                              >
                                Collapse ▲
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

      </motion.div>

      {/* Full Architecture & Project Details Modal */}
      <ProjectModal 
        project={selectedModalProject} 
        onClose={() => setSelectedModalProject(null)} 
      />
    </section>
  );
}
