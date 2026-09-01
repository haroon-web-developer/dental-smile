'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope,
  Sparkles,
  ShieldAlert,
  Activity,
  Layers,
  Crown,
  Shield,
  Anchor,
  Smile,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { ServiceItem } from '@/lib/types';

interface ServicesGridProps {
  services: ServiceItem[];
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  ShieldAlert,
  Activity,
  Layers,
  Crown,
  Shield,
  Anchor,
  Smile,
};

export default function ServicesGrid({
  services,
  title = 'Comprehensive Dental Services in Islamabad',
  subtitle = 'From preventive check-ups and restorative fillings to surgical implants, orthodontic braces, and cosmetic crowns, we provide gentle, clinical dental care.'
}: ServicesGridProps) {
  return (
    <section id="services-section" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-900 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
            <span>Clinical Treatments & Specialties</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            return (
              <div
                key={service.id}
                id={`service-card-${service.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Service Photo Header */}
                  {service.image && (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={service.image}
                        alt={`${service.name} at Islamabad Dental Clinic`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                      
                      {/* Floating Badge */}
                      {service.badge && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-sky-900 px-2.5 py-1 rounded-full shadow-2xs border border-white/40">
                          {service.badge}
                        </span>
                      )}

                      {/* Icon overlay */}
                      <div className="absolute bottom-3 left-3.5 w-9 h-9 rounded-xl bg-sky-600/90 text-white flex items-center justify-center shadow-xs backdrop-blur-xs">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-5">
                    {!service.image && (
                      <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3.5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    )}

                    <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-sky-700 transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {service.short_description}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-800 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/#appointment-section`}
                    className="text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors"
                  >
                    Book Slot →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Helper */}
        <div className="mt-14 text-center bg-sky-50/70 border border-sky-100 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xs">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Unsure which dental procedure is right for your smile?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl mx-auto">
            Visit our clinic in Islamabad for a comprehensive visual evaluation, digital X-rays, and transparent clinical recommendations.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#appointment-section"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors shadow-2xs"
            >
              <span>Schedule Check-up</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
            >
              <span>View Clinic Location & Hours</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
