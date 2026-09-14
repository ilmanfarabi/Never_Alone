import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { SOSAlert, SafetyReport, ChatFlag } from '../types/adminTypes';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfirmActionModal } from '../components/common/ConfirmActionModal';
import { 
  ShieldAlert, 
  AlertTriangle, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Flame, 
  Radio, 
  ExternalLink
} from 'lucide-react';

export const TrustSafetyCenter: React.FC = () => {
  const { 
    sosAlerts, 
    safetyReports, 
    chatFlags, 
    updateSOSStatus, 
    resolveSafetyReport, 
    moderateChatFlag, 
    updateCustomerStatus,
    activeSOSCount,
    triggerMockSOS
  } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<'sos' | 'reports' | 'chat'>('sos');
  
  // Modal states
  const [selectedSOS, setSelectedSOS] = useState<SOSAlert | null>(null);
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(null);
  const [selectedChatFlag, setSelectedChatFlag] = useState<ChatFlag | null>(null);
  const [actionType, setActionType] = useState<'resolve_sos' | 'warn_report' | 'suspend_report' | 'ban_report' | 'dismiss_report' | 'warn_chat' | 'dismiss_chat' | null>(null);

  const activeSOSAlerts = sosAlerts.filter((s: SOSAlert) => s.status === 'active' || s.status === 'acknowledged');
  const pendingReports = safetyReports.filter((r: SafetyReport) => r.status === 'open' || r.status === 'investigating');
  const pendingChatFlags = chatFlags.filter((c: ChatFlag) => c.status === 'pending');

  const handleActionConfirm = (reason: string) => {
    if (actionType === 'resolve_sos' && selectedSOS) {
      updateSOSStatus(selectedSOS.id, 'resolved', reason);
    } else if (actionType === 'dismiss_report' && selectedReport) {
      resolveSafetyReport(selectedReport.id, 'dismissed', reason);
    } else if (actionType === 'warn_report' && selectedReport) {
      resolveSafetyReport(selectedReport.id, 'warned', reason);
    } else if (actionType === 'suspend_report' && selectedReport) {
      updateCustomerStatus(selectedReport.reportedId, 'suspended', reason);
      resolveSafetyReport(selectedReport.id, 'suspended', reason);
    } else if (actionType === 'ban_report' && selectedReport) {
      updateCustomerStatus(selectedReport.reportedId, 'banned', reason);
      resolveSafetyReport(selectedReport.id, 'banned', reason);
    } else if (actionType === 'dismiss_chat' && selectedChatFlag) {
      moderateChatFlag(selectedChatFlag.id, 'dismiss');
    } else if (actionType === 'warn_chat' && selectedChatFlag) {
      moderateChatFlag(selectedChatFlag.id, 'warn');
    }

    setSelectedSOS(null);
    setSelectedReport(null);
    setSelectedChatFlag(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Badges */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900">Trust & Safety Command Center</h1>
            {activeSOSCount > 0 && (
              <span className="flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-red-100 text-red-700 animate-pulse">
                <Radio className="w-3.5 h-3.5 mr-1" />
                {activeSOSCount} LIVE SOS
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">
            Emergency distress monitoring, platonic policy enforcement, and proactive keyword flagged chat audit.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('sos')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'sos'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency SOS</span>
            {activeSOSCount > 0 && (
              <span className="bg-white text-red-600 text-sm px-1.5 py-0.2 rounded-full font-black">
                {activeSOSCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'reports'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Incident Reports</span>
            {pendingReports.length > 0 && (
              <span className="bg-amber-500 text-white text-sm px-1.5 py-0.2 rounded-full font-bold">
                {pendingReports.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'chat'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span>Chat Moderation</span>
            {pendingChatFlags.length > 0 && (
              <span className="bg-blue-500 text-white text-sm px-1.5 py-0.2 rounded-full font-bold">
                {pendingChatFlags.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: SOS EMERGENCY ALERTS */}
      {activeTab === 'sos' && (
        <div className="space-y-6">
          {/* Active Live Alerts Banner */}
          {activeSOSAlerts.length > 0 ? (
            <div className="bg-red-50 border-2 border-red-500/80 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center animate-bounce">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-red-900">
                      CRITICAL: {activeSOSAlerts.length} Active Emergency Distress Beacon(s)
                    </h2>
                    <p className="text-sm text-red-700">
                      Companions or users in active bookings triggered the panic button. Immediate intervention protocol active.
                    </p>
                  </div>
                </div>

                <button
                  onClick={triggerMockSOS}
                  className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-sm font-bold rounded-lg transition shadow-xs"
                >
                  + Simulate Another Emergency Beacon
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeSOSAlerts.map((alert: SOSAlert) => (
                  <div key={alert.id} className="bg-white rounded-xl border border-red-200 p-5 shadow-xs space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-sm font-black bg-red-600 text-white uppercase tracking-wider">
                            DISTRESS SIGNAL
                          </span>
                          <span className="text-sm text-slate-400 font-mono">#{alert.id}</span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900 mt-1">
                          {alert.userName} <span className="text-sm font-normal text-slate-500 capitalize">({alert.triggeredBy})</span>
                        </h3>
                        <p className="text-sm text-slate-500">Booking Reference: <span className="font-mono text-blue-600 font-semibold">{alert.bookingId}</span></p>
                      </div>

                      <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {alert.triggeredAt}
                      </span>
                    </div>

                    {/* Location & Contact Details */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800">{alert.venueName} - {alert.venueAddress}</p>
                          <p className="text-sm text-slate-500 font-mono">
                            Last GPS ping: {alert.lastCheckInLocation} ({alert.lastCheckInTime})
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 space-y-1">
                        <div className="flex items-center justify-between text-slate-700">
                          <span>User Phone: <strong>{alert.userPhone}</strong></span>
                          <span>Companion: <strong>{alert.companionPhone}</strong></span>
                        </div>
                        {alert.emergencyContacts && alert.emergencyContacts[0] && (
                          <div className="flex items-center space-x-1.5 text-slate-700">
                            <Phone className="w-3.5 h-3.5 text-blue-600" />
                            <span>Kin: <strong>{alert.emergencyContacts[0].name} ({alert.emergencyContacts[0].relation}) - {alert.emergencyContacts[0].phone}</strong></span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Live GPS Map</span>
                      </a>

                      <div className="flex items-center space-x-2">
                        <a
                          href={`tel:${alert.userPhone}`}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition flex items-center space-x-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call User</span>
                        </a>

                        <button
                          onClick={() => {
                            setSelectedSOS(alert);
                            setActionType('resolve_sos');
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Resolved</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div>
                <h2 className="text-sm font-bold text-emerald-950">Zero Active Emergency Distresses</h2>
                <p className="text-sm text-emerald-700 mt-0.5">All ongoing bookings are in safe status without distress pings.</p>
              </div>
              <button
                onClick={triggerMockSOS}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition shadow-xs"
              >
                + Test Real-Time SOS Beacon Notification
              </button>
            </div>
          )}

          {/* Historical Resolved SOS List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Historical SOS Incident Audit</h2>
            <div className="space-y-3">
              {sosAlerts.filter((s: SOSAlert) => s.status === 'resolved' || s.status === 'false_alarm').map((alert: SOSAlert) => (
                <div key={alert.id} className="p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm">
                  <div>
                    <div className="flex items-center space-x-2">
                      <StatusBadge status={alert.status} />
                      <span className="font-bold text-slate-900">{alert.userName}</span>
                      <span className="text-slate-400 font-mono">#{alert.id}</span>
                    </div>
                    <p className="text-slate-600 mt-1">{alert.venueName} - {alert.venueAddress}</p>
                    {alert.resolutionNotes && (
                      <p className="text-slate-500 italic mt-0.5">Resolution Notes: "{alert.resolutionNotes}"</p>
                    )}
                  </div>
                  <div className="text-right text-slate-400 text-sm">
                    <p>Triggered: {alert.triggeredAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SAFETY REPORTS */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Incident & Policy Violation Reports ({safetyReports.length})</h2>
            <p className="text-sm text-slate-500">
              Users reported for non-platonic behavior, sexual harassment, aggressive conduct, or offline payment evasion.
            </p>
          </div>

          <div className="space-y-4">
            {safetyReports.map((report: SafetyReport) => (
              <div 
                key={report.id} 
                className={`p-5 rounded-2xl border transition ${
                  report.status === 'open' 
                    ? 'border-amber-300 bg-amber-50/20' 
                    : report.status === 'investigating'
                    ? 'border-blue-300 bg-blue-50/20'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded text-sm font-bold uppercase tracking-wider ${
                        report.category === 'sexual_advance' || report.category === 'romantic_advance' || report.category === 'harassment'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {report.category.replace(/_/g, ' ')}
                      </span>
                      <StatusBadge status={report.status} />
                      <span className="text-sm text-slate-400 font-mono">Report #{report.id}</span>
                    </div>

                    <div className="text-sm">
                      <span className="font-bold text-slate-900">{report.reporterName}</span>
                      <span className="text-slate-500"> ({report.reporterType}) reported </span>
                      <span className="font-bold text-red-700 underline">{report.reportedName}</span>
                      <span className="text-slate-500"> ({report.reportedType})</span>
                      {report.bookingId && (
                        <span className="text-sm text-slate-500 ml-2">
                          (Booking <span className="font-mono text-blue-600 font-semibold">{report.bookingId}</span>)
                        </span>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 font-sans leading-relaxed">
                      "{report.description}"
                    </div>

                    {report.evidenceUrls && report.evidenceUrls.length > 0 && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="text-sm font-bold text-slate-500 uppercase">Attached Evidence:</span>
                        {report.evidenceUrls.map((url: string, idx: number) => (
                          <a
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1 px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-sm font-semibold"
                          >
                            <span>Evidence #{idx + 1}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex lg:flex-col items-center lg:items-end gap-2 shrink-0">
                    <span className="text-sm text-slate-400">
                      {report.createdAt}
                    </span>

                    {report.status !== 'dismissed' && report.status !== 'resolved' && (
                      <div className="flex flex-wrap lg:flex-col gap-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setActionType('warn_report');
                          }}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-sm font-semibold transition"
                        >
                          Send Official Warning
                        </button>

                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setActionType('suspend_report');
                          }}
                          className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-300 rounded-lg text-sm font-semibold transition"
                        >
                          Suspend 14 Days
                        </button>

                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setActionType('ban_report');
                          }}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition shadow-xs"
                        >
                          Permanent Ban
                        </button>

                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setActionType('dismiss_report');
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition"
                        >
                          Dismiss Report
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CHAT MODERATION */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Proactive Chat Moderation Queue ({chatFlags.length})</h2>
            <p className="text-sm text-slate-500">
              Automated triggers matching banned non-platonic keywords (e.g., 'hotel', 'kiss', 'room', 'offline pay').
            </p>
          </div>

          <div className="space-y-4">
            {chatFlags.map((flag: ChatFlag) => (
              <div key={flag.id} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded text-sm font-black bg-red-100 text-red-800">
                      FLAGGED: "{flag.detectedKeywords.join(', ')}"
                    </span>
                    <StatusBadge status={flag.status} />
                    <span className="text-sm text-slate-400 font-mono">Chat #{flag.id}</span>
                  </div>
                  <span className="text-sm text-slate-400">
                    {flag.timestamp}
                  </span>
                </div>

                <div className="text-sm">
                  <span className="font-bold text-slate-900">{flag.senderName}</span>
                  <span className="text-slate-500"> ({flag.senderRole}) sent to </span>
                  <span className="font-bold text-slate-900">{flag.recipientName}</span>
                  <span className="text-slate-400 ml-2">(Booking Ref: {flag.bookingId})</span>
                </div>

                {/* Message snippet */}
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 text-sm text-slate-900">
                  <span className="font-semibold text-red-800">Message Content:</span> "{flag.messageText}"
                </div>

                {/* Audit Actions */}
                {flag.status === 'pending' && (
                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setSelectedChatFlag(flag);
                        setActionType('dismiss_chat');
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition"
                    >
                      Dismiss (False Positive)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedChatFlag(flag);
                        setActionType('warn_chat');
                      }}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-lg transition"
                    >
                      Issue Chat Violation Warning
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal for destructive actions */}
      {actionType && (
        <ConfirmActionModal
          isOpen={!!actionType}
          title={
            actionType === 'resolve_sos'
              ? 'Mark Emergency SOS Alert as Resolved'
              : actionType === 'ban_report'
              ? `Permanently Ban User (${selectedReport?.reportedName})`
              : actionType === 'suspend_report'
              ? `Suspend User (${selectedReport?.reportedName})`
              : actionType === 'warn_report'
              ? `Issue Official Warning to (${selectedReport?.reportedName})`
              : actionType === 'dismiss_report'
              ? 'Dismiss Incident Report'
              : actionType === 'warn_chat'
              ? 'Issue Chat Moderation Warning'
              : 'Dismiss Chat Flag'
          }
          description="Every security action is permanently logged to the system audit trail with your admin credentials."
          confirmLabel={
            actionType === 'ban_report' ? 'Confirm Permanent Ban' : 'Confirm & Log Action'
          }
          variant={
            actionType === 'ban_report' ? 'danger' : actionType === 'resolve_sos' ? 'default' : 'warning'
          }
          requireReason={true}
          reasonPlaceholder="Mandatory explanation or incident response summary..."
          onCancel={() => {
            setActionType(null);
            setSelectedSOS(null);
            setSelectedReport(null);
            setSelectedChatFlag(null);
          }}
          onConfirm={handleActionConfirm}
        />
      )}
    </div>
  );
};
