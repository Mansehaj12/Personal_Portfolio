import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, ShieldCheck, Eye, ExternalLink, Download, X, ArrowUpRight, Search, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

export default function Achievements() {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const [vaultCategory, setVaultCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Close on ESC and pause smooth scroll when modals open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeCert) {
          setActiveCert(null);
        } else if (isVaultOpen) {
          setIsVaultOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCert, isVaultOpen]);

  useEffect(() => {
    if (isVaultOpen || activeCert) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (window.lenis) window.lenis.start();
    }
  }, [isVaultOpen, activeCert]);

  const categories = [
    { id: 'all', label: 'All Credentials', count: 18 },
    { id: 'ai_dl', label: 'AI & Deep Learning', count: 6 },
    { id: 'data_science', label: 'Data Science & ML', count: 6 },
    { id: 'big_data', label: 'Big Data & Cloud', count: 6 }
  ];

  // All 18 verified certificates
  const credentials = [
    // --- AI & DEEP LEARNING ---
    {
      id: 'nvidia-dli',
      title: 'Building Deep Learning & Neural Network Models',
      issuer: 'NVIDIA Deep Learning Institute (DLI)',
      category: 'ai_dl',
      badgeText: 'NVIDIA DLI',
      file: '/certificates/Coursera NVIDIA.pdf',
      desc: 'Certified competence in training deep neural networks from scratch, transfer learning, GPU acceleration, and deploying computer vision and NLP neural architectures.',
      date: 'NVIDIA Certified'
    },
    {
      id: 'ibm-genai-foundations',
      title: 'Generative AI Foundation Models & Platforms',
      issuer: 'IBM / Coursera',
      category: 'ai_dl',
      badgeText: 'IBM GenAI',
      file: '/certificates/Coursera_Generative AI Foundation Models and Platforms.pdf',
      desc: 'Mastery over transformer architectures, prompt engineering, fine-tuning LLMs, and deploying enterprise GenAI solution pipelines.',
      date: 'IBM Certified'
    },
    {
      id: 'ibm-genai-intro',
      title: 'Generative AI: Introduction & Applications',
      issuer: 'IBM / Coursera',
      category: 'ai_dl',
      badgeText: 'GenAI Apps',
      file: '/certificates/Generative AI Introduction and Applications.pdf',
      desc: 'Applied generative AI workflows, GAN architectures, latent diffusion models, and real-world application integration.',
      date: 'IBM Certified'
    },
    {
      id: 'openai-recommender',
      title: 'Product Recommender System with OpenAI Embeddings',
      issuer: 'Coursera Project Network',
      category: 'ai_dl',
      badgeText: 'OpenAI & RecSys',
      file: '/certificates/Coursera Product Recommender System OpenAI Text.pdf',
      desc: 'Architected semantic text vector search and personalized recommendation engines leveraging OpenAI text embedding APIs.',
      date: 'Coursera Verified'
    },
    {
      id: 'keras-multitask',
      title: 'Creating Multi-Task Models with Keras & TensorFlow',
      issuer: 'Coursera Project Network',
      category: 'ai_dl',
      badgeText: 'Keras & TF',
      file: '/certificates/Coursera Creating Multi Task Models With Keras.pdf',
      desc: 'Built multi-output neural network architectures with shared representation layers for multi-objective deep learning prediction tasks.',
      date: 'Coursera Verified'
    },
    {
      id: 'covid-pytorch',
      title: 'COVID-19 Detection with Chest X-Ray & PyTorch',
      issuer: 'Coursera Project Network',
      category: 'ai_dl',
      badgeText: 'PyTorch & Medical AI',
      file: '/certificates/Coursera Detecting COVID-19 with Chest X-Ray using PyTorch.pdf',
      desc: 'Trained ResNet Convolutional Neural Networks on medical radiograph imaging datasets for automated clinical diagnosis screening.',
      date: 'Coursera Verified'
    },

    // --- DATA SCIENCE & ML ---
    {
      id: 'deloitte-data-analysis',
      title: 'Deloitte Data Analytics Virtual Internship',
      issuer: 'Deloitte (Forage)',
      category: 'data_science',
      badgeText: 'Deloitte Certified',
      file: '/certificates/Delloite_Data_analysis_completion_certificate.pdf',
      desc: 'Completed enterprise analytics simulations focusing on client dataset telemetry, statistical anomaly detection, data quality auditing, and executive reporting.',
      date: 'Deloitte Verified'
    },
    {
      id: 'pyspark-ml',
      title: 'Machine Learning & Big Data with PySpark',
      issuer: 'Coursera Project Network',
      category: 'data_science',
      badgeText: 'PySpark & ML',
      file: '/certificates/Machine Learning with PySpark.pdf',
      desc: 'Distributed machine learning pipelines, feature transformations, and scalable classification/regression models using Apache Spark MLlib.',
      date: 'Coursera Verified'
    },
    {
      id: 'data-analysis-python',
      title: 'Data Analysis with Python',
      issuer: 'IBM / Coursera',
      category: 'data_science',
      badgeText: 'Python Analytics',
      file: '/certificates/Coursera Data Analysis in Python.pdf',
      desc: 'Exploratory data analysis (EDA), hypothesis testing, model evaluation, and predictive modeling using NumPy, Pandas, and SciPy.',
      date: 'IBM Certified'
    },
    {
      id: 'pandas-mastery',
      title: 'Mastering Data Analysis in Pandas',
      issuer: 'Coursera Project Network',
      category: 'data_science',
      badgeText: 'Pandas Expert',
      file: '/certificates/Coursera Mastering Data Analysis in Pandas.pdf',
      desc: 'Advanced vectorization, high-performance DataFrames, multi-indexing, custom aggregation transformations, and memory optimization.',
      date: 'Coursera Verified'
    },
    {
      id: 'pandas-learning-path',
      title: 'Master Data Analysis with Pandas Learning Path',
      issuer: 'Coursera Project Network',
      category: 'data_science',
      badgeText: 'Pandas Path',
      file: '/certificates/Coursera Master Data Analysis with Pandas Learning Path 1.pdf',
      desc: 'Comprehensive specialization in raw data wrangling, missing data imputation, and automated data cleansing workflows.',
      date: 'Coursera Verified'
    },
    {
      id: 'linear-regression',
      title: 'Linear Regression with Python',
      issuer: 'Coursera Project Network',
      category: 'data_science',
      badgeText: 'Statistical ML',
      file: '/certificates/Linear Regression with Python.pdf',
      desc: 'Ordinary least squares (OLS), gradient descent optimization, multicollinearity diagnostics, and predictive residual analysis.',
      date: 'Coursera Verified'
    },

    // --- BIG DATA & CLOUD ---
    {
      id: 'bigquery-cloud',
      title: 'Working with Google Cloud BigQuery',
      issuer: 'Google Cloud / Coursera',
      category: 'big_data',
      badgeText: 'GCP BigQuery',
      file: '/certificates/Coursera Worling with Big Query.pdf',
      desc: 'Enterprise SQL querying over petabyte-scale data lakes, partitioned tables, and serverless cloud data warehouse optimization.',
      date: 'Google Cloud'
    },
    {
      id: 'sql-data-manipulation',
      title: 'Manipulating Data with SQL',
      issuer: 'Coursera Project Network',
      category: 'big_data',
      badgeText: 'SQL Database',
      file: '/certificates/Coursera Manipulating Data with SQL.pdf',
      desc: 'Complex relational database queries, window functions, CTEs, indexing performance tuning, and schema design.',
      date: 'Coursera Verified'
    },
    {
      id: 'google-analytics',
      title: 'Getting Started with Google Analytics',
      issuer: 'Google / Coursera',
      category: 'big_data',
      badgeText: 'Google Analytics',
      file: '/certificates/Coursera getting started with google analytics.pdf',
      desc: 'Digital audience telemetry, event attribution modeling, web conversion funnels, and real-time dashboard analytics.',
      date: 'Google Certified'
    },
    {
      id: 'data-visualization',
      title: 'Overview of Data Visualization',
      issuer: 'Coursera Project Network',
      category: 'big_data',
      badgeText: 'Data Viz',
      file: '/certificates/Coursera Overview of Data Visualization.pdf',
      desc: 'Human visual perception principles, interactive storytelling with Matplotlib/Seaborn, and dashboard layout architecture.',
      date: 'Coursera Verified'
    },
    {
      id: 'investment-risk',
      title: 'Investment Risk Management Analytics',
      issuer: 'Coursera Project Network',
      category: 'big_data',
      badgeText: 'Financial AI',
      file: '/certificates/Coursera Investment risk Management.pdf',
      desc: 'Quantitative risk metrics, Value at Risk (VaR), portfolio volatility simulations, and financial time-series modeling.',
      date: 'Coursera Verified'
    },
    {
      id: 'coursera-verification',
      title: 'Coursera Professional Verification Certificate',
      issuer: 'Coursera International',
      category: 'big_data',
      badgeText: 'Verified Identity',
      file: '/certificates/Coursera ICYMSUBQW51S.pdf',
      desc: 'Verified institutional identity and academic integrity record across online specialization coursework.',
      date: 'Coursera Verified'
    }
  ];

  // Top 4 curated highlight certificates displayed on the page
  const highlightCerts = [
    credentials.find((c) => c.id === 'nvidia-dli'),
    credentials.find((c) => c.id === 'ibm-genai-foundations'),
    credentials.find((c) => c.id === 'deloitte-data-analysis'),
    credentials.find((c) => c.id === 'data-analysis-python')
  ].filter(Boolean);

  // Vault filtering
  const filteredVault = credentials.filter((c) => {
    const matchesCat = vaultCategory === 'all' || c.category === vaultCategory;
    const matchesQuery = searchQuery === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.badgeText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section id="achievements" className="py-24 px-6 sm:px-12 relative font-sans bg-transparent border-b border-[rgba(17,17,16,0.1)]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-6 border-b border-[rgba(17,17,16,0.1)]">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#6B6862] tracking-wider uppercase">
              [ 04 // HONORS & CREDENTIALS ]
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111110]">
              Key Accolades & <br />
              <span className="serif-i text-4xl sm:text-5xl lg:text-6xl text-[#111110]">
                Certifications
              </span>
            </h2>
          </div>
          
          <button
            onClick={() => setIsVaultOpen(true)}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#111110] text-[#F2EFE9] text-xs font-mono font-semibold hover:bg-neutral-800 transition-all cursor-pointer self-start sm:self-auto shadow-xs group"
          >
            <Layers size={14} className="text-[#F97316]" />
            <span>View All 18 Credentials</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 1. Flagship Spotlight: Kaggle Global Expert Tier */}
        <div className="bg-white border border-[rgba(17,17,16,0.12)] rounded-2xl p-6 sm:p-8 hover:border-[#111110] transition-all shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex items-center justify-center p-3 bg-[#FAF8F5] rounded-xl border border-[rgba(17,17,16,0.06)]">
              <img 
                src="/certificates/kaggle_expert.png" 
                alt="Kaggle Global Expert Rank" 
                className="max-h-28 sm:max-h-32 w-auto object-contain"
              />
            </div>
            
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F97316]/10 text-[#F97316] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#F97316]/20">
                  <Trophy size={11} /> Top Tier Recognition
                </span>
                <span className="text-xs font-mono text-[#6B6862]">Kaggle Datasets & Notebooks Track</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#111110] leading-snug">
                Kaggle Global Expert — Machine Learning & Open Data
              </h3>

              <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed">
                Ranked in the top echelon globally on Kaggle for publishing production-grade datasets, algorithmic notebooks, and predictive modeling benchmarks evaluated by thousands of data scientists.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#111110]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                  <span>Verified Kaggle Expert Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Top 4 Flagship Certifications Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B6862]">
              Selected Certification Highlights
            </div>
            <span className="text-xs font-mono text-[#6B6862]">
              Showing 4 of 18
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlightCerts.map((cert) => (
              <div 
                key={cert.id}
                className="bg-white border border-[rgba(17,17,16,0.12)] rounded-2xl p-6 flex flex-col justify-between hover:border-[#111110] hover:shadow-xs transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F2EFE9] text-[#111110] border border-[rgba(17,17,16,0.1)]">
                      {cert.badgeText}
                    </span>
                    <span className="text-[11px] font-mono text-[#6B6862]">
                      {cert.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#111110] leading-snug group-hover:text-[#F97316] transition-colors">
                    {cert.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-[#6B6862]">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span className="font-medium text-[#111110]">{cert.issuer}</span>
                  </div>

                  <p className="text-xs text-[#6B6862] leading-relaxed line-clamp-2">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[rgba(17,17,16,0.08)] flex items-center justify-between">
                  <button
                    onClick={() => setActiveCert(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#111110] hover:text-[#F97316] transition-colors cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>Quick Preview</span>
                  </button>

                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-[#F2EFE9] hover:bg-[#111110] hover:text-white text-[#6B6862] transition-colors"
                    title="Open verified PDF"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Sleek Bottom Trigger to Open All 18 */}
        <div className="text-center pt-4">
          <button
            onClick={() => setIsVaultOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[rgba(17,17,16,0.15)] bg-white hover:border-[#111110] hover:bg-[#111110] hover:text-white transition-all text-xs font-mono font-semibold cursor-pointer group shadow-2xs"
          >
            <span>Explore All 18 Credentials & Badges</span>
            <span className="px-2 py-0.5 rounded-full bg-[#F2EFE9] group-hover:bg-white/20 text-[#111110] group-hover:text-white text-[10px] font-bold">
              18 Total
            </span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* FULL CREDENTIALS VAULT MODAL (Opened on click) */}
      <AnimatePresence>
        {isVaultOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVaultOpen(false)}
              className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs"
            />

            {/* Modal Drawer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              className="w-full max-w-5xl max-h-[90vh] bg-[#FAF8F5] border border-[rgba(17,17,16,0.15)] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 flex flex-col space-y-6 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[rgba(17,17,16,0.1)]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#6B6862] tracking-wider uppercase">
                      [ CREDENTIAL ARCHIVE ]
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#111110] text-[#F2EFE9] font-mono text-[10px] font-bold">
                      18 Certificates
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#111110] mt-1">
                    All Verified <span className="serif-i text-3xl sm:text-4xl">Certifications</span>
                  </h3>
                  <p className="text-xs text-[#6B6862] mt-1">
                    Browse and inspect all 18 authentic credentials across Deep Learning, Generative AI, Data Science, and Cloud Big Data.
                  </p>
                </div>

                <button
                  onClick={() => setIsVaultOpen(false)}
                  className="p-2 rounded-full bg-white border border-[rgba(17,17,16,0.1)] text-[#111110] hover:bg-[#111110] hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setVaultCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        vaultCategory === cat.id
                          ? 'bg-[#111110] text-[#F2EFE9]'
                          : 'bg-white border border-[rgba(17,17,16,0.1)] text-[#6B6862] hover:text-[#111110]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1 rounded ${
                        vaultCategory === cat.id ? 'bg-white/20' : 'bg-[#F2EFE9]'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[220px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6862]" />
                  <input
                    type="text"
                    placeholder="Search by topic, issuer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-[rgba(17,17,16,0.12)] text-xs text-[#111110] placeholder-[#6B6862] focus:outline-none focus:border-[#111110] transition-colors"
                  />
                </div>
              </div>

              {/* Scrollable Certificates Grid */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto pr-1 space-y-3 min-h-[300px] max-h-[55vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {filteredVault.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-white border border-[rgba(17,17,16,0.1)] rounded-xl p-4 flex flex-col justify-between hover:border-[#111110] transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#F2EFE9] text-[#111110] border border-[rgba(17,17,16,0.08)]">
                            {cert.badgeText}
                          </span>
                          <span className="text-[10px] font-mono text-[#6B6862]">
                            {cert.date}
                          </span>
                        </div>

                        <h5 className="text-xs font-bold text-[#111110] leading-snug line-clamp-2">
                          {cert.title}
                        </h5>

                        <div className="flex items-center gap-1 text-[11px] text-[#6B6862]">
                          <CheckCircle2 size={11} className="text-emerald-600 shrink-0" />
                          <span className="truncate">{cert.issuer}</span>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[rgba(17,17,16,0.06)] flex items-center justify-between">
                        <button
                          onClick={() => setActiveCert(cert)}
                          className="px-2.5 py-1 rounded bg-[#F2EFE9] hover:bg-[#111110] hover:text-[#F2EFE9] text-xs font-mono font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Eye size={11} />
                          <span>Inspect</span>
                        </button>

                        <a
                          href={cert.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-[#6B6862] hover:text-[#111110] transition-colors"
                          title="Open PDF"
                        >
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredVault.length === 0 && (
                  <div className="text-center py-12 text-xs font-mono text-[#6B6862]">
                    No credentials match your filter or search query.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INDIVIDUAL CERTIFICATE PDF INSPECTOR MODAL */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="w-full max-w-4xl max-h-[92vh] bg-white border border-neutral-300 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-20 flex flex-col space-y-4 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="space-y-1 pr-10">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-[#F2EFE9] text-[#111110] font-mono text-[10px] font-bold uppercase tracking-wider border border-[rgba(17,17,16,0.1)]">
                  <ShieldCheck size={12} className="text-emerald-600" />
                  <span>{activeCert.badgeText} Verified Credential</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111110] leading-tight">
                  {activeCert.title}
                </h3>
                <p className="text-xs text-[#6B6862]">
                  Issued by <span className="font-semibold text-[#111110]">{activeCert.issuer}</span> &bull; {activeCert.date}
                </p>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="w-full flex-1 min-h-[350px] sm:min-h-[460px] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 relative">
                <iframe
                  src={`${activeCert.file}#toolbar=0`}
                  title={activeCert.title}
                  className="w-full h-full min-h-[350px] sm:min-h-[460px] border-0"
                />
              </div>

              {/* Description & Action Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-neutral-100">
                <p className="text-xs text-[#6B6862] max-w-xl">
                  {activeCert.desc}
                </p>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href={activeCert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#111110] text-[#F2EFE9] text-xs font-mono font-semibold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={13} />
                    <span>Open in Tab</span>
                  </a>
                  
                  <a
                    href={activeCert.file}
                    download
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#F2EFE9] border border-[rgba(17,17,16,0.15)] text-[#111110] text-xs font-mono font-semibold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
