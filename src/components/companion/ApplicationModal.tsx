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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 text-white shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {language === 'bn' ? 'কম্প্যানিয়ন হিসেবে যোগ দিন' : 'Become a Verified Companion'}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'bn' ? 'সম্মানজনক সঙ্গ দিন ও স্বাধীনভাবে আয় করুন' : 'Earn respectfully on your own schedule'}
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

        {/* Progress Bar */}
        {!submitted && (
          <div className="py-3 shrink-0">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>{language === 'bn' ? `ধাপ ${step} / ৩: ` : `Step ${step} of 3: `}
                {step === 1 && (language === 'bn' ? 'মৌলিক তথ্য ও পরিচয়' : 'Basic Info')}
                {step === 2 && (language === 'bn' ? 'রেট ও আয় গণনা' : 'Rates & Income')}
                {step === 3 && (language === 'bn' ? 'ভেরিফিকেশন ও সম্মতি' : 'Verification & Pledge')}
              </span>
              <span className="text-indigo-400 font-semibold">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="overflow-y-auto flex-1 pr-1 py-2">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-400">
                  {language === 'bn' ? 'আবেদন সফলভাবে জমা হয়েছে!' : 'Application Submitted!'}
                </h3>
                <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                  {language === 'bn'
                    ? 'NeverAlone-এ আবেদন করার জন্য ধন্যবাদ। আমাদের ট্রাস্ট অ্যান্ড সেফটি টিম আপনার জাতীয় পরিচয়পত্র ও ব্যাকগ্রাউন্ড যাচাই করবে। আগামী ২৪–৪৮ ঘণ্টার মধ্যে একটি কনফার্মেশন এসএমএস ও ইমেইল পাবেন।'
                    : 'Thank you for applying. Our Trust & Safety team will review your NID & background details. You will receive an SMS and orientation invite within 24-48 hours.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>আবেদন ট্র্যাকিং নম্বর:</span>
                  <span className="font-mono font-bold text-indigo-300">COMP-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>প্রত্যাশিত মাসিক সম্ভাব্য আয়:</span>
                  <span className="font-bold text-emerald-400">৳ {Math.round(estimatedMonthlyIncome).toLocaleString()} / মাস</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-indigo-600/30"
              >
                {language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleNext} className="space-y-4 text-xs">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        {language === 'bn' ? 'সম্পূর্ণ নাম (NID অনুযায়ী):' : 'Full Legal Name (as per NID):'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Farhana Ahmed"
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
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="017XXXXXXXX"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        {language === 'bn' ? 'বয়স (১৮+ বাধ্যতামূলক):' : 'Age (18+ Mandatory):'}
                      </label>
                      <input
                        type="number"
                        min="18"
                        max="70"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        {language === 'bn' ? 'শহর:' : 'City:'}
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Dhaka">Dhaka (ঢাকা)</option>
                        <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                        <option value="Sylhet">Sylhet (সিলেট)</option>
                        <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                        <option value="Khulna">Khulna (খুলনা)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        {language === 'bn' ? 'এলাকা / জোন:' : 'Preferred Area:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        placeholder="e.g. Dhanmondi, Gulshan"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      {language === 'bn' ? 'জানা ভাষাসমূহ:' : 'Fluent Languages:'}
                    </label>
                    <input
                      type="text"
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      placeholder="e.g. Bengali, English, Sylheti, Hindi"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      {language === 'bn' ? 'আপনার পরিচিতি ও আগ্রহ (Bio):' : 'Brief Bio & Personality:'}
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder={language === 'bn' ? 'আপনার আগ্রহ, শখ এবং কেন আপনি একজন ভালো সঙ্গী হবেন তা সংক্ষেপে লিখুন...' : 'Describe your interests, conversational skills, and background...'}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Pricing & Income Estimator */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium">{language === 'bn' ? 'ঘণ্টাপ্রতি রেট নির্ধারণ:' : 'Hourly Rate Set by You:'}</span>
                      <span className="text-base font-bold text-indigo-400">৳ {formData.hourlyRate} / ঘণ্টা</span>
                    </div>
                    <input
                      type="range"
                      min="600"
                      max="2500"
                      step="50"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>৳ ৬০০ (বেসিক)</span>
                      <span>৳ ১,৫০০ (স্ট্যান্ডার্ড)</span>
                      <span>৳ ২,৫00 (প্রিমিয়াম)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium">{language === 'bn' ? 'সপ্তাহে সম্ভাব্য সময় (ঘণ্টা):' : 'Estimated Weekly Hours:'}</span>
                      <span className="text-base font-bold text-emerald-400">{formData.hoursPerWeek} ঘণ্টা / সপ্তাহ</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="35"
                      step="1"
                      value={formData.hoursPerWeek}
                      onChange={(e) => setFormData({ ...formData, hoursPerWeek: Number(e.target.value) })}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {/* Projected Payout Box */}
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-emerald-300 font-medium">
                        {language === 'bn' ? 'আনুমানিক সম্ভাব্য মাসিক আয় (১৫% কমিশন বাদে):' : 'Estimated Monthly Payout (after 15% fee):'}
                      </div>
                      <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                        ৳ {Math.round(estimatedMonthlyIncome).toLocaleString()} <span className="text-xs text-slate-300 font-normal">/ মাস</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      ৳
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    * কম্প্যানিয়নরা সরাসরি তাদের নিজস্ব রেট ও সময়সূচি নির্ধারণ করতে পারেন। NeverAlone শুধুমাত্র প্ল্যাটফর্ম চার্জ (১৫%) গ্রহণ করে, বাকি অর্থ সরাসরি আপনার bKash/Bank-এ ট্রান্সফার হবে।
                  </p>
                </div>
              )}

              {/* Step 3: Verification & Platonic Pledge */}
              {step === 3 && (
                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <label className="block font-semibold text-slate-300">
                      {language === 'bn' ? 'জাতীয় পরিচয়পত্র নম্বর (NID / Smart Card):' : 'National ID / Passport Number:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nidNumber}
                      onChange={(e) => setFormData({ ...formData, nidNumber: e.target.value })}
                      placeholder="e.g. 1998XXXXXXXXXX"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    
                    {/* Simulated Document Upload Dropzone */}
                    <div className="mt-2 border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-xl p-3 text-center cursor-pointer bg-slate-900/50 transition-colors">
                      <Upload className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                      <div className="text-[11px] text-slate-300 font-medium">NID / পাসপোর্ট ফ্রন্ট ও ব্যাক ছবি যুক্ত করুন</div>
                      <div className="text-[10px] text-slate-400">JPG, PNG বা PDF (সর্বোচ্চ ৫ MB)</div>
                    </div>
                  </div>

                  {/* Mandatory Checkboxes */}
                  <div className="space-y-2.5 pt-1">
                    <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeToPlatonicPledge}
                        onChange={(e) => setFormData({ ...formData, agreeToPlatonicPledge: e.target.checked })}
                        className="mt-0.5 rounded accent-rose-500 w-4 h-4"
                      />
                      <span className="text-[11px] text-rose-200 leading-snug">
                        <strong>১০০% প্ল্যাটোনিক অঙ্গীকার:</strong> আমি অঙ্গীকার করছি যে এটি সম্পূর্ণ অ-রোমান্টিক ও অ-যৌন প্ল্যাটফর্ম। কোনো অনৈতিক প্রস্তাব আসলে অবিলম্বে প্ল্যাটফর্মে রিপোর্ট করব।
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeToCodeOfConduct}
                        onChange={(e) => setFormData({ ...formData, agreeToCodeOfConduct: e.target.checked })}
                        className="mt-0.5 rounded accent-indigo-500 w-4 h-4"
                      />
                      <span className="text-[11px] text-slate-300 leading-snug">
                        আমি সর্বদা শুধুমাত্র অনুমোদিত <strong>পাবলিক স্থানে</strong> ক্লায়েন্টের সাথে সাক্ষাৎ করব এবং পেশাদার আচরণবিধি মেনে চলব।
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeToBackgroundCheck}
                        onChange={(e) => setFormData({ ...formData, agreeToBackgroundCheck: e.target.checked })}
                        className="mt-0.5 rounded accent-indigo-500 w-4 h-4"
                      />
                      <span className="text-[11px] text-slate-300 leading-snug">
                        আমি আমার জাতীয় পরিচয়পত্র ও ক্রিমিনাল ব্যাকগ্রাউন্ড যাচাইকরণে সম্মতি প্রদান করছি।
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    {language === 'bn' ? 'পূর্ববর্তী' : 'Back'}
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  disabled={loading}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 ml-auto"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : step === 3 ? (
                    <>
                      <FileCheck className="w-4 h-4" />
                      <span>{language === 'bn' ? 'আবেদন চূড়ান্ত করুন' : 'Complete Application'}</span>
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
