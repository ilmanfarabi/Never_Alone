import React from 'react';
import { ShieldCheck, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const PlatonicBanner: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border-b border-indigo-500/20 text-xs text-slate-300 py-1.5 px-3 sm:px-6 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Clear Platonic & Safety Message */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {language === 'bn' ? '১০০% প্ল্যাটোনিক' : '100% Platonic'}
          </span>
          <p className="text-[11px] sm:text-xs text-slate-300 truncate">
            {language === 'bn' ? (
              <span>
                <strong className="text-white font-medium">NeverAlone কোনো ডেটিং বা রোমান্স প্ল্যাটফর্ম নয়</strong> — শুধুমাত্র নিরাপদ, পাবলিক প্লেসে সামাজিক সঙ্গ।
              </span>
            ) : (
              <span>
                <strong className="text-white font-medium">NeverAlone is NOT a dating or romantic app</strong> — strictly safe & public social companionship.
              </span>
            )}
          </p>
        </div>

        {/* Right: Quick Trust Badges & Hotline */}
        <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px]">
          <div className="flex items-center gap-1 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{language === 'bn' ? 'NID ও ব্যাকগ্রাউন্ড ভেরিফায়েড' : 'NID & Background Verified'}</span>
          </div>

          <div className="h-3 w-px bg-slate-700" />

          <a 
            href="tel:09612345678" 
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            title={language === 'bn' ? '২৪/৭ হেল্পলাইন' : '24/7 Helpline'}
          >
            <PhoneCall className="w-3 h-3 animate-pulse" />
            <span className="font-mono">{language === 'bn' ? 'হেল্পলাইন: ০৯৬১২-৩৪৫৬৭৮' : 'Helpline: 09612-345678'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};


