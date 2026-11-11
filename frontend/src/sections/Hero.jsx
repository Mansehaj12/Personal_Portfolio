import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const [timeStr, setTimeStr] = useState('');
  const [activePhoto, setActivePhoto] = useState(0);

  const photos = [
    { src: '/showcase-1.png', label: 'Showcase // 01' },
    { src: '/showcase-2.png', label: 'Showcase // 02' },
    { src: '/pprofile.JPG', label: 'Casual // Campus' },
    { src: '/IMG_1385.JPG', label: 'Formal // Defense' },
    { src: '/IMG_5355.JPG', label: 'Field // Outdoor' },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, null, `#${id}`);
    }
  };

  const tickerItems = [
    'PyTorch',
    'YOLOv8',
    'SegNet',
    'React.js',
    'Flask',
    'Autonomous Driving',
    'PostgreSQL',
    'Scikit-Learn',
    'Next.js',
    'Kaggle Expert',
    'Computer Vision',
    'Node.js',
    'FastAPI',
    'Leaflet.js',
  ];

  return (
    <section id="hero" className="relative pt-24 select-none font-sans overflow-hidden">
      
      {/* Container for Top Elements */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
        
        {/* Sub-bar: Status and Location Time */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] sm:text-xs text-[#6B6862] tracking-wider pt-4 border-b border-[rgba(17,17,16,0.08)] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_0_rgba(16,185,129,0.7)] animate-pulse" />
            <span>Available for opportunities</span>
          </div>
          <div>
            <span>Patiala, India &mdash; {timeStr || '14:52'} IST</span>
          </div>
        </div>

        {/* Stats Row with Orange Accents */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-2">
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111110]">
              5<span className="text-[#F97316] font-normal">+</span>
            </div>
            <div className="font-mono text-[10px] text-[#6B6862] tracking-widest uppercase mt-1">
              Projects Shipped
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111110]">
              18
            </div>
            <div className="font-mono text-[10px] text-[#6B6862] tracking-widest uppercase mt-1">
              Certificates Verified
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111110]">
              Expert<span className="text-[#F97316] text-2xl font-normal">&bull;</span>
            </div>
            <div className="font-mono text-[10px] text-[#6B6862] tracking-widest uppercase mt-1">
              Kaggle Global Rank
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111110]">
              15<span className="text-[#F97316] font-normal">+</span>
            </div>
            <div className="font-mono text-[10px] text-[#6B6862] tracking-widest uppercase mt-1">
              Technologies
            </div>
          </div>
        </div>

        {/* Giant Typographic Headline */}
        <div className="pt-2 pb-6">
          <h1 className="text-[clamp(56px,13vw,170px)] font-bold text-[#111110] leading-[0.88] tracking-[-0.045em] uppercase select-none">
            <span className="block">MANSEHAJ</span>
            <span className="block mt-1">
              PREET <span className="serif-i lowercase text-[clamp(64px,14.5vw,195px)] font-normal text-[#111110] tracking-normal inline-block hover:text-[#F97316] transition-colors">singh</span>
            </span>
          </h1>
        </div>

        {/* Tagline Strip with Orange Sparkles */}
        <div className="font-mono text-xs sm:text-sm text-[#111110] font-semibold tracking-widest uppercase flex flex-wrap items-center gap-2.5 py-4 border-t border-b border-[rgba(17,17,16,0.12)]">
          <span>Software Engineer</span>
          <span className="text-[#F97316] text-sm">&diams;</span>
          <span>Machine Learning Systems</span>
          <span className="text-[#F97316] text-sm">&diams;</span>
          <span>Computer Engineering '27</span>
        </div>

        {/* 2-Column Bio & Photo Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2 pb-16 relative">
          
          {/* Left Column: Photo Card with Tab Switcher */}
          <div className="md:col-span-4 flex flex-col items-start gap-3">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8E3D9] border border-[rgba(17,17,16,0.15)] shadow-xs group">
              <img 
                src={photos[activePhoto].src} 
                alt="Mansehaj Preet Singh" 
                className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-103"
              />
              <div className="absolute bottom-3 left-3 bg-[#F2EFE9]/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-mono text-[#111110] font-semibold border border-[rgba(17,17,16,0.12)]">
                {photos[activePhoto].label}
              </div>
            </div>

            {/* Quick Photo Switcher Dots */}
            <div className="flex items-center gap-2 pt-1">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activePhoto === i ? 'w-6 bg-[#111110]' : 'bg-[#6B6862]/40 hover:bg-[#111110]'
                  }`}
                  aria-label={`Show photo ${i + 1}`}
                />
              ))}
              <span className="text-[10px] font-mono text-[#6B6862] ml-2">Click to switch frame</span>
            </div>
          </div>

          {/* Right Column: Simple & Authentic Introduction */}
          <div className="md:col-span-7 md:col-start-6 space-y-6">
            <p className="text-xl sm:text-2xl font-normal text-[#111110] leading-snug">
              I am a Computer Engineering student at <span className="serif-i text-2xl sm:text-3xl text-[#111110]">Thapar Institute</span> working on machine learning, autonomous systems, and full-stack applications.
            </p>

            <p className="text-sm sm:text-base text-[#6B6862] leading-relaxed">
              I enjoy turning complex data and algorithmic models into clean, usable software. Always curious, constantly building, and focused on writing code that solves real problems.
            </p>

            {/* Direct Action Button */}
            <div className="pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#111110] bg-transparent text-[#111110] hover:bg-[#111110] hover:text-[#F2EFE9] text-xs font-semibold tracking-wide transition-all duration-300 shadow-2xs hover:shadow cursor-pointer group"
              >
                <span>Explore projects</span>
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Vertical Scroll Indicator on Right edge */}
          <div className="hidden lg:flex flex-col items-center gap-2 absolute right-0 bottom-4 font-mono text-[10px] text-[#6B6862] tracking-widest uppercase">
            <span>SCROLL</span>
            <div className="w-px h-8 bg-[#111110]/40 animate-pulse" />
          </div>

        </div>

      </div>

      {/* Infinite Black Marquee Ticker Strip */}
      <div className="w-full bg-[#111110] text-[#F2EFE9] py-3.5 overflow-hidden border-t border-b border-[#111110] select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-sans font-medium text-sm tracking-wide">
          {/* Render twice for infinite loop */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="text-[#F97316] text-base leading-none">&diams;</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
