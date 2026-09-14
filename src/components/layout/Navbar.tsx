import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldAlert,
  Globe, 
  Menu, 
  X, 
  PhoneCall, 
  UserPlus, 
  Sparkles,
  HeartHandshake,
  ChevronDown,
  Shield,
  HelpCircle,
  Info,
  MessageCircle,
  Headphones,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenSOS: () => void;
  onOpenApply: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenSOS,
  onOpenApply
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary top-level navigation links
  const primaryNavLinks = [
    { id: 'home', label: t.navHome },
    { id: 'companions', label: t.navBrowse, badge: language === 'bn' ? 'ভেরিফায়েড' : 'Verified' },
    { id: 'services', label: t.navServices },
    { id: 'pricing', label: t.navPricing },
    { id: 'safety', label: t.navSafety },
  ];

  // Secondary links placed inside the "More" dropdown
  const dropdownNavLinks = [
    { 
      id: 'how-it-works', 
      label: t.navHowItWorks, 
      desc: language === 'bn' ? 'কীভাবে প্ল্যাটফর্ম কাজ করে' : 'Step-by-step guidance',
      icon: HelpCircle 
    },
    { 
      id: 'about', 
      label: t.navAbout, 
      desc: language === 'bn' ? 'আমাদের লক্ষ্য ও নীতিমালা' : 'Our mission & story',
      icon: Info 
    },
    { 
      id: 'faq', 
      label: t.navFAQ, 
      desc: language === 'bn' ? 'সাধারণ প্রশ্নোত্তর' : 'Frequently asked questions',
      icon: MessageCircle 
    },
    { 
      id: 'contact', 
      label: t.navContact, 
      desc: language === 'bn' ? 'সহায়তা ও যোগাযোগ কেন্দ্র' : '24/7 Support & Helpdesk',
      icon: Headphones 
    },
    { 
      id: 'admin', 
      label: language === 'bn' ? 'অ্যাডমিন পোর্টাল' : 'Admin Portal', 
      desc: language === 'bn' ? 'ম্যানেজমেন্ট ড্যাশবোর্ড' : 'Management & verifications',
      icon: SlidersHorizontal 
    },
  ];

  // Check if any link in the dropdown is currently active
  const isDropdownChildActive = dropdownNavLinks.some(item => item.id === currentPage);

  const handleLinkClick = (id: string) => {
    if (id === 'admin') {
      window.location.hash = 'admin';
      setMobileMenuOpen(false);
      setDropdownOpen(false);
      return;
    }
    onNavigate(id);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
            
            {/* 1. Brand Logo: Clean, compact & crisp */}
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
              title="NeverAlone Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <HeartHandshake className="w-5 h-5" />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center">
                  Never<span className="text-blue-600">Alone</span>
                </span>
                <span className="hidden xs:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                  Platonic
                </span>
              </div>
            </div>

            {/* 2. Desktop Navigation with Dropdown */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 select-none">
              {primaryNavLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-3 py-1.5 text-sm font-semibold rounded-xl transition-all duration-150 flex items-center gap-1.5 shrink-0 ${
                      isActive 
                        ? 'text-white bg-blue-600 shadow-xs font-bold' 
                        : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 hover:ring-1 hover:ring-blue-200/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                        isActive 
                          ? 'bg-blue-700 text-white' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* More / Explore Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onMouseEnter={() => setDropdownOpen(true)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-xl transition-all duration-150 flex items-center gap-1.5 ${
                    isDropdownChildActive || dropdownOpen
                      ? 'text-blue-700 bg-blue-50 ring-1 ring-blue-300 font-bold'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 hover:ring-1 hover:ring-blue-200/80'
                  }`}
                  aria-expanded={dropdownOpen}
                >
                  <span>{language === 'bn' ? 'আরও দেখুন' : 'More'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-500'}`} />
                  {isDropdownChildActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  )}
                </button>

                {/* Dropdown Menu Card */}
                {dropdownOpen && (
                  <div 
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute top-full right-0 lg:left-0 lg:right-auto mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 px-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 mb-1 border-b border-slate-100">
                      {language === 'bn' ? 'গুরুত্বপূর্ণ লিঙ্ক ও সহায়িকা' : 'Explore & Resources'}
                    </div>

                    <div className="space-y-0.5">
                      {dropdownNavLinks.map((item) => {
                        const Icon = item.icon;
                        const isChildActive = currentPage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleLinkClick(item.id)}
                            className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                              isChildActive 
                                ? 'bg-blue-50/90 text-blue-800 font-semibold ring-1 ring-blue-200' 
                                : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                              isChildActive 
                                ? 'bg-blue-600 text-white shadow-2xs' 
                                : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className={`text-sm ${isChildActive ? 'font-bold text-blue-900' : 'font-semibold text-slate-800 group-hover:text-blue-700'}`}>
                                  {item.label}
                                </span>
                                {isChildActive && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />
                                )}
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* 3. Right Action Cluster */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-800 border border-slate-200 hover:border-blue-300 transition-all active:scale-95 shadow-2xs hover:shadow-xs"
                title={language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
              >
                <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="text-sm font-sans">
                  {language === 'bn' ? 'EN' : 'বাং'}
                </span>
              </button>

              {/* Emergency SOS Button */}
              <button
                onClick={onOpenSOS}
                className="group flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-extrabold rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/90 shadow-2xs hover:shadow-xs transition-all active:scale-95 shrink-0"
                title={t.emergencySOS}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 transition-transform group-hover:scale-110" />
                <span>SOS</span>
              </button>

              {/* Become a Companion (Join) */}
              <button
                onClick={onOpenApply}
                className="hidden xl:flex items-center gap-1 px-3.5 py-1.5 text-sm font-semibold rounded-xl bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-800 border border-slate-200 hover:border-blue-300 transition-all shadow-xs active:scale-95 shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{language === 'bn' ? 'যোগ দিন' : 'Join'}</span>
              </button>

              {/* Main Primary Action CTA */}
              <button
                onClick={() => handleLinkClick('companions')}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-bold rounded-xl apple-pill-btn shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{language === 'bn' ? 'সঙ্গী খুঁজুন' : 'Find Companion'}</span>
              </button>
            </div>

            {/* 4. Mobile & Tablet Navigation Bar */}
            <div className="flex items-center gap-2 lg:hidden shrink-0">
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 text-sm font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
              >
                {language === 'bn' ? 'EN' : 'বাং'}
              </button>

              <button
                onClick={onOpenSOS}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-extrabold rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shadow-2xs active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>SOS</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
              </button>
            </div>

          </div>
        </div>

        {/* 5. Mobile & Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3.5 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleLinkClick('companions')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl apple-pill-btn text-sm font-bold"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === 'bn' ? 'সঙ্গী খুঁজুন' : 'Find Companion'}</span>
              </button>

              <button
                onClick={() => {
                  onOpenApply();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-sm font-semibold"
              >
                <UserPlus className="w-4 h-4 text-blue-600" />
                <span>{language === 'bn' ? 'যোগ দিন' : 'Join as Host'}</span>
              </button>
            </div>

            {/* Primary Mobile Menu Section */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-2 space-y-1">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-400 px-3 py-1">
                {language === 'bn' ? 'মূল মেনু' : 'Main Menu'}
              </div>
              
              {primaryNavLinks.map((link) => {
                const isActive = currentPage === link.id;
                const hasBadge = Boolean(link.badge);
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1'
                    }`}
                  >
                    <span>{link.label}</span>
                    {hasBadge && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* More / Additional Pages Mobile Section */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-2 space-y-1">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-400 px-3 py-1">
                {language === 'bn' ? 'অন্যান্য ও সাপোর্ট' : 'More & Support'}
              </div>
              
              {dropdownNavLinks.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 pt-1">
              <a 
                href="tel:09612345678"
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 font-medium"
              >
                <span className="flex items-center gap-2 text-sm">
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                  <span>{language === 'bn' ? '২৪/৭ হেল্পলাইন' : '24/7 Support Hotline'}</span>
                </span>
                <span className="font-mono text-sm font-bold">০৯৬১২-৩৪৫৬৭৮</span>
              </a>

              <div className="text-center text-xs text-slate-500 py-1 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'bn' ? '১০০% প্ল্যাটোনিক ও নিরাপদ পাবলিক প্লেস পলিসি' : '100% Platonic & Public Place Policy'}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30"
          aria-hidden="true"
        />
      )}
    </>
  );
};


