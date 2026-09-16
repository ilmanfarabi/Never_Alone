import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface FloatingSOSProps {
  onOpenSOS: () => void;
}

export const FloatingSOS: React.FC<FloatingSOSProps> = ({ onOpenSOS }) => {
  const { language, t } = useLanguage();

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        onClick={onOpenSOS}
        className="group flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-full shadow-md shadow-rose-600/25 border border-rose-400/40 hover:scale-105 active:scale-95 transition-all"
        title={t.emergencySOS}
        aria-label="Emergency SOS button"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-300 opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <ShieldAlert className="w-3.5 h-3.5 text-white transition-transform group-hover:scale-110" />
        <span className="tracking-wide">
          {language === 'bn' ? 'জরুরি SOS' : 'SOS'}
        </span>
      </button>
    </div>
  );
};
