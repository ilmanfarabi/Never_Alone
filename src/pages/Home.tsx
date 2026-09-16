import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  Star, 
  HeartHandshake, 
  MapPin, 
  UtensilsCrossed, 
  Coffee, 
  Compass, 
  MessageSquareText, 
  Users, 
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { companionsData } from '../data/companions';
import { occasionsData } from '../data/occasions';
import { testimonialsData } from '../data/testimonials';
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
  const [activeCompanionIndex, setActiveCompanionIndex] = React.useState(0);

  const handleSliderScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const cardWidth = 340 + 24; // width + gap
    const newIndex = Math.round(target.scrollLeft / cardWidth);
    if (newIndex !== activeCompanionIndex && newIndex >= 0 && newIndex < companionsData.length) {
      setActiveCompanionIndex(newIndex);
    }
  };

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

  return (
    <div className="bg-white space-y-16 sm:space-y-24 pb-20 selection:bg-blue-500 selection:text-white">
      {/* 1. Hero Section with subtle ambient backdrop */}
      <section className="relative pt-12 sm:pt-20 pb-8 sm:pb-12 overflow-hidden bg-white">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-blue-50/70 via-indigo-50/20 to-transparent pointer-events-none -z-10 rounded-b-[4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold shadow-xs hover:border-blue-300 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>{language === 'bn' ? '১০০% প্ল্যাটোনিক ও নিরাপদ' : '100% Platonic & Safe'}</span>
          </div>

          {/* Hero Headline */}
          <div className="space-y-4 max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Never Alone. <br />
              <span className="text-blue-600">Always in Good Company.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
              {t.heroDescription}
            </p>
          </div>

          {/* Minimal Metrics Bar with subtle glassmorphism */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-4xl mx-auto pt-3">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all text-center space-y-1">
              <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{language === 'bn' ? '১,৫০০+' : '1,500+'}</div>
              <div className="text-xs text-slate-500 font-semibold">{language === 'bn' ? 'ভেরিফায়েড সঙ্গী' : 'Verified Hosts'}</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all text-center space-y-1">
              <div className="text-2xl font-extrabold text-blue-600 tracking-tight">{language === 'bn' ? '১২,০০০+' : '12,000+'}</div>
              <div className="text-xs text-slate-500 font-semibold">{language === 'bn' ? 'সফল সেশন' : 'Completed Sessions'}</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all text-center space-y-1">
              <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{language === 'bn' ? '৪.৯ ★' : '4.9 ★'}</div>
              <div className="text-xs text-slate-500 font-semibold">{language === 'bn' ? 'গড় রেটিং' : 'Average Rating'}</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all text-center space-y-1">
              <div className="text-2xl font-extrabold text-blue-600 tracking-tight">{language === 'bn' ? '১০০%' : '100%'}</div>
              <div className="text-xs text-slate-500 font-semibold">{language === 'bn' ? 'পাবলিক প্লেস সুরক্ষা' : 'Safe Public Venues'}</div>
            </div>
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

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-2">
                    {language === 'bn' ? occ.descriptionBn : occ.description}
                  </p>

                  {/* Popular Scenario Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {(language === 'bn' ? occ.popularForBn : occ.popularFor).slice(0, 2).map((item, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-0.5 rounded-lg bg-white/95 text-slate-700 border border-slate-200/90 font-medium shadow-2xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs sm:text-sm text-blue-600 font-bold group-hover:text-blue-700">
                  <span>{language === 'bn' ? 'সঙ্গী দেখুন' : 'Explore'}</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Verified Companions Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'যাচাইকৃত প্রোফাইল' : 'Verified'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {t.verifiedCompanionsTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              {t.verifiedCompanionsSub}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const slider = document.getElementById('companions-slider');
                  if (slider) slider.scrollBy({ left: -340, behavior: 'smooth' });
                }}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center justify-center shadow-2xs"
                aria-label="Previous Companion"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  const slider = document.getElementById('companions-slider');
                  if (slider) slider.scrollBy({ left: 340, behavior: 'smooth' });
                }}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center justify-center shadow-2xs"
                aria-label="Next Companion"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => onNavigate('companions')}
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all apple-pill-btn shadow-xs"
            >
              <span>{t.viewAllCompanions}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Animated Horizontal Slider */}
        <div 
          id="companions-slider"
          onScroll={handleSliderScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {companionsData.map((comp, idx) => {
            const compBgs = ['card-bg-lavender', 'card-bg-slate', 'card-bg-peach', 'card-bg-rose'];
            const cardBg = compBgs[idx % compBgs.length];

            return (
              <div
                key={comp.id}
                className={`${cardBg} border border-slate-200/90 hover:border-blue-400 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-xl transition-all duration-300 min-w-[290px] sm:min-w-[340px] max-w-[340px] snap-start shrink-0 hover:-translate-y-1`}
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden bg-slate-100">
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
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-2 font-medium">
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

        {/* Circle Dots Position Indicators */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {companionsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const slider = document.getElementById('companions-slider');
                if (slider) {
                  slider.scrollTo({ left: idx * (340 + 24), behavior: 'smooth' });
                  setActiveCompanionIndex(idx);
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeCompanionIndex === idx
                  ? 'w-7 bg-blue-600'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4. 4-Step Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-8">
          <div className="max-w-xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সহজ প্রক্রিয়া' : 'Process'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {t.howItWorksTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {t.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
            {/* Step 1 */}
            <div className="p-5 rounded-3xl card-bg-lavender space-y-2 shadow-2xs hover:shadow-md transition-all card-google">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-extrabold text-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'আইডি ভেরিফাই' : 'ID Verify'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {language === 'bn'
                  ? 'NID দিয়ে ফ্রি সাইন-আপ ও ভেরিফাই করুন।'
                  : 'Fast ID verification in minutes.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-3xl card-bg-slate space-y-2 shadow-2xs hover:shadow-md transition-all card-google">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-extrabold text-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'সঙ্গী নির্বাচন' : 'Choose Companion'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {language === 'bn'
                  ? 'লোকেশন ও পছন্দ অনুযায়ী সঠিক সঙ্গী খুঁজুন।'
                  : 'Browse verified profiles by location.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-3xl card-bg-peach space-y-2 shadow-2xs hover:shadow-md transition-all card-google">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-extrabold text-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'সেশন বুকিং' : 'Book Session'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {language === 'bn'
                  ? 'পাবলিক স্থান ও সুবিধাজনক সময় সেট করুন।'
                  : 'Set public venue, date & time.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-3xl card-bg-rose space-y-2 shadow-2xs hover:shadow-md transition-all card-google">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-extrabold text-xs">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'নিরাপদ সাক্ষাৎ' : 'Meet Safely'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {language === 'bn'
                  ? 'পাবলিক স্থানে সাক্ষাৎ ও সুরক্ষিত পেমেন্ট।'
                  : 'Meet in public with secure payment.'}
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
