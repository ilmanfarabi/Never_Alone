import React from 'react';
import { 
  Users, 
  HeartHandshake, 
  CalendarCheck, 
  ShieldAlert, 
  CreditCard, 
  Clock, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { useAdminAuth } from '../context/AdminAuthContext';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';

interface DashboardHomeProps {
  onNavigate: (page: string) => void;
}

// 30 Days trend data for Recharts
const bookingTrendData = [
  { day: 'Aug 15', bookings: 12, revenue: 14400 },
  { day: 'Aug 18', bookings: 18, revenue: 21600 },
  { day: 'Aug 21', bookings: 15, revenue: 18000 },
  { day: 'Aug 24', bookings: 22, revenue: 26400 },
  { day: 'Aug 27', bookings: 28, revenue: 33600 },
  { day: 'Aug 30', bookings: 24, revenue: 28800 },
  { day: 'Sep 02', bookings: 31, revenue: 37200 },
  { day: 'Sep 05', bookings: 29, revenue: 34800 },
  { day: 'Sep 08', bookings: 35, revenue: 42000 },
  { day: 'Sep 11', bookings: 42, revenue: 50400 },
  { day: 'Sep 13', bookings: 48, revenue: 57600 },
];

// Revenue by service type
const revenueByServiceData = [
  { service: 'Dinner Date', revenue: 98400, sessions: 82 },
  { service: 'Event Plus-One', revenue: 124000, sessions: 48 },
  { service: 'Movie & Coffee', revenue: 64200, sessions: 71 },
  { service: 'Travel Guide', revenue: 78000, sessions: 26 },
  { service: 'Family Function', revenue: 86500, sessions: 39 },
  { service: 'Conversation', revenue: 42100, sessions: 52 },
];

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const { 
    customers, 
    companions, 
    bookings, 
    safetyReports, 
    sosAlerts, 
    transactions,
    tickets 
  } = useAdminAuth();

  const totalUsers = customers.length;
  const totalCompanions = companions.length;
  const pendingApprovals = companions.filter(c => c.status === 'pending');
  const activeBookingsToday = bookings.filter(b => b.status === 'confirmed').length;
  const openReports = safetyReports.filter(r => r.status === 'open' || r.status === 'investigating');
  const activeSOS = sosAlerts.filter(s => s.status === 'active');
  const openTickets = tickets.filter(t => t.status === 'open');

  const totalRevenueThisMonth = transactions.reduce((acc, t) => acc + t.totalAmount, 0) + 420000;
  const totalCommissionThisMonth = transactions.reduce((acc, t) => acc + t.commissionAmount, 0) + 84000;

  return (
    <div className="space-y-6">
      {/* 1. Top KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Customers"
          value={totalUsers.toLocaleString()}
          change="+14% this month"
          changeType="positive"
          icon={Users}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          onClick={() => onNavigate('users')}
        />

        <StatCard
          title="Companions (Hosts)"
          value={totalCompanions.toLocaleString()}
          change={`${pendingApprovals.length} pending approval`}
          changeType={pendingApprovals.length > 0 ? 'urgent' : 'positive'}
          icon={HeartHandshake}
          iconBg="bg-blue-50"
          iconColor="text-[#1B3A4B]"
          onClick={() => onNavigate('companions')}
        />

        <StatCard
          title="Active Bookings"
          value={activeBookingsToday}
          change="3 in-session now"
          changeType="positive"
          icon={CalendarCheck}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          onClick={() => onNavigate('bookings')}
        />

        <StatCard
          title="Monthly Revenue"
          value={`৳${(totalRevenueThisMonth / 1000).toFixed(0)}k`}
          change={`৳${(totalCommissionThisMonth / 1000).toFixed(0)}k fee (20%)`}
          changeType="positive"
          icon={CreditCard}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          onClick={() => onNavigate('finance')}
        />

        <StatCard
          title="Trust & Safety"
          value={openReports.length + activeSOS.length}
          change={activeSOS.length > 0 ? `${activeSOS.length} Live SOS!` : `${openReports.length} open reports`}
          changeType={activeSOS.length > 0 ? 'urgent' : 'negative'}
          icon={ShieldAlert}
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
          onClick={() => onNavigate('safety')}
        />

        <StatCard
          title="Support Tickets"
          value={openTickets.length}
          change="Avg response 18m"
          changeType="neutral"
          icon={Clock}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          onClick={() => onNavigate('tickets')}
        />
      </div>

      {/* 2. Charts Row: Line chart 30d trend & Bar chart revenue by service */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings 30-Day Line Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1B3A4B] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#FF6F61]" />
                <span>30-Day Booking Velocity & GMV Growth</span>
              </h2>
              <p className="text-sm text-slate-400">Daily completed sessions vs Gross Merchandise Value</p>
            </div>
            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
              +28.4% WoW
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B3A4B', color: '#fff', borderRadius: '12px', fontSize: '12px', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#FF6F61" strokeWidth={3} dot={{ r: 4 }} name="Sessions (Count)" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} name="GMV (BDT)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Service Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-[#1B3A4B] flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Revenue by Occasion</span>
            </h2>
            <p className="text-sm text-slate-400">Total BDT billed by service category</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByServiceData} layout="vertical" margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickFormatter={(val) => `৳${val / 1000}k`} />
                <YAxis type="category" dataKey="service" stroke="#94a3b8" fontSize={10} width={80} />
                <Tooltip 
                  formatter={(value: any) => [`৳${Number(value).toLocaleString()} BDT`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#1B3A4B', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#1B3A4B" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Action Queues: Pending Companion Approvals & Urgent Safety Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pending Companion Verification Queue */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-[#1B3A4B]">
                Pending Companion Approvals ({pendingApprovals.length})
              </h2>
            </div>
            <button
              onClick={() => onNavigate('companions')}
              className="text-sm font-bold text-[#FF6F61] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingApprovals.slice(0, 3).map((comp) => (
              <div key={comp.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={comp.avatarUrl}
                    alt={comp.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{comp.name}</div>
                    <div className="text-sm text-slate-500">
                      {comp.age}y/o • {comp.city} • Rate: ৳{comp.hourlyRate}/hr
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={comp.status} />
                  <button
                    onClick={() => onNavigate('companions')}
                    className="px-2.5 py-1 rounded-lg bg-[#1B3A4B] hover:bg-[#142d3b] text-white text-sm font-bold transition-colors"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}

            {pendingApprovals.length === 0 && (
              <div className="py-8 text-center text-sm text-slate-400">
                No pending companion applications awaiting review.
              </div>
            )}
          </div>
        </div>

        {/* Live Safety Incidents & High Priority Reports */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-[#1B3A4B]">
                Urgent Trust & Safety Incidents ({openReports.length + activeSOS.length})
              </h2>
            </div>
            <button
              onClick={() => onNavigate('safety')}
              className="text-sm font-bold text-[#FF6F61] hover:underline flex items-center gap-1"
            >
              <span>Safety Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Active SOS first */}
            {activeSOS.map((sos) => (
              <div key={sos.id} className="py-3 flex items-center justify-between gap-3 bg-red-50/60 p-2.5 rounded-xl border border-red-200 mb-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping shrink-0" />
                  <div>
                    <div className="text-sm font-black text-red-900">
                      LIVE SOS: {sos.userName}
                    </div>
                    <div className="text-sm text-red-700">
                      Venue: {sos.venueName} • Triggered: {sos.triggeredAt}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('safety')}
                  className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm font-bold hover:bg-red-700 shadow-xs"
                >
                  Action SOS
                </button>
              </div>
            ))}

            {/* Open Reports */}
            {openReports.slice(0, 3).map((rep) => (
              <div key={rep.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>{rep.category.replace(/_/g, ' ').toUpperCase()}</span>
                    <StatusBadge status={rep.severity} />
                  </div>
                  <div className="text-sm text-slate-500 line-clamp-1 mt-0.5">
                    Filed by {rep.reporterName} against {rep.reportedName}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={rep.status} />
                  <button
                    onClick={() => onNavigate('safety')}
                    className="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold"
                  >
                    Investigate
                  </button>
                </div>
              </div>
            ))}

            {openReports.length === 0 && activeSOS.length === 0 && (
              <div className="py-8 text-center text-sm text-slate-400">
                All trust and safety queues are clear.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
