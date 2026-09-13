import React from 'react';
import { ShieldAlert, ArrowRight, PhoneCall } from 'lucide-react';
import type { SOSAlert } from '../../types/adminTypes';

interface SOSAlertBannerProps {
  activeAlerts: SOSAlert[];
  onViewAlert: (alert: SOSAlert) => void;
  onGoToSafetyCenter?: () => void;
}

export const SOSAlertBanner: React.FC<SOSAlertBannerProps> = ({
  activeAlerts,
  onViewAlert
}) => {
  if (activeAlerts.length === 0) return null;

  const latest = activeAlerts[0];

  return (
    <div className="relative bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-2.5 shadow-lg border-b border-red-800 animate-pulse-subtle z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Left emergency info */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-white text-red-600 flex items-center justify-center shrink-0 animate-ping">
            <ShieldAlert className="w-4 h-4" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-extrabold uppercase tracking-wider bg-red-950/80 px-2 py-0.5 rounded text-[11px] text-red-100 border border-red-400/40">
              🚨 ACTIVE SOS ALERT ({activeAlerts.length})
            </span>
            <span className="font-semibold truncate">
              {latest.userName} triggered SOS at <strong className="underline">{latest.venueName}</strong> ({latest.lastCheckInTime})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`tel:${latest.userPhone}`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call User</span>
          </a>

          <button
            onClick={() => onViewAlert(latest)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white text-red-700 font-bold hover:bg-slate-100 shadow-xs transition-colors"
          >
            <span>Investigate Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
