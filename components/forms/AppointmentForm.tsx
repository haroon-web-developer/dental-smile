'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { ClinicSettings, ServiceItem } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

interface AppointmentFormProps {
  settings: ClinicSettings;
  services: ServiceItem[];
  preselectedService?: string;
}

export default function AppointmentForm({ settings, services, preselectedService }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    service: preselectedService || (services[0]?.name ?? 'Teeth Whitening'),
    preferred_date: '',
    preferred_time: '11:00 AM',
    message: '',
  });

  const [usePhoneForWhatsApp, setUsePhoneForWhatsApp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);

  const timeSlots = [
    '10:30 AM', '11:30 AM', '12:30 PM',
    '02:30 PM', '04:00 PM', '05:30 PM',
    '07:00 PM', '08:30 PM', '09:30 PM'
  ];

  // Dates formatted for quick mobile selection
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const tomorrowObj = new Date(now);
  tomorrowObj.setDate(now.getDate() + 1);
  const tomorrow = tomorrowObj.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    // Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      setLoading(false);
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number so we can confirm your appointment.');
      setLoading(false);
      return;
    }

    if (!formData.preferred_date) {
      setErrorMsg('Please select your preferred appointment date.');
      setLoading(false);
      return;
    }

    const finalWhatsApp = usePhoneForWhatsApp ? formData.phone : (formData.whatsapp || formData.phone);

    const payload = {
      ...formData,
      whatsapp: finalWhatsApp,
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit appointment.');
      }

      // Generate pre-filled WhatsApp link
      const waLink = buildWhatsAppLink(settings.whatsapp, {
        name: payload.name,
        phone: payload.phone,
        whatsapp: payload.whatsapp,
        email: payload.email,
        service: payload.service,
        preferred_date: payload.preferred_date,
        preferred_time: payload.preferred_time,
        message: payload.message,
      });

      setWhatsAppUrl(waLink);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please call us directly at ' + settings.phone);
    } finally {
      setLoading(false);
    }
  };

  if (submitted && whatsAppUrl) {
    return (
      <div id="appointment-success-container" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Appointment Request Received!
        </h3>
        <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your request for <span className="font-semibold text-slate-900">{formData.service}</span> on <span className="font-semibold text-slate-900">{formData.preferred_date}</span> at <span className="font-semibold text-slate-900">{formData.preferred_time}</span> has been logged in our clinic system.
        </p>

        {/* WhatsApp Fast Confirmation CTA */}
        <div className="mt-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-left max-w-lg mx-auto">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-900 text-sm">
                Fast-Track Confirmation via WhatsApp
              </h4>
              <p className="text-emerald-800 text-xs mt-1 leading-relaxed">
                Click below to send your pre-filled request directly to our clinic staff on WhatsApp for instant scheduling confirmation.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              id="success-open-whatsapp-btn"
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Fallback Call Info */}
        <div className="mt-6 text-xs text-slate-500">
          Prefer to speak over the phone? Call us at{' '}
          <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-sky-600 font-semibold underline">
            {settings.phone}
          </a>
        </div>

        <button
          id="book-another-appointment-btn"
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              whatsapp: '',
              email: '',
              service: preselectedService || (services[0]?.name ?? 'Teeth Whitening'),
              preferred_date: '',
              preferred_time: '11:00 AM',
              message: '',
            });
          }}
          className="mt-6 inline-block text-xs text-slate-500 hover:text-slate-800 font-medium underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      id="appointment-booking-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
    >
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
          <div>
            <p className="font-semibold">Unable to submit request</p>
            <p className="text-xs text-rose-700 mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Full Name & Phone Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="patient-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="patient-name"
              type="text"
              required
              placeholder="e.g. Muhammad Ahmed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="patient-phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="patient-phone"
              type="tel"
              required
              placeholder="e.g. 0318 1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* WhatsApp toggle / Alternate WhatsApp field */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
          <input
            id="same-whatsapp-checkbox"
            type="checkbox"
            checked={usePhoneForWhatsApp}
            onChange={(e) => setUsePhoneForWhatsApp(e.target.checked)}
            className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
          />
          <span>WhatsApp number is the same as the phone number</span>
        </label>

        {!usePhoneForWhatsApp && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <label htmlFor="patient-whatsapp" className="block text-xs font-semibold text-slate-700 mb-1">
              WhatsApp Number
            </label>
            <div className="relative">
              <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="patient-whatsapp"
                type="tel"
                placeholder="e.g. 0300 1234567"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition"
              />
            </div>
          </div>
        )}
      </div>

      {/* Service & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="patient-service" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Dental Service <span className="text-rose-500">*</span>
          </label>
          <select
            id="patient-service"
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-900 bg-white outline-none transition"
          >
            {services.map((svc) => (
              <option key={svc.id} value={svc.name}>
                {svc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="patient-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-slate-400 text-[11px] lowercase">(optional)</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="patient-email"
              type="email"
              placeholder="e.g. name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Preferred Date & Preferred Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="patient-date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Preferred Date <span className="text-rose-500">*</span>
            </label>
            {/* Quick Date Presets */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, preferred_date: today }))}
                className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-colors ${
                  formData.preferred_date === today
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, preferred_date: tomorrow }))}
                className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-colors ${
                  formData.preferred_date === tomorrow
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tomorrow
              </button>
            </div>
          </div>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="patient-date"
              type="date"
              required
              min={today}
              value={formData.preferred_date}
              onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
              className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-900 bg-white outline-none transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="patient-time" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Preferred Time <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="patient-time"
              required
              value={formData.preferred_time}
              onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
              className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-900 bg-white outline-none transition"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Message / Dental Concern */}
      <div>
        <label htmlFor="patient-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Dental Concern / Symptoms <span className="text-slate-400 text-[11px] lowercase">(optional)</span>
        </label>
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <textarea
            id="patient-message"
            rows={3}
            placeholder="Briefly describe your tooth issue, pain, or any question you have..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition resize-none"
          ></textarea>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="text-xs text-slate-500 flex items-start gap-2 pt-1">
        <span className="text-sky-600 font-bold">•</span>
        <p>Your information is used only to help us respond to your appointment request.</p>
      </div>

      {/* Submit Button */}
      <button
        id="submit-appointment-btn"
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-sm transition-all hover:shadow hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Submitting Request...</span>
          </>
        ) : (
          <>
            <Calendar className="w-5 h-5" />
            <span>Request Appointment</span>
          </>
        )}
      </button>
    </form>
  );
}
