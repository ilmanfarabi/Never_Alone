import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Menu, 
  X, 
  PhoneCall, 
  UserPlus, 
  Sparkles,
  HeartHandshake,
  ChevronDown,
  Info,
  HelpCircle,
  MessageSquare,
  Shield
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenSOS: () => void;
  onOpenApply: () => void;
}

interface NavItem {
  id: string;
  label: string;
  badge?: string;
  hideOnLg?: boolean; // Hidden on 1024px-1279px to prevent overflow, shown on xl (1280px+)
}

interface MoreNavItem {
  id: string;
  label: string;
  desc: string;
  icon: React.ElementType;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenSOS,
  onOpenApply
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation links - simple, short and crisp words
  const primaryNavLinks: NavItem[] = [
    { id: 'home', label: t.navHome },
    { id: 'companions', label: t.navBrowse, badge: language === 'bn' ? 'ভেরিফায়েড' : 'Verified' },
    { id: 'services', label: t.navServices },
    { id: 'safety', label: t.navSafety },
    { id: 'how-it-works', label: t.navHowItWorks, hideOnLg: true },
    { id: 'pricing', label: t.navPricing, hideOnLg: true },
  ];

  // Secondary pages inside the "More" dropdown
  const moreNavLinks: MoreNavItem[] = [
    { 
      id: 'how-it-works', 
      label: t.navHowItWorks, 
      desc: language === 'bn' ? 'বুকিং করার সহজ নিয়ম ও ধাপ' : 'Easy step-by-step booking guide',
      icon: HelpCircle 
    },
    { 
      id: 'pricing', 
      label: t.navPricing, 
      desc: language === 'bn' ? 'স্বচ্ছ ও সাশ্রয়ী ফি পলিসি' : 'Transparent pricing policy',
      icon: Info 
    },
    { 
      id: 'about', 
      label: t.navAbout, 
      desc: language === 'bn' ? 'আমাদের উদ্দেশ্য ও সামাজিক লক্ষ্য' : 'Our mission and story',
      icon: Info 
    },
    { 
      id: 'faq', 
      label: t.navFAQ, 
      desc: language === 'bn' ? 'বুকিং ও নিরাপত্তা বিষয়ক প্রশ্নোত্তর' : 'Booking, safety & payment FAQ',
      icon: HelpCircle 
    },
    { 
      id: 'contact', 
      label: t.navContact, 
      desc: language === 'bn' ? '২৪/৭ কাস্টমার সাপোর্ট ও হেল্পলাইন' : '24/7 Support and hotline',
      icon: MessageSquare 
    },
  ];

