import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { statusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { SearchInput } from '@/components/ui/SearchInput';
import { employees, leaveRequests as initialRequests, getEmployeeName } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import type { LeaveRequest, LeaveStatus } from '@/types';
import { Plus, CheckCircle2, XCircle, Clock, CalendarDays, Filter, Download } from 'lucide-react';

export function Leave() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = requests.filter(r => {
    const emp = employees.find(e => e.id === r.employeeId);
    const name = emp ? `${emp.firstName} ${emp.lastName}`.toLowerCase() : '';
    const matchSearch = name.includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchType = typeFilter === 'All' || r.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const pending = requests.filter(r => r.status === 'Pending');
  const approved = requests.filter(r => r.status === 'Approved');
  const rejected = requests.filter(r => r.status === 'Rejected');

  const updateStatus = (id: string, status: LeaveStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status, approvedBy: status === 'Approved' ? 'e4' : undefined } : r));
  };

  const leaveTypes = ['All', 'Annual', 'Sick', 'Personal', 'Maternity', 'Paternity', 'Unpaid'];
  const statuses = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'];

  // Summary by employee
  const empSummary = employees.map(emp => ({
    emp,
    used: requests.filter(r => r.employeeId === emp.id && r.status === 'Approved').reduce((s, r) => s + r.days, 0),
    pending: requests.filter(r => r.employeeId === emp.id && r.status === 'Pending').reduce((s, r) => s + r.days, 0),
  }));

  return (
    <PageLayout
      title="Leave Management"
      subtitle="Track and approve employee time-off requests"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>Export</Button>
          <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowModal(true)}>New Request</Button>
        </div>
      }
    >
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Pending Approval', value: pending.length, color: 'bg-amber-50', iconColor: 'text-amber-600', icon: Clock },
          { label: 'Approved This Month', value: approved.length, color: 'bg-emerald-50', iconColor: 'text-emerald-600', icon: CheckCircle2 },
          { label: 'Rejected', value: rejected.length, color: 'bg-red-50', iconColor: 'text-red-600', icon: XCircle },
          { label: 'Total Requests', value: requests.length, color: 'bg-blue-50', iconColor: 'text-blue-600', icon: CalendarDays },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Main table */}
        <div className="col-span-2 space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search employee or type…" className="w-56" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {leaveTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Requests */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{filtered.length} requests</p>
            </div>
            <div className="divide-y divide-slate-50">
              {filtered.map(req => {
                const emp = employees.find(e => e.id === req.employeeId);
                if (!emp) return null;
                return (
                  <div key={req.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                    <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">{emp.firstName} {emp.lastName}</p>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{req.type}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatDate(req.startDate)} – {formatDate(req.endDate)} · <span className="font-medium">{req.days} day{req.days > 1 ? 's' : ''}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 italic">"{req.reason}"</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {statusBadge(req.status)}
                      {req.status === 'Pending' && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateStatus(req.id, 'Approved')}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(req.id, 'Rejected')}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-12">No requests found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right panel: Leave balances */}
        <div className="space-y-4">
          {/* Leave Policy */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <p className="text-sm font-semibold text-slate-900 mb-3">Leave Policy</p>
            <div className="space-y-2.5">
              {[
                { type: 'Annual Leave', days: 20, color: 'bg-blue-500' },
                { type: 'Sick Leave', days: 10, color: 'bg-emerald-500' },
                { type: 'Personal', days: 3, color: 'bg-purple-500' },
                { type: 'Maternity', days: 90, color: 'bg-pink-500' },
                { type: 'Paternity', days: 14, color: 'bg-orange-500' },
              ].map(p => (
                <div key={p.type} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                    <span className="text-slate-600">{p.type}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{p.days} days</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team balances */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900">Leave Balances</p>
            </div>
            <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
              {empSummary.map(({ emp, used, pending: pend }) => (
                <div key={emp.id} className="px-4 py-3 flex items-center gap-3">
                  <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="xs" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">{emp.firstName} {emp.lastName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{emp.leaveBalance.annual} remaining</span>
                      {pend > 0 && <span className="text-xs text-amber-600 font-medium">+{pend} pending</span>}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{used}d used</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Submit Leave Request"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Submit Request</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Employee</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {['Annual', 'Sick', 'Personal', 'Maternity', 'Paternity', 'Unpaid'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
            <textarea rows={3} placeholder="Brief description of leave reason…" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300 resize-none" />
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
