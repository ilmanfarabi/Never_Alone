import React, { useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminLogin } from './pages/AdminLogin';
import { DashboardHome } from './pages/DashboardHome';
import { UserManagement } from './pages/UserManagement';
import { CompanionManagement } from './pages/CompanionManagement';
import { BookingManagement } from './pages/BookingManagement';
import { PaymentsPayouts } from './pages/PaymentsPayouts';
import { TrustSafetyCenter } from './pages/TrustSafetyCenter';
import { ContentModeration } from './pages/ContentModeration';
import { SupportTickets } from './pages/SupportTickets';
import { AnalyticsReports } from './pages/AnalyticsReports';
import { AdminSettings } from './pages/AdminSettings';

const AdminPortalContent: React.FC<{ onExitAdmin?: () => void }> = ({ onExitAdmin }) => {
  const { currentAdmin, canAccess } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  if (!currentAdmin) {
    return (
      <AdminLogin 
        onSuccess={() => setActiveTab('dashboard')} 
        onExit={onExitAdmin || (() => {})} 
      />
    );
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome onNavigate={(tab: string) => setActiveTab(tab)} />;
      case 'users':
        return canAccess('users') ? <UserManagement /> : <AccessDenied page="User Management" />;
      case 'companions':
        return canAccess('companions') ? <CompanionManagement /> : <AccessDenied page="Companion Management" />;
      case 'bookings':
        return canAccess('bookings') ? <BookingManagement /> : <AccessDenied page="Booking Management" />;
      case 'finance':
      case 'payments':
        return canAccess('finance') ? <PaymentsPayouts /> : <AccessDenied page="Payments & Payouts" />;
      case 'safety':
        return canAccess('safety') ? <TrustSafetyCenter /> : <AccessDenied page="Trust & Safety Center" />;
      case 'moderation':
        return canAccess('moderation') ? <ContentModeration /> : <AccessDenied page="Content Moderation" />;
      case 'tickets':
        return canAccess('tickets') ? <SupportTickets /> : <AccessDenied page="Support Tickets" />;
      case 'analytics':
        return canAccess('analytics') ? <AnalyticsReports /> : <AccessDenied page="Analytics & Reports" />;
      case 'settings':
        return canAccess('settings') ? <AdminSettings /> : <AccessDenied page="Admin & Platform Settings" />;
      default:
        return <DashboardHome onNavigate={(tab: string) => setActiveTab(tab)} />;
    }
  };

  return (
    <AdminLayout 
      activeTab={activeTab} 
      onSelectTab={setActiveTab} 
      onExitAdmin={onExitAdmin || (() => {})}
    >
      {renderActivePage()}
    </AdminLayout>
  );
};

const AccessDenied: React.FC<{ page: string }> = ({ page }) => (
  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs max-w-lg mx-auto mt-12">
    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 font-bold text-2xl">
      ✕
    </div>
    <h2 className="text-2xl font-bold text-slate-900">Access Restricted</h2>
    <p className="text-sm text-slate-500 mt-1">
      Your current administrative role does not have permission to view <strong>{page}</strong>.
      Use the Quick Role Switcher in the top bar to switch to an authorized role.
    </p>
  </div>
);

export const AdminApp: React.FC<{ onExitAdmin?: () => void }> = ({ onExitAdmin }) => {
  return (
    <AdminAuthProvider>
      <AdminPortalContent onExitAdmin={onExitAdmin} />
    </AdminAuthProvider>
  );
};

export default AdminApp;
