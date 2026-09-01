'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Smile, Check, ArrowRight, ShieldCheck, Star, Eye } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface AestheticSmileDesignSectionProps {
  settings: ClinicSettings;
}

export default function AestheticSmileDesignSection({ settings }: AestheticSmileDesignSectionProps) {
  const cosmeticPillars = [
    {
      id: 'veneers',
      title: 'Porcelain & Composite Veneers',
      badge: 'Signature Aesthetics',
      desc: 'Ultra-thin, custom-sculpted ceramic shells bonded to the front of teeth to fix chips, gaps, severe discoloration, and slight misalignments.',
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      bullets: ['Custom shade matching natural translucency', 'Minimally invasive enamel preservation', 'Stain-resistant porcelain surface']
    },
    {
      id: 'whitening',
      title: 'In-Office Enamel-Safe Whitening',
      badge: 'Same-Day Radiant Shine',
      desc: 'Clinical laser and LED-activated whitening formulations delivering up to 6–8 shades lighter within a single 50-minute appointment.',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      bullets: ['Zero enamel erosion formula', 'Desensitizing mineral post-treatment', 'Removes deep tea & coffee stains']
    },
    {
      id: 'zirconia',
      title: 'All-Ceramic Zirconia Crowns',
      badge: 'Metal-Free Durability',
      desc: 'High-translucency monolithic zirconia restorations delivering maximum biting strength with flawless natural tooth aesthetics.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      bullets: ['No black metal line at the gum margin', 'Biocompatible and gum-friendly', 'Precision digital CAD/CAM milling']
    },
    {
      id: 'aligners',
      title: 'Orthodontic Alignment & Braces',
      badge: 'Straight Smile Symmetry',
      desc: 'Modern ceramic braces and aligner solutions correcting crowding, spacing, and bite irregularities for both adolescents and adults.',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      bullets: ['Facial aesthetics preservation', 'Custom orthodontic force staging', 'Discrete tooth-colored brackets']
    }
  ];

  const [selectedPillar, setSelectedPillar] = useState(cosmeticPillars[0]);
  const whatsappLink = buildWhatsAppLink(
    settings.whatsapp,
    `Hi Dental Smile! I would like to consult about ${selectedPillar.title} for my smile makeover.`
  );

  return (
    <section id="aesthetic-smile-design" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold">
            <Smile className="w-3.5 h-3.5 text-amber-600" />
            <span>Cosmetic & Aesthetic Dentistry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-3.5">
            Artistry & Precision in Every Smile
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Whether you want a brighter shade, flawless porcelain restorations, or straight alignment, our customized cosmetic treatments are tailored to complement your natural facial harmony.
          </p>
        </div>

        {/* Interactive Aesthetic Suite Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Mobile Horizontal Pill Selector (Mobile Only) */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
            {cosmeticPillars.map((pillar) => {
              const isSelected = selectedPillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedPillar(pillar)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 active:scale-95 touch-manipulation ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {pillar.badge}
                </button>
              );
            })}
          </div>

          {/* Desktop Left Column: Interactive Pillar Selectors */}
          <div className="hidden lg:block lg:col-span-5 space-y-3">
            {cosmeticPillars.map((pillar) => {
              const isSelected = selectedPillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedPillar(pillar)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-sky-50/70 border-sky-300 shadow-md ring-1 ring-sky-300'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className={`text-base font-bold mt-2 ${
                      isSelected ? 'text-sky-900' : 'text-slate-900'
                    }`}>
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className={`mt-2 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Pillar Visual & Clinical Highlights */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
                {/* Photo showcase */}
                <div className="sm:col-span-6 relative h-56 sm:h-80 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700 shadow-md">
                  <Image
                    src={selectedPillar.image}
                    alt={selectedPillar.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                    <span className="bg-sky-600/90 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">
                      Clinical Result
                    </span>
                    <p className="mt-1 text-slate-200 text-[11px]">Natural Enamel Gradation & Radiance</p>
                  </div>
                </div>

                {/* Details & Action */}
                <div className="sm:col-span-6 space-y-3.5 sm:space-y-4">
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
                      {selectedPillar.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                      {selectedPillar.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 sm:mt-2 leading-relaxed">
                      {selectedPillar.desc}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-slate-800">
                    {selectedPillar.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Link
                      href="/#appointment-section"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors active:scale-98"
                    >
                      <span>Book Smile Consultation</span>
                    </Link>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-bold text-xs transition-colors active:scale-98"
                    >
                      <span>WhatsApp Case</span>
                    </a>
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
