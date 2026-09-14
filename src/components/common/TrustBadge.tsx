import React from 'react';
import { ShieldCheck, UserCheck, CreditCard, Star, MapPin, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const TrustBadgeStrip: React.FC = () => {
  const { language } = useLanguage();

  const badges = [
    {
      icon: UserCheck,
      title: language === 'bn' ? 'ভেরিফায়েড প্রোফাইল' : 'Verified Profiles',
      desc: language === 'bn' ? 'জাতীয় পরিচয়পত্র যাচাই' : 'Gov NID & Face Match'
    },
    {
      icon: ShieldCheck,
      title: language === 'bn' ? 'ব্যাকগ্রাউন্ড চেক' : 'Background Checked',
      desc: language === 'bn' ? 'রেকর্ড ভেরিফাইড' : 'Record verified'
    },
    {
      icon: CreditCard,
      title: language === 'bn' ? 'নিরাপদ পেমেন্ট' : 'Secure Payments',
      desc: language === 'bn' ? 'এসক্রো সুরক্ষা' : 'Escrow protection'
    },
    {
      icon: Star,
      title: language === 'bn' ? 'রিয়েল রিভিউ' : 'Rated by Users',
      desc: language === 'bn' ? 'প্রকৃত ফিডব্যাক' : 'Authentic feedback'
    },
    {
      icon: MapPin,
      title: language === 'bn' ? 'পাবলিক প্লেস' : 'Public Places Only',
      desc: language === 'bn' ? 'ক্যাফে ও রেস্তোরাঁ' : 'Cafes & restaurants'
    },
    {
      icon: HeartHandshake,
      title: language === 'bn' ? '১০০% প্ল্যাটোনিক' : '100% Platonic',
      desc: language === 'bn' ? 'কঠোর অ্যান্টি-ডেটিং' : 'Strict anti-dating'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 py-4">
      {badges.map((b, idx) => {
        const Icon = b.icon;
        return (
          <div 
            key={idx}
            className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 hover:shadow-xs group cursor-default transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-2.5 group-hover:scale-105 transition-transform">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-900 line-clamp-1 tracking-tight">{b.title}</span>
            <span className="text-sm text-slate-500 mt-0.5 line-clamp-1 font-normal">{b.desc}</span>
          </div>
        );
      })}
    </div>
  );
};

