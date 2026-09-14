import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search,
  ArrowRight
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
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্ন' : 'Got Questions?'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {language === 'bn' ? (
            <>
              স্পষ্ট ও সরাসরি <br />
              <span className="text-blue-600">সকল প্রশ্নের উত্তর</span>
            </>
          ) : (
            <>
              Frequently Asked <br />
              <span className="text-blue-600">Questions & Answers</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'bn'
            ? 'NeverAlone প্ল্যাটফর্মের সেবা, নিরাপত্তা, পেমেন্ট ও শর্তাবলী সম্পর্কিত স্পষ্ট তথ্য।'
            : 'Clear answers to everything you need to know about our services, safety, and policies.'}
        </p>
      </div>

      {/* Search and Category Filters Capsule */}
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'প্রশ্ন বা বিষয় অনুসন্ধান করুন...' : 'Search questions or keywords...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center rounded-3xl bg-slate-50 border border-slate-200 text-slate-500 text-base font-normal">
            {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি।' : 'No matching questions found.'}
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden transition-all duration-200 shadow-xs hover:shadow-md card-google"
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-3.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                    {language === 'bn' ? faq.questionBn : faq.question}
                  </span>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-7 pt-2 text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 font-normal">
                    {language === 'bn' ? faq.answerBn : faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="max-w-3xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'bn' ? 'আরও কোনো প্রশ্ন আছে?' : 'Still Have Questions?'}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto font-normal">
            {language === 'bn' 
              ? 'আমাদের ২৪/৭ সাপোর্ট টিম আপনার যেকোনো প্রশ্নের উত্তর দিতে সদা প্রস্তুত।' 
              : 'Our customer experience team is active 24/7 to assist you.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="apple-pill-btn bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-7 py-3 rounded-full inline-flex items-center gap-2 shadow-xs"
            >
              <span>{language === 'bn' ? 'সাপোর্টে যোগাযোগ করুন' : 'Contact Support'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
