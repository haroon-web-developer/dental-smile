'use client';

import React, { useState } from 'react';
import {
  Wrench,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ClinicSettings } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';
import Link from 'next/link';

interface MaintenanceScreenProps {
  settings: ClinicSettings;
  onBypassGranted?: () => void;
}

export default function MaintenanceScreen({ settings, onBypassGranted }: MaintenanceScreenProps) {
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [passkeyError, setPasskeyError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const clinicPhone = settings.maintenance_contact_phone || settings.phone || '0321 4576734';
  const clinicWhatsApp = settings.maintenance_contact_whatsapp || settings.whatsapp || '923214576734';
  const cleanPhone = clinicPhone.replace(/\s+/g, '');
  const cleanWhatsApp = clinicWhatsApp.replace(/[^0-9]/g, '');

  const handleVerifyPasskey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setPasskeyError(null);

    try {
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bypass', passkey }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid developer passkey.');
      }

      // Store in session
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('dev_bypass', 'true');
        document.cookie = 'developer_bypass=true; path=/; max-age=604800; SameSite=Lax';
      }

      setShowDeveloperModal(false);
      if (onBypassGranted) {
        onBypassGranted();
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      setPasskeyError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Top Brand Bar */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-lg">
                {settings.clinic_name || 'Dental Smile'}
              </span>
              <p className="text-[11px] text-slate-400 font-medium">Islamabad, Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Under Maintenance</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full mx-auto space-y-8">
          
          {/* Hero Maintenance Card */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            {/* Subtle aesthetic accent circle */}
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Icon & Title */}
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-inner">
                  <Wrench className="w-7 h-7" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {settings.maintenance_title || "We're Currently Upgrading Our Clinic Experience"}
                </h1>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {settings.maintenance_message || 
                    "Our website is undergoing scheduled clinical and technical enhancements to serve our patients with better digital booking and information services. We apologize for any temporary inconvenience and will be back online shortly."}
                </p>
              </div>

              {/* Status & Estimated Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Expected Back
                    </span>
                    <span className="text-sm font-bold text-white">
                      {settings.maintenance_expected_back || 'Returning shortly today'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Patient Care Status
                    </span>
                    <span className="text-sm font-bold text-emerald-300">
                      Clinic Team On-Call
                    </span>
                  </div>
                </div>
              </div>

              {/* Urgent Dental Care Section */}
              <div className="pt-6 border-t border-slate-700/70 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertCircle className="w-4 h-4" />
                  <h2 className="text-xs font-bold uppercase tracking-wider">
                    Need Immediate Dental Assistance?
                  </h2>
                </div>

                <p className="text-xs text-slate-300">
                  If you are experiencing acute toothache, trauma, or need an urgent clinical consultation, our dental reception team is actively responding via telephone and WhatsApp:
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <a
                    href={`tel:${cleanPhone}`}
                    id="maintenance-call-btn"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition transform active:scale-98"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call: {clinicPhone}</span>
                  </a>

                  <a
                    href={buildWhatsAppLink(cleanWhatsApp, "Hello Dental Smile team! I visited your website during scheduled maintenance and would like to inquire about an appointment.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="maintenance-whatsapp-btn"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition transform active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Emergency</span>
                  </a>
                </div>
              </div>

              {/* Physical Address */}
              <div className="pt-4 flex items-start gap-2 text-slate-400 text-xs">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  {settings.address || 'Executive Arcade, Main Boulevard, Islamabad, Pakistan'} • {settings.opening_hours || 'Open until 10:00 PM'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer note & developer trigger */}
          <div className="text-center space-y-3">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} {settings.clinic_name || 'Dental Smile'}. All rights reserved.
            </p>

            <div>
              <button
                type="button"
                onClick={() => setShowDeveloperModal(true)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-600 underline-offset-4 transition cursor-pointer"
                id="developer-access-trigger"
              >
                <Lock className="w-3 h-3" />
                <span>Developer & Staff Access</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Developer / Staff Bypass Modal */}
      {showDeveloperModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/30">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Developer / Staff Access</h3>
                  <p className="text-[11px] text-slate-400">Unlock site preview or manage clinic</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeveloperModal(false)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {passkeyError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{passkeyError}</span>
              </div>
            )}

            <form onSubmit={handleVerifyPasskey} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Developer Bypass Passkey
                </label>
                <input
                  type="password"
                  required
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter passkey (e.g. dev2026 or admin password)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  autoFocus
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Default passkey is <span className="font-mono text-sky-400">dev2026</span> or your Admin password.
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow transition disabled:opacity-50"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{isVerifying ? 'Verifying...' : 'Bypass & View Site'}</span>
                </button>
              </div>
            </form>

            <div className="pt-3 border-t border-slate-800 text-center">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold transition"
                onClick={() => setShowDeveloperModal(false)}
              >
                <span>Go to Admin Portal Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
