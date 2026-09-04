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
}

interface MoreNavItem {
  id: string;
  label: string;
  desc: string;
  icon: React.ElementType;
  highlight?: boolean;
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

  const primaryNavLinks: NavItem[] = [
    { id: 'home', label: t.navHome },
    { id: 'companions', label: t.navBrowse, badge: language === 'bn' ? 'জনপ্রিয়' : 'Hot' },
    { id: 'services', label: t.navServices },
    { id: 'how-it-works', label: t.navHowItWorks },
    { id: 'pricing', label: t.navPricing },
  ];

  const moreNavLinks: MoreNavItem[] = [
    { 
      id: 'safety', 
      label: t.navSafety, 
      desc: language === 'bn' ? 'নিরাপত্তা ব্যবস্থা ও প্রোটোকল' : 'Safety rules & protocols',
      icon: Shield,
      highlight: true
    },
    { 
      id: 'about', 
      label: t.navAbout, 
      desc: language === 'bn' ? 'আমাদের উদ্দেশ্য ও নীতিমালা' : 'Our mission and story',
      icon: Info 
    },
    { 
      id: 'faq', 
      label: t.navFAQ, 
      desc: language === 'bn' ? 'সাধারণ প্রশ্ন ও উত্তর' : 'Common questions answered',
      icon: HelpCircle 
    },
    { 
      id: 'contact', 
      label: t.navContact, 
      desc: language === 'bn' ? '২৪/৭ সাপোর্ট ও সহায়তা' : '24/7 Support and hotline',
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
      <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
        {/* Top subtle ambient light line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none shrink-0"
            >
              <div className="relative">
                {/* Outer soft glowing backdrop */}
                <div className="absolute -inset-1 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />
                
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-rose-500 p-[1.5px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 group-hover:text-rose-400 transition-colors duration-300" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center">
                    Never<span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent">Alone</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Platonic
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-tight hidden md:inline-block">
                  {language === 'bn' ? 'বিশ্বস্ত সামাজিক সঙ্গ • নিরাপদ ও নির্ভরযোগ্য' : 'Safe, Verified Platonic Companionship'}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links (Visible on Large Screens) */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/[0.06] backdrop-blur-md shadow-inner">
              {primaryNavLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-3 xl:px-3.5 py-2 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-indigo-600/90 to-indigo-700 text-indigo-100 shadow-[0_2px_12px_rgba(99,102,241,0.35)] border border-indigo-400/30' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* "More" dropdown menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`px-3 xl:px-3.5 py-2 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                    isMoreActive 
                      ? 'text-indigo-300 bg-indigo-600/20 border border-indigo-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <span>{language === 'bn' ? 'আরও' : 'More'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {moreDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2.5 w-72 p-2 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-slate-700/70 shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="space-y-1">
                      {moreNavLinks.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleLinkClick(item.id)}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                              isActive 
                                ? 'bg-indigo-600/20 text-white border border-indigo-500/30' 
                                : item.highlight
                                ? 'hover:bg-rose-950/30 group text-slate-200 hover:text-white'
                                : 'hover:bg-slate-800/70 text-slate-200 hover:text-white'
                            }`}
                          >
                            <div className={`p-2 rounded-lg shrink-0 ${
                              item.highlight 
                                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' 
                                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold flex items-center gap-1.5">
                                {item.label}
                                {item.highlight && (
                                  <span className="text-[9px] px-1 rounded bg-rose-500/20 text-rose-300 font-bold">
                                    Safety
                                  </span>
                                )}
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

            {/* Right Action Cluster (Desktop lg+) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="group flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/[0.08] hover:border-slate-600 transition-all shadow-sm"
                title="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                <span className="font-mono text-[11px]">{language === 'bn' ? 'English' : 'বাংলা'}</span>
              </button>

              {/* Emergency SOS Button */}
              <button
                onClick={onOpenSOS}
                className="relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-rose-950/80 to-rose-900/80 hover:from-rose-900 hover:to-rose-800 text-rose-200 border border-rose-500/40 hover:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5" />
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span>SOS</span>
              </button>

              {/* Become a Companion */}
              <button
                onClick={onOpenApply}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-indigo-500/50 hover:text-white transition-all shadow-sm active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t.becomeCompanionBtn}</span>
              </button>

              {/* Main Primary CTA */}
              <button
                onClick={() => handleLinkClick('companions')}
                className="relative group overflow-hidden flex items-center gap-2 px-3.5 xl:px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-rose-500 hover:from-indigo-500 hover:to-rose-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_25px_rgba(244,63,94,0.45)] transition-all duration-300 active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative tracking-wide">{t.browseCompanions}</span>
              </button>
            </div>

            {/* Mobile & Tablet Action Cluster (< lg) */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-mono transition-colors"
                title="Toggle Language"
              >
                {language === 'bn' ? 'EN' : 'বাং'}
              </button>

              {/* Emergency SOS */}
              <button
                onClick={onOpenSOS}
                className="relative flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-950/90 hover:bg-rose-900 text-rose-200 border border-rose-500/40 shadow-sm active:scale-95 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5" />
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>SOS</span>
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3.5 animate-in slide-in-from-top duration-200 shadow-2xl max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            {/* Quick CTA Actions */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  onOpenApply();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700/80 text-xs font-semibold shadow-sm transition-colors"
              >
                <UserPlus className="w-4 h-4 text-indigo-400" />
                <span>{t.becomeCompanionBtn}</span>
              </button>
              <button
                onClick={() => handleLinkClick('companions')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-500 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-opacity"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.browseCompanions}</span>
              </button>
            </div>

            {/* Nav Links List */}
            <div className="bg-slate-900/70 rounded-2xl border border-white/[0.06] p-2 space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 py-1">
                {language === 'bn' ? 'মেনু নেভিগেশন' : 'Navigation Menu'}
              </div>
              {[...primaryNavLinks, ...moreNavLinks].map((link) => {
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
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                        {'badge' in link ? link.badge : ''}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hotline & Safety Guarantee */}
            <div className="pt-1 flex flex-col gap-2 text-xs text-slate-400">
              <a 
                href="tel:09612345678"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/20 text-emerald-300 font-medium transition-colors"
              >
                <span className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'bn' ? '২৪/৭ সাপোর্ট হেল্পলাইন' : '24/7 Helpline'}</span>
                </span>
                <span className="font-mono text-xs font-bold">০৯৬১২-৩৪৫৬৭৮</span>
              </a>
              
              <div className="text-center text-[11px] text-slate-400 py-0.5">
                {language === 'bn' ? '১০০% প্ল্যাটোনিক ও পাবলিক প্লেস ভেরিফাইড সার্ভিস' : '100% Strictly Platonic & Public Place Policy'}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile drawer */}
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


