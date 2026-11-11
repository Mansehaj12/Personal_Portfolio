import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import AIChatbot from './components/AIChatbot';
import CommandPalette from './components/CommandPalette';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize buttery Lenis smooth scroll matching award-winning portfolios
  useEffect(() => {
    if (isLoading) return;

    document.body.style.overflow = 'unset';

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, [isLoading]);

  return (
    <>
      {/* Editorial Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen bg-[#F2EFE9] text-[#111110] overflow-x-hidden selection:bg-[#F97316] selection:text-white">
          {/* Interactive Dot Grid Background */}
          <div className="grid-bg" />

          {/* Top Sticky Header */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="relative z-10">
            <Hero />
            <Projects />
            <About />
            <Skills />
            <Achievements />
            <Contact />
          </main>

          {/* Quick Jump Command Palette (Ctrl+K) */}
          <CommandPalette isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />

          {/* AI Chatbot Floating Assistant */}
          <AIChatbot />

          {/* Minimal Editorial Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
