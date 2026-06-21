import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, User, Layers, Award, Mail, Menu, X, 
  ChevronUp, ShieldCheck, Cpu, Code2, GraduationCap, Home 
} from 'lucide-react';

import Hero from './components/Hero';
import AboutEducation from './components/AboutEducation';
import CustomSimulator from './components/CustomSimulator';
import SkillMatrix from './components/SkillMatrix';
import CertificationsVault from './components/CertificationsVault';
import ContactHub from './components/ContactHub';
import { PERSONAL_INFO } from './data';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Monitor scroll actions to toggle sticky header styling & back-to-top buttons
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'education', 'project-simulators', 'skills', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Welcome Portal', value: 'home', icon: Home },
    { label: 'Academic Path', value: 'education', icon: GraduationCap },
    { label: 'Project Studio', value: 'project-simulators', icon: Cpu },
    { label: 'Skill Matrix', value: 'skills', icon: Layers },
    { label: 'Certifications', value: 'certifications', icon: Award },
    { label: 'Message Buffer', value: 'contact', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500/20 selection:text-brand-400 overflow-x-hidden">
      {/* Dynamic Grid Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,41,59,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 1. STICKY FLOATING NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 30 
          ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-900/80 py-4 shadow-lg' 
          : 'bg-transparent py-5'
      }`} id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Brandings */}
          <a href="#home" className="flex items-center gap-2 group cursor-pointer text-decoration-none">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-blue-500 flex items-center justify-center text-slate-950 font-display font-black text-base shadow-md shadow-brand-500/10 group-hover:scale-105 transition-transform duration-300">
              SV
            </span>
            <div className="flex flex-col text-left">
              <span className="text-sm font-display font-black text-white leading-none mt-0.5 uppercase tracking-wide group-hover:text-brand-500 transition-colors">Varshith</span>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5 leading-none">@tangadepelly</span>
            </div>
          </a>

          {/* Large Screen Navigation items */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-950/40 p-1 rounded-full border border-slate-900">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.value}
                  href={`#${item.value}`}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-semibold font-display transition-all flex items-center gap-1.5 cursor-pointer border ${
                    activeSection === item.value 
                      ? 'bg-slate-800 text-brand-500 border-slate-700/50 shadow-sm' 
                      : 'text-slate-400 hover:text-white border-transparent'
                  }`}
                  id={`nav-link-${item.value}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Quick interactive action for candidates */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="#contact"
              className="bg-slate-900 hover:bg-slate-850 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white font-bold tracking-tight transition-all"
            >
              Contact Packet &gt;
            </a>
          </div>

          {/* Handheld/Mobile display Burger trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 lg:hidden bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation Screen"
            id="mobile-drawer-trigger"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Screen Drawer overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-slate-950 border-b border-slate-900 shadow-xl lg:hidden max-h-[85vh] overflow-y-auto"
            id="mobile-navigation-drawer"
          >
            <div className="px-4 py-6 flex flex-col gap-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.value}
                    href={`#${item.value}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-3.5 rounded-xl text-sm font-semibold font-display transition-all flex items-center gap-3 border ${
                      activeSection === item.value 
                        ? 'bg-brand-500/10 text-brand-500 border-brand-500/20' 
                        : 'bg-slate-900/40 text-slate-400 hover:text-white border-transparent'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5 text-brand-500" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CORE PORTFOLIO STAGE CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24" id="portfolio-main-stage">
        
        {/* welcome section */}
        <Hero />

        {/* qualification section */}
        <AboutEducation />

        {/* workspace playground simulator section */}
        <CustomSimulator />

        {/* competence matrix section */}
        <SkillMatrix />

        {/* certificates grid */}
        <CertificationsVault />

        {/* connection desk section */}
        <ContactHub />

      </main>

      {/* 3. COHESIVE FOOTER BAR */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 mt-auto select-none" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-500 font-display font-black text-sm">
              TS
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white uppercase tracking-wider">{PERSONAL_INFO.name}</span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">B.Tech Computer Science Class of 2027</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-mono text-[10px] uppercase font-bold">
            <a href="#home" className="hover:text-white transition-colors">Top of page</a>
            <span>•</span>
            <span className="flex items-center gap-1 hover:text-brand-500 transition-colors">
              <Code2 className="w-3.5 h-3.5" /> Built with React v19 & Tailwind v4
            </span>
          </div>
        </div>
      </footer>

      {/* Floater Back-To-Top button */}
      <AnimatePresence>
        {scrollY > 400 && (
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            href="#home"
            className="fixed bottom-6 right-6 p-3 bg-brand-500 hover:bg-brand-600 border border-brand-500 text-slate-950 rounded-xl shadow-lg hover:shadow-brand-500/25 transition-all z-40 active:scale-95 cursor-pointer"
            title="Scoll back to start"
            id="back-to-top"
          >
            <ChevronUp className="w-5 h-5 flex stroke-[2.5]" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
