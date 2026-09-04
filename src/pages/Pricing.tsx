import React from 'react';
import { 
  Check, 
  Sparkles, 
  CreditCard, 
  Lock
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export const Pricing: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const tiers = [
    {
      name: '২ ঘণ্টা — বেসিক সেশন',
      nameEn: '2-Hour Basic Session',
      rate: '৳ ১,৫০০ – ৳ ২,৫০০',
      rateEn: '৳ 1,500 – ৳ 2,500',
      tag: 'ক্যাফে বা হালকা আড্ডা',
      tagEn: 'Cafe & Light Hangout',
      popular: false,
      features: [
        'রেস্তোরাঁ ডিনার বা কফি শপ মিটিং',
        'ভাষা চর্চা ও বন্ধুত্বপূর্ণ আলোচনা',
        '১০০% ভেরিফায়েড পাবলিক প্লেস মিটিং',
        'ইন-অ্যাপ সেফটি চেক-ইন ও SOS সাপোর্ট',
        'bKash / Nagad সুরক্ষিত পেমেন্ট'
      ]
    },
    {
      name: '৪ ঘণ্টা — স্ট্যান্ডার্ড সেশন',
      nameEn: '4-Hour Standard Session',
      rate: '৳ ২,৮০০ – ৳ ৪,৫০০',
      rateEn: '৳ 2,800 – ৳ 4,500',
      tag: 'সবচেয়ে জনপ্রিয়',
      tagEn: 'Most Popular',
      popular: true,
      features: [
        'ওয়েডিং / রিসেপশন প্লাস-ওয়ান উপস্থিতি',
        'মুভি শো ও ডিনার কম্বো সেশন',
        'কর্পোরেট ইভেন্ট ও সেমিনারে মার্জিত সঙ্গ',
        'লাইভ লোকেশন ও সেফটি ট্র্যাকিং',
        'ফুল এসক্রো পেমেন্ট সুরক্ষা'
      ]
    },
    {
      name: 'ফুল-ডে — ইভেন্ট প্যাকেজ',
      nameEn: 'Full-Day Event Package',
      rate: '৳ ৫,০০০ – ৳ ৮,০০০',
      rateEn: '৳ 5,000 – ৳ 8,000',
      tag: 'সারাদিনের অনুষ্ঠান ও ট্যুর',
      tagEn: 'All-Day Celebrations',
      popular: false,
      features: [
        'সারাদিনের ডে-ট্রিপ ও ঐতিহ্যবাহী সাইট ভ্রমণ',
        'পারিবারিক বিয়ে ও সামাজিক গালা ইভেন্ট',
        'ফটোগ্রাফি ও লোকাল সিটি গাইডেন্স',
        '২৪/৭ ডেডিকেটেড সাপোর্ট লাইন',
        'ফ্লেক্সিবল রিশিডিউলিং পলিসি'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{language === 'bn' ? 'স্বচ্ছ মূল্য তালিকা' : 'Transparent Pricing'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'bn' ? 'সহজ ও স্পষ্ট প্যাকেজ মূল্য' : 'Simple, Transparent Package Rates'}
        </h1>
        <p className="text-base text-slate-300">
          {language === 'bn'
            ? 'কোনো লুকানো খরচ নেই। প্রতিটি বুকিং এসক্রো সুরক্ষায় থাকে এবং সেশন সন্তোষজনকভাবে সম্পন্ন হওয়ার পরই পেমেন্ট ছাড় করা হয়।'
            : 'No hidden fees. Every session is protected in escrow and funds are only disbursed after satisfactory completion.'}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((t, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 relative transition-all ${
              t.popular 
                ? 'bg-gradient-to-b from-indigo-950/90 to-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/80 transform md:-translate-y-2'
                : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {t.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                {t.tag}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-indigo-400">{t.tag}</span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {language === 'bn' ? t.name : t.nameEn}
                </h3>
              </div>

              <div className="py-2 border-y border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  {language === 'bn' ? t.rate : t.rateEn}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {language === 'bn' ? '*কম্প্যানিয়নভেদে রেট কিছুটা পরিবর্তিত হতে পারে' : '*Actual rates vary by companion experience'}
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs text-slate-300">
                {t.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onNavigate('companions')}
              className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md ${
                t.popular
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {language === 'bn' ? 'কম্প্যানিয়ন নির্বাচন করুন' : 'Choose Companion'}
            </button>
          </div>
        ))}
      </div>

      {/* Commission & Payment Methods Section (from document) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Commission Breakdown */}
        <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-sm">
            <Lock className="w-5 h-5" />
            <span>{language === 'bn' ? 'প্ল্যাটফর্ম কমিশন ও এসক্রো মডেল' : 'Commission & Escrow Protection'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'bn'
              ? 'প্রতিটি সফল বুকিং থেকে NeverAlone সাধারণত ১৫%–২৫% কমিশন গ্রহণ করে যা প্ল্যাটফর্মের নিরাপত্তা, সরকারি আইডি ভেরিফিকেশন ও সার্বক্ষণিক SOS সাপোর্ট পরিচালনা করতে ব্যবহৃত হয়। বাকি অর্থ সরাসরি কম্প্যানিয়নের কাছে পৌঁছায়।'
              : 'NeverAlone charges a transparent 15%-25% commission fee to maintain ID verification infrastructure, background vetting, and 24/7 security dispatch.'}
          </p>
        </div>

        {/* Accepted Payment Methods */}
        <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
            <CreditCard className="w-5 h-5" />
            <span>{language === 'bn' ? 'অনুমোদিত পেমেন্ট মেথডসমূহ' : 'Supported Payment Methods'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'bn'
              ? 'মোবাইল ব্যাংকিং (bKash, Nagad), ভিসা / মাস্টারকার্ড ও ইন-অ্যাপ ওয়ালেটের মাধ্যমে সুরক্ষিত পেমেন্ট। মিটিংয়ের সময় কোনো নগদ লেনদেনের প্রয়োজন নেই।'
              : 'Pay securely using bKash, Nagad, Visa, Mastercard, or In-App Wallet. Zero cash exchange required during the session.'}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-3 py-1 bg-pink-950/60 text-pink-300 border border-pink-700/40 rounded-lg text-xs font-bold">bKash</span>
            <span className="px-3 py-1 bg-orange-950/60 text-orange-300 border border-orange-700/40 rounded-lg text-xs font-bold">Nagad</span>
            <span className="px-3 py-1 bg-blue-950/60 text-blue-300 border border-blue-700/40 rounded-lg text-xs font-bold">Visa / Mastercard</span>
            <span className="px-3 py-1 bg-emerald-950/60 text-emerald-300 border border-emerald-700/40 rounded-lg text-xs font-bold">NeverAlone Wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
};
