'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'icon' | 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'full', className = '', size = 'md' }: LogoProps) {
  // Dimensions based on size
  const iconSizeClass = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  const titleSizeClass = {
    sm: 'text-sm sm:text-base font-black',
    md: 'text-base sm:text-lg md:text-xl font-black',
    lg: 'text-xl sm:text-2xl font-black',
  }[size];

  const subtitleSizeClass = {
    sm: 'text-[8px] sm:text-[9px] tracking-wider font-semibold uppercase',
    md: 'text-[9px] sm:text-[10px] tracking-wider font-semibold uppercase',
    lg: 'text-[10px] sm:text-xs tracking-wider font-semibold uppercase',
  }[size];

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Dental Smile Custom Crest Symbol */}
      <div className={`relative ${iconSizeClass} rounded-xl overflow-hidden shadow-xs border ${
        isDark ? 'border-teal-500/30 bg-slate-900' : 'border-slate-200/80 bg-white'
      } flex items-center justify-center shrink-0`}>
        <Image
          src="/dental-smile-logo.jpg"
          alt="Dental Smile Logo"
          width={96}
          height={96}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          priority
        />
      </div>

      {variant !== 'icon' && (
        <div className="min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className={`${titleSizeClass} tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-slate-900 group-hover:text-teal-600'
            } transition-colors uppercase`}>
              Dental <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-sky-500">Smile</span>
            </span>
          </div>
          <span className={`${subtitleSizeClass} ${
            isDark ? 'text-teal-400' : 'text-slate-500'
          } mt-0.5 sm:mt-1 truncate`}>
            Modern & Gentle Dentistry
          </span>
        </div>
      )}
    </div>
  );
}
