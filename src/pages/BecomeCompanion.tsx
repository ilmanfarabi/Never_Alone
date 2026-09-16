import React, { useState } from 'react';
import { 
  UserPlus, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export const BecomeCompanion: React.FC<{ onOpenApply: () => void }> = ({ onOpenApply }) => {
  const { language } = useLanguage();
  const [hourlyRate, setHourlyRate] = useState(1200);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);

  const monthlyGross = hourlyRate * hoursPerWeek * 4;
  const netEarnings = monthlyGross * 0.85; // 85% payout after 15% platform commission

  const processSteps = [
    {
      num: '01',
      title: 'অনলাইন আবেদন',
      titleEn: 'Online Application',
      desc: 'বেসিক তথ্য, আগ্রহ, ভাষা ও লোকেশন যুক্ত করুন।',
      descEn: 'Provide basic details, interests, spoken languages & location.',
      badge: 'Step 1'
    },
    {
      num: '02',
      title: 'আইডি ভেরিফিকেশন',
      titleEn: 'ID Verification',
      desc: 'জাতীয় পরিচয়পত্র বা পাসপোর্ট দিয়ে ফেস ম্যাচিং।',
      descEn: 'Biometric face matching with government NID or Passport.',
      badge: 'Step 2'
    },
    {
      num: '03',
      title: 'ওরিয়েন্টেশন ও ব্রিফিং',
      titleEn: 'Orientation & Rules',
      desc: 'প্ল্যাটফর্ম আচরণবিধি ও সুরক্ষা সংক্রান্ত গাইডলাইন।',
      descEn: 'Briefing on platonic code of conduct and safety guidelines.',
      badge: 'Step 3'
    },
    {
      num: '04',
      title: 'রেট নির্ধারণ ও প্রোফাইল লাইভ',
      titleEn: 'Set Rates & Go Live',
      desc: 'ঘণ্টাপ্রতি রেট ঠিক করে বুকিং নেওয়া শুরু করুন।',
      descEn: 'Set your hourly rate and start accepting verified bookings.',
      badge: 'Step 4'
    }
  ];

  const rules = [
    {
      title: 'পেশাদার ও মার্জিত শিষ্টাচার',
      titleEn: 'Polite & Professional Etiquette',
      desc: 'সময়ানুবর্তিতা ও মার্জিত আচরণ বজায় রাখা বাধ্যতামূলক।',
      descEn: 'Punctuality, politeness, and professional demeanor are mandatory.'
    },
    {
      title: 'শুধুমাত্র পাবলিক স্থানে মিটিং',
      titleEn: 'Public Places Only',
      desc: 'ব্যক্তিগত বাসা বা অনুমোদনহীন স্থানে যাওয়া কঠোরভাবে নিষিদ্ধ।',
      descEn: 'Private homes or unverified locations are strictly prohibited.'
    },
    {
      title: 'প্রস্তাব প্রত্যাখ্যানের অধিকার',
      titleEn: 'Right to Refuse & Report',
      desc: 'যেকোনো রোমান্টিক বা অনুপযুক্ত আচরণ সাথে সাথে প্রত্যাখ্যান ও রিপোর্ট করার অধিকার।',
      descEn: 'Immediate right to refuse and report any romantic or improper request.'
    },
    {
      title: 'প্ল্যাটফর্মের মাধ্যমে লেনদেন',
      titleEn: 'In-Platform Transactions Only',
      desc: 'সকল বুকিং ও পেমেন্ট প্ল্যাটফর্মের মাধ্যমেই সম্পন্ন হতে হবে।',
      descEn: 'All bookings and payments must strictly process via the platform.'
    }
  ];

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <UserPlus className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'bn' ? 'কম্প্যানিয়ন সুযোগ' : 'Companion Opportunities'}</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {language === 'bn' ? (
            <>
              সম্মানজনক পরিবেশে <br />
              <span className="text-blue-600">স্বাধীনভাবে আয় করুন</span>
            </>
          ) : (
            <>
              Earn on Your Schedule. <br />
              <span className="text-blue-600">Safe, Respectful & Verified.</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'bn'
            ? 'নিরাপদ পরিবেশে নিজের সুবিধাজনক সময়ে স্বাধীনভাবে আয় করুন।'
            : 'Earn respectfully on your own schedule in a verified, 100% platonic platform.'}
        </p>

        <div className="pt-2">
          <button
            onClick={onOpenApply}
            className="apple-pill-btn text-sm font-semibold inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'bn' ? 'এখনই আবেদন করুন' : 'Apply to Become a Companion'}</span>
          </button>
        </div>
      </div>

      {/* Income Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <span>{language === 'bn' ? 'সম্ভাব্য মাসিক আয় ক্যালকুলেটর' : 'Earnings Calculator'}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1 font-normal">
              {language === 'bn' ? 'আপনার সময় ও ঘণ্টাপ্রতি রেট অনুযায়ী সম্ভাব্য আয় হিসাব করুন' : 'Calculate projected income based on your available hours and rate'}
            </p>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            {language === 'bn' ? '৮৫% সরাসরি পে-আউট' : '85% Direct Companion Payout'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {/* Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-slate-700">
                <span>{language === 'bn' ? 'ঘণ্টাপ্রতি রেট:' : 'Hourly Rate:'}</span>
                <span className="text-blue-600 font-bold">৳ {hourlyRate} {language === 'bn' ? '/ ঘণ্টা' : '/ hr'}</span>
              </div>
              <input
                type="range"
                min="600"
                max="2500"
                step="50"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>{language === 'bn' ? '৳ ৬০০' : '৳ 600'}</span>
                <span>{language === 'bn' ? '৳ ১,৫০০' : '৳ 1,500'}</span>
                <span>{language === 'bn' ? '৳ ২,৫০০' : '৳ 2,500'}</span>
              </div>
            </div>

            {/* Hours Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-slate-700">
                <span>{language === 'bn' ? 'সাপ্তাহিক সময়:' : 'Weekly Commitment:'}</span>
                <span className="text-blue-600 font-bold">{hoursPerWeek} {language === 'bn' ? 'ঘণ্টা / সপ্তাহ' : 'hrs / week'}</span>
              </div>
              <input
                type="range"
                min="4"
                max="35"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>{language === 'bn' ? '৪ ঘণ্টা (পার্ট-টাইম)' : '4 hrs (Part-Time)'}</span>
                <span>{language === 'bn' ? '১৫ ঘণ্টা' : '15 hrs'}</span>
                <span>{language === 'bn' ? '৩৫ ঘণ্টা (ফুল-টাইম)' : '35 hrs (Full-Time)'}</span>
              </div>
            </div>
          </div>

          {/* Earnings Projection Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              {language === 'bn' ? 'সম্ভাব্য নিট মাসিক আয় (১৫% প্ল্যাটফর্ম ফি বাদে)' : 'Projected Net Monthly Income (After 15% Platform Fee)'}
            </div>
            <div className="text-3xl font-extrabold text-blue-600 py-1 tracking-tight font-mono">
              ৳ {Math.round(netEarnings).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 font-normal">
              {language === 'bn'
                ? `মাসিক মোট বুকিং: ৳ ${monthlyGross.toLocaleString()} • সরাসরি bKash / Bank ট্রান্সফার`
                : `Gross Booking: ৳ ${monthlyGross.toLocaleString()} • Direct bKash / Bank Payout`}
            </div>
            <button
              onClick={onOpenApply}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 apple-pill-btn"
            >
              <span>{language === 'bn' ? 'এই রেটে আবেদন করুন' : 'Apply With This Rate'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Process Steps */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {language === 'bn' ? 'যোগদানের ৪টি সহজ ধাপ' : '4-Step Onboarding Process'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {language === 'bn' ? 'অনুমোদনের পর আপনার প্রোফাইল সাথে সাথে লাইভ হবে' : 'Verification ensures high platform prestige and user trust'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <div key={idx} className="bg-white border border-slate-200 hover:border-blue-300 p-6 rounded-3xl space-y-3 flex flex-col justify-between group shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm">
                {step.num}
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {language === 'bn' ? step.title : step.titleEn}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {language === 'bn' ? step.desc : step.descEn}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-xs uppercase font-semibold text-blue-600">
                {step.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules & Code of Conduct */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {language === 'bn' ? 'কম্প্যানিয়নদের জন্য বাধ্যতামূলক আচরণবিধি' : 'Companion Code of Conduct'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rules.map((r, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{language === 'bn' ? r.title : r.titleEn}</span>
              </div>
              <p className="text-sm text-slate-600 pl-6 leading-relaxed font-normal">
                {language === 'bn' ? r.desc : r.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
