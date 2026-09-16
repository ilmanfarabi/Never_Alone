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
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = comp.name.toLowerCase().includes(query) || comp.nameBn.includes(query);
        const matchesBio = comp.bio.toLowerCase().includes(query) || comp.bioBn.includes(query);
        const matchesArea = comp.area.toLowerCase().includes(query) || comp.areaBn.includes(query);
        if (!matchesName && !matchesBio && !matchesArea) return false;
      }

      if (cityFilter !== 'all' && comp.city !== cityFilter) return false;
      if (occasionFilter !== 'all' && !comp.occasions.includes(occasionFilter)) return false;

      if (languageFilter !== 'all') {
        const hasLang = comp.languages.some(l => l.toLowerCase().includes(languageFilter.toLowerCase()));
        if (!hasLang) return false;
      }

      if (genderFilter !== 'all' && comp.gender !== genderFilter) return false;
      if (comp.hourlyRate > maxRate) return false;
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
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'bn' ? 'ভেরিফায়েড কম্প্যানিয়ন তালিকা' : 'Verified Companion Directory'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {language === 'bn' ? 'পছন্দের বিশ্বস্ত সঙ্গী খুঁজুন' : 'Find Your Companion'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
          {language === 'bn'
            ? 'সরকারি পরিচয়পত্র দ্বারা ভেরিফাইড এবং শতভাগ নিরাপদ প্ল্যাটোনিক সঙ্গ।'
            : 'Vetted with government ID & background clearance. 100% Platonic.'}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-5">
        {/* Top Search & Filter Reset */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'bn' ? 'নাম, এলাকা (যেমন: গুলশান, ধানমন্ডি) দিয়ে খুঁজুন...' : 'Search by name, area (Gulshan, Dhanmondi)...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>

          <button
            onClick={resetFilters}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold flex items-center gap-2 border border-slate-200 transition-all apple-pill-btn shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'রিসেট' : 'Reset'}</span>
          </button>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-3 border-t border-slate-100 text-sm">
          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 pl-1">
              {language === 'bn' ? 'শহর / লোকেশন' : 'City / Location'}
            </label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors cursor-pointer"
            >
              <option value="all">{language === 'bn' ? 'সব শহর' : 'All Cities'}</option>
              <option value="Dhaka">{language === 'bn' ? 'ঢাকা' : 'Dhaka'}</option>
              <option value="Chittagong">{language === 'bn' ? 'চট্টগ্রাম' : 'Chittagong'}</option>
              <option value="Sylhet">{language === 'bn' ? 'সিলেট' : 'Sylhet'}</option>
              <option value="Rajshahi">{language === 'bn' ? 'রাজশাহী' : 'Rajshahi'}</option>
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 pl-1">
              {language === 'bn' ? 'উপলক্ষ / সার্ভিস' : 'Occasion / Service'}
            </label>
            <select
              value={occasionFilter}
              onChange={(e) => setOccasionFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors cursor-pointer"
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
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 pl-1">
              {language === 'bn' ? 'ভাষা' : 'Language'}
            </label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors cursor-pointer"
            >
              <option value="all">{language === 'bn' ? 'সব ভাষা' : 'All Languages'}</option>
              <option value="bengali">{language === 'bn' ? 'বাংলা' : 'Bengali'}</option>
              <option value="english">English</option>
              <option value="sylheti">{language === 'bn' ? 'সিলেটি' : 'Sylheti'}</option>
              <option value="chittagonian">{language === 'bn' ? 'চাটগাঁইয়া' : 'Chittagonian'}</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 pl-1">
              {language === 'bn' ? 'লিঙ্গ' : 'Gender'}
            </label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors cursor-pointer"
            >
              <option value="all">{language === 'bn' ? 'যেকোনো' : 'Any Gender'}</option>
              <option value="female">{language === 'bn' ? 'মহিলা (Female)' : 'Female'}</option>
              <option value="male">{language === 'bn' ? 'পুরুষ (Male)' : 'Male'}</option>
            </select>
          </div>

          {/* Max Rate Slider */}
          <div>
            <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1.5 pl-1">
              <span>{language === 'bn' ? 'সর্বোচ্চ রেট:' : 'Max Rate:'}</span>
              <span className="text-blue-600 font-bold font-mono">৳ {maxRate}</span>
            </div>
            <input
              type="range"
              min="800"
              max="2500"
              step="50"
              value={maxRate}
              onChange={(e) => setMaxRate(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer mt-1"
            />
          </div>
        </div>
      </div>

      {/* Results Count & Badges */}
      <div className="flex items-center justify-between text-sm text-slate-500 px-1">
        <span className="font-medium">
          {language === 'bn' 
            ? `মোট ${filteredCompanions.length} জন ভেরিফায়েড কম্প্যানিয়ন` 
            : `Showing ${filteredCompanions.length} verified companions`}
        </span>
        <span className="text-blue-600 font-semibold hidden sm:inline flex items-center gap-1">
          ✓ {language === 'bn' ? '১০০% পাবলিক প্লেস পলিসি' : '100% Public Place Policy'}
        </span>
      </div>

      {/* Companions Grid */}
      {filteredCompanions.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white text-slate-400 flex items-center justify-center mx-auto border border-slate-200 shadow-xs">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {language === 'bn' ? 'কোনো কম্প্যানিয়ন পাওয়া যায়নি' : 'No Companions Match Your Filters'}
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {language === 'bn' 
              ? 'অনুগ্রহ করে ফিল্টার পরিবর্তন করুন অথবা রিসেট করুন।' 
              : 'Try broadening your search criteria or resetting filters.'}
          </p>
          <button
            onClick={resetFilters}
            className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all apple-pill-btn shadow-md"
          >
            {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset All Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCompanions.map((comp, idx) => {
            const compBgs = ['card-bg-lavender', 'card-bg-slate', 'card-bg-peach', 'card-bg-rose'];
            const cardBg = compBgs[idx % compBgs.length];

            return (
              <div
                key={comp.id}
                className={`${cardBg} border hover:border-blue-300 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xs hover:shadow-lg transition-all card-google`}
              >
              <div>
                {/* Photo & Image Badges - Sleek compact height for wide card balance */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-100">
                  <img 
                    src={comp.image} 
                    alt={comp.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-sm flex items-center gap-1.5 backdrop-blur-md">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                      {language === 'bn' ? 'ভেরিফায়েড' : 'Verified'}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-sm flex items-center gap-1.5 backdrop-blur-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {comp.rating}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
                    <div>
                      <div className="text-lg font-extrabold drop-shadow-sm">
                        {language === 'bn' ? comp.nameBn : comp.name}
                      </div>
                      <div className="text-xs text-slate-200 flex items-center gap-1.5 mt-0.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-blue-300" />
                        {language === 'bn' ? `${comp.areaBn}, ${comp.cityBn}` : `${comp.area}, ${comp.city}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-white font-mono drop-shadow-sm">৳ {comp.hourlyRate}</div>
                      <div className="text-xs text-slate-300 font-medium">{language === 'bn' ? '/ ঘণ্টা' : '/ hr'}</div>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed line-clamp-2 font-medium">
                    {language === 'bn' ? comp.bioBn : comp.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {comp.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50/90 text-blue-700 border border-blue-100 font-medium">
                        {language === 'bn' ? comp.tagsBn[idx] || tag : tag}
                      </span>
                    ))}
                  </div>

                  {/* Spoken Languages */}
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5 font-medium">
                    <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{comp.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => onSelectCompanion(comp)}
                  className="py-2.5 px-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 transition-colors apple-pill-btn shadow-2xs"
                >
                  {t.viewProfile}
                </button>
                <button
                  onClick={() => onBookCompanion(comp)}
                  className="py-2.5 px-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all apple-pill-btn"
                >
                  {t.bookNow}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )}
    </div>
  );
};
