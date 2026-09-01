'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Application Error
            </h1>
            <p className="text-xs text-slate-600">
              A critical error occurred. Please refresh or try again.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Page</span>
          </button>
        </div>
      </body>
    </html>
  );
}
