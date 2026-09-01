'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Headphones, 
  Heart, 
  ShieldCheck, 
  Coffee, 
  Scan, 
  Clock, 
  Smile, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { ClinicSettings } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface BoutiqueExperienceSectionProps {
  settings: ClinicSettings;
}

export default function BoutiqueExperienceSection({ settings }: BoutiqueExperienceSectionProps) {
  const whatsappLink = buildWhatsAppLink(
    settings.whatsapp, 
    "Hi Dental Smile! I would like to learn more about your gentle, anxiety-free dental treatments and book a visit."
  );

  const comfortFeatures = [
    {
      icon: Heart,
      title: 'Gentle, Anxiety-Free Care',
      desc: 'We prioritize patient comfort with gentle chairside technique, empathetic communication, and unhurried appointments.',
      highlight: 'Zero Pressure'
    },
    {
      icon: Headphones,
      title: 'Ceiling Screens & Audio',
      desc: 'Watch your favorite media or listen to soothing audio during procedures to make your treatment fly by effortlessly.',
      highlight: 'Relax & Distract'
    },
    {
      icon: Sparkles,
      title: 'Gentle & Painless Numbing',
      desc: 'Topical soothing gels and precise local anesthesia delivery ensure you feel little to no discomfort throughout.',
      highlight: 'Pain Relief'
    },
    {
      icon: Scan,
      title: '3D Digital Previews',
      desc: 'See crystal-clear intraoral HD imaging and understand your diagnosis before any restorative or cosmetic work begins.',
      highlight: '100% Clarity'
    },
    {
      icon: Coffee,
      title: 'Serene Patient Lounge',
      desc: 'Clean, air-conditioned reception in Executive Arcade with complimentary water, refreshments, and high-speed Wi-Fi.',
      highlight: 'Executive Comfort'
    },
    {
      icon: Clock,
      title: 'Evening Hours till 10 PM',
      desc: 'Convenient after-work and late evening dental slots tailored for busy professionals and families in Islamabad.',
      highlight: 'Open Late'
    }
  ];

  return (
    <section id="boutique-experience" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Heart className="w-3.5 h-3.5 text-sky-400" />
            <span>The Boutique Dental Experience</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-4 text-white">
            Redefining Dental Comfort in Islamabad
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3.5 leading-relaxed">
            We know dental visits can cause apprehension. That is why our clinic in Islamabad is intentionally designed to be calm, welcoming, and completely anxiety-free.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Interactive Comfort Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comfortFeatures.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-800/60 border border-slate-700/70 hover:border-sky-400/50 p-5 rounded-2xl transition-all duration-300 hover:bg-slate-800/90 group"
                >
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-700/80 text-sky-300 border border-slate-600/60">
                      {item.highlight}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Curated Visual Atmosphere Showcase */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
              <div className="relative h-80 sm:h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80"
                  alt="Calm boutique dental environment in Islamabad Dental Clinic"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 space-y-2 text-white">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% Calming Environment</span>
                  </div>
                  <h3 className="text-lg font-bold">Gentle Care for the Entire Family</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    From children and first-time dental patients to working professionals seeking cosmetic upgrades.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Experience the difference</span>
                <span className="text-sm font-bold text-white">Schedule your gentle consultation</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/#appointment-section"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors"
                  title="WhatsApp Inquiries"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
