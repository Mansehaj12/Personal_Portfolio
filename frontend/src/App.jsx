import React from 'react';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#FAF7F0] dark:bg-zinc-950 text-black dark:text-white transition-colors duration-500 overflow-x-hidden selection:bg-black selection:text-white">
      {/* Stick top header */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Minimal footer */}
      <Footer />
    </div>
  );
}
