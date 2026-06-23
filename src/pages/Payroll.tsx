import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { statusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { payrollRuns, payslips, employees } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import React from 'react';
import { DollarSign, Play, Download, Clock, CheckCircle2, AlertCircle, Link2, TrendingUp, Users, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ytdData = [
  { month: 'Aug', gross: 934000, net: 689000 },
  { month: 'Sep', gross: 934000, net: 689000 },
  { month: 'Oct', gross: 1010000, net: 745000 },
  { month: 'Nov', gross: 934000, net: 689000 },
  { month: 'Dec', gross: 1082000, net: 798000 },
  { month: 'Jan', gross: 1082000, net: 798000 },
];

export function Payroll() {
  const [tab, setTab] = useState('runs');
  const [selectedRun, setSelectedRun] = useState<string | null>(null);
  const [showRunModal, setShowRunModal] = useState(false);

  const completedRuns = payrollRuns.filter(r => r.status === 'Completed');
  const ytdGross = completedRuns.reduce((s, r) => s + r.totalGross, 0);
  const ytdNet = completedRuns.reduce((s, r) => s + r.totalNet, 0);
  const draftRun = payrollRuns.find(r => r.status === 'Draft');

  const runSlips = selectedRun ? payslips.filter(p => p.payrollRunId === selectedRun) : [];

  return (
    <PageLayout
      title="Payroll"
      subtitle="Process payroll and manage compensation"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Link2 className="w-3.5 h-3.5" />}>Sync with Paycor</Button>
          {draftRun && (
            <Button size="sm" icon={<Play className="w-3.5 h-3.5" />} onClick={() => setShowRunModal(true)}>
              Run {draftRun.period}
            </Button>
          )}
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'YTD Gross Payroll', value: formatCurrency(ytdGross), icon: DollarSign, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'YTD Net Payroll', value: formatCurrency(ytdNet), icon: TrendingUp, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Employees Paid', value: 12, icon: Users, bg: 'bg-purple-50', color: 'text-purple-600' },
          { label: 'Payroll Runs', value: completedRuns.length, icon: CheckCircle2, bg: 'bg-amber-50', color: 'text-amber-600' },
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

      {/* Integration Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 mb-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Link2 className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold">Paycor Integration Active</p>
          <p className="text-slate-400 text-sm mt-0.5">Last synced: Today at 9:41 AM · 12 employees · All records up to date</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0">View Logs</Button>
          <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0">Configure</Button>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 'runs', label: 'Payroll Runs' },
          { id: 'payslips', label: 'Payslips', count: payslips.length },
          { id: 'analytics', label: 'Analytics' },
        ]}
        active={tab}
        onChange={setTab}
        className="mb-5"
      />

      {tab === 'runs' && (
        <div className="space-y-3">
          {payrollRuns.map(run => (
            <div key={run.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => { setSelectedRun(run.id); setTab('payslips'); }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${run.status === 'Completed' ? 'bg-emerald-50' : run.status === 'Draft' ? 'bg-amber-50' : 'bg-blue-50'}`}>
                {run.status === 'Completed'
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  : run.status === 'Draft'
                  ? <Clock className="w-5 h-5 text-amber-600" />
                  : <AlertCircle className="w-5 h-5 text-blue-600" />
                }
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="text-base font-bold text-slate-900">{run.period}</p>
                  {statusBadge(run.status)}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">
                  {run.employeeCount} employees
                  {run.processedOn ? ` · Processed ${formatDate(run.processedOn)}` : ' · Not yet processed'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900">{formatCurrency(run.totalNet)}</p>
                <p className="text-xs text-slate-400">Net · {formatCurrency(run.totalGross)} gross</p>
              </div>
              {run.status === 'Completed' && (
                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors" onClick={e => e.stopPropagation()}>
                  <Download className="w-4 h-4" />
                </button>
              )}
              {run.status === 'Draft' && (
                <Button size="sm" icon={<Play className="w-3.5 h-3.5" />} onClick={() => setShowRunModal(true)}>
                  Process
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'payslips' && (
        <div className="space-y-4">
          {selectedRun && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center gap-2 text-sm text-blue-700">
              <FileText className="w-4 h-4" />
              Showing payslips for: <span className="font-semibold">{payrollRuns.find(r => r.id === selectedRun)?.period}</span>
              <button className="ml-auto text-xs underline" onClick={() => setSelectedRun(null)}>Show all</button>
            </div>
          )}
          {payslips
            .filter(p => !selectedRun || p.payrollRunId === selectedRun)
            .map(slip => {
              const emp = employees.find(e => e.id === slip.employeeId);
              if (!emp) return null;
              return (
                <div key={slip.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="md" />
                      <div>
                        <p className="text-base font-bold text-slate-900">{emp.firstName} {emp.lastName}</p>
                        <p className="text-sm text-slate-500">{emp.jobTitle} · {slip.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-900">{formatCurrency(slip.netPay)}</p>
                      <p className="text-xs text-slate-400">Net Pay</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Earnings</p>
                      <div className="space-y-1.5">
                        {slip.earnings.map(e => (
                          <div key={e.label} className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">{e.label}</span>
                            <span className="font-medium text-slate-900">{formatCurrency(e.amount)}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between text-sm pt-1 border-t border-slate-100 font-semibold">
                          <span>Gross Pay</span>
                          <span className="text-emerald-600">{formatCurrency(slip.grossPay)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Deductions</p>
                      <div className="space-y-1.5">
                        {slip.deductions.map(d => (
                          <div key={d.label} className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">{d.label}</span>
                            <span className="font-medium text-red-600">-{formatCurrency(d.amount)}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between text-sm pt-1 border-t border-slate-100 font-semibold">
                          <span>Total Deductions</span>
                          <span className="text-red-600">-{formatCurrency(slip.deductions.reduce((s, d) => s + d.amount, 0))}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {payslips.filter(p => !selectedRun || p.payrollRunId === selectedRun).length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">No payslips available for this period yet.</div>
          )}
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Gross vs Net Payroll (Last 6 months)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ytdData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Bar dataKey="gross" name="Gross" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="net" name="Net" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Salary by dept */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Annual Salary by Department</h3>
            <div className="space-y-3">
              {[
                { dept: 'Engineering', total: 493000 },
                { dept: 'Product', total: 255000 },
                { dept: 'Finance', total: 105000 },
                { dept: 'Legal', total: 155000 },
                { dept: 'Marketing', total: 88000 },
                { dept: 'HR', total: 95000 },
                { dept: 'Sales', total: 78000 },
                { dept: 'Operations', total: 52000 },
              ].map(d => (
                <div key={d.dept} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 w-28">{d.dept}</span>
                  <div className="flex-1 mx-3 bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(d.total / 493000) * 100}%` }} />
                  </div>
                  <span className="font-semibold text-slate-900 w-24 text-right">{formatCurrency(d.total)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tax summary */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">January 2025 Tax Summary</h3>
            <div className="space-y-3">
              {[
                { label: 'Federal Income Tax', amount: 3733, color: 'bg-red-500' },
                { label: 'State Income Tax', amount: 1166, color: 'bg-orange-500' },
                { label: 'Social Security (Employee)', amount: 1447, color: 'bg-blue-500' },
                { label: 'Medicare (Employee)', amount: 338, color: 'bg-purple-500' },
                { label: 'Social Security (Employer)', amount: 1447, color: 'bg-teal-500' },
                { label: 'Medicare (Employer)', amount: 338, color: 'bg-indigo-500' },
              ].map(t => (
                <div key={t.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${t.color}`} />
                    <span className="text-slate-600">{t.label}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{formatCurrency(t.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Process payroll modal */}
      <Modal open={showRunModal} onClose={() => setShowRunModal(false)} title={`Process ${draftRun?.period ?? ''} Payroll`}
        footer={<><Button variant="outline" onClick={() => setShowRunModal(false)}>Cancel</Button><Button onClick={() => setShowRunModal(false)}>Confirm & Process</Button></>}>
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <p className="font-semibold mb-1">⚠️ Review before processing</p>
            <p>This action will finalize payroll for {draftRun?.employeeCount} employees and submit to Paycor. This cannot be undone.</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Period</span>
              <span className="font-semibold">{draftRun?.period}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Employees</span>
              <span className="font-semibold">{draftRun?.employeeCount}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Total Gross</span>
              <span className="font-semibold">{formatCurrency(draftRun?.totalGross ?? 0)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Total Net</span>
              <span className="font-bold text-emerald-600">{formatCurrency(draftRun?.totalNet ?? 0)}</span>
            </div>
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
