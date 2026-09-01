import React from 'react';
import { ShieldCheck, HeartHandshake, MapPin, Clock, MessageSquare, Smile } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';

interface WhyChooseUsProps {
  settings: ClinicSettings;
}

export default function WhyChooseUs({ settings }: WhyChooseUsProps) {
  const pillars = [
    {
      icon: HeartHandshake,
      title: 'Patient-Centered Approach',
      description: 'We listen to your specific dental concerns and provide honest, transparent advice tailored to your oral health needs.',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Infection Control & Sterilization',
      description: 'Patient safety is our priority. We maintain rigorous sterilization protocols and genuine hygiene standards for all dental procedures.',
    },
    {
      icon: MessageSquare,
      title: 'Clear Clinical Communication',
      description: 'We clearly explain treatment options, procedure steps, and aftercare instructions so you always feel confident and informed.',
    },
    {
      icon: MapPin,
      title: 'Prime & Accessible Location',
      description: 'Situated on the Ground Floor of Executive Arcade in Islamabad with convenient step-free entry and accessible patient parking.',
    },
    {
      icon: Clock,
      title: 'Open Until 10:00 PM',
      description: 'Extended evening hours make it convenient to visit after working hours or school without rushing.',
    },
    {
      icon: Smile,
      title: 'Comprehensive Treatments Under One Roof',
      description: 'From routine fillings and teeth whitening to root canals, zirconia crowns, implants, and braces, we handle diverse dental needs.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3 py-1 rounded-full">
            Our Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Why Patients Choose Dental Smile
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Delivering thoughtful, professional dental care focused on your comfort, hygiene, and lasting oral health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
