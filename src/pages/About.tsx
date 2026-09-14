import React from 'react';
import { 
  HeartHandshake, 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  Heart, 
  Users, 
  Sparkles, 
  ArrowRight,
  Lock,
  Globe2
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export const About: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const values = [
    {
      icon: Eye,
      title: language === 'bn' ? 'স্বচ্ছতা (Transparency)' : 'Transparency',
      desc: language === 'bn' 
        ? 'বুকিং ও পেমেন্টে কোনো লুকানো চার্জ বা অস্পষ্টতা নেই।'
        : 'Clear pricing and booking terms with zero hidden fees.'
    },
    {
      icon: ShieldCheck,
      title: language === 'bn' ? 'নিরাপত্তা (Safety)' : 'Safety First',
      desc: language === 'bn' 
        ? 'সরকারি আইডি ভেরিফিকেশন ও পাবলিক-প্লেস পলিসি সর্বাগ্রে।'
        : 'Mandatory government ID checks and public venue policy.'
    },
    {
      icon: Heart,
      title: language === 'bn' ? 'সম্মান (Respect)' : 'Mutual Respect',
      desc: language === 'bn' 
        ? 'মার্জিত, শ্রদ্ধাশীল ও পেশাদার আচরণ সবার জন্য আবশ্যক।'
        : 'Polite, professional, and respectful conduct is mandatory.'
    },
    {
      icon: Users,
      title: language === 'bn' ? 'অন্তর্ভুক্তি (Inclusivity)' : 'Inclusivity',
      desc: language === 'bn' 
        ? 'প্রাপ্তবয়স্ক সবার জন্য একটি উন্মুক্ত ও নিরাপদ প্ল্যাটফর্ম।'
        : 'A welcoming and safe platform for all adult users.'
    }
  ];

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero / Mission Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'bn' ? 'আমাদের দর্শন' : 'Our Philosophy'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {language === 'bn' ? (
            <>
              একাকীত্বহীন সমাজ বিনির্মাণে <br />
              <span className="text-blue-600">স্মার্ট প্ল্যাটফর্ম</span>
            </>
          ) : (
            <>
              Banishing Urban Isolation. <br />
              <span className="text-blue-600">Connected by Trust.</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'bn'
            ? 'NeverAlone সামাজিক একাকীত্ব দূর করে রেস্তোরাঁ ডিনার, বিয়ে ও ইভেন্টে বিশ্বস্ত সঙ্গীর সাথে নিরাপদ অংশগ্রহণের সুযোগ দেয়।'
            : 'NeverAlone bridges social isolation by providing verified, cultured companions for dinners, weddings, and events in a safe, platonic setting.'}
        </p>
      </div>

      {/* Bento Story & Platonic Guarantee */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7">
        {/* Platonic Policy Bento Box */}
        <div className="md:col-span-12 p-6 sm:p-8 rounded-3xl card-bg-rose card-google">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wider">
                {language === 'bn' ? 'জরুরি প্ল্যাটোনিক নীতি' : 'Zero-Tolerance Platonic Policy'}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {language === 'bn' ? 'NeverAlone কোনো ডেটিং বা এসকর্ট সার্ভিস নয়' : 'NeverAlone is NOT a Dating or Escort Platform'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {language === 'bn' ? (
                  <>
                    আমরা কঠোরভাবে <strong>প্ল্যাটোনিক (অ-রোমান্টিক ও অ-যৌন)</strong> সামাজিক সঙ্গ সেবা প্রদান করি। যেকোনো অনুপযুক্ত অনুরোধে সংশ্লিষ্ট অ্যাকাউন্ট তাৎক্ষণিক স্থায়ী ব্যান হবে।
                  </>
                ) : (
                  <>
                    We strictly provide <strong>platonic (non-romantic, non-sexual)</strong> companionship. Any romantic or inappropriate proposal results in immediate permanent ban.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Bento Box */}
        <div className="md:col-span-7 p-6 sm:p-7 rounded-3xl card-bg-lavender shadow-xs hover:shadow-lg space-y-4 flex flex-col justify-between card-google transition-all">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === 'bn' ? 'কেন NeverAlone তৈরি হলো?' : 'Why NeverAlone was Built'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {language === 'bn'
                ? 'শহরে একা থাকা, নতুন জায়গায় ভ্রমণ বা বিয়ে ও ডিনারে প্লাস-ওয়ান না থাকার দ্বিধা কাটাতে NeverAlone-এর যাত্রা। আমরা নিরাপদ ও মার্জিত উপায়ে আন্তরিক সামাজিক সঙ্গ পাওয়ার প্ল্যাটফর্ম দিই।'
                : 'Urban hustle, living away from home, or needing a plus-one often leaves people attending events alone. NeverAlone bridges this with verified, cultured companions in a 100% platonic setting.'}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-200/60">
            <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
              <Globe2 className="w-4 h-4 text-blue-600" />
              <span>{language === 'bn' ? 'ঢাকা, চট্টগ্রাম ও সিলেট' : 'Dhaka, Chattogram & Sylhet'}</span>
            </div>
            <button
              onClick={() => onNavigate('companions')}
              className="px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 transition-all apple-pill-btn flex items-center gap-1.5 shadow-2xs"
            >
              <span>{language === 'bn' ? 'সঙ্গী খুঁজুন' : 'Browse'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Metrics Bento Box */}
        <div className="md:col-span-5 p-6 sm:p-7 rounded-3xl card-bg-peach shadow-xs hover:shadow-lg space-y-4 flex flex-col justify-between card-google transition-all">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>{language === 'bn' ? 'সুরক্ষা মাপকাঠি' : 'Safety Metrics'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === 'bn' ? '১০০% বিশ্বস্ততা' : '100% Verified'}
            </h3>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl bg-white/90 border border-slate-200/80 flex items-center justify-between text-xs sm:text-sm shadow-2xs">
              <span className="text-slate-700 font-medium">{language === 'bn' ? 'সরকারি NID ভেরিফিকেশন' : 'NID / Passport Vetting'}</span>
              <span className="font-bold text-blue-600">১০০%</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-slate-200/80 flex items-center justify-between text-xs sm:text-sm shadow-2xs">
              <span className="text-slate-700 font-medium">{language === 'bn' ? 'পাবলিক প্লেস প্রোটোকল' : 'Public Venue Protocol'}</span>
              <span className="font-bold text-blue-600">অনুমোদিত</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-slate-200/80 flex items-center justify-between text-xs sm:text-sm shadow-2xs">
              <span className="text-slate-700 font-medium">{language === 'bn' ? 'এসক্রো পেমেন্ট সিকিউরিটি' : 'Escrow Payment Security'}</span>
              <span className="font-bold text-blue-600">সুরক্ষিত</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {language === 'bn' ? 'আমাদের ৪টি মূল স্তম্ভ' : 'Our 4 Core Pillars'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {language === 'bn' ? 'যেসব মূলনীতির উপর ভিত্তি করে NeverAlone পরিচালিত হয়' : 'The foundational values that guide every single session'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            const valBgs = [
              'card-bg-lavender', // rgb(243, 229, 245)
              'card-bg-slate',    // rgb(236, 239, 241)
              'card-bg-peach',    // rgb(255, 244, 230)
              'card-bg-rose',     // rgb(255, 235, 238)
            ];
            const vBg = valBgs[idx % valBgs.length];

            return (
              <div key={idx} className={`${vBg} border hover:border-blue-300 p-5 sm:p-6 rounded-3xl space-y-3 flex flex-col justify-between group shadow-xs hover:shadow-md transition-all card-google`}>
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 text-blue-600 flex items-center justify-center shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
