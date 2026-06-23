import { PageLayout } from '@/components/layout/PageLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar } from '@/components/ui/Avatar';
import { Badge, statusBadge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { employees, leaveRequests, performanceReviews, payrollRuns, enrollments, courses } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  Users, CalendarDays, TrendingUp, DollarSign,
  Clock, CheckCircle2, AlertCircle, ArrowRight,
  GraduationCap, UserCheck, Cake, MapPin
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

const headcountByDept = [
  { dept: 'Engineering', count: 4 },
  { dept: 'Product', count: 2 },
  { dept: 'HR', count: 1 },
  { dept: 'Finance', count: 1 },
  { dept: 'Marketing', count: 1 },
  { dept: 'Sales', count: 1 },
  { dept: 'Operations', count: 1 },
  { dept: 'Legal', count: 1 },
];

const headcountTrend = [
  { month: 'Aug', count: 8 },
  { month: 'Sep', count: 9 },
  { month: 'Oct', count: 10 },
  { month: 'Nov', count: 11 },
  { month: 'Dec', count: 11 },
  { month: 'Jan', count: 12 },
];

const leaveByType = [
  { name: 'Annual', value: 5, color: '#3b82f6' },
  { name: 'Sick', value: 3, color: '#10b981' },
  { name: 'Personal', value: 2, color: '#f59e0b' },
  { name: 'Maternity', value: 1, color: '#8b5cf6' },
];

export function Dashboard() {
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const onLeave = employees.filter(e => e.status === 'On Leave').length;
  const pendingLeave = leaveRequests.filter(r => r.status === 'Pending').length;
  const pendingReviews = performanceReviews.filter(r => r.status !== 'Completed').length;
  const latestPayroll = payrollRuns.find(p => p.status === 'Completed');
  const mandatoryCompliance = courses.filter(c => c.mandatory).length;
  const completedMandatory = enrollments.filter(e => {
    const c = courses.find(c2 => c2.id === e.courseId);
    return c?.mandatory && e.status === 'Completed';
  }).length;
  const complianceRate = Math.round((completedMandatory / (mandatoryCompliance * employees.length)) * 100);

  const pendingLeaveRequests = leaveRequests.filter(r => r.status === 'Pending');
  const recentActivity = [
    { icon: UserCheck, color: 'text-emerald-500 bg-emerald-50', text: 'Robert Kim completed onboarding', time: '2h ago' },
    { icon: CalendarDays, color: 'text-blue-500 bg-blue-50', text: 'Priya Sharma requested 5 days annual leave', time: '3h ago' },
    { icon: TrendingUp, color: 'text-purple-500 bg-purple-50', text: 'Q4 2024 reviews completed for 3 employees', time: '1d ago' },
    { icon: DollarSign, color: 'text-slate-500 bg-slate-50', text: 'January payroll processed — $798K net', time: '2d ago' },
    { icon: GraduationCap, color: 'text-orange-500 bg-orange-50', text: 'David Park completed Data Security training', time: '3d ago' },
  ];

  const upcomingBirthdays = [
    { name: 'James Okonkwo', date: 'Feb 12', id: 'e2', firstName: 'James', lastName: 'Okonkwo' },
    { name: 'Priya Sharma', date: 'Feb 20', id: 'e3', firstName: 'Priya', lastName: 'Sharma' },
  ];

  const workAnniversaries = [
    { name: 'Sarah Mitchell', date: 'Mar 15', years: 6, id: 'e1', firstName: 'Sarah', lastName: 'Mitchell' },
  ];

  return (
    <PageLayout title="Dashboard" subtitle={`Welcome back, Marcus · ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}>
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Employees"
          value={employees.length}
          subtitle={`${activeEmployees} active · ${onLeave} on leave`}
          icon={<Users className="w-5 h-5 text-blue-600" />}
          iconBg="bg-blue-50"
          trend={{ value: 9, label: 'vs last month' }}
        />
        <StatCard
          title="Pending Leave Requests"
          value={pendingLeave}
          subtitle="Awaiting your approval"
          icon={<CalendarDays className="w-5 h-5 text-amber-600" />}
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Open Review Cycles"
          value={pendingReviews}
          subtitle="Q4 2024 performance cycle"
          icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Last Payroll Run"
          value={latestPayroll ? formatCurrency(latestPayroll.totalNet) : '—'}
          subtitle={`${latestPayroll?.period} · ${latestPayroll?.employeeCount} employees`}
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          iconBg="bg-emerald-50"
          trend={{ value: 0, label: 'vs prev month' }}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Headcount Trend */}
        <div className="col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Headcount Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Last 6 months</p>
            </div>
            <span className="text-2xl font-bold text-slate-900">{employees.length}</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={headcountTrend}>
              <defs>
                <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[6, 14]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
              <Area type="monotone" dataKey="count" name="Employees" stroke="#3b82f6" strokeWidth={2.5} fill="url(#blue)" dot={{ r: 4, fill: '#3b82f6' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leave breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Leave This Month</h3>
          <p className="text-xs text-slate-400 mb-4">Breakdown by type</p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={leaveByType} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value">
                {leaveByType.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {leaveByType.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Pending leave approvals */}
        <div className="col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Pending Approvals</h3>
            <Link to="/leave" className="text-xs text-blue-600 hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="divide-y divide-slate-50">
            {pendingLeaveRequests.length === 0 ? (
              <p className="text-sm text-slate-400 px-5 py-6 text-center">All caught up!</p>
            ) : pendingLeaveRequests.map(req => {
              const emp = employees.find(e => e.id === req.employeeId);
              if (!emp) return null;
              return (
                <div key={req.id} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50">
                  <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{emp.firstName} {emp.lastName}</p>
                    <p className="text-xs text-slate-400">{req.type} · {req.days}d · {formatDate(req.startDate)}</p>
                  </div>
                  {statusBadge(req.status)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dept headcount bar */}
        <div className="col-span-1 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Headcount by Dept</h3>
          <p className="text-xs text-slate-400 mb-4">Current distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={headcountByDept} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="dept" type="category" width={80} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
              <Bar dataKey="count" name="Employees" fill="#3b82f6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity + Upcoming */}
        <div className="col-span-1 space-y-4">
          {/* Compliance */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">Training Compliance</h3>
              <span className="text-lg font-bold text-slate-900">{complianceRate}%</span>
            </div>
            <ProgressBar value={complianceRate} color={complianceRate >= 75 ? 'green' : 'yellow'} showLabel={false} />
            <p className="text-xs text-slate-400 mt-2">{completedMandatory} of {mandatoryCompliance * employees.length} mandatory completions</p>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex-1">
            <div className="px-5 py-4 border-b border-slate-50">
              <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {recentActivity.slice(0, 4).map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="px-5 py-3 flex items-start gap-3 hover:bg-slate-50">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-700 leading-snug">{item.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
