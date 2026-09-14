import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'urgent';
  icon: React.ElementType;
  iconBg?: string;
  iconColor?: string;
  onClick?: () => void;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  iconBg = 'bg-slate-100',
  iconColor = 'text-[#1B3A4B]',
  onClick,
  subtitle
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-[#fafbfc] rounded-3xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs transition-all card-google hover:bg-white ${
        onClick ? 'cursor-pointer hover:border-primary/30' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-overline !mb-0 text-slate-500">{title}</p>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className={`p-3.5 rounded-2xl ${iconBg} ${iconColor} shrink-0 shadow-xs`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {(change || subtitle) && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
          {change && (
            <span className={`font-semibold ${
              changeType === 'positive' ? 'text-emerald-600' :
              changeType === 'negative' ? 'text-rose-600' :
              changeType === 'urgent' ? 'text-red-600 font-bold animate-pulse' : 'text-slate-600'
            }`}>
              {change}
            </span>
          )}
          {subtitle && <span className="text-slate-500 font-normal">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
