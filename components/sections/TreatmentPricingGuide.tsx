'use client';

import React from 'react';
import Link from 'next/link';
import { TREATMENT_PRICING_GUIDE } from '@/lib/data/initial-data';
import { ClinicSettings } from '@/lib/types';
import { CreditCard, CheckCircle2, Clock, MessageCircle, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface TreatmentPricingGuideProps {
  settings: ClinicSettings;
}

export default function TreatmentPricingGuide({ settings }: TreatmentPricingGuideProps) {
  return (
    <section id="pricing-transparency" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5 text-sky-600" />
            <span>Honest & Transparent Dental Care</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Treatment Guide & Fee Transparency
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We believe in honest clinical advice with zero hidden fees. Below are standard starting estimates and details for common dental procedures in Islamabad.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENT_PRICING_GUIDE.map((plan, idx) => {
            const planWhatsApp = buildWhatsAppLink(
              settings.whatsapp,
              `Hi Dental Smile, I would like to inquire about the pricing and consultation for "${plan.service}".`
            );

            return (
              <div
                key={idx}
                className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200 hover:border-sky-300 p-6 flex flex-col justify-between space-y-5 transition-all shadow-2xs hover:shadow-md group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-600" />
                      {plan.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {plan.service}
                  </h3>

                  <div className="py-2 border-y border-slate-200/80">
                    <span className="text-xs text-slate-500 block">Estimated Fee:</span>
                    <span className="text-base font-extrabold text-slate-900 block mt-0.5">
                      {plan.estimate}
                    </span>
                  </div>

                  {/* Included Items */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      What is included:
                    </span>
                    {plan.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  {plan.slug === 'contact' ? (
                    <Link
                      href="#appointment-section"
                      className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                    >
                      <span>Book Exam</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href={`/services/${plan.slug}`}
                      className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                    >
                      <span>Procedure Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  <a
                    href={planWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Financial Transparency Note */}
        <div className="mt-10 p-5 rounded-2xl bg-sky-50/60 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <ShieldCheck className="w-6 h-6 text-sky-600 shrink-0 hidden sm:block" />
            <div>
              <span className="font-bold text-slate-900 block">Personalized Treatment Plans</span>
              <span>Exact cost depends on clinical tooth condition, number of canals/roots, and choice of restoration materials discussed during consultation.</span>
            </div>
          </div>
          <Link
            href="#appointment-section"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition-colors shadow-2xs"
          >
            Get In-Person Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
