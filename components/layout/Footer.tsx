import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Clock, Star, ShieldCheck, HeartPulse } from 'lucide-react';
import { ClinicSettings, ServiceItem } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';
import Logo from '@/components/ui/Logo';

interface FooterProps {
  settings: ClinicSettings;
  services: ServiceItem[];
}

export default function Footer({ settings, services }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const whatsappLink = buildWhatsAppLink(settings.whatsapp);

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Pre-footer Callout */}
      <div className="border-b border-slate-800 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Need to Consult a Dentist in Islamabad?
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                We are open until 10:00 PM. Reach out for consultations, treatments, or routine check-ups.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                id="footer-call-btn"
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors border border-slate-700"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>{settings.phone}</span>
              </a>
              <a
                id="footer-whatsapp-btn"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Clinic Overview */}
          <div className="space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <Logo variant="dark" size="md" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Providing patient-focused modern and gentle dental care. Dedicated to hygiene, gentle treatments, and clear medical guidance.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-amber-300 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{settings.google_rating} / 5.0 Google Rating ({settings.google_review_count}+ Verified Reviews)</span>
            </div>
          </div>

          {/* Column 2: Dental Services */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Dental Services
            </h4>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-sky-400 transition-colors inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-sky-400 transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-sky-400 transition-colors">
                  About the Clinic
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Patient Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link href="/#appointment-section" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
                  Book an Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4 text-sm">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Visit or Contact
            </h4>
            
            <div className="flex items-start gap-3 text-slate-300">
              <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <address className="not-italic text-slate-400 text-xs sm:text-sm leading-relaxed">
                {settings.address}
              </address>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-slate-300 hover:text-white font-medium">
                {settings.phone}
              </a>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">{settings.opening_hours}</span>
            </div>

            <div className="pt-2">
              <a
                id="footer-directions-link"
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium underline underline-offset-4"
              >
                <span>Open Google Maps Directions</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {settings.clinic_name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Islamabad, Pakistan</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-slate-400 transition-colors">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
