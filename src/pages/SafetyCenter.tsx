import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  AlertTriangle, 
  Flag, 
  Eye, 
  CheckCircle2
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

interface SafetyCenterProps {
  onOpenSOS: () => void;
  onOpenReport: () => void;
}

export const SafetyCenter: React.FC<SafetyCenterProps> = ({ onOpenSOS, onOpenReport }) => {
  const { language } = useLanguage();

  const verificationFeatures = [
    {
      title: 'জাতীয় পরিচয়পত্র যাচাই (NID/Passport)',
      titleEn: 'Government ID Verification',
      desc: 'প্রতিটি ব্যবহারকারী ও কম্প্যানিয়নকে অফিসিয়াল সরকারি পরিচয়পত্র দিয়ে সাইন আপ করতে হয়।'
    },
    {
      title: 'ফেস ভেরিফিকেশন ও বায়োমেট্রিক ম্যাচ',
      titleEn: 'Biometric Selfie Match',
      desc: 'লাইভ সেলফি ও ডকুমেন্টের ছবি মিলিয়ে ভুয়া প্রোফাইল সম্পূর্ণরূপে প্রতিরোধ করা হয়।'
    },
    {
      title: 'মোবাইল নম্বর ও ইমেইল ভ্যালিডেশন',
      titleEn: 'Phone & Email OTP Verification',
      desc: 'দ্বিমুখী ওটিপি যাচাইকরণের মাধ্যমে যাচাইকৃত পরিচয় নিশ্চিত করা হয়।'
    },
    {
      title: 'ক্রিমিনাল ব্যাকগ্রাউন্ড চেক',
      titleEn: 'Criminal Background Clearance',
      desc: 'নিরাপত্তা নিশ্চিত করতে ক্রিমিনাল রেকর্ড ও ট্র্যাকিং হিস্ট্রি যাচাই করা হয়।'
    }
  ];

  const safetyProtocols = [
    {
      icon: MapPin,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: '১০০% পাবলিক প্লেস পলিসি',
      desc: 'সব মিটিং শুধুমাত্র পাবলিক ক্যাফে, রেস্তোরাঁ, বিয়ে বাড়ি বা জনাকীর্ণ ভেন্যুতে হতে হবে। ব্যক্তিগত বাসায় যাওয়া কঠোরভাবে নিষিদ্ধ।'
    },
    {
      icon: Clock,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      title: 'ইন-অ্যাপ চেক-ইন সিস্টেম',
      desc: 'সেশন শুরুর সময় ইউনিক সেফটি পিন (PIN) আদান-প্রদান এবং সমাপ্তির সময় অ্যাপে স্বয়ংক্রিয়ভাবে টাইমস্ট্যাম্প লগ সংরক্ষিত থাকে।'
    },
    {
      icon: ShieldAlert,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: '১-ট্যাপে SOS ইমার্জেন্সি বাটন',
      desc: 'যেকোনো জরুরি প্রয়োজনে এক ট্যাপে আমাদের ২৪/৭ ট্রাস্ট অ্যান্ড সেফটি টিম ও স্থানীয় সহায়তায় অ্যালার্ট পাঠানো যায়।'
    },
    {
      icon: Eye,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'লাইভ লোকেশন ও সেশন ট্র্যাকিং',
      desc: 'সেশন চলাকালীন সুরক্ষা নিশ্চিত করতে ব্যবহারকারী তার পরিবারের বিশ্বস্ত কন্টাক্টের সাথে লাইভ স্ট্যাটাস শেয়ার করতে পারেন।'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{language === 'bn' ? 'ট্রাস্ট অ্যান্ড সেফটি' : 'Trust & Safety Protocols'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'bn' ? 'আপনার নিরাপত্তাই আমাদের সর্বোচ্চ অগ্রাধিকার' : 'Your Safety Is Our Uncompromising Priority'}
        </h1>
        <p className="text-base text-slate-300">
          {language === 'bn'
            ? 'NeverAlone তৈরি করা হয়েছে এমন একটি প্ল্যাটফর্ম হিসেবে যেখানে প্রত্যেকে সম্পূর্ণ নিরাপদ, স্বাচ্ছন্দ্যময় ও সুরক্ষিত পরিবেশে সঙ্গ পেতে পারেন।'
            : 'Multi-layer identity vetting, verified public venues, real-time telemetry, and zero tolerance.'}
        </p>
      </div>

      {/* Emergency Quick Action Center */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-indigo-950/80 border-2 border-rose-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            {language === 'bn' ? 'জরুরি সুরক্ষা ও অভিযোগ সহায়তা' : 'Immediate Safety Assistance'}
          </h2>
          <p className="text-xs text-slate-300 max-w-lg">
            {language === 'bn'
              ? 'যেকোনো সন্দেহজনক আচরণ, রোমান্টিক প্রস্তাব বা অস্বস্তিকর পরিস্থিতিতে অবিলম্বে আমাদের হটলাইন অথবা জরুরি SOS টুল ব্যবহার করুন।'
              : 'Our 24/7 Safety Command Center is active at all times with real-time GPS & phone dispatch.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={onOpenSOS}
            className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/40 flex items-center justify-center gap-2 transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{language === 'bn' ? '🚨 SOS এমার্জেন্সি' : '🚨 Emergency SOS'}</span>
          </button>

          <button
            onClick={onOpenReport}
            className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Flag className="w-4 h-4 text-rose-400" />
            <span>{language === 'bn' ? 'অভিযোগ জানান' : 'Report Incident'}</span>
          </button>
        </div>
      </div>

      {/* 4 Multi-Layer Verification Features */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-white">
            {language === 'bn' ? 'মাল্টি-লেভেল আইডেন্টিটি ভেরিফিকেশন' : 'Rigorous Identity Verification'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'bn' ? 'প্ল্যাটফর্মের প্রতিটি সদস্য শতভাগ যাচাইকৃত' : 'Every participant is identity-checked before any booking'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {verificationFeatures.map((f, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{f.title}</span>
              </div>
              <p className="text-xs text-slate-400 pl-6 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Core Safety Protocols */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-white">
            {language === 'bn' ? 'আমাদের ৪টি প্রধান নিরাপত্তা নীতি' : 'Core Safety Rules & Policy'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'bn' ? 'ক্লায়েন্ট ও কম্প্যানিয়ন উভয়ের সুরক্ষার্থে প্রণীত' : 'Designed to ensure comfortable and risk-free companionship'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {safetyProtocols.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${p.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zero Tolerance Policy Box from Document */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-rose-400" />
          <h2 className="text-xl font-bold text-white">
            {language === 'bn' ? 'জিরো-টলারেন্স পলিসি (Zero Tolerance)' : 'Zero-Tolerance Enforcement Policy'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {language === 'bn'
            ? 'হয়রানি, রোমান্টিক/যৌন প্রস্তাব, প্রতারণা বা নিরাপত্তা নীতি লঙ্ঘনের ক্ষেত্রে সংশ্লিষ্ট অ্যাকাউন্ট তাৎক্ষণিকভাবে ও স্থায়ীভাবে বাতিল করা হবে। আমাদের ট্রাস্ট অ্যান্ড সেফটি টিম ২৪ ঘণ্টার মধ্যে প্রতিটি রিপোর্ট পর্যালোচনা করে আইনি পদক্ষেপ গ্রহণ করে।'
            : 'NeverAlone exercises strict zero tolerance for harassment, romantic advances, fraud, or private rendezvous attempts. Accounts are permanently terminated and reported to authorities if laws are breached.'}
        </p>
      </div>
    </div>
  );
};
