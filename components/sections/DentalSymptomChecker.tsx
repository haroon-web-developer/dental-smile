'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DENTAL_SYMPTOMS } from '@/lib/data/initial-data';
import { SymptomItem, ClinicSettings } from '@/lib/types';
import { Stethoscope, ArrowRight, Clock, AlertTriangle, CheckCircle2, MessageCircle, Calendar } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface DentalSymptomCheckerProps {
  settings: ClinicSettings;
}

export default function DentalSymptomChecker({ settings }: DentalSymptomCheckerProps) {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(DENTAL_SYMPTOMS[0].id);

  const activeSymptom = DENTAL_SYMPTOMS.find(s => s.id === selectedSymptomId) || DENTAL_SYMPTOMS[0];

  const urgencyColors: Record<string, string> = {
    Immediate: 'bg-rose-50 text-rose-800 border-rose-200',
    Moderate: 'bg-amber-50 text-amber-800 border-amber-200',
    Elective: 'bg-sky-50 text-sky-800 border-sky-200',
  };

  const whatsappMessage = `Hi Dental Smile, I am experiencing "${activeSymptom.symptom}" and would like to check when I can visit for a consultation.`;
  const whatsappLink = buildWhatsAppLink(settings.whatsapp, whatsappMessage);

  return (
    <section id="symptom-checker" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Interactive Self-Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Not Sure What Dental Treatment You Need?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Select what you are experiencing below to view recommended clinical treatments, urgency level, and expected appointment timeframe.
          </p>
        </div>

        {/* 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Mobile Symptom Horizontal Selector (Mobile Only) */}
          <div className="lg:hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Your Current Concern:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
              {DENTAL_SYMPTOMS.map((item) => {
                const isSelected = item.id === selectedSymptomId;
                return (
                  <button
                    key={item.id}
                    id={`mobile-symptom-btn-${item.id}`}
                    type="button"
                    onClick={() => setSelectedSymptomId(item.id)}
                    className={`p-2.5 rounded-xl border text-left shrink-0 transition-all flex items-center gap-2 active:scale-95 touch-manipulation ${
                      isSelected
                        ? 'bg-sky-600 border-sky-400 text-white shadow-md shadow-sky-900/50'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-base">{item.emoji}</span>
                    <span className="text-xs font-bold whitespace-nowrap">{item.symptom}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Left Column: Symptom Grid */}
          <div className="hidden lg:block lg:col-span-5 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Your Current Concern:
            </span>
            <div className="space-y-2">
              {DENTAL_SYMPTOMS.map((item) => {
                const isSelected = item.id === selectedSymptomId;
                return (
                  <button
                    key={item.id}
                    id={`symptom-btn-${item.id}`}
                    type="button"
                    onClick={() => setSelectedSymptomId(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-sky-600 border-sky-400 text-white shadow-md shadow-sky-900/50 scale-[1.01]'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl p-1.5 rounded-lg bg-slate-900/40">{item.emoji}</span>
                      <div>
                        <span className="block font-bold text-xs sm:text-sm">{item.symptom}</span>
                        <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'translate-x-1 text-white' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Recommended Treatment Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-8 shadow-xl space-y-5 sm:space-y-6">
              {/* Header with Urgency Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4 sm:pb-5">
                <div>
                  <span className="text-xs text-sky-400 font-bold uppercase tracking-wider block">
                    Recommended Clinical Solution
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {activeSymptom.recommendedService}
                  </h3>
                </div>
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    urgencyColors[activeSymptom.urgency]
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{activeSymptom.urgency} Attention Recommended</span>
                </div>
              </div>

              {/* Symptom Context Description */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What This Typically Means
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 sm:p-4 rounded-xl border border-slate-700/60">
                  {activeSymptom.description}
                </p>
              </div>

              {/* Fast Facts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-700">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Typical Timeline</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white mt-1 block">
                    {activeSymptom.typicalVisits}
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-700">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Clinical Goal</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white mt-1 block">
                    Pain Relief & Long-Term Tooth Preservation
                  </span>
                </div>
              </div>

              {/* Clinical Assessment Notice */}
              <p className="text-[10px] sm:text-[11px] text-slate-400 italic">
                * Note: This self-assessment is for educational guidance only. A clinical examination and diagnostic X-ray by our dental surgeons are necessary to provide an accurate diagnosis.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
                <Link
                  href={`#appointment-section`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm shadow-md transition-all active:scale-98"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment for This</span>
                </Link>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-sm transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <Link
                  href={`/services/${activeSymptom.procedureSlug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-all sm:ml-auto"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
