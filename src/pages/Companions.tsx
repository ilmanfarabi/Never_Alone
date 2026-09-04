import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  UserCheck, 
  Sparkles, 
  RotateCcw,
  Globe
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { companionsData } from '../data/companions';
import { occasionsData } from '../data/occasions';
import type { Companion } from '../types';


interface CompanionsProps {
  onSelectCompanion: (comp: Companion) => void;
  onBookCompanion: (comp: Companion) => void;
}

export const Companions: React.FC<CompanionsProps> = ({ 
  onSelectCompanion, 
  onBookCompanion 
}) => {
  const { language, t } = useLanguage();
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [occasionFilter, setOccasionFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [maxRate, setMaxRate] = useState(2500);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Filter Logic
  const filteredCompanions = useMemo(() => {
    return companionsData.filter(comp => {
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = comp.name.toLowerCase().includes(query) || comp.nameBn.includes(query);
        const matchesBio = comp.bio.toLowerCase().includes(query) || comp.bioBn.includes(query);
        const matchesArea = comp.area.toLowerCase().includes(query) || comp.areaBn.includes(query);
        if (!matchesName && !matchesBio && !matchesArea) return false;
      }

      // City
      if (cityFilter !== 'all' && comp.city !== cityFilter) return false;

      // Occasion
      if (occasionFilter !== 'all' && !comp.occasions.includes(occasionFilter)) return false;

      // Language
      if (languageFilter !== 'all') {
        const hasLang = comp.languages.some(l => l.toLowerCase().includes(languageFilter.toLowerCase()));
        if (!hasLang) return false;
      }

      // Gender
      if (genderFilter !== 'all' && comp.gender !== genderFilter) return false;

      // Max Rate
      if (comp.hourlyRate > maxRate) return false;

      // Verified Only
      if (verifiedOnly && !comp.verified) return false;

      return true;
    });
  }, [searchTerm, cityFilter, occasionFilter, languageFilter, genderFilter, maxRate, verifiedOnly]);

  const resetFilters = () => {
    setSearchTerm('');
    setCityFilter('all');
    setOccasionFilter('all');
    setLanguageFilter('all');
    setGenderFilter('all');
    setMaxRate(2500);
    setVerifiedOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'ভেরিফায়েড কম্প্যানিয়ন তালিকা' : 'Verified Companion Directory'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'bn' ? 'আপনার পছন্দের বিশ্বস্ত সঙ্গী খুঁজুন' : 'Find Your Perfect Companion'}
        </h1>
        <p className="text-sm text-slate-400">
          {language === 'bn'
            ? 'সব কম্প্যানিয়ন কঠোরভাবে জাতীয় পরিচয়পত্র ও ব্যাকগ্রাউন্ড চেক দ্বারা ভেরিফাইড। সম্পূর্ণ প্ল্যাটোনিক ও নিরাপদ।'
            : 'All companions are vetted with government ID & background clearance. 100% Platonic & respectful.'}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        {/* Top Search & Filter Reset */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'bn' ? 'নাম, এলাকা (যেমন: গুলশান, ধানমন্ডি) বা কীওয়ার্ড দিয়ে খুঁজুন...' : 'Search by name, area (Gulshan, Dhanmondi) or keyword...'}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={resetFilters}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ফিল্টার রিসেট' : 'Reset Filters'}</span>
          </button>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-800/80 text-xs">
          {/* City */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {language === 'bn' ? 'শহর / লোকেশন' : 'City / Location'}
            </label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">{language === 'bn' ? 'সব শহর' : 'All Cities'}</option>
              <option value="Dhaka">Dhaka (ঢাকা)</option>
              <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
              <option value="Sylhet">Sylhet (সিলেট)</option>
              <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {language === 'bn' ? 'উপলক্ষ / সার্ভিস' : 'Occasion / Service'}
            </label>
            <select
              value={occasionFilter}
              onChange={(e) => setOccasionFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">{language === 'bn' ? 'সব উপলক্ষ' : 'All Occasions'}</option>
              {occasionsData.map(occ => (
                <option key={occ.id} value={occ.id}>
                  {language === 'bn' ? occ.titleBn : occ.title}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {language === 'bn' ? 'ভাষা' : 'Language'}
            </label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">{language === 'bn' ? 'সব ভাষা' : 'All Languages'}</option>
              <option value="bengali">Bengali (বাংলা)</option>
              <option value="english">English</option>
              <option value="sylheti">Sylheti (সিলেটি)</option>
              <option value="chittagonian">Chittagonian (চাটগাঁইয়া)</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              {language === 'bn' ? 'লিঙ্গ' : 'Gender'}
            </label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">{language === 'bn' ? 'যেকোনো' : 'Any Gender'}</option>
              <option value="female">{language === 'bn' ? 'মহিলা (Female)' : 'Female'}</option>
              <option value="male">{language === 'bn' ? 'পুরুষ (Male)' : 'Male'}</option>
            </select>
          </div>

          {/* Max Rate Slider */}
          <div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
              <span>{language === 'bn' ? 'সর্বোচ্চ রেট:' : 'Max Rate:'}</span>
              <span className="text-indigo-400">৳ {maxRate}</span>
            </div>
            <input
              type="range"
              min="800"
              max="2500"
              step="50"
              value={maxRate}
              onChange={(e) => setMaxRate(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer mt-1"
            />
          </div>
        </div>
      </div>

      {/* Results Count & Active Badges */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          {language === 'bn' 
            ? `মোট ${filteredCompanions.length} জন ভেরিফায়েড কম্প্যানিয়ন পাওয়া গেছে` 
            : `Showing ${filteredCompanions.length} verified companions`}
        </span>
        <span className="text-rose-400 font-medium hidden sm:inline">
          {language === 'bn' ? '🛡️ ১০০% পাবলিক প্লেস পলিসি' : '🛡️ 100% Public Place Policy'}
        </span>
      </div>

      {/* Companions Grid */}
      {filteredCompanions.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">
            {language === 'bn' ? 'কোনো কম্প্যানিয়ন পাওয়া যায়নি' : 'No Companions Match Your Filters'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {language === 'bn' 
              ? 'অনুগ্রহ করে ফিল্টার পরিবর্তন করুন অথবা রিসেট বাটনে ক্লিক করুন।' 
              : 'Try broadening your search criteria or resetting filters.'}
          </p>
          <button
            onClick={resetFilters}
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            {language === 'bn' ? 'সব ফিল্টার রিসেট করুন' : 'Reset All Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCompanions.map((comp) => (
            <div
              key={comp.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/40 transition-all group flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-950/40"
            >
              <div>
                {/* Photo & Image Badges */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={comp.image} 
                    alt={comp.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold backdrop-blur-md flex items-center gap-1 shadow-md">
                      <UserCheck className="w-3 h-3" />
                      {language === 'bn' ? 'ভেরিফায়েড' : 'Verified'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-lg bg-slate-950/80 text-amber-300 text-xs font-bold backdrop-blur-md border border-amber-400/30 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {comp.rating}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <div className="text-base font-bold">
                        {language === 'bn' ? comp.nameBn : comp.name}
                      </div>
                      <div className="text-[11px] text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {language === 'bn' ? `${comp.areaBn}, ${comp.cityBn}` : `${comp.area}, ${comp.city}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-emerald-400">৳ {comp.hourlyRate}</div>
                      <div className="text-[9px] text-slate-300">{language === 'bn' ? '/ ঘণ্টা' : '/ hr'}</div>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-3 text-xs">
                  <p className="text-slate-300 leading-relaxed line-clamp-2">
                    {language === 'bn' ? comp.bioBn : comp.bio}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {comp.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                        {language === 'bn' ? comp.tagsBn[idx] || tag : tag}
                      </span>
                    ))}
                  </div>

                  {/* Spoken Languages */}
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                    <Globe className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span className="truncate">{comp.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectCompanion(comp)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  {t.viewProfile}
                </button>
                <button
                  onClick={() => onBookCompanion(comp)}
                  className="py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors"
                >
                  {t.bookNow}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