  const isMoreActive = moreNavLinks.some(item => item.id === currentPage);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        {/* Top ambient color accent line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6 w-full">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-1.5 sm:gap-3">
            
            {/* 1. Brand Logo: Clean, compact & crisp */}
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
              title="NeverAlone Home"
            >
              {/* Logo Icon */}
              <div className="relative shrink-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-rose-500 p-[1.5px] shadow-md shadow-indigo-600/20 group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:scale-105">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 group-hover:text-rose-400 transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Logo Text */}
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center">
                  Never<span className="text-indigo-400">Alone</span>
                </span>
                <span className="hidden xs:inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shrink-0">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  Platonic
                </span>
              </div>
            </div>

            {/* 2. Desktop Navigation Menu: Compact, simple short words */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-900/70 p-1 rounded-2xl border border-white/[0.06] backdrop-blur-md shrink-0">
              {primaryNavLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-2.5 xl:px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1 shrink-0 ${
                      link.hideOnLg ? 'hidden xl:flex' : 'flex'
                    } ${
                      isActive 
                        ? 'text-white bg-indigo-600 shadow-[0_2px_10px_rgba(99,102,241,0.35)]' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[8px] xl:text-[9px] px-1 xl:px-1.5 py-0.2 rounded-full font-bold hidden xl:inline ${
                        isActive 
                          ? 'bg-indigo-700 text-white' 
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* "More" Dropdown Menu */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`px-2.5 xl:px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1 ${
                    isMoreActive 
                      ? 'text-indigo-300 bg-indigo-600/20 border border-indigo-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                  aria-expanded={moreDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>{language === 'bn' ? 'আরও' : 'More'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {moreDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 p-2 bg-slate-900/98 backdrop-blur-2xl rounded-2xl border border-slate-700/80 shadow-[0_16px_36px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-1">
                      {language === 'bn' ? 'অতিরিক্ত পেজ ও তথ্য' : 'More Pages & Info'}
                    </div>
                    <div className="space-y-1">
                      {moreNavLinks.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleLinkClick(item.id)}
                            className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-all ${
                              isActive 
                                ? 'bg-indigo-600/20 text-white border border-indigo-500/30' 
                                : 'hover:bg-slate-800 text-slate-200 hover:text-white'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">
                                {item.label}
                              </div>
                              <div className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* 3. Right Action Cluster: Clean, compact & perfectly fitted */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all shadow-sm"
                title={language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-[11px] font-sans">
                  {language === 'bn' ? 'EN' : 'বাং'}
                </span>
              </button>

              {/* Emergency SOS Button */}
              <button
                onClick={onOpenSOS}
                className="relative flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-200 border border-rose-500/40 shadow-sm hover:shadow-[0_0_12px_rgba(244,63,94,0.3)] transition-all active:scale-95 shrink-0"
                title={t.emergencySOS}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5" />
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>SOS</span>
              </button>

              {/* Become a Companion (Join) */}
              <button
                onClick={onOpenApply}
                className="hidden xl:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-indigo-500/50 hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{language === 'bn' ? 'যোগ দিন' : 'Join'}</span>
              </button>

              {/* Main Primary Action CTA */}
              <button
                onClick={() => handleLinkClick('companions')}
                className="flex items-center gap-1.5 px-3.5 xl:px-4 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-500 hover:to-rose-400 text-white shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all active:scale-95 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{language === 'bn' ? 'সঙ্গী খুঁজুন' : 'Find Companion'}</span>
              </button>
            </div>

            {/* 4. Mobile & Tablet Navigation Bar (< lg) */}
            <div className="flex items-center gap-1.5 lg:hidden shrink-0">
              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="px-2 py-1.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors"
                title="Language"
              >
                {language === 'bn' ? 'EN' : 'বাং'}
              </button>

              {/* Emergency SOS */}
              <button
                onClick={onOpenSOS}
                className="relative flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl bg-rose-950/80 text-rose-200 border border-rose-500/40 active:scale-95 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5" />
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>SOS</span>
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 5. Mobile & Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3.5 animate-in slide-in-from-top-4 duration-200 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            
            {/* Quick Primary Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  handleLinkClick('companions');
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === 'bn' ? 'সঙ্গী খুঁজুন' : 'Find Companion'}</span>
              </button>

              <button
                onClick={() => {
                  onOpenApply();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700/80 text-xs font-semibold active:scale-98"
              >
                <UserPlus className="w-4 h-4 text-indigo-400" />
                <span>{language === 'bn' ? 'হোস্ট হিসেবে যোগ দিন' : 'Join as Host'}</span>
              </button>
            </div>

            {/* Navigation List */}
            <div className="bg-slate-900/80 rounded-2xl border border-white/[0.08] p-2 space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-1">
                {language === 'bn' ? 'মেনু নেভিগেশন' : 'Navigation Menu'}
              </div>
              
              {[...primaryNavLinks, ...moreNavLinks.slice(2)].map((link) => {
                const isActive = currentPage === link.id;
                const hasBadge = 'badge' in link && Boolean(link.badge);
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {hasBadge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                        {'badge' in link ? link.badge : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 24/7 Hotline Support & Safety Guarantee */}
            <div className="space-y-2 pt-1">
              <a 
                href="tel:09612345678"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium transition-colors"
              >
                <span className="flex items-center gap-2 text-xs">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'bn' ? '২৪/৭ হেল্পলাইন হটলাইন' : '24/7 Support Hotline'}</span>
                </span>
                <span className="font-mono text-xs font-bold">০৯৬১২-৩৪৫৬৭৮</span>
              </a>

              <div className="text-center text-[11px] text-slate-400 py-1 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'bn' ? '১০০% প্ল্যাটোনিক ও নিরাপদ পাবলিক প্লেস পলিসি' : '100% Platonic & Public Place Policy'}</span>
              </div>
            </div>

          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30 animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}
    </>
  );
};
