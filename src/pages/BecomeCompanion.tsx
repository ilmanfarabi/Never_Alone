import React, { useState } from 'react';
import { 
  UserPlus, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp
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
      num: '০১',
      title: 'অনলাইন আবেদন ফর্ম পূরণ',
      titleEn: 'Fill Online Application',
      desc: 'আপনার বেসিক তথ্য, আগ্রহ, ভাষা ও পছন্দের লোকেশন যুক্ত করুন।'
    },
    {
      num: '০২',
      title: 'আইডেন্টিটি ভেরিফিকেশন (NID/Passport)',
      titleEn: 'Government ID Verification',
      desc: 'জাতীয় পরিচয়পত্র বা পাসপোর্ট আপলোড করে ফেস ম্যাচিং সম্পন্ন করুন।'
    },
    {
      num: '০৩',
      title: 'ব্যাকগ্রাউন্ড চেক ও ওরিয়েন্টেশন',
      titleEn: 'Background Check & Orientation',
      desc: 'ক্রিমিনাল রেকর্ড যাচাইকরণ এবং প্ল্যাটফর্ম আচরণবিধি ব্রিফিং।'
    },
    {
      num: '০৪',
      title: 'রেট নির্ধারণ ও প্রোফাইল লাইভ',
      titleEn: 'Set Rates & Go Live',
      desc: 'নিজের ঘণ্টাপ্রতি রেট ঠিক করে ভেরিফায়েড বুকিং নেওয়া শুরু করুন।'
    }
  ];

  const rules = [
    {
      title: 'পেশাদার ও সম্মানজনক আচরণ',
      desc: 'সবসময় সময়ানুবর্তিতা ও মার্জিত সামাজিক শিষ্টাচার বজায় রাখা আবশ্যক।'
    },
    {
      title: 'শুধুমাত্র পাবলিক স্থানে মিটিং',
      desc: 'কোনো ব্যক্তিগত বাসা বা অনুমোদনহীন স্থানে যাওয়ার অনুরোধ সরাসরি নিষিদ্ধ।'
    },
    {
      title: 'রোমান্টিক প্রস্তাব প্রত্যাখ্যানের অধিকার',
      desc: 'যেকোনো রোমান্টিক/অনুপযুক্ত আচরণ প্রত্যাখ্যান করার অধিকার আছে এবং তা সাথে সাথে রিপোর্ট করতে হবে।'
    },
    {
      title: 'প্ল্যাটফর্মের মাধ্যমে লেনদেন',
      desc: 'সকল বুকিং ও পেমেন্ট প্ল্যাটফর্মের মাধ্যমেই নিষ্পত্তি হতে হবে।'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
          <UserPlus className="w-4 h-4 text-emerald-400" />
          <span>{language === 'bn' ? 'কম্প্যানিয়ন রিক্রুটমেন্ট' : 'Companion Opportunities'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'bn' ? 'NeverAlone-এ কম্প্যানিয়ন হিসেবে যোগ দিয়ে আয় করুন' : 'Join NeverAlone as a Verified Companion'}
        </h1>
        <p className="text-base text-slate-300">
          {language === 'bn'
            ? 'আপনি কি বন্ধুত্বপূর্ণ, ভালো শ্রোতা এবং মানুষের সাথে সামাজিক অনুষ্ঠানে সময় কাটাতে পছন্দ করেন? নিরাপদ পরিবেশে নিজের সুবিধাজনক সময়ে স্বাধীনভাবে আয় করুন।'
            : 'Are you friendly, an active listener, and socially confident? Earn respectfully on your own schedule in a verified, 100% platonic platform.'}
        </p>

        <div className="pt-2">
          <button
            onClick={onOpenApply}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 mx-auto transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'bn' ? 'এখনই আবেদন করুন' : 'Apply to Become a Companion'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Income Calculator */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-indigo-500/30 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              {language === 'bn' ? 'সম্ভাব্য মাসিক আয় ক্যালকুলেটর' : 'Earnings Calculator'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'bn' ? 'আপনার সময় ও ঘণ্টাপ্রতি রেট অনুযায়ী সম্ভাব্য আয় হিসাব করুন' : 'Calculate projected income based on your available hours and rate'}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/30 text-xs font-semibold">
            {language === 'bn' ? '৮৫% সরাসরি পে-আউট' : '85% Direct Companion Payout'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {/* Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">ঘণ্টাপ্রতি রেট:</span>
                <span className="text-indigo-400 font-bold">৳ {hourlyRate} / ঘণ্টা</span>
              </div>
              <input
                type="range"
                min="600"
                max="2500"
                step="50"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>৳ ৬০০</span>
                <span>৳ ১,৫০০</span>
                <span>৳ ২,৫০০</span>
              </div>
            </div>

            {/* Hours Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">সাপ্তাহিক সময়:</span>
                <span className="text-emerald-400 font-bold">{hoursPerWeek} ঘণ্টা / সপ্তাহ</span>
              </div>
              <input
                type="range"
                min="4"
                max="35"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>৪ ঘণ্টা (পার্ট-টাইম)</span>
                <span>১৫ ঘণ্টা</span>
                <span>৩৫ ঘণ্টা (ফুল-টাইম)</span>
              </div>
            </div>
          </div>

          {/* Earnings Projection Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-950 border border-indigo-500/40 text-center space-y-3">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
              সম্ভাব্য নিট মাসিক আয় (১৫% প্ল্যাটফর্ম ফি বাদে)
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 py-1">
              ৳ {Math.round(netEarnings).toLocaleString()}
            </div>
            <div className="text-xs text-slate-300">
              মাসিক মোট বুকিং: ৳ {monthlyGross.toLocaleString()} • সরাসরি bKash / Bank ট্রান্সফার
            </div>
            <button
              onClick={onOpenApply}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-colors"
            >
              এই রেটে আবেদন করুন
            </button>
          </div>
        </div>
      </div>

      {/* 4 Process Steps */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-white">
            {language === 'bn' ? 'যোগদানের ৪টি সহজ ধাপ' : '4-Step Onboarding Process'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'bn' ? 'অনুমোদনের পর আপনার প্রোফাইল সাথে সাথে লাইভ হবে' : 'Verification ensures high platform prestige and user trust'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs">
                {step.num}
              </div>
              <h3 className="text-sm font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rules & Code of Conduct */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-rose-400" />
          <h2 className="text-xl font-bold text-white">
            {language === 'bn' ? 'কম্প্যানিয়নদের জন্য বাধ্যতামূলক আচরণবিধি' : 'Companion Code of Conduct'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rules.map((r, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{r.title}</span>
              </div>
              <p className="text-xs text-slate-400 pl-6 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
