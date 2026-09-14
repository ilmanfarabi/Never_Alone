import React from 'react';
import { 
  UserCheck, 
  Search, 
  CalendarCheck, 
  ShieldCheck, 
  Star, 
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export const HowItWorks: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const steps = [
    {
      num: '01',
      title: 'Sign Up & Verify ID',
      titleBn: 'আইডি ভেরিফিকেশন',
      desc: 'Create an account and verify your ID with government NID or Passport in 2 minutes.',
      descBn: 'সরকারি পরিচয়পত্র (NID/পাসপোর্ট) দিয়ে মাত্র ২ মিনিটে আইডি ভেরিফাই করুন।',
      icon: UserCheck,
      detailsBn: 'ফেস ম্যাচিং ও বায়োমেট্রিক চেক',
      badge: 'Identity Verification'
    },
    {
      num: '02',
      title: 'Browse & Choose',
      titleBn: 'সঙ্গী নির্বাচন',
      desc: 'Filter companions by spoken languages, city, occasions, and verified ratings.',
      descBn: 'ভাষা, লোকেশন, উপলক্ষ ও রিয়েল রেটিং দেখে পছন্দের সঙ্গী খুঁজুন।',
      icon: Search,
      detailsBn: 'রিভিউ ও ব্যাকগ্রাউন্ড উন্মুক্ত',
      badge: 'Verified Matches'
    },
    {
      num: '03',
      title: 'Book a Safe Session',
      titleBn: 'পাবলিক সেশন বুকিং',
      desc: 'Specify your public venue, date, time, and receive your Safety PIN.',
      descBn: 'পাবলিক ভেন্যু, তারিখ ও সময় নির্বাচন করে বুকিং রিকোয়েস্ট পাঠান।',
      icon: CalendarCheck,
      detailsBn: 'ইউনিক সেফটি পিন (Safety PIN)',
      badge: 'Public Places Only'
    },
    {
      num: '04',
      title: 'Meet & Pay Safely',
      titleBn: 'সাক্ষাৎ ও নিরাপদ পেমেন্ট',
      desc: 'Meet in public. Payments are protected in platform escrow until session completes.',
      descBn: 'পাবলিক স্থানে সাক্ষাৎ করুন। পেমেন্ট প্ল্যাটফর্মের এসক্রোতে সুরক্ষিত থাকে।',
      icon: ShieldCheck,
      detailsBn: 'সেশন শেষে দ্বিপাক্ষিক রেটিং',
      badge: 'Escrow Protection'
    }
  ];

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'bn' ? 'কীভাবে কাজ করে' : 'How It Works'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {language === 'bn' ? (
            <>
              সহজ ৪টি ধাপে <br />
              <span className="text-blue-600">নিরাপদ সঙ্গী বুক করুন</span>
            </>
          ) : (
            <>
              Book in 4 Simple Steps. <br />
              <span className="text-blue-600">Safe, Simple & Fast.</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'bn'
            ? 'NeverAlone-এর স্বচ্ছ ও সুরক্ষিত প্রক্রিয়ায় যেকোনো মুহূর্তের জন্য বিশ্বস্ত প্লাস-ওয়ান বা আড্ডার সঙ্গী খুঁজে নিন।'
            : 'A transparent, respectful, and verified workflow for booking verified platonic companions.'}
        </p>
      </div>

      {/* 4 Steps Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const stepBgs = [
            'card-bg-lavender', // rgb(243, 229, 245)
            'card-bg-slate',    // rgb(236, 239, 241)
            'card-bg-peach',    // rgb(255, 244, 230)
            'card-bg-rose'      // rgb(255, 235, 238)
          ];
          const cardBg = stepBgs[idx % stepBgs.length];

          return (
            <div
              key={idx}
              className={`${cardBg} border hover:border-blue-300 p-6 sm:p-7 rounded-3xl space-y-4 flex flex-col justify-between group shadow-xs hover:shadow-lg transition-all card-google`}
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs group-hover:scale-105 transition-transform">
                      {s.num}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        {language === 'bn' ? `ধাপ ${s.num}` : `Step ${s.num}`}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {language === 'bn' ? s.titleBn : s.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {language === 'bn' ? s.descBn : s.desc}
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-200/60 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 font-semibold">
                  <Check className="w-4 h-4" />
                  <span>{s.detailsBn}</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-blue-700 border border-slate-200 shadow-2xs">
                  {s.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-Way Rating & Guarantee Capsule */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
            <Star className="w-6 h-6 fill-blue-600 text-blue-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === 'bn' ? 'দ্বিপাক্ষিক রেটিং ও ট্রাস্ট ইকোসিস্টেম' : 'Two-Way Rating & Trust Ecosystem'}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              {language === 'bn'
                ? 'সেশন শেষে ক্লায়েন্ট ও কম্প্যানিয়ন উভয়েই রেটিং প্রদান করেন, যা প্ল্যাটফর্মের নিরাপত্তা ও পারস্পরিক সম্মান নিশ্চিত করে।'
                : 'Both parties rate and review each other after every session to uphold the highest community safety standards.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('companions')}
          className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shrink-0 flex items-center gap-2 transition-all apple-pill-btn shadow-xs"
        >
          <span>{language === 'bn' ? 'কম্প্যানিয়ন ব্রাউজ করুন' : 'Browse Companions'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

