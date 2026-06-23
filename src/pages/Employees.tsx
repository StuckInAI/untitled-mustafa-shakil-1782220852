import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Avatar } from '@/components/ui/Avatar';
import { statusBadge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Drawer } from '@/components/ui/Drawer';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { employees as initialEmployees, leaveRequests, performanceReviews, enrollments, courses, getEmployeeName } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { toast } from '@/hooks/useToast';
import type { Employee, Department, EmploymentType, EmploymentStatus } from '@/types';
import {
  Plus, Download, Mail, Phone, MapPin,
  Building2, Calendar, DollarSign,
  TrendingUp, GraduationCap, ChevronRight,
  Clock, Edit3, Save, X, UserX
} from 'lucide-react';

const DEPTS: (Department | 'All')[] = ['All', 'Engineering', 'Product', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Legal'];

function exportCSV(data: Employee[]) {
  const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Department', 'Title', 'Status', 'Type', 'Start Date', 'Location', 'Salary'];
  const rows = data.map(e => [e.firstName, e.lastName, e.email, e.phone, e.department, e.jobTitle, e.status, e.employmentType, e.startDate, e.location, e.salary]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'employees.csv'; a.click();
  URL.revokeObjectURL(url);
}

const emptyForm = {
  firstName: '', lastName: '', email: '', phone: '', jobTitle: '',
  location: '', department: 'Engineering' as Department,
  employmentType: 'Full-time' as EmploymentType, startDate: '', salary: '',
  managerId: '',
};

export function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState<Department | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState<Employee | null>(null);
  const [drawerTab, setDrawerTab] = useState('profile');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTermModal, setShowTermModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Employee | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filtered = employees.filter(e => {
    const q = search.toLowerCase();
    const nameMatch = `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.jobTitle.toLowerCase().includes(q);
    const deptMatch = dept === 'All' || e.department === dept;
    const statusMatch = statusFilter === 'All' || e.status === statusFilter;
    return nameMatch && deptMatch && statusMatch;
  });

  const drawerTabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'leave', label: 'Leave', count: leaveRequests.filter(l => l.employeeId === selected?.id).length },
    { id: 'performance', label: 'Performance' },
    { id: 'training', label: 'Training' },
  ];

  const empLeave = selected ? leaveRequests.filter(l => l.employeeId === selected.id) : [];
  const empReviews = selected ? performanceReviews.filter(r => r.employeeId === selected.id) : [];
  const empEnrollments = selected ? enrollments.filter(en => en.employeeId === selected.id) : [];

  function openEdit() {
    if (!selected) return;
    setEditForm({ ...selected });
    setEditMode(true);
  }

  function saveEdit() {
    if (!editForm) return;
    setEmployees(prev => prev.map(e => e.id === editForm.id ? editForm : e));
    setSelected(editForm);
    setEditMode(false);
    toast('Employee profile updated successfully.');
  }

  function validateForm() {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.lastName.trim()) errs.lastName = 'Required';
    if (!form.email.trim()) errs.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.jobTitle.trim()) errs.jobTitle = 'Required';
    if (!form.startDate) errs.startDate = 'Required';
    return errs;
  }

  function handleAddEmployee() {
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    const newEmp: Employee = {
      id: `e${Date.now()}`,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || '—',
      jobTitle: form.jobTitle.trim(),
      department: form.department,
      employmentType: form.employmentType,
      status: 'Active',
      startDate: form.startDate,
      location: form.location.trim() || 'Not specified',
      salary: parseFloat(form.salary) || 0,
      leaveBalance: { annual: 15, sick: 10, personal: 3 },
      managerId: form.managerId || undefined,
    };
    setEmployees(prev => [...prev, newEmp]);
    setForm(emptyForm);
    setFormErrors({});
    setShowAddModal(false);
    toast(`${newEmp.firstName} ${newEmp.lastName} added successfully!`);
  }

  function handleTerminate() {
    if (!selected) return;
    setEmployees(prev => prev.map(e => e.id === selected.id ? { ...e, status: 'Terminated' as EmploymentStatus } : e));
    setSelected(prev => prev ? { ...prev, status: 'Terminated' as EmploymentStatus } : null);
    setShowTermModal(false);
    toast(`${selected.firstName} ${selected.lastName} has been terminated.`, 'warning');
  }

  const fieldClass = (key: string) =>
    `w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300 ${formErrors[key] ? 'border-red-400' : 'border-slate-200'}`;

  return (
    <PageLayout
      title="Employees"
      subtitle={`${employees.length} total employees`}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={() => { exportCSV(filtered); toast(`Exported ${filtered.length} employees to CSV.`); }}>Export</Button>
          <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => { setForm(emptyForm); setFormErrors({}); setShowAddModal(true); }}>Add Employee</Button>
        </div>
      }
    >
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-4 p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, title…" className="w-72" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            {['All', 'Active', 'On Leave', 'Probation', 'Terminated'].map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="flex items-center gap-1 flex-wrap">
            {DEPTS.map(d => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${dept === d ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="ml-auto text-sm text-slate-400 font-medium">{filtered.length} results</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Employee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Department</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Start Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(emp => (
              <tr key={emp.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { setSelected(emp); setDrawerTab('profile'); setEditMode(false); }}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="sm" />
                    <div>
                      <p className="font-semibold text-slate-900">{emp.firstName} {emp.lastName}</p>
                      <p className="text-xs text-slate-400">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-slate-600">{emp.department}</td>
                <td className="px-4 py-3.5 text-slate-600">{emp.jobTitle}</td>
                <td className="px-4 py-3.5">{statusBadge(emp.status)}</td>
                <td className="px-4 py-3.5">{statusBadge(emp.employmentType)}</td>
                <td className="px-4 py-3.5 text-slate-500">{formatDate(emp.startDate)}</td>
                <td className="px-4 py-3.5 text-slate-500 text-xs">{emp.location}</td>
                <td className="px-4 py-3.5">
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400 text-sm">No employees match your search.</div>
        )}
      </div>

      {/* Employee Drawer */}
      <Drawer open={!!selected} onClose={() => { setSelected(null); setEditMode(false); }} title={selected ? `${selected.firstName} ${selected.lastName}` : ''} width="w-[560px]">
        {selected && (
          <div>
            {/* Header Card */}
            <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start gap-4">
                <Avatar id={selected.id} firstName={selected.firstName} lastName={selected.lastName} size="xl" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{selected.firstName} {selected.lastName}</h3>
                  <p className="text-sm text-slate-600 mt-0.5">{selected.jobTitle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {statusBadge(selected.status)}
                    {statusBadge(selected.employmentType)}
                  </div>
                </div>
                <div className="flex gap-1">
                  {editMode ? (
                    <>
                      <button onClick={saveEdit} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        <Save className="w-3.5 h-3.5" /> Save
                      </button>
                      <button onClick={() => setEditMode(false)} className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-500 transition-all">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={openEdit} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-all shadow-sm">
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      {selected.status !== 'Terminated' && (
                        <button onClick={() => setShowTermModal(true)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-all" title="Terminate">
                          <UserX className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {editMode && editForm ? (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { key: 'jobTitle', label: 'Job Title', type: 'text' },
                    { key: 'location', label: 'Location', type: 'text' },
                    { key: 'email', label: 'Email', type: 'email' },
                    { key: 'phone', label: 'Phone', type: 'text' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                      <input
                        type={f.type}
                        value={(editForm as any)[f.key]}
                        onChange={e => setEditForm(prev => prev ? { ...prev, [f.key]: e.target.value } : prev)}
                        className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Department</label>
                    <select
                      value={editForm.department}
                      onChange={e => setEditForm(prev => prev ? { ...prev, department: e.target.value as Department } : prev)}
                      className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      {DEPTS.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Annual Salary ($)</label>
                    <input
                      type="number"
                      value={editForm.salary}
                      onChange={e => setEditForm(prev => prev ? { ...prev, salary: parseFloat(e.target.value) } : prev)}
                      className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />{selected.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />{selected.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />{selected.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />{selected.department}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />Started {formatDate(selected.startDate)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />{formatCurrency(selected.salary)} / year
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="px-6 pt-4">
              <Tabs tabs={drawerTabs} active={drawerTab} onChange={setDrawerTab} />
            </div>

            {/* Tab Content */}
            <div className="px-6 py-4">
              {drawerTab === 'profile' && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Leave Balances</p>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(selected.leaveBalance).map(([type, days]) => (
                        <div key={type} className="bg-slate-50 rounded-xl p-3 text-center">
                          <p className="text-2xl font-bold text-slate-900">{days}</p>
                          <p className="text-xs text-slate-500 capitalize mt-0.5">{type} days</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selected.managerId && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Reports To</p>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <Avatar id={selected.managerId} firstName={getEmployeeName(selected.managerId).split(' ')[0]} lastName={getEmployeeName(selected.managerId).split(' ')[1] ?? ''} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{getEmployeeName(selected.managerId)}</p>
                          <p className="text-xs text-slate-500">{initialEmployees.find(e => e.id === selected.managerId)?.jobTitle}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {(() => {
                    const reports = employees.filter(e => e.managerId === selected.id);
                    return reports.length > 0 ? (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Direct Reports ({reports.length})</p>
                        <div className="space-y-2">
                          {reports.map(r => (
                            <div key={r.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => setSelected(r)}>
                              <Avatar id={r.id} firstName={r.firstName} lastName={r.lastName} size="sm" />
                              <div>
                                <p className="text-sm font-semibold text-slate-900">{r.firstName} {r.lastName}</p>
                                <p className="text-xs text-slate-500">{r.jobTitle}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              {drawerTab === 'leave' && (
                <div className="space-y-3">
                  {empLeave.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">No leave requests found.</p>
                  ) : empLeave.map(l => (
                    <div key={l.id} className="flex items-start justify-between p-3 border border-slate-100 rounded-xl">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{l.type} Leave</p>
                        <p className="text-xs text-slate-500 mt-0.5">{formatDate(l.startDate)} – {formatDate(l.endDate)} · {l.days} day{l.days > 1 ? 's' : ''}</p>
                        <p className="text-xs text-slate-400 mt-1">"{l.reason}"</p>
                      </div>
                      {statusBadge(l.status)}
                    </div>
                  ))}
                </div>
              )}

              {drawerTab === 'performance' && (
                <div className="space-y-3">
                  {empReviews.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">No performance reviews yet.</p>
                  ) : empReviews.map(r => (
                    <div key={r.id} className="p-3 border border-slate-100 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{r.period}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Due {formatDate(r.dueDate)}</p>
                        </div>
                        {statusBadge(r.status)}
                      </div>
                      {r.rating && (
                        <div className="flex items-center gap-1 mt-2">
                          {[1,2,3,4,5].map(n => (
                            <span key={n} className={`text-base ${n <= r.rating! ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
                          ))}
                          <span className="text-xs text-slate-500 ml-1">{r.rating}/5</span>
                        </div>
                      )}
                      {r.comments && <p className="text-xs text-slate-500 mt-2 italic">"{r.comments}"</p>}
                    </div>
                  ))}
                </div>
              )}

              {drawerTab === 'training' && (
                <div className="space-y-3">
                  {empEnrollments.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">Not enrolled in any courses.</p>
                  ) : empEnrollments.map(en => {
                    const course = courses.find(c => c.id === en.courseId);
                    if (!course) return null;
                    return (
                      <div key={en.id} className="p-3 border border-slate-100 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{course.category} · {course.duration}</p>
                          </div>
                          {statusBadge(en.status)}
                        </div>
                        <ProgressBar value={en.progress} color={en.status === 'Completed' ? 'green' : 'blue'} size="sm" showLabel />
                        {en.score && <p className="text-xs text-slate-500 mt-1">Score: {en.score}%</p>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Employee Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Employee"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAddEmployee}>Save Employee</Button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'firstName', label: 'First Name', placeholder: 'Sarah', type: 'text' },
            { key: 'lastName', label: 'Last Name', placeholder: 'Mitchell', type: 'text' },
            { key: 'email', label: 'Email', placeholder: 'sarah@company.com', type: 'email' },
            { key: 'phone', label: 'Phone', placeholder: '(555) 000-0000', type: 'text' },
            { key: 'jobTitle', label: 'Job Title', placeholder: 'Software Engineer', type: 'text' },
            { key: 'location', label: 'Location', placeholder: 'New York, NY', type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={(form as any)[f.key]}
                onChange={e => { setForm(prev => ({ ...prev, [f.key]: e.target.value })); setFormErrors(p => ({ ...p, [f.key]: '' })); }}
                className={fieldClass(f.key)}
              />
              {formErrors[f.key] && <p className="text-xs text-red-500 mt-0.5">{formErrors[f.key]}</p>}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value as Department }))} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {DEPTS.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
            <select value={form.employmentType} onChange={e => setForm(p => ({ ...p, employmentType: e.target.value as EmploymentType }))} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {['Full-time', 'Part-time', 'Contract', 'Intern'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date <span className="text-red-500">*</span></label>
            <input type="date" value={form.startDate} onChange={e => { setForm(p => ({ ...p, startDate: e.target.value })); setFormErrors(p => ({ ...p, startDate: '' })); }} className={fieldClass('startDate')} />
            {formErrors.startDate && <p className="text-xs text-red-500 mt-0.5">{formErrors.startDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Annual Salary ($)</label>
            <input type="number" placeholder="85000" value={form.salary} onChange={e => setForm(p => ({ ...p, salary: e.target.value }))} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Manager</label>
            <select value={form.managerId} onChange={e => setForm(p => ({ ...p, managerId: e.target.value }))} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              <option value="">No Manager</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
          </div>
        </div>
      </Modal>

      {/* Terminate Confirmation Modal */}
      <Modal
        open={showTermModal}
        onClose={() => setShowTermModal(false)}
        title="Confirm Termination"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowTermModal(false)}>Cancel</Button>
            <Button onClick={handleTerminate} className="bg-red-600 hover:bg-red-700 text-white border-red-600">Terminate Employee</Button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-red-800">⚠️ This action cannot be undone</p>
            <p className="text-sm text-red-700 mt-1">You are about to terminate <strong>{selected?.firstName} {selected?.lastName}</strong>. Their status will be updated to Terminated.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Termination Reason</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {['Resignation', 'Performance', 'Layoff', 'Contract End', 'Other'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Last Working Day</label>
            <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700" />
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
