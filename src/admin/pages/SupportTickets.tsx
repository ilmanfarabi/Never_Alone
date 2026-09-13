import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { SupportTicket, TicketMessage } from '../types/adminTypes';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Search, 
  Send, 
  Lock, 
  Sparkles
} from 'lucide-react';

const CANNED_RESPONSES = [
  {
    title: 'Platonic Policy Reminder',
    text: 'Hello, thank you for reaching out. Please be reminded that NeverAlone is strictly a platonic companionship platform for social outings, events, and family gatherings. Dating, romance, and escorting are strictly prohibited under our Terms of Service.'
  },
  {
    title: 'ID Verification Timeline',
    text: 'Hello! Our Trust & Safety team is actively reviewing your submitted NID/Passport documents. Verification checks normally take between 2 to 4 hours during business days. You will receive an SMS and email notification upon approval.'
  },
  {
    title: 'Refund Processing Notice',
    text: 'We have processed your refund request regarding this booking dispute. The refunded amount will reflect in your original bKash/Nagad/Bank account within 24 to 48 business hours.'
  },
  {
    title: 'Companion Cancellation Protocol',
    text: 'We sincerely apologize that the companion had to reschedule due to an emergency. As per our 100% guarantee policy, your full payment remains secured in escrow, or you may request an instant full refund.'
  }
];

export const SupportTickets: React.FC = () => {
  const { tickets, replyTicket, updateTicketStatus } = useAdminAuth();
  
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [showCanned, setShowCanned] = useState(false);

  const filteredTickets = tickets.filter((t: SupportTicket) => {
    const matchesSearch = 
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currentTicket = tickets.find((t: SupportTicket) => t.id === selectedTicketId) || filteredTickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentTicket) return;

    replyTicket(currentTicket.id, replyText.trim(), isInternalNote);
    setReplyText('');
    setShowCanned(false);
  };

  const handleInsertCanned = (text: string) => {
    setReplyText(text);
    setShowCanned(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Support Tickets & Customer Helpdesk</h1>
        <p className="text-sm text-slate-500">
          Manage inbound customer inquiries, companion onboarding help, and staff collaboration notes.
        </p>
      </div>

      {/* Main 2-Column Helpdesk UI */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* Left Column: Tickets List (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/40">
          {/* Filter / Search Bar */}
          <div className="p-4 border-b border-slate-200 space-y-3 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticket, user, #ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#FF6F61] focus:outline-hidden"
              />
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden"
              >
                <option value="">All Statuses ({tickets.length})</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Ticket Items Scroll */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredTickets.map((ticket: SupportTicket) => {
              const isSelected = ticket.id === currentTicket?.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`p-4 cursor-pointer transition ${
                    isSelected ? 'bg-white border-l-4 border-[#FF6F61] shadow-xs' : 'hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        ticket.priority === 'urgent' ? 'bg-red-500' : ticket.priority === 'high' ? 'bg-orange-500' : 'bg-blue-400'
                      }`} />
                      <span className="text-[11px] font-mono text-slate-400">{ticket.ticketNumber}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {ticket.updatedAt}
                    </span>
                  </div>

                  <h3 className={`text-xs font-bold truncate ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                    {ticket.subject}
                  </h3>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-slate-500 font-medium truncate max-w-[120px]">
                      {ticket.requesterName}
                    </span>
                    <StatusBadge status={ticket.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Ticket Conversation Thread (8 cols) */}
        {currentTicket ? (
          <div className="lg:col-span-8 flex flex-col h-full bg-white">
            {/* Thread Header */}
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{currentTicket.ticketNumber}</span>
                  <h2 className="text-base font-bold text-slate-900">{currentTicket.subject}</h2>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                  <span>User: <strong className="text-slate-800">{currentTicket.requesterName}</strong> ({currentTicket.requesterType})</span>
                  <span>•</span>
                  <span>Category: <strong className="text-slate-700 capitalize">{currentTicket.category.replace('_', ' ')}</strong></span>
                </div>
              </div>

              {/* Status Picker */}
              <div className="flex items-center space-x-2 shrink-0">
                <select
                  value={currentTicket.status}
                  onChange={(e) => updateTicketStatus(currentTicket.id, e.target.value as any)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-hidden"
                >
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
              {currentTicket.messages.map((msg: TicketMessage) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl text-xs max-w-2xl ${
                    msg.isInternalNote
                      ? 'bg-amber-50/80 border border-amber-200 ml-auto shadow-xs'
                      : msg.senderRole === 'agent'
                      ? 'bg-blue-50 border border-blue-200 ml-auto shadow-xs'
                      : 'bg-white border border-slate-200 mr-auto shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between space-x-4 mb-1.5 pb-1 border-b border-slate-200/50">
                    <div className="flex items-center space-x-1.5">
                      {msg.isInternalNote ? (
                        <span className="flex items-center text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-200/60 px-2 py-0.5 rounded">
                          <Lock className="w-3 h-3 mr-1" /> Internal Staff Note
                        </span>
                      ) : (
                        <span className="font-bold text-slate-900">{msg.senderName}</span>
                      )}
                      <span className="text-[10px] text-slate-400 capitalize">({msg.senderRole})</span>
                    </div>

                    <span className="text-[10px] text-slate-400">
                      {msg.timestamp}
                    </span>
                  </div>

                  <p className="text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Reply Composer & Canned Responses */}
            <div className="p-4 border-t border-slate-200 bg-white">
              {/* Canned Responses Popover */}
              {showCanned && (
                <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" /> Canned Response Templates
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowCanned(false)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CANNED_RESPONSES.map(item => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => handleInsertCanned(item.text)}
                        className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-[#FF6F61] text-left transition"
                      >
                        <p className="text-xs font-bold text-slate-900">{item.title}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.text}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mode Toggle: Customer Reply vs Internal Note */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsInternalNote(false)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      !isInternalNote ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Reply to User
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsInternalNote(true)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                      isInternalNote ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>Internal Staff Note</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCanned(!showCanned)}
                  className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Insert Canned Response</span>
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendReply} className="space-y-3">
                <textarea
                  rows={3}
                  placeholder={
                    isInternalNote
                      ? "Write an internal staff note (visible only to NeverAlone staff)..."
                      : "Type your response to the customer/companion..."
                  }
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className={`w-full p-3 border rounded-xl text-xs focus:ring-2 focus:outline-hidden ${
                    isInternalNote
                      ? 'border-amber-300 bg-amber-50/40 focus:ring-amber-500 text-amber-950'
                      : 'border-slate-200 bg-white focus:ring-[#FF6F61] text-slate-900'
                  }`}
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Press Shift+Enter for new line
                  </span>

                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs ${
                      isInternalNote
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-[#FF6F61] hover:bg-[#ff5a4a] text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isInternalNote ? 'Save Internal Note' : 'Send Reply'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 flex items-center justify-center p-12 text-center text-slate-400">
            Select a ticket from the left panel to view conversation.
          </div>
        )}
      </div>
    </div>
  );
};
