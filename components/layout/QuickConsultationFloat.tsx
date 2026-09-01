'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, X, ChevronUp, Clock, Star } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface QuickConsultationFloatProps {
  settings: ClinicSettings;
}

export default function QuickConsultationFloat({ settings }: QuickConsultationFloatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappLink = buildWhatsAppLink(
    settings.whatsapp,
    'Hi Dental Smile, I would like to ask a quick question about dental treatment / booking.'
  );

  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-40">
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                Dental Smile
              </h4>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open Until 10:00 PM • Islamabad
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Need dental advice or want to schedule an appointment in Islamabad? Choose your preferred contact method:
          </p>

          <div className="space-y-2">
            {/* WhatsApp Link */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition group"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-white px-2 py-0.5 rounded border border-emerald-200">
                Fast Reply
              </span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-950 border border-sky-200 text-xs font-bold transition group"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-600" />
                <span>Call {settings.phone}</span>
              </div>
              <span className="text-[10px] text-sky-700 font-semibold bg-white px-2 py-0.5 rounded border border-sky-200">
                Instant
              </span>
            </a>

            {/* Book Appointment CTA */}
            <a
              href="#appointment-section"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Online</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="quick-consultation-float-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 hover:bg-sky-700 text-white shadow-xl hover:shadow-2xl border border-slate-700 transition-all hover:scale-105 group"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="text-xs font-bold hidden sm:inline">Ask Dentist</span>
        <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
