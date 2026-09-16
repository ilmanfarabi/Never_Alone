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
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Coffee': return <Coffee className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'MessageSquareText': return <MessageSquareText className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'bn' ? 'সার্ভিস ও উপলক্ষসমূহ' : 'Our Occasions & Services'}</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {language === 'bn' ? (
            <>
              যেকোনো সামাজিক মুহূর্তের <br />
              <span className="text-blue-600">উপযুক্ত মার্জিত সঙ্গ</span>
            </>
          ) : (
            <>
              Tailored Companionship <br />
              <span className="text-blue-600">For Every Occasion</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'bn'
            ? 'পারিবারিক অনুষ্ঠান, রেস্তোরাঁ ডিনার, মুভি বা আড্ডার জন্য যাচাইকৃত সঙ্গী বেছে নিন।'
            : 'Find verified plus-ones for dinners, weddings, movie outings, or friendly chats.'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {occasionsData.map((occ, index) => {
          const serviceBgs = [
            'card-bg-lavender', // rgb(243, 229, 245)
            'card-bg-slate',    // rgb(236, 239, 241)
            'card-bg-peach',    // rgb(255, 244, 230)
            'card-bg-rose',     // rgb(255, 235, 238)
            'card-bg-lavender',
            'card-bg-peach',
          ];
          const currentBg = serviceBgs[index % serviceBgs.length];

          return (
            <div
              key={occ.id}
              className={`${currentBg} border border-slate-200/90 hover:border-blue-400 p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-4 group shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs shrink-0">
                    {getOccasionIcon(occ.icon)}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                      {language === 'bn' ? 'রেট' : 'Rate'}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                      {language === 'bn' ? occ.typicalRateBn : occ.typicalRate}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {language === 'bn' ? occ.titleBn : occ.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    {language === 'bn' ? occ.subtitleBn : occ.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
                  {language === 'bn' ? occ.descriptionBn : occ.description}
                </p>

                {/* Suggested Duration Tag */}
                <div className="p-2.5 rounded-lg bg-white/90 border border-slate-200/80 flex items-center justify-between text-xs shadow-2xs">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    {language === 'bn' ? 'সময়কাল:' : 'Duration:'}
                  </span>
                  <span className="font-bold text-slate-900">
                    {language === 'bn' ? occ.recommendedDurationBn : occ.recommendedDuration}
                  </span>
                </div>

                {/* Popular Scenarios */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {language === 'bn' ? 'উপযুক্ত ক্ষেত্র:' : 'Scenarios:'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(language === 'bn' ? occ.popularForBn : occ.popularFor).map((item, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-white/90 text-slate-700 font-medium border border-slate-200/70 shadow-2xs">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('companions')}
                className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 apple-pill-btn shadow-xs mt-1"
              >
                <span>{language === 'bn' ? 'কম্প্যানিয়ন দেখুন' : 'Browse Companions'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Strict Non-Romantic Notice Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex items-center gap-4">
        <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
        <div className="text-sm text-slate-600 leading-relaxed font-normal">
          {language === 'bn' ? (
            <>
              <strong className="text-slate-900 font-bold">প্ল্যাটফর্ম সতর্কতা:</strong> সকল সার্ভিস সম্পূর্ণভাবে অ-রোমান্টিক ও অ-যৌন প্রকৃতির। যেকোনো প্রকার রোমান্টিক বা অন্তরঙ্গ প্রস্তাব অবিলম্বে অ্যাকাউন্ট বাতিল ও আইনানুগ ব্যবস্থাযোগ্য অপরাধ।
            </>
          ) : (
            <>
              <strong className="text-slate-900 font-bold">Platform Policy Notice:</strong> All services are strictly platonic and non-romantic. Any romantic or inappropriate propositions lead to immediate permanent account termination and potential legal action.
            </>
          )}
        </div>
      </div>
    </div>
  );
};
