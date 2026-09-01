'use client';

import React, { useState } from 'react';
import { STERILIZATION_STEPS, CLINIC_TECHNOLOGY } from '@/lib/data/initial-data';
import { ShieldCheck, Sparkles, Cpu, CheckCircle, Zap, Shield, Microscope } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';

interface SterilizationTechSectionProps {
  settings: ClinicSettings;
}

export default function SterilizationTechSection({ settings }: SterilizationTechSectionProps) {
  const [activeTab, setActiveTab] = useState<'sterilization' | 'technology'>('sterilization');

  return (
    <section id="safety-technology" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tab Toggle */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hospital-Grade Safety & Modern Tech</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Advanced Hygiene & Clinical Technology
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Your safety and comfort are non-negotiable. Explore our rigorous sterilization protocols and modern diagnostic equipment.
          </p>

          {/* Interactive Tab Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300 shadow-inner">
            <button
              id="tab-sterilization-btn"
              type="button"
              onClick={() => setActiveTab('sterilization')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'sterilization'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>4-Step Sterilization Protocol</span>
            </button>
            <button
              id="tab-technology-btn"
              type="button"
              onClick={() => setActiveTab('technology')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'technology'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-4 h-4 text-sky-600" />
              <span>Modern Dental Equipment</span>
            </button>
          </div>
        </div>

        {/* Sterilization View */}
        {activeTab === 'sterilization' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STERILIZATION_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <span className="text-4xl font-black text-emerald-500/20 absolute top-3 right-4 select-none">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Hygiene Guarantee Banner */}
            <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                  Our Patient Hygiene Promise
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold">
                  100% Autoclaved Instruments Sealed & Opened Before You
                </h4>
                <p className="text-xs text-emerald-100/90 max-w-2xl">
                  We adhere strictly to international cross-infection control guidelines. No instrument touches a patient unless it has passed multi-parameter Class-B autoclave testing.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2 bg-emerald-800/80 px-4 py-2.5 rounded-xl border border-emerald-700 text-xs font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Zero Cross-Infection Policy</span>
              </div>
            </div>
          </div>
        )}

        {/* Technology View */}
        {activeTab === 'technology' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {CLINIC_TECHNOLOGY.map((tech, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-full mb-3">
                    {tech.badge}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-sky-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Enhanced Patient Comfort</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
