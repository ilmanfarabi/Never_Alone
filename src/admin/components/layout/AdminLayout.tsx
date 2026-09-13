import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { SOSAlertBanner } from '../common/SOSAlertBanner';
import { useAdminAuth } from '../../context/AdminAuthContext';
import type { SOSAlert } from '../../types/adminTypes';

interface AdminLayoutProps {
  currentPage?: string;
  activeTab?: string;
  currentPageTitle?: string;
  onNavigate?: (page: string) => void;
  onSelectTab?: (tab: string) => void;
  onExitAdmin: () => void;
  onViewSOSAlert?: (alert: SOSAlert) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPage,
  activeTab,
  currentPageTitle,
  onNavigate,
  onSelectTab,
  onExitAdmin,
  onViewSOSAlert,
  children
}) => {
  const { sosAlerts } = useAdminAuth();
  const activeSOSList = sosAlerts.filter(s => s.status === 'active' || s.status === 'acknowledged');

  const currentActive = activeTab || currentPage || 'dashboard';
  const handleNav = onSelectTab || onNavigate || (() => {});

  const handleInspectSOS = (alert: SOSAlert) => {
    handleNav('safety');
    if (onViewSOSAlert) onViewSOSAlert(alert);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* High-priority SOS Red Banner if active emergency */}
      <SOSAlertBanner
        activeAlerts={activeSOSList}
        onViewAlert={handleInspectSOS}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Navy Left Sidebar */}
        <AdminSidebar
          currentPage={currentActive}
          onNavigate={handleNav}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <AdminTopBar
            currentPageTitle={currentPageTitle || 'Staff Administration'}
            onExitAdmin={onExitAdmin}
            onNavigateSafety={() => handleNav('safety')}
          />

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
