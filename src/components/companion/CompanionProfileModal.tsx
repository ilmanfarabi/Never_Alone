import React from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  Globe, 
  Calendar, 
  Sparkles, 
  Heart,
  Flag
} from 'lucide-react';
import type { Companion } from '../../types';

import { useLanguage } from '../../i18n/LanguageContext';

interface CompanionProfileModalProps {
  companion: Companion | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (comp: Companion) => void;
  onReport: (comp: Companion) => void;
}

export const CompanionProfileModal: React.FC<CompanionProfileModalProps> = ({
  companion,
  isOpen,
  onClose,
  onBookNow,
  onReport
}) => {
  const { language } = useLanguage();

  if (!isOpen || !companion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full text-white shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col">
        {/* Banner Cover / Image Header */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 overflow-hidden shrink-0">
          <img 
            src={companion.image} 
            alt={companion.name} 
            className="w-full h-full object-cover opacity-60 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Profile Info in Banner */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="flex items-end gap-4">
              <img 
                src={companion.image} 
                alt={companion.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-indigo-500 shadow-xl"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {language === 'bn' ? companion.nameBn : companion.name}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <UserCheck className="w-3 h-3" />
                    {language === 'bn' ? 'আইডি ভেরিফায়েড' : 'Gov ID Verified'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {language === 'bn' ? `${companion.areaBn}, ${companion.cityBn}` : `${companion.area}, ${companion.city}`}
                  </span>
                  <span>•</span>
                  <span>{companion.age} {language === 'bn' ? 'বছর' : 'yrs'}</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block text-right mb-1">
              <div className="text-xs text-slate-400">{language === 'bn' ? 'ঘণ্টাপ্রতি রেট' : 'Hourly Rate'}</div>
              <div className="text-2xl font-extrabold text-emerald-400">৳ {companion.hourlyRate}</div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 text-xs">
          {/* Key Badges & Rating */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{companion.rating}</span>
                <span className="text-xs text-slate-400 font-normal">({companion.reviewCount} {language === 'bn' ? 'রিভিউ' : 'reviews'})</span>
              </div>
              <div className="text-slate-700">|</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'bn' ? 'ব্যাকগ্রাউন্ড পুলিশ রেকর্ড ক্লিয়ার' : 'Background Verified'}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {companion.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-700/30 text-[11px]">
                  {language === 'bn' ? companion.tagsBn[idx] || tag : tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              {language === 'bn' ? 'পরিচিতি ও ব্যক্তিত্ব (About Me)' : 'About Me'}
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              {language === 'bn' ? companion.bioBn : companion.bio}
            </p>
          </div>

          {/* Languages & Interests Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-400" />
                {language === 'bn' ? 'দক্ষ ভাষাসমূহ' : 'Spoken Languages'}
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {companion.languages.map((lang, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300 text-[11px]">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" />
                {language === 'bn' ? 'আগ্রহ ও শখ' : 'Interests & Passions'}
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(language === 'bn' ? companion.interestsBn : companion.interests).map((interest, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300 text-[11px]">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Availability & Safety Rules */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                {language === 'bn' ? 'প্রাপ্যতা / সক্রিয় দিন' : 'Available Days'}
              </h4>
              <span className="text-[11px] text-indigo-300 font-medium">
                {companion.availableDays.join(', ')}
              </span>
            </div>

            {/* Platonic Rule Strip */}
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-[11px] text-rose-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                {language === 'bn'
                  ? 'এই কম্প্যানিয়ন শুধুমাত্র জনাকীর্ণ পাবলিক স্থানে ডিনার, বিয়ে/অনুষ্ঠানের প্লাস-ওয়ান বা আড্ডায় সঙ্গ দিতে প্রস্তুত। কোনো ধরনের রোমান্টিক অনুরোধ গ্রহণযোগ্য নয়।'
                  : 'This companion operates under strict non-romantic platonic guidelines. All sessions take place in approved public venues.'}
              </span>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200">
              {language === 'bn' ? 'সাম্প্রতিক ব্যবহারকারী রিভিউ' : 'Recent User Reviews'}
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">নাদিম করিম</span>
                  <div className="flex text-amber-400">★★★★★</div>
                </div>
                <p className="text-[11px] text-slate-400">
                  "অত্যন্ত ভদ্র ও মার্জিত আচরণ। আমার পারিবারিক অনুষ্ঠানে চমৎকার সঙ্গ দিয়েছেন।"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onReport(companion)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 hover:text-rose-300 border border-rose-900/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'bn' ? 'রিপোর্ট' : 'Report'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="sm:hidden text-right">
              <div className="text-xs text-emerald-400 font-bold">৳ {companion.hourlyRate}/ঘণ্টা</div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookNow(companion);
              }}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'bn' ? 'এই কম্প্যানিয়ন বুক করুন' : 'Book This Companion'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
