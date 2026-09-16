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
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
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
              className={`${currentBg} border hover:border-blue-300 p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4 group shadow-xs hover:shadow-lg transition-all card-google`}
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                    {getOccasionIcon(occ.icon)}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                      {language === 'bn' ? 'আনুমানিক রেট' : 'Typical Rate'}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-900 font-mono mt-0.5">
                      {language === 'bn' ? occ.typicalRateBn : occ.typicalRate}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {language === 'bn' ? occ.titleBn : occ.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-blue-600 mt-1">
                    {language === 'bn' ? occ.subtitleBn : occ.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  {language === 'bn' ? occ.descriptionBn : occ.description}
                </p>

                {/* Suggested Duration Tag */}
                <div className="p-3 rounded-2xl bg-white/90 border border-slate-200/80 flex items-center justify-between text-xs sm:text-sm shadow-2xs">
                  <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {language === 'bn' ? 'প্রস্তাবিত সময়কাল:' : 'Suggested Duration:'}
                  </span>
                  <span className="font-bold text-slate-900">
                    {language === 'bn' ? occ.recommendedDurationBn : occ.recommendedDuration}
                  </span>
                </div>

                {/* Popular Scenarios */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {language === 'bn' ? 'উপযুক্ত ক্ষেত্রসমূহ:' : 'Popular Scenarios:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'bn' ? occ.popularForBn : occ.popularFor).map((item, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-xl bg-white/90 text-slate-700 border border-slate-200/80 font-medium shadow-2xs">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('companions')}
                className="w-full py-3 rounded-2xl bg-white hover:bg-blue-600 text-slate-800 hover:text-white text-sm font-bold border border-slate-200 hover:border-transparent transition-all flex items-center justify-center gap-2 apple-pill-btn shadow-2xs mt-2"
              >
                <span>{language === 'bn' ? 'কম্প্যানিয়ন দেখুন' : 'Browse Companions'}</span>
                <ArrowRight className="w-4 h-4" />
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
