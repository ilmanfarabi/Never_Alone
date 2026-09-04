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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative overflow-hidden">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-rose-950 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {language === 'bn' ? 'নীতিমালা লঙ্ঘন বা অসদাচরণ রিপোর্ট করুন' : 'Report Policy Violation / Incident'}
            </h2>
            <p className="text-xs text-rose-300">
              {language === 'bn' ? 'জিরো-টলারেন্স পলিসি • ২৪ ঘণ্টার মধ্যে ব্যবস্থা গ্রহণ' : 'Zero-Tolerance Policy • Reviewed within 24 hours'}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-400">
                {language === 'bn' ? 'রিপোর্ট সফলভাবে গৃহীত হয়েছে' : 'Report Received Successfully'}
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                {language === 'bn'
                  ? 'আপনার রিপোর্টটি আমাদের ট্রাস্ট অ্যান্ড সেফটি টিম অত্যন্ত গুরুত্ব সহকারে তদন্ত করছে। নীতিমালা লঙ্ঘিত হলে সংশ্লিষ্ট অ্যাকাউন্ট অবিলম্বে স্থায়ীভাবে ব্যান করা হবে।'
                  : 'Our Trust & Safety Team is investigating this case with top priority. Any violation of our platonic code results in immediate lifetime ban.'}
              </p>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl text-left text-xs space-y-1 text-slate-300 border border-slate-700">
              <div className="text-[11px] text-slate-400">রিপোর্ট ট্র্যাকিং আইডি:</div>
              <div className="font-mono text-indigo-300 font-semibold">REP-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              {language === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/20 text-xs text-rose-200">
              {language === 'bn'
                ? 'NeverAlone-এ কোনো ধরনের রোমান্টিক, যৌন, ব্যক্তিগত বা অমর্যাদাকর আচরণ সহ্য করা হয় না। আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে।'
                : 'NeverAlone maintains zero tolerance for romantic advances, harassment, or unsafe conduct. Your report remains 100% confidential.'}
            </div>

            {targetName && (
              <div className="text-xs text-slate-300 bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 flex items-center justify-between">
                <span>রিপোর্টের আওতাভুক্ত ব্যক্তি:</span>
                <span className="font-semibold text-white">{targetName}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'লঙ্ঘনের ধরন নির্বাচন করুন:' : 'Select Violation Type:'}
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="romantic_proposal">
                  {language === 'bn' ? 'রোমান্টিক বা যৌন প্রস্তাব (Romantic/Sexual Proposal)' : 'Romantic or Sexual Proposal'}
                </option>
                <option value="private_location">
                  {language === 'bn' ? 'ব্যক্তিগত স্থানে যাওয়ার অনুরোধ (Private Place Request)' : 'Private Venue / Location Request'}
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
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'বিস্তারিত বর্ণনা (কী ঘটেছিল):' : 'Detailed Description (What happened):'}
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={language === 'bn' ? 'ঘটনার স্থান, সময় এবং বিস্তারিত বিবরণ উল্লেখ করুন...' : 'Describe the incident in detail...'}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{language === 'bn' ? 'আপনার তথ্য সম্পূর্ণ এনক্রিপ্টেড ও সুরক্ষিত থাকবে।' : 'Your identity is strictly protected under encryption.'}</span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={loading || !description.trim()}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5"
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
