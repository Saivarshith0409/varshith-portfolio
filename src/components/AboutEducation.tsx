import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Star, Award, BookOpen, Heart, BrainCircuit } from 'lucide-react';
import { EDUCATIONS, PERSONAL_INFO } from '../data';

export default function AboutEducation() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-16 border-t border-slate-900/60" id="education">
      <div className="flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <span className="text-brand-500 font-mono text-xs font-semibold uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20 inline-self-center self-center w-fit">
            Academic Foundation
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight my-0">
            Education & Coursework
          </h2>
          <p className="text-slate-400 text-sm m-0">
            A solid background in algorithmic theory, relational databases, software systems, and engineering math.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Academic Milestones Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-lg font-display text-white font-semibold flex items-center gap-2 px-1">
              <GraduationCap className="w-5 h-5 text-brand-500" />
              Mestones Timeline
            </h3>

            <div className="flex flex-col relative pl-6 border-l-2 border-slate-850 gap-8">
              {EDUCATIONS.map((edu, idx) => (
                <div 
                  key={idx}
                  className="relative group flex flex-col gap-2 bg-slate-950/40 hover:bg-slate-950/80 p-6 rounded-2xl border border-slate-900 hover:border-slate-800 transition-all shadow-md"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Timeline Glowing Dot */}
                  <span className={`absolute -left-[33px] top-6 w-3.5 h-3.5 rounded-full border-2 border-slate-900 transition-all ${
                    hoveredIdx === idx ? 'bg-brand-500 scale-125' : 'bg-slate-700'
                  }`} />

                  {/* Header metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-900 border border-slate-800 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-brand-500" />
                      {edu.period}
                    </span>
                    <span className="text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 bg-slate-900/60 border border-slate-800/60 px-3.5 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                      {edu.performanceType}: {edu.performanceValue}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-display text-white mt-1 leading-snug">
                    {edu.degree}
                  </h4>

                  <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-brand-500" />
                    {edu.institution}, <span className="text-slate-500 font-normal">{edu.location}</span>
                  </p>

                  <div className="mt-2.5">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold mb-1.5">Core Syllabus Highlights</p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses?.map((course, cIdx) => (
                        <span key={cIdx} className="bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 font-sans px-2.5 py-1 rounded-lg">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Coursework, Areas of Interest & Soft Skills */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Areas of Interest Card */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-sm font-display text-white font-bold uppercase tracking-wider flex items-center gap-2 border-b border-slate-900 pb-3">
                <BrainCircuit className="w-4 h-4 text-brand-500 animate-pulse" />
                Specializations & Focus Areas
              </h3>

              <div className="flex flex-wrap gap-2">
                {PERSONAL_INFO.areasOfInterest.map((idxVal, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-3.5 py-2 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-colors"
                  >
                    {idxVal}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills Card */}
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-sm font-display text-white font-bold uppercase tracking-wider flex items-center gap-2 border-b border-slate-900 pb-3">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                Engineered Soft Skills
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {PERSONAL_INFO.softSkills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col gap-0.5 bg-slate-900 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
                  >
                    <span className="text-xs font-semibold text-slate-200">{skill}</span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Self-Evident</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro summary quote */}
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 p-5 rounded-2xl italic text-slate-400 text-xs leading-relaxed flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                "Currently maintaining an 8.73 Cumulative Grade Point Average in Computer Science while seeking opportunities to apply theoretical operating systems, relational DB algorithms, and object-oriented architectures to live full-stack web applications."
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
