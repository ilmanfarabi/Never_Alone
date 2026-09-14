import React, { useState } from 'react';
import { 
  MapPin, 
  X, 
  ShieldAlert
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { BookingRecord } from '../types/adminTypes';
import { DataTable, type Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';

export const BookingManagement: React.FC = () => {
  const { bookings, resolveBookingDispute } = useAdminAuth();

  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  // Dispute resolution state
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [banParty, setBanParty] = useState<'none' | 'customer' | 'companion'>('none');

  const handleOpenDispute = (b: BookingRecord) => {
    setSelectedBooking(b);
    setRefundAmount(b.amount);
    setResolutionNote(b.disputeDetails?.reason || '');
    setDisputeModalOpen(true);
  };

  const handleExecuteDisputeResolution = () => {
    if (!selectedBooking || !resolutionNote.trim()) return;

    let banPartyId: string | undefined = undefined;
    if (banParty === 'customer') banPartyId = selectedBooking.customerId;

    resolveBookingDispute(selectedBooking.id, resolutionNote.trim(), refundAmount, banPartyId);
    setDisputeModalOpen(false);
    setSelectedBooking(null);
  };

  const handleExportCsv = () => {
    const csvHeader = 'Booking ID,Customer,Companion,Occasion,Date,Time,Venue,Amount (BDT),Status,Payment Status\n';
    const csvRows = bookings.map(b => 
      `"${b.id}","${b.customerName}","${b.companionName}","${b.occasionType}","${b.date}","${b.time}","${b.venueName}, ${b.venueAddress}","${b.amount}","${b.status}","${b.paymentStatus}"`
    ).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neveralone_bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const columns: Column<BookingRecord>[] = [
    {
      header: 'Booking ID',
      accessorKey: 'id',
      sortable: true,
      cell: (b) => <span className="font-mono font-bold text-slate-900">{b.id}</span>
    },
    {
      header: 'Customer',
      accessorKey: 'customerName',
      sortable: true,
      cell: (b) => <span className="font-semibold text-slate-800">{b.customerName}</span>
    },
    {
      header: 'Companion',
      accessorKey: 'companionName',
      sortable: true,
      cell: (b) => <span className="font-semibold text-blue-900">{b.companionName}</span>
    },
    {
      header: 'Occasion & Public Venue',
      accessorKey: 'occasionType',
      sortable: true,
      cell: (b) => (
        <div>
          <div className="font-bold text-slate-900">{b.occasionType}</div>
          <div className="text-sm text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
            <span className="truncate max-w-xs">{b.venueName}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Schedule',
      accessorKey: 'date',
      sortable: true,
      cell: (b) => (
        <div>
          <div className="text-slate-800 font-medium">{b.date}</div>
          <div className="text-sm text-slate-400">{b.time}</div>
        </div>
      )
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      sortable: true,
      cell: (b) => (
        <div>
          <div className="font-mono font-bold text-slate-900">৳{b.amount.toLocaleString()}</div>
          <div className="text-sm text-slate-400">Host: ৳{b.companionPayout}</div>
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (b) => <StatusBadge status={b.status} />
    },
    {
      header: 'Payment',
      accessorKey: 'paymentStatus',
      sortable: true,
      cell: (b) => <StatusBadge status={b.paymentStatus} />
    },
    {
      header: 'Actions',
      cell: (b) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedBooking(b)}
            className="px-2.5 py-1 rounded-lg bg-[#1B3A4B] text-white text-sm font-semibold hover:bg-[#142d3b]"
          >
            Audit Log
          </button>
          {b.status === 'disputed' && (
            <button
              onClick={() => handleOpenDispute(b)}
              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-xs animate-pulse"
            >
              Resolve Dispute
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#1B3A4B]">Booking & Dispute Management</h2>
          <p className="text-sm text-slate-500">
            Monitor public session timelines, audit logs, escrow payments, and resolve dispute tickets ({bookings.length} total)
          </p>
        </div>
      </div>

      {/* Main Table */}
      <DataTable
        data={bookings}
        columns={columns}
        searchPlaceholder="Search by Booking ID, customer, companion or venue..."
        searchFields={['id', 'customerName', 'companionName', 'venueName', 'occasionType']}
        filters={[
          {
            key: 'status',
            label: 'Booking Status',
            options: [
              { label: 'Confirmed', value: 'confirmed' },
              { label: 'Completed', value: 'completed' },
              { label: 'Pending', value: 'pending' },
              { label: 'Disputed', value: 'disputed' },
              { label: 'Cancelled', value: 'cancelled' }
            ]
          },
          {
            key: 'paymentStatus',
            label: 'Payment Status',
            options: [
              { label: 'Paid (Escrow)', value: 'paid' },
              { label: 'Pending Payment', value: 'pending' },
              { label: 'Partially Refunded', value: 'partially_refunded' },
              { label: 'Refunded', value: 'refunded' }
            ]
          }
        ]}
        onExportCsv={handleExportCsv}
        pageSize={10}
      />

      {/* Booking Timeline & Audit Log Drawer */}
      {selectedBooking && !disputeModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">{selectedBooking.id}</h3>
                  <StatusBadge status={selectedBooking.status} />
                  <StatusBadge status={selectedBooking.paymentStatus} />
                </div>
                <p className="text-sm text-slate-500 font-semibold mt-0.5">{selectedBooking.occasionType}</p>
                <p className="text-sm text-slate-400 mt-0.5">Created on {selectedBooking.createdAt}</p>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm">
              {/* Parties & Venue */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-sm uppercase font-bold text-slate-400">Customer</span>
                  <p className="font-bold text-slate-900">{selectedBooking.customerName}</p>
                  <p className="text-sm text-slate-500 font-mono">ID: {selectedBooking.customerId}</p>
                </div>
                <div>
                  <span className="text-sm uppercase font-bold text-slate-400">Companion (Host)</span>
                  <p className="font-bold text-blue-900">{selectedBooking.companionName}</p>
                  <p className="text-sm text-slate-500 font-mono">ID: {selectedBooking.companionId}</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-sm uppercase font-bold text-slate-400">Public Venue Location</span>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>{selectedBooking.venueName}</span>
                </p>
                <p className="text-slate-600 pl-5">{selectedBooking.venueAddress}</p>
              </div>

              {/* Financial Breakdown */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="font-bold text-slate-900">Financial Ledger Breakdown</span>
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Session Rate ({selectedBooking.durationHours} hours):</span>
                    <span className="font-mono font-bold">৳{selectedBooking.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Platform Commission (20%):</span>
                    <span className="font-mono text-emerald-700 font-bold">৳{selectedBooking.platformFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Companion Payout (80%):</span>
                    <span className="font-mono text-blue-700 font-bold">৳{selectedBooking.companionPayout.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Full Audit Timeline */}
              <div className="space-y-3">
                <span className="font-bold text-slate-900 text-sm">Full Session Audit Timeline</span>
                <div className="border-l-2 border-slate-200 ml-3 space-y-4 pl-4">
                  {selectedBooking.timeline.map((event, i) => (
                    <div key={i} className="relative space-y-1">
                      <div className={`w-3 h-3 rounded-full absolute -left-[23px] top-1 border-2 border-white ${
                        event.type === 'alert' ? 'bg-red-500' :
                        event.type === 'warning' ? 'bg-amber-500' :
                        event.type === 'success' ? 'bg-emerald-500' : 'bg-[#1B3A4B]'
                      }`} />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{event.title}</span>
                        <span className="text-sm text-slate-400">{event.timestamp}</span>
                      </div>
                      <p className="text-slate-600">{event.description}</p>
                      <span className="text-sm font-semibold text-slate-400">Actor: {event.actor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dispute Button */}
              {selectedBooking.status === 'disputed' && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                  <span className="font-bold text-rose-900">Active Dispute Ticket</span>
                  <p className="text-slate-700">Reason: {selectedBooking.disputeDetails?.reason}</p>
                  <button
                    onClick={() => handleOpenDispute(selectedBooking)}
                    className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                  >
                    Open Dispute Resolution Desk
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm"
              >
                Close Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Resolution Modal */}
      {disputeModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-sm">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Dispute Resolution Desk</h3>
                  <p className="text-slate-500">Booking ID: {selectedBooking.id} • Total Escrow: ৳{selectedBooking.amount}</p>
                </div>
              </div>
              <button onClick={() => setDisputeModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Resolution Form */}
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Administrative Resolution Note *</label>
                <textarea
                  rows={3}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Explain findings, policy violation assessment, and resolution terms..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#1B3A4B]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Refund Amount (BDT)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    max={selectedBooking.amount}
                    min={0}
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(Number(e.target.value))}
                    className="w-36 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono font-bold"
                  />
                  <span className="text-slate-500">of ৳{selectedBooking.amount.toLocaleString()} total</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Enforcement / Policy Ban Action</label>
                <select
                  value={banParty}
                  onChange={(e: any) => setBanParty(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium"
                >
                  <option value="none">No Ban (Warning or Dispute settled peacefully)</option>
                  <option value="customer">Permanently Ban Customer ({selectedBooking.customerName}) for Policy Violation</option>
                  <option value="companion">Suspend/Ban Companion ({selectedBooking.companionName})</option>
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDisputeModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDisputeResolution}
                disabled={!resolutionNote.trim()}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold disabled:opacity-50"
              >
                Execute Dispute Resolution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
