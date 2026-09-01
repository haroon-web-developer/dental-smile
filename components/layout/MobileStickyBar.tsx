'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar, Navigation, Sparkles } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface MobileStickyBarProps {
  settings: ClinicSettings;
}

export default function MobileStickyBar({ settings }: MobileStickyBarProps) {
  const whatsappLink = buildWhatsAppLink(
    settings.whatsapp,
    "Hi Dental Smile! I would like to book a dental consultation."
  );

  return (
    <aside
      id="mobile-sticky-action-bar"
      aria-label="Mobile Quick Actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-3 pt-2 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_24px_rgba(0,0,0,0.35)]"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto items-center">
        {/* Direct Call Button */}
        <a
          id="sticky-bar-call"
          href={`tel:${settings.phone.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-300 active:text-white active:bg-slate-800/90 transition-all touch-manipulation min-h-[48px]"
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 mb-0.5 shadow-xs">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Call</span>
        </a>

        {/* WhatsApp Fast Chat */}
        <a
          id="sticky-bar-whatsapp"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-300 active:text-white active:bg-slate-800/90 transition-all touch-manipulation min-h-[48px] relative"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-600/50 flex items-center justify-center text-emerald-400 mb-0.5 shadow-xs">
            <MessageCircle className="w-4 h-4" />
            <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-[10px] font-bold text-emerald-400 tracking-tight">WhatsApp</span>
        </a>

        {/* Prominent Book Appointment CTA */}
        <Link
          id="sticky-bar-book"
          href="/#appointment-section"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-950 active:scale-95 transition-transform touch-manipulation min-h-[48px]"
        >
          <div className="w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-sky-400 to-teal-300 flex items-center justify-center gap-1 shadow-md shadow-sky-500/20">
            <Calendar className="w-4 h-4 text-slate-950" />
            <span className="text-[11px] font-black text-slate-950 tracking-tight uppercase">Book</span>
          </div>
        </Link>

        {/* Direct Map Navigation */}
        <a
          id="sticky-bar-directions"
          href={settings.google_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-300 active:text-white active:bg-slate-800/90 transition-all touch-manipulation min-h-[48px]"
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 mb-0.5 shadow-xs">
            <Navigation className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Map</span>
        </a>
      </div>
    </aside>
  );
}

