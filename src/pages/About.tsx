import React from 'react';
import { 
  HeartHandshake, 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  Heart, 
  Users, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export const About: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const values = [
    {
      icon: Eye,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      title: language === 'bn' ? 'স্বচ্ছতা (Transparency)' : 'Transparency',
      desc: language === 'bn' 
        ? 'প্রতিটি বুকিং ও পেমেন্ট স্পষ্ট শর্তে হয়। কোনো লুকানো চার্জ বা অস্পষ্টতা নেই।'
        : 'Every booking, commission fee, and guideline is completely clear with zero hidden fees.'
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: language === 'bn' ? 'নিরাপত্তা (Safety)' : 'Safety First',
      desc: language === 'bn' 
        ? 'ভেরিফিকেশন ও পাবলিক-প্লেস পলিসি সর্বাগ্রে। শতভাগ ব্যাকগ্রাউন্ড ভেরিফায়েড কম্প্যানিয়ন।'
        : 'Mandatory government ID checks, verified public venues, and 24/7 SOS monitoring.'
    },
    {
      icon: Heart,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: language === 'bn' ? 'সম্মান (Respect)' : 'Mutual Respect',
      desc: language === 'bn' 
        ? 'সব ব্যবহারকারী ও কম্প্যানিয়নের প্রতি সম্মানজনক ও মার্জিত আচরণ বাধ্যতামূলক।'
        : 'Respectful, professional, and empathetic interaction is strictly required from everyone.'
    },
    {
      icon: Users,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: language === 'bn' ? 'অন্তর্ভুক্তি (Inclusivity)' : 'Inclusivity',
      desc: language === 'bn' 
        ? 'বয়স, লিঙ্গ, পেশা বা সংস্কৃতি নির্বিশেষে প্রাপ্তবয়স্ক সবার জন্য উন্মুক্ত ও নিরাপদ।'
        : 'Welcoming everyone who seeks safe company, active listening, or a confident plus-one.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <HeartHandshake className="w-4 h-4 text-indigo-400" />
          <span>{language === 'bn' ? 'আমাদের লক্ষ্য ও দর্শন' : 'Our Mission & Vision'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'bn' ? 'আমাদের মিশন — একাকীত্বমুক্ত সমাজ' : 'Our Mission — Banishing Loneliness'}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {language === 'bn'
            ? 'NeverAlone তৈরি হয়েছে একটাই লক্ষ্য নিয়ে — মানুষের জীবনে একাকীত্ব কমানো এবং সামাজিক অনুষ্ঠানে আত্মবিশ্বাসের সাথে অংশগ্রহণের সুযোগ তৈরি করা। আমরা বিশ্বাস করি, প্রত্যেকেরই মাঝে মাঝে একজন বিশ্বস্ত সঙ্গী দরকার — কোনো রেস্তোরাঁয়, কোনো পারিবারিক অনুষ্ঠানে, বা শুধু একটা ভালো কথোপকথনের জন্য।'
            : 'NeverAlone was created with one single focus: reducing social isolation and giving everyone the confidence to attend dinners, weddings, and events in good company.'}
        </p>
      </div>

      {/* WHAT WE ARE NOT (Platonic Warning Box from Document) */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-rose-950/40 border-2 border-rose-500/40 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-900/60 border border-rose-500/60 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              {language === 'bn' ? 'আমরা কী নই (গুরুত্বপূর্ণ তথ্য)' : 'What We Are NOT (Important Notice)'}
            </h2>
            <p className="text-xs text-rose-300 font-medium">
              {language === 'bn' ? 'প্ল্যাটফর্মের অখণ্ডতা ও আইনি নীতি' : 'Platform integrity and zero-tolerance policy'}
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {language === 'bn' ? (
            <>
              <strong>NeverAlone কোনো ডেটিং অ্যাপ বা এসকর্ট সার্ভিস নয়।</strong> আমরা কঠোরভাবে শুধুমাত্র <strong>প্ল্যাটোনিক (রোমান্টিক বা যৌনতাবিহীন)</strong> কম্প্যানিয়নশিপ সার্ভিস প্রদান করি। আমাদের প্ল্যাটফর্মে রোমান্টিক বা যৌন সম্পর্কিত যেকোনো অনুরোধ সম্পূর্ণভাবে নিষিদ্ধ এবং তা রিপোর্ট করলে সংশ্লিষ্ট অ্যাকাউন্ট স্থায়ীভাবে ব্যান করা হবে।
            </>
          ) : (
            <>
              <strong>NeverAlone is NOT a dating app or escort service.</strong> We strictly provide <strong>platonic (non-romantic, non-sexual)</strong> companionship. Any romantic, intimate, or inappropriate requests are strictly prohibited and result in permanent lifetime bans.
            </>
          )}
        </p>
      </div>

      {/* Our Values */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-white">
            {language === 'bn' ? 'আমাদের মৌলিক মূল্যবোধ' : 'Our Core Values'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'bn' ? 'যেসব মূলনীতির উপর ভিত্তি করে NeverAlone পরিচালিত হয়' : 'The pillars that guide every booking and interaction'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${v.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">{v.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Our Story (from Document) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>{language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          {language === 'bn' ? 'যে কারণে NeverAlone শুরু হয়েছিল' : 'Why NeverAlone Came to Life'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {language === 'bn'
            ? 'আধুনিক জীবনে ব্যস্ততা, শহরে একা থাকা, বা সামাজিক দুশ্চিন্তার কারণে অনেকেই গুরুত্বপূর্ণ মুহূর্তে একা পড়ে যান। বিয়েতে প্লাস-ওয়ান দরকার হলেও বন্ধুদের সময় থাকে না, নতুন রেস্তোরাঁয় একা বসে খেতে সংকোচ হয়, বা কোনো অচেনা শহরে ঘুরতে একজন স্থানীয় সহৃদয় বন্ধু প্রয়োজন হয়। NeverAlone সেই ফাঁকটা পূরণ করতে চায় — একটি নিরাপদ, ভেরিফাইড ও পেশাদার প্ল্যাটফর্মের মাধ্যমে।'
            : 'Urban hustle, living away from home, or social anxiety often leaves people navigating significant moments alone. NeverAlone bridges this gap by providing verified, cultured, and respectful companions who provide genuine presence without romantic complications.'}
        </p>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => onNavigate('companions')}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-colors"
          >
            <span>{language === 'bn' ? 'কম্প্যানিয়ন ব্রাউজ করুন' : 'Browse Companions'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
