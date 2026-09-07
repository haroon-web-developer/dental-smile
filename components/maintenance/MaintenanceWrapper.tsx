'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ClinicSettings, ServiceItem } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';
import MaintenanceScreen from './MaintenanceScreen';
import DeveloperMaintenanceBanner from './DeveloperMaintenanceBanner';

interface MaintenanceWrapperProps {
  settings: ClinicSettings;
  services: ServiceItem[];
  children: React.ReactNode;
}

export default function MaintenanceWrapper({
  settings: initialSettings,
  services,
  children,
}: MaintenanceWrapperProps) {
  const pathname = usePathname();
  const [settings, setSettings] = useState<ClinicSettings>(initialSettings);
  const [isMaintenanceActive, setIsMaintenanceActive] = useState<boolean>(
    Boolean(initialSettings.maintenance_mode)
  );
  const [isBypassed, setIsBypassed] = useState<boolean>(false);

  // Check bypass status and live maintenance status on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        // 1. Check URL query parameters for direct developer bypass (e.g. ?bypass=dev2026)
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const bypassParam = params.get('bypass');
          const configuredKey = (settings.maintenance_secret_key || 'dev2026').toLowerCase();
          
          if (bypassParam && bypassParam.toLowerCase() === configuredKey) {
            sessionStorage.setItem('dev_bypass', 'true');
            document.cookie = 'developer_bypass=true; path=/; max-age=604800; SameSite=Lax';
            setIsBypassed(true);
          }

          // 2. Check stored session / cookie / admin token
          const hasSessionBypass = sessionStorage.getItem('dev_bypass') === 'true';
          const hasCookieBypass = document.cookie.includes('developer_bypass=true');
          const hasAdminToken = Boolean(localStorage.getItem('dental_smile_admin_token'));
          const hasAdminCookie = document.cookie.includes('idc_admin_token=');

          if (hasSessionBypass || hasCookieBypass || hasAdminToken || hasAdminCookie) {
            setIsBypassed(true);
          }
        }

        // 3. Sync live maintenance settings with server API
        const res = await fetch('/api/maintenance', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setIsMaintenanceActive(Boolean(data.maintenance_mode));
          if (data.isBypassed) {
            setIsBypassed(true);
          }
          if (data.settings) {
            setSettings(prev => ({ ...prev, ...data.settings, maintenance_mode: data.maintenance_mode }));
          }
        }
      } catch (err) {
        console.warn('Maintenance status check warning:', err);
      }
    };

    checkStatus();
  }, [settings.maintenance_secret_key]);

  // NEVER block admin routes — developers and staff must always access the admin dashboard and login
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        {isMaintenanceActive && (
          <DeveloperMaintenanceBanner
            onDisableMaintenance={() => setIsMaintenanceActive(false)}
            onClearBypass={() => setIsBypassed(false)}
          />
        )}
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} services={services} />
        <MobileStickyBar settings={settings} />
      </>
    );
  }

  // If maintenance mode is active AND visitor is NOT bypassed:
  // Hide entire website and show the dedicated Maintenance / Working on Site screen
  if (isMaintenanceActive && !isBypassed) {
    return (
      <MaintenanceScreen
        settings={settings}
        onBypassGranted={() => setIsBypassed(true)}
      />
    );
  }

  // If maintenance mode is active BUT visitor IS bypassed (developer mode):
  // Show the developer notification banner on top and full website
  if (isMaintenanceActive && isBypassed) {
    return (
      <>
        <DeveloperMaintenanceBanner
          onDisableMaintenance={() => setIsMaintenanceActive(false)}
          onClearBypass={() => setIsBypassed(false)}
        />
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} services={services} />
        <MobileStickyBar settings={settings} />
      </>
    );
  }

  // Normal live website
  return (
    <>
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} services={services} />
      <MobileStickyBar settings={settings} />
    </>
  );
}
