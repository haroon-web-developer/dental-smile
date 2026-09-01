'use client';

import React from 'react';
import Image from 'next/image';
import { CLINICAL_DOCTORS } from '@/lib/data/initial-data';
import { ClinicSettings } from '@/lib/types';
import { ShieldCheck, Calendar, Clock, Stethoscope } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface ClinicalTeamSectionProps {
  settings: ClinicSettings;
}

export default function ClinicalTeamSection({ settings }: ClinicalTeamSectionProps) {
  return (
    <section id="clinical-team" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
            <span>Qualified Specialists</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Clinical Dental Team
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our qualified dental surgeons and specialist orthodontists are dedicated to gentle, ethical, and evidence-based oral healthcare in Islamabad.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLINICAL_DOCTORS.map((doctor) => {
            const doctorWhatsApp = buildWhatsAppLink(
              settings.whatsapp,
              `Hi Dental Smile, I would like to request an appointment with ${doctor.name}.`
            );

            return (
              <div
                key={doctor.id}
                id={`doctor-card-${doctor.id}`}
                className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Photo with Overlay Badge */}
                <div className="relative h-64 w-full bg-slate-200 overflow-hidden">
                  <Image
                    src={doctor.photo}
                    alt={`${doctor.name} - ${doctor.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-sky-950 text-[11px] font-bold px-2.5 py-1 rounded-full border border-sky-100 shadow-2xs flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{doctor.pmdc_reg}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md">
                    {doctor.experience}
                  </div>
                </div>

                {/* Doctor Bio & Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-xs font-semibold text-sky-600">{doctor.title}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {doctor.qualifications.map((q: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                        >
                          {q}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-2">
                      {doctor.bio}
                    </p>
                  </div>

                  {/* Specializations & Availability */}
                  <div className="space-y-3 pt-3 border-t border-slate-200/80">
                    <div>
                      <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider mb-1">
                        Clinical Focus:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {doctor.specialties.map((spec: string, i: number) => (
                          <span
                            key={i}
                            className="text-[11px] text-slate-800 bg-sky-50 px-2 py-0.5 rounded font-medium border border-sky-100"
                          >
                            • {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doctor.availability}</span>
                    </div>

                    {/* Book CTA */}
                    <div className="pt-2">
                      <a
                        href={doctorWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors shadow-2xs"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book with {doctor.name.split(' ')[1]}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

