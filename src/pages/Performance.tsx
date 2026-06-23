import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { statusBadge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { employees, performanceReviews, goals, getEmployeeName } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import type { Goal } from '@/types';
import {
  Plus, Star, TrendingUp, CheckCircle2, AlertCircle,
  Clock, Target, BarChart3, ChevronRight, Edit3
} from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const ratingLabels: Record<number, string> = { 1: 'Poor', 2: 'Below Avg', 3: 'Meets Expectations', 4: 'Exceeds', 5: 'Outstanding' };
const ratingColors: Record<number, string> = { 1: 'text-red-500', 2: 'text-orange-500', 3: 'text-amber-500', 4: 'text-blue-500', 5: 'text-emerald-500' };

const GOAL_STATUS_COLS = ['Not Started', 'On Track', 'At Risk', 'Completed'] as const;

const ratingDist = [
  { label: 'Outstanding', count: 1, color: '#10b981' },
  { label: 'Exceeds', count: 1, color: '#3b82f6' },
  { label: 'Meets', count: 1, color: '#f59e0b' },
  { label: 'Below Avg', count: 0, color: '#f97316' },
  { label: 'Poor', count: 0, color: '#ef4444' },
];

const radarData = [
  { subject: 'Communication', A: 4.2 },
  { subject: 'Technical', A: 4.5 },
  { subject: 'Leadership', A: 3.8 },
  { subject: 'Collaboration', A: 4.1 },
  { subject: 'Delivery', A: 4.4 },
  { subject: 'Innovation', A: 3.6 },
];

export function Performance() {
  const [tab, setTab] = useState('reviews');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const completedCount = performanceReviews.filter(r => r.status === 'Completed').length;
  const inProgressCount = performanceReviews.filter(r => r.status === 'In Progress').length;
  const overdueCount = performanceReviews.filter(r => r.status === 'Overdue').length;
  const notStartedCount = performanceReviews.filter(r => r.status === 'Not Started').length;

  const goalsByStatus = GOAL_STATUS_COLS.reduce<Record<string, Goal[]>>((acc, col) => {
    acc[col] = goals.filter(g => g.status === col);
    return acc;
  }, {});

  const colColors: Record<string, string> = {
    'Not Started': 'border-slate-200 bg-slate-50',
    'On Track': 'border-blue-200 bg-blue-50',
    'At Risk': 'border-amber-200 bg-amber-50',
    'Completed': 'border-emerald-200 bg-emerald-50',
  };

  const colHeaderColors: Record<string, string> = {
    'Not Started': 'text-slate-600 bg-slate-100',
    'On Track': 'text-blue-700 bg-blue-100',
    'At Risk': 'text-amber-700 bg-amber-100',
    'Completed': 'text-emerald-700 bg-emerald-100',
  };

  return (
    <PageLayout
      title="Performance Management"
      subtitle="Q4 2024 Review Cycle"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Target className="w-3.5 h-3.5" />} onClick={() => setShowGoalModal(true)}>Add Goal</Button>
          <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowReviewModal(true)}>Start Review</Button>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Completed', value: completedCount, icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'In Progress', value: inProgressCount, icon: Clock, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Not Started', value: notStartedCount, icon: AlertCircle, bg: 'bg-slate-50', color: 'text-slate-500' },
          { label: 'Overdue', value: overdueCount, icon: AlertCircle, bg: 'bg-red-50', color: 'text-red-600' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg}`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs
        tabs={[
          { id: 'reviews', label: 'Review Cycles', icon: <Star className="w-4 h-4" /> },
          { id: 'goals', label: 'Goals Board', icon: <Target className="w-4 h-4" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
        ]}
        active={tab}
        onChange={setTab}
        className="mb-5"
      />

      {tab === 'reviews' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Employee', 'Period', 'Reviewer', 'Status', 'Due Date', 'Rating', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {performanceReviews.map(review => {
                const emp = employees.find(e => e.id === review.employeeId);
                const reviewer = employees.find(e => e.id === review.reviewerId);
                if (!emp) return null;
                return (
                  <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="sm" />
                        <div>
                          <p className="font-semibold text-slate-900">{emp.firstName} {emp.lastName}</p>
                          <p className="text-xs text-slate-400">{emp.jobTitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{review.period}</td>
                    <td className="px-5 py-3.5 text-slate-600">{reviewer ? `${reviewer.firstName} ${reviewer.lastName}` : '—'}</td>
                    <td className="px-5 py-3.5">{statusBadge(review.status)}</td>
                    <td className="px-5 py-3.5 text-slate-500">{formatDate(review.dueDate)}</td>
                    <td className="px-5 py-3.5">
                      {review.rating ? (
                        <div className="flex items-center gap-1.5">
                          <div className="flex">
                            {[1,2,3,4,5].map(n => (
                              <span key={n} className={`text-sm ${n <= review.rating! ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
                            ))}
                          </div>
                          <span className={`text-xs font-medium ${ratingColors[review.rating]}`}>{ratingLabels[review.rating]}</span>
                        </div>
                      ) : <span className="text-slate-300 text-xs">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        {review.status === 'Completed' ? 'View' : 'Continue'} <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'goals' && (
        <div className="grid grid-cols-4 gap-4">
          {GOAL_STATUS_COLS.map(col => (
            <div key={col} className={`rounded-2xl border-2 ${colColors[col]} p-4 min-h-64`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${colHeaderColors[col]}`}>{col}</span>
                <span className="text-xs text-slate-400 font-medium">{goalsByStatus[col]?.length ?? 0}</span>
              </div>
              <div className="space-y-3">
                {(goalsByStatus[col] ?? []).map(goal => {
                  const emp = employees.find(e => e.id === goal.employeeId);
                  return (
                    <div key={goal.id} className="bg-white rounded-xl p-3 shadow-sm border border-white hover:shadow-md transition-shadow cursor-pointer">
                      <p className="text-sm font-semibold text-slate-900 leading-snug">{goal.title}</p>
                      {emp && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="xs" />
                          <p className="text-xs text-slate-500">{emp.firstName} {emp.lastName}</p>
                        </div>
                      )}
                      <div className="mt-2">
                        <ProgressBar value={goal.progress} size="sm" color={goal.status === 'Completed' ? 'green' : goal.status === 'At Risk' ? 'yellow' : 'blue'} showLabel />
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5">Due {formatDate(goal.dueDate)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Rating Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ratingDist} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                {ratingDist.map((entry, i) => (
                  <Bar key={i} dataKey="count" name="Employees" fill={entry.color} radius={[6, 6, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Average Team Competencies</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
                <Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Review progress */}
          <div className="col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Q4 2024 Review Completion by Dept</h3>
            <div className="space-y-4">
              {[
                { dept: 'Engineering', completed: 1, total: 3 },
                { dept: 'Product', completed: 2, total: 2 },
                { dept: 'HR', completed: 0, total: 1 },
                { dept: 'Marketing', completed: 1, total: 1 },
                { dept: 'Sales', completed: 0, total: 1 },
                { dept: 'Operations', completed: 0, total: 1 },
              ].map(d => (
                <div key={d.dept} className="flex items-center gap-4">
                  <span className="text-sm text-slate-700 w-24 flex-shrink-0">{d.dept}</span>
                  <div className="flex-1">
                    <ProgressBar value={d.completed} max={d.total} color={d.completed === d.total ? 'green' : d.completed > 0 ? 'blue' : 'blue'} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 w-12 text-right">{d.completed}/{d.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Start Review Modal */}
      <Modal open={showReviewModal} onClose={() => setShowReviewModal(false)} title="Start Performance Review"
        footer={<><Button variant="outline" onClick={() => setShowReviewModal(false)}>Cancel</Button><Button onClick={() => setShowReviewModal(false)}>Create Review</Button></>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Employee</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {employees.map(e => <option key={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Review Period</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {['Q1 2025', 'Q2 2025', 'Annual 2024', 'Annual 2025'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reviewer</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {employees.map(e => <option key={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
            <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700" />
          </div>
        </div>
      </Modal>

      {/* Add Goal Modal */}
      <Modal open={showGoalModal} onClose={() => setShowGoalModal(false)} title="Add Goal"
        footer={<><Button variant="outline" onClick={() => setShowGoalModal(false)}>Cancel</Button><Button onClick={() => setShowGoalModal(false)}>Save Goal</Button></>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Employee</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {employees.map(e => <option key={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Goal Title</label>
            <input placeholder="e.g. Complete AWS certification" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea rows={2} placeholder="Describe the goal and success criteria…" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
            <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700" />
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
