import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface LocationSectionProps {
  settings: ClinicSettings;
}

export default function LocationSection({ settings }: LocationSectionProps) {
  const whatsappLink = buildWhatsAppLink(settings.whatsapp);

  return (
    <section id="location-section" className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3 py-1 rounded-full">
            Clinic Location & Hours
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Visit Dental Smile
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Conveniently located on the Ground Floor of Executive Arcade in Islamabad with accessible patient parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Info Card */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Address</h3>
                  <address className="not-italic text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {settings.address}
                  </address>
                  <span className="inline-block text-[11px] text-sky-700 font-medium mt-1">
                    • Ground Floor (Step-free patient access)
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Clinic Hours</h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                    {settings.opening_hours}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Appointments & walk-in inquiries welcome throughout the day and evening.
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Direct Contact</h3>
                  <div className="mt-1 space-y-1">
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-bold text-sky-700 hover:underline block"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                id="location-directions-btn"
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-colors shadow-2xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                id="location-whatsapp-btn"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Location</span>
              </a>
            </div>
          </div>

          {/* Right Map Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
            <div className="relative w-full flex-1 min-h-[320px] bg-slate-100">
              <iframe
                title="Dental Smile Google Maps Location"
                src={settings.google_maps_embed_url}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">
                Executive Arcade, Islamabad, Pakistan
              </span>
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-sky-700 hover:underline"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
