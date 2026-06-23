import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { employees, leaveRequests, performanceReviews, enrollments, courses, payrollRuns, benefitEnrollments, benefitPlans } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { Download, BarChart3, Users, CalendarDays, TrendingUp, DollarSign, Shield, GraduationCap } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899', '#84cc16'];

const deptDistribution = [
  { name: 'Engineering', value: 4 },
  { name: 'Product', value: 2 },
  { name: 'Finance', value: 1 },
  { name: 'Legal', value: 1 },
  { name: 'Marketing', value: 1 },
  { name: 'HR', value: 1 },
  { name: 'Sales', value: 1 },
  { name: 'Operations', value: 1 },
];

const turnoverData = [
  { month: 'Aug', hires: 1, exits: 0 },
  { month: 'Sep', hires: 1, exits: 0 },
  { month: 'Oct', hires: 1, exits: 1 },
  { month: 'Nov', hires: 1, exits: 0 },
  { month: 'Dec', hires: 0, exits: 0 },
  { month: 'Jan', hires: 1, exits: 0 },
];

const leaveByMonth = [
  { month: 'Aug', days: 12 },
  { month: 'Sep', days: 8 },
  { month: 'Oct', days: 15 },
  { month: 'Nov', days: 10 },
  { month: 'Dec', days: 22 },
  { month: 'Jan', days: 18 },
];

const payrollTrend = [
  { month: 'Aug', amount: 689000 },
  { month: 'Sep', amount: 689000 },
  { month: 'Oct', amount: 745000 },
  { month: 'Nov', amount: 689000 },
  { month: 'Dec', amount: 798000 },
  { month: 'Jan', amount: 798000 },
];

const reportCards = [
  { title: 'Headcount Report', description: 'Full employee census with department breakdown', icon: Users, color: 'bg-blue-50 text-blue-600', tag: 'HR' },
  { title: 'Leave Summary', description: 'Utilization rates and leave balance rollups', icon: CalendarDays, color: 'bg-amber-50 text-amber-600', tag: 'HR' },
  { title: 'Performance Overview', description: 'Rating distributions and review completion rates', icon: TrendingUp, color: 'bg-purple-50 text-purple-600', tag: 'Performance' },
  { title: 'Payroll Register', description: 'Detailed gross-to-net breakdown by employee', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600', tag: 'Payroll' },
  { title: 'Benefits Utilization', description: 'Enrollment rates and cost per employee', icon: Shield, color: 'bg-rose-50 text-rose-600', tag: 'Benefits' },
  { title: 'Training Compliance', description: 'Mandatory training completion rates', icon: GraduationCap, color: 'bg-teal-50 text-teal-600', tag: 'Training' },
];

export function Reports() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const activeCount = employees.filter(e => e.status === 'Active').length;
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length);
  const totalPayrollYTD = payrollRuns.filter(r => r.status === 'Completed').reduce((s, r) => s + r.totalNet, 0);
  const reviewCompletionRate = Math.round((performanceReviews.filter(r => r.status === 'Completed').length / performanceReviews.length) * 100);

  return (
    <PageLayout
      title="Reports & Analytics"
      subtitle="Workforce insights across all HR modules"
      actions={
        <Button size="sm" icon={<Download className="w-3.5 h-3.5" />} variant="outline">Export All</Button>
      }
    >
      {/* KPI Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Employees', value: activeCount, sub: `of ${employees.length} total`, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Salary', value: formatCurrency(avgSalary), sub: 'across all employees', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'YTD Net Payroll', value: formatCurrency(totalPayrollYTD), sub: 'Jan–Jan 2025', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Review Completion', value: `${reviewCompletionRate}%`, sub: 'Q4 2024 cycle', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">{kpi.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* Headcount by dept */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Headcount by Department</h3>
            <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Download className="w-3 h-3" />Export</button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={deptDistribution} cx="50%" cy="50%" outerRadius={72} paddingAngle={2} dataKey="value">
                {deptDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {deptDistribution.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-slate-600 truncate">{d.name}</span>
                <span className="font-semibold text-slate-900 ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Turnover */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Hires vs Exits</h3>
            <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Download className="w-3 h-3" />Export</button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={turnoverData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="hires" name="Hires" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="exits" name="Exits" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leave trend */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Leave Days Taken</h3>
            <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Download className="w-3 h-3" />Export</button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={leaveByMonth}>
              <defs>
                <linearGradient id="leaveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
              <Area type="monotone" dataKey="days" name="Leave Days" stroke="#f59e0b" strokeWidth={2} fill="url(#leaveFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payroll trend */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Net Payroll Trend</h3>
            <p className="text-xs text-slate-400 mt-0.5">Monthly net payroll spend (last 6 months)</p>
          </div>
          <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Download className="w-3 h-3" />Export</button>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={payrollTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
            <Line type="monotone" dataKey="amount" name="Net Payroll" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick report cards */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Available Reports</h3>
        <div className="grid grid-cols-3 gap-3">
          {reportCards.map(card => (
            <div key={card.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-semibold text-slate-900">{card.title}</p>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{card.tag}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{card.description}</p>
              </div>
              <Download className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
