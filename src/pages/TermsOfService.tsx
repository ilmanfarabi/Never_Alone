import React from 'react';
import { FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export const TermsOfService: React.FC = () => {
  const { language } = useLanguage();

  const terms = [
    {
      num: '১. সার্ভিসের প্রকৃতি (Nature of Service)',
      numEn: '1. Nature of Service',
      contentBn: 'NeverAlone একটি প্ল্যাটোনিক কম্প্যানিয়নশিপ বুকিং প্ল্যাটফর্ম। এটি কোনো ডেটিং, এসকর্ট বা যৌন সার্ভিস নয়। প্ল্যাটফর্মে কোনো রোমান্টিক, অন্তরঙ্গ বা যৌন কার্যকলাপ কঠোরভাবে নিষিদ্ধ।',
      contentEn: 'NeverAlone is strictly a social platonic companionship platform. It is NOT a dating or escort agency. Romantic, sexual, or intimate requests are entirely forbidden.'
    },
    {
      num: '২. বয়স সীমা (Age Requirement)',
      numEn: '2. Age Requirement',
      contentBn: 'শুধুমাত্র ১৮ বছর বা তার বেশি বয়সী ব্যক্তিরা এই প্ল্যাটফর্ম ব্যবহার করতে পারবেন। সরকারি ID ভেরিফিকেশনের মাধ্যমে বয়স নিশ্চিত করা হয়।',
      contentEn: 'You must be at least 18 years of age to register or book sessions. Age is validated through official government identification.'
    },
    {
      num: '৩. আচরণবিধি (Code of Conduct)',
      numEn: '3. Code of Conduct',
      contentBn: 'সকল ব্যবহারকারী ও কম্প্যানিয়নকে সম্মানজনক, পেশাদার আচরণ বজায় রাখতে হবে। হয়রানি, জোরপূর্বক আচরণ, অমর্যাদাকর মন্তব্য বা অনুপযুক্ত প্রস্তাব সম্পূর্ণভাবে নিষিদ্ধ।',
      contentEn: 'All users and companions must uphold polite, professional, and respectful conduct. Harassment, coercion, or disrespectful advances are zero-tolerance violations.'
    },
    {
      num: '৪. পেমেন্ট ও বাতিলকরণ নীতি (Payment & Cancellation Policy)',
      numEn: '4. Payment & Cancellation',
      contentBn: 'সকল পেমেন্ট প্ল্যাটফর্মের মাধ্যমে (bKash, Nagad, Card) প্রক্রিয়া করতে হবে। বুকিং শুরুর ২৪ ঘণ্টা আগে বাতিল করলে সম্পূর্ণ রিফান্ড প্রদান করা হয়।',
      contentEn: 'All payments must proceed exclusively through the platform escrow. Cancellations made at least 24 hours prior to the session are 100% refunded.'
    },
    {
      num: '৫. দায়বদ্ধতা সীমাবদ্ধতা (Limitation of Liability)',
      numEn: '5. Limitation of Liability',
      contentBn: 'NeverAlone একটি প্রযুক্তিনির্ভর সংযোগকারী প্ল্যাটফর্ম হিসেবে কাজ করে। ব্যবহারকারী ও কম্প্যানিয়নের মধ্যে সংঘটিত সাক্ষাতের জন্য প্ল্যাটফর্ম যুক্তিসঙ্গত নিরাপত্তা সতর্কতা ও ভেরিফিকেশন নিশ্চিত করে, তবে প্রত্যক্ষ বা পরোক্ষ ক্ষতিতে স্থানীয় আইন অনুযায়ী দায়বদ্ধতা সীমিত।',
      contentEn: 'NeverAlone acts as a neutral technology intermediary connecting verified individuals with reasonable precautions. Liability is limited in accordance with applicable laws.'
    },
    {
      num: '৬. অ্যাকাউন্ট বাতিলকরণ (Account Termination)',
      numEn: '6. Account Termination',
      contentBn: 'নীতিমালা লঙ্ঘনের ক্ষেত্রে প্ল্যাটফর্ম যেকোনো সময় কোনো পূর্ব নোটিশ ছাড়াই অ্যাকাউন্ট সাময়িক স্থগিত বা স্থায়ীভাবে বাতিল করার অধিকার রাখে।',
      contentEn: 'NeverAlone reserves the right to immediately suspend or permanently ban any account found violating safety, platonic, or legal guidelines.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>{language === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms & Conditions'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {language === 'bn' ? 'শর্তাবলী ও আচরণবিধি (Terms of Service)' : 'Terms of Service & Behavioral Agreement'}
        </h1>
        <p className="text-xs text-slate-400">
          {language === 'bn' ? 'সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬ • আইনি পর্যালোচনা কাঠামো' : 'Last Updated: September 2026 • Legal Framework'}
        </p>
      </div>

      {/* Platonic Banner */}
      <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          {language === 'bn'
            ? 'NeverAlone ব্যবহার করার মাধ্যমে আপনি নিশ্চিত করছেন যে আপনি শুধুমাত্র অ-রোমান্টিক ও প্ল্যাটোনিক সঙ্গ সেবার শর্তে সম্মত এবং আমাদের জিরো-টলারেন্স পলিসি মেনে চলবেন।'
            : 'By accessing NeverAlone, you expressly acknowledge and agree that this is a purely platonic and respectful platform.'}
        </div>
      </div>

      {/* Terms Sections */}
      <div className="space-y-6">
        {terms.map((t, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? t.num : t.numEn}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 pl-6 leading-relaxed">
              {language === 'bn' ? t.contentBn : t.contentEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
