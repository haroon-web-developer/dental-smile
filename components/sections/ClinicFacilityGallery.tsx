'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Eye, Sparkles, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';

interface ClinicFacilityGalleryProps {
  settings: ClinicSettings;
}

export default function ClinicFacilityGallery({ settings }: ClinicFacilityGalleryProps) {
  const facilitySpaces = [
    {
      id: 'operatory',
      title: 'Modern Dental Operatory Suite',
      subtitle: 'Ergonomic Treatment Chair & HD Imaging',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      description: 'Equipped with whisper-quiet brushless handpieces, fiber-optic illumination, and overhead digital screens to view diagnostic X-rays and intraoral scans.',
      features: ['Ergonomic memory-foam patient chair', 'Intraoral live camera display', 'Overhead surgical lighting']
    },
    {
      id: 'sterilization',
      title: 'Sterilization & Cross-Infection Center',
      subtitle: 'Hospital-Grade Class-B Autoclaving Bay',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
      description: 'Dedicated decontamination zone strictly isolating clean and sterile instruments with multi-stage chemical indicators and vacuum steam autoclaves.',
      features: ['Class-B vacuum autoclave', 'Ultrasonic enzymatic tank', 'Hermetic individual pouching']
    },
    {
      id: 'reception',
      title: 'Patient Welcome & Consultation Lounge',
      subtitle: 'Comfortable & Calm Waiting Environment',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      description: 'A serene, air-conditioned reception area in Executive Arcade Islamabad designed to put patients and families at ease before their appointments.',
      features: ['Air-conditioned reception', 'Dedicated patient parking nearby', 'Private consultation corner']
    },
    {
      id: 'radiography',
      title: 'Digital RVG Diagnostic Suite',
      subtitle: 'Low-Radiation Instant Imaging',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      description: 'Instant computerized sensor radiography revealing root structures, bone levels, and hidden interproximal decay in seconds with 90% reduced exposure.',
      features: ['Ultra-low radiation sensors', 'Instant chairside display', 'Sub-millimeter measurement accuracy']
    }
  ];

  const [activeSpaceId, setActiveSpaceId] = useState(facilitySpaces[0].id);
  const activeSpace = facilitySpaces.find(s => s.id === activeSpaceId) || facilitySpaces[0];

  return (
    <section id="clinic-facility-tour" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-teal-600" />
            <span>Virtual Clinic Tour</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Inside Dental Smile
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Take a look at our clinical environment, treatment operatories, and sterilization equipment located at Executive Arcade, Islamabad.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {facilitySpaces.map((space) => (
            <button
              key={space.id}
              id={`facility-tab-${space.id}`}
              type="button"
              onClick={() => setActiveSpaceId(space.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSpaceId === space.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {space.title.split(' ')[0]} {space.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Featured Facility Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          {/* Main Visual */}
          <div className="lg:col-span-7">
            <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
              <Image
                src={activeSpace.image}
                alt={activeSpace.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 700px"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-md flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Executive Arcade, Islamabad</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">
                {activeSpace.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {activeSpace.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                {activeSpace.description}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Facility Specifications:
              </span>
              {activeSpace.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-teal-950 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
                <span>Designed strictly adhering to clean air and infection prevention standards.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
