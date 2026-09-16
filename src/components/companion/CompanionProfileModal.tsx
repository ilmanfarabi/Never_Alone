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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full text-slate-900 shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col">
        {/* Banner Cover / Image Header */}
        <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden shrink-0">
          <img 
            src={companion.image} 
            alt={companion.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-slate-900/60 hover:bg-slate-900 rounded-full backdrop-blur-sm transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Profile Info in Banner */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="flex items-end gap-4">
              <img 
                src={companion.image} 
                alt={companion.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              <div className="mb-1 text-white">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {language === 'bn' ? companion.nameBn : companion.name}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/95 text-slate-900 font-semibold flex items-center gap-1 shadow-xs">
                    <UserCheck className="w-3 h-3 text-blue-600" />
                    {language === 'bn' ? 'আইডি ভেরিফায়েড' : 'Gov ID Verified'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-300" />
                    {language === 'bn' ? `${companion.areaBn}, ${companion.cityBn}` : `${companion.area}, ${companion.city}`}
                  </span>
                  <span>•</span>
                  <span>{companion.age} {language === 'bn' ? 'বছর' : 'yrs'}</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block text-right mb-1 text-white">
              <div className="text-xs text-slate-200">{language === 'bn' ? 'ঘণ্টাপ্রতি রেট' : 'Hourly Rate'}</div>
              <div className="text-2xl font-extrabold font-mono tracking-tight">৳ {companion.hourlyRate}</div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6 text-base">
          {/* Key Badges & Rating */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-base">
                <Star className="w-5 h-5 fill-amber-400" />
                <span>{companion.rating}</span>
                <span className="text-xs text-slate-500 font-normal">({companion.reviewCount} {language === 'bn' ? 'রিভিউ' : 'reviews'})</span>
              </div>
              <div className="text-slate-300">|</div>
              <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'bn' ? 'ব্যাকগ্রাউন্ড পুলিশ রেকর্ড ক্লিয়ার' : 'Background Verified'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {companion.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">
                  {language === 'bn' ? companion.tagsBn[idx] || tag : tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-2.5">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              {language === 'bn' ? 'পরিচিতি ও ব্যক্তিত্ব (About Me)' : 'About Me'}
            </h3>
            <p className="text-slate-700 leading-relaxed text-base bg-slate-50 p-5 rounded-3xl border border-slate-200 font-normal">
              {language === 'bn' ? companion.bioBn : companion.bio}
            </p>
          </div>

          {/* Languages & Interests Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                {language === 'bn' ? 'দক্ষ ভাষাসমূহ' : 'Spoken Languages'}
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {companion.languages.map((lang, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium shadow-xs">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-blue-600" />
                {language === 'bn' ? 'আগ্রহ ও শখ' : 'Interests & Passions'}
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {(language === 'bn' ? companion.interestsBn : companion.interests).map((interest, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-medium shadow-xs">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Availability & Safety Rules */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                {language === 'bn' ? 'প্রাপ্যতা / সক্রিয় দিন' : 'Available Days'}
              </h4>
              <span className="text-sm text-blue-600 font-medium">
                {companion.availableDays.join(', ')}
              </span>
            </div>

            {/* Platonic Rule Strip */}
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                {language === 'bn'
                  ? 'এই কম্প্যানিয়ন শুধুমাত্র জনাকীর্ণ পাবলিক স্থানে ডিনার, বিয়ে/অনুষ্ঠানের প্লাস-ওয়ান বা আড্ডায় সঙ্গ দিতে প্রস্তুত। কোনো ধরনের রোমান্টিক অনুরোধ গ্রহণযোগ্য নয়।'
                  : 'This companion operates under strict non-romantic platonic guidelines. All sessions take place in approved public venues.'}
              </span>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              {language === 'bn' ? 'সাম্প্রতিক ব্যবহারকারী রিভিউ' : 'Recent User Reviews'}
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900">{language === 'bn' ? 'নাদিম করিম' : 'Nadeem Karim'}</span>
                  <div className="flex text-amber-400">★★★★★</div>
                </div>
                <p className="text-sm text-slate-600">
                  {language === 'bn' 
                    ? '"অত্যন্ত ভদ্র ও মার্জিত আচরণ। আমার পারিবারিক অনুষ্ঠানে চমৎকার সঙ্গ দিয়েছেন।"' 
                    : '"Extremely polite and well-mannered companion. Provided great, comfortable company at my family event."'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onReport(companion)}
            className="px-3.5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-sm font-medium flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Flag className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">{language === 'bn' ? 'রিপোর্ট' : 'Report'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="sm:hidden text-right">
              <div className="text-sm text-blue-600 font-bold font-mono">৳ {companion.hourlyRate}{language === 'bn' ? '/ঘণ্টা' : '/hr'}</div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookNow(companion);
              }}
              className="py-2.5 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md flex items-center gap-2 transition-all apple-pill-btn"
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
