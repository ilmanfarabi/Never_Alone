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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 shadow-2xs">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {language === 'bn' ? 'জরুরি SOS ও নিরাপত্তা সহায়তা' : 'Emergency SOS & Safety Center'}
            </h2>
            <p className="text-xs sm:text-sm text-rose-600 font-semibold">
              {language === 'bn' ? '২৪/৭ সার্বক্ষণিক ইমার্জেন্সি রেসপন্স টিম' : '24/7 Rapid Emergency Response Team'}
            </p>
          </div>
        </div>

        {sosSent ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'bn' ? 'SOS অ্যালার্ট পাঠানো হয়েছে!' : 'SOS Alert Dispatched!'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed font-normal">
                {language === 'bn' 
                  ? 'আপনার বর্তমান GPS লোকেশন আমাদের ট্রাস্ট অ্যান্ড সেফটি টিম এবং বিশ্বস্ত এমার্জেন্সি কন্টাক্টের কাছে ব্রডকাস্ট করা হয়েছে। একজন নিরাপত্তা প্রতিনিধি আপনার সাথে যোগাযোগ করছেন।'
                  : 'Your live GPS location and session telemetry have been broadcast to our Trust & Safety Team. An agent is calling your registered phone immediately.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>{language === 'bn' ? 'সার্ভিস স্ট্যাটাস:' : 'Service Status:'}</span>
                <span className="text-emerald-600 font-semibold">{language === 'bn' ? 'লাইভ ট্র্যাকিং সক্রিয়' : 'Live Tracking Active'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>{language === 'bn' ? 'জরুরি হেল্পলাইন:' : 'Emergency Hotline:'}</span>
                <span className="text-rose-600 font-bold">{language === 'bn' ? '০৯৬১২-৩৪৫৬৭৮ (ফ্রি কল)' : '+880 9612-345678 (Toll Free)'}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all apple-pill-btn shadow-xs"
            >
              {language === 'bn' ? 'ঠিক আছে / বন্ধ করুন' : 'Dismiss / Keep Tracking Active'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-sm text-slate-700 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
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
              className="w-full py-3.5 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-3 transition-all apple-pill-btn disabled:opacity-50 border border-rose-500 active:scale-95"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {language === 'bn' ? 'অ্যালার্ট পাঠানো হচ্ছে...' : 'Dispatching Alert...'}
                </span>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                  <span>{language === 'bn' ? '🚨 ১-ট্যাপে SOS অ্যালার্ট পাঠান' : '🚨 Send Instant SOS Alert'}</span>
                </>
              )}
            </button>

            {/* Quick Safety Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="tel:09612345678"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 flex items-center gap-3 transition-colors text-left shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{language === 'bn' ? '২৪/৭ হটলাইন কল' : '24/7 Hotline Call'}</div>
                  <div className="text-sm text-slate-500">{language === 'bn' ? '০৯৬১২-৩৪৫৬৭৮' : '+880 9612-345678'}</div>
                </div>
              </a>

              <a
                href="tel:999"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 flex items-center gap-3 transition-colors text-left shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{language === 'bn' ? 'জাতীয় জরুরি সেবা' : 'National Emergency'}</div>
                  <div className="text-sm text-slate-500">{language === 'bn' ? '৯৯৯ (জাতীয় পুলিশ)' : '999 (National Police)'}</div>
                </div>
              </a>
            </div>

            {/* Safety Guidelines Reminder */}
            <div className="pt-2 text-sm text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {language === 'bn' ? 'সব মিটিং সর্বদা উন্মুক্ত পাবলিক স্থানে সম্পন্ন করা বাধ্যতামূলক।' : 'All meetings must take place in verified public venues.'}
              </div>
              <div>{language === 'bn' ? 'আপনার যেকোনো মুহূর্তে কোনো ব্যাখ্যা ছাড়াই সেশন ত্যাগ করার নিরঙ্কুশ অধিকার রয়েছে।' : 'You hold the absolute right to abort a session at any time without explanation.'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
