import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  ArrowRight, 
  UserCheck, 
  KeyRound, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  HelpCircle,
  Sparkles,
  UserPlus
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { AdminRole } from '../types/adminTypes';
import { AdminSignup } from './AdminSignup';

interface AdminLoginProps {
  onSuccess?: () => void;
  onExit?: () => void;
  onCancel?: () => void;
  initialMode?: 'login' | 'signup';
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ 
  onSuccess, 
  onExit, 
  onCancel,
  initialMode = 'login' 
}) => {
  const { login, switchRole } = useAdminAuth();
  
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('admin@neveralone.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  const handleExitAction = onExit || onCancel || (() => {});

  if (authMode === 'signup') {
    return (
      <AdminSignup
        onSuccess={onSuccess}
        onSwitchToLogin={() => setAuthMode('login')}
        onExit={handleExitAction}
      />
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password, twoFactorCode);
    setLoading(false);

    if (res.success && onSuccess) {
      onSuccess();
    } else if (!res.success) {
      setError(res.error || 'Invalid staff credentials');
    }
  };

  const handleQuickDemoLogin = (role: AdminRole) => {
    switchRole(role);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-[#FF6F61] selection:text-white py-12">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B3A4B]/70 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B3A4B] text-[#FF6F61] flex items-center justify-center mx-auto shadow-lg shadow-[#1B3A4B]/30">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[#1B3A4B] tracking-tight">
            Never<span className="text-[#FF6F61]">Alone</span> Admin
          </h1>
          <p className="text-sm text-slate-500">
            Internal Staff & Trust Desk Operations Portal
          </p>
        </div>

        {/* Tab Switcher: Login / Sign Up */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            type="button"
            className="flex-1 py-2 text-sm font-bold rounded-xl transition flex items-center justify-center space-x-1.5 bg-white text-slate-900 shadow-xs"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Staff Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className="flex-1 py-2 text-sm font-bold rounded-xl transition flex items-center justify-center space-x-1.5 text-slate-500 hover:text-slate-900"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Staff Onboard / Sign Up</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-sm text-rose-700 flex items-center gap-2 font-semibold animate-in shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Staff Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@neveralone.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setShowRecoveryModal(true)}
                className="text-sm text-slate-500 hover:text-[#1B3A4B] font-medium"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-9 py-2 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1B3A4B] focus:ring-1 focus:ring-[#1B3A4B]"
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

          {show2FA && (
            <div className="animate-in fade-in duration-150">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-bold text-slate-700">Two-Factor Authenticator Code (2FA)</label>
                <span className="text-sm text-slate-400">Demo code: 123456</span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-800 font-mono tracking-widest placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#1B3A4B]"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm pt-1">
            <button
              type="button"
              onClick={() => setShow2FA(!show2FA)}
              className="text-slate-500 hover:text-[#1B3A4B] font-semibold underline"
            >
              {show2FA ? 'Hide 2FA field' : 'Enter 2FA Code'}
            </button>
            <span className="text-slate-400">Strict RBAC Enforced</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#1B3A4B] hover:bg-[#142d3b] text-white font-bold text-sm shadow-md shadow-[#1B3A4B]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Staff Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick-Login Presets */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-sm uppercase font-bold text-slate-400 tracking-wider">
            <span>Instant Demo Quick-Login</span>
            <span className="text-[#FF6F61] flex items-center gap-0.5">
              <Sparkles className="w-3 h-3" /> 1-Click
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('super_admin')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group"
            >
              <div className="text-sm font-bold text-[#1B3A4B] flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#FF6F61]" />
                <span>Super Admin</span>
              </div>
              <div className="text-sm text-slate-400">Full platform access</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('trust_safety_agent')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group"
            >
              <div className="text-sm font-bold text-rose-700 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-rose-500" />
                <span>Trust & Safety</span>
              </div>
              <div className="text-sm text-slate-400">SOS & Reports desk</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('finance_agent')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group"
            >
              <div className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                <span>💰 Finance Agent</span>
              </div>
              <div className="text-sm text-slate-400">Payouts & refunds</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('support_agent')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group"
            >
              <div className="text-sm font-bold text-blue-700 flex items-center gap-1">
                <span>🎧 Support Desk</span>
              </div>
              <div className="text-sm text-slate-400">Tickets & bookings</div>
            </button>
          </div>
        </div>

        {/* Back to Customer Site & Onboarding Link */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className="text-slate-600 hover:text-[#1B3A4B] font-semibold"
          >
            New Staff? <span className="text-[#FF6F61] underline">Sign Up Here</span>
          </button>

          <button
            type="button"
            onClick={handleExitAction}
            className="text-slate-400 hover:text-slate-600 font-medium"
          >
            ← Customer Website
          </button>
        </div>

      </div>

      {/* Recovery Modal */}
      {showRecoveryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-2 text-[#1B3A4B]">
              <HelpCircle className="w-5 h-5 text-[#FF6F61]" />
              <h3 className="text-sm font-bold">Staff Credential Recovery</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Administrative credentials and hardware 2FA keys are managed by the IT Security Operations team.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-1">
              <p className="font-semibold">For Local Testing:</p>
              <p>• Password: <code className="bg-white px-1.5 py-0.5 rounded border font-mono">password123</code></p>
              <p>• 2FA Code: <code className="bg-white px-1.5 py-0.5 rounded border font-mono">123456</code></p>
              <p>• Or use any 1-Click Quick Demo Login button.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowRecoveryModal(false)}
              className="w-full py-2 bg-[#1B3A4B] hover:bg-[#132a36] text-white text-sm font-bold rounded-xl transition"
            >
              Close Helper
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
