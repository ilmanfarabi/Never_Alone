import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  HeartHandshake, 
  CalendarCheck, 
  CreditCard, 
  ShieldAlert, 
  Image, 
  Headphones, 
  BarChart3, 
  Settings, 
  LogOut, 
  Shield
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavMenuItem {
  id: string;
  moduleKey: 'dashboard' | 'users' | 'companions' | 'bookings' | 'finance' | 'safety' | 'moderation' | 'tickets' | 'analytics' | 'settings';
  label: string;
  icon: React.ElementType;
  badgeCount?: number;
  badgeColor?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPage, onNavigate }) => {
  const { 
    currentAdmin, 
    logout, 
    canAccess, 
    companions, 
    safetyReports, 
    sosAlerts, 
    tickets, 
    contentModeration 
  } = useAdminAuth();

  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const pendingApprovalsCount = companions.filter(c => c.status === 'pending').length;
  const activeSOSCount = sosAlerts.filter(s => s.status === 'active').length;
  const openReportsCount = safetyReports.filter(r => r.status === 'open' || r.status === 'investigating').length;
  const openTicketsCount = tickets.filter(t => t.status === 'open' || t.status === 'pending').length;
  const pendingModCount = contentModeration.filter(m => m.status === 'pending').length;

  const menuItems: NavMenuItem[] = [
    { id: 'dashboard', moduleKey: 'dashboard', label: 'Dashboard Home', icon: LayoutDashboard },
    { id: 'users', moduleKey: 'users', label: 'Customer Users', icon: Users },
    { 
      id: 'companions', 
      moduleKey: 'companions', 
      label: 'Companions & Hosts', 
      icon: HeartHandshake,
      badgeCount: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
      badgeColor: 'bg-amber-500'
    },
    { id: 'bookings', moduleKey: 'bookings', label: 'Booking & Disputes', icon: CalendarCheck },
    { id: 'finance', moduleKey: 'finance', label: 'Payments & Payouts', icon: CreditCard },
    { 
      id: 'safety', 
      moduleKey: 'safety', 
      label: 'Trust & Safety Desk', 
      icon: ShieldAlert,
      badgeCount: (activeSOSCount + openReportsCount) > 0 ? (activeSOSCount + openReportsCount) : undefined,
      badgeColor: activeSOSCount > 0 ? 'bg-red-600 animate-pulse' : 'bg-[#FF6F61]'
    },
    { 
      id: 'moderation', 
      moduleKey: 'moderation', 
      label: 'Content Moderation', 
      icon: Image,
      badgeCount: pendingModCount > 0 ? pendingModCount : undefined,
      badgeColor: 'bg-blue-500'
    },
    { 
      id: 'tickets', 
      moduleKey: 'tickets', 
      label: 'Support Tickets', 
      icon: Headphones,
      badgeCount: openTicketsCount > 0 ? openTicketsCount : undefined,
      badgeColor: 'bg-blue-500'
    },
    { id: 'analytics', moduleKey: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'settings', moduleKey: 'settings', label: 'Admin & System Config', icon: Settings }
  ];

  const visibleMenuItems = menuItems.filter(item => canAccess(item.moduleKey));

  return (
    <aside className="w-64 bg-[#1B3A4B] text-slate-200 flex flex-col shrink-0 border-r border-[#142d3b] select-none h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#254d63] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6F61] to-blue-500 p-0.5 shadow-md">
          <div className="w-full h-full bg-[#1B3A4B] rounded-[10px] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#FF6F61]" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
            Never<span className="text-[#FF6F61]">Alone</span>
            <span className="text-sm uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#FF6F61]/20 text-[#FF6F61] font-extrabold border border-[#FF6F61]/30">
              Staff
            </span>
          </span>
          <span className="text-sm text-slate-400 font-medium">
            Internal Operations Portal
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-sm uppercase font-bold tracking-wider text-slate-400 px-3 py-1 mb-1">
          Operations Modules
        </div>

        {visibleMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                isActive
                  ? 'bg-[#FF6F61] text-white shadow-md shadow-[#FF6F61]/25 font-bold'
                  : 'text-slate-300 hover:bg-[#234b61] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span>{item.label}</span>
              </div>
              {item.badgeCount !== undefined && (
                <span className={`text-sm px-1.5 py-0.2 rounded-full font-bold text-white shadow-xs ${item.badgeColor || 'bg-slate-700'}`}>
                  {item.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Admin Profile Footer */}
      <div className="p-3 border-t border-[#254d63] bg-[#142d3b]/70">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#1B3A4B]/80 border border-[#2c5870]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={currentAdmin?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'}
              alt={currentAdmin?.name || 'Admin'}
              className="w-8 h-8 rounded-lg object-cover border border-slate-400 shrink-0"
            />
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-white truncate">{currentAdmin?.name || 'Staff User'}</span>
              <span className="text-sm text-[#FF6F61] font-semibold uppercase tracking-wider truncate">
                {currentAdmin?.role.replace(/_/g, ' ')}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-[#234b61] transition-colors shrink-0"
            title="Log Out of Staff Portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

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
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-md shadow-rose-600/20 transition"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
