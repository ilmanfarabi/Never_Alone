import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { AdminRole, AuditLogEntry } from '../types/adminTypes';
import { initialAdmins } from '../data/adminMockData';
import { DataTable, type Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Users, 
  ShieldCheck, 
  Sliders, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  History
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { 
    currentAdmin, 
    settings, 
    auditLogs, 
    addNewAdminAccount, 
    updateSettings
  } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<'staff' | 'platform' | 'keywords' | 'audit'>('staff');
  const [staffList, setStaffList] = useState(initialAdmins);

  // New staff modal
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<AdminRole>('support_agent');

  // Platform settings form
  const [minRate, setMinRate] = useState(settings.minimumHourlyRate);
  const [cancelWindow, setCancelWindow] = useState(settings.cancellationFreeWindowHours);
  const [emergencyPhone, setEmergencyPhone] = useState(settings.emergencyHotline);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  // Keyword dictionary
  const [keywordList, setKeywordList] = useState<string[]>(settings.bannedKeywords);
  const [newWord, setNewWord] = useState('');

  const isSuperAdmin = currentAdmin?.role === 'super_admin';

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName || !newStaffEmail) return;

    const newAdmin = {
      name: newStaffName,
      email: newStaffEmail,
      role: newStaffRole,
      twoFactorEnabled: true,
      status: 'active' as const
    };

    addNewAdminAccount(newAdmin);
    setStaffList(prev => [
      ...prev,
      {
        ...newAdmin,
        id: `adm-${Date.now().toString().slice(-4)}`,
        lastLoginAt: 'Never',
        createdAt: new Date().toISOString().split('T')[0]
      }
    ]);

    setNewStaffName('');
    setNewStaffEmail('');
    setShowAddStaffModal(false);
  };

  const handleSavePlatformSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      minimumHourlyRate: minRate,
      cancellationFreeWindowHours: cancelWindow,
      emergencyHotline: emergencyPhone
    });

    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 3000);
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || keywordList.includes(newWord.trim().toLowerCase())) return;
    const updated = [...keywordList, newWord.trim().toLowerCase()];
    setKeywordList(updated);
    updateSettings({ bannedKeywords: updated });
    setNewWord('');
  };

  const handleRemoveKeyword = (wordToRemove: string) => {
    const updated = keywordList.filter(w => w !== wordToRemove);
    setKeywordList(updated);
    updateSettings({ bannedKeywords: updated });
  };

  const auditColumns: Column<AuditLogEntry>[] = [
    {
      header: 'Timestamp',
      accessorKey: 'timestamp' as keyof AuditLogEntry,
      sortable: true,
      cell: (log: AuditLogEntry) => (
        <span className="text-xs text-slate-500 whitespace-nowrap">
          {log.timestamp}
        </span>
      )
    },
    {
      header: 'Staff Admin',
      accessorKey: 'adminName' as keyof AuditLogEntry,
      sortable: true,
      cell: (log: AuditLogEntry) => (
        <div>
          <p className="text-xs font-bold text-slate-900">{log.adminName}</p>
          <span className="text-[10px] font-mono text-slate-400 capitalize">{log.adminRole.replace('_', ' ')}</span>
        </div>
      )
    },
    {
      header: 'Action Taken',
      accessorKey: 'action' as keyof AuditLogEntry,
      sortable: true,
      cell: (log: AuditLogEntry) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-800 uppercase tracking-wide">
          {log.action.replace(/_/g, ' ')}
        </span>
      )
    },
    {
      header: 'Target Entity',
      accessorKey: 'targetId' as keyof AuditLogEntry,
      cell: (log: AuditLogEntry) => (
        <span className="text-xs font-mono text-slate-700">{log.targetType}: {log.targetName}</span>
      )
    },
    {
      header: 'Mandatory Reason / Audit Note',
      accessorKey: 'reasonOrNote' as keyof AuditLogEntry,
      cell: (log: AuditLogEntry) => (
        <p className="text-xs text-slate-700 italic max-w-xs truncate" title={log.reasonOrNote}>
          "{log.reasonOrNote || 'N/A'}"
        </p>
      )
    },
    {
      header: 'IP Address',
      accessorKey: 'ipAddress' as keyof AuditLogEntry,
      cell: (log: AuditLogEntry) => (
        <span className="text-[11px] font-mono text-slate-400">{log.ipAddress}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Administration & System Governance</h1>
          <p className="text-sm text-slate-500">
            Manage staff RBAC roles, audit logs, safety keyword filters, and platform operational policies.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'staff' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Staff Accounts</span>
          </button>

          <button
            onClick={() => setActiveTab('platform')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'platform' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>Platform Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'keywords' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>Banned Keywords</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'audit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4 text-purple-600" />
            <span>System Audit Trail</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Staff Admin Management */}
      {activeTab === 'staff' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Internal Staff & RBAC Accounts ({staffList.length})</h2>
              <p className="text-xs text-slate-500">
                Staff members with administrative credentials and designated permission boundaries.
              </p>
            </div>

            {isSuperAdmin && (
              <button
                onClick={() => setShowAddStaffModal(true)}
                className="px-4 py-2 bg-[#FF6F61] hover:bg-[#ff5a4a] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Invite New Staff Member</span>
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">RBAC Role</th>
                  <th className="py-3 px-4">2FA Status</th>
                  <th className="py-3 px-4">Account Status</th>
                  <th className="py-3 px-4">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {staffList.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#1B3A4B] text-white flex items-center justify-center text-xs font-black">
                        {member.name.charAt(0)}
                      </div>
                      <span>{member.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {member.email}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        member.role === 'super_admin' ? 'bg-purple-100 text-purple-800' :
                        member.role === 'trust_safety_agent' ? 'bg-red-100 text-red-800' :
                        member.role === 'finance_agent' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {member.role.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {member.twoFactorEnabled ? (
                        <span className="flex items-center text-emerald-600 font-semibold text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Enforced (App)
                        </span>
                      ) : (
                        <span className="text-slate-400">Disabled</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {member.lastLoginAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Platform Rules & Operational Config */}
      {activeTab === 'platform' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 max-w-3xl space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Platform Operating Parameters</h2>
              <p className="text-xs text-slate-500">Configure core booking policies, minimum rate, and emergency hotline.</p>
            </div>
          </div>

          {savedSettingsNotice && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Platform rules updated and committed to the system audit trail.</span>
            </div>
          )}

          <form onSubmit={handleSavePlatformSettings} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Minimum Base Hourly Rate (BDT)
                </label>
                <input
                  type="number"
                  min="200"
                  max="5000"
                  step="50"
                  value={minRate}
                  onChange={(e) => setMinRate(parseInt(e.target.value) || 300)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-[#FF6F61] focus:outline-hidden"
                />
                <p className="text-[11px] text-slate-400 mt-1">Companions cannot list their hourly rate below this threshold.</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Free Cancellation Window (Hours)
                </label>
                <input
                  type="number"
                  min="1"
                  max="48"
                  value={cancelWindow}
                  onChange={(e) => setCancelWindow(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-[#FF6F61] focus:outline-hidden"
                />
                <p className="text-[11px] text-slate-400 mt-1">Full refund allowed if canceled before this window.</p>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Emergency 24/7 Safety Dispatch Hotline
              </label>
              <input
                type="text"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-[#FF6F61] focus:outline-hidden"
              />
              <p className="text-[11px] text-slate-400 mt-1">Displayed in active SOS alerts and customer safety banners.</p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1B3A4B] hover:bg-[#132a36] text-white font-bold rounded-xl shadow-xs transition"
              >
                Save Operational Rules
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: Banned Platonic Keyword Dictionary */}
      {activeTab === 'keywords' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 max-w-3xl space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Platonic Policy Banned Word Filter</h2>
              <p className="text-xs text-slate-500">
                Any chat messages containing these keywords are automatically flagged to the Trust & Safety team.
              </p>
            </div>
          </div>

          <form onSubmit={handleAddKeyword} className="flex gap-2">
            <input
              type="text"
              placeholder="Add keyword (e.g. 'hotel', 'kiss', 'massage', 'direct pay')..."
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Filter</span>
            </button>
          </form>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Active Trigger Keywords ({keywordList.length})
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {keywordList.map(word => (
                <span
                  key={word}
                  className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 text-red-800 border border-red-200"
                >
                  <span>{word}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(word)}
                    className="ml-2 text-red-400 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: System Audit Trail Log */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Immutable Administrative Audit Log</h2>
            <p className="text-xs text-slate-500">
              Every sensitive action (bans, approvals, refunds, payouts, setting changes) with admin identity and mandatory rationale.
            </p>
          </div>

          <DataTable
            data={auditLogs}
            columns={auditColumns}
            searchPlaceholder="Search audit logs by action, admin, target or reason..."
            searchFields={['action', 'adminName', 'targetType', 'reasonOrNote']}
            emptyMessage="No audit logs recorded yet."
          />
        </div>
      )}

      {/* Modal: Invite New Staff Member */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Provision Staff Administrator</h3>
              <button onClick={() => setShowAddStaffModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Khan"
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF6F61] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="sarah@neveralone.bd"
                  value={newStaffEmail}
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF6F61] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Assigned RBAC Role</label>
                <select
                  value={newStaffRole}
                  onChange={(e) => setNewStaffRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF6F61] focus:outline-hidden font-semibold text-slate-800"
                >
                  <option value="trust_safety_agent">Trust & Safety Agent (SOS, Verification, Reports)</option>
                  <option value="finance_agent">Finance Agent (Payments, Payouts, Commissions)</option>
                  <option value="support_agent">Support Agent (Tickets & Booking disputes)</option>
                  <option value="super_admin">Super Admin (Full System Access)</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-[11px] text-blue-800">
                Staff member will receive an invitation email to set their password and configure mandatory 2FA Authenticator.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B3A4B] hover:bg-[#132a36] text-white rounded-xl font-bold"
                >
                  Create & Dispatch Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
