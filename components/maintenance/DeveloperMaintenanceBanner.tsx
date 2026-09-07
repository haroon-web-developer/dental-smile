'use client';

import React, { useState } from 'react';
import { AlertTriangle, Power, Settings, Eye, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface DeveloperMaintenanceBannerProps {
  onDisableMaintenance?: () => void;
  onClearBypass?: () => void;
}

export default function DeveloperMaintenanceBanner({
  onDisableMaintenance,
  onClearBypass,
}: DeveloperMaintenanceBannerProps) {
  const [isDisabling, setIsDisabling] = useState(false);

  const handleDisableMaintenance = async () => {
    try {
      setIsDisabling(true);
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', enabled: false }),
      });
      if (res.ok) {
        if (onDisableMaintenance) {
          onDisableMaintenance();
        } else {
          window.location.reload();
        }
      }
    } catch (err) {
      console.error('Failed to disable maintenance:', err);
    } finally {
      setIsDisabling(false);
    }
  };

  const handlePreviewMaintenance = () => {
    if (onClearBypass) {
      onClearBypass();
    } else {
      document.cookie = 'developer_bypass=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      sessionStorage.removeItem('dev_bypass');
      window.location.reload();
    }
  };

  return (
    <aside 
      aria-label="Developer Maintenance Mode Active"
      className="sticky top-0 z-50 w-full bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold shadow-md flex flex-wrap items-center justify-between gap-2 border-b border-amber-600 select-none"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-900"></span>
        </span>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-950" />
          <span>
            <strong>DEVELOPER BYPASS:</strong> Website is HIDDEN for public visitors (Under Maintenance).
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDisableMaintenance}
          disabled={isDisabling}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950 hover:bg-slate-900 text-white font-bold text-[11px] shadow-sm transition cursor-pointer disabled:opacity-50"
        >
          <Power className="w-3 h-3 text-emerald-400" />
          <span>{isDisabling ? 'Disabling...' : 'Turn Off Maintenance'}</span>
        </button>

        <button
          type="button"
          onClick={handlePreviewMaintenance}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-600/30 hover:bg-amber-600/50 text-slate-950 font-bold text-[11px] transition cursor-pointer border border-amber-700/40"
        >
          <Eye className="w-3 h-3" />
          <span>View As Visitor</span>
        </button>

        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-600/30 hover:bg-amber-600/50 text-slate-950 font-bold text-[11px] transition border border-amber-700/40"
        >
          <Settings className="w-3 h-3" />
          <span>Admin</span>
        </Link>
      </div>
    </aside>
  );
}
