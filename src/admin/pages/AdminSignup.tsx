import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  BadgeCheck,
  Building2
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { AdminRole } from '../types/adminTypes';

interface AdminSignupProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
  onExit?: () => void;
}

export const AdminSignup: React.FC<AdminSignupProps> = ({ 
  onSuccess, 
  onSwitchToLogin, 
  onExit 
}) => {
  const { registerAdmin } = useAdminAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminRole>('trust_safety_agent');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('NEVERALONE2026');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  // Role metadata & badges
  const roleOptions: { role: AdminRole; label: string; badge: string; color: string; desc: string }[] = [
    {
      role: 'super_admin',
      label: 'Super Admin',
      badge: 'Full Access',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      desc: 'Master platform controls, financial governance, settings & staff provisioning.'
    },
    {
      role: 'trust_safety_agent',
      label: 'Trust & Safety Agent',
      badge: 'Safety Operations',
      color: 'bg-red-100 text-red-800 border-red-200',
      desc: 'Live SOS distress feed, safety incidents, chat keyword flags & photo moderation.'
    },
    {
      role: 'finance_agent',
      label: 'Finance Agent',
      badge: 'Ledgers & Payouts',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      desc: 'Transaction ledgers, batch companion payouts (bKash/Nagad/Bank), and refund audits.'
    },
    {
      role: 'support_agent',
      label: 'Support Desk Agent',
      badge: 'Customer Care',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      desc: 'Customer helpdesk tickets, canned response workflows, and booking issue arbitration.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (!acceptTerms) {
      setError('You must accept the Staff Confidentiality & Platonic Governance Agreement.');
      return;
    }

    setLoading(true);

    const res = await registerAdmin(name, email, role, password, inviteCode);
    setLoading(false);

    if (res.success) {
      setSuccessNotice(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1000);
    } else {
      setError(res.error || 'Failed to complete registration.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-[#FF6F61] selection:text-white py-12">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B3A4B]/70 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative max-w-xl w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B3A4B] text-[#FF6F61] flex items-center justify-center mx-auto shadow-lg shadow-[#1B3A4B]/30">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[#1B3A4B] tracking-tight">
            Never<span className="text-[#FF6F61]">Alone</span> Staff Onboarding
          </h1>
          <p className="text-xs text-slate-500">
            Provision Authorized Administrative & Operations Credentials
          </p>
        </div>

        {/* Tab Switcher: Login / Sign Up */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 text-slate-500 hover:text-slate-900"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Staff Sign In</span>
          </button>

          <button
            type="button"
            className="flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 bg-white text-slate-900 shadow-xs"
          >
            <Shield className="w-3.5 h-3.5 text-[#FF6F61]" />
            <span>Staff Onboard / Sign Up</span>
          </button>
        </div>

        {/* Success Alert */}
        {successNotice && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5 font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Staff account created successfully! Signing in to dashboard...</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 font-semibold animate-in shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Farhan Chowdhury"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]"
                />
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@neveralone.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]"
                />
              </div>
            </div>
          </div>

          {/* RBAC Role Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">Administrative Role & Permissions</label>
              <span className="text-[10px] text-slate-400 font-medium">Select RBAC tier</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {roleOptions.map((opt) => (
                <div
                  key={opt.role}
                  onClick={() => setRole(opt.role)}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    role === opt.role 
                      ? 'border-[#1B3A4B] bg-slate-50/80 ring-2 ring-[#1B3A4B]/20 shadow-xs' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${opt.color}`}>
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Master Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1B3A4B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1B3A4B]"
                />
              </div>
            </div>
          </div>

          {/* Staff Invitation Passcode */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Staff Invitation Token / Passcode</label>
              <button
                type="button"
                onClick={() => setInviteCode('NEVERALONE2026')}
                className="text-[10px] text-[#FF6F61] hover:underline font-semibold"
              >
                Auto-fill Demo Token (NEVERALONE2026)
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="NEVERALONE2026"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-mono tracking-wider text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1B3A4B]"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              Issued by NeverAlone HQ Operations Team to verify internal authorization.
            </p>
          </div>

          {/* 2FA Enrollment Notice */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-slate-700 font-semibold">Hardware/App 2FA Enrollment</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
              Enabled by Default
            </span>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start space-x-2 pt-1">
            <input
              type="checkbox"
              id="admin-terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-[#1B3A4B] focus:ring-[#1B3A4B]"
            />
            <label htmlFor="admin-terms" className="text-[11px] text-slate-600 leading-snug">
              I certify that I am an authorized NeverAlone staff member. I agree to maintain strict confidentiality of user data and enforce the platform's non-romantic, non-dating platonic companionship charter.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || successNotice}
            className="w-full py-3 rounded-2xl bg-[#1B3A4B] hover:bg-[#142d3b] text-white font-bold text-xs shadow-md shadow-[#1B3A4B]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Complete Staff Registration & Enter Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch to Login / Back Links */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-slate-600 hover:text-[#1B3A4B] font-semibold flex items-center gap-1"
          >
            <span>Already registered as staff?</span>
            <span className="text-[#FF6F61] underline">Sign In</span>
          </button>

          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="text-slate-400 hover:text-slate-600"
            >
              ← Customer Website
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
