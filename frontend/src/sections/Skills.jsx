import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, X, ChevronRight, BookOpen, Layers, Cpu, Code2, Database, Layout, Terminal, Sparkles } from 'lucide-react';

export default function Skills() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSem, setActiveSem] = useState('All');

  // Prevent scroll hijacking and lock body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (window.lenis) window.lenis.start();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const skillGroups = [
    {
      id: 'languages',
      num: '01',
      category: 'Languages',
      items: ['Python', 'C / C++', 'JavaScript (ES6+)', 'SQL', 'TypeScript', 'R', 'HTML5', 'CSS3']
    },
    {
      id: 'frontend',
      num: '02',
      category: 'Frontend & UI',
      items: ['React.js', 'Next.js 16', 'Tailwind CSS', 'Framer Motion', 'PWA & Service Workers', 'Leaflet.js', 'GeoJSON', 'Recharts']
    },
    {
      id: 'backend_data',
      num: '03',
      category: 'Backend & Data',
      items: ['Flask', 'Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MySQL', 'SQLite', 'Prisma ORM', 'Firebase Auth', 'REST APIs']
    },
    {
      id: 'ai_ml',
      num: '04',
      category: 'AI & ML',
      items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'YOLOv8', 'SegNet', 'OpenCV', 'CARLA Simulator', 'Transfer Learning', 'Neural Networks', 'CUDA Acceleration', 'NLP']
    },
    {
      id: 'analytics_tools',
      num: '05',
      category: 'Data & Analytics',
      items: ['pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Git & GitHub', 'GitHub Actions', 'PyTest', 'Postman', 'Jupyter', 'Kaggle CLI']
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
        { code: 'UES012', name: 'Engineering Materials' },
        { code: 'UMA034', name: 'Discrete Mathematical Structures' }
      ]
    },
    {
      id: 'Sem 4',
      title: 'Semester IV',
      subtitle: 'Algorithms, Databases & Computer Networks',
      courses: [
        { code: 'UCS415', name: 'Design and Analysis of Algorithms' },
        { code: 'UCS310', name: 'Database Management Systems' },
        { code: 'UCS414', name: 'Computer Networks' },
        { code: 'UTA002', name: 'Manufacturing Practices' },
        { code: 'UMA011', name: 'Numerical Analysis' }
      ]
    },
    {
      id: 'Sem 5',
      title: 'Semester V',
      subtitle: 'Software Engineering, Architecture & Electives',
      courses: [
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

  return (
    <section id="skills" className="py-24 px-6 sm:px-12 bg-transparent font-sans border-b border-[rgba(17,17,16,0.1)] relative">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 pb-6 border-b border-[rgba(17,17,16,0.1)]">
          <span className="font-mono text-xs font-bold text-[#6B6862] tracking-wider uppercase">
            [ 03 // TECHNICAL TOOLKIT ]
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111110]">
            What I work <span className="serif-i text-5xl sm:text-6xl lg:text-7xl font-normal text-[#111110]">with</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed max-w-2xl">
            Technologies, frameworks, and developer tools I reach for across machine learning, full-stack systems, and data pipelines.
          </p>
        </div>

        {/* Minimalist Horizontal Skill Matrix */}
        <div className="divide-y divide-[rgba(17,17,16,0.1)] border-b border-[rgba(17,17,16,0.1)]">
          {skillGroups.map((group) => (
            <div 
              key={group.id} 
              className="py-6 sm:py-7 px-5 sm:px-8 -mx-5 sm:-mx-8 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group transition-all duration-300 ease-out hover:bg-[#111110] hover:shadow-xl cursor-default"
            >
              {/* Left Column: Morphing Number to Orange Disc & Title */}
              <div className="md:col-span-4 flex items-center gap-4">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#F97316] group-hover:opacity-0 transition-opacity duration-200">
                    {group.num}
                  </span>
                  <span className="absolute inset-0 rounded-full bg-[#F97316] scale-0 group-hover:scale-100 transition-transform duration-300 ease-out shadow-xs" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#111110] group-hover:text-white tracking-tight transition-colors duration-300">
                  {group.category}
                </h3>
              </div>

              {/* Right Column: Dynamic Pill Badges */}
              <div className="md:col-span-8 flex flex-wrap items-center gap-2">
                {group.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white group-hover:bg-[#1C1C1A] border border-[rgba(17,17,16,0.12)] group-hover:border-white/20 text-[#111110] group-hover:text-white font-mono text-xs tracking-tight shadow-2xs hover:!bg-[#F97316] hover:!border-[#F97316] hover:!text-white transition-all duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Academic Coursework Banner */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[rgba(17,17,16,0.12)] shadow-2xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-[#F97316]" />
              <span className="text-xs font-bold text-[#111110] uppercase tracking-wider font-mono">
                Thapar University Academic Curriculum
              </span>
            </div>
            <p className="text-xs text-[#6B6862]">
              Official 7-semester Computer Engineering coursework (Operating Systems, Algorithms, Computer Vision & Capstone).
            </p>
          </div>

          <button
            onClick={() => openSemesterModal('All')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111110] hover:bg-neutral-800 text-[#F2EFE9] text-xs font-mono font-semibold transition-all cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs"
          >
            <span>Explore Coursework (Sem 1–7)</span>
            <ChevronRight size={14} className="text-[#F97316]" />
          </button>
        </div>

      </div>

      {/* Coursework Modal */}
      <AnimatePresence>
        {isOpen && (
          <div 
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-neutral-900/60 backdrop-blur-xs font-sans"
          >
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0"
            />

            {/* Modal Dialog Content */}
            <motion.div
              data-lenis-prevent="true"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-[#FAF8F5] border border-[rgba(17,17,16,0.15)] rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[rgba(17,17,16,0.1)] bg-white flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#6B6862]">
                    <GraduationCap className="w-4 h-4 text-[#F97316]" />
                    <span>Thapar Institute of Engineering & Technology</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111110] tracking-tight">
                    Academic Curriculum Scheme (Sem 1 – 7)
                  </h3>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-[#F2EFE9] text-[#111110] hover:bg-[#111110] hover:text-white transition-colors shrink-0 cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Semester Filter Tabs */}
              <div className="px-6 py-3 border-b border-[rgba(17,17,16,0.08)] bg-white flex flex-wrap items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => setActiveSem('All')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeSem === 'All'
                      ? 'bg-[#111110] text-[#F2EFE9]'
                      : 'bg-[#F2EFE9] text-[#6B6862] hover:text-[#111110]'
                  }`}
                >
                  All Semesters
                </button>
                {semesterCoursework.map((sem) => (
                  <button
                    key={sem.id}
                    onClick={() => setActiveSem(sem.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeSem === sem.id
                        ? 'bg-[#111110] text-[#F2EFE9]'
                        : 'bg-[#F2EFE9] text-[#6B6862] hover:text-[#111110]'
                    }`}
                  >
                    {sem.id}
                  </button>
                ))}
              </div>

              {/* Modal Body: Course Grid */}
              <div 
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                className="p-6 overflow-y-auto space-y-6 flex-1 overscroll-contain"
              >
                {filteredSemesters.map((sem) => (
                  <div key={sem.id} className="space-y-3">
                    <div className="flex items-baseline justify-between border-b border-[rgba(17,17,16,0.08)] pb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#111110] font-mono">
                        {sem.title} &mdash; <span className="text-[#6B6862] font-sans font-medium">{sem.subtitle}</span>
                      </h4>
                      <span className="text-[10px] font-mono text-[#6B6862]">
                        {sem.courses.length} Courses
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {sem.courses.map((course, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3 rounded-xl bg-white border border-[rgba(17,17,16,0.1)] shadow-2xs flex items-start gap-2.5"
                        >
                          <span className="px-2 py-0.5 rounded bg-[#F2EFE9] border border-[rgba(17,17,16,0.08)] text-[10px] font-mono font-bold text-[#111110] shrink-0">
                            {course.code}
                          </span>
                          <span className="text-xs font-semibold text-[#111110] leading-snug">
                            {course.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
