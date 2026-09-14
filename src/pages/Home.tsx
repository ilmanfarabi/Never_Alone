import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  Star, 
  HeartHandshake, 
  MapPin, 
  Search, 
  UtensilsCrossed, 
  Coffee, 
  Compass, 
  MessageSquareText, 
  Users, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { companionsData } from '../data/companions';
import { occasionsData } from '../data/occasions';
import { testimonialsData } from '../data/testimonials';
import { TrustBadgeStrip } from '../components/common/TrustBadge';
import type { Companion } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
  onSelectCompanion: (comp: Companion) => void;
  onBookCompanion: (comp: Companion) => void;
  onOpenApply: () => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onNavigate, 
  onSelectCompanion, 
  onBookCompanion,
  onOpenApply
}) => {
  const { language, t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');

  const getOccasionIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'MessageSquareText': return <MessageSquareText className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      default: return <HeartHandshake className="w-5 h-5" />;
    }
  };

  const handleQuickSearch = () => {
    onNavigate('companions');
  };

  return (
    <div className="bg-white space-y-16 sm:space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 sm:pb-12 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>{language === 'bn' ? '১০০% প্ল্যাটোনিক ও বিশ্বস্ত সঙ্গী প্ল্যাটফর্ম' : '100% Platonic & Verified Companionship Platform'}</span>
          </div>

          {/* Hero Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Never Alone. <br />
              <span className="text-blue-600">Always in Good Company.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              {t.heroDescription}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('companions')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all apple-pill-btn"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.browseCompanions}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200 transition-all apple-pill-btn"
            >
              {t.howItWorksBtn}
            </button>

            <button
              onClick={onOpenApply}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-blue-50 text-blue-600 font-semibold text-sm border border-blue-300 transition-all apple-pill-btn"
            >
              {t.becomeCompanionBtn}
            </button>
          </div>

          {/* Search Capsule */}
          <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative text-left">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 pl-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {language === 'bn' ? 'শহর / অবস্থান' : 'City / Location'}
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="all">{language === 'bn' ? 'সব শহর (All Bangladesh)' : 'All Cities'}</option>
                  <option value="Dhaka">Dhaka (ঢাকা - গুলশান, ধানমন্ডি, উত্তরা)</option>
                  <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                  <option value="Sylhet">Sylhet (সিলেট)</option>
                  <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                </select>
              </div>

              <div className="relative text-left">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 pl-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  {language === 'bn' ? 'উপলক্ষ / সার্ভিস' : 'Occasion / Service'}
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="all">{language === 'bn' ? 'সব উপলক্ষ (All Occasions)' : 'All Occasions'}</option>
                  {occasionsData.map(occ => (
                    <option key={occ.id} value={occ.id}>
                      {language === 'bn' ? occ.titleBn : occ.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleQuickSearch}
                  className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all apple-pill-btn"
                >
                  <Search className="w-4 h-4" />
                  <span>{language === 'bn' ? 'কম্প্যানিয়ন খুঁজুন' : 'Search Now'}</span>
                </button>
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="flex items-center gap-2 pt-4 px-1 overflow-x-auto text-xs text-slate-600">
              <span className="shrink-0 font-medium">{language === 'bn' ? 'জনপ্রিয়:' : 'Trending:'}</span>
              <button onClick={() => onNavigate('companions')} className="px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 shrink-0 transition-colors">
                ☕ {language === 'bn' ? 'ক্যাফে আড্ডা' : 'Cafe Chill'}
              </button>
              <button onClick={() => onNavigate('companions')} className="px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 shrink-0 transition-colors">
                🍽️ {language === 'bn' ? 'রেস্তোরাঁ ডিনার' : 'Dinner Date'}
              </button>
              <button onClick={() => onNavigate('companions')} className="px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 shrink-0 transition-colors">
                ✨ {language === 'bn' ? 'বিয়ে প্লাস-ওয়ান' : 'Wedding Plus-One'}
              </button>
              <button onClick={() => onNavigate('companions')} className="px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 shrink-0 transition-colors">
                🗺️ {language === 'bn' ? 'ডে-ট্রিপ' : 'Day Trip'}
              </button>
            </div>
          </div>

          {/* Minimal Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-2xl font-bold text-slate-900">{t.statVerified.split(' ')[0]}</div>
              <div className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'ভেরিফায়েড কম্প্যানিয়ন' : 'Verified Companions'}</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-2xl font-bold text-blue-600">{t.statSessions.split(' ')[0]}</div>
              <div className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'সম্পন্ন সেশন' : 'Completed Sessions'}</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-2xl font-bold text-slate-900">4.9 ★</div>
              <div className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'গড় ইউজার রেটিং' : 'Average Rating'}</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'পাবলিক প্লেস সুরক্ষা' : 'Safe Public Venues'}</div>
            </div>
          </div>

          {/* Trust Badges Strip */}
          <div className="pt-2">
            <TrustBadgeStrip />
          </div>
        </div>
      </section>

      {/* 2. Popular Occasions & Tailored Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'বিশেষায়িত সেবা' : 'Tailored Services'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.popularOccasionsTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {t.popularOccasionsSub}
          </p>
        </div>

        {/* Occasion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {occasionsData.map((occ, index) => {
            const cardBgs = [
              'card-bg-lavender', // rgb(243, 229, 245)
              'card-bg-slate',    // rgb(236, 239, 241)
              'card-bg-peach',    // rgb(255, 244, 230)
              'card-bg-rose',     // rgb(255, 235, 238)
              'card-bg-lavender',
              'card-bg-peach',
            ];
            const currentBg = cardBgs[index % cardBgs.length];

            return (
              <div
                key={occ.id}
                onClick={() => onNavigate('companions')}
                className={`${currentBg} border hover:border-blue-300 rounded-3xl p-6 sm:p-7 flex flex-col justify-between group cursor-pointer transition-all shadow-xs hover:shadow-lg card-google`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      {getOccasionIcon(occ.icon)}
                    </div>
                    <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-slate-800 shadow-2xs">
                      {language === 'bn' ? occ.typicalRateBn : occ.typicalRate}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {language === 'bn' ? occ.titleBn : occ.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-600 font-semibold mt-1">
                      {language === 'bn' ? occ.subtitleBn : occ.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium line-clamp-2">
                    {language === 'bn' ? occ.descriptionBn : occ.description}
                  </p>

                  {/* Popular Scenario Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {(language === 'bn' ? occ.popularForBn : occ.popularFor).slice(0, 3).map((item, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-white/95 text-slate-700 border border-slate-200/90 font-medium shadow-2xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs sm:text-sm text-blue-600 font-bold group-hover:text-blue-700">
                  <span>{language === 'bn' ? 'কম্প্যানিয়ন দেখুন' : 'Explore Companions'}</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Verified Companions Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
              <UserCheck className="w-4 h-4" />
              <span>{language === 'bn' ? '১০০% যাচাইকৃত প্রোফাইল' : 'Vetted & Verified'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {t.verifiedCompanionsTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal">
              {t.verifiedCompanionsSub}
            </p>
          </div>

          <button
            onClick={() => onNavigate('companions')}
            className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-sm font-bold flex items-center gap-2 transition-all apple-pill-btn"
          >
            <span>{t.viewAllCompanions}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {companionsData.slice(0, 3).map((comp, idx) => {
            const compBgs = ['card-bg-lavender', 'card-bg-slate', 'card-bg-peach', 'card-bg-rose'];
            const cardBg = compBgs[idx % compBgs.length];

            return (
              <div
                key={comp.id}
                className={`${cardBg} border hover:border-blue-300 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xs hover:shadow-lg transition-all card-google`}
              >
              <div>
                {/* Image Container - Compact height for wide balanced look */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-100">
                  <img 
                    src={comp.image} 
                    alt={comp.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                  {/* Top Status Badges */}
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

                  {/* Identity Bottom */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
                    <div>
                      <div className="text-lg font-extrabold drop-shadow-sm">
                        {language === 'bn' ? comp.nameBn : comp.name}
                      </div>
                      <div className="text-xs text-slate-200 flex items-center gap-1.5 mt-0.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-blue-300" />
                        {language === 'bn' ? comp.cityBn : comp.city}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-white font-mono drop-shadow-sm">৳ {comp.hourlyRate}</div>
                      <div className="text-xs text-slate-300 font-medium">{language === 'bn' ? '/ ঘণ্টা' : '/ hr'}</div>
                    </div>
                  </div>
                </div>

                {/* Details */}
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
      </section>

      {/* 4. 4-Step Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সহজ প্রক্রিয়া' : 'Safe Process'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {t.howItWorksTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal">
              {t.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl card-bg-lavender space-y-3 shadow-2xs hover:shadow-md transition-all card-google">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-extrabold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'সাইন আপ ও ভেরিফাই' : 'Sign Up & Verify'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {language === 'bn'
                  ? 'সরকারি ID (NID/পাসপোর্ট) দিয়ে অ্যাকাউন্ট ভেরিফাই করে শুরু করুন।'
                  : 'Create an account and verify your ID in minutes.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl card-bg-slate space-y-3 shadow-2xs hover:shadow-md transition-all card-google">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-extrabold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'কম্প্যানিয়ন খুঁজুন' : 'Browse Companions'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {language === 'bn'
                  ? 'লোকেশন, ভাষা, উপলক্ষ ও রেটিং দেখে সঠিক সঙ্গী নির্বাচন করুন।'
                  : 'Filter by location, language, and verified reviews.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl card-bg-peach space-y-3 shadow-2xs hover:shadow-md transition-all card-google">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-extrabold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'সেশন বুক করুন' : 'Book a Session'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {language === 'bn'
                  ? 'পাবলিক ভেন্যু, তারিখ ও সময় নির্বাচন করে বুকিং রিকোয়েস্ট পাঠান।'
                  : 'Choose public venue, time, and send your request.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl card-bg-rose space-y-3 shadow-2xs hover:shadow-md transition-all card-google">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-extrabold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'নিরাপদে সাক্ষাৎ ও পেমেন্ট' : 'Meet & Pay Safely'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {language === 'bn'
                  ? 'পাবলিক স্থানে সাক্ষাৎ করুন। পেমেন্ট প্ল্যাটফর্মের এসক্রোতে সুরক্ষিত।'
                  : 'Meet at a public venue and pay securely via escrow.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
            <span>{language === 'bn' ? 'বাস্তব অভিজ্ঞতা' : 'Real Stories'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {t.testimonialsTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {t.testimonialsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {testimonialsData.map((test, idx) => {
            const bgVariants = [
              'card-bg-lavender', // rgb(243, 229, 245)
              'card-bg-slate',    // rgb(236, 239, 241)
              'card-bg-peach',    // rgb(255, 244, 230)
              'card-bg-rose'      // rgb(255, 235, 238)
            ];
            const testBg = bgVariants[idx % bgVariants.length];

            return (
              <div
                key={test.id}
                className={`${testBg} border rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-lg transition-all card-google`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/90 text-blue-700 border border-slate-200/80 font-bold shadow-2xs">
                      {language === 'bn' ? test.occasionBn : test.occasion}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
                    "{language === 'bn' ? test.quoteBn : test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3.5 border-t border-slate-200/60">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/80"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {language === 'bn' ? test.nameBn : test.name}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {language === 'bn' ? test.roleBn : test.role}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Footer CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 card-bg-peach border border-[#ffe0b2] text-slate-900 text-center shadow-xs card-google space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {t.footerCtaTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.footerCtaSub}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('companions')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all apple-pill-btn"
            >
              {t.signUpNow}
            </button>
            <button
              onClick={onOpenApply}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-200 transition-all apple-pill-btn shadow-2xs"
            >
              {t.becomeCompanionBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
