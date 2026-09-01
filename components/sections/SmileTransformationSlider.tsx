'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BEFORE_AFTER_CASES } from '@/lib/data/initial-data';
import { Smile, ArrowRight, Clock, CalendarCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface SmileTransformationSliderProps {
  settings: ClinicSettings;
}

export default function SmileTransformationSlider({ settings }: SmileTransformationSliderProps) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const activeCase = BEFORE_AFTER_CASES[activeCaseIndex] || BEFORE_AFTER_CASES[0];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const whatsappLink = buildWhatsAppLink(
    settings.whatsapp,
    `Hi Dental Smile, I saw the before & after transformation for "${activeCase.title}" on your website and would like to consult with a doctor.`
  );

  return (
    <section id="smile-transformations" className="py-16 sm:py-24 bg-gradient-to-b from-white via-sky-50/20 to-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Smile className="w-3.5 h-3.5 text-teal-600" />
            <span>Real Patient Transformations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            See the Difference: Interactive Smile Gallery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Drag the interactive slider to compare clinical results before and after specialized treatments at Dental Smile.
          </p>
        </div>

        {/* Case Category Navigation Tabs (Mobile Scrollable) */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center no-scrollbar">
          {BEFORE_AFTER_CASES.map((item, idx) => (
            <button
              key={item.id}
              id={`case-tab-${item.id}`}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 touch-manipulation ${
                activeCaseIndex === idx
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{item.category}</span>
              <span className="hidden sm:inline text-xs ml-1.5 opacity-80">({item.title.split(' ')[0]})</span>
            </button>
          ))}
        </div>

        {/* Main Split Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
          {/* Left Column: Interactive Before/After Visual */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full h-64 sm:h-96 rounded-xl sm:rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-200 shadow-inner bg-slate-900 touch-none"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Background / Full Width) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={activeCase.afterImage}
                  alt={`After ${activeCase.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-md tracking-wide shadow-xs uppercase">
                  After Treatment
                </div>
              </div>

              {/* Before Image (Clipped / Foreground) */}
              <div
                className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-2xl transition-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="absolute inset-0 w-full h-full" style={{ minWidth: '100%' }}>
                  <Image
                    src={activeCase.beforeImage}
                    alt={`Before ${activeCase.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-md tracking-wide shadow-xs uppercase">
                  Before Treatment
                </div>
              </div>

              {/* Central Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg pointer-events-none"
                style={{ left: `calc(${sliderPosition}% - 2px)` }}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-800 shadow-md border border-slate-200 flex items-center justify-center text-xs font-bold">
                  ↔
                </div>
              </div>

              {/* Drag Hint */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900/75 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-xs pointer-events-none font-semibold">
                Touch & drag slider
              </div>
            </div>
          </div>

          {/* Right Column: Case Clinical Details & Quick Book */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wide">
                Case Study • {activeCase.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {activeCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeCase.description}
              </p>
            </div>

            {/* Metrics Pills */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-sky-50/70 border border-sky-100">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-sky-800 uppercase">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  Treatment Time
                </span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  {activeCase.duration}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 uppercase">
                  <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Clinical Visits
                </span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  {activeCase.visits}
                </span>
              </div>
            </div>

            {/* Treatment Highlights */}
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Customized to patient facial anatomy and bite alignment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Enamel-safe, biocompatible, and durable materials</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={`/services/${activeCase.procedureSlug}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Read Procedure Details</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Ask Doctor on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
