import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, ShieldCheck, Eye, Sparkles, ExternalLink, Download, FileText, X, Filter, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Achievements() {
  const [activeCert, setActiveCert] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const stats = [
    { label: 'Kaggle Rank', val: 'Global Expert', desc: 'Datasets & Notebooks Track' },
    { label: 'AI & Deep Learning', val: 'NVIDIA & IBM', desc: 'DLI & GenAI Foundations' },
    { label: 'Verified Credentials', val: '18 Certificates', desc: 'Coursera, Deloitte & Google' },
    { label: 'Algorithm Solves', val: '200+ Solves', desc: 'LeetCode & GFG Verified' }
  ];

  const categories = [
    { id: 'all', label: 'All Credentials', count: 18 },
    { id: 'ai_dl', label: 'AI & Deep Learning', count: 6 },
    { id: 'data_science', label: 'Data Science & ML', count: 6 },
    { id: 'big_data', label: 'Big Data & Cloud', count: 6 }
  ];

  const credentials = [
    // --- AI & DEEP LEARNING ---
    {
      id: 'nvidia-dli',
      title: 'Building Deep Learning & Neural Network Models',
      issuer: 'NVIDIA Deep Learning Institute (DLI)',
      category: 'ai_dl',
      badgeText: 'NVIDIA DLI',
      file: '/certificates/Coursera NVIDIA.pdf',
      desc: 'Certified competence in training deep neural networks from scratch, leveraging transfer learning, GPU acceleration, and deploying neural architectures for CV and NLP tasks.',
      glow: 'purple',
      date: 'NVIDIA Certified'
    },
    {
      id: 'ibm-genai-foundations',
      title: 'Generative AI Foundation Models & Platforms',
      issuer: 'IBM / Coursera',
      category: 'ai_dl',
      badgeText: 'IBM GenAI',
      file: '/certificates/Coursera_Generative AI Foundation Models and Platforms.pdf',
      desc: 'Mastery over foundation models, transformer architectures, prompt engineering, fine-tuning LLMs, and deploying enterprise GenAI solution pipelines.',
      glow: 'cyan',
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
      glow: 'blue',
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
      glow: 'emerald',
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
      glow: 'indigo',
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
      glow: 'rose',
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
      glow: 'amber',
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
      glow: 'orange',
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
      glow: 'indigo',
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
      glow: 'teal',
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
      glow: 'cyan',
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
      glow: 'blue',
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
      glow: 'violet',
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
      glow: 'purple',
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
      glow: 'amber',
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
      glow: 'emerald',
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
      glow: 'indigo',
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
      glow: 'cyan',
      date: 'Coursera Verified'
    }
  ];

  const filteredCerts = activeTab === 'all' 
    ? credentials 
    : credentials.filter(c => c.category === activeTab);

  // Decorative color mappings
  const getGlowStyles = (glow) => {
    switch (glow) {
      case 'purple': return 'from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'cyan': return 'from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30';
      case 'emerald': return 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'amber': return 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'orange': return 'from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30';
      case 'rose': return 'from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30';
      case 'violet': return 'from-violet-500/20 to-purple-500/20 text-violet-600 dark:text-violet-400 border-violet-500/30';
      case 'teal': return 'from-teal-500/20 to-emerald-500/20 text-teal-600 dark:text-teal-400 border-teal-500/30';
      default: return 'from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30';
    }
  };

  return (
    <section id="achievements" className="py-24 px-6 relative overflow-hidden font-sans bg-zinc-50/50 dark:bg-zinc-950/50">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium">
            <Trophy size={14} className="text-cyan-500" />
            <span>VERIFIED ACADEMIC & INDUSTRY STANDINGS</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Achievements & <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Certifications</span>
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive record of my global Kaggle standings, NVIDIA AI credentials, enterprise Deloitte simulations, and 18 verified specialization certificates.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Kaggle Expert & Highlights Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300" />
              <img 
                src="/certificates/kaggle_expert.png" 
                alt="Kaggle Expert Tier Badge" 
                className="relative w-48 h-auto object-contain rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800"
              />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
                Kaggle Expert Tier
              </div>
              <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">Global Expert Rank</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Datasets & Notebooks Specialty Track</p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-2">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl flex flex-col justify-center space-y-1 hover:border-cyan-500/30 transition-all"
              >
                <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </div>
                <div className="text-xl font-black text-zinc-900 dark:text-white">
                  {stat.val}
                </div>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === cat.id
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md scale-105'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                activeTab === cat.id 
                  ? 'bg-white/20 dark:bg-black/20 text-white dark:text-zinc-900' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Credentials Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCerts.map((cert) => {
              const glowStyle = getGlowStyles(cert.glow);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={cert.id}
                >
                  <GlassCard 
                    className="flex flex-col justify-between h-full group hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      {/* Top Bar with Badge & Icon */}
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase border bg-gradient-to-r ${glowStyle}`}>
                          {cert.badgeText}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-cyan-500 transition-colors">
                          <Award size={16} />
                        </div>
                      </div>

                      {/* Title & Details */}
                      <div className="space-y-1.5">
                        <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-2">
                          {cert.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          <span className="font-medium">{cert.issuer}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                        {cert.desc}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                        {cert.date}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveCert(cert)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-bold transition-all flex items-center gap-1"
                        >
                          <Eye size={13} />
                          <span>Inspect</span>
                        </button>
                        
                        <a
                          href={cert.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-cyan-500 hover:text-white text-zinc-500 dark:text-zinc-400 transition-colors"
                          title="Open PDF Document"
                        >
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Modal PDF Inspector */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 flex flex-col space-y-6 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-10">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck size={12} />
                  <span>{activeCert.badgeText} Verified Credential</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-tight">
                  {activeCert.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Issued by <span className="font-semibold text-zinc-700 dark:text-zinc-300">{activeCert.issuer}</span> &bull; {activeCert.date}
                </p>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="w-full flex-1 min-h-[350px] sm:min-h-[450px] bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
                <iframe
                  src={`${activeCert.file}#toolbar=0`}
                  title={activeCert.title}
                  className="w-full h-full min-h-[350px] sm:min-h-[450px] border-0"
                />
              </div>

              {/* Description & Action Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
                  {activeCert.desc}
                </p>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={activeCert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-mono font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={14} />
                    <span>Open PDF</span>
                  </a>
                  
                  <a
                    href={activeCert.file}
                    download
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={14} />
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
