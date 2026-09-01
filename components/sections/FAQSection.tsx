'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQItem, ClinicSettings } from '@/lib/types';
import { INITIAL_FAQS } from '@/lib/data/initial-data';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface FAQSectionProps {
  faqs?: FAQItem[];
  settings: ClinicSettings;
}

export default function FAQSection({ faqs = INITIAL_FAQS, settings }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const whatsappLink = buildWhatsAppLink(settings.whatsapp);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3 py-1 rounded-full">
            Patient Questions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Helpful information regarding dental visits, procedures, clinic location, and appointment scheduling.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none focus:bg-slate-50"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-sky-100 text-sky-700' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* More Questions Helper */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">
              Have a question not listed here?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Message us directly on WhatsApp or call our reception during opening hours.
            </p>
          </div>
          <a
            id="faq-ask-whatsapp-btn"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
