import React from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Coffee, 
  Compass, 
  MessageSquareText, 
  Users, 
  Clock, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';
import { occasionsData } from '../data/occasions';

export const Services: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const getOccasionIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-8 h-8" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'Coffee': return <Coffee className="w-8 h-8" />;
      case 'Compass': return <Compass className="w-8 h-8" />;
      case 'MessageSquareText': return <MessageSquareText className="w-8 h-8" />;
      case 'Users': return <Users className="w-8 h-8" />;
      default: return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{language === 'bn' ? 'সার্ভিস ও উপলক্ষসমূহ' : 'Our Occasions & Services'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'bn' ? 'যেকোনো সামাজিক মুহূর্তের জন্য উপযুক্ত সঙ্গ' : 'Tailored Companionship for Every Event'}
        </h1>
        <p className="text-base text-slate-300">
          {language === 'bn'
            ? 'পারিবারিক অনুষ্ঠান, রেস্তোরাঁ ডিনার, মুভি দেখা কিংবা শুধু মন খুলে আড্ডা দেওয়ার জন্য অভিজ্ঞ ও মার্জিত সঙ্গী বেছে নিন।'
            : 'Find verified plus-ones for family dinners, weddings, movie outings, or active language practice.'}
        </p>
      </div>

      {/* Services Grid with Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {occasionsData.map((occ) => (
          <div
            key={occ.id}
            className="glass-card rounded-3xl p-7 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md">
                  {getOccasionIcon(occ.icon)}
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">{language === 'bn' ? 'আনুমানিক রেট' : 'Typical Rate'}</div>
                  <div className="text-sm font-bold text-emerald-400">
                    {language === 'bn' ? occ.typicalRateBn : occ.typicalRate}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {language === 'bn' ? occ.titleBn : occ.title}
                </h3>
                <p className="text-xs font-medium text-indigo-400 mt-1">
                  {language === 'bn' ? occ.subtitleBn : occ.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === 'bn' ? occ.descriptionBn : occ.description}
              </p>

              {/* Recommended Duration & Venue */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {language === 'bn' ? 'প্রস্তাবিত সময়কাল:' : 'Suggested Duration:'}
                </span>
                <span className="font-semibold text-white">
                  {language === 'bn' ? occ.recommendedDurationBn : occ.recommendedDuration}
                </span>
              </div>

              {/* Popular Tags */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {language === 'bn' ? 'উপযুক্ত ক্ষেত্রসমূহ:' : 'Popular Occasion Scenarios:'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(language === 'bn' ? occ.popularForBn : occ.popularFor).map((item, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('companions')}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-colors"
            >
              <span>{language === 'bn' ? 'এই সার্ভিসের কম্প্যানিয়ন দেখুন' : 'View Available Companions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Strict Non-Romantic Notice Footer from Document */}
      <div className="p-6 rounded-3xl bg-rose-950/40 border-2 border-rose-500/30 flex items-center gap-4 text-rose-200">
        <ShieldCheck className="w-8 h-8 text-rose-400 shrink-0" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="text-white">দ্রষ্টব্য:</strong> সকল সার্ভিস সম্পূর্ণভাবে অ-রোমান্টিক ও অ-যৌন প্রকৃতির। কোনো ধরনের রোমান্টিক বা অন্তরঙ্গ অনুরোধ প্ল্যাটফর্মের নীতিমালার সরাসরি লঙ্ঘন এবং স্থায়ী ব্যানযোগ্য অপরাধ।
        </div>
      </div>
    </div>
  );
};
