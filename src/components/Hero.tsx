import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Calendar, Terminal, Briefcase, FileText, ArrowDown, User, Layers, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Hero() {
  const [localTime, setLocalTime] = useState('');

  // Update time tracker mimicking Hyderabad, India (GMT+5:30)
  useEffect(() => {
    const updateHydTime = () => {
      const gmt = new Date();
      const hydTime = new Date(gmt.getTime() + (5.5 * 60 * 60 * 1000) + (gmt.getTimezoneOffset() * 60 * 1000));
      setLocalTime(hydTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateHydTime();
    const interval = setInterval(updateHydTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center py-12 md:py-20 lg:py-28" id="home">
      {/* Abstract Glowing Accent Wallpapers */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left pitch text column */}
        <div className="lg:col-span-8 flex flex-col gap-6 order-2 lg:order-1">
          {/* Welcome Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/10 text-brand-500 text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-brand-500/20 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Available for Internships (2025/2026)
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs font-mono px-3 py-1.5 rounded-full border border-slate-700/50 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              Hyderabad (IST): {localTime || 'Calculating...'}
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.1] my-0">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-500 to-blue-500">{PERSONAL_INFO.name}</span>
            </h1>
            <p className="text-lg md:text-xl font-display text-slate-300 font-semibold mt-1">
              {PERSONAL_INFO.title}
            </p>
          </div>

          {/* Short introduction summary */}
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-sans m-0">
            {PERSONAL_INFO.summary}
          </p>

          {/* Contact and coordinates bar */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-slate-400 font-mono text-xs md:text-sm border-y border-slate-800 py-5 bg-slate-950/20 px-4 rounded-xl max-w-3xl">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-brand-500" />
              {PERSONAL_INFO.email}
            </a>
            <span className="hidden sm:inline text-slate-700">•</span>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-brand-500" />
              {PERSONAL_INFO.phone}
            </a>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-brand-500" />
              {PERSONAL_INFO.location}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <a 
              href="#project-simulators" 
              className="bg-brand-500 hover:bg-brand-600 font-display font-semibold text-slate-950 px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-brand-500/20 active:scale-98 flex items-center gap-2 cursor-pointer text-sm"
              id="cta-simulators"
            >
              <Terminal className="w-4 h-4" />
              Launch Project Simulator
            </a>
            <a 
              href="#skills" 
              className="bg-slate-950 hover:bg-slate-900 text-white font-display border border-slate-800 hover:border-slate-700 px-6 py-3.5 rounded-xl transition-all active:scale-98 flex items-center gap-2 cursor-pointer text-sm"
              id="cta-skills"
            >
              <Layers className="w-4 h-4" />
              View Skills Matrix
            </a>
            <div className="flex items-center gap-2 ml-2">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer" 
                className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all hover:-translate-y-0.5 shadow-sm"
                title="GitHub Profile"
                id="link-github-hero"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all hover:-translate-y-0.5 shadow-sm"
                title="LinkedIn Profile"
                id="link-linkedin-hero"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right profile graphic block */}
        <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
          <div className="relative group">
            {/* Pulsating backdrops reflecting technical nature of the projects */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 pointer-events-none" />
            
            {/* Double card layout mockup */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl relative z-10 w-72 md:w-80 shadow-2xl">
              <div className="flex flex-col gap-5 items-center text-center">
                
                {/* Simulated profile portrait avatar holder */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-blue-500 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="w-24 h-24 rounded-2xl bg-slate-900 relative z-10 border border-slate-700 overflow-hidden flex items-center justify-center font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                    TSV
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-white">{PERSONAL_INFO.name}</h3>
                  <p className="text-[11px] text-brand-500 font-mono mt-0.5 uppercase tracking-wider font-bold">MREC CSE UNDERGRADUATE</p>
                </div>

                {/* Tech chip pile */}
                <div className="grid grid-cols-2 gap-2 w-full mt-1.5">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">CURRENT YEAR</span>
                    <span className="text-xs font-bold text-slate-200 mt-0.5 block">Year 4 (2027)</span>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">CGPA</span>
                    <span className="text-xs font-bold text-emerald-400 mt-0.5 block">8.73 / 10</span>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-900" />

                {/* Simulated activity log listing his core skills */}
                <div className="w-full text-left font-mono text-[9px] text-slate-500 flex flex-col gap-2">
                  <span className="uppercase text-[8px] font-bold tracking-widest text-slate-600 block mb-0.5">CURRENT STACK SPECS</span>
                  <div className="flex items-center justify-between border-b border-slate-900/50 pb-1.5">
                    <span className="text-slate-400 font-semibold text-[10px]">Backend</span>
                    <span className="bg-slate-900 border border-slate-800 text-slate-300 px-1.5 py-0.5 rounded uppercase">Flask & Pandas</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-900/50 pb-1.5">
                    <span className="text-slate-400 font-semibold text-[10px]">Frontend</span>
                    <span className="bg-slate-900 border border-slate-800 text-slate-300 px-1.5 py-0.5 rounded uppercase">React.js</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold text-[10px]">Primary Languages</span>
                    <span className="bg-slate-900 border border-slate-800 text-slate-300 px-1.5 py-0.5 rounded uppercase">Java, Python</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
