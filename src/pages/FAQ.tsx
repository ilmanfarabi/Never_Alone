import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';
import { faqsData } from '../data/faqs';

export const FAQ: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-2': true });

  const toggleOpen = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: 'all', label: language === 'bn' ? 'সকল প্রশ্ন' : 'All FAQs' },
    { id: 'safety', label: language === 'bn' ? 'নিরাপত্তা ও প্ল্যাটোনিক নীতি' : 'Safety & Platonic' },
    { id: 'booking', label: language === 'bn' ? 'বুকিং ও পেমেন্ট' : 'Bookings & Payments' },
    { id: 'companion', label: language === 'bn' ? 'কম্প্যানিয়ন হওয়া' : 'Becoming a Companion' },
    { id: 'general', label: language === 'bn' ? 'সাধারণ প্রশ্ন' : 'General Questions' }
  ];

  const filteredFaqs = faqsData.filter(faq => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchQ = faq.question.toLowerCase().includes(q) || faq.questionBn.includes(q);
      const matchA = faq.answer.toLowerCase().includes(q) || faq.answerBn.includes(q);
      if (!matchQ && !matchA) return false;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          <span>{language === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্ন' : 'Got Questions?'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-sm text-slate-300">
          {language === 'bn'
            ? 'NeverAlone প্ল্যাটফর্মের সেবা, নিরাপত্তা, পেমেন্ট ও শর্তাবলী সম্পর্কিত স্পষ্ট উত্তর।'
            : 'Clear answers to everything you need to know about our services, safety, and policies.'}
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'আপনার প্রশ্ন দিয়ে অনুসন্ধান করুন...' : 'Search questions or keywords...'}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
            {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি।' : 'No matching questions found.'}
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                    {language === 'bn' ? faq.questionBn : faq.question}
                  </span>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-in fade-in duration-150">
                    {language === 'bn' ? faq.answerBn : faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
        <h3 className="text-base font-bold text-white">
          {language === 'bn' ? 'আরও কোনো প্রশ্ন আছে?' : 'Still have more questions?'}
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {language === 'bn' 
            ? 'আমাদের ২৪/৭ সাপোর্ট টিম আপনার যেকোনো প্রশ্নের উত্তর দিতে সদা প্রস্তুত।' 
            : 'Our friendly customer experience team is active 24/7 to assist you.'}
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
        >
          {language === 'bn' ? 'সাপোর্টে যোগাযোগ করুন' : 'Contact Support'}
        </button>
      </div>
    </div>
  );
};
