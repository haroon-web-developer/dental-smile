'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Calendar, Menu, X, Star, MapPin, Clock } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';
import Logo from '@/components/ui/Logo';

interface HeaderProps {
  settings: ClinicSettings;
}

export default function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const whatsappLink = buildWhatsAppLink(settings.whatsapp);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
      {/* Top Announcement / Trust Bar */}
      <div id="top-announcement-bar" className="bg-slate-900 text-slate-200 text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 sm:gap-4 text-center sm:text-left flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Open until 10 PM
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
              Executive Arcade, Islamabad
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
              {settings.google_rating} Google Rating ({settings.google_review_count}+ Reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              id="topbar-phone-link"
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1 sm:gap-1.5 text-slate-300 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
              <span>{settings.phone}</span>
            </a>
            <a
              id="topbar-whatsapp-link"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand Name */}
          <Link id="header-brand-logo" href="/" className="group focus:outline-none">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-sky-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="header-whatsapp-btn"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 text-sm font-semibold hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Link
              id="header-book-btn"
              href="/#appointment-section"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Direct Action Quick Buttons */}
          <div className="flex sm:hidden items-center gap-1.5">
            <a
              id="mobile-header-call-btn"
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 active:bg-slate-200 transition-colors"
              aria-label="Call Clinic"
            >
              <Phone className="w-4 h-4 text-sky-600" />
            </a>
            <a
              id="mobile-header-whatsapp-btn"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 active:bg-emerald-100 transition-colors"
              aria-label="WhatsApp Clinic"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </a>
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 active:bg-slate-200 transition-colors ml-1 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Hamburger Button (Tablet sm to lg) */}
          <button
            id="tablet-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hidden sm:block lg:hidden p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Backdrop Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] sm:top-[110px] z-50 lg:hidden flex flex-col justify-between bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            id="mobile-navigation-drawer"
            className="bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto"
          >
            {/* Top Quick Status Pill in Drawer */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-900">Open Today until 10:00 PM</span>
              </div>
              <span className="text-amber-600 font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                4.9★
              </span>
            </div>

            <nav className="flex flex-col space-y-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    id={`mobile-nav-link-${link.name.toLowerCase()}`}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2.5 border-t border-slate-100 flex flex-col gap-2">
              <Link
                id="mobile-menu-book-cta"
                href="/#appointment-section"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 text-white font-bold text-xs sm:text-sm text-center shadow-md shadow-sky-600/20 active:scale-98 transition-transform"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment Online</span>
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a
                  id="mobile-menu-call-cta"
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 text-slate-900 font-bold text-[11px] border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                  <span>Call Us</span>
                </a>
                <a
                  id="mobile-menu-whatsapp-cta"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-bold text-[11px] border border-emerald-200 active:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          {/* Backdrop Click Dismiss */}
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
