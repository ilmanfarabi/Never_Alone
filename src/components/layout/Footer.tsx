import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  MapPin
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SocialIcons } from '../common/SocialIcons';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReport }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Col 1: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                Never<span className="text-blue-600">Alone</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-600 max-w-sm font-normal">
              {language === 'bn' 
                ? 'সামাজিক অনুষ্ঠান, ডিনার ও আড্ডার জন্য বিশ্বস্ত ও ভেরিফায়েড কম্প্যানিয়ন প্ল্যাটফর্ম — সম্পূর্ণ প্ল্যাটোনিক ও নিরাপদ।'
                : 'Verified platonic companions for dinners, events, and genuine conversation in a safe setting.'}
            </p>

            {/* Strict Platonic Reassurance Badge */}
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 flex items-start gap-2.5 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                {language === 'bn' 
                  ? 'কঠোরভাবে অ-রোমান্টিক ও অ-যৌন। রোমান্টিক বা ডেটিং প্রস্তাবকারীদের স্থায়ীভাবে ব্যান করা হয়।'
                  : 'Strictly non-romantic companionship. Inappropriate requests lead to immediate permanent ban.'}
              </span>
            </div>

            {/* Official Social Media Links */}
            <div className="pt-2">
              <div className="text-sm font-semibold text-slate-800 mb-2">
                {language === 'bn' ? 'সোশ্যাল মিডিয়ায় যুক্ত থাকুন:' : 'Connect on Social Media:'}
              </div>
              <SocialIcons size="md" />
            </div>
          </div>

          {/* Col 2: Services / Occasions */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              {language === 'bn' ? 'সার্ভিস ও উপলক্ষ' : 'Services & Occasions'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-600 transition-colors">
                  {language === 'bn' ? 'ডিনার ডেট কম্প্যানিয়ন' : 'Dinner Date Companion'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-600 transition-colors">
                  {language === 'bn' ? 'ওয়েডিং / ইভেন্ট প্লাস-ওয়ান' : 'Wedding / Event Plus-One'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-600 transition-colors">
                  {language === 'bn' ? 'মুভি ও কফি কম্প্যানিয়ন' : 'Movie & Coffee Companion'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-600 transition-colors">
                  {language === 'bn' ? 'ট্রাভেল কম্প্যানিয়ন (ডে ট্রিপ)' : 'Travel Companion (Day Trip)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-600 transition-colors">
                  {language === 'bn' ? 'কথোপকথন ও ভাষা প্র্যাকটিস' : 'Conversation Partner'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-600 transition-colors">
                  {language === 'bn' ? 'পারিবারিক অনুষ্ঠান সঙ্গী' : 'Family Function Escort'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Trust */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              {language === 'bn' ? 'কোম্পানি ও নিরাপত্তা' : 'Trust & Safety'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-600 transition-colors">
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-blue-600 transition-colors">
                  {t.navHowItWorks}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('safety')} className="hover:text-blue-600 transition-colors">
                  {t.navSafety}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-blue-600 transition-colors">
                  {t.navPricing}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-blue-600 transition-colors">
                  {t.navTerms}
                </button>
              </li>
              <li>
                <button onClick={onOpenReport} className="text-slate-900 hover:text-blue-600 font-medium transition-colors">
                  {t.reportIncident}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              {language === 'bn' ? 'যোগাযোগ ও সাপোর্ট' : 'Contact & Support'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900 font-medium">০৯৬১২-৩৪৫৬৭৮</div>
                  <div className="text-sm text-slate-500">২৪/৭ কাস্টমার সাপোর্ট হেল্পলাইন</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:support@neveralone.com" className="text-slate-900 hover:underline">support@neveralone.com</a>
                  <div className="text-sm text-slate-500">দ্রুত রেসপন্স টিম</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm leading-relaxed text-slate-600">
                  গুলশান-২, ঢাকা ১২১২, বাংলাদেশ
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Payment Methods & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} NeverAlone Inc.</span>
            <span>•</span>
            <span>{language === 'bn' ? 'সকল অধিকার সংরক্ষিত' : 'All Rights Reserved.'}</span>
            <span>•</span>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.hash = 'admin';
                }
              }}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 transition font-medium hover:underline cursor-pointer"
              title="Admin & Staff Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'bn' ? 'অ্যাডমিন পোর্টাল' : 'Admin Portal'}</span>
            </button>
          </div>

          {/* Payment Methods Badges */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              {language === 'bn' ? 'নিরাপদ পেমেন্ট:' : 'Secure Payments:'}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-white text-slate-800 border border-slate-200 font-bold text-sm shadow-2xs">
              bKash
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-white text-slate-800 border border-slate-200 font-bold text-sm shadow-2xs">
              Nagad
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-white text-slate-800 border border-slate-200 font-bold text-sm shadow-2xs">
              VISA / Mastercard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

