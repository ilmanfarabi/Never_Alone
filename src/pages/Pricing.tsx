import React from 'react';
import { 
  Check, 
  Sparkles, 
  CreditCard, 
  Lock,
  ArrowRight
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
      ],
      featuresEn: [
        'Restaurant dinner or coffee shop meeting',
        'Language practice & engaging conversation',
        '100% verified public venue meeting',
        'In-app safety check-in & SOS dispatch',
        'bKash / Nagad secure escrow payment'
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
      ],
      featuresEn: [
        'Wedding / reception plus-one companion',
        'Movie show & dinner combo session',
        'Polite accompaniment for corporate events',
        'Live location status & safety tracking',
        'Full escrow payment protection'
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
      ],
      featuresEn: [
        'Full-day trip & heritage site exploration',
        'Family weddings & social gala events',
        'Photography assistance & local city guide',
        '24/7 dedicated support team line',
        'Flexible rescheduling guarantee'
      ]
    }
  ];

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'bn' ? 'স্বচ্ছ মূল্য তালিকা' : 'Transparent Pricing'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {language === 'bn' ? (
            <>
              সহজ ও স্পষ্ট <br />
              <span className="text-blue-600">প্যাকেজ মূল্যতালিকা</span>
            </>
          ) : (
            <>
              Simple, Transparent <br />
              <span className="text-blue-600">Tiered Pricing</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'bn'
            ? 'কোনো লুকানো খরচ নেই। প্রতিটি বুকিং এসক্রো সুরক্ষায় থাকে এবং সেশন শেষে পেমেন্ট সম্পন্ন হয়।'
            : 'No hidden fees. Every session is protected in escrow and released only after completion.'}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
        {tiers.map((t, idx) => {
          const tierBgs = [
            'card-bg-lavender', // rgb(243, 229, 245)
            'card-bg-peach',    // rgb(255, 244, 230) - highlighted popular card
            'card-bg-slate',    // rgb(236, 239, 241)
            'card-bg-rose'      // rgb(255, 235, 238)
          ];
          const cardBg = tierBgs[idx % tierBgs.length];

          return (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-5 relative transition-all duration-300 ${cardBg} card-google ${
                t.popular 
                  ? 'border-2 border-blue-600 shadow-lg ring-2 ring-blue-50/80'
                  : 'border shadow-xs hover:shadow-lg'
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                  {language === 'bn' ? t.tag : t.tagEn}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {language === 'bn' ? t.tag : t.tagEn}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    {language === 'bn' ? t.name : t.nameEn}
                  </h3>
                </div>

                <div className="py-3 border-y border-slate-200/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                    {language === 'bn' ? t.rate : t.rateEn}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-normal">
                    {language === 'bn' ? '*কম্প্যানিয়নভেদে রেট কিছুটা পরিবর্তিত হতে পারে' : '*Actual rates vary by companion experience'}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {(language === 'bn' ? t.features : t.featuresEn).map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 font-normal leading-relaxed">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('companions')}
                className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 apple-pill-btn mt-2 ${
                  t.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs'
                }`}
              >
                <span>{language === 'bn' ? 'কম্প্যানিয়ন নির্বাচন করুন' : 'Choose Companion'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Commission & Payment Methods Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Commission Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl card-bg-lavender space-y-3 card-google shadow-xs">
          <div className="flex items-center gap-2.5 text-blue-600 font-bold text-base">
            <Lock className="w-5 h-5" />
            <span>{language === 'bn' ? 'প্ল্যাটফর্ম কমিশন ও এসক্রো মডেল' : 'Commission & Escrow Protection'}</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-normal">
            {language === 'bn'
              ? 'নিরাপত্তা, আইডি ভেরিফিকেশন ও সাপোর্ট পরিচালনায় ১৫%–২৫% কমিশন প্রযোজ্য। বাকি অংশ সরাসরি কম্প্যানিয়ন পান।'
              : 'A transparent 15%-25% commission maintains ID vetting and 24/7 security dispatch.'}
          </p>
        </div>

        {/* Accepted Payment Methods */}
        <div className="p-6 sm:p-8 rounded-3xl card-bg-peach space-y-3 card-google shadow-xs">
          <div className="flex items-center gap-2.5 text-blue-600 font-bold text-base">
            <CreditCard className="w-5 h-5" />
            <span>{language === 'bn' ? 'অনুমোদিত পেমেন্ট মেথডসমূহ' : 'Supported Payment Methods'}</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-normal">
            {language === 'bn'
              ? 'বিকাশ, নগদ, কার্ড ও ইন-অ্যাপ ওয়ালেটে ক্যাশলেস ও সুরক্ষিত পেমেন্ট।'
              : 'Pay securely using bKash, Nagad, Visa, Mastercard, or In-App Wallet.'}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 bg-white text-slate-800 border border-slate-200 rounded-full text-xs font-semibold shadow-xs">bKash</span>
            <span className="px-3 py-1 bg-white text-slate-800 border border-slate-200 rounded-full text-xs font-semibold shadow-xs">Nagad</span>
            <span className="px-3 py-1 bg-white text-slate-800 border border-slate-200 rounded-full text-xs font-semibold shadow-xs">Visa / Mastercard</span>
            <span className="px-3 py-1 bg-white text-slate-800 border border-slate-200 rounded-full text-xs font-semibold shadow-xs">NeverAlone Wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
};
