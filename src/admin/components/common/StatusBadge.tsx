import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const normalized = status.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';

  // Success / Active / Verified / Approved / Completed / Paid
  if (['active', 'verified', 'approved', 'passed', 'completed', 'paid', 'resolved'].includes(normalized)) {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold';
  } 
  // Warning / Pending / Investigating / Processing
  else if (['pending', 'investigating', 'processing', 'unverified', 'acknowledged'].includes(normalized)) {
    styles = 'bg-amber-50 text-amber-700 border-amber-200 font-semibold';
  }
  // Danger / Suspended / Rejected / Failed / Disputed / Cancelled / Urgent
  else if (['suspended', 'rejected', 'failed', 'disputed', 'cancelled', 'urgent', 'high', 'critical'].includes(normalized)) {
    styles = 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
  }
  // Extreme Danger / Banned / False Alarm
  else if (['banned'].includes(normalized)) {
    styles = 'bg-red-950 text-red-100 border-red-800 font-bold';
  }
  // Info / Confirmed / Medium / Low
  else if (['confirmed', 'open', 'medium', 'low', 'closed', 'dismissed'].includes(normalized)) {
    styles = 'bg-blue-50 text-blue-700 border-blue-200 font-semibold';
  }

  // Format label: snake_case to Title Case
  const formattedLabel = status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm border ${styles} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        ['active', 'verified', 'approved', 'completed', 'paid', 'resolved'].includes(normalized) ? 'bg-emerald-500' :
        ['pending', 'investigating', 'processing'].includes(normalized) ? 'bg-amber-500 animate-pulse' :
        ['suspended', 'rejected', 'failed', 'disputed', 'urgent', 'critical'].includes(normalized) ? 'bg-rose-500' :
        ['banned'].includes(normalized) ? 'bg-red-400 animate-ping' : 'bg-blue-500'
      }`} />
      {formattedLabel}
    </span>
  );
};
