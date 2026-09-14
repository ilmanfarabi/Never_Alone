import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { TransactionLedgerItem, CompanionProfile } from '../types/adminTypes';
import { DataTable, type Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfirmActionModal } from '../components/common/ConfirmActionModal';
import { 
  DollarSign, 
  ArrowDownRight, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  Sliders, 
  CheckSquare, 
  Square, 
  Banknote
} from 'lucide-react';

export const PaymentsPayouts: React.FC = () => {
  const { 
    transactions, 
    companions, 
    settings, 
    issueRefund, 
    processBatchPayout, 
    updateSettings 
  } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<'ledger' | 'payouts' | 'commission'>('ledger');
  const [selectedPayoutIds, setSelectedPayoutIds] = useState<string[]>([]);
  const [selectedTxForRefund, setSelectedTxForRefund] = useState<TransactionLedgerItem | null>(null);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // Commission settings form
  const [commissionRate, setCommissionRate] = useState(settings.defaultCommissionPercentage);
  const [savedCommissionNotice, setSavedCommissionNotice] = useState(false);

  // Ledger stats
  const totalGross = transactions.reduce((acc: number, tx: TransactionLedgerItem) => acc + tx.totalAmount, 0);
  const totalPlatformFees = transactions.reduce((acc: number, tx: TransactionLedgerItem) => acc + tx.commissionAmount, 0);
  const totalPendingPayouts = companions.reduce((acc: number, c: CompanionProfile) => acc + c.pendingPayout, 0);
  const totalRefunded = transactions.reduce((acc: number, tx: TransactionLedgerItem) => acc + (tx.refundedAmount || 0), 0);

  // Companions eligible for payout
  const companionsWithPendingPayouts = companions.filter((c: CompanionProfile) => c.pendingPayout > 0);

  const toggleSelectAllPayouts = () => {
    if (selectedPayoutIds.length === companionsWithPendingPayouts.length) {
      setSelectedPayoutIds([]);
    } else {
      setSelectedPayoutIds(companionsWithPendingPayouts.map((c: CompanionProfile) => c.id));
    }
  };

  const toggleSelectPayout = (id: string) => {
    setSelectedPayoutIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRefundSubmit = (reason: string) => {
    if (!selectedTxForRefund) return;
    issueRefund(selectedTxForRefund.id, refundAmount, reason);
    setSelectedTxForRefund(null);
  };

  const handleBatchPayoutSubmit = (reason: string) => {
    processBatchPayout(selectedPayoutIds, `Batch-Payout-${Date.now().toString().slice(-4)}: ${reason}`);
    setSelectedPayoutIds([]);
    setIsProcessingBatch(false);
  };

  const handleSaveCommission = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ defaultCommissionPercentage: commissionRate });
    setSavedCommissionNotice(true);
    setTimeout(() => setSavedCommissionNotice(false), 3000);
  };

  const selectedPayoutTotal = companions
    .filter((c: CompanionProfile) => selectedPayoutIds.includes(c.id))
    .reduce((acc: number, c: CompanionProfile) => acc + c.pendingPayout, 0);

  const ledgerColumns: Column<TransactionLedgerItem>[] = [
    {
      header: 'Transaction ID',
      accessorKey: 'id',
      sortable: true,
      cell: (tx: TransactionLedgerItem) => (
        <span className="font-mono text-sm font-semibold text-slate-800">{tx.id}</span>
      )
    },
    {
      header: 'Date & Time',
      accessorKey: 'paymentDate',
      sortable: true,
      cell: (tx: TransactionLedgerItem) => (
        <span className="text-sm text-slate-600 whitespace-nowrap">
          {tx.paymentDate}
        </span>
      )
    },
    {
      header: 'Booking ID',
      accessorKey: 'bookingId',
      cell: (tx: TransactionLedgerItem) => (
        <span className="font-mono text-sm text-blue-600 hover:underline">{tx.bookingId}</span>
      )
    },
    {
      header: 'Customer',
      accessorKey: 'customerName',
      sortable: true,
      cell: (tx: TransactionLedgerItem) => (
        <span className="text-sm font-medium text-slate-900">{tx.customerName}</span>
      )
    },
    {
      header: 'Companion',
      accessorKey: 'companionName',
      sortable: true,
      cell: (tx: TransactionLedgerItem) => (
        <span className="text-sm text-slate-700">{tx.companionName}</span>
      )
    },
    {
      header: 'Gross Total',
      accessorKey: 'totalAmount',
      sortable: true,
      cell: (tx: TransactionLedgerItem) => (
        <span className="text-sm font-bold text-slate-900">৳{tx.totalAmount.toLocaleString()}</span>
      )
    },
    {
      header: 'Platform Fee (15%)',
      accessorKey: 'commissionAmount',
      cell: (tx: TransactionLedgerItem) => (
        <span className="text-sm text-emerald-600 font-medium">৳{tx.commissionAmount.toLocaleString()}</span>
      )
    },
    {
      header: 'Companion Payout',
      accessorKey: 'companionAmount',
      cell: (tx: TransactionLedgerItem) => (
        <span className="text-sm text-slate-600">৳{tx.companionAmount.toLocaleString()}</span>
      )
    },
    {
      header: 'Method',
      accessorKey: 'paymentMethod',
      cell: (tx: TransactionLedgerItem) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-slate-100 text-slate-700">
          {tx.paymentMethod}
        </span>
      )
    },
    {
      header: 'Payout Status',
      accessorKey: 'payoutStatus',
      sortable: true,
      cell: (tx: TransactionLedgerItem) => <StatusBadge status={tx.payoutStatus} />
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (tx: TransactionLedgerItem) => (
        <div className="flex items-center space-x-2">
          {(!tx.refundedAmount || tx.refundedAmount < tx.totalAmount) && (
            <button
              onClick={() => {
                setSelectedTxForRefund(tx);
                setRefundAmount(tx.totalAmount - (tx.refundedAmount || 0));
              }}
              className="px-2 py-1 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded border border-amber-200 transition"
              title="Issue full or partial refund"
            >
              Refund
            </button>
          )}
          {tx.refundedAmount && tx.refundedAmount >= tx.totalAmount && (
            <span className="text-sm text-slate-400 italic">Refunded</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments & Financial Ledgers</h1>
          <p className="text-sm text-slate-500">
            Real-time transaction tracking, batch companion payouts, and platform commission governance.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
              activeTab === 'ledger'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Transaction Ledger ({transactions.length})
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'payouts'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Companion Payouts</span>
            {companionsWithPendingPayouts.length > 0 && (
              <span className="bg-amber-500 text-white text-sm px-1.5 py-0.2 rounded-full font-bold">
                {companionsWithPendingPayouts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('commission')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
              activeTab === 'commission'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Commission Settings
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Gross Processed</p>
            <p className="text-2xl font-black text-slate-900 mt-1">৳{totalGross.toLocaleString()}</p>
            <p className="text-sm text-emerald-600 font-semibold mt-1 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +18.4% this month
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Net Platform Revenue (15%)</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">৳{totalPlatformFees.toLocaleString()}</p>
            <p className="text-sm text-emerald-600 font-semibold mt-1 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> Earned commission
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Companion Payouts</p>
            <p className="text-2xl font-black text-amber-600 mt-1">৳{totalPendingPayouts.toLocaleString()}</p>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Across {companionsWithPendingPayouts.length} companions
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Refunded</p>
            <p className="text-2xl font-black text-slate-700 mt-1">৳{totalRefunded.toLocaleString()}</p>
            <p className="text-sm text-slate-400 font-medium mt-1">
              Disputes & cancellations
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <ArrowDownRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tab 1: Transaction Ledger */}
      {activeTab === 'ledger' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Complete Transaction Ledger</h2>
              <p className="text-sm text-slate-500">Every customer payment, escrow release, and refund record.</p>
            </div>
          </div>

          <DataTable
            data={transactions}
            columns={ledgerColumns}
            searchPlaceholder="Search by ID, booking, customer, companion or method..."
            searchFields={['id', 'bookingId', 'customerName', 'companionName', 'paymentMethod']}
            filters={[
              {
                key: 'payoutStatus',
                label: 'Payout Status',
                options: [
                  { label: 'Pending Payout', value: 'pending' },
                  { label: 'Paid Out', value: 'paid' },
                  { label: 'Processing', value: 'processing' },
                ]
              }
            ]}
            emptyMessage="No payment transactions found matching criteria."
          />
        </div>
      )}

      {/* Tab 2: Companion Payouts */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Batch Companion Payout Queue</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Select verified companions with unpaid earnings to dispatch funds via bKash/Nagad/Bank.
                </p>
              </div>

              {selectedPayoutIds.length > 0 && (
                <div className="flex items-center space-x-3 bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-200">
                  <div className="text-sm">
                    <span className="font-bold text-amber-900">{selectedPayoutIds.length}</span> companions selected (
                    <span className="font-bold text-amber-900">৳{selectedPayoutTotal.toLocaleString()}</span>)
                  </div>
                  <button
                    onClick={() => setIsProcessingBatch(true)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition shadow-xs flex items-center space-x-1"
                  >
                    <Banknote className="w-4 h-4 mr-1" />
                    Disburse Payouts
                  </button>
                </div>
              )}
            </div>

            {companionsWithPendingPayouts.length === 0 ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-900">All Companion Payouts Cleared!</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  There are no companions with pending unpaid earnings in the queue.
                </p>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4 w-10">
                        <button
                          onClick={toggleSelectAllPayouts}
                          className="text-slate-500 hover:text-slate-900"
                        >
                          {selectedPayoutIds.length === companionsWithPendingPayouts.length ? (
                            <CheckSquare className="w-4 h-4 text-[#FF6F61]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="py-3 px-4">Companion</th>
                      <th className="py-3 px-4">Phone / City</th>
                      <th className="py-3 px-4">Completed Sessions</th>
                      <th className="py-3 px-4">Total Earned</th>
                      <th className="py-3 px-4">Unpaid Balance</th>
                      <th className="py-3 px-4">Preferred Payout Method</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {companionsWithPendingPayouts.map((companion: CompanionProfile) => (
                      <tr key={companion.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleSelectPayout(companion.id)}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            {selectedPayoutIds.includes(companion.id) ? (
                              <CheckSquare className="w-4 h-4 text-[#FF6F61]" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={companion.avatarUrl}
                              alt={companion.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{companion.name}</p>
                              <p className="text-sm text-slate-400 font-mono">{companion.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="text-slate-800">{companion.phone}</p>
                          <p className="text-sm text-slate-400">{companion.city}</p>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">
                          {companion.totalSessions}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          ৳{companion.totalEarnings.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-amber-600 text-sm">
                            ৳{companion.pendingPayout.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-1.5">
                            <span className="px-2 py-0.5 rounded text-sm font-bold bg-pink-100 text-pink-800">
                              bKash Personal
                            </span>
                            <span className="text-sm text-slate-500 font-mono">{companion.phone}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedPayoutIds([companion.id]);
                              setIsProcessingBatch(true);
                            }}
                            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-semibold transition"
                          >
                            Pay ৳{companion.pendingPayout.toLocaleString()}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Commission Settings */}
      {activeTab === 'commission' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 max-w-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#1B3A4B]/10 text-[#1B3A4B] flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Platform Commission & Escrow Settings</h2>
              <p className="text-sm text-slate-500">Configure global transaction fees and automated payout parameters.</p>
            </div>
          </div>

          {savedCommissionNotice && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800 font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Platform commission settings updated and logged to audit trail.</span>
            </div>
          )}

          <form onSubmit={handleSaveCommission} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                Standard Platform Take-Rate Commission (%)
              </label>
              <div className="relative rounded-lg shadow-xs">
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FF6F61] focus:outline-hidden text-sm font-bold text-slate-900"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 font-bold">
                  %
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Currently set to {settings.defaultCommissionPercentage}%. For every ৳1,000 booking, NeverAlone keeps ৳{1000 * (commissionRate / 100)} and the companion receives ৳{1000 * (1 - commissionRate / 100)}.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                Escrow Hold Period (Post-Meeting Verification)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['12 Hours', '24 Hours (Default)', '48 Hours'].map((opt, i) => (
                  <label key={opt} className={`p-3 rounded-xl border text-center cursor-pointer transition text-sm font-semibold ${
                    i === 1 ? 'border-[#1B3A4B] bg-blue-50/50 text-[#1B3A4B]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}>
                    <input type="radio" name="escrow" defaultChecked={i === 1} className="sr-only" />
                    {opt}
                  </label>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-1.5">
                Funds are released to companion unpaid earnings once booking completes with no disputes filed during the hold window.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1B3A4B] hover:bg-[#132a36] text-white font-semibold text-sm rounded-xl shadow-xs transition flex items-center space-x-2"
              >
                <span>Save Commission Parameters</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Process Refund */}
      {selectedTxForRefund && (
        <ConfirmActionModal
          isOpen={!!selectedTxForRefund}
          title={`Issue Refund for Transaction ${selectedTxForRefund.id}`}
          description={`Customer ${selectedTxForRefund.customerName} originally paid ৳${selectedTxForRefund.totalAmount.toLocaleString()} for Booking #${selectedTxForRefund.bookingId}. Specify the refund amount below.`}
          confirmLabel="Execute Refund via Gateway"
          variant="warning"
          requireReason={true}
          reasonPlaceholder="State the dispute finding or customer cancellation reason..."
          onCancel={() => setSelectedTxForRefund(null)}
          onConfirm={handleRefundSubmit}
        >
          <div className="mt-4 mb-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
              Refund Amount (BDT)
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max={selectedTxForRefund.totalAmount}
                value={refundAmount}
                onChange={(e) => setRefundAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
              <span className="absolute right-3 top-2 text-sm font-bold text-slate-400">৳ BDT</span>
            </div>
            <div className="flex justify-between items-center text-sm text-slate-500 mt-1">
              <span>Max refundable: ৳{selectedTxForRefund.totalAmount.toLocaleString()}</span>
              <button
                type="button"
                onClick={() => setRefundAmount(selectedTxForRefund.totalAmount)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Full Refund
              </button>
            </div>
          </div>
        </ConfirmActionModal>
      )}

      {/* Modal: Batch Payout Confirmation */}
      {isProcessingBatch && (
        <ConfirmActionModal
          isOpen={isProcessingBatch}
          title={`Disburse Batch Payouts to ${selectedPayoutIds.length} Companion(s)`}
          description={`You are authorizing an aggregate payout of ৳${selectedPayoutTotal.toLocaleString()} to ${selectedPayoutIds.length} companion(s) through bKash/Nagad/Bank accounts.`}
          confirmLabel="Authorize Batch Payout"
          variant="default"
          requireReason={true}
          reasonPlaceholder="e.g., Weekly companion payroll clearance cycle - Batch #42"
          onCancel={() => setIsProcessingBatch(false)}
          onConfirm={handleBatchPayoutSubmit}
        />
      )}
    </div>
  );
};
