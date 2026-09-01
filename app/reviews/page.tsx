import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getClinicSettings, getServices } from '@/lib/storage/db';
import { INITIAL_REVIEWS } from '@/lib/data/initial-data';
import ReviewsSection from '@/components/sections/ReviewsSection';
import AppointmentSection from '@/components/sections/AppointmentSection';
import { Star, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

export const metadata: Metadata = {
  title: 'Patient Reviews | Dental Smile (4.9★ Google Rating)',
  description: 'Read authentic Google patient reviews for Dental Smile in Islamabad. 4.9/5 Google rating with 174+ reviews.',
  alternates: {
    canonical: '/reviews',
  },
};

export default async function ReviewsPage() {
  const settings = await getClinicSettings();
  const services = await getServices();
  const whatsappLink = buildWhatsAppLink(settings.whatsapp);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/30">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5.0 Google Rating</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Verified Patient Reviews
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            See what patients say about their experience at Dental Smile in Islamabad.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              id="google-profile-direct-link"
              href={settings.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-sm"
            >
              <span>View Google Business Profile</span>
              <ExternalLink className="w-4 h-4 text-slate-600" />
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Component */}
      <ReviewsSection settings={settings} reviews={INITIAL_REVIEWS} />

      {/* Trust Quote Highlight */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Our Patient Promise
          </p>
          <blockquote className="text-lg sm:text-xl font-medium text-slate-800 mt-2 italic leading-relaxed">
            &ldquo;Their approach is patient centered. They listened to all my concerns and gave honest advice.&rdquo;
          </blockquote>
          <span className="block text-xs font-bold text-sky-700 mt-2">
            — Abdullah Ahmad (Verified Google Review)
          </span>
        </div>
      </section>

      {/* Appointment Section */}
      <AppointmentSection settings={settings} services={services} />
    </div>
  );
}
