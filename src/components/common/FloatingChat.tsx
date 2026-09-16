import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, ShieldCheck, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const FloatingChat: React.FC<{ onOpenSOS: () => void }> = ({ onOpenSOS }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: language === 'bn' 
        ? 'আসসালামু আলাইকুম! NeverAlone-এ স্বাগতম। কীভাবে সাহায্য করতে পারি? (বুকিং, নিরাপত্তা বা প্ল্যাটোনিক নিয়মাবলী সম্পর্কে জানতে নিচের অপশনে ট্যাপ করুন)' 
        : 'Hello! Welcome to NeverAlone 24/7 Assistant. How can we help you today with bookings, safety, or platonic policies?',
      time: 'এখন'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = language === 'bn' ? [
    { label: '🔒 প্ল্যাটোনিক নিয়ম কী?', query: 'NeverAlone-এর প্ল্যাটোনিক নিয়মগুলো কী কী?' },
    { label: '💳 পেমেন্ট পদ্ধতি?', query: 'কীভাবে bKash বা Nagad দিয়ে পেমেন্ট করব?' },
    { label: '🛡️ নিরাপত্তা কীভাবে নিশ্চিত হয়?', query: 'মিটিংয়ের সময় নিরাপত্তা কীভাবে বজায় রাখা হয়?' },
    { label: '💼 কম্প্যানিয়ন কীভাবে হব?', query: 'আমি কম্প্যানিয়ন হিসেবে কীভাবে আবেদন করতে পারি?' }
  ] : [
    { label: '🔒 Platonic Rules?', query: 'What are the platonic rules of NeverAlone?' },
    { label: '💳 Payment Options?', query: 'How does bKash / Nagad payment work?' },
    { label: '🛡️ Safety Measures?', query: 'How do you ensure meeting safety?' },
    { label: '💼 Become Companion?', query: 'How can I apply to become a companion?' }
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Generate intelligent canned response based on keywords
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('platonic') || lower.includes('প্ল্যাটোনিক') || lower.includes('ডেটিং') || lower.includes('dating')) {
        botResponse = language === 'bn'
          ? 'আমাদের প্ল্যাটফর্ম কঠোরভাবে অ-রোমান্টিক ও অ-যৌন। রোমান্টিক বা অনুপযুক্ত অনুরোধ সরাসরি নিষিদ্ধ এবং রিপোর্ট করা মাত্রই অ্যাকাউন্ট স্থায়ী ব্যান করা হয়।'
          : 'NeverAlone is strictly platonic and non-romantic. Any romantic proposals result in immediate permanent account termination.';
      } else if (lower.includes('payment') || lower.includes('পেমেন্ট') || lower.includes('bkash') || lower.includes('nagad') || lower.includes('বিকাশ')) {
        botResponse = language === 'bn'
          ? 'আপনি bKash, Nagad, Visa/Mastercard অথবা ওয়ালেটের মাধ্যমে সুরক্ষিত পেমেন্ট করতে পারবেন। মিটিংয়ের সময় নগদ লেনদেন নিরুৎসাহিত করা হয়।'
          : 'You can pay securely via bKash, Nagad, Visa/Mastercard or Wallet. Cash transactions during sessions are strictly discouraged.';
      } else if (lower.includes('safety') || lower.includes('নিরাপত্তা') || lower.includes('safe')) {
        botResponse = language === 'bn'
          ? 'সব কম্প্যানিয়ন সরকারি আইডি ও ব্যাকগ্রাউন্ড যাচাইকৃত। সব মিটিং শুধুমাত্র উন্মুক্ত পাবলিক স্থানে হতে হয় এবং রয়েছে সার্বক্ষণিক SOS ইমার্জেন্সি সাপোর্ট।'
          : 'All companions undergo Government NID and criminal background verification. All meetings are held in verified public venues with active SOS assistance.';
      } else if (lower.includes('companion') || lower.includes('আবেদন') || lower.includes('apply')) {
        botResponse = language === 'bn'
          ? 'কম্প্যানিয়ন হতে ওয়েবসাইটের "কম্প্যানিয়ন হোন" বাটনে ক্লিক করে ফর্ম ও সরকারি আইডি আপলোড করুন। যাচাই ও ওরিয়েন্টেশনের পর প্রোফাইল লাইভ হবে।'
          : 'To become a companion, click "Become a Companion" in the header to submit your NID and details for review.';
      } else {
        botResponse = language === 'bn'
          ? 'ধন্যবাদ আপনার বার্তার জন্য! আমাদের সাপোর্ট টিম ২৪/৭ প্রস্তুত রয়েছে। সরাসরি কথা বলতে আমাদের হটলাইন ০৯৬XX-XXXXXX এ কল করতে পারেন।'
          : 'Thank you for reaching out! Our 24/7 support desk is on standby. For immediate assistance, call our hotline 096XX-XXXXXX.';
      }

      setMessages(prev => [...prev, {
        sender: 'bot' as const,
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all border border-blue-400/30"
          aria-label="Open live support chat"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
          <span className="text-sm font-semibold pr-1">
            {language === 'bn' ? 'সাপোর্ট চ্যাট' : 'Live Support'}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-[90vw] sm:w-96 h-[480px] max-h-[80vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center border border-blue-400/40">
                <Bot className="w-4 h-4 text-blue-200" />
              </div>
              <div>
                <h4 className="text-sm font-semibold flex items-center gap-1.5">
                  NeverAlone Support <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h4>
                <p className="text-sm text-blue-200">
                  {language === 'bn' ? '২৪/৭ সার্বক্ষণিক সহায়তা' : '24/7 Live Assistance'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenSOS}
                className="px-2 py-1 bg-rose-600/80 hover:bg-rose-600 text-white rounded text-sm font-bold tracking-wider mr-1"
                title="Emergency SOS"
              >
                SOS
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-blue-200 hover:text-white rounded-lg hover:bg-blue-800/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Platonic Reminder Top Tag */}
          <div className="bg-rose-950/40 border-b border-rose-500/20 px-3 py-1.5 flex items-center justify-between text-sm text-rose-300">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              {language === 'bn' ? '১০০% প্ল্যাটোনিক ও নিরাপদ সার্ভিস' : '100% Platonic & Safe Service'}
            </span>
            <a href="tel:09612345678" className="flex items-center gap-1 text-emerald-400 hover:underline">
              <PhoneCall className="w-3 h-3" /> {language === 'bn' ? 'হেল্পলাইন' : 'Helpline'}
            </a>
          </div>

          {/* Message List */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-950/60">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-sm text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                className="whitespace-nowrap px-2.5 py-1 text-sm bg-slate-800 hover:bg-blue-900/40 hover:text-blue-300 text-slate-300 rounded-full border border-slate-700 transition-colors shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={language === 'bn' ? 'আপনার প্রশ্ন লিখুন...' : 'Type a question...'}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
