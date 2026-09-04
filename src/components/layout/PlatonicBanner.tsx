import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const PlatonicBanner: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-indigo-500/15 text-xs text-slate-300 overflow-hidden">
      {/* Background ambient subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex flex-col xs:flex-row items-center justify-between gap-1.5 sm:gap-2.5">
        {/* Left: Strict Platonic Guarantee */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 text-center xs:text-left">
          <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <span className="text-[10px] sm:text-xs tracking-tight line-clamp-1 xs:line-clamp-none">
            {language === 'bn' ? (
              <>
                <span className="font-semibold text-emerald-300 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20 mr-1">
                  ১০০% প্ল্যাটোনিক
                </span>
                <span className="hidden sm:inline">NeverAlone কোনো ডেটিং প্ল্যাটফর্ম নয় • </span>
                <span>কঠোরভাবে রোমান্স ও যৌনতাবিমুক্ত নিরাপদ সঙ্গ</span>
              </>
            ) : (
              <>
                <span className="font-semibold text-emerald-300 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20 mr-1">
                  100% Platonic
                </span>
                <span className="hidden sm:inline">Non-dating platform • </span>
                <span>Strictly safe, non-romantic public companionship</span>
              </>
            )}
          </span>
        </div>

        {/* Right: Quick Trust Tags */}
        <div className="hidden xs:flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-[10px] sm:text-[11px] text-slate-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{language === 'bn' ? 'NID ভেরিফায়েড' : 'NID Verified'}</span>
          </div>

          <div className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-[10px] sm:text-[11px] text-indigo-300 font-medium">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-400 shrink-0" />
            <span>{language === 'bn' ? 'পাবলিক প্লেস' : 'Public Venues'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

