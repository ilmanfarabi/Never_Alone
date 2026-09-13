import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Ban, 
  PauseCircle, 
  CheckCircle2, 
  RotateCcw, 
  KeyRound,
  X
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { CustomerUser } from '../types/adminTypes';
import { DataTable, type Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfirmActionModal } from '../components/common/ConfirmActionModal';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';

export const UserManagement: React.FC = () => {
  const { 
    customers, 
    bookings, 
    safetyReports, 
    updateCustomerStatus, 
    addCustomerNote, 
    requestReverification 
  } = useAdminAuth();

  const [selectedUser, setSelectedUser] = useState<CustomerUser | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'reports' | 'notes'>('profile');
  const [newNoteText, setNewNoteText] = useState('');

  // Modals state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    action: (reason: string) => void;
    isDestructive: boolean;
  }>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: '',
    action: () => {},
    isDestructive: true
  });

  const [documentViewer, setDocumentViewer] = useState<{
    isOpen: boolean;
    title: string;
    documentType: string;
    ownerName: string;
    documentUrl: string;
    verificationStatus?: string;
  }>({
    isOpen: false,
    title: '',
    documentType: '',
    ownerName: '',
    documentUrl: ''
  });

  // Actions handlers
  const handleBanUser = (user: CustomerUser) => {
    setConfirmModal({
      isOpen: true,
      title: `Permanently Ban ${user.name}?`,
      description: 'This will terminate all active bookings, revoke login access, and blacklist their NID/phone across NeverAlone.',
      confirmText: 'Permanently Ban User',
      isDestructive: true,
      action: (reason) => {
        updateCustomerStatus(user.id, 'banned', reason);
        if (selectedUser?.id === user.id) {
          setSelectedUser(prev => prev ? { ...prev, status: 'banned' } : null);
        }
      }
    });
  };

  const handleSuspendUser = (user: CustomerUser) => {
    setConfirmModal({
      isOpen: true,
      title: `Suspend Account for ${user.name}?`,
      description: 'The user will be temporarily blocked from booking or contacting companions.',
      confirmText: 'Suspend Account',
      isDestructive: true,
      action: (reason) => {
        updateCustomerStatus(user.id, 'suspended', reason);
        if (selectedUser?.id === user.id) {
          setSelectedUser(prev => prev ? { ...prev, status: 'suspended' } : null);
        }
      }
    });
  };

  const handleReactivateUser = (user: CustomerUser) => {
    setConfirmModal({
      isOpen: true,
      title: `Reactivate Account for ${user.name}?`,
      description: 'Restore full booking and login privileges.',
      confirmText: 'Reactivate Account',
      isDestructive: false,
      action: (reason) => {
        updateCustomerStatus(user.id, 'active', reason);
        if (selectedUser?.id === user.id) {
          setSelectedUser(prev => prev ? { ...prev, status: 'active' } : null);
        }
      }
    });
  };

  const handleAddNote = () => {
    if (!selectedUser || !newNoteText.trim()) return;
    addCustomerNote(selectedUser.id, newNoteText.trim());
    setNewNoteText('');
  };

  const handleExportCsv = () => {
    const csvHeader = 'ID,Name,Email,Phone,Signup Date,Verification,Bookings,Spent (BDT),Status\n';
    const csvRows = customers.map(u => 
      `"${u.id}","${u.name}","${u.email}","${u.phone}","${u.signupDate}","${u.verificationStatus}","${u.totalBookings}","${u.totalSpent}","${u.status}"`
    ).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neveralone_customers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Table Columns definition
  const columns: Column<CustomerUser>[] = [
    {
      header: 'Customer Details',
      accessorKey: 'name',
      sortable: true,
      cell: (user) => (
        <div className="flex items-center gap-3">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <div>
            <div className="font-bold text-slate-900">{user.name}</div>
            <div className="text-[11px] text-slate-500 font-mono">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
      cell: (user) => <span className="font-mono text-slate-700">{user.phone}</span>
    },
    {
      header: 'Signup Date',
      accessorKey: 'signupDate',
      sortable: true,
      cell: (user) => <span className="text-slate-600">{user.signupDate}</span>
    },
    {
      header: 'ID Verification',
      accessorKey: 'verificationStatus',
      sortable: true,
      cell: (user) => (
        <div className="flex items-center gap-1.5">
          <StatusBadge status={user.verificationStatus} />
          {user.idDocumentUrl && (
            <button
              onClick={() => setDocumentViewer({
                isOpen: true,
                title: `${user.name}'s Identity Document`,
                documentType: user.idDocumentType || 'NID',
                ownerName: user.name,
                documentUrl: user.idDocumentUrl || '',
                verificationStatus: user.verificationStatus
              })}
              className="p-1 rounded text-slate-400 hover:text-[#1B3A4B] hover:bg-slate-100"
              title="Inspect Document"
            >
              <FileText className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )
    },
    {
      header: 'Bookings',
      accessorKey: 'totalBookings',
      sortable: true,
      cell: (user) => (
        <span className="font-bold text-slate-800">
          {user.totalBookings} <span className="text-[10px] text-slate-400 font-normal">sessions</span>
        </span>
      )
    },
    {
      header: 'Total Spent',
      accessorKey: 'totalSpent',
      sortable: true,
      cell: (user) => <span className="font-mono font-bold text-slate-900">৳{user.totalSpent.toLocaleString()}</span>
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (user) => <StatusBadge status={user.status} />
    },
    {
      header: 'Actions',
      cell: (user) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setSelectedUser(user);
              setActiveTab('profile');
            }}
            className="px-2.5 py-1 rounded-lg bg-[#1B3A4B] text-white text-xs font-semibold hover:bg-[#142d3b] transition-colors"
          >
            View Details
          </button>
        </div>
      )
    }
  ];

  // User details drawer data
  const userBookings = selectedUser ? bookings.filter(b => b.customerId === selectedUser.id) : [];
  const reportsAgainstUser = selectedUser ? safetyReports.filter(r => r.reportedId === selectedUser.id) : [];
  const reportsFiledByUser = selectedUser ? safetyReports.filter(r => r.reporterId === selectedUser.id) : [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-[#1B3A4B]">Customer Management</h2>
          <p className="text-xs text-slate-500">
            View, verify, moderate and manage customer accounts ({customers.length} total)
          </p>
        </div>
      </div>

      {/* Main Data Table */}
      <DataTable
        data={customers}
        columns={columns}
        searchPlaceholder="Search by customer name, email or phone..."
        searchFields={['name', 'email', 'phone']}
        filters={[
          {
            key: 'status',
            label: 'Account Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Suspended', value: 'suspended' },
              { label: 'Banned', value: 'banned' }
            ]
          },
          {
            key: 'verificationStatus',
            label: 'Verification',
            options: [
              { label: 'Verified', value: 'verified' },
              { label: 'Pending', value: 'pending' },
              { label: 'Unverified', value: 'unverified' },
              { label: 'Rejected', value: 'rejected' }
            ]
          }
        ]}
        onExportCsv={handleExportCsv}
        pageSize={10}
      />

      {/* Slide-over User Detail Modal / Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedUser.avatarUrl}
                  alt={selectedUser.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">{selectedUser.name}</h3>
                    <StatusBadge status={selectedUser.status} />
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedUser.email} • {selectedUser.phone}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Customer since {selectedUser.signupDate}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 border-b border-slate-200 bg-white text-xs font-bold text-slate-500">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-3 px-3 border-b-2 transition-all ${
                  activeTab === 'profile' ? 'border-[#1B3A4B] text-[#1B3A4B]' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Profile & Verification
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-3 px-3 border-b-2 transition-all ${
                  activeTab === 'bookings' ? 'border-[#1B3A4B] text-[#1B3A4B]' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Booking History ({userBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-3 px-3 border-b-2 transition-all ${
                  activeTab === 'reports' ? 'border-[#1B3A4B] text-[#1B3A4B]' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Safety Reports ({reportsAgainstUser.length + reportsFiledByUser.length})
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`py-3 px-3 border-b-2 transition-all ${
                  activeTab === 'notes' ? 'border-[#1B3A4B] text-[#1B3A4B]' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Internal Notes ({selectedUser.notes.length})
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs">
              {/* 1. Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  {/* Account Summary */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Total Bookings</span>
                      <p className="text-base font-bold text-slate-900">{selectedUser.totalBookings}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Total Billed</span>
                      <p className="text-base font-bold text-slate-900">৳{selectedUser.totalSpent.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">ID Verification</span>
                      <div className="mt-0.5"><StatusBadge status={selectedUser.verificationStatus} /></div>
                    </div>
                  </div>

                  {/* ID Document Card */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">
                        {selectedUser.idDocumentType || 'National ID (NID)'} Document
                      </span>
                      {selectedUser.idDocumentUrl && (
                        <button
                          onClick={() => setDocumentViewer({
                            isOpen: true,
                            title: `${selectedUser.name}'s ID Card`,
                            documentType: selectedUser.idDocumentType || 'NID',
                            ownerName: selectedUser.name,
                            documentUrl: selectedUser.idDocumentUrl!,
                            verificationStatus: selectedUser.verificationStatus
                          })}
                          className="text-[#FF6F61] font-bold text-xs hover:underline flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Document</span>
                        </button>
                      )}
                    </div>

                    {selectedUser.idDocumentUrl ? (
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <FileText className="w-6 h-6 text-[#1B3A4B]" />
                        <div>
                          <p className="font-semibold text-slate-800">{selectedUser.idDocumentType} - Verified by Trust Desk</p>
                          <p className="text-[11px] text-slate-400">Uploaded during account onboarding</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">No document uploaded yet.</p>
                    )}
                  </div>

                  {/* Administrative Action Control Panel */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <h4 className="font-bold text-slate-900">Staff Account Actions</h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => requestReverification(selectedUser.id)}
                        className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-4 h-4 text-amber-600" />
                        <span>Request Re-verification</span>
                      </button>

                      <button
                        onClick={() => alert(`Password reset link generated and sent to ${selectedUser.email}`)}
                        className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-1.5"
                      >
                        <KeyRound className="w-4 h-4 text-indigo-600" />
                        <span>Reset Password</span>
                      </button>

                      {selectedUser.status === 'active' ? (
                        <button
                          onClick={() => handleSuspendUser(selectedUser)}
                          className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 font-bold flex items-center justify-center gap-1.5"
                        >
                          <PauseCircle className="w-4 h-4" />
                          <span>Suspend Account</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReactivateUser(selectedUser)}
                          className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Reactivate Account</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleBanUser(selectedUser)}
                        disabled={selectedUser.status === 'banned'}
                        className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 font-bold flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <Ban className="w-4 h-4" />
                        <span>{selectedUser.status === 'banned' ? 'Already Banned' : 'Permanently Ban'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="space-y-3">
                  {userBookings.map(b => (
                    <div key={b.id} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{b.id} • {b.occasionType}</span>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="text-slate-600">
                        Companion: <strong className="text-slate-800">{b.companionName}</strong> • {b.date} ({b.time})
                      </div>
                      <div className="text-slate-500">
                        Venue: {b.venueName}, {b.venueAddress}
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-slate-800">৳{b.amount.toLocaleString()} ({b.durationHours}h)</span>
                        <span className="text-slate-400">Created: {b.createdAt}</span>
                      </div>
                    </div>
                  ))}

                  {userBookings.length === 0 && (
                    <div className="p-8 text-center text-slate-400">No booking records found for this customer.</div>
                  )}
                </div>
              )}

              {/* 3. Reports Tab */}
              {activeTab === 'reports' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-rose-700 mb-2">Reports Filed Against User ({reportsAgainstUser.length})</h4>
                    <div className="space-y-2">
                      {reportsAgainstUser.map(r => (
                        <div key={r.id} className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-rose-900">{r.category.replace(/_/g, ' ').toUpperCase()}</span>
                            <StatusBadge status={r.status} />
                          </div>
                          <p className="text-slate-700">{r.description}</p>
                          <span className="text-[10px] text-slate-400 block pt-1">Reported by {r.reporterName} on {r.createdAt}</span>
                        </div>
                      ))}
                      {reportsAgainstUser.length === 0 && <p className="text-slate-400 italic">No reports filed against this customer.</p>}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">Reports Filed by User ({reportsFiledByUser.length})</h4>
                    <div className="space-y-2">
                      {reportsFiledByUser.map(r => (
                        <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{r.category.replace(/_/g, ' ').toUpperCase()}</span>
                            <StatusBadge status={r.status} />
                          </div>
                          <p className="text-slate-700">{r.description}</p>
                          <span className="text-[10px] text-slate-400 block pt-1">Target: {r.reportedName} • {r.createdAt}</span>
                        </div>
                      ))}
                      {reportsFiledByUser.length === 0 && <p className="text-slate-400 italic">User has not filed any incident reports.</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Internal Notes Tab */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  {/* Add Note Input */}
                  <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="block font-bold text-slate-700">Add Confidential Staff Note</label>
                    <textarea
                      rows={2}
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Write an internal operational note regarding this customer..."
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1B3A4B]"
                    />
                    <button
                      onClick={handleAddNote}
                      disabled={!newNoteText.trim()}
                      className="px-3 py-1.5 rounded-lg bg-[#1B3A4B] text-white text-xs font-bold disabled:opacity-40"
                    >
                      Save Internal Note
                    </button>
                  </div>

                  {/* Notes Timeline */}
                  <div className="space-y-2">
                    {selectedUser.notes.map(n => (
                      <div key={n.id} className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-900">{n.authorName} ({n.authorRole.replace(/_/g, ' ')})</span>
                          <span className="text-slate-400">{n.createdAt}</span>
                        </div>
                        <p className="text-slate-700">{n.text}</p>
                      </div>
                    ))}
                    {selectedUser.notes.length === 0 && (
                      <p className="text-slate-400 italic text-center py-4">No internal staff notes recorded yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmActionModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.action}
        title={confirmModal.title}
        description={confirmModal.description}
        confirmButtonText={confirmModal.confirmText}
        isDestructive={confirmModal.isDestructive}
      />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={documentViewer.isOpen}
        onClose={() => setDocumentViewer(prev => ({ ...prev, isOpen: false }))}
        title={documentViewer.title}
        documentType={documentViewer.documentType}
        ownerName={documentViewer.ownerName}
        documentUrl={documentViewer.documentUrl}
        verificationStatus={documentViewer.verificationStatus}
      />
    </div>
  );
};
