import React from 'react';
import { ShieldCheck, UserCheck, CreditCard, Star, MapPin, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const TrustBadgeStrip: React.FC = () => {
  const { language } = useLanguage();

  const badges = [
    {
      icon: UserCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: language === 'bn' ? 'ভেরিফায়েড প্রোফাইল' : 'Verified Profiles',
      desc: language === 'bn' ? 'জাতীয় পরিচয়পত্র যাচাইকৃত' : 'Gov NID & Face Match'
    },
    {
      icon: ShieldCheck,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      title: language === 'bn' ? 'ব্যাকগ্রাউন্ড চেক করা' : 'Background Checked',
      desc: language === 'bn' ? 'রেকর্ড ও পুলিশ ভেরিফিকেশন' : 'Criminal record verified'
    },
    {
      icon: CreditCard,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: language === 'bn' ? 'নিরাপদ পেমেন্ট' : 'Secure Payments',
      desc: language === 'bn' ? 'bKash, Nagad ও কার্ড পেমেন্ট' : 'Escrow protection'
    },
    {
      icon: Star,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: language === 'bn' ? 'রিয়েল ইউজার রিভিউ' : 'Rated by Real Users',
      desc: language === 'bn' ? 'প্রতিটি সেশনের পর রেটিং' : 'Authentic feedback'
    },
    {
      icon: MapPin,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: language === 'bn' ? 'পাবলিক প্লেস পলিসি' : 'Public Places Only',
      desc: language === 'bn' ? '১০০% নিরাপদ উন্মুক্ত স্থান' : 'Cafes, events & restaurants'
    },
    {
      icon: HeartHandshake,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      title: language === 'bn' ? '১০০% প্ল্যাটোনিক' : '100% Platonic',
      desc: language === 'bn' ? 'অ-রোমান্টিক ও নিরাপদ সঙ্গ' : 'Strict anti-dating rules'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 py-4">
      {badges.map((b, idx) => {
        const Icon = b.icon;
        return (
          <div 
            key={idx}
            className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 border ${b.color} group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-100 line-clamp-1">{b.title}</span>
            <span className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{b.desc}</span>
          </div>
        );
      })}
    </div>
  );
};
