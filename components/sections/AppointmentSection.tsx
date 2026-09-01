import React from 'react';
import AppointmentForm from '../forms/AppointmentForm';
import { ClinicSettings, ServiceItem } from '@/lib/types';
import { Shield, Clock, Phone, MapPin } from 'lucide-react';

interface AppointmentSectionProps {
  settings: ClinicSettings;
  services: ServiceItem[];
  preselectedService?: string;
}

export default function AppointmentSection({
  settings,
  services,
  preselectedService,
}: AppointmentSectionProps) {
  return (
    <section id="appointment-section" className="py-16 sm:py-24 bg-white border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Patient Assurances */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3 py-1 rounded-full">
                Online Booking
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Request Your Dental Appointment
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Submit your preferred date, time, and dental service. Our clinic team will promptly confirm your slot and can connect directly over WhatsApp.
              </p>
            </div>

            {/* Benefit Points */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Open Until 10:00 PM
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Convenient evening slots available so you don&apos;t have to miss work or school.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Patient Privacy Protected
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Your contact information is only used to coordinate your appointment scheduling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Ground Floor Accessibility
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Convenient Ground Floor clinic access with step-free entry and dedicated patient parking.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Phone Assistance */}
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-sky-800 font-medium block">Urgent or same-day check-up?</span>
                <span className="text-xs text-sky-950 font-bold">Call our clinic desk directly:</span>
              </div>
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{settings.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <AppointmentForm
              settings={settings}
              services={services}
              preselectedService={preselectedService}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
