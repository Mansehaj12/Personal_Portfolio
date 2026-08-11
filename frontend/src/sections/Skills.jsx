import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, X, ChevronRight, BookOpen, Layers } from 'lucide-react';

export default function Skills() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSem, setActiveSem] = useState('All');

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

  // Official Thapar Institute (TIET) Computer Engineering Curriculum Scheme (Sem 1 to Sem 7)
  const semesterCoursework = [
    {
      id: 'Sem 1',
      title: 'Semester I',
      subtitle: 'Foundation Sciences & Core Basics',
      courses: [
        { code: 'UCB009', name: 'Chemistry' },
        { code: 'UES103', name: 'Programming for Problem Solving' },
        { code: 'UES013', name: 'Electrical & Electronics Engineering' },
        { code: 'UEN008', name: 'Energy and Environment' },
        { code: 'UMA022', name: 'Calculus for Engineers' }
      ]
    },
    {
      id: 'Sem 2',
      title: 'Semester II',
      subtitle: 'Applied Physics & Mathematical Foundations',
      courses: [
        { code: 'UPH013', name: 'Physics' },
        { code: 'UES101', name: 'Engineering Drawing' },
        { code: 'UHU003', name: 'Professional Communication' },
        { code: 'UES102', name: 'Manufacturing Processes' },
        { code: 'UMA023', name: 'Differential Equations and Linear Algebra' }
      ]
    },
    {
      id: 'Sem 3',
      title: 'Semester III',
      subtitle: 'Core Systems, OOP & Data Structures',
      courses: [
        { code: 'UCS303', name: 'Operating System' },
        { code: 'UTA018', name: 'Object Oriented Programming' },
        { code: 'UCS301', name: 'Data Structures' },
        { code: 'UCS405', name: 'Discrete Mathematical Structures' },
        { code: 'UTA016', name: 'Engineering Design Project I' },
        { code: 'UMA021', name: 'Numerical Linear Algebra' },
        { code: 'UHU052', name: 'The Evolutionary Basis of Human Behaviour for Engineers' },
        { code: 'UCS320', name: 'Introduction to Sustainable Green Computing' }
      ]
    },
    {
      id: 'Sem 4',
      title: 'Semester IV',
      subtitle: 'Algorithms, DBMS & Computer Networks',
      courses: [
        { code: 'UCS415', name: 'Design and Analysis of Algorithms' },
        { code: 'UCS310', name: 'Database Management Systems' },
        { code: 'UCS414', name: 'Computer Networks' },
        { code: 'UCS321', name: 'AI for Engineers' },
        { code: 'UMA401', name: 'Probability and Statistics' },
        { code: 'UTA024', name: 'Engineering Design Project II' },
        { code: 'UTD003', name: 'Aptitude Skills Building' }
      ]
    },
    {
      id: 'Sem 5',
      title: 'Semester V',
      subtitle: 'Machine Learning, Web & Architecture',
      courses: [
        { code: 'UML501', name: 'Machine Learning' },
        { code: 'UCS615', name: 'Image Processing' },
        { code: 'UCS503', name: 'Software Engineering' },
        { code: 'UCS510', name: 'Computer Architecture and Organization' },
        { code: 'PEC-I', name: 'Elective-I' }
      ]
    },
    {
      id: 'Sem 6',
      title: 'Semester VI',
      subtitle: 'Theory of Computation, Optimization & Capstone Start',
      courses: [
        { code: 'UCS701', name: 'Theory of Computation' },
        { code: 'UMA035', name: 'Numerical Optimization' },
        { code: 'UTA025', name: 'Innovation and Entrepreneurship' },
        { code: 'PEC-II', name: 'Elective-II' },
        { code: 'PEC-III', name: 'Elective-III' },
        { code: 'UCS797', name: 'Capstone Project - Starts' }
      ]
    },
    {
      id: 'Sem 7',
      title: 'Semester VII',
      subtitle: 'Compiler Construction, Computer Vision & NLP & Capstone',
      courses: [
        { code: 'UCS802', name: 'Compiler Construction' },
        { code: 'UHU005', name: 'Humanities for Engineers' },
        { code: 'UCS772', name: 'Data Science: Computer Vision & NLP' },
        { code: 'UCS797', name: 'Capstone Project' }
      ]
    }
  ];

  const openSemesterModal = (semId = 'All') => {
    setActiveSem(semId);
    setIsOpen(true);
  };

  const filteredSemesters = activeSem === 'All'
    ? semesterCoursework
    : semesterCoursework.filter(sem => sem.id === activeSem);

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
        className="max-w-7xl mx-auto space-y-12"
      >
        
        {/* Main Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Header (Spans 4 columns) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 inline-block">
              Skills
            </h2>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              My technology toolset organized by categories, spanning machine learning, core languages, backend infrastructure, and testing platforms.
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
        </div>

        {/* Compact Launcher Box for Academic Coursework */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-zinc-800/80">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-850 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-black dark:hover:border-zinc-700 transition-colors duration-300">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white text-[11px] font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Thapar University Curriculum</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                Academic Coursework (Sem 1 – 7)
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Explore the official 7-semester Computer Engineering curriculum scheme studied at Thapar Institute of Engineering & Technology (TIET), Patiala.
              </p>

              {/* Quick semester preview tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {semesterCoursework.map((sem) => (
                  <button
                    key={sem.id}
                    onClick={() => openSemesterModal(sem.id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200/40 dark:border-zinc-800 text-[10px] font-bold text-neutral-700 dark:text-zinc-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    {sem.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Modal Button */}
            <button
              onClick={() => openSemesterModal('All')}
              className="px-6 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-all shrink-0 shadow-md group"
            >
              <span>View Coursework Box</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </motion.div>

      {/* Interactive Modal Box */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[85vh] bg-[#FAF7F0] dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
                    <GraduationCap className="w-4 h-4 text-black dark:text-white" />
                    <span>Thapar Institute of Engineering & Technology</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white tracking-tight">
                    Academic Curriculum (Sem 1 – 7)
                  </h3>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-800 text-black dark:text-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Semester Filter Tabs */}
              <div className="px-6 py-3 border-b border-slate-200/60 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-950 flex flex-wrap items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveSem('All')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    activeSem === 'All'
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                      : 'bg-white dark:bg-zinc-900 text-neutral-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:border-black dark:hover:border-white'
                  }`}
                >
                  All Semesters
                </button>

                {semesterCoursework.map((sem) => (
                  <button
                    key={sem.id}
                    onClick={() => setActiveSem(sem.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      activeSem === sem.id
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                        : 'bg-white dark:bg-zinc-900 text-neutral-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:border-black dark:hover:border-white'
                    }`}
                  >
                    {sem.id}
                  </button>
                ))}
              </div>

              {/* Modal Body - Scrollable Grid */}
              <div className="p-6 overflow-y-auto space-y-6 max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSemesters.map((sem) => (
                    <div
                      key={sem.id}
                      className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-zinc-800 text-neutral-800 dark:text-zinc-200">
                          {sem.title}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-zinc-500">
                          {sem.courses.length} Courses
                        </span>
                      </div>

                      <p className="text-[11px] font-medium text-neutral-500 dark:text-zinc-400 italic">
                        {sem.subtitle}
                      </p>

                      <div className="pt-1 space-y-2">
                        {sem.courses.map((course, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center justify-between text-xs py-1 border-b border-slate-50 dark:border-zinc-850 last:border-0"
                          >
                            <span className="font-semibold text-black dark:text-white pr-2">
                              {course.name}
                            </span>
                            <span className="font-mono text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded shrink-0">
                              {course.code}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-between text-xs text-neutral-500 dark:text-zinc-400 px-6">
                <span>TIET Patiala — Computer Engineering Scheme</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 rounded-full bg-slate-200 dark:bg-zinc-800 text-black dark:text-white font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


