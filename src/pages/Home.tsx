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
  ChevronRight
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
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Coffee': return <Coffee className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'MessageSquareText': return <MessageSquareText className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      default: return <HeartHandshake className="w-6 h-6" />;
    }
  };

  const handleQuickSearch = () => {
    onNavigate('companions');
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-rose-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Platonic Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-950/50 animate-float">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{language === 'bn' ? '১০০% প্ল্যাটোনিক ও নিরাপদ কম্প্যানিয়নশিপ প্ল্যাটফর্ম' : '100% Platonic & Verified Companionship Platform'}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
            {language === 'bn' ? (
              <>
                <span className="text-gradient">Never Alone.</span> <br />
                <span className="text-gradient-warm">Always in Good Company.</span>
              </>
            ) : (
              <>
                <span className="text-gradient">Never Alone.</span> <br />
                <span className="text-gradient-warm">Always in Good Company.</span>
              </>
            )}
          </h1>

          {/* Subtitle / Description from document */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {t.heroDescription}
          </p>

          <p className="text-xs sm:text-sm text-indigo-300 font-medium italic">
            "{t.subTagline}"
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('companions')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.browseCompanions}</span>
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-slate-600 transition-all"
            >
              {t.howItWorksBtn}
            </button>

            <button
              onClick={onOpenApply}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-indigo-950/60 text-indigo-300 hover:text-indigo-200 font-semibold text-sm border border-indigo-900/50 hover:border-indigo-500/40 transition-all"
            >
              {t.becomeCompanionBtn}
            </button>
          </div>

          {/* Quick Search Bar Widget */}
          <div className="max-w-3xl mx-auto mt-10 p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 text-left mb-1">
                  {language === 'bn' ? 'শহর / অবস্থান' : 'City / Location'}
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">{language === 'bn' ? 'সব শহর (All Bangladesh)' : 'All Cities'}</option>
                  <option value="Dhaka">Dhaka (ঢাকা - গুলশান, ধানমন্ডি, উত্তরা)</option>
                  <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                  <option value="Sylhet">Sylhet (সিলেট)</option>
                  <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 text-left mb-1">
                  {language === 'bn' ? 'উপলক্ষ / সার্ভিস' : 'Occasion / Service'}
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
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
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>{language === 'bn' ? 'কম্প্যানিয়ন খুঁজুন' : 'Search Now'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges Strip (from document) */}
          <div className="pt-8">
            <TrustBadgeStrip />
          </div>
        </div>
      </section>

      {/* 2. Featured Section — Popular Occasions (Occasion Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs uppercase font-bold tracking-widest text-indigo-400">
            {language === 'bn' ? 'আমাদের বিশেষায়িত সেবা' : 'Tailored Services'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t.popularOccasionsTitle}
          </h2>
          <p className="text-sm text-slate-400">
            {t.popularOccasionsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasionsData.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onNavigate('companions')}
              className="glass-card rounded-3xl p-6 border border-slate-800/80 hover:border-indigo-500/40 transition-all group cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/50 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {getOccasionIcon(occ.icon)}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {language === 'bn' ? occ.typicalRateBn : occ.typicalRate}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {language === 'bn' ? occ.titleBn : occ.title}
                  </h3>
                  <p className="text-xs text-indigo-400/90 font-medium mt-0.5">
                    {language === 'bn' ? occ.subtitleBn : occ.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {language === 'bn' ? occ.descriptionBn : occ.description}
                </p>

                {/* Popular Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(language === 'bn' ? occ.popularForBn : occ.popularFor).slice(0, 3).map((item, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-indigo-300">
                <span>{language === 'bn' ? 'উপযুক্ত কম্প্যানিয়ন দেখুন' : 'Explore Companions'}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Verified Companions Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              {language === 'bn' ? '১০০% ভেরিফায়েড প্রোফাইল' : 'Vetted & Verified'}
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              {t.verifiedCompanionsTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {t.verifiedCompanionsSub}
            </p>
          </div>

          <button
            onClick={() => onNavigate('companions')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>{t.viewAllCompanions}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companionsData.slice(0, 4).map((comp) => (
            <div
              key={comp.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={comp.image} 
                    alt={comp.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                  {/* Badges */}
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

                  {/* Rate Bottom on Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <div className="text-base font-bold">
                        {language === 'bn' ? comp.nameBn : comp.name}
                      </div>
                      <div className="text-[11px] text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {language === 'bn' ? comp.cityBn : comp.city}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-emerald-400">৳ {comp.hourlyRate}</div>
                      <div className="text-[9px] text-slate-300">{language === 'bn' ? '/ ঘণ্টা' : '/ hr'}</div>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {language === 'bn' ? comp.bioBn : comp.bio}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {comp.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                        {language === 'bn' ? comp.tagsBn[idx] || tag : tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectCompanion(comp)}
                  className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  {t.viewProfile}
                </button>
                <button
                  onClick={() => onBookCompanion(comp)}
                  className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors"
                >
                  {t.bookNow}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How It Works (4-Step Teaser from document) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="text-xs uppercase font-bold tracking-widest text-indigo-400">
              {language === 'bn' ? 'সহজ ও সুরক্ষিত প্রক্রিয়া' : 'Simple & Safe Process'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {t.howItWorksTitle}
            </h2>
            <p className="text-sm text-slate-400">
              {t.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 relative group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
                ০১
              </div>
              <h3 className="text-base font-bold text-white">
                {language === 'bn' ? 'Sign Up & Verify' : 'Sign Up & Verify'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'আপনার অ্যাকাউন্ট তৈরি করুন এবং সরকারি পরিচয়পত্র দিয়ে আইডেন্টিটি ভেরিফাই করুন। এটি সবার নিরাপত্তার জন্য বাধ্যতামূলক।'
                  : 'Create your account and verify your identity with government ID for platform-wide safety.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 relative group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
                ০২
              </div>
              <h3 className="text-base font-bold text-white">
                {language === 'bn' ? 'Browse Companions' : 'Browse Companions'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'ভাষা, আগ্রহ, লোকেশন ও উপলভ্যতা অনুযায়ী কম্প্যানিয়ন প্রোফাইল ব্রাউজ করুন। প্রতিটি প্রোফাইলে রিভিউ ও রেটিং দেখতে পাবেন।'
                  : 'Filter by language, interests, occasion, and location. Read authentic reviews and verified ratings.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 relative group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
                ০৩
              </div>
              <h3 className="text-base font-bold text-white">
                {language === 'bn' ? 'Book a Session' : 'Book a Session'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'সময়, স্থান ও উপলক্ষ উল্লেখ করে বুকিং রিকোয়েস্ট পাঠান। কম্প্যানিয়ন কনফার্ম করলেই বুকিং ফাইনাল হয়ে যাবে।'
                  : 'Select your public venue, date, time, and occasion. Receive your confirmation and safety check-in PIN.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 relative group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
                ০৪
              </div>
              <h3 className="text-base font-bold text-white">
                {language === 'bn' ? 'Meet & Pay Safely' : 'Meet & Pay Safely'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'সবসময় একটি পাবলিক স্থানে দেখা করুন। পেমেন্ট প্ল্যাটফর্মের মাধ্যমেই সম্পন্ন হয় — নগদ লেনদেন নিরুৎসাহিত করা হয়।'
                  : 'Always meet at a public cafe or venue. Payments are held in secure escrow. Rate each other afterwards.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Social Proof / Testimonial Section (from document) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs uppercase font-bold tracking-widest text-indigo-400">
            {language === 'bn' ? 'সামাজিক প্রমাণ ও বাস্তব মতামত' : 'Social Proof & Reviews'}
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            {t.testimonialsTitle}
          </h2>
          <p className="text-sm text-slate-400">
            {t.testimonialsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                    {language === 'bn' ? test.occasionBn : test.occasion}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{language === 'bn' ? test.quoteBn : test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                <img 
                  src={test.avatar} 
                  alt={test.name} 
                  className="w-10 h-10 rounded-full object-cover border border-indigo-500/40"
                />
                <div>
                  <div className="text-xs font-bold text-white">
                    {language === 'bn' ? test.nameBn : test.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {language === 'bn' ? test.roleBn : test.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Footer CTA Section (from document) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-indigo-900 via-indigo-800 to-rose-900 text-white text-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {t.footerCtaTitle}
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
              {t.footerCtaSub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('companions')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-indigo-950 font-extrabold text-sm shadow-xl transition-all"
              >
                {t.signUpNow}
              </button>
              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-indigo-950/60 hover:bg-indigo-950 text-white font-semibold text-sm border border-white/20 transition-all"
              >
                {t.becomeCompanionBtn}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
