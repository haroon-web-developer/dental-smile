'use client';

import React from 'react';
import Link from 'next/link';
import { ClinicSettings } from '@/lib/types';
import { Phone, MessageCircle, Clock, AlertCircle, ShieldAlert, CheckCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface EmergencyEveningBannerProps {
  settings: ClinicSettings;
}

export default function EmergencyEveningBanner({ settings }: EmergencyEveningBannerProps) {
  const whatsappEmergency = buildWhatsAppLink(
    settings.whatsapp,
    'EMERGENCY DENTAL CARE: I have sudden tooth pain / dental injury and need immediate advice or appointment today in Islamabad.'
  );

  return (
    <section className="py-12 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Narrative */}
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Evening Toothache & Emergency Care</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Sudden Dental Pain? We Are Open Daily Until 10:00 PM
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Don&apos;t spend the night in unbearable tooth pain. Our clinic in Executive Arcade provides same-day emergency appointments for broken teeth, acute pulpitis, wisdom tooth flares, and lost fillings.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Same-Day Pain Relief
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Late Evening Slots
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Central Islamabad Access
              </span>
            </div>
          </div>

          {/* Right Action Callouts */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
            <a
              id="emergency-direct-call-btn"
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg shadow-rose-900/40 transition-all hover:scale-102"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now: {settings.phone}</span>
            </a>

            <a
              id="emergency-whatsapp-btn"
              href={whatsappEmergency}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Fast WhatsApp Triage</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
