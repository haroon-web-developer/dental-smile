'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, AlertCircle, ArrowRight, Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@dentalsmile.pk');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e?: React.FormEvent, customPassword?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const passToUse = (customPassword !== undefined ? customPassword : password).trim();
    const emailToUse = (email || 'admin@dentalsmile.pk').trim();

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToUse, password: passToUse }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please check password.');
      }

      // Save token in client-side storage for robust iframe & cross-origin session persistence
      if (typeof window !== 'undefined') {
        const token = data.token || `dental_smile_session_${Date.now()}`;
        localStorage.setItem('dental_smile_admin_token', token);
        localStorage.setItem('dental_smile_admin_user', JSON.stringify(data.user || { role: 'admin', email: emailToUse }));
      }

      // Redirect smoothly to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFillAndLogin = () => {
    setEmail('admin@dentalsmile.pk');
    setPassword('DentalSmile2026!');
    handleLogin(undefined, 'DentalSmile2026!');
  };

  return (
    <div className="min-h-[80vh] bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Clinic Administration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Dental Smile Staff Portal
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dentalsmile.pk"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-900 outline-none transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setPassword('DentalSmile2026!');
                  setErrorMsg(null);
                }}
                className="text-[11px] font-bold text-sky-600 hover:text-sky-800 hover:underline flex items-center gap-1"
              >
                <KeyRound className="w-3 h-3" />
                <span>Insert Default Password</span>
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-sm text-slate-900 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-600">
                Default: <code className="font-mono font-bold text-sky-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">DentalSmile2026!</code>
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleQuickFillAndLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-xs border border-sky-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>1-Click Fast Sign In</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-800 font-medium">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
