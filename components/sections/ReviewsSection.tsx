import React from 'react';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { ReviewItem, ClinicSettings } from '@/lib/types';
import { INITIAL_REVIEWS } from '@/lib/data/initial-data';

interface ReviewsSectionProps {
  settings: ClinicSettings;
  reviews?: ReviewItem[];
}

export default function ReviewsSection({
  settings,
  reviews = INITIAL_REVIEWS,
}: ReviewsSectionProps) {
  return (
    <section id="reviews-section" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{settings.google_rating} / 5.0 Google Rating</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            What Our Patients Say on Google
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Authentic feedback from patients who have visited Dental Smile.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {review.author}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-0.5">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{review.date_text}</span>
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                  G
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Google Maps */}
        <div className="mt-10 text-center">
          <a
            id="see-more-reviews-btn"
            href={settings.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs"
          >
            <span>See More Google Reviews</span>
            <ExternalLink className="w-4 h-4 text-slate-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
