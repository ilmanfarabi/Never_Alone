import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  UserX, 
  Lock 
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName?: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, targetName }) => {
  const { language } = useLanguage();
  const [reportType, setReportType] = useState('romantic_proposal');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative overflow-hidden">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {language === 'bn' ? 'নীতিমালা লঙ্ঘন রিপোর্ট করুন' : 'Report Policy Violation'}
            </h2>
            <p className="text-xs sm:text-sm text-blue-600 font-semibold">
              {language === 'bn' ? 'জিরো-টলারেন্স পলিসি • ২৪ ঘণ্টার মধ্যে ব্যবস্থা গ্রহণ' : 'Zero-Tolerance Policy • Reviewed within 24 hours'}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'bn' ? 'রিপোর্ট সফলভাবে গৃহীত হয়েছে' : 'Report Received Successfully'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed font-normal">
                {language === 'bn'
                  ? 'আপনার রিপোর্টটি আমাদের ট্রাস্ট অ্যান্ড সেফটি টিম অত্যন্ত গুরুত্ব সহকারে তদন্ত করছে। নীতিমালা লঙ্ঘিত হলে সংশ্লিষ্ট অ্যাকাউন্ট অবিলম্বে স্থায়ীভাবে ব্যান করা হবে।'
                  : 'Our Trust & Safety Team is investigating this case with top priority. Any violation of our platonic code results in immediate lifetime ban.'}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-left text-sm space-y-1 text-slate-700 border border-slate-200">
              <div className="text-sm text-slate-500">রিপোর্ট ট্র্যাকিং আইডি:</div>
              <div className="font-mono text-blue-600 font-semibold">REP-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold apple-pill-btn shadow-xs"
            >
              {language === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
              {language === 'bn'
                ? 'NeverAlone-এ কোনো ধরনের রোমান্টিক, যৌন, ব্যক্তিগত বা অমর্যাদাকর আচরণ সহ্য করা হয় না। আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে।'
                : 'NeverAlone maintains zero tolerance for romantic advances, harassment, or unsafe conduct. Your report remains 100% confidential.'}
            </div>

            {targetName && (
              <div className="text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 flex items-center justify-between">
                <span>রিপোর্টের আওতাভুক্ত ব্যক্তি:</span>
                <span className="font-semibold text-slate-900">{targetName}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {language === 'bn' ? 'লঙ্ঘনের ধরন নির্বাচন করুন:' : 'Select Violation Type:'}
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
              >
                <option value="romantic_proposal">
                  {language === 'bn' ? 'রোমান্টিক বা যৌন প্রস্তাব (Romantic/Sexual Proposal)' : 'Romantic or Sexual Proposal'}
                </option>
                <option value="private_location">
                  {language === 'bn' ? 'ব্যক্তিগত স্থানে যাওয়ার অনুরোধ (Private Place Request)' : 'Private Venue / Location Request'}
                </option>
                <option value="harassment">
                  {language === 'bn' ? 'অমর্যাদাকর বা আক্রমণাত্মক আচরণ (Harassment / Rude Behavior)' : 'Harassment or Disrespectful Behavior'}
                </option>
                <option value="cash_payment">
                  {language === 'bn' ? 'প্ল্যাটফর্মের বাইরে অননুমোদিত নগদ লেনদেন (Off-platform Payment)' : 'Off-platform Cash Transaction Demand'}
                </option>
                <option value="other">
                  {language === 'bn' ? 'অন্যান্য নিরাপত্তা সমস্যা (Other Safety Concern)' : 'Other Safety Concern'}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {language === 'bn' ? 'বিস্তারিত বর্ণনা (কী ঘটেছিল):' : 'Detailed Description (What happened):'}
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={language === 'bn' ? 'ঘটনার স্থান, সময় এবং বিস্তারিত বিবরণ উল্লেখ করুন...' : 'Describe the incident in detail...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{language === 'bn' ? 'আপনার তথ্য সম্পূর্ণ এনক্রিপ্টেড ও সুরক্ষিত থাকবে।' : 'Your identity is strictly protected under encryption.'}</span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold apple-pill-btn"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={loading || !description.trim()}
                className="flex-1 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold shadow-xs flex items-center justify-center gap-1.5 apple-pill-btn"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'রিপোর্ট জমা দিন' : 'Submit Report'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
