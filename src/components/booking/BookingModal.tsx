import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  CheckCircle, 
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Companion } from '../../types';
import { occasionsData } from '../../data/occasions';
import { useLanguage } from '../../i18n/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  companion: Companion | null;
  defaultOccasionId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  companion,
  defaultOccasionId = 'dinner-date'
}) => {
  const { language } = useLanguage();
  const [selectedOccasion, setSelectedOccasion] = useState(defaultOccasionId);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('18:30');
  const [durationHours, setDurationHours] = useState(2);
  const [venueName, setVenueName] = useState('Crimson Cup Coffee / North End');
  const [venueAddress, setVenueAddress] = useState('Gulshan-2, Dhaka');
  const [specialNotes, setSpecialNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card' | 'wallet'>('bkash');
  const [agreePlatonic, setAgreePlatonic] = useState(false);
  const [agreePublicOnly, setAgreePublicOnly] = useState(false);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [generatedPin, setGeneratedPin] = useState('');

  if (!isOpen || !companion) return null;

  const basePrice = companion.hourlyRate * durationHours;
  const platformFee = Math.round(basePrice * 0.15);
  const totalAmount = basePrice + platformFee;

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreePlatonic || !agreePublicOnly) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedPin(randomPin);
      setBookingConfirmed(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const handleResetAndClose = () => {
    setBookingConfirmed(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 text-white shadow-2xl relative overflow-hidden max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src={companion.image} 
              alt={companion.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/50"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? companion.nameBn : companion.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  {language === 'bn' ? 'ভেরিফায়েড' : 'Verified'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'bn' ? `${companion.cityBn} • ৳ ${companion.hourlyRate} / ঘণ্টা` : `${companion.city} • ৳ ${companion.hourlyRate} / hr`}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 pr-1 py-3 text-xs">
          {bookingConfirmed ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-400">
                  {language === 'bn' ? 'বুকিং সফলভাবে নিশ্চিত করা হয়েছে!' : 'Booking Confirmed Successfully!'}
                </h3>
                <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                  {language === 'bn' 
                    ? `আপনার বুকিং রিকোয়েস্ট গৃহীত হয়েছে। ${companion.nameBn} এর সাথে পাবলিক স্থানে সাক্ষাতের সময় নিচের সেফটি পিন (PIN) টি প্রদর্শন করুন।`
                    : `Your booking request has been locked in. Please show the 4-digit Safety PIN to ${companion.name} upon arrival at the public venue.`}
                </p>
              </div>

              {/* Safety Check-in PIN Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-950 border border-indigo-500/40 max-w-sm mx-auto space-y-2 text-center">
                <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">
                  {language === 'bn' ? 'ইন-অ্যাপ সেফটি চেক-ইন পিন' : 'In-App Safety Check-in PIN'}
                </div>
                <div className="text-3xl font-mono font-extrabold tracking-widest text-white py-1">
                  {generatedPin}
                </div>
                <div className="text-[10px] text-slate-400">
                  {language === 'bn' ? 'পাবলিক প্লেসে মিটিং শুরুর সময় উভয়পক্ষ এই পিন ম্যাচ করবেন' : 'Match this PIN with your companion before beginning the session'}
                </div>
              </div>

              {/* Summary Details */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>কম্প্যানিয়ন:</span>
                  <span className="font-semibold text-white">{language === 'bn' ? companion.nameBn : companion.name}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>তারিখ ও সময়:</span>
                  <span className="text-indigo-300 font-medium">{date} | {time} ({durationHours} ঘণ্টা)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>পাবলিক ভেন্যু:</span>
                  <span className="text-white">{venueName}, {venueAddress}</span>
                </div>
                <div className="flex justify-between text-slate-300 border-t border-slate-700 pt-2 font-bold">
                  <span>পরিশোধিত মোট:</span>
                  <span className="text-emerald-400 text-sm">৳ {totalAmount.toLocaleString()} ({paymentMethod.toUpperCase()})</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full max-w-md py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
              >
                {language === 'bn' ? 'ঠিক আছে / বন্ধ করুন' : 'Done / View My Bookings'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookSession} className="space-y-4">
              {/* Platonic Quick Reminder */}
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/20 text-rose-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  {language === 'bn' 
                    ? 'স্মরণ রাখবেন: এটি কঠোরভাবে একটি অ-রোমান্টিক ও প্ল্যাটোনিক সার্ভিস।' 
                    : 'Reminder: This booking is strictly non-romantic and platonic.'}
                </span>
              </div>

              {/* Client Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'আপনার নাম:' : 'Your Full Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Mahir Rahman"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর:' : 'Phone Number:'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Occasion Selector */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {language === 'bn' ? 'উপলক্ষ / সার্ভিসের ধরন নির্বাচন করুন:' : 'Select Occasion / Service:'}
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {occasionsData.map((occ) => (
                    <option key={occ.id} value={occ.id}>
                      {language === 'bn' ? occ.titleBn : occ.title} ({occ.typicalRate})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date, Time, Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'তারিখ:' : 'Date:'}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'শুরুর সময়:' : 'Start Time:'}
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'সময়কাল (ঘণ্টা):' : 'Duration (Hours):'}
                  </label>
                  <select
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value={1}>১ ঘণ্টা (1 Hour)</option>
                    <option value={2}>২ ঘণ্টা (2 Hours - Basic)</option>
                    <option value={3}>৩ ঘণ্টা (3 Hours)</option>
                    <option value={4}>৪ ঘণ্টা (4 Hours - Standard)</option>
                    <option value={6}>৬ ঘণ্টা (6 Hours - Half Day)</option>
                    <option value={8}>৮ ঘণ্টা (8 Hours - Full Day Event)</option>
                  </select>
                </div>
              </div>

              {/* Public Venue Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'পাবলিক ভেন্যুর নাম:' : 'Public Venue Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. Gloria Jean's / Star Cineplex"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'ভেন্যুর ঠিকানা ও এলাকা:' : 'Venue Address & Area:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="e.g. Dhanmondi 27, Dhaka"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {language === 'bn' ? 'বিশেষ নির্দেশনা বা বিষয় (ঐচ্ছিক):' : 'Notes / Special Topic (Optional):'}
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: বোন এর বিয়েতে প্লাস-ওয়ান / আইইএলটিএস কথা বলা' : 'e.g. Wedding plus-one / IELTS speaking'}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Payment Methods Selector */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  {language === 'bn' ? 'পেমেন্ট পদ্ধতি নির্বাচন করুন:' : 'Select Payment Method:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'bkash'
                        ? 'bg-pink-950/60 border-pink-500 text-pink-300 ring-1 ring-pink-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-xs">bKash</span>
                    <span className="text-[10px]">বিকাশ পেমেন্ট</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'nagad'
                        ? 'bg-orange-950/60 border-orange-500 text-orange-300 ring-1 ring-orange-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-xs">Nagad</span>
                    <span className="text-[10px]">নগদ পেমেন্ট</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-blue-950/60 border-blue-500 text-blue-300 ring-1 ring-blue-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-xs">Card</span>
                    <span className="text-[10px]">Visa / Mastercard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'wallet'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-xs">In-App Wallet</span>
                    <span className="text-[10px]">ব্যালেন্স: ৳ ৫,০০০</span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>কম্প্যানিয়ন ফি ({durationHours} ঘণ্টা × ৳{companion.hourlyRate}):</span>
                  <span>৳ {basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>প্ল্যাটফর্ম এসক্রো ও সেফটি চার্জ (১৫%):</span>
                  <span>৳ {platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-slate-800">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="text-emerald-400">৳ {totalAmount.toLocaleString()} BDT</span>
                </div>
              </div>

              {/* Compulsory Policy Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2.5 p-2 rounded-xl bg-rose-950/30 border border-rose-500/20 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreePlatonic}
                    onChange={(e) => setAgreePlatonic(e.target.checked)}
                    className="mt-0.5 rounded accent-rose-500 w-4 h-4"
                  />
                  <span className="text-[11px] text-rose-200 leading-tight">
                    <strong>১০০% প্ল্যাটোনিক শর্তে সম্মতি:</strong> আমি নিশ্চিত করছি যে এই সেশনটি সম্পূর্ণ অ-রোমান্টিক ও অ-যৌন। কোনো অনুপযুক্ত আচরণের চেষ্টা করলে আমার অ্যাকাউন্ট অবিলম্বে ব্যান হবে।
                  </span>
                </label>

                <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreePublicOnly}
                    onChange={(e) => setAgreePublicOnly(e.target.checked)}
                    className="mt-0.5 rounded accent-indigo-500 w-4 h-4"
                  />
                  <span className="text-[11px] text-slate-300 leading-tight">
                    আমি সম্মতি দিচ্ছি যে সাক্ষাৎটি কেবল একটি <strong>পাবলিক স্থানে</strong> অনুষ্ঠিত হবে এবং নগদ লেনদেন করা হবে না।
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isProcessing || !agreePlatonic || !agreePublicOnly}
                  className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 text-white font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>নিরাপদ পেমেন্ট প্রক্রিয়াধীন...</span>
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>{language === 'bn' ? `পেমেন্ট ও বুকিং কনফার্ম করুন (৳ ${totalAmount.toLocaleString()})` : `Confirm & Pay ৳ ${totalAmount.toLocaleString()}`}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
