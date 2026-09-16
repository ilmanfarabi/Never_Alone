import React, { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingChat } from './components/common/FloatingChat';
import { BookingModal } from './components/booking/BookingModal';
import { CompanionProfileModal } from './components/companion/CompanionProfileModal';
import { SOSModal } from './components/safety/SOSModal';
import { FloatingSOS } from './components/safety/FloatingSOS';
import { ReportModal } from './components/safety/ReportModal';
import { ApplicationModal } from './components/companion/ApplicationModal';

// Pages
import { Home } from './pages/Home';
import { Companions } from './pages/Companions';
import { Services } from './pages/Services';
import { HowItWorks } from './pages/HowItWorks';
import { Pricing } from './pages/Pricing';
import { SafetyCenter } from './pages/SafetyCenter';
import { About } from './pages/About';
import { TermsOfService } from './pages/TermsOfService';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import type { Companion } from './types';
import { AdminApp } from './admin/AdminApp';

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.location.hash === '#admin';
  });

  React.useEffect(() => {
    const handleHashChange = () => {
      setIsAdminMode(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminMode) {
    return (
      <AdminApp 
        onExitAdmin={() => {
          window.location.hash = '';
          setIsAdminMode(false);
        }} 
      />
    );
  }
  
  // Modal states
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [reportTargetName, setReportTargetName] = useState<string | undefined>(undefined);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfile = (comp: Companion) => {
    setSelectedCompanion(comp);
    setIsProfileModalOpen(true);
  };

  const handleOpenBooking = (comp: Companion) => {
    setSelectedCompanion(comp);
    setIsBookingModalOpen(true);
  };

  const handleOpenReportFromCompanion = (comp: Companion) => {
    setReportTargetName(comp.name);
    setIsProfileModalOpen(false);
    setIsReportOpen(true);
  };

  const handleOpenReportGeneral = () => {
    setReportTargetName(undefined);
    setIsReportOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Main Navbar */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenApply={() => setIsApplyOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home 
            onNavigate={handleNavigate}
            onSelectCompanion={handleOpenProfile}
            onBookCompanion={handleOpenBooking}
            onOpenApply={() => setIsApplyOpen(true)}
          />
        )}

        {currentPage === 'companions' && (
          <Companions 
            onSelectCompanion={handleOpenProfile}
            onBookCompanion={handleOpenBooking}
          />
        )}

        {currentPage === 'services' && (
          <Services onNavigate={handleNavigate} />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorks onNavigate={handleNavigate} />
        )}

        {currentPage === 'pricing' && (
          <Pricing onNavigate={handleNavigate} />
        )}

        {currentPage === 'safety' && (
          <SafetyCenter 
            onOpenSOS={() => setIsSOSOpen(true)}
            onOpenReport={handleOpenReportGeneral}
          />
        )}

        {currentPage === 'about' && (
          <About onNavigate={handleNavigate} />
        )}

        {currentPage === 'terms' && (
          <TermsOfService />
        )}

        {currentPage === 'faq' && (
          <FAQ onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <Contact />
        )}
      </main>

      {/* Comprehensive Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenReport={handleOpenReportGeneral}
      />

      {/* 24/7 Floating Live Support Chat */}
      <FloatingChat onOpenSOS={() => setIsSOSOpen(true)} />

      {/* Quick-Access Floating SOS Emergency Button (Bottom-Left) */}
      <FloatingSOS onOpenSOS={() => setIsSOSOpen(true)} />

      {/* Modals */}
      <CompanionProfileModal
        companion={selectedCompanion}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onBookNow={(comp) => {
          setIsProfileModalOpen(false);
          handleOpenBooking(comp);
        }}
        onReport={handleOpenReportFromCompanion}
      />

      <BookingModal
        companion={selectedCompanion}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
      />

      <ReportModal
        isOpen={isReportOpen}
        targetName={reportTargetName}
        onClose={() => setIsReportOpen(false)}
      />

      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

export default App;
