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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleResetAndClose = () => {
    setBookingConfirmed(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 text-slate-900 shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src={companion.image} 
              alt={companion.name} 
              className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {language === 'bn' ? companion.nameBn : companion.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-semibold">
                  {language === 'bn' ? 'ভেরিফায়েড' : 'Verified'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                {language === 'bn' ? `${companion.cityBn} • ৳ ${companion.hourlyRate} / ঘণ্টা` : `${companion.city} • ৳ ${companion.hourlyRate} / hr`}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 pr-1 py-3 text-sm">
          {bookingConfirmed ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'bn' ? 'বুকিং সফলভাবে নিশ্চিত করা হয়েছে!' : 'Booking Confirmed Successfully!'}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-md mx-auto leading-relaxed font-normal">
                  {language === 'bn' 
                    ? `আপনার বুকিং রিকোয়েস্ট গৃহীত হয়েছে। ${companion.nameBn} এর সাথে পাবলিক স্থানে সাক্ষাতের সময় নিচের সেফটি পিন (PIN) টি প্রদর্শন করুন।`
                    : `Your booking request has been locked in. Please show the 4-digit Safety PIN to ${companion.name} upon arrival at the public venue.`}
                </p>
              </div>

              {/* Safety Check-in PIN Card */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 max-w-sm mx-auto space-y-1.5 text-center">
                <div className="text-xs uppercase tracking-wider text-blue-700 font-bold">
                  {language === 'bn' ? 'ইন-অ্যাপ সেফটি চেক-ইন পিন' : 'In-App Safety Check-in PIN'}
                </div>
                <div className="text-3xl font-mono font-extrabold tracking-widest text-blue-600 py-1">
                  {generatedPin}
                </div>
                <div className="text-xs text-slate-500 font-normal">
                  {language === 'bn' ? 'পাবলিক প্লেসে মিটিং শুরুর সময় উভয়পক্ষ এই পিন ম্যাচ করবেন' : 'Match this PIN with your companion before beginning the session'}
                </div>
              </div>

              {/* Summary Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>কম্প্যানিয়ন:</span>
                  <span className="font-semibold text-slate-900">{language === 'bn' ? companion.nameBn : companion.name}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>তারিখ ও সময়:</span>
                  <span className="text-blue-600 font-medium">{date} | {time} ({durationHours} ঘণ্টা)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>পাবলিক ভেন্যু:</span>
                  <span className="text-slate-900">{venueName}, {venueAddress}</span>
                </div>
                <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2 font-bold">
                  <span>পরিশোধিত মোট:</span>
                  <span className="text-blue-600 text-sm font-mono">৳ {totalAmount.toLocaleString()} ({paymentMethod.toUpperCase()})</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full max-w-md py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all apple-pill-btn shadow-md"
              >
                {language === 'bn' ? 'ঠিক আছে / বন্ধ করুন' : 'Done / View My Bookings'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookSession} className="space-y-4">
              {/* Platonic Quick Reminder */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  {language === 'bn' 
                    ? 'স্মরণ রাখবেন: এটি কঠোরভাবে একটি অ-রোমান্টিক ও প্ল্যাটোনিক সার্ভিস।' 
                    : 'Reminder: This booking is strictly non-romantic and platonic.'}
                </span>
              </div>

              {/* Client Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'আপনার নাম:' : 'Your Full Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Mahir Rahman"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর:' : 'Phone Number:'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Occasion Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'উপলক্ষ / সার্ভিসের ধরন নির্বাচন করুন:' : 'Select Occasion / Service:'}
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
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
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'তারিখ:' : 'Date:'}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'শুরুর সময়:' : 'Start Time:'}
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'সময়কাল (ঘণ্টা):' : 'Duration (Hours):'}
                  </label>
                  <select
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
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
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'পাবলিক ভেন্যুর নাম:' : 'Public Venue Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. Gloria Jean's / Star Cineplex"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'ভেন্যুর ঠিকানা ও এলাকা:' : 'Venue Address & Area:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="e.g. Dhanmondi 27, Dhaka"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'বিশেষ নির্দেশনা বা বিষয় (ঐচ্ছিক):' : 'Notes / Special Topic (Optional):'}
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: বোন এর বিয়েতে প্লাস-ওয়ান / আইইএলটিএস কথা বলা' : 'e.g. Wedding plus-one / IELTS speaking'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              {/* Payment Methods Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  {language === 'bn' ? 'পেমেন্ট পদ্ধতি নির্বাচন করুন:' : 'Select Payment Method:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'bkash'
                        ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-sm">bKash</span>
                    <span className="text-sm">বিকাশ পেমেন্ট</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'nagad'
                        ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-sm">Nagad</span>
                    <span className="text-sm">নগদ পেমেন্ট</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-sm">Card</span>
                    <span className="text-sm">Visa / Mastercard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === 'wallet'
                        ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-sm">In-App Wallet</span>
                    <span className="text-sm">ব্যালেন্স: ৳ ৫,০০০</span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>কম্প্যানিয়ন ফি ({durationHours} ঘণ্টা × ৳{companion.hourlyRate}):</span>
                  <span>৳ {basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>প্ল্যাটফর্ম এসক্রো ও সেফটি চার্জ (১৫%):</span>
                  <span>৳ {platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="text-blue-600 font-mono">৳ {totalAmount.toLocaleString()} BDT</span>
                </div>
              </div>

              {/* Compulsory Policy Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreePlatonic}
                    onChange={(e) => setAgreePlatonic(e.target.checked)}
                    className="mt-0.5 rounded accent-blue-600 w-4 h-4"
                  />
                  <span className="text-sm text-slate-700 leading-tight">
                    <strong>১০০% প্ল্যাটোনিক শর্তে সম্মতি:</strong> আমি নিশ্চিত করছি যে এই সেশনটি সম্পূর্ণ অ-রোমান্টিক ও অ-যৌন। কোনো অনুপযুক্ত আচরণের চেষ্টা করলে আমার অ্যাকাউন্ট অবিলম্বে ব্যান হবে।
                  </span>
                </label>

                <label className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreePublicOnly}
                    onChange={(e) => setAgreePublicOnly(e.target.checked)}
                    className="mt-0.5 rounded accent-blue-600 w-4 h-4"
                  />
                  <span className="text-sm text-slate-700 leading-tight">
                    আমি সম্মতি দিচ্ছি যে সাক্ষাৎটি কেবল একটি <strong>পাবলিক স্থানে</strong> অনুষ্ঠিত হবে এবং নগদ লেনদেন করা হবে না।
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold apple-pill-btn"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isProcessing || !agreePlatonic || !agreePublicOnly}
                  className="py-2.5 px-6 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold shadow-md flex items-center gap-2 apple-pill-btn"
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
