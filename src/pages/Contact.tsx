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
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'bn' ? 'যোগাযোগ ও সাপোর্ট' : 'Contact & Support'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {language === 'bn' ? (
            <>
              সার্বক্ষণিক পাশে আছি <br />
              <span className="text-blue-600">২৪/৭ সাপোর্ট টিম</span>
            </>
          ) : (
            <>
              We're Here for You. <br />
              <span className="text-blue-600">24/7 Dedicated Support.</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'bn'
            ? 'যেকোনো প্রশ্ন বা সহায়তায় আমাদের সাপোর্ট টিম সার্বক্ষণিক প্রস্তুত।'
            : 'Get in touch for booking help, safety dispatch, or general inquiries.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="space-y-4 lg:col-span-5">
          {/* Helpline */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 space-y-3 group shadow-xs hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'bn' ? '২৪/৭ হেল্পলাইন হটলাইন' : '24/7 Hotline Support'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
                {language === 'bn' ? 'সরাসরি কল করে কথা বলুন' : 'Instant phone assistance'}
              </p>
            </div>
            <div className="text-sm font-bold text-blue-600 font-mono tracking-wide">
              {language === 'bn' ? '০৯৬১২-৩৪৫৬৭৮' : '+880 9612-345678'}
            </div>
          </div>

          {/* Email */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 space-y-3 group shadow-xs hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'bn' ? 'ইমেইল সাপোর্ট ডায়ালগ' : 'Email Support Desk'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
                {language === 'bn' ? 'গড় উত্তর সময়: ১ ঘণ্টা' : 'Average response: under 1 hour'}
              </p>
            </div>
            <a href="mailto:support@neveralone.com" className="text-sm font-semibold text-blue-600 hover:underline block font-mono">
              support@neveralone.com
            </a>
          </div>

          {/* Office Address */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 space-y-3 group shadow-xs hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'bn' ? 'কর্পোরেট কার্যালয়' : 'Corporate Office'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
                {language === 'bn' ? 'ঢাকা হেডকোয়ার্টার' : 'Dhaka Headquarters'}
              </p>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {language === 'bn' ? 'প্লট ১২, রোড ৪৪, গুলশান-২, ঢাকা ১২১২' : 'Plot 12, Road 44, Gulshan-2, Dhaka 1212'}
            </p>
          </div>
        </div>

        {/* Support Inquiry Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                {language === 'bn'
                  ? 'ধন্যবাদ। আমাদের সাপোর্ট প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।'
                  : 'Thank you for reaching out. A support agent will respond to you shortly.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="apple-pill-btn bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-xs"
                >
                  {language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {language === 'bn' ? 'বার্তা পাঠান' : 'Send Us a Message'}
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-1 font-normal">
                  {language === 'bn' ? 'ফর্মটি পূরণ করে আপনার মতামত বা প্রশ্ন জানান' : 'Fill out the details below and we will get back to you shortly.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    {language === 'bn' ? 'আপনার নাম:' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Shakib Ahmed"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    {language === 'bn' ? 'ইমেইল অ্যাড্রেস:' : 'Email Address:'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    {language === 'bn' ? 'মোবাইল নম্বর:' : 'Phone Number:'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    {language === 'bn' ? 'ইনকোয়ারির বিষয়:' : 'Topic:'}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
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
                <label className="block font-semibold text-slate-700 mb-1.5">
                  {language === 'bn' ? 'আপনার বার্তা / প্রশ্ন:' : 'Your Message:'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'bn' ? 'কীভাবে আমরা আপনাকে সাহায্য করতে পারি লিখুন...' : 'Describe how we can assist you...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full apple-pill-btn bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
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
