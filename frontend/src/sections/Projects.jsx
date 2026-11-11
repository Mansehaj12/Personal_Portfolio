import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Sparkles, ChevronDown, ChevronUp, Layers, Eye, Cpu, ExternalLink, Briefcase, Activity, Binary, Terminal, Code2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ProjectModal from '../components/ProjectModal';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedMap, setExpandedMap] = useState({});
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  // When category filter changes or a card expands, immediately inform Lenis to re-measure page dimensions
  useEffect(() => {
    if (window.lenis) {
      window.lenis.resize();
      window.lenis.start();
    }
    const timer = setTimeout(() => {
      if (window.lenis) {
        window.lenis.resize();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory, expandedMap]);

  const toggleExpand = (e, id) => {
    e.stopPropagation();
    setExpandedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openModal = (project) => {
    setSelectedModalProject(project);
  };

  const categories = [
    {
      id: 'ai_autonomous',
      num: '01',
      title: 'AI, Computer Vision & Autonomous Systems',
      subtitle: 'Neural network perception pipelines, predictive ML models, and intelligent algorithmic engines.',
      tag: 'Machine Learning',
      icon: Binary
    },
    {
      id: 'commercial_fullstack',
      num: '02',
      title: 'Production & Commercial Client Products',
      subtitle: 'Installable Progressive Web Apps, e-commerce ordering engines, and SaaS portals shipped to real clients.',
      tag: 'Client Software',
      icon: Briefcase
    },
    {
      id: 'data_systems',
      num: '03',
      title: 'Data Telemetry & Systems Utilities',
      subtitle: 'Industrial equipment sensor simulators, financial exchange rate trackers, and asynchronous API dashboards.',
      tag: 'Data & Telemetry',
      icon: Activity
    }
  ];

  const projects = [
    // -------------------------------------------------------------
    // CATEGORY 1: AI, COMPUTER VISION & AUTONOMOUS SYSTEMS
    // -------------------------------------------------------------
    {
      id: 'capstone-odd',
      category: 'ai_autonomous',
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
      id: 'careerlens',
      category: 'ai_autonomous',
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
      id: 'gameiq',
      category: 'ai_autonomous',
      title: 'GameIQ: Player Behavior Analytics Platform',
      subtitle: 'Data Science & Machine Learning Churn Pipeline',
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
      id: 'medismart',
      category: 'ai_autonomous',
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

    // -------------------------------------------------------------
    // CATEGORY 2: PRODUCTION & COMMERCIAL CLIENT PRODUCTS
    // -------------------------------------------------------------
    {
      id: 'divine-cafe',
      category: 'commercial_fullstack',
      title: 'Divine Cafe — "You Are What You Eat"',
      subtitle: 'Commercial PWA & 1-Tap WhatsApp Ordering',
      isClient: true,
      desc: 'Engineered and deployed an installable Progressive Web App (PWA) for Divine Cafe (Baradari Garden, Patiala). Features a full-screen native mobile feel with offline caching, an interactive 52-dish pure vegetarian digital menu across 13 categories, 1-tap WhatsApp order compilation with Dine-In vs. Takeaway toggles, and localStorage-driven 1-tap past order reordering.',
      tech: ['React.js', 'PWA / Service Worker', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Web App Manifest'],
      metrics: '100% PWA Installable | 52+ Dishes | WhatsApp Dispatch',
      github: 'https://github.com/Mansehaj12/Divine_Cafe',
      liveLink: 'https://divinecafe-plum.vercel.app/',
      architecture: [
        {
          name: 'Layer 1: PWA Engine & Service Worker Offline Caching',
          details: 'Zero app-store friction, standalone full-screen mobile UX with custom installation prompts for iOS and Android.'
        },
        {
          name: 'Layer 2: 1-Tap WhatsApp Order Compiler',
          details: 'Parses selected items, quantities, special instructions, and table/dine-in status directly into structured WhatsApp messages.'
        },
        {
          name: 'Layer 3: Interactive 52-Dish Categorized Catalog',
          details: 'Fast category filtering across 13 food categories with instant price calculation.'
        },
        {
          name: 'Layer 4: LocalStorage 1-Tap Quick Reorder',
          details: 'Caches order history locally, allowing repeat customers to reorder favorite meals with a single tap.'
        }
      ]
    },
    {
      id: 'home-delight',
      category: 'commercial_fullstack',
      title: 'The Home Delight Bakery — Festive Hamper Catalogue',
      subtitle: 'Commercial E-Commerce & WhatsApp Dispatch Engine',
      isClient: true,
      desc: 'Designed and developed a festive digital catalogue and customer ordering platform for The Home Delight Bakery (Patiala). Engineered dynamic price-tier filtering, product packaging variant selections (500g vs 1kg boxes), corporate bulk gifting inquiry flows, and an automated scannable high-res QR code generator for physical packaging prints.',
      tech: ['React.js', 'Tailwind CSS', 'Vite', 'QRCode.js', 'Canvas Confetti', 'Framer Motion'],
      metrics: 'Price-Tier Filtering (₹200–₹1,800) | QR Generator | Bulk Gifting Engine',
      github: 'https://github.com/Mansehaj12/the-home-delight-bakery',
      liveLink: 'https://the-home-delight-bakery.vercel.app/',
      architecture: [
        {
          name: 'Module 1: Multi-Tier Hamper Catalogue & Price Filtering',
          details: 'Interactive tab filters from Under ₹500 to Above ₹1,500 with ascending/descending sort.'
        },
        {
          name: 'Module 2: Product Detail Modal & Custom Variant Engine',
          details: 'Interactive weight variant toggling, quantity counter, and delivery/pickup preferences.'
        },
        {
          name: 'Module 3: Corporate Bulk Gifting Inquiry Pipeline',
          details: 'Structured multi-field corporate ordering form with instant WhatsApp dispatch fallback.'
        },
        {
          name: 'Module 4: Scannable QR Code Print Studio',
          details: 'Client-side high-res maroon QR code generator for printing directly onto gift tags and box sleeves.'
        }
      ]
    },
    {
      id: 'flawlesstips',
      category: 'commercial_fullstack',
      title: 'FlawlessTips by MK — Luxury Nail Studio & Booking Portal',
      subtitle: 'Full-Stack E-Commerce & Service Booking SaaS',
      isClient: true,
      desc: 'Engineered a full-stack web application for FlawlessTips by MK, a luxury nail artistry studio. Built an appointment booking flow with service categorization, custom press-on nail e-commerce catalog with cart & checkout, Firebase user authentication, Prisma ORM database models, and an integrated staff/admin dashboard with Recharts analytics.',
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'Firebase Auth', 'Tailwind CSS', 'Recharts'],
      metrics: 'Full-Stack Booking SaaS | Firebase Auth | Prisma ORM',
      architecture: [
        {
          name: 'Module 1: Service Booking & Customization Engine',
          details: 'Service selection with time slots, duration estimates, and live price computation for gel polish, extensions, and custom adornments.'
        },
        {
          name: 'Module 2: Press-On Nail E-Commerce & Shopping Cart',
          details: 'Product showcase with custom size selectors, cart context, and order management.'
        },
        {
          name: 'Module 3: Firebase Auth & Role-Based Access Control',
          details: 'Integrated client authentication, customer profile management, and protected staff/admin portals.'
        },
        {
          name: 'Module 4: Admin Dashboard & Telemetry Analytics',
          details: 'Recharts analytics tracking bookings, revenue metrics, and appointment schedules.'
        }
      ]
    },

    // -------------------------------------------------------------
    // CATEGORY 3: DATA SYSTEMS, TELEMETRY & WEB UTILITIES
    // -------------------------------------------------------------
    {
      id: 'powermro',
      category: 'data_systems',
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
      id: 'weather-dashboard',
      category: 'data_systems',
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
      id: 'financial-converter',
      category: 'data_systems',
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

  const filteredCategories = selectedCategory === 'all'
    ? categories
    : categories.filter(c => c.id === selectedCategory);

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 bg-transparent font-sans border-b border-[rgba(17,17,16,0.1)] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[rgba(17,17,16,0.1)]">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#6B6862] tracking-wider uppercase">
              [ 01 // SELECTED WORK & PROJECTS ]
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111110]">
              Selected Works & <br />
              <span className="serif-i text-4xl sm:text-5xl lg:text-6xl text-[#111110]">
                Deployments
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed max-w-xl">
              Organized into three specialized domains: AI & Autonomous Systems, Commercial Client Products, and Real-Time Data Telemetry.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-[#111110] text-[#F2EFE9] shadow-2xs'
                  : 'bg-white border border-[rgba(17,17,16,0.12)] text-[#111110] hover:border-[#111110]'
              }`}
            >
              <span>All Projects</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === 'all' ? 'bg-white/20' : 'bg-[#F2EFE9]'
              }`}>
                {projects.length}
              </span>
            </button>

            {categories.map((cat) => {
              const count = projects.filter(p => p.category === cat.id).length;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#111110] text-[#F2EFE9] shadow-2xs'
                      : 'bg-white border border-[rgba(17,17,16,0.12)] text-[#111110] hover:border-[#111110]'
                  }`}
                >
                  <span>{cat.tag}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20' : 'bg-[#F2EFE9]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-16">
          {filteredCategories.map((cat) => {
            const categoryProjects = projects.filter(p => p.category === cat.id);
            const Icon = cat.icon;

            return (
              <div key={cat.id} className="space-y-6">
                
                {/* Category Sub-Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[rgba(17,17,16,0.08)]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#F97316] tracking-wider uppercase">
                        // SECTION {cat.num}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111110]/30" />
                      <span className="font-mono text-[10px] text-[#6B6862] uppercase tracking-wider">
                        {categoryProjects.length} Projects
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111110] flex items-center gap-2">
                      <Icon size={18} className="text-[#F97316]" />
                      <span>{cat.title}</span>
                    </h3>
                    <p className="text-xs text-[#6B6862]">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Grid for this Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryProjects.map((p) => {
                    const isExpanded = !!expandedMap[p.id];
                    return (
                      <div
                        key={p.id}
                        className={p.isCapstone ? "md:col-span-2" : "md:col-span-1"}
                      >
                        <GlassCard 
                          onClick={() => openModal(p)}
                          className={`cursor-pointer p-5 sm:p-6 flex flex-col justify-between select-none group bg-white transition-all hover:shadow-xs ${
                            p.isCapstone 
                              ? 'border-[#111110] bg-[#FAF8F5] shadow-2xs hover:border-[#111110]' 
                              : 'border-[rgba(17,17,16,0.12)] hover:border-[#111110]'
                          }`}
                        >
                          <div className="space-y-3">
                            {/* Badges and Metrics */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                {p.isCapstone && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-[#111110] text-[#F2EFE9]">
                                    <Sparkles size={10} className="text-[#F97316]" /> Capstone
                                  </span>
                                )}
                                {p.isClient && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-[#F2EFE9] text-[#111110] border border-[rgba(17,17,16,0.12)]">
                                    <Briefcase size={10} className="text-[#F97316]" /> Client Product
                                  </span>
                                )}
                                <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B6862] font-semibold">
                                  {p.subtitle}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#111110] font-mono font-semibold">
                                {p.metrics}
                              </span>
                            </div>
                            
                            {/* Title */}
                            <h4 className="text-base sm:text-lg font-bold text-[#111110] leading-snug flex items-start justify-between gap-2 group-hover:text-[#F97316] transition-colors">
                              <span>{p.title}</span>
                              <button 
                                onClick={(e) => toggleExpand(e, p.id)}
                                className="p-1 rounded-md text-[#6B6862] hover:text-[#111110] hover:bg-[#F2EFE9] shrink-0 mt-0.5 transition-colors cursor-pointer"
                                title="Toggle quick details"
                              >
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </h4>

                            {/* Tech Chips */}
                            {!isExpanded && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {p.tech.slice(0, 5).map((t, tIdx) => (
                                  <span 
                                    key={tIdx} 
                                    className="px-2 py-0.5 rounded bg-[#F2EFE9] border border-[rgba(17,17,16,0.08)] text-[#111110] text-[9px] font-mono leading-none"
                                  >
                                    {t}
                                  </span>
                                ))}
                                {p.tech.length > 5 && (
                                  <span className="px-1.5 py-0.5 text-[#6B6862] text-[9px] font-mono">
                                    +{p.tech.length - 5}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Description preview */}
                            <p className="text-xs text-[#6B6862] leading-relaxed line-clamp-2">
                              {p.desc}
                            </p>
                          </div>

                          {/* Action Footer */}
                          <div className="pt-4 mt-4 border-t border-[rgba(17,17,16,0.08)] flex items-center justify-between">
                            <button
                              onClick={() => openModal(p)}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#111110] hover:text-[#F97316] transition-colors cursor-pointer"
                            >
                              <Eye size={13} />
                              <span>Inspect Architecture</span>
                            </button>

                            <div className="flex items-center gap-2">
                              {p.liveLink && (
                                <a
                                  href={p.liveLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors text-[10px] uppercase font-mono font-bold"
                                >
                                  <ExternalLink size={11} /> Live Demo
                                </a>
                              )}
                              {p.github && (
                                <a
                                  href={p.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1.5 rounded-md bg-[#F2EFE9] hover:bg-[#111110] hover:text-white text-[#6B6862] transition-colors"
                                  title="View GitHub Repository"
                                >
                                  <Github size={13} />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Expandable Inline Details */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="pt-4 mt-4 border-t border-[rgba(17,17,16,0.08)] space-y-3">
                                  {p.architecture && (
                                    <div className="space-y-1.5 pt-1">
                                      <span className="text-[10px] uppercase font-mono font-bold text-[#6B6862] flex items-center gap-1">
                                        <Cpu size={12} className="text-[#F97316]" /> Key Pipeline Steps:
                                      </span>
                                      <div className="space-y-1 pl-2 border-l border-[#F97316]">
                                        {p.architecture.map((arch, aIdx) => (
                                          <div key={aIdx} className="text-[11px] text-[#6B6862]">
                                            <strong className="text-[#111110] font-mono text-[10px]">{arch.name}:</strong> {arch.details}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex flex-wrap gap-1 pt-1">
                                    {p.tech.map((t, tIdx) => (
                                      <span 
                                        key={tIdx} 
                                        className="px-2 py-0.5 rounded bg-[#F2EFE9] text-[#111110] text-[9px] font-mono"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="pt-2 flex items-center justify-between">
                                    <button
                                      onClick={() => openModal(p)}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111110] text-white text-[10px] uppercase font-mono tracking-wider font-bold hover:bg-neutral-800 transition-colors shadow-2xs"
                                    >
                                      <Eye size={12} /> Open Full Modal
                                    </button>

                                    <span 
                                      onClick={(e) => toggleExpand(e, p.id)}
                                      className="text-[10px] text-[#6B6862] hover:text-[#111110] font-mono cursor-pointer"
                                    >
                                      Collapse ▲
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </GlassCard>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Full Architecture & Project Details Modal */}
      {selectedModalProject && (
        <ProjectModal 
          project={selectedModalProject} 
          onClose={() => setSelectedModalProject(null)} 
        />
      )}
    </section>
  );
}
