import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Sparkles, Calendar, Tag, Check, ArrowUpRight } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

export default function CertificationsVault() {
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATIONS[0] | null>(null);

  return (
    <section className="py-16 border-t border-slate-900/60" id="certifications">
      <div className="flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <span className="text-brand-500 font-mono text-xs font-semibold uppercase tracking-widest bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20 inline-self-center self-center w-fit">
            Proven Merit
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight my-0">
            Professional Certifications
          </h2>
          <p className="text-slate-400 text-sm m-0">
            Credential badges obtained through rigorous online laboratory evaluations and tech evaluations.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, certIdx) => {
            const isSelected = selectedCert?.name === cert.name;
            return (
              <div
                key={certIdx}
                onClick={() => setSelectedCert(isSelected ? null : cert)}
                className={`relative group bg-slate-950 border rounded-2xl p-5 hover:scale-102 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between overflow-hidden text-left h-[240px] ${
                  isSelected 
                    ? 'border-brand-500 shadow-lg shadow-brand-500/5' 
                    : 'border-slate-900 hover:border-slate-800 hover:bg-slate-950/80'
                }`}
                id={`card-cert-${certIdx}`}
              >
                {/* Visual glow indicator */}
                <span className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${cert.color}`} />
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-500/5 rounded-full blur-xl group-hover:bg-brand-500/10 transition-colors pointer-events-none" />

                {/* Badge top metadata */}
                <div className="flex items-center justify-between gap-4">
                  <span className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-brand-500 group-hover:bg-brand-500 group-hover:text-slate-950 transition-colors duration-300">
                    <Award className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {cert.year}
                  </span>
                </div>

                {/* Title and Issuer */}
                <div className="my-4">
                  <h4 className="text-sm font-bold font-display text-white group-hover:text-brand-500 transition-colors duration-300 leading-snug">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1 font-semibold">
                    Issuer: {cert.issuer}
                  </p>
                </div>

                {/* Card footer details / instructions */}
                <div className="flex items-center justify-between text-[10px] font-mono border-t border-slate-900/60 pt-3 text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    ID {cert.credentialId}
                  </span>
                  <span className="text-brand-500 font-bold uppercase tracking-wider text-[8px] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Reveal <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded View Modal / Panel underneath */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-950 border border-brand-500/20 p-6 rounded-2xl max-w-2xl mx-auto w-full text-left relative overflow-hidden"
              id="expanded-cert-container"
            >
              {/* Backlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">{selectedCert.name}</h4>
                  <p className="text-xs font-mono text-slate-400 font-semibold mt-1">Verified Partner: {selectedCert.issuer}</p>
                </div>
                <span className="text-[10px] font-mono bg-brand-500/10 text-brand-500 border border-brand-500/20 rounded px-2.5 py-1 uppercase font-bold self-start sm:self-center">
                  Credential ID: {selectedCert.credentialId}
                </span>
              </div>

              <div className="mt-5">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block mb-2.5">Skills Certified & Validated</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCert.skillsCertified.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800">
                      <Check className="w-4 h-4 text-brand-500 shrink-0" />
                      <span className="text-xs text-slate-200">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-6 pt-4 border-t border-slate-900">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[8px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-brand-500" /> Issued in Calendar Year {selectedCert.year}
                </span>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Close parameters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
