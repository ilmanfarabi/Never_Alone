import React from 'react';
import { ShieldCheck, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const PlatonicBanner: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative bg-slate-50 border-b border-slate-200 text-sm text-slate-600 py-2 px-3 sm:px-6 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Clear Platonic & Safety Message */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            {language === 'bn' ? '১০০% প্ল্যাটোনিক' : '100% Platonic'}
          </span>
          <p className="text-sm text-slate-700 truncate">
            {language === 'bn' ? (
              <span>
                <strong className="text-slate-900 font-semibold">NeverAlone কোনো ডেটিং বা রোমান্স প্ল্যাটফর্ম নয়</strong> — শুধুমাত্র নিরাপদ ও পাবলিক প্লেসে সামাজিক সঙ্গ।
              </span>
            ) : (
              <span>
                <strong className="text-slate-900 font-semibold">NeverAlone is NOT a dating or escort service</strong> — strictly safe & public social companionship.
              </span>
            )}
          </p>
        </div>

        {/* Right: Quick Trust Badges & Hotline */}
        <div className="hidden md:flex items-center gap-3 shrink-0 text-sm">
          <div className="flex items-center gap-1 text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'bn' ? 'NID ভেরিফায়েড' : 'NID Verified'}</span>
          </div>

          <div className="h-3 w-px bg-slate-200" />

          <a 
            href="tel:09612345678" 
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors font-medium"
            title={language === 'bn' ? '২৪/৭ হেল্পলাইন' : '24/7 Helpline'}
          >
            <PhoneCall className="w-3 h-3" />
            <span className="font-mono font-semibold">{language === 'bn' ? 'হেল্পলাইন: ০৯৬১২-৩৪৫৬৭৮' : 'Hotline: 09612-345678'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};



