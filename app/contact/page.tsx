import React from 'react';
import type { Metadata } from 'next';
import { getClinicSettings, getServices } from '@/lib/storage/db';
import LocationSection from '@/components/sections/LocationSection';
import AppointmentSection from '@/components/sections/AppointmentSection';
import { MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

export const metadata: Metadata = {
  title: 'Contact & Location in Islamabad | Dental Smile',
  description: 'Contact Dental Smile: Ground Floor, Executive Arcade, Islamabad. Phone: 0318 5446951. Open until 10 PM.',
  alternates: {
    canonical: '/contact',
  },
};

export default async function ContactPage() {
  const settings = await getClinicSettings();
  const services = await getServices();
  const whatsappLink = buildWhatsAppLink(settings.whatsapp);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/80 px-3.5 py-1 rounded-full mb-3">
            Contact & Directions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Visit Us in Islamabad
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Conveniently situated in Executive Arcade, Islamabad. Reach out via phone, message on WhatsApp, or book your appointment online.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call {settings.phone}</span>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={settings.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold transition-colors border border-slate-700"
            >
              <Navigation className="w-4 h-4 text-sky-400" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </section>

      {/* Location Section with Map */}
      <LocationSection settings={settings} />

      {/* Appointment Section */}
      <AppointmentSection settings={settings} services={services} />
    </div>
  );
}
