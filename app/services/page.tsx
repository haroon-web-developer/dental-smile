import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getClinicSettings } from '@/lib/storage/db';
import ServicesGrid from '@/components/sections/ServicesGrid';
import AppointmentSection from '@/components/sections/AppointmentSection';
import { Sparkles, Calendar, Phone, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

export const metadata: Metadata = {
  title: 'Dental Services in Islamabad | Dental Smile',
  description: 'Explore full dental services at Dental Smile: Teeth Whitening, Root Canal Treatment, Tooth Extraction, Fillings, Zirconia & PFM Crowns, Implants, and Braces in Islamabad.',
  alternates: {
    canonical: '/services',
  },
};

export default async function ServicesPage() {
  const services = await getServices();
  const settings = await getClinicSettings();
  const whatsappLink = buildWhatsAppLink(settings.whatsapp);

  return (
    <div className="bg-slate-50">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/80 px-3.5 py-1 rounded-full mb-3">
            Treatments & Procedures
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Our Dental Services in Islamabad
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Professional oral healthcare for your family in Islamabad. We provide routine, restorative, and aesthetic dental treatments under strict hygiene standards.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#appointment-section"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-bold transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid
        services={services}
        title="All Available Dental Procedures"
        subtitle="Select a procedure below to learn about indications, what to expect, and how to schedule your visit."
      />

      {/* Appointment Section */}
      <AppointmentSection settings={settings} services={services} />
    </div>
  );
}
