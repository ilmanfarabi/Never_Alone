import React from 'react';
import { 
  UserCheck, 
  Search, 
  CalendarCheck, 
  ShieldCheck, 
  Star, 
  Sparkles
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export const HowItWorks: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const steps = [
    {
      num: '০১',
      title: 'Sign Up & Verify',
      titleBn: 'ধাপ ১ — সাইন আপ ও ভেরিফিকেশন',
      desc: 'Create your account and verify your identity with government NID / Passport. Verification protects the safety of both clients and companions.',
      descBn: 'আপনার অ্যাকাউন্ট তৈরি করুন এবং সরকারি পরিচয়পত্র (NID/Passport) দিয়ে আইডেন্টিটি ভেরিফাই করুন। এটি সবার নিরাপত্তার জন্য বাধ্যতামূলক।',
      icon: UserCheck,
      detailsBn: 'ফেস ম্যাচিং ও ফোন নম্বর ভেরিফিকেশন মাত্র ২ মিনিটে সম্পন্ন হয়।'
    },
    {
      num: '০২',
      title: 'Browse Companions',
      titleBn: 'ধাপ ২ — কম্প্যানিয়ন প্রোফাইল ব্রাউজ',
      desc: 'Filter companions by spoken languages, city/area, occasions, ratings, and hourly rates. Inspect detailed bios and verified badges.',
      descBn: 'ভাষা, আগ্রহ, লোকেশন ও উপলভ্যতা অনুযায়ী কম্প্যানিয়ন প্রোফাইল ব্রাউজ করুন। প্রতিটি প্রোফাইলে রিভিউ, রেটিং ও বায়ো দেখতে পাবেন।',
      icon: Search,
      detailsBn: 'রিয়েল ইউজার রিভিউ ও ব্যাকগ্রাউন্ড চেকের স্ট্যাটাস উন্মুক্ত।'
    },
    {
      num: '০৩',
      title: 'Book a Session',
      titleBn: 'ধাপ ৩ — সেশন বুক ও কনফার্মেশন',
      desc: 'Specify your public venue, date, time, and occasion. The companion accepts the booking request and you receive a secure Safety Check-in PIN.',
      descBn: 'সময়, স্থান ও উপলক্ষ উল্লেখ করে বুকিং রিকোয়েস্ট পাঠান। কম্প্যানিয়ন কনফার্ম করলেই বুকিং ফাইনাল হয়ে যাবে।',
      icon: CalendarCheck,
      detailsBn: 'বুকিংয়ের সাথে সাথেই ইন-অ্যাপ সেফটি চেক-ইন পিন জেনারেট হয়।'
    },
    {
      num: '০৪',
      title: 'Meet & Pay Safely',
      titleBn: 'ধাপ ৪ — পাবলিক স্থানে সাক্ষাৎ ও নিরাপদ লেনদেন',
      desc: 'Meet exclusively in verified public places (cafes, restaurants, event halls). Payments are held safely in platform escrow with bKash/Nagad.',
      descBn: 'সবসময় একটি পাবলিক স্থানে দেখা করুন। পেমেন্ট প্ল্যাটফর্মের মাধ্যমেই সুরক্ষিতভাবে সম্পন্ন হয় — নগদ লেনদেন নিরুৎসাহিত করা হয়।',
      icon: ShieldCheck,
      detailsBn: 'সেশন শেষে উভয়পক্ষ রেটিং ও রিভিউ দিতে পারেন।'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{language === 'bn' ? 'কীভাবে কাজ করে' : 'How It Works'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'bn' ? 'সহজ ৪টি ধাপে আপনার পছন্দের সঙ্গী বুক করুন' : 'Book in 4 Simple & Transparent Steps'}
        </h1>
        <p className="text-base text-slate-300">
          {language === 'bn'
            ? 'NeverAlone একটি নিরাপদ, পেশাদার ও স্বচ্ছ প্রক্রিয়া নিশ্চিত করে যাতে আপনি যেকোনো মুহূর্তে নিশ্চিন্তে একজন বিশ্বস্ত প্লাস-ওয়ান বা আড্ডার সঙ্গী খুঁজে নিতে পারেন।'
            : 'NeverAlone ensures a safe, professional, and transparent workflow for finding trusted companions.'}
        </p>
      </div>

      {/* 4 Steps Detailed Vertical Timeline */}
      <div className="space-y-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:border-indigo-500/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-indigo-600/30">
                {s.num}
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">
                    {language === 'bn' ? s.titleBn : s.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === 'bn' ? s.descBn : s.desc}
                </p>
                <div className="text-[11px] text-emerald-400 font-medium">
                  ✓ {s.detailsBn}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rating & Review Assurance Box from Document */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              {language === 'bn' ? 'দ্বিপাক্ষিক রেটিং ও রিভিউ সিস্টেম' : 'Two-Way Rating & Accountability'}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              {language === 'bn'
                ? 'প্রতিটি সেশনের পর উভয়পক্ষ একে অপরকে রেটিং ও রিভিউ দিতে পারেন, যা প্ল্যাটফর্মের বিশ্বাসযোগ্যতা ও সম্মানজনক পরিবেশ বজায় রাখে।'
                : 'Both client and companion rate each other after every session to maintain high community trust and respect.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('companions')}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition-colors shadow-lg shadow-indigo-600/30"
        >
          {language === 'bn' ? 'কম্প্যানিয়ন ব্রাউজ করুন' : 'Browse Companions'}
        </button>
      </div>
    </div>
  );
};
