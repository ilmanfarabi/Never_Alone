import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  ExternalLink, 
  Zap, 
  ChevronDown, 
  CheckCircle2,
  LogOut,
  Shield
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import type { AdminRole } from '../../types/adminTypes';

interface AdminTopBarProps {
  currentPageTitle: string;
  onExitAdmin: () => void;
  onNavigate?: (page: string) => void;
  onNavigateSafety?: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  currentPageTitle,
  onExitAdmin,
  onNavigate,
  onNavigateSafety
}) => {
  const { 
    currentAdmin, 
    logout,
    switchRole, 
    activeSOSCount, 
    triggerMockSOS,
    safetyReports,
    tickets
  } = useAdminAuth();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNavSafety = onNavigateSafety || (() => onNavigate && onNavigate('safety'));

  const roles: { role: AdminRole; label: string; desc: string }[] = [
    { role: 'super_admin', label: 'Super Admin', desc: 'Full unrestricted system access' },
    { role: 'trust_safety_agent', label: 'Trust & Safety', desc: 'SOS, verification & safety reports' },
    { role: 'finance_agent', label: 'Finance Agent', desc: 'Ledgers, payouts & commission settings' },
    { role: 'support_agent', label: 'Support Agent', desc: 'Customer tickets & booking disputes' },
  ];

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        {/* Page Title & Breadcrumb */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 capitalize tracking-tight">
            {currentPageTitle}
          </h1>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-sm font-bold bg-slate-100 text-slate-600 border border-slate-200">
            Bangladeshi Platonic Network
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          {/* Real-time SOS Demo Pulse Simulator */}
          <button
            onClick={triggerMockSOS}
            title="Trigger a test live SOS distress beacon"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-sm font-bold border border-red-200 transition-colors shadow-xs group"
          >
            <Zap className="w-3.5 h-3.5 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
            <span>Simulate SOS</span>
          </button>

          {/* Notifications / Pending Alert Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setRoleSwitcherOpen(false);
                setUserMenuOpen(false);
              }}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {(activeSOSCount > 0 || safetyReports.length > 0) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-ping" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-sm text-slate-900">Urgent Safety & Action Queue</span>
                  <span className="text-sm font-mono text-slate-400">Live</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {activeSOSCount > 0 && (
                    <div 
                      onClick={() => {
                        setNotificationsOpen(false);
                        handleNavSafety();
                      }}
                      className="p-2.5 rounded-xl bg-red-50 border border-red-200 cursor-pointer hover:bg-red-100 transition flex items-start gap-2.5"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-red-900">{activeSOSCount} Active SOS Distress Pings</div>
                        <div className="text-sm text-red-700">Immediate companion location tracking required.</div>
                      </div>
                    </div>
                  )}

                  {safetyReports.filter(r => r.status === 'open').length > 0 && (
                    <div 
                      onClick={() => {
                        setNotificationsOpen(false);
                        handleNavSafety();
                      }}
                      className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer hover:bg-amber-100 transition flex items-start gap-2.5"
                    >
                      <div className="text-sm font-bold text-amber-900">
                        {safetyReports.filter(r => r.status === 'open').length} Open Safety Reports
                      </div>
                    </div>
                  )}

                  {tickets.filter(t => t.status === 'open').length > 0 && (
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-900 font-medium">
                      {tickets.filter(t => t.status === 'open').length} Customer tickets waiting for staff reply.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleSwitcherOpen(!roleSwitcherOpen);
                setNotificationsOpen(false);
                setUserMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm font-bold text-slate-800 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="capitalize">{currentAdmin?.role.replace(/_/g, ' ')}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2 py-1 text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Switch Admin Permission Role
                </div>

                {roles.map(r => {
                  const isActive = currentAdmin?.role === r.role;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setRoleSwitcherOpen(false);
                      }}
                      className={`w-full p-2 rounded-xl text-left transition flex items-center justify-between ${
                        isActive ? 'bg-[#1B3A4B] text-white' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold">{r.label}</div>
                        <div className={`text-sm ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                          {r.desc}
                        </div>
                      </div>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-[#FF6F61]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Profile & Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setRoleSwitcherOpen(false);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-[#1B3A4B] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                {currentAdmin?.name.charAt(0) || 'A'}
              </div>
              <span className="hidden md:inline text-sm font-bold text-slate-800 truncate max-w-[100px]">
                {currentAdmin?.name.split(' ')[0] || 'Admin'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-sm font-bold text-slate-900">{currentAdmin?.name || 'Staff User'}</div>
                  <div className="text-sm text-slate-500 truncate">{currentAdmin?.email}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-[#1B3A4B] uppercase bg-white px-2 py-0.5 rounded border border-slate-200">
                    <Shield className="w-3 h-3 text-[#FF6F61]" />
                    <span>{currentAdmin?.role.replace(/_/g, ' ')}</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100 space-y-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onExitAdmin();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <span>View Customer Website</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Log Out of Staff Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Direct TopBar Logout Button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-bold border border-rose-200 transition-colors"
            title="Log out of the NeverAlone Staff Portal"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Log Out</span>
          </button>

          {/* View Customer Website Link */}
          <button
            onClick={onExitAdmin}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF6F61]/10 hover:bg-[#FF6F61]/20 text-[#FF6F61] text-sm font-bold transition-colors"
            title="Return to the live customer-facing platform"
          >
            <span>Customer Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sign Out of Staff Portal?</h3>
              <p className="text-sm text-slate-500 mt-1">
                Your active administrative session will be terminated and you will return to the sign-in screen.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-md shadow-rose-600/20 transition"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
