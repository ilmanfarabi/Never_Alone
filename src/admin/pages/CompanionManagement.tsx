import React, { useState, useMemo } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  Eye, 
  PauseCircle, 
  Star, 
  X
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { CompanionProfile } from '../types/adminTypes';
import { DataTable, type Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfirmActionModal } from '../components/common/ConfirmActionModal';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';

export const CompanionManagement: React.FC = () => {
  const { companions, updateCompanionStatus } = useAdminAuth();

  const [selectedCompanion, setSelectedCompanion] = useState<CompanionProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'photos' | 'verification' | 'earnings'>('details');

  // Modal states
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

  // Pending queue sorted oldest first
  const pendingCompanions = useMemo(() => {
    return companions
      .filter(c => c.status === 'pending')
      .sort((a, b) => new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime());
  }, [companions]);

  const handleApprove = (comp: CompanionProfile) => {
    setConfirmModal({
      isOpen: true,
      title: `Approve ${comp.name} as Official Companion?`,
      description: 'The companion profile will be verified, marked background-checked, and immediately available for customer bookings.',
      confirmText: 'Approve Companion',
      isDestructive: false,
      action: () => {
        updateCompanionStatus(comp.id, 'active');
        if (selectedCompanion?.id === comp.id) {
          setSelectedCompanion(prev => prev ? { ...prev, status: 'active', verificationStatus: 'verified', backgroundCheckStatus: 'passed' } : null);
        }
      }
    });
  };

  const handleReject = (comp: CompanionProfile) => {
    setConfirmModal({
      isOpen: true,
      title: `Reject Application for ${comp.name}?`,
      description: 'The application will be rejected and the reason logged and sent to the applicant.',
      confirmText: 'Reject Application',
      isDestructive: true,
      action: (reason) => {
        updateCompanionStatus(comp.id, 'rejected', reason);
        if (selectedCompanion?.id === comp.id) {
          setSelectedCompanion(prev => prev ? { ...prev, status: 'rejected', rejectionReason: reason } : null);
        }
      }
    });
  };

  const handleSuspend = (comp: CompanionProfile) => {
    setConfirmModal({
      isOpen: true,
      title: `Suspend ${comp.name}?`,
      description: 'The companion will be hidden from customer search and prevented from accepting new sessions.',
      confirmText: 'Suspend Companion',
      isDestructive: true,
      action: (reason) => {
        updateCompanionStatus(comp.id, 'suspended', reason);
        if (selectedCompanion?.id === comp.id) {
          setSelectedCompanion(prev => prev ? { ...prev, status: 'suspended' } : null);
        }
      }
    });
  };

  const handleExportCsv = () => {
    const csvHeader = 'ID,Name,Email,Phone,Hourly Rate,Rating,Total Sessions,Earnings (BDT),Pending Payout (BDT),Status,Verification\n';
    const csvRows = companions.map(c => 
      `"${c.id}","${c.name}","${c.email}","${c.phone}","${c.hourlyRate}","${c.rating}","${c.totalSessions}","${c.totalEarnings}","${c.pendingPayout}","${c.status}","${c.verificationStatus}"`
    ).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neveralone_companions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const columns: Column<CompanionProfile>[] = [
    {
      header: 'Companion Details',
      accessorKey: 'name',
      sortable: true,
      cell: (comp) => (
        <div className="flex items-center gap-3">
          <img
            src={comp.avatarUrl}
            alt={comp.name}
            className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
          />
          <div>
            <div className="font-bold text-slate-900">{comp.name}</div>
            <div className="text-sm text-slate-500">{comp.gender}, {comp.age}y/o • {comp.city}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Rate / Hour',
      accessorKey: 'hourlyRate',
      sortable: true,
      cell: (comp) => <span className="font-mono font-bold text-slate-900">৳{comp.hourlyRate}/hr</span>
    },
    {
      header: 'Verification & Background',
      accessorKey: 'verificationStatus',
      cell: (comp) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-sm text-slate-400 font-medium">NID:</span>
            <StatusBadge status={comp.verificationStatus} />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-slate-400 font-medium">BG Check:</span>
            <StatusBadge status={comp.backgroundCheckStatus} />
          </div>
        </div>
      )
    },
    {
      header: 'Rating & Sessions',
      accessorKey: 'rating',
      sortable: true,
      cell: (comp) => (
        <div>
          <div className="flex items-center gap-1 font-bold text-amber-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{comp.rating > 0 ? comp.rating.toFixed(1) : 'New'}</span>
            <span className="text-sm text-slate-400">({comp.reviewCount})</span>
          </div>
          <div className="text-sm text-slate-500 font-medium">{comp.totalSessions} sessions</div>
        </div>
      )
    },
    {
      header: 'Earnings & Payout',
      accessorKey: 'totalEarnings',
      sortable: true,
      cell: (comp) => (
        <div>
          <div className="font-bold font-mono text-slate-900">৳{comp.totalEarnings.toLocaleString()}</div>
          {comp.pendingPayout > 0 && (
            <div className="text-sm font-semibold text-amber-700 font-mono">
              Pending: ৳{comp.pendingPayout.toLocaleString()}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (comp) => <StatusBadge status={comp.status} />
    },
    {
      header: 'Actions',
      cell: (comp) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setSelectedCompanion(comp);
              setActiveTab('details');
            }}
            className="px-2.5 py-1 rounded-lg bg-[#1B3A4B] text-white text-sm font-semibold hover:bg-[#142d3b]"
          >
            Review Profile
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#1B3A4B]">Companion & Host Management</h2>
          <p className="text-sm text-slate-500">
            Screen applications, verify background checks, monitor performance and process approvals ({companions.length} total)
          </p>
        </div>
      </div>

      {/* 1. Pending Approvals Queue Banner (Oldest First) */}
      {pendingCompanions.length > 0 && (
        <div className="bg-amber-50/80 rounded-2xl border border-amber-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <h3 className="text-sm font-black">
                Pending Approval Queue ({pendingCompanions.length} applications awaiting review)
              </h3>
            </div>
            <span className="text-sm text-amber-700 font-medium">Sorted by submission date (Oldest First)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pendingCompanions.map(comp => (
              <div key={comp.id} className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={comp.avatarUrl}
                      alt={comp.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{comp.name}</h4>
                      <p className="text-sm text-slate-500">{comp.age}y/o • {comp.city}</p>
                      <p className="text-sm text-slate-400">Applied: {comp.appliedDate}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 italic">"{comp.bio}"</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelectedCompanion(comp);
                      setActiveTab('verification');
                    }}
                    className="flex-1 py-1.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Inspect NID
                  </button>
                  <button
                    onClick={() => handleApprove(comp)}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(comp)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                    title="Reject"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Main DataTable */}
      <DataTable
        data={companions}
        columns={columns}
        searchPlaceholder="Search by companion name, phone, city or languages..."
        searchFields={['name', 'email', 'phone', 'city']}
        filters={[
          {
            key: 'status',
            label: 'Companion Status',
            options: [
              { label: 'Pending Review', value: 'pending' },
              { label: 'Active', value: 'active' },
              { label: 'Approved', value: 'approved' },
              { label: 'Suspended', value: 'suspended' },
              { label: 'Rejected', value: 'rejected' }
            ]
          },
          {
            key: 'backgroundCheckStatus',
            label: 'Background Check',
            options: [
              { label: 'Passed', value: 'passed' },
              { label: 'Pending', value: 'pending' },
              { label: 'Failed', value: 'failed' }
            ]
          }
        ]}
        onExportCsv={handleExportCsv}
        pageSize={10}
      />

      {/* 3. Slide-over Companion Detail Modal / Drawer */}
      {selectedCompanion && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedCompanion.avatarUrl}
                  alt={selectedCompanion.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900">{selectedCompanion.name}</h3>
                    <StatusBadge status={selectedCompanion.status} />
                  </div>
                  <p className="text-sm text-slate-500 font-mono mt-0.5">{selectedCompanion.email} • {selectedCompanion.phone}</p>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {selectedCompanion.gender}, {selectedCompanion.age} yrs • Rate: <strong>৳{selectedCompanion.hourlyRate}/hr</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCompanion(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 border-b border-slate-200 bg-white text-sm font-bold text-slate-500">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-3 px-3 border-b-2 transition-all ${
                  activeTab === 'details' ? 'border-[#1B3A4B] text-[#1B3A4B]' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Profile & Bio
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`py-3 px-3 border-b-2 transition-all ${
                  activeTab === 'photos' ? 'border-[#1B3A4B] text-[#1B3A4B]' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Gallery Photos ({selectedCompanion.galleryPhotos.length})
              </button>
              <button
                onClick={() => setActiveTab('verification')}
                className={`py-3 px-3 border-b-2 transition-all ${
                  activeTab === 'verification' ? 'border-[#1B3A4B] text-[#1B3A4B]' : 'border-transparent hover:text-slate-800'
                }`}
              >
                NID & BG Check
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`py-3 px-3 border-b-2 transition-all ${
                  activeTab === 'earnings' ? 'border-[#1B3A4B] text-[#1B3A4B]' : 'border-transparent hover:text-slate-800'
                }`}
              >
                Earnings & Commission
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 text-sm">
              
              {/* Tab 1: Profile & Bio */}
              {activeTab === 'details' && (
                <div className="space-y-4">
                  {/* Bio Card */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-sm uppercase font-bold text-slate-400">Personal Bio & Description</span>
                    <p className="text-slate-800 leading-relaxed font-normal">{selectedCompanion.bio}</p>
                  </div>

                  {/* Interests & Languages */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-sm uppercase font-bold text-slate-400">Interests & Hobbies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCompanion.interests.map(int => (
                          <span key={int} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-sm">
                            {int}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-sm uppercase font-bold text-slate-400">Languages Spoken</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCompanion.languages.map(lang => (
                          <span key={lang} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-blue-700 text-sm font-semibold">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-sm uppercase font-bold text-slate-400">General Availability Schedule</span>
                    <p className="text-slate-800 font-semibold">{selectedCompanion.availability.join(' • ')}</p>
                  </div>

                  {/* Rejection notice if present */}
                  {selectedCompanion.rejectionReason && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 space-y-1">
                      <span className="font-bold">Rejection / Suspension Reason:</span>
                      <p>{selectedCompanion.rejectionReason}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Gallery Photos */}
              {activeTab === 'photos' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedCompanion.galleryPhotos.map((photo, i) => (
                      <div key={i} className="relative rounded-xl border border-slate-200 overflow-hidden group">
                        <img 
                          src={photo.url} 
                          alt="Gallery"
                          className="w-full h-40 object-cover"
                        />
                        {photo.flagged && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-sm">
                            FLAGGED CONTENT
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Verification & Background check */}
              {activeTab === 'verification' && (
                <div className="space-y-4">
                  {/* NID Document */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">National ID Card / Passport Document</span>
                      <button
                        onClick={() => setDocumentViewer({
                          isOpen: true,
                          title: `${selectedCompanion.name}'s NID Document`,
                          documentType: 'National ID (Smart Card)',
                          ownerName: selectedCompanion.name,
                          documentUrl: selectedCompanion.idDocumentUrl,
                          verificationStatus: selectedCompanion.verificationStatus
                        })}
                        className="text-[#FF6F61] font-bold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Document</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>Status:</span>
                      <StatusBadge status={selectedCompanion.verificationStatus} />
                    </div>
                  </div>

                  {/* Background check certificate */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Police Background & Criminal Record Check</span>
                      <StatusBadge status={selectedCompanion.backgroundCheckStatus} />
                    </div>
                    <p className="text-slate-500 text-sm">
                      Criminal record clearance verified via SB Special Branch database.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 4: Earnings & Commission */}
              {activeTab === 'earnings' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-sm uppercase font-bold text-slate-400">Total Lifetime Earnings</span>
                      <p className="text-2xl font-black text-slate-900 font-mono">৳{selectedCompanion.totalEarnings.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-sm uppercase font-bold text-slate-400">Pending Escrow Payout</span>
                      <p className="text-2xl font-black text-amber-700 font-mono">৳{selectedCompanion.pendingPayout.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <span className="font-bold text-slate-800">Platform Commission Rate for this Host</span>
                    <p className="text-slate-500 text-sm">
                      Default global rate is 20%. You can configure custom promotional tiers for senior companions.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <input 
                        type="number" 
                        defaultValue={selectedCompanion.commissionRateOverride || 20}
                        className="w-24 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-bold" 
                      />
                      <span className="text-sm text-slate-500">%</span>
                      <button 
                        onClick={() => alert('Custom companion commission override saved!')}
                        className="px-3 py-1 bg-[#1B3A4B] text-white text-sm font-bold rounded-lg"
                      >
                        Update Rate
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Approval & Moderation Actions */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <h4 className="font-bold text-slate-900">Application & Account Workflow</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleApprove(selectedCompanion)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve & Live</span>
                  </button>

                  <button
                    onClick={() => handleReject(selectedCompanion)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 font-bold text-sm flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => handleSuspend(selectedCompanion)}
                    className="p-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center gap-1"
                  >
                    <PauseCircle className="w-4 h-4 text-amber-600" />
                    <span>Suspend</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setSelectedCompanion(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-colors"
              >
                Close Profile
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
