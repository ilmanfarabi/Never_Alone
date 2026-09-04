import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <span>{language === 'bn' ? 'যোগাযোগ ও সহায়তা' : 'Get in Touch'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Contact Support & Office'}
        </h1>
        <p className="text-sm text-slate-300">
          {language === 'bn'
            ? '২৪/৭ সাপোর্ট হেল্পলাইন, লাইভ চ্যাট এবং আমাদের ডেডিকেটেড নিরাপত্তা দলের সাথে সরাসরি যোগাযোগ করুন।'
            : '24/7 Helpline, email support, and trust desk for seamless assistance.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4 lg:col-span-1">
          {/* Helpline */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {language === 'bn' ? '২৪/৭ হেল্পলাইন' : '24/7 Hotline'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'bn' ? 'যেকোনো সময় সরাসরি কল করুন' : 'Call us toll-free anytime'}
              </p>
            </div>
            <div className="text-sm font-bold text-emerald-400 font-mono">
              ০৯৬XX-XXXXXX
            </div>
          </div>

          {/* Email */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {language === 'bn' ? 'ইমেইল সাপোর্ট' : 'Email Inquiries'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'bn' ? 'গড় উত্তর প্রদানের সময়: ১ ঘণ্টা' : 'Average response time: 1 hour'}
              </p>
            </div>
            <a href="mailto:support@neveralone.com" className="text-xs font-semibold text-indigo-300 hover:underline block font-mono">
              support@neveralone.com
            </a>
          </div>

          {/* Office Address */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {language === 'bn' ? 'হেড অফিস' : 'Headquarters'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'bn' ? 'কর্পোরেট কার্যালয়' : 'Corporate Office'}
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              প্লট ১২, রোড ৪৪, গুলশান-২, ঢাকা ১২১২, বাংলাদেশ
            </p>
          </div>
        </div>

        {/* Support Inquiry Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-emerald-400">
                {language === 'bn' ? 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {language === 'bn'
                  ? 'NeverAlone সাপোর্টে যোগাযোগ করার জন্য ধন্যবাদ। আমাদের প্রতিনিধি আপনার ইমেইল বা ফোনে দ্রুত যোগাযোগ করবেন।'
                  : 'Thank you for contacting us. A support representative will respond shortly.'}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                }}
                className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                {language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'সাপোর্ট ইনকোয়ারি ফর্ম' : 'Send us a Message'}
                </h2>
                <p className="text-xs text-slate-400">
                  {language === 'bn' ? 'ফর্ম পূরণ করে আপনার প্রশ্ন বা মতামত জানান' : 'Fill out the form below and we will get back to you.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'আপনার নাম:' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Shakib Ahmed"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'ইমেইল অ্যাড্রেস:' : 'Email Address:'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর:' : 'Phone Number:'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'ইনকোয়ারির ধরন:' : 'Topic:'}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="General Inquiry">{language === 'bn' ? 'সাধারণ প্রশ্ন (General Inquiry)' : 'General Inquiry'}</option>
                    <option value="Booking Help">{language === 'bn' ? 'বুকিং সহায়তা (Booking Assistance)' : 'Booking Assistance'}</option>
                    <option value="Payment Issue">{language === 'bn' ? 'পেমেন্ট ও রিফান্ড (Payments & Refund)' : 'Payments & Refund'}</option>
                    <option value="Become Companion">{language === 'bn' ? 'কম্প্যানিয়ন আবেদন (Become Companion)' : 'Become Companion'}</option>
                    <option value="Safety & Trust">{language === 'bn' ? 'নিরাপত্তা ও ট্রাস্ট (Safety & Trust)' : 'Safety & Trust'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {language === 'bn' ? 'আপনার বার্তা / প্রশ্ন:' : 'Your Message:'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'bn' ? 'বিস্তারিত লিখুন...' : 'Describe how we can help you...'}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{language === 'bn' ? 'বার্তা পাঠান' : 'Submit Message'}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
