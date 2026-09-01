'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Phone,
  Activity,
  Heart,
  Smile,
  Zap
} from 'lucide-react';
import { ClinicSettings } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface HeroSectionProps {
  settings: ClinicSettings;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const whatsappLink = buildWhatsAppLink(
    settings.whatsapp,
    "Hi Dental Smile! I would like to book a dental consultation."
  );

  const keyHighlights = [
    { icon: Sparkles, label: 'Gentle & Painless Dentistry', desc: 'Anxiety-free local anesthesia' },
    { icon: ShieldCheck, label: 'Hospital-Grade Sterilization', desc: '100% Autoclaved instruments' },
    { icon: Clock, label: 'Open Daily till 10:00 PM', desc: 'Convenient evening appointments' },
    { icon: Smile, label: 'Cosmetic & Smile Makeovers', desc: 'Veneers, whitening & zirconia' }
  ];

  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlightIndex((prev) => (prev + 1) % keyHighlights.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [keyHighlights.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-30 border-b border-slate-800">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-sky-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-0 w-[28rem] h-[28rem] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-20 left-1/3 w-[36rem] h-[36rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid Overlay Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Premium Headline & Value Props */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Interactive Trust Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 shadow-inner backdrop-blur-md text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-white font-bold">{settings.google_rating}</span>
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-300">170+ Google Reviews</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-emerald-400 font-medium hidden sm:inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                Open Today till 10 PM
              </span>
            </div>

            {/* Main Luxury Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.12]">
              Experience Dental Care <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Designed for Pure Comfort.
              </span>
            </h1>

            {/* Refined Description */}
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Islamabad’s premier boutique dental clinic offering pain-free treatments, 3D aesthetic smile makeovers, and hospital-grade sterilization in a serene executive atmosphere.
            </p>

            {/* Live Changing Feature Highlight Bar */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-3 sm:p-4 backdrop-blur-xs">
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-sky-400 block truncate">
                      Patient Experience Promise
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeHighlightIndex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 truncate"
                      >
                        <span className="truncate">{keyHighlights[activeHighlightIndex].label}</span>
                        <span className="text-slate-400 text-xs hidden md:inline">
                          — {keyHighlights[activeHighlightIndex].desc}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {keyHighlights.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveHighlightIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeHighlightIndex ? 'w-4 sm:w-5 bg-sky-400' : 'w-1.5 bg-slate-600'
                      }`}
                      aria-label={`Highlight ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* High-Contrast Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1">
              <Link
                id="hero-book-appointment-cta"
                href="#appointment-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-sky-500/20 active:scale-98 transition-all"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Book Appointment Online</span>
              </Link>

              <a
                id="hero-whatsapp-cta"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-emerald-400 font-bold text-sm sm:text-base border border-slate-700 hover:border-emerald-500/40 active:scale-98 transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                id="hero-call-cta"
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/40 sm:bg-transparent text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors border border-slate-800 sm:border-transparent"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                <span>{settings.phone}</span>
              </a>
            </div>

            {/* Location & License Sub-note */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Executive Arcade, Islamabad</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>PMDC Verified Dental Specialists</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Luxury Clinic Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glow Behind Photo Frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />

              {/* Main Treatment Operatory Card */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
                <div className="relative h-80 sm:h-96 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                    alt="Dental Smile modern treatment suite"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 550px"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* High-Tech Badge on Top Right */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Dental Suite</span>
                  </div>

                  {/* Image Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 bg-sky-950/80 border border-sky-500/40 px-2.5 py-1 rounded-full mb-1.5 backdrop-blur-xs">
                      <CheckCircle2 className="w-3 h-3 text-sky-400" />
                      <span>Executive Healthcare Suite</span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Gentle, Microscope-Guided Dental Care
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Relax in ergonomic chairs with ceiling entertainment & zero wait time.
                    </p>
                  </div>
                </div>

                {/* Bottom Quick Metric Ticker */}
                <div className="p-4 bg-slate-900/95 border-t border-slate-800 grid grid-cols-3 gap-2 text-center divide-x divide-slate-800">
                  <div>
                    <span className="text-base font-extrabold text-white block">4.9★</span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Google Rating</span>
                  </div>
                  <div>
                    <span className="text-base font-extrabold text-sky-400 block">100%</span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Sterilized</span>
                  </div>
                  <div>
                    <span className="text-base font-extrabold text-emerald-400 block">10 PM</span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Evening Care</span>
                  </div>
                </div>
              </div>

              {/* Floating Verified Trust Badge 1 */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-3 sm:-left-6 bg-slate-800/95 backdrop-blur-md rounded-2xl py-2.5 px-3.5 shadow-2xl border border-slate-700 flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Top Rated Clinic</div>
                  <div className="text-[10px] font-medium text-slate-400">170+ Verified Patients</div>
                </div>
              </motion.div>

              {/* Floating Verified Trust Badge 2 */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-2 sm:-right-6 bg-slate-800/95 backdrop-blur-md rounded-2xl py-2.5 px-3.5 shadow-2xl border border-slate-700 flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Painless Technique</div>
                  <div className="text-[10px] font-medium text-slate-400">Zero Pressure Care</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
