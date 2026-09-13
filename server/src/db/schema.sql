-- NeverAlone PostgreSQL Database Schema
-- Production-ready schema for Platonic Companionship Platform

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admin Users & Staff
CREATE TYPE admin_role_enum AS ENUM (
  'super_admin',
  'trust_safety_agent',
  'finance_agent',
  'support_agent'
);

CREATE TYPE admin_status_enum AS ENUM ('active', 'suspended', 'inactive');

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role admin_role_enum NOT NULL DEFAULT 'support_agent',
  two_factor_secret VARCHAR(255),
  two_factor_enabled BOOLEAN DEFAULT TRUE,
  status admin_status_enum DEFAULT 'active',
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Customer Users
CREATE TYPE user_status_enum AS ENUM ('active', 'suspended', 'banned', 'pending_verification');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(30) UNIQUE NOT NULL,
  avatar_url TEXT,
  city VARCHAR(50) NOT NULL,
  status user_status_enum DEFAULT 'active',
  nid_verified BOOLEAN DEFAULT FALSE,
  id_document_url TEXT,
  emergency_contact VARCHAR(100),
  emergency_phone VARCHAR(30),
  strike_count INT DEFAULT 0,
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Companions
CREATE TYPE companion_status_enum AS ENUM ('pending_approval', 'approved', 'rejected', 'suspended');

CREATE TABLE companions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(30) UNIQUE NOT NULL,
  avatar_url TEXT,
  age INT NOT NULL,
  gender VARCHAR(20) NOT NULL,
  bio TEXT,
  hourly_rate INT NOT NULL DEFAULT 500,
  city VARCHAR(50) NOT NULL,
  rating NUMERIC(3,2) DEFAULT 5.00,
  total_reviews INT DEFAULT 0,
  total_bookings INT DEFAULT 0,
  status companion_status_enum DEFAULT 'pending_approval',
  id_document_type VARCHAR(50),
  id_document_url TEXT,
  police_verification_url TEXT,
  background_check_status VARCHAR(50) DEFAULT 'pending',
  rejection_reason TEXT,
  skills TEXT[],
  languages TEXT[],
  total_earnings INT DEFAULT 0,
  unpaid_earnings INT DEFAULT 0,
  payout_method VARCHAR(50) DEFAULT 'bkash',
  payout_account VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bookings
CREATE TYPE booking_status_enum AS ENUM (
  'pending_escrow',
  'confirmed',
  'in_progress',
  'completed',
  'disputed',
  'cancelled',
  'refunded'
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES users(id),
  companion_id UUID REFERENCES companions(id),
  service_type VARCHAR(100) NOT NULL,
  occasion_type VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  duration_hours INT NOT NULL,
  location_address TEXT NOT NULL,
  location_lat NUMERIC(10, 6),
  location_lng NUMERIC(10, 6),
  total_price INT NOT NULL,
  platform_fee INT NOT NULL,
  companion_payout INT NOT NULL,
  status booking_status_enum DEFAULT 'pending_escrow',
  special_instructions TEXT,
  dispute_reason TEXT,
  dispute_filed_by VARCHAR(20),
  dispute_resolved_at TIMESTAMPTZ,
  dispute_resolution_notes TEXT,
  escrow_released_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Booking Timeline Audit
CREATE TABLE booking_timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  actor_id UUID,
  actor_role VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Payment & Payout Ledgers
CREATE TYPE payment_status_enum AS ENUM ('pending', 'completed', 'refunded', 'failed');

CREATE TABLE payment_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id),
  customer_id UUID REFERENCES users(id),
  companion_id UUID REFERENCES companions(id),
  amount INT NOT NULL,
  platform_fee INT NOT NULL,
  companion_payout INT NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  status payment_status_enum DEFAULT 'pending',
  gateway_transaction_id VARCHAR(100),
  refund_reason TEXT,
  refund_amount INT,
  refunded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. SOS Emergency Distresses
CREATE TYPE sos_status_enum AS ENUM ('active', 'resolved', 'investigating');

CREATE TABLE sos_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id),
  triggered_by_id UUID REFERENCES users(id),
  triggered_by_type VARCHAR(20) NOT NULL,
  latitude NUMERIC(10, 6) NOT NULL,
  longitude NUMERIC(10, 6) NOT NULL,
  location_address TEXT NOT NULL,
  battery_level INT,
  emergency_contact VARCHAR(50),
  status sos_status_enum DEFAULT 'active',
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES admin_users(id),
  resolved_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Safety & Incident Reports
CREATE TYPE report_category_enum AS ENUM (
  'dating_or_escort_solicitation',
  'sexual_harassment',
  'verbal_abuse_or_threats',
  'offline_payment_evasion',
  'no_show',
  'impersonation',
  'other'
);

CREATE TYPE report_status_enum AS ENUM ('pending', 'investigating', 'action_taken', 'dismissed');

CREATE TABLE safety_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id),
  reported_user_id UUID REFERENCES users(id),
  booking_id UUID REFERENCES bookings(id),
  category report_category_enum NOT NULL,
  description TEXT NOT NULL,
  evidence_urls TEXT[],
  status report_status_enum DEFAULT 'pending',
  action_taken TEXT,
  reviewed_by UUID REFERENCES admin_users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Flagged Chats
CREATE TABLE chat_flags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id),
  sender_id UUID REFERENCES users(id),
  receiver_id UUID REFERENCES users(id),
  flagged_word VARCHAR(100) NOT NULL,
  message_snippet TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'pending',
  reviewed_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. Content Moderation Queue (Photos & Reviews)
CREATE TABLE moderation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_type VARCHAR(20) NOT NULL, -- 'photo' | 'review'
  user_id UUID REFERENCES users(id),
  content_url TEXT,
  content_text TEXT,
  rating INT,
  booking_id UUID REFERENCES bookings(id),
  status VARCHAR(20) DEFAULT 'pending',
  moderated_by UUID REFERENCES admin_users(id),
  moderation_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 11. Support Tickets
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  subject VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'open',
  assigned_to UUID REFERENCES admin_users(id),
  booking_id UUID REFERENCES bookings(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ticket_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  sender_name VARCHAR(100) NOT NULL,
  sender_role VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 12. Immutable System Audit Log
CREATE TABLE admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_users(id),
  admin_name VARCHAR(100) NOT NULL,
  admin_role admin_role_enum NOT NULL,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50) NOT NULL,
  target_id VARCHAR(100) NOT NULL,
  reason TEXT NOT NULL,
  ip_address VARCHAR(50) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 13. Platform Configuration Settings
CREATE TABLE platform_settings (
  id INT PRIMARY KEY DEFAULT 1,
  commission_percentage NUMERIC(4, 2) DEFAULT 15.00,
  minimum_booking_hours INT DEFAULT 2,
  cancellation_window_hours INT DEFAULT 6,
  emergency_hotline VARCHAR(50) DEFAULT '+880 9611-999-SOS',
  maintenance_mode BOOLEAN DEFAULT FALSE,
  banned_keywords TEXT[] DEFAULT ARRAY['hotel room', 'sleep over', 'kiss', 'massage', 'escort', 'dating', 'direct payment', 'cash outside', 'whatsapp offline', 'romance'],
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial default settings
INSERT INTO platform_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
