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

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReport }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Never<span className="text-indigo-400">Alone</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-300 max-w-sm">
              {language === 'bn' 
                ? 'NeverAlone মানুষের জীবনে একাকীত্ব দূর করে এবং সামাজিক অনুষ্ঠানে আত্মবিশ্বাসের সাথে অংশ নেওয়ার সুযোগ তৈরি করে। সম্পূর্ণ ভেরিফায়েড, নিরাপদ ও পেশাদার প্ল্যাটোনিক প্ল্যাটফর্ম।'
                : 'NeverAlone combats loneliness by connecting you with verified companions for social events, dinners, and genuine conversations in a safe, platonic environment.'}
            </p>

            {/* Strict Platonic Reassurance Badge */}
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                {language === 'bn' 
                  ? 'আমরা কঠোরভাবে অ-রোমান্টিক ও অ-যৌন। রোমান্টিক বা ডেটিং প্রস্তাবকারীদের স্থায়ীভাবে ব্যান করা হয়।'
                  : 'Strictly non-romantic & non-sexual companionship. Inappropriate requests lead to immediate permanent ban.'}
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#facebook" 
                onClick={(e) => { e.preventDefault(); }}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors text-slate-300 font-bold text-xs"
                title="Facebook"
              >
                fb
              </a>
              <a 
                href="#instagram" 
                onClick={(e) => { e.preventDefault(); }}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors text-slate-300 font-bold text-xs"
                title="Instagram"
              >
                ig
              </a>
              <a 
                href="#linkedin" 
                onClick={(e) => { e.preventDefault(); }}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors text-slate-300 font-bold text-xs"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Col 2: Services / Occasions */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'bn' ? 'সার্ভিস ও উপলক্ষ' : 'Services & Occasions'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-400 transition-colors">
                  {language === 'bn' ? 'ডিনার ডেট কম্প্যানিয়ন' : 'Dinner Date Companion'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-400 transition-colors">
                  {language === 'bn' ? 'ওয়েডিং / ইভেন্ট প্লাস-ওয়ান' : 'Wedding / Event Plus-One'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-400 transition-colors">
                  {language === 'bn' ? 'মুভি ও কফি কম্প্যানিয়ন' : 'Movie & Coffee Companion'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-400 transition-colors">
                  {language === 'bn' ? 'ট্রাভেল কম্প্যানিয়ন (ডে ট্রিপ)' : 'Travel Companion (Day Trip)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-400 transition-colors">
                  {language === 'bn' ? 'কথোপকথন ও ভাষা প্র্যাকটিস' : 'Conversation Partner'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-indigo-400 transition-colors">
                  {language === 'bn' ? 'পারিবারিক অনুষ্ঠান সঙ্গী' : 'Family Function Escort'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Trust */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'bn' ? 'কোম্পানি ও নিরাপত্তা' : 'Trust & Safety'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-indigo-400 transition-colors">
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-indigo-400 transition-colors">
                  {t.navHowItWorks}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('safety')} className="hover:text-indigo-400 transition-colors">
                  {t.navSafety}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-indigo-400 transition-colors">
                  {t.navPricing}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-indigo-400 transition-colors">
                  {t.navTerms}
                </button>
              </li>
              <li>
                <button onClick={onOpenReport} className="text-rose-400 hover:text-rose-300 transition-colors">
                  {t.reportIncident}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {language === 'bn' ? 'যোগাযোগ ও সাপোর্ট' : 'Contact & Support'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">০৯৬XX-XXXXXX</div>
                  <div className="text-xs text-slate-400">২৪/৭ কাস্টমার সাপোর্ট হেল্পলাইন</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:support@neveralone.com" className="text-white hover:underline">support@neveralone.com</a>
                  <div className="text-xs text-slate-400">দ্রুত রেসপন্স টিম</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-slate-300">
                  গুলশান-২, ঢাকা ১২১২, বাংলাদেশ
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Payment Methods & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} NeverAlone Inc.</span>
            <span>•</span>
            <span>{language === 'bn' ? 'সকল অধিকার সংরক্ষিত' : 'All Rights Reserved.'}</span>
          </div>

          {/* Payment Methods Badges */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'bn' ? 'নিরাপদ পেমেন্ট:' : 'Secure Payments:'}
            </span>
            <span className="px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-700/40 font-bold text-[11px]">
              bKash
            </span>
            <span className="px-2 py-0.5 rounded bg-orange-950/60 text-orange-300 border border-orange-700/40 font-bold text-[11px]">
              Nagad
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-700/40 font-bold text-[11px]">
              VISA / Mastercard
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/40 font-bold text-[11px]">
              Wallet
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
