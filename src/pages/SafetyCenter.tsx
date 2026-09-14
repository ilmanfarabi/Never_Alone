import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  AlertTriangle, 
  Flag, 
  Eye, 
  Lock,
  Key
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
      title: 'জাতীয় পরিচয়পত্র যাচাই (NID / Passport)',
      titleEn: 'Government ID Verification',
      desc: 'প্রতিটি ব্যবহারকারী ও কম্প্যানিয়নের সরকারি পরিচয়পত্র যাচাই।',
      icon: Lock
    },
    {
      title: 'ফেস ভেরিফিকেশন ও বায়োমেট্রিক ম্যাচ',
      titleEn: 'Biometric Selfie Match',
      desc: 'লাইভ সেলফি ও ডকুমেন্টের ছবি মিলিয়ে নিখুঁত যাচাই।',
      icon: Eye
    },
    {
      title: 'মোবাইল নম্বর ও ইমেইল ওটিপি',
      titleEn: 'Phone & Email OTP Verification',
      desc: 'দ্বিমুখী ওটিপি কোডের মাধ্যমে নিশ্চিতকরণ।',
      icon: Key
    },
    {
      title: 'ক্রিমিনাল ব্যাকগ্রাউন্ড চেক',
      titleEn: 'Criminal Background Clearance',
      desc: 'নিরাপত্তা নিশ্চিতকরণে রেকর্ড হিস্ট্রি যাচাই।',
      icon: ShieldCheck
    }
  ];

  const safetyProtocols = [
    {
      icon: MapPin,
      title: '১০০% পাবলিক প্লেস পলিসি',
      desc: 'সব মিটিং শুধুমাত্র পাবলিক ক্যাফে, রেস্তোরাঁ বা ভেন্যুতে হতে হবে। বাসা কঠোরভাবে নিষিদ্ধ।'
    },
    {
      icon: Clock,
      title: 'ইন-অ্যাপ চেক-ইন সিস্টেম',
      desc: 'সেশন শুরুতে ইউনিক সেফটি পিন (PIN) আদান-প্রদান ও স্বয়ংক্ৰিয় টাইমস্ট্যাম্প লগ।'
    },
    {
      icon: ShieldAlert,
      title: '১-ট্যাপে SOS ইমার্জেন্সি বাটন',
      desc: 'জরুরি প্রয়োজনে ১ ট্যাপে ২৪/৭ ট্রাস্ট অ্যান্ড সেফটি টিমের সহায়তা।'
    },
    {
      icon: Eye,
      title: 'লাইভ স্ট্যাটাস শেয়ারিং',
      desc: 'সেশন চলাকালীন পরিবারের বিশ্বস্ত কন্টাক্টের সাথে স্ট্যাটাস শেয়ারের সুবিধা।'
    }
  ];

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'bn' ? 'ট্রাস্ট অ্যান্ড সেফটি' : 'Trust & Safety Protocols'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {language === 'bn' ? (
            <>
              আপনার সুরক্ষাই আমাদের <br />
              <span className="text-blue-600">সর্বোচ্চ অগ্রাধিকার</span>
            </>
          ) : (
            <>
              Your Safety Is Our <br />
              <span className="text-blue-600">Non-Negotiable Priority</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'bn'
            ? 'মাল্টি-লেভেল আইডেন্টিটি ভেরিফিকেশন, পাবলিক ভেন্যু ও সার্বক্ষণিক সুরক্ষা ব্যবস্থা।'
            : 'Multi-layer identity vetting, verified public venues, real-time safety, and zero tolerance.'}
        </p>
      </div>

      {/* Emergency Quick Action Center */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>{language === 'bn' ? '২৪/৭ লাইভ সাপোর্ট কমান্ড' : '24/7 Live Emergency Dispatch'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {language === 'bn' ? 'জরুরি সুরক্ষা ও অভিযোগ সহায়তা' : 'Immediate Safety Assistance'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              {language === 'bn'
                ? 'সন্দেহজনক আচরণ বা অস্বস্তিকর পরিস্থিতিতে অবিলম্বে SOS বাটন অথবা হেল্পলাইন ব্যবহার করুন।'
                : 'Our 24/7 Safety Command Center is active at all times with real-time assistance.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onOpenSOS}
              className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all apple-pill-btn active:scale-95 border border-rose-500"
            >
              <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
              <span>{language === 'bn' ? '🚨 SOS এমার্জেন্সি' : '🚨 Emergency SOS'}</span>
            </button>

            <button
              onClick={onOpenReport}
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all apple-pill-btn shadow-2xs"
            >
              <Flag className="w-4 h-4 text-rose-600" />
              <span>{language === 'bn' ? 'অভিযোগ জানান' : 'Report Incident'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Multi-Layer Verification Features */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {language === 'bn' ? 'মাল্টি-লেভেল আইডেন্টিটি ভেরিফিকেশন' : 'Rigorous Identity Verification'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {language === 'bn' ? 'প্ল্যাটফর্মের প্রতিটি সদস্য শতভাগ যাচাইকৃত' : 'Every participant is identity-checked before any booking'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
          {verificationFeatures.map((f, idx) => {
            const Icon = f.icon;
            const bgs = [
              'card-bg-lavender', // rgb(243, 229, 245)
              'card-bg-slate',    // rgb(236, 239, 241)
              'card-bg-peach',    // rgb(255, 244, 230)
              'card-bg-rose',     // rgb(255, 235, 238)
            ];
            const bg = bgs[idx % bgs.length];

            return (
              <div key={idx} className={`${bg} border hover:border-blue-300 p-6 sm:p-7 rounded-3xl flex items-start gap-4 group shadow-xs hover:shadow-lg transition-all card-google`}>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {language === 'bn' ? f.title : f.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Core Safety Protocols */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {language === 'bn' ? 'আমাদের ৪টি প্রধান নিরাপত্তা নীতি' : 'Core Safety Rules'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {language === 'bn' ? 'ক্লায়েন্ট ও কম্প্যানিয়ন উভয়ের সুরক্ষার্থে প্রণীত' : 'Designed to ensure comfortable and risk-free companionship'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {safetyProtocols.map((p, idx) => {
            const Icon = p.icon;
            const protocolBgs = [
              'card-bg-lavender', // rgb(243, 229, 245)
              'card-bg-slate',    // rgb(236, 239, 241)
              'card-bg-peach',    // rgb(255, 244, 230)
              'card-bg-rose',     // rgb(255, 235, 238)
            ];
            const pBg = protocolBgs[idx % protocolBgs.length];

            return (
              <div key={idx} className={`${pBg} border hover:border-blue-300 p-6 rounded-3xl space-y-3 flex flex-col justify-between group shadow-xs hover:shadow-lg transition-all card-google`}>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 text-blue-600 flex items-center justify-center shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Zero Tolerance Policy Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'bn' ? 'জিরো-টলারেন্স পলিসি (Zero Tolerance)' : 'Zero-Tolerance Enforcement'}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {language === 'bn'
              ? 'যেকোনো ধরনের হয়রানি, রোমান্টিক/যৌন প্রস্তাব বা নিরাপত্তা নীতি লঙ্ঘনে সংশ্লিষ্ট অ্যাকাউন্ট তাৎক্ষণিকভাবে স্থায়ীভাবে বাতিল করা হয়।'
              : 'NeverAlone exercises strict zero tolerance for harassment, romantic advances, fraud, or private meetings. Violators are permanently banned.'}
          </p>
        </div>
      </div>
    </div>
  );
};
