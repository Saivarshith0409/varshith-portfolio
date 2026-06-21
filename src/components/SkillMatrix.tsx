import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { SKILLS, PROJECTS } from '../data';

export default function SkillMatrix() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'programming' | 'frontend' | 'database' | 'tool' | 'coursework'>('all');
  const [selectedSkill, setSelectedSkill] = useState<typeof SKILLS[0] | null>(null);

  const filters = [
    { label: 'All Stacks', value: 'all' },
    { label: 'Languages', value: 'programming' },
    { label: 'Front End', value: 'frontend' },
    { label: 'Databases', value: 'database' },
    { label: 'Developer Tools', value: 'tool' },
    { label: 'CS Core Theoretical', value: 'coursework' }
  ];

  const filteredSkills = SKILLS.filter(skill => {
    if (activeFilter === 'all') return true;
    return skill.category === activeFilter;
  });

  return (
    <section className="py-16 border-t border-slate-900/60" id="skills">
      <div className="flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <span className="text-brand-500 font-mono text-xs font-semibold uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20 inline-self-center self-center w-fit">
            Engineered Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight my-0">
            Skills & Competencies Mapping
          </h2>
          <p className="text-slate-400 text-sm m-0">
            Select a skill pill to view the exact projects other than standard coursework where that stack has been validated.
          </p>
        </div>

        {/* Filter Navigation row */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {filters.map((f, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveFilter(f.value as any);
                setSelectedSkill(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer font-display ${
                activeFilter === f.value
                  ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/10 font-bold'
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Double column grid listing technical strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Skills cards list */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map((skill, sIdx) => {
              const worksCount = skill.projectsUsed.length;
              const isSelected = selectedSkill?.name === skill.name;
              
              return (
                <div
                  key={sIdx}
                  onClick={() => setSelectedSkill(isSelected ? null : skill)}
                  className={`p-4 rounded-xl border transition-all text-left cursor-pointer group ${
                    isSelected 
                      ? 'bg-slate-950 border-brand-500 shadow-md shadow-brand-500/5' 
                      : 'bg-slate-950/40 border-slate-900 hover:border-slate-800 hover:bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white font-display uppercase tracking-wide">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-slate-500 hover:text-brand-500 font-mono font-medium border border-slate-900/50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      {worksCount > 0 ? `${worksCount} Active Proj` : 'Core Theory'}
                    </span>
                  </div>

                  {/* Rating Visual level */}
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-3 max-w-full">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        isSelected ? 'bg-gradient-to-r from-emerald-500 to-brand-500' : 'bg-slate-700'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono mt-1 px-0.5">
                    <span className="text-slate-500 uppercase tracking-widest">{skill.category}</span>
                    <span className="text-slate-400 font-bold">{skill.level}% Proficiency</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic usage highlight panel */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl min-h-[300px] flex flex-col justify-between relative overflow-hidden">
              {/* background vector */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-xl pointer-events-none" />

              {selectedSkill ? (
                <div className="flex flex-col gap-5 text-left h-full" id="skill-context-overlay">
                  <div>
                    <span className="text-[10px] font-mono text-brand-500 uppercase tracking-wider font-bold bg-brand-500/10 px-2.5 py-1 rounded border border-brand-500/10">
                      Validation Context
                    </span>
                    <h4 className="text-xl font-display font-bold text-white mt-3">
                      {selectedSkill.name} Deep Dive
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Skill level and context regarding Sai Varshith's projects.
                    </p>
                  </div>

                  {/* Level gauge visualization */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono block uppercase">Engineering Index</span>
                      <span className="text-sm font-bold text-slate-300 font-mono mt-1 block">Level {selectedSkill.level} / 100</span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const threshold = (idx + 1) * 20;
                        const filled = selectedSkill.level >= threshold;
                        return (
                          <span 
                            key={idx} 
                            className={`w-3.5 h-6 rounded-sm ${
                              filled ? 'bg-brand-500' : 'bg-slate-800'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold mb-2">Applied Project Repositories</h5>
                    {selectedSkill.projectsUsed.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {selectedSkill.projectsUsed.map((projId) => {
                          const proj = PROJECTS.find(p => p.id === projId);
                          return (
                            <div key={projId} className="bg-slate-900 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
                              <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                              <div className="min-w-0">
                                <span className="text-xs font-bold text-slate-200 block">{proj?.title || projId}</span>
                                <span className="text-[10px] text-slate-400 block truncate leading-tight mt-0.5">{proj?.description}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-slate-900 border border-slate-800/60 p-4 rounded-xl text-center">
                        <p className="text-xs text-slate-400 italic">No specific physical projects; highlighted strictly in academic labs, code challenges, and standard coursework.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center h-full my-auto gap-3">
                  <Star className="w-12 h-12 text-slate-700 animate-pulse" />
                  <h4 className="text-sm font-bold text-slate-300 font-display">No Skill Selected</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Click on any skill card in the grid to unveil details about project alignments and engineering proficiency metrics.
                  </p>
                </div>
              )}

              <div className="border-t border-slate-900 mt-6 pt-4 text-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-center gap-1.5 font-bold">
                  <Sparkles className="w-3 h-3 text-brand-500" /> Auto-synced with resume dataset
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
