import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getFAQs, getClinicSettings, getServices } from '@/lib/storage/db';
import FAQSection from '@/components/sections/FAQSection';
import AppointmentSection from '@/components/sections/AppointmentSection';
import { generateFAQSchema } from '@/lib/seo/schema-generator';
import { HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Dental Smile',
  description: 'Common questions about dental appointments, root canals, implants, braces, teeth whitening, clinic location, and opening hours at Dental Smile in Islamabad.',
  alternates: {
    canonical: '/faq',
  },
};

export default async function FAQPage() {
  const faqs = await getFAQs();
  const settings = await getClinicSettings();
  const services = await getServices();
  const faqSchema = generateFAQSchema(faqs);
  const whatsappLink = buildWhatsAppLink(settings.whatsapp);

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/80 px-3.5 py-1 rounded-full mb-3">
            Patient Support
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Everything you need to know about our dental treatments, appointment bookings, and clinic location in Islamabad.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold transition-colors border border-slate-700"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Component */}
      <FAQSection faqs={faqs} settings={settings} />

      {/* Appointment Booking Section */}
      <AppointmentSection settings={settings} services={services} />
    </div>
  );
}
