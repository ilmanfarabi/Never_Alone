import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Download, 
  ArrowUpRight, 
  ShieldCheck 
} from 'lucide-react';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 420000, bookings: 140, platformFee: 63000 },
  { month: 'Feb', revenue: 580000, bookings: 190, platformFee: 87000 },
  { month: 'Mar', revenue: 720000, bookings: 240, platformFee: 108000 },
  { month: 'Apr', revenue: 680000, bookings: 220, platformFee: 102000 },
  { month: 'May', revenue: 890000, bookings: 295, platformFee: 133500 },
  { month: 'Jun', revenue: 1050000, bookings: 345, platformFee: 157500 },
  { month: 'Jul', revenue: 1240000, bookings: 410, platformFee: 186000 },
  { month: 'Aug', revenue: 1480000, bookings: 490, platformFee: 222000 },
  { month: 'Sep', revenue: 1690000, bookings: 560, platformFee: 253500 },
];

const OCCASION_DATA = [
  { name: 'Wedding Plus-One', value: 38, color: '#FF6F61' },
  { name: 'Dining / Food Exploration', value: 24, color: '#3B82F6' },
  { name: 'City / Tourism Guide', value: 16, color: '#10B981' },
  { name: 'Movie & Theatre', value: 11, color: '#F59E0B' },
  { name: 'Workout & Fitness', value: 7, color: '#8B5CF6' },
  { name: 'Family / Social Gatherings', value: 4, color: '#EC4899' },
];

const FUNNEL_DATA = [
  { stage: 'Applied', count: 1250, conversion: '100%' },
  { stage: 'Docs Uploaded', count: 820, conversion: '65.6%' },
  { stage: 'Safety Passed', count: 480, conversion: '58.5%' },
  { stage: 'Active Profile', count: 350, conversion: '72.9%' },
  { stage: '1st Completed Booking', count: 290, conversion: '82.8%' },
];

const CITY_DATA = [
  { city: 'Dhaka (Gulshan/Dhanmondi)', bookings: 420, companions: 85 },
  { city: 'Dhaka (Uttara/Mirpur)', bookings: 280, companions: 55 },
  { city: 'Chittagong', bookings: 160, companions: 32 },
  { city: 'Sylhet', bookings: 95, companions: 20 },
  { city: 'Cox\'s Bazar (Tourism)', bookings: 85, companions: 18 },
  { city: 'Rajshahi', bookings: 45, companions: 12 },
];

export const AnalyticsReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('9m');

  const exportAnalyticsCSV = () => {
    const headers = ['Month', 'Gross Volume (BDT)', 'Platform Revenue (15% BDT)', 'Completed Bookings'];
    const rows = REVENUE_DATA.map(r => [r.month, r.revenue, r.platformFee, r.bookings]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'NeverAlone_Executive_Analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Analytics & Business Intelligence</h1>
          <p className="text-sm text-gray-500">
            Growth metrics, platonic companionship trends, conversion funnels, and demographic breakdown.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm focus:outline-none"
          >
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last Quarter</option>
            <option value="9m">Year to Date (2026)</option>
          </select>

          <button
            onClick={exportAnalyticsCSV}
            className="px-4 py-2 bg-[#1B3A4B] hover:bg-[#132a36] text-white text-sm font-bold rounded-xl transition shadow-sm flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Executive CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Summary High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">YTD Gross Booking Volume</p>
          <p className="text-2xl font-black text-gray-900 mt-1">৳8,070,000</p>
          <div className="flex items-center text-sm text-emerald-600 font-bold mt-1">
            <ArrowUpRight className="w-4 h-4 mr-0.5" />
            <span>+24.5% vs Q1</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Net Platform Commission</p>
          <p className="text-2xl font-black text-[#FF6F61] mt-1">৳1,210,500</p>
          <div className="flex items-center text-sm text-emerald-600 font-bold mt-1">
            <ArrowUpRight className="w-4 h-4 mr-0.5" />
            <span>15% avg take-rate</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Verified Companions</p>
          <p className="text-2xl font-black text-gray-900 mt-1">350 Active</p>
          <div className="flex items-center text-sm text-blue-600 font-bold mt-1">
            <ShieldCheck className="w-4 h-4 mr-0.5" />
            <span>100% NID Verified</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Avg. Booking Value (ABV)</p>
          <p className="text-2xl font-black text-gray-900 mt-1">৳3,020</p>
          <div className="flex items-center text-sm text-emerald-600 font-bold mt-1">
            <ArrowUpRight className="w-4 h-4 mr-0.5" />
            <span>~4.2 hrs / session</span>
          </div>
        </div>
      </div>

      {/* Recharts Grid 1: Revenue & Volume Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GMV Growth Line/Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Gross Merchandise Value & Platform Revenue</h2>
              <p className="text-sm text-gray-500">Monthly booking transaction volume (BDT)</p>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B3A4B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1B3A4B" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorFee" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6F61" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#FF6F61" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `৳${val / 1000}k`} />
                <Tooltip 
                  formatter={(val: any) => [`৳${Number(val).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#1B3A4B', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="revenue" name="Gross Volume (BDT)" stroke="#1B3A4B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGmv)" />
                <Area type="monotone" dataKey="platformFee" name="Platform Revenue (BDT)" stroke="#FF6F61" strokeWidth={2} fillOpacity={1} fill="url(#colorFee)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occasion Breakdown Pie Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Occasion Categories</h2>
            <p className="text-sm text-gray-500 mb-2">Platonic companionship use-cases</p>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={OCCASION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {OCCASION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t border-gray-100">
            {OCCASION_DATA.map(o => (
              <div key={o.name} className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: o.color }} />
                <span className="text-gray-600 truncate">{o.name} ({o.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recharts Grid 2: Regional City Volume & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* City Distribution Bar Chart */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Regional Booking Distribution</h2>
              <p className="text-sm text-gray-500">Active companionship bookings by urban hub</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CITY_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="city" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1B3A4B', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                <Bar dataKey="bookings" name="Bookings" fill="#FF6F61" radius={[4, 4, 0, 0]} />
                <Bar dataKey="companions" name="Companions" fill="#1B3A4B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Companion Onboarding Conversion Funnel */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Companion Onboarding Conversion Funnel</h2>
            <p className="text-sm text-gray-500">Applicant drop-off analysis during safety vetting</p>
          </div>

          <div className="space-y-3 pt-2">
            {FUNNEL_DATA.map((step, idx) => (
              <div key={step.stage} className="space-y-1">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-gray-800">{idx + 1}. {step.stage}</span>
                  <div className="space-x-2">
                    <span className="text-gray-500">{step.count} candidates</span>
                    <span className="font-bold text-[#1B3A4B]">({step.conversion})</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#1B3A4B] to-[#FF6F61] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(step.count / 1250) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 italic pt-2">
            *High drop-off between Application and Safety Check is intentional due to strict NID & police background screening.
          </p>
        </div>
      </div>
    </div>
  );
};
