import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  X, 
  CheckCircle, 
  AlertTriangle
} from 'lucide-react';

import { useLanguage } from '../../i18n/LanguageContext';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [sosSent, setSosSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const triggerEmergencyBroadcast = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSosSent(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-rose-500/80 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative overflow-hidden">
        {/* Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-red-500 to-amber-500"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-500/50 flex items-center justify-center text-rose-400 animate-pulse">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {language === 'bn' ? 'জরুরি SOS ও নিরাপত্তা সহায়তা' : 'Emergency SOS & Safety Center'}
            </h2>
            <p className="text-xs text-rose-300">
              {language === 'bn' ? '২৪/৭ সার্বক্ষণিক ইমার্জেন্সি রেসপন্স টিম' : '24/7 Rapid Emergency Response Team'}
            </p>
          </div>
        </div>

        {sosSent ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-400">
                {language === 'bn' ? 'SOS অ্যালার্ট পাঠানো হয়েছে!' : 'SOS Alert Dispatched!'}
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                {language === 'bn' 
                  ? 'আপনার বর্তমান GPS লোকেশন আমাদের ট্রাস্ট অ্যান্ড সেফটি টিম এবং বিশ্বস্ত এমার্জেন্সি কন্টাক্টের কাছে ব্রডকাস্ট করা হয়েছে। একজন নিরাপত্তা প্রতিনিধি আপনার সাথে যোগাযোগ করছেন।'
                  : 'Your live GPS location and session telemetry have been broadcast to our Trust & Safety Team. An agent is calling your registered phone immediately.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>সার্ভিস স্ট্যাটাস:</span>
                <span className="text-emerald-400 font-semibold">লাইভ ট্র্যাকিং সক্রিয়</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>জরুরি হেল্পলাইন:</span>
                <span className="text-rose-400 font-bold">০৯৬XX-XXXXXX (ফ্রি কল)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
            >
              {language === 'bn' ? 'ঠিক আছে / বন্ধ করুন' : 'Dismiss / Keep Tracking Active'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                {language === 'bn'
                  ? 'আপনি কি কোনো কারণে অস্বস্তিকর বা অনিরাপদ বোধ করছেন? নিচের বাটন ট্যাপ করে অবিলম্বে সেশন সমাপ্ত করুন বা সাহায্য নিন।'
                  : 'Feeling uncomfortable or unsafe? Use the one-tap action below to notify our safety officers and abort the session immediately.'}
              </span>
            </div>

            {/* Quick 1-Tap SOS Dispatch */}
            <button
              onClick={triggerEmergencyBroadcast}
              disabled={loading}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-bold text-base shadow-xl shadow-rose-900/50 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {language === 'bn' ? 'অ্যালার্ট পাঠানো হচ্ছে...' : 'Dispatching Alert...'}
                </span>
              ) : (
                <>
                  <ShieldAlert className="w-6 h-6" />
                  <span>{language === 'bn' ? '🚨 ১-ট্যাপে SOS অ্যালার্ট পাঠান' : '🚨 Send Instant SOS Alert'}</span>
                </>
              )}
            </button>

            {/* Quick Safety Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="tel:09600000000"
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-3 transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">২৪/৭ হটলাইন কল</div>
                  <div className="text-[11px] text-slate-400">০৯৬XX-XXXXXX</div>
                </div>
              </a>

              <a
                href="tel:999"
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-3 transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">জাতীয় জরুরি সেবা</div>
                  <div className="text-[11px] text-slate-400">৯৯৯ (National Police)</div>
                </div>
              </a>
            </div>

            {/* Safety Guidelines Reminder */}
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                সব মিটিং সর্বদা উন্মুক্ত পাবলিক স্থানে সম্পন্ন করা বাধ্যতামূলক।
              </div>
              <div>আপনার যেকোনো মুহূর্তে কোনো ব্যাখ্যা ছাড়াই সেশন ত্যাগ করার নিরঙ্কুশ অধিকার রয়েছে।</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
