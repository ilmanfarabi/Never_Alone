import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  AdminUser, 
  AdminRole, 
  CustomerUser, 
  CompanionProfile, 
  BookingRecord, 
  TransactionLedgerItem, 
  SafetyReport, 
  SOSAlert, 
  ChatFlag, 
  ContentModerationItem, 
  SupportTicket, 
  AuditLogEntry, 
  PlatformSettings,
  CompanionStatus,
  CustomerStatus
} from '../types/adminTypes';
import { 
  initialAdmins, 
  initialCustomers, 
  initialCompanions, 
  initialBookings, 
  initialSOSAlerts, 
  initialSafetyReports, 
  initialChatFlags, 
  initialContentModeration, 
  initialSupportTickets, 
  initialTransactions, 
  initialAuditLogs, 
  initialPlatformSettings 
} from '../data/adminMockData';

interface AdminAuthContextType {
  currentAdmin: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string, twoFactorCode?: string) => Promise<{ success: boolean; error?: string; require2FA?: boolean }>;
  logout: () => void;
  switchRole: (role: AdminRole) => void;
  canAccess: (module: 'dashboard' | 'users' | 'companions' | 'bookings' | 'finance' | 'safety' | 'moderation' | 'tickets' | 'analytics' | 'settings') => boolean;
  
  // Data States
  customers: CustomerUser[];
  companions: CompanionProfile[];
  bookings: BookingRecord[];
  sosAlerts: SOSAlert[];
  safetyReports: SafetyReport[];
  chatFlags: ChatFlag[];
  contentModeration: ContentModerationItem[];
  tickets: SupportTicket[];
  transactions: TransactionLedgerItem[];
  auditLogs: AuditLogEntry[];
  settings: PlatformSettings;
  
  // Mutators & Workflows
  updateCustomerStatus: (userId: string, status: CustomerStatus, reason: string) => void;
  addCustomerNote: (userId: string, note: string) => void;
  requestReverification: (userId: string) => void;
  updateCompanionStatus: (companionId: string, status: CompanionStatus, reason?: string) => void;
  resolveBookingDispute: (bookingId: string, resolutionNote: string, refundAmount?: number, banPartyId?: string) => void;
  processBatchPayout: (transactionIds: string[], batchRef: string) => void;
  issueRefund: (transactionId: string, refundAmount: number, reason: string) => void;
  updateSOSStatus: (sosId: string, status: 'acknowledged' | 'resolved' | 'false_alarm', notes: string) => void;
  resolveSafetyReport: (reportId: string, action: 'warned' | 'suspended' | 'banned' | 'dismissed' | 'refunded', note: string) => void;
  moderateChatFlag: (flagId: string, action: 'dismiss' | 'warn' | 'suspend' | 'ban') => void;
  moderateContentItem: (itemId: string, action: 'approved' | 'rejected', reason?: string) => void;
  replyTicket: (ticketId: string, message: string, isInternalNote: boolean) => void;
  updateTicketStatus: (ticketId: string, status: 'open' | 'pending' | 'resolved' | 'closed') => void;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  addNewAdminAccount: (admin: Omit<AdminUser, 'id' | 'createdAt' | 'lastLoginAt'>) => void;
  registerAdmin: (name: string, email: string, role: AdminRole, password?: string, inviteCode?: string) => Promise<{ success: boolean; error?: string }>;
  
  // Real-time SOS triggers for demo
  activeSOSCount: number;
  triggerMockSOS: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminAccounts, setAdminAccounts] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_accounts');
    return saved ? JSON.parse(saved) : initialAdmins;
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('neveralone_admin_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null; // Always open Sign In page on first visit
  });

  const [customers, setCustomers] = useState<CustomerUser[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [companions, setCompanions] = useState<CompanionProfile[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_companions');
    return saved ? JSON.parse(saved) : initialCompanions;
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_sos');
    return saved ? JSON.parse(saved) : initialSOSAlerts;
  });

  const [safetyReports, setSafetyReports] = useState<SafetyReport[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_reports');
    return saved ? JSON.parse(saved) : initialSafetyReports;
  });

  const [chatFlags, setChatFlags] = useState<ChatFlag[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_chat_flags');
    return saved ? JSON.parse(saved) : initialChatFlags;
  });

  const [contentModeration, setContentModeration] = useState<ContentModerationItem[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_moderation');
    return saved ? JSON.parse(saved) : initialContentModeration;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_tickets');
    return saved ? JSON.parse(saved) : initialSupportTickets;
  });

  const [transactions, setTransactions] = useState<TransactionLedgerItem[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('neveralone_admin_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [settings, setSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem('neveralone_admin_settings');
    return saved ? JSON.parse(saved) : initialPlatformSettings;
  });

  // Sync to localStorage
  useEffect(() => {
    if (currentAdmin) localStorage.setItem('neveralone_admin_user', JSON.stringify(currentAdmin));
    else localStorage.removeItem('neveralone_admin_user');
  }, [currentAdmin]);

  useEffect(() => { localStorage.setItem('neveralone_admin_accounts', JSON.stringify(adminAccounts)); }, [adminAccounts]);
  useEffect(() => { localStorage.setItem('neveralone_admin_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('neveralone_admin_companions', JSON.stringify(companions)); }, [companions]);
  useEffect(() => { localStorage.setItem('neveralone_admin_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('neveralone_admin_sos', JSON.stringify(sosAlerts)); }, [sosAlerts]);
  useEffect(() => { localStorage.setItem('neveralone_admin_reports', JSON.stringify(safetyReports)); }, [safetyReports]);
  useEffect(() => { localStorage.setItem('neveralone_admin_chat_flags', JSON.stringify(chatFlags)); }, [chatFlags]);
  useEffect(() => { localStorage.setItem('neveralone_admin_moderation', JSON.stringify(contentModeration)); }, [contentModeration]);
  useEffect(() => { localStorage.setItem('neveralone_admin_tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem('neveralone_admin_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('neveralone_admin_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('neveralone_admin_settings', JSON.stringify(settings)); }, [settings]);

  const addAuditLog = (
    action: string, 
    targetType: AuditLogEntry['targetType'], 
    targetId: string, 
    targetName: string, 
    reasonOrNote?: string
  ) => {
    if (!currentAdmin) return;
    const newEntry: AuditLogEntry = {
      id: `AUD-${Date.now()}`,
      adminId: currentAdmin.id,
      adminName: currentAdmin.name,
      adminRole: currentAdmin.role,
      action,
      targetType,
      targetId,
      targetName,
      reasonOrNote,
      ipAddress: '103.114.168.22',
      timestamp: new Date().toLocaleString()
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const login = async (email: string, _pass: string, _twoFactorCode?: string) => {
    const admin = adminAccounts.find(a => a.email.toLowerCase() === email.toLowerCase()) || 
                  initialAdmins.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (!admin) {
      return { success: false, error: 'Invalid admin credentials.' };
    }
    setCurrentAdmin(admin);
    addAuditLog('ADMIN_LOGIN_SUCCESS', 'user', admin.id, admin.name, 'Admin logged in.');
    return { success: true };
  };

  const logout = () => {
    if (currentAdmin) {
      addAuditLog('ADMIN_LOGOUT', 'user', currentAdmin.id, currentAdmin.name, 'Admin session ended.');
    }
    setCurrentAdmin(null);
  };

  const switchRole = (role: AdminRole) => {
    const match = initialAdmins.find(a => a.role === role) || {
      id: `adm-${Date.now()}`,
      name: role.replace('_', ' ').toUpperCase(),
      email: `${role}@neveralone.com`,
      role,
      twoFactorEnabled: true,
      lastLoginAt: 'Just now',
      status: 'active',
      createdAt: '2025-01-01'
    };
    setCurrentAdmin(match);
  };

  // RBAC Permission Evaluator
  const canAccess = (module: 'dashboard' | 'users' | 'companions' | 'bookings' | 'finance' | 'safety' | 'moderation' | 'tickets' | 'analytics' | 'settings'): boolean => {
    if (!currentAdmin) return false;
    const role = currentAdmin.role;

    if (role === 'super_admin') return true;

    if (role === 'trust_safety_agent') {
      return ['dashboard', 'users', 'companions', 'safety', 'moderation'].includes(module);
    }

    if (role === 'finance_agent') {
      return ['dashboard', 'finance', 'bookings', 'analytics'].includes(module);
    }

    if (role === 'support_agent') {
      return ['dashboard', 'tickets', 'bookings', 'users', 'companions'].includes(module);
    }

    return false;
  };

  // Customer Management actions
  const updateCustomerStatus = (userId: string, status: CustomerStatus, reason: string) => {
    setCustomers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          status,
          notes: [
            ...u.notes,
            {
              id: `n-${Date.now()}`,
              authorName: currentAdmin?.name || 'Admin',
              authorRole: currentAdmin?.role || 'super_admin',
              text: `Status changed to ${status.toUpperCase()}. Reason: ${reason}`,
              createdAt: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return u;
    }));
    addAuditLog(`CUSTOMER_STATUS_${status.toUpperCase()}`, 'user', userId, userId, reason);
  };

  const addCustomerNote = (userId: string, text: string) => {
    setCustomers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          notes: [
            ...u.notes,
            {
              id: `n-${Date.now()}`,
              authorName: currentAdmin?.name || 'Admin',
              authorRole: currentAdmin?.role || 'super_admin',
              text,
              createdAt: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return u;
    }));
    addAuditLog('CUSTOMER_ADD_INTERNAL_NOTE', 'user', userId, userId, text);
  };

  const requestReverification = (userId: string) => {
    setCustomers(prev => prev.map(u => u.id === userId ? { ...u, verificationStatus: 'pending' } : u));
    addAuditLog('CUSTOMER_REQUEST_REVERIFICATION', 'user', userId, userId, 'Requested updated NID/Passport documentation.');
  };

  // Companion Management actions
  const updateCompanionStatus = (companionId: string, status: CompanionStatus, reason?: string) => {
    setCompanions(prev => prev.map(c => {
      if (c.id === companionId) {
        return {
          ...c,
          status,
          rejectionReason: reason || c.rejectionReason,
          verificationStatus: status === 'approved' || status === 'active' ? 'verified' : c.verificationStatus,
          backgroundCheckStatus: status === 'approved' || status === 'active' ? 'passed' : c.backgroundCheckStatus
        };
      }
      return c;
    }));
    addAuditLog(`COMPANION_STATUS_${status.toUpperCase()}`, 'companion', companionId, companionId, reason);
  };

  // Booking dispute resolution
  const resolveBookingDispute = (bookingId: string, resolutionNote: string, refundAmount?: number, banPartyId?: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'completed',
          paymentStatus: refundAmount && refundAmount > 0 ? 'partially_refunded' : b.paymentStatus,
          disputeDetails: b.disputeDetails ? {
            ...b.disputeDetails,
            status: 'resolved',
            resolutionNote,
            refundAmount,
            resolvedAt: new Date().toLocaleString(),
            resolvedBy: currentAdmin?.name
          } : undefined,
          timeline: [
            ...b.timeline,
            {
              title: 'Dispute Resolved by Staff',
              description: `${resolutionNote} (Refund: ${refundAmount || 0} BDT)`,
              timestamp: new Date().toLocaleString(),
              actor: currentAdmin?.name || 'Staff',
              type: 'success'
            }
          ]
        };
      }
      return b;
    }));

    if (banPartyId) {
      updateCustomerStatus(banPartyId, 'banned', `Banned due to dispute outcome in booking ${bookingId}`);
    }

    addAuditLog('RESOLVE_BOOKING_DISPUTE', 'booking', bookingId, bookingId, resolutionNote);
  };

  // Finance Payout batching & Refunds
  const processBatchPayout = (transactionIds: string[], batchRef: string) => {
    setTransactions(prev => prev.map(tx => {
      if (transactionIds.includes(tx.id)) {
        return {
          ...tx,
          payoutStatus: 'paid',
          payoutReference: batchRef,
          payoutDate: new Date().toLocaleString()
        };
      }
      return tx;
    }));
    addAuditLog('EXECUTE_BATCH_PAYOUT', 'payment', batchRef, `Batch of ${transactionIds.length} payouts`, `Executed via bank transfer ref ${batchRef}`);
  };

  const issueRefund = (transactionId: string, refundAmount: number, reason: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === transactionId) {
        return {
          ...tx,
          refundedAmount: refundAmount,
          refundReason: reason,
          payoutStatus: 'paid'
        };
      }
      return tx;
    }));
    addAuditLog('ISSUE_REFUND', 'payment', transactionId, transactionId, `Refunded ${refundAmount} BDT. Reason: ${reason}`);
  };

  // Safety & SOS
  const updateSOSStatus = (sosId: string, status: 'acknowledged' | 'resolved' | 'false_alarm', notes: string) => {
    setSosAlerts(prev => prev.map(s => {
      if (s.id === sosId) {
        return {
          ...s,
          status,
          resolutionNotes: notes,
          assignedAgent: currentAdmin?.name
        };
      }
      return s;
    }));
    addAuditLog(`SOS_ALERT_${status.toUpperCase()}`, 'safety_report', sosId, sosId, notes);
  };

  const resolveSafetyReport = (reportId: string, action: 'warned' | 'suspended' | 'banned' | 'dismissed' | 'refunded', note: string) => {
    setSafetyReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: action === 'dismissed' ? 'dismissed' : 'resolved',
          actionTaken: action,
          resolutionNote: note,
          resolvedAt: new Date().toLocaleString(),
          assignedAgent: currentAdmin?.name
        };
      }
      return r;
    }));
    addAuditLog(`RESOLVE_SAFETY_REPORT_${action.toUpperCase()}`, 'safety_report', reportId, reportId, note);
  };

  const moderateChatFlag = (flagId: string, action: 'dismiss' | 'warn' | 'suspend' | 'ban') => {
    setChatFlags(prev => prev.map(f => {
      if (f.id === flagId) {
        return {
          ...f,
          status: action === 'dismiss' ? 'dismissed' : 'actioned',
          actionTaken: action === 'warn' ? 'warned' : action === 'suspend' ? 'suspended' : action === 'ban' ? 'banned' : undefined
        };
      }
      return f;
    }));
    addAuditLog(`MODERATE_CHAT_${action.toUpperCase()}`, 'safety_report', flagId, flagId, `Action taken: ${action}`);
  };

  const moderateContentItem = (itemId: string, action: 'approved' | 'rejected', reason?: string) => {
    setContentModeration(prev => prev.map(m => {
      if (m.id === itemId) {
        return {
          ...m,
          status: action,
          rejectionReason: reason
        };
      }
      return m;
    }));
    addAuditLog(`MODERATE_CONTENT_${action.toUpperCase()}`, 'safety_report', itemId, itemId, reason);
  };

  // Support tickets
  const replyTicket = (ticketId: string, message: string, isInternalNote: boolean) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          updatedAt: new Date().toLocaleString(),
          messages: [
            ...t.messages,
            {
              id: `m-${Date.now()}`,
              senderName: currentAdmin?.name || 'Support Agent',
              senderRole: 'agent',
              isInternalNote,
              message,
              timestamp: new Date().toLocaleString()
            }
          ]
        };
      }
      return t;
    }));
    addAuditLog(isInternalNote ? 'TICKET_ADD_INTERNAL_NOTE' : 'TICKET_CUSTOMER_REPLY', 'ticket', ticketId, ticketId, message);
  };

  const updateTicketStatus = (ticketId: string, status: 'open' | 'pending' | 'resolved' | 'closed') => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status, updatedAt: new Date().toLocaleString() } : t));
    addAuditLog(`TICKET_STATUS_${status.toUpperCase()}`, 'ticket', ticketId, ticketId, `Ticket status changed to ${status}`);
  };

  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addAuditLog('UPDATE_PLATFORM_SETTINGS', 'settings', 'GLOBAL_SETTINGS', 'Platform Settings', 'Settings updated by Super Admin');
  };

  const addNewAdminAccount = (admin: Omit<AdminUser, 'id' | 'createdAt' | 'lastLoginAt'>) => {
    const created: AdminUser = {
      ...admin,
      id: `adm-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastLoginAt: 'Never'
    };
    setAdminAccounts(prev => [created, ...prev]);
    addAuditLog('CREATE_NEW_ADMIN_ACCOUNT', 'user', created.id, created.name, `Created admin with role ${created.role}`);
  };

  const registerAdmin = async (
    name: string,
    email: string,
    role: AdminRole,
    _password?: string,
    inviteCode?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const validTokens = ['NEVERALONE2026', 'ADMIN_INVITE', 'STAFF_SAFE', 'DHAKA_HQ_2026', 'PLATONIC_DEV'];
    if (inviteCode && inviteCode.trim() !== '' && !validTokens.includes(inviteCode.trim().toUpperCase())) {
      return { success: false, error: 'Invalid Staff Invitation Passcode. Use default NEVERALONE2026.' };
    }

    const existing = adminAccounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An administrative account with this email already exists.' };
    }

    const newAdmin: AdminUser = {
      id: `adm-${Date.now()}`,
      name,
      email,
      role,
      twoFactorEnabled: true,
      lastLoginAt: 'Just now',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAdminAccounts(prev => [newAdmin, ...prev]);
    setCurrentAdmin(newAdmin);
    addAuditLog('STAFF_SELF_REGISTERED', 'user', newAdmin.id, newAdmin.name, `New staff self-registered with role ${newAdmin.role}`);
    return { success: true };
  };

  const triggerMockSOS = () => {
    const newSOS: SOSAlert = {
      id: `SOS-${Date.now().toString().slice(-4)}`,
      bookingId: 'BK-8901',
      triggeredBy: 'companion',
      userName: 'Afsana Mimi (Companion)',
      userPhone: '+880 1711-998877',
      userEmail: 'afsana.mimi@gmail.com',
      companionName: 'Shakib Al Mahmud (Customer)',
      companionPhone: '+880 1711-234567',
      occasionType: 'Dinner Date Companion',
      venueName: 'The Manhattan Fish Market',
      venueAddress: 'Road 11, Banani, Dhaka',
      lastCheckInLocation: 'Banani 11 Circle (Lat: 23.7937, Long: 90.4043)',
      lastCheckInTime: new Date().toLocaleTimeString(),
      triggeredAt: new Date().toLocaleTimeString(),
      status: 'active',
      policeContacted: false,
      emergencyContacts: [
        { name: 'Dr. Rafiqul Mimi', relation: 'Father', phone: '+880 1711-112233' }
      ]
    };
    setSosAlerts(prev => [newSOS, ...prev]);
    addAuditLog('EMERGENCY_SOS_TRIGGERED', 'safety_report', newSOS.id, newSOS.userName, 'Live SOS Emergency alert triggered in active session!');
  };

  const activeSOSCount = sosAlerts.filter(s => s.status === 'active').length;

  return (
    <AdminAuthContext.Provider value={{
      currentAdmin,
      isAuthenticated: Boolean(currentAdmin),
      login,
      logout,
      switchRole,
      canAccess,
      customers,
      companions,
      bookings,
      sosAlerts,
      safetyReports,
      chatFlags,
      contentModeration,
      tickets,
      transactions,
      auditLogs,
      settings,
      updateCustomerStatus,
      addCustomerNote,
      requestReverification,
      updateCompanionStatus,
      resolveBookingDispute,
      processBatchPayout,
      issueRefund,
      updateSOSStatus,
      resolveSafetyReport,
      moderateChatFlag,
      moderateContentItem,
      replyTicket,
      updateTicketStatus,
      updateSettings,
      addNewAdminAccount,
      registerAdmin,
      activeSOSCount,
      triggerMockSOS
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
