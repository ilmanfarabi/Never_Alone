import React, { useState } from 'react';
import { 
  UserPlus, 
  X, 
  CheckCircle, 
  Upload, 
  ArrowRight,
  ArrowLeft,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../i18n/LanguageContext';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '24',
    gender: 'female',
    city: 'Dhaka',
    area: '',
    languages: 'Bengali, English',
    hourlyRate: 1000,
    hoursPerWeek: 12,
    nidNumber: '',
    bio: '',
    agreeToCodeOfConduct: false,
    agreeToPlatonicPledge: false,
    agreeToBackgroundCheck: false
  });

  if (!isOpen) return null;

  const estimatedMonthlyIncome = formData.hoursPerWeek * 4 * formData.hourlyRate * 0.85; // after 15% platform commission

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1200);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 text-slate-900 shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {language === 'bn' ? 'হোস্ট/কম্প্যানিয়ন আবেদন' : 'Join Application'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'সম্মানজনক সঙ্গ দিন ও আয় করুন' : 'Earn respectfully on your own schedule'}
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

        {/* Progress Bar */}
        {!submitted && (
          <div className="py-3 shrink-0">
            <div className="flex items-center justify-between text-sm text-slate-500 mb-1.5 font-medium">
              <span>{language === 'bn' ? `ধাপ ${step} / ৩: ` : `Step ${step} of 3: `}
                {step === 1 && (language === 'bn' ? 'মৌলিক তথ্য ও পরিচয়' : 'Basic Info')}
                {step === 2 && (language === 'bn' ? 'রেট ও আয় গণনা' : 'Rates & Income')}
                {step === 3 && (language === 'bn' ? 'ভেরিফিকেশন ও সম্মতি' : 'Verification & Pledge')}
              </span>
              <span className="text-blue-600 font-semibold">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="overflow-y-auto flex-1 pr-1 py-2">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {language === 'bn' ? 'আবেদন সফলভাবে জমা হয়েছে!' : 'Application Submitted!'}
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  {language === 'bn'
                    ? 'NeverAlone-এ আবেদন করার জন্য ধন্যবাদ। আমাদের ট্রাস্ট অ্যান্ড সেফটি টিম আপনার জাতীয় পরিচয়পত্র ও ব্যাকগ্রাউন্ড যাচাই করবে। আগামী ২৪–৪৮ ঘণ্টার মধ্যে একটি কনফার্মেশন এসএমএস ও ইমেইল পাবেন।'
                    : 'Thank you for applying. Our Trust & Safety team will review your NID & background details. You will receive an SMS and orientation invite within 24-48 hours.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>আবেদন ট্র্যাকিং নম্বর:</span>
                  <span className="font-mono font-bold text-blue-600">COMP-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>প্রত্যাশিত মাসিক সম্ভাব্য আয়:</span>
                  <span className="font-bold text-blue-600 font-mono">৳ {Math.round(estimatedMonthlyIncome).toLocaleString()} / মাস</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all apple-pill-btn shadow-md"
              >
                {language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleNext} className="space-y-4 text-sm">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {language === 'bn' ? 'সম্পূর্ণ নাম (NID)' : 'Full Name (NID)'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Farhana Ahmed"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="017XXXXXXXX"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {language === 'bn' ? 'বয়স (১৮+)' : 'Age (18+)'}
                      </label>
                      <input
                        type="number"
                        min="18"
                        max="70"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {language === 'bn' ? 'শহর' : 'City'}
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      >
                        <option value="Dhaka">Dhaka (ঢাকা)</option>
                        <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                        <option value="Sylhet">Sylhet (সিলেট)</option>
                        <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                        <option value="Khulna">Khulna (খুলনা)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {language === 'bn' ? 'এলাকা' : 'Area'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        placeholder="e.g. Dhanmondi"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {language === 'bn' ? 'জানা ভাষা' : 'Languages'}
                    </label>
                    <input
                      type="text"
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      placeholder="e.g. Bengali, English"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {language === 'bn' ? 'সংক্ষিপ্ত পরিচয় (Bio)' : 'Bio / Interests'}
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder={language === 'bn' ? 'আপনার আগ্রহ ও শখ সংক্ষেপে লিখুন...' : 'Brief description of interests & personality...'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Pricing & Income Estimator */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 font-medium">{language === 'bn' ? 'ঘণ্টাপ্রতি রেট নির্ধারণ:' : 'Hourly Rate Set by You:'}</span>
                      <span className="text-sm font-bold text-blue-600">৳ {formData.hourlyRate} / ঘণ্টা</span>
                    </div>
                    <input
                      type="range"
                      min="600"
                      max="2500"
                      step="50"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>{language === 'bn' ? '৳ ৬০০ (বেসিক)' : '৳ 600 (Basic)'}</span>
                      <span>{language === 'bn' ? '৳ ১,৫০০ (স্ট্যান্ডার্ড)' : '৳ 1,500 (Standard)'}</span>
                      <span>{language === 'bn' ? '৳ ২,৫০০ (প্রিমিয়াম)' : '৳ 2,500 (Premium)'}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 font-medium">{language === 'bn' ? 'সপ্তাহে সম্ভাব্য সময় (ঘণ্টা):' : 'Estimated Weekly Hours:'}</span>
                      <span className="text-sm font-bold text-blue-600">
                        {formData.hoursPerWeek} {language === 'bn' ? 'ঘণ্টা / সপ্তাহ' : 'hrs / week'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="35"
                      step="1"
                      value={formData.hoursPerWeek}
                      onChange={(e) => setFormData({ ...formData, hoursPerWeek: Number(e.target.value) })}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Projected Payout Box */}
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-700 font-medium">
                        {language === 'bn' ? 'আনুমানিক সম্ভাব্য মাসিক আয় (১৫% কমিশন বাদে):' : 'Estimated Monthly Payout (after 15% fee):'}
                      </div>
                      <div className="text-2xl font-extrabold text-blue-600 mt-0.5 font-mono">
                        ৳ {Math.round(estimatedMonthlyIncome).toLocaleString()} <span className="text-sm text-slate-600 font-normal">{language === 'bn' ? '/ মাস' : '/ month'}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      ৳
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {language === 'bn'
                      ? '* কম্প্যানিয়নরা সরাসরি তাদের নিজস্ব রেট ও সময়সূচি নির্ধারণ করতে পারেন। NeverAlone শুধুমাত্র প্ল্যাটফর্ম চার্জ (১৫%) গ্রহণ করে, বাকি অর্থ সরাসরি আপনার bKash/Bank-এ ট্রান্সফার হবে।'
                      : '* Companions set their own hourly rates and schedules. NeverAlone only retains a 15% platform escrow fee; remaining earnings are directly transferred to your bKash/Bank account.'}
                  </p>
                </div>
              )}

              {/* Step 3: Verification & Platonic Pledge */}
              {step === 3 && (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {language === 'bn' ? 'জাতীয় পরিচয়পত্র (NID / Smart Card)' : 'National ID / Passport Number'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nidNumber}
                      onChange={(e) => setFormData({ ...formData, nidNumber: e.target.value })}
                      placeholder="e.g. 1998XXXXXXXXXX"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                    
                    {/* Simulated Document Upload Dropzone */}
                    <div className="mt-1.5 border border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-2.5 text-center cursor-pointer bg-white transition-colors">
                      <Upload className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <div className="text-xs text-slate-700 font-medium">
                        {language === 'bn' ? 'NID / পাসপোর্ট ছবি সংযুক্ত করুন' : 'Upload NID / Passport photo'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {language === 'bn' ? 'JPG, PNG বা PDF (সর্বোচ্চ ৫ MB)' : 'JPG, PNG or PDF (Max 5 MB)'}
                      </div>
                    </div>
                  </div>

                  {/* Mandatory Checkboxes */}
                  <div className="space-y-1 text-[11px]">
                    <label className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeToPlatonicPledge}
                        onChange={(e) => setFormData({ ...formData, agreeToPlatonicPledge: e.target.checked })}
                        className="rounded accent-blue-600 w-3.5 h-3.5 shrink-0"
                      />
                      <span className="text-slate-600 font-normal">
                        {language === 'bn' ? '১০০% প্ল্যাটোনিক সেবা' : '100% Platonic Service'}
                      </span>
                    </label>

                    <label className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeToCodeOfConduct}
                        onChange={(e) => setFormData({ ...formData, agreeToCodeOfConduct: e.target.checked })}
                        className="rounded accent-blue-600 w-3.5 h-3.5 shrink-0"
                      />
                      <span className="text-slate-600 font-normal">
                        {language === 'bn' ? 'শুধুমাত্র পাবলিক ভেন্যু' : 'Public Venue Only'}
                      </span>
                    </label>

                    <label className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeToBackgroundCheck}
                        onChange={(e) => setFormData({ ...formData, agreeToBackgroundCheck: e.target.checked })}
                        className="rounded accent-blue-600 w-3.5 h-3.5 shrink-0"
                      />
                      <span className="text-slate-600 font-normal">
                        {language === 'bn' ? 'NID যাচাইকরণে সম্মতি' : 'NID & Screening Consent'}
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold flex items-center gap-1.5 apple-pill-btn"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    {language === 'bn' ? 'পূর্ববর্তী' : 'Back'}
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  disabled={loading}
                  className="py-2.5 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md flex items-center gap-1.5 ml-auto apple-pill-btn"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : step === 3 ? (
                    <>
                      <FileCheck className="w-4 h-4" />
                      <span>{language === 'bn' ? 'আবেদন চূড়ান্ত করুন' : 'Complete Application'}</span>
                    </>
                  ) : (
                    <>
                      <span>{language === 'bn' ? 'পরবর্তী ধাপ' : 'Continue'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
