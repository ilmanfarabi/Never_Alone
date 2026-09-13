export type AdminRole = 
  | 'super_admin' 
  | 'trust_safety_agent' 
  | 'finance_agent' 
  | 'support_agent';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarUrl?: string;
  twoFactorEnabled: boolean;
  lastLoginAt: string;
  status: 'active' | 'suspended';
  createdAt: string;
}

export type CustomerStatus = 'active' | 'suspended' | 'banned';
export type VerificationStatus = 'verified' | 'pending' | 'unverified' | 'rejected';

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  signupDate: string;
  avatarUrl: string;
  verificationStatus: VerificationStatus;
  idDocumentUrl?: string;
  idDocumentType?: 'NID' | 'Passport' | 'Driving License';
  totalBookings: number;
  totalSpent: number;
  status: CustomerStatus;
  reportsFiledCount: number;
  reportsReceivedCount: number;
  notes: AccountNote[];
}

export interface AccountNote {
  id: string;
  authorName: string;
  authorRole: AdminRole;
  text: string;
  createdAt: string;
}

export type CompanionStatus = 'pending' | 'approved' | 'active' | 'suspended' | 'rejected';

export interface CompanionProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  signupDate: string;
  avatarUrl: string;
  galleryPhotos: { url: string; flagged: boolean }[];
  bio: string;
  interests: string[];
  languages: string[];
  hourlyRate: number;
  city: string;
  rating: number;
  reviewCount: number;
  totalSessions: number;
  totalEarnings: number;
  pendingPayout: number;
  verificationStatus: VerificationStatus;
  backgroundCheckStatus: 'passed' | 'pending' | 'failed' | 'not_started';
  idDocumentUrl: string;
  backgroundCheckReportUrl?: string;
  status: CompanionStatus;
  rejectionReason?: string;
  appliedDate: string;
  availability: string[];
  commissionRateOverride?: number; // e.g. 15 for 15% override
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'disputed';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed';

export interface BookingRecord {
  id: string;
  customerId: string;
  customerName: string;
  companionId: string;
  companionName: string;
  occasionType: string;
  date: string;
  time: string;
  durationHours: number;
  venueName: string;
  venueAddress: string;
  status: BookingStatus;
  amount: number;
  platformFee: number;
  companionPayout: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  timeline: BookingTimelineEvent[];
  disputeDetails?: {
    reason: string;
    raisedBy: 'customer' | 'companion';
    status: 'open' | 'investigating' | 'resolved';
    resolutionNote?: string;
    refundAmount?: number;
    resolvedAt?: string;
    resolvedBy?: string;
  };
}

export interface BookingTimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface TransactionLedgerItem {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  companionId: string;
  companionName: string;
  totalAmount: number;
  commissionAmount: number;
  commissionPercentage: number;
  companionAmount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Card' | 'Wallet';
  paymentDate: string;
  payoutStatus: 'pending' | 'processing' | 'paid';
  payoutReference?: string;
  payoutDate?: string;
  refundedAmount?: number;
  refundReason?: string;
}

export interface PayoutBatch {
  id: string;
  batchReference: string;
  companionCount: number;
  totalAmount: number;
  processedBy: string;
  processedAt: string;
  status: 'completed' | 'failed';
  transactionIds: string[];
}

export type ReportCategory = 
  | 'harassment' 
  | 'romantic_advance' 
  | 'sexual_advance' 
  | 'no_show' 
  | 'unsafe_behavior' 
  | 'private_venue_attempt'
  | 'other';

export type ReportStatus = 'open' | 'investigating' | 'resolved' | 'dismissed';

export interface SafetyReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterType: 'customer' | 'companion';
  reportedId: string;
  reportedName: string;
  reportedType: 'customer' | 'companion';
  bookingId?: string;
  category: ReportCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: ReportStatus;
  description: string;
  evidenceUrls?: string[];
  flaggedMessages?: string[];
  assignedAgent?: string;
  resolutionNote?: string;
  actionTaken?: 'warned' | 'suspended' | 'banned' | 'dismissed' | 'refunded';
  createdAt: string;
  resolvedAt?: string;
}

export interface SOSAlert {
  id: string;
  bookingId: string;
  triggeredBy: 'customer' | 'companion';
  userName: string;
  userPhone: string;
  userEmail: string;
  companionName: string;
  companionPhone: string;
  occasionType: string;
  venueName: string;
  venueAddress: string;
  lastCheckInLocation: string;
  lastCheckInTime: string;
  triggeredAt: string;
  status: 'active' | 'acknowledged' | 'resolved' | 'false_alarm';
  emergencyContacts: { name: string; relation: string; phone: string }[];
  assignedAgent?: string;
  resolutionNotes?: string;
  policeContacted: boolean;
}

export interface ChatFlag {
  id: string;
  bookingId: string;
  senderName: string;
  senderRole: 'customer' | 'companion';
  recipientName: string;
  messageText: string;
  detectedKeywords: string[];
  flaggedReason: string;
  severity: 'medium' | 'high';
  timestamp: string;
  status: 'pending' | 'dismissed' | 'actioned';
  actionTaken?: 'warned' | 'suspended' | 'banned';
}

export interface ContentModerationItem {
  id: string;
  type: 'profile_photo' | 'bio' | 'review';
  companionOrUserId: string;
  name: string;
  submittedAt: string;
  content: string; // URL for photo, text for bio/review
  rating?: number;
  authorName?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  requesterName: string;
  requesterEmail: string;
  requesterType: 'customer' | 'companion';
  subject: string;
  category: 'booking_issue' | 'payment_refund' | 'account' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'resolved' | 'closed';
  assignedAgent?: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  senderName: string;
  senderRole: 'customer' | 'companion' | 'agent';
  isInternalNote: boolean;
  message: string;
  timestamp: string;
}

export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminName: string;
  adminRole: AdminRole;
  action: string;
  targetType: 'user' | 'companion' | 'booking' | 'payment' | 'safety_report' | 'settings' | 'ticket';
  targetId: string;
  targetName: string;
  reasonOrNote?: string;
  details?: Record<string, any>;
  ipAddress: string;
  timestamp: string;
}

export interface PlatformSettings {
  defaultCommissionPercentage: number;
  cancellationFreeWindowHours: number;
  cancellationFeePercentage: number;
  minimumHourlyRate: number;
  maximumHourlyRate: number;
  bannedKeywords: string[];
  autoFlagSexualTerms: boolean;
  requireIdBeforeBooking: boolean;
  supportedPaymentMethods: { name: string; enabled: boolean }[];
  emergencyHotline: string;
}
