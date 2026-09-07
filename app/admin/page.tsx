'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Trash2,
  MessageCircle,
  Phone,
  Mail,
  Settings,
  ListFilter,
  LogOut,
  Save,
  Search,
  Sparkles,
  HelpCircle,
  Star,
  ExternalLink,
  ChevronRight,
  Plus,
  RefreshCw,
  Wrench,
  Power,
  Eye,
  AlertTriangle,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { Appointment, ClinicSettings, ServiceItem, FAQItem } from '@/lib/types';
import { INITIAL_REVIEWS, INITIAL_CLINIC_SETTINGS, INITIAL_SERVICES, INITIAL_FAQS } from '@/lib/data/initial-data';
import Link from 'next/link';
import { buildWhatsAppLink } from '@/lib/whatsapp/generate-message';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'settings' | 'faqs' | 'reviews'>('appointments');

  // State data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [settings, setSettings] = useState<ClinicSettings>(INITIAL_CLINIC_SETTINGS);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  
  // Appointment filter & search
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status feedback
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Toggle Maintenance Mode
  const handleToggleMaintenance = async (desiredState?: boolean) => {
    const targetState = desiredState !== undefined ? desiredState : !settings.maintenance_mode;
    try {
      setLoadingAction(true);
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', enabled: targetState }),
      });
      if (res.ok) {
        setSettings(prev => ({ ...prev, maintenance_mode: targetState }));
        setSaveSuccessMsg(
          targetState
            ? '🚨 Maintenance Mode ENABLED! Website is now hidden from the public.'
            : '✅ Maintenance Mode DISABLED! Website is now publicly live.'
        );
        setTimeout(() => setSaveSuccessMsg(null), 5000);
      }
    } catch (err) {
      console.error('Error toggling maintenance:', err);
    } finally {
      setLoadingAction(false);
    }
  };

  const loadData = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const [aptRes, srvRes, setRes, faqRes] = await Promise.allSettled([
        fetch('/api/appointments', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/services', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/settings', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/faqs', { cache: 'no-store' }).then(r => r.json()),
      ]);

      if (aptRes.status === 'fulfilled' && Array.isArray(aptRes.value?.appointments)) {
        setAppointments(aptRes.value.appointments);
      }
      if (srvRes.status === 'fulfilled' && Array.isArray(srvRes.value?.services) && srvRes.value.services.length > 0) {
        setServices(srvRes.value.services);
      }
      if (setRes.status === 'fulfilled' && setRes.value?.settings) {
        setSettings(setRes.value.settings);
      }
      if (faqRes.status === 'fulfilled' && Array.isArray(faqRes.value?.faqs) && faqRes.value.faqs.length > 0) {
        setFaqs(faqRes.value.faqs);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      if (isManual) setIsRefreshing(false);
    }
  };

  // Check authentication on mount & set up auto-polling
  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('dental_smile_admin_token') : null;
        
        const headers: Record<string, string> = {};
        if (storedToken) {
          headers['Authorization'] = `Bearer ${storedToken}`;
          headers['x-admin-token'] = storedToken;
        }

        const res = await fetch('/api/admin/auth', { headers, cache: 'no-store' });

        if (!res.ok) {
          if (!storedToken) {
            router.push('/admin/login');
            return;
          }
        }
        await loadData();
      } catch (err) {
        console.error('Auth verification error:', err);
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('dental_smile_admin_token') : null;
        if (storedToken) {
          await loadData();
        } else {
          router.push('/admin/login');
        }
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuthSession();

    // Auto-poll every 12 seconds for real-time appointment updates
    const interval = setInterval(() => {
      loadData();
    }, 12000);

    const handleFocus = () => {
      loadData();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dental_smile_admin_token');
        localStorage.removeItem('dental_smile_admin_user');
      }
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      router.push('/admin/login');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Appointment['status']) => {
    try {
      setLoadingAction(true);
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setAppointments(prev =>
          prev.map(apt => (apt.id === id ? { ...apt, status: newStatus } : apt))
        );
        if (selectedAppointment && selectedAppointment.id === id) {
          setSelectedAppointment({ ...selectedAppointment, status: newStatus });
        }
        setSaveSuccessMsg(`Status updated to ${newStatus.toUpperCase()}`);
        setTimeout(() => setSaveSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handlePromptDelete = (apt: Appointment) => {
    setAppointmentToDelete(apt);
  };

  const handleConfirmDelete = async () => {
    if (!appointmentToDelete) return;
    const targetId = appointmentToDelete.id;
    const targetName = appointmentToDelete.name;

    try {
      setIsDeleting(true);
      // Optimistic delete from UI state immediately
      setAppointments(prev => prev.filter(apt => String(apt.id).trim() !== String(targetId).trim()));
      
      if (selectedAppointment && selectedAppointment.id === targetId) {
        setSelectedAppointment(null);
      }

      const res = await fetch(`/api/appointments/${targetId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        setSaveSuccessMsg(`Appointment for ${targetName} deleted permanently.`);
        setTimeout(() => setSaveSuccessMsg(null), 3500);
      } else {
        console.warn('Failed to delete on server, refreshing...');
      }

      await loadData();
    } catch (err) {
      console.error('Error deleting appointment:', err);
      await loadData();
    } finally {
      setIsDeleting(false);
      setAppointmentToDelete(null);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      setLoadingAction(true);
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaveSuccessMsg('Clinic settings saved successfully.');
        setTimeout(() => setSaveSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleSaveService = async (service: ServiceItem) => {
    try {
      setLoadingAction(true);
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });
      if (res.ok) {
        setSaveSuccessMsg(`Service "${service.name}" updated successfully.`);
        setTimeout(() => setSaveSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error('Error saving service:', err);
    } finally {
      setLoadingAction(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold text-slate-700">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  // Calculate KPIs
  const totalCount = appointments.length;
  const newCount = appointments.filter(a => a.status === 'new').length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

  // Filtered appointments list
  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      apt.name.toLowerCase().includes(query) ||
      apt.phone.toLowerCase().includes(query) ||
      apt.service.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-teal-500 to-sky-600 flex items-center justify-center font-bold text-white text-sm shadow-xs">
                DS
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none">Dental Smile</h1>
                <span className="text-xs text-teal-400 font-medium">Administration Dashboard</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Maintenance Mode Quick Toggle Widget */}
              <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="flex h-2 w-2 relative">
                  {settings?.maintenance_mode ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  )}
                </span>
                <span className={`text-[11px] font-bold ${settings?.maintenance_mode ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {settings?.maintenance_mode ? 'Site Hidden (Maintenance ON)' : 'Site Live (Public)'}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleMaintenance()}
                  disabled={loadingAction}
                  className={`ml-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg transition cursor-pointer disabled:opacity-50 ${
                    settings?.maintenance_mode
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                      : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {settings?.maintenance_mode ? 'Turn OFF (Go Live)' : 'Hide Website'}
                </button>
              </div>

              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                <span>View Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-800/80 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Active Maintenance Mode Alert Banner */}
        {settings?.maintenance_mode && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-extrabold text-sm text-amber-950">
                  Maintenance Mode is Currently ACTIVE
                </h2>
                <p className="text-xs text-amber-800 mt-0.5">
                  The public website is hidden from visitors. Anyone visiting any page will see your customized &quot;Under Maintenance / Working on Site&quot; notice. You can edit this notice in the Clinic Settings tab.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleToggleMaintenance(false)}
                disabled={loadingAction}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Turn OFF (Make Public)</span>
              </button>
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100/60 transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Site</span>
              </Link>
            </div>
          </div>
        )}
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Total Requests</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{totalCount}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-sky-200 shadow-2xs">
            <span className="text-[11px] uppercase font-bold text-sky-600 block">New</span>
            <span className="text-2xl font-extrabold text-sky-700 mt-1 block">{newCount}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-[11px] uppercase font-bold text-amber-600 block">Pending</span>
            <span className="text-2xl font-extrabold text-amber-700 mt-1 block">{pendingCount}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="text-[11px] uppercase font-bold text-emerald-600 block">Confirmed</span>
            <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">{confirmedCount}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Completed</span>
            <span className="text-2xl font-extrabold text-slate-800 mt-1 block">{completedCount}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs">
            <span className="text-[11px] uppercase font-bold text-rose-500 block">Cancelled</span>
            <span className="text-2xl font-extrabold text-rose-700 mt-1 block">{cancelledCount}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 gap-2 mb-6 overflow-x-auto whitespace-nowrap">
          <button
            type="button"
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'appointments'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Appointments ({appointments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'services'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Services ({services.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Clinic Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'faqs'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            FAQs ({faqs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Google Reviews (174+)
          </button>
        </div>

        {/* Success Toast */}
        {saveSuccessMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* ----------------- TAB 1: APPOINTMENTS ----------------- */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patient, phone, service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => loadData(true)}
                  disabled={isRefreshing}
                  title="Reload Inquiries"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold shrink-0 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
                  <span className="hidden sm:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                <span className="text-xs font-semibold text-slate-500">Status:</span>
                {['all', 'new', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                      statusFilter === st
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {filteredAppointments.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm">
                  No appointment requests matching your criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
                        <th className="py-3.5 px-4">Patient</th>
                        <th className="py-3.5 px-4">Phone / WhatsApp</th>
                        <th className="py-3.5 px-4">Service</th>
                        <th className="py-3.5 px-4">Preferred Slot</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAppointments.map((apt) => {
                        const waPatientLink = buildWhatsAppLink(
                          apt.whatsapp || apt.phone,
                          undefined,
                          `Hello ${apt.name}, this is Dental Smile regarding your appointment request for ${apt.service} on ${apt.preferred_date} at ${apt.preferred_time}.`
                        );

                        const statusBadgeStyles: Record<string, string> = {
                          new: 'bg-sky-100 text-sky-800 border-sky-200',
                          pending: 'bg-amber-100 text-amber-800 border-amber-200',
                          confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                          completed: 'bg-slate-100 text-slate-800 border-slate-300',
                          cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
                        };

                        return (
                          <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-slate-900">
                              <div>{apt.name}</div>
                              {apt.email && <div className="text-[11px] text-slate-400 font-normal">{apt.email}</div>}
                            </td>
                            <td className="py-3.5 px-4 text-slate-700">
                              <div>{apt.phone}</div>
                              {apt.whatsapp && apt.whatsapp !== apt.phone && (
                                <div className="text-[11px] text-emerald-700">WA: {apt.whatsapp}</div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-800">
                              {apt.service}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              <div className="font-semibold text-slate-800">{apt.preferred_date}</div>
                              <div className="text-[11px] text-slate-500">{apt.preferred_time}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border ${statusBadgeStyles[apt.status] || 'bg-slate-100'}`}>
                                {apt.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-1.5">
                              {/* Open WhatsApp with Patient */}
                              <a
                                href={waPatientLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open WhatsApp Chat with Patient"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold text-xs transition"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>WhatsApp</span>
                              </a>

                              {/* View Details */}
                              <button
                                type="button"
                                onClick={() => setSelectedAppointment(apt)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition"
                              >
                                View
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handlePromptDelete(apt)}
                                title={`Delete appointment request for ${apt.name}`}
                                aria-label={`Delete appointment request for ${apt.name}`}
                                className="inline-flex items-center justify-center p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 transition cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-rose-600" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Delete Confirmation Modal (Replaces blocked window.confirm) */}
            {appointmentToDelete && (
              <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Delete Appointment Request?</h3>
                      <p className="text-xs text-slate-500">This action is permanent and cannot be undone.</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Patient:</span>
                      <span className="font-bold text-slate-900">{appointmentToDelete.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Service:</span>
                      <span className="font-semibold text-slate-800">{appointmentToDelete.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Phone:</span>
                      <span className="text-slate-800">{appointmentToDelete.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Date & Slot:</span>
                      <span className="text-slate-800">{appointmentToDelete.preferred_date} ({appointmentToDelete.preferred_time})</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => setAppointmentToDelete(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={handleConfirmDelete}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Permanently</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appointment Detail Modal */}
            {selectedAppointment && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      Appointment Details
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedAppointment(null)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Patient Name:</span>
                      <span className="font-bold text-slate-900">{selectedAppointment.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Phone:</span>
                      <a href={`tel:${selectedAppointment.phone}`} className="font-bold text-sky-700 underline">
                        {selectedAppointment.phone}
                      </a>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">WhatsApp:</span>
                      <span className="font-semibold text-slate-900">{selectedAppointment.whatsapp || selectedAppointment.phone}</span>
                    </div>
                    {selectedAppointment.email && (
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Email:</span>
                        <span className="text-slate-900">{selectedAppointment.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Service:</span>
                      <span className="font-bold text-slate-900">{selectedAppointment.service}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Preferred Date & Time:</span>
                      <span className="font-semibold text-slate-900">{selectedAppointment.preferred_date} at {selectedAppointment.preferred_time}</span>
                    </div>
                    {selectedAppointment.message && (
                      <div className="py-2">
                        <span className="text-slate-500 block mb-1">Patient Concern:</span>
                        <p className="p-3 bg-slate-50 rounded-lg text-slate-700 text-xs italic">
                          &ldquo;{selectedAppointment.message}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Status update buttons */}
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-2">Update Status:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {(['pending', 'confirmed', 'completed', 'cancelled', 'new'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleUpdateStatus(selectedAppointment.id, st)}
                          className={`py-2 px-2 rounded-lg text-xs font-bold uppercase transition ${
                            selectedAppointment.status === st
                              ? 'bg-sky-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          Mark {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp & Delete Actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2.5">
                    <a
                      href={buildWhatsAppLink(selectedAppointment.whatsapp || selectedAppointment.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handlePromptDelete(selectedAppointment)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-bold text-xs transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-rose-600" />
                      <span>Delete Request</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAppointment(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 2: SERVICES ----------------- */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Manage Dental Services</h2>
                <p className="text-xs text-slate-500">Edit clinical services descriptions and active statuses.</p>
              </div>
            </div>

            <div className="space-y-6">
              {services.map((service, idx) => (
                <div key={service.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">{service.name}</h3>
                      <span className="text-[11px] text-slate-400 font-mono">/services/{service.slug}</span>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={service.active}
                        onChange={(e) => {
                          const updated = { ...service, active: e.target.checked };
                          setServices(services.map(s => s.id === service.id ? updated : s));
                        }}
                        className="w-4 h-4 text-sky-600 rounded"
                      />
                      <span>Active on Website</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Short Description (Displayed in grids & cards)
                    </label>
                    <textarea
                      rows={2}
                      value={service.short_description}
                      onChange={(e) => {
                        const updated = { ...service, short_description: e.target.value };
                        setServices(services.map(s => s.id === service.id ? updated : s));
                      }}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Full Clinical Description (Displayed on detail page)
                    </label>
                    <textarea
                      rows={3}
                      value={service.description}
                      onChange={(e) => {
                        const updated = { ...service, description: e.target.value };
                        setServices(services.map(s => s.id === service.id ? updated : s));
                      }}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSaveService(service)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-2xs transition"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Service Changes</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 3: CLINIC SETTINGS ----------------- */}
        {activeTab === 'settings' && settings && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* DEVELOPER MAINTENANCE MODE SECTION */}
            <div className={`rounded-2xl p-6 sm:p-8 border transition-all ${
              settings.maintenance_mode
                ? 'bg-amber-500/5 border-amber-300 shadow-sm'
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Developer Maintenance Mode & Site Hiding
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 max-w-xl">
                    Instantly hide the entire website from the public and display a custom &quot;Under Maintenance / Working on Site&quot; page. You as a developer/admin can bypass this screen and preview the website anytime.
                  </p>
                </div>

                {/* Primary Maintenance Toggle */}
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="admin-maintenance-mode-toggle"
                      checked={Boolean(settings.maintenance_mode)}
                      onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    settings.maintenance_mode ? 'text-amber-700' : 'text-slate-500'
                  }`}>
                    {settings.maintenance_mode ? 'Maintenance Active' : 'Publicly Live'}
                  </span>
                </div>
              </div>

              {/* Maintenance Settings Inputs */}
              <div className="pt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Maintenance Page Headline
                    </label>
                    <input
                      type="text"
                      value={settings.maintenance_title || ''}
                      onChange={(e) => setSettings({ ...settings, maintenance_title: e.target.value })}
                      placeholder="e.g., We're Currently Upgrading Our Clinic Experience"
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Maintenance Notice / Patient Explanation
                    </label>
                    <textarea
                      rows={3}
                      value={settings.maintenance_message || ''}
                      onChange={(e) => setSettings({ ...settings, maintenance_message: e.target.value })}
                      placeholder="Explain the scheduled upgrade or system maintenance to patients..."
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Expected Return / Back Online Time
                    </label>
                    <input
                      type="text"
                      value={settings.maintenance_expected_back || ''}
                      onChange={(e) => setSettings({ ...settings, maintenance_expected_back: e.target.value })}
                      placeholder="e.g., Returning shortly today or Today at 6:00 PM"
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Developer Bypass Passkey
                    </label>
                    <input
                      type="text"
                      value={settings.maintenance_secret_key || 'dev2026'}
                      onChange={(e) => setSettings({ ...settings, maintenance_secret_key: e.target.value })}
                      placeholder="dev2026"
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-sm font-mono outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Use on maintenance page or append <code className="text-amber-700 font-semibold font-mono">?bypass={settings.maintenance_secret_key || 'dev2026'}</code> to any URL.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Emergency Dental Phone (Shown during maintenance)
                    </label>
                    <input
                      type="text"
                      value={settings.maintenance_contact_phone || settings.phone || ''}
                      onChange={(e) => setSettings({ ...settings, maintenance_contact_phone: e.target.value })}
                      placeholder="0321 4576734"
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Emergency Dental WhatsApp (Shown during maintenance)
                    </label>
                    <input
                      type="text"
                      value={settings.maintenance_contact_whatsapp || settings.whatsapp || ''}
                      onChange={(e) => setSettings({ ...settings, maintenance_contact_whatsapp: e.target.value })}
                      placeholder="923214576734"
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Admin portal (/admin) and login are never blocked.</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMaintenance()}
                      disabled={loadingAction}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-50 ${
                        settings.maintenance_mode
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{settings.maintenance_mode ? 'Deactivate (Go Live)' : 'Activate Maintenance Now'}</span>
                    </button>

                    <Link
                      href="/"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Website</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* GENERAL CLINIC BUSINESS SETTINGS */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Clinic Business Information & CMS</h2>
                <p className="text-xs text-slate-500">Update clinic address, phone numbers, hours, hero copy, and Google review numbers.</p>
              </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Clinic Name
                </label>
                <input
                  type="text"
                  required
                  value={settings.clinic_name}
                  onChange={(e) => setSettings({ ...settings, clinic_name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Clinic Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp Number (International format e.g. 923214576734)
                </label>
                <input
                  type="text"
                  required
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  required
                  value={settings.opening_hours}
                  onChange={(e) => setSettings({ ...settings, opening_hours: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Clinic Full Address
                </label>
                <input
                  type="text"
                  required
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  required
                  value={settings.hero_title}
                  onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Supporting Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={settings.hero_description}
                  onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Google Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  required
                  value={settings.google_rating}
                  onChange={(e) => setSettings({ ...settings, google_rating: parseFloat(e.target.value) || 4.9 })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Google Review Count
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={settings.google_review_count}
                  onChange={(e) => setSettings({ ...settings, google_review_count: parseInt(e.target.value, 10) || 174 })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                disabled={loadingAction}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-sm transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>
          </div>
        </form>
        )}

        {/* ----------------- TAB 4: FAQS ----------------- */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Manage Patient FAQs</h2>
                <p className="text-xs text-slate-500">Edit or add frequently asked questions displayed on the website.</p>
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={faq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Question #{idx + 1}
                    </label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const updated = { ...faq, question: e.target.value };
                        setFaqs(faqs.map(f => f.id === faq.id ? updated : f));
                      }}
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Answer
                    </label>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = { ...faq, answer: e.target.value };
                        setFaqs(faqs.map(f => f.id === faq.id ? updated : f));
                      }}
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={async () => {
                        await fetch('/api/faqs', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(faq),
                        });
                        setSaveSuccessMsg('FAQ updated.');
                        setTimeout(() => setSaveSuccessMsg(null), 3000);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 text-white font-semibold text-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 5: REVIEWS ----------------- */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Google Verified Reviews</h2>
                <p className="text-xs text-slate-500">Currently displayed verified reviews from the Google Business Profile.</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  4.9★ (174+ Reviews)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INITIAL_REVIEWS.map((rev) => (
                <div key={rev.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-1 mb-2 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic">&ldquo;{rev.text}&rdquo;</p>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900">{rev.author}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">{rev.date_text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
