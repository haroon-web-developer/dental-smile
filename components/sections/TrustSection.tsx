import React from 'react';
import { Star, MapPin, CheckCircle, Clock } from 'lucide-react';
import { ClinicSettings } from '@/lib/types';

interface TrustSectionProps {
  settings: ClinicSettings;
}

export default function TrustSection({ settings }: TrustSectionProps) {
  const trustPoints = [
    {
      id: 'trust-rating',
      icon: Star,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      title: `${settings.google_rating}★ Google Rating`,
      description: `Based on ${settings.google_review_count}+ verified reviews from local patients`,
    },
    {
      id: 'trust-services',
      icon: CheckCircle,
      iconColor: 'text-sky-600',
      bgColor: 'bg-sky-50',
      title: 'Comprehensive Dental Services',
      description: 'From routine fillings and whitening to root canals, implants, and braces',
    },
    {
      id: 'trust-location',
      icon: MapPin,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      title: 'Convenient Central Location',
      description: 'Ground Floor, Executive Arcade, Islamabad with easy patient access',
    },
    {
      id: 'trust-hours',
      icon: Clock,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      title: 'Open until 10:00 PM',
      description: 'Flexible evening hours to accommodate work and family schedules',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.id}
                id={point.id}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg ${point.bgColor} ${point.iconColor} flex items-center justify-center mb-3.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {point.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
