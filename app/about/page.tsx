import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getClinicSettings, getServices } from '@/lib/storage/db';
import AppointmentSection from '@/components/sections/AppointmentSection';
import LocationSection from '@/components/sections/LocationSection';
import ClinicalTeamSection from '@/components/sections/ClinicalTeamSection';
import SterilizationTechSection from '@/components/sections/SterilizationTechSection';
import ClinicFacilityGallery from '@/components/sections/ClinicFacilityGallery';
import { ShieldCheck, HeartHandshake, MapPin, Clock, Star, CheckCircle, Calendar, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

export const metadata: Metadata = {
  title: 'About Dental Smile | Modern & Gentle Dentistry in Islamabad',
  description: 'Learn about Dental Smile in Islamabad. Dedicated to patient comfort, strict sterilization protocols, honest advice, and modern oral healthcare.',
  alternates: {
    canonical: '/about',
  },
};

export default async function AboutPage() {
  const settings = await getClinicSettings();
  const services = await getServices();
  const whatsappLink = buildWhatsAppLink(settings.whatsapp);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/80 px-3.5 py-1 rounded-full mb-3">
            About Our Practice
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Dedicated Dental Care in Islamabad
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            We are here to make dental visits comfortable, transparent, and accessible for individuals and families in Islamabad.
          </p>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
                <span>Our Clinical Values</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                A Practice Built Around Patient Comfort and Hygiene
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  At <strong className="text-slate-900">{settings.clinic_name}</strong>, our focus is simple: providing thoughtful, high-standard oral healthcare in an environment where patients feel heard and cared for.
                </p>
                <p>
                  We understand that many patients experience anxiety or hesitation regarding dental treatments. That is why our team emphasizes gentle chairside manners, clear explanations prior to any procedure, and open communication throughout your appointment.
                </p>
                <p>
                  Whether you are visiting for a routine cavity filling, teeth whitening, a root canal to relieve tooth pain, or discussing long-term options like dental implants and orthodontic braces, our approach remains honest and patient-centered.
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <ShieldCheck className="w-6 h-6 text-sky-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">Sterilization Priority</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Stringent cross-infection control guidelines and sterilized dental instruments for every appointment.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <HeartHandshake className="w-6 h-6 text-emerald-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">Honest Dental Advice</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Transparent treatment options based strictly on clinical necessity and patient comfort.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side Visual Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <div className="relative h-72 w-full bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80"
                    alt="Dental clinic setup in Islamabad"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 bg-white space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Location</span>
                    <span className="font-bold text-slate-900">Islamabad, Pakistan</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Google Rating</span>
                    <span className="font-bold text-amber-600">{settings.google_rating} ★ ({settings.google_review_count}+ Reviews)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Schedule</span>
                    <span className="font-bold text-emerald-700">{settings.opening_hours}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-sky-50 border border-sky-200 text-center">
                <h4 className="text-sm font-bold text-sky-950">
                  Ready to visit the clinic?
                </h4>
                <p className="text-xs text-sky-800 mt-1 mb-3">
                  Appointments and consultations can be requested online or directly on WhatsApp.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href="#appointment-section"
                    className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors"
                  >
                    Book Appointment
                  </Link>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Team Section */}
      <ClinicalTeamSection settings={settings} />

      {/* Hospital-Grade Sterilization & Tech */}
      <SterilizationTechSection settings={settings} />

      {/* Virtual Clinic Tour & Facility */}
      <ClinicFacilityGallery settings={settings} />

      {/* Appointment & Location Sections */}
      <AppointmentSection settings={settings} services={services} />
      <LocationSection settings={settings} />
    </div>
  );
}

