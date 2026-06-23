import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { statusBadge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import { benefitPlans, benefitEnrollments, employees } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { BenefitType } from '@/types';
import { Shield, Heart, Eye, Smile, DollarSign, Plus, Users, CheckCircle2, Clock } from 'lucide-react';

const typeIcons: Record<BenefitType, React.ReactNode> = {
  Health: <Heart className="w-5 h-5" />,
  Dental: <Smile className="w-5 h-5" />,
  Vision: <Eye className="w-5 h-5" />,
  'Life Insurance': <Shield className="w-5 h-5" />,
  '401k': <DollarSign className="w-5 h-5" />,
  FSA: <DollarSign className="w-5 h-5" />,
  HSA: <DollarSign className="w-5 h-5" />,
};

const typeColors: Record<BenefitType, string> = {
  Health: 'bg-red-50 text-red-600',
  Dental: 'bg-blue-50 text-blue-600',
  Vision: 'bg-purple-50 text-purple-600',
  'Life Insurance': 'bg-slate-50 text-slate-600',
  '401k': 'bg-emerald-50 text-emerald-600',
  FSA: 'bg-amber-50 text-amber-600',
  HSA: 'bg-teal-50 text-teal-600',
};

export function Benefits() {
  const [tab, setTab] = useState('plans');
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const activeEnrollments = benefitEnrollments.filter(e => e.status === 'Active').length;
  const pendingEnrollments = benefitEnrollments.filter(e => e.status === 'Pending').length;
  const totalMonthlyCost = benefitEnrollments
    .filter(e => e.status === 'Active')
    .reduce((sum, en) => {
      const plan = benefitPlans.find(p => p.id === en.planId);
      return sum + (plan ? plan.employeeCost + plan.employerCost : 0);
    }, 0);

  return (
    <PageLayout
      title="Benefits"
      subtitle="Manage employee benefits plans and enrollments"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Open Enrollment</Button>
          <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowEnrollModal(true)}>Enroll Employee</Button>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Benefit Plans', value: benefitPlans.length, icon: Shield, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Active Enrollments', value: activeEnrollments, icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Pending Enrollments', value: pendingEnrollments, icon: Clock, bg: 'bg-amber-50', color: 'text-amber-600' },
          { label: 'Monthly Cost', value: formatCurrency(totalMonthlyCost), icon: DollarSign, bg: 'bg-purple-50', color: 'text-purple-600' },
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
          { id: 'plans', label: 'Plan Catalogue' },
          { id: 'enrollments', label: 'Enrollments', count: benefitEnrollments.length },
          { id: 'summary', label: 'Employee Summary' },
        ]}
        active={tab}
        onChange={setTab}
        className="mb-5"
      />

      {tab === 'plans' && (
        <div className="grid grid-cols-3 gap-4">
          {benefitPlans.map(plan => (
            <div key={plan.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[plan.type]}`}>
                  {typeIcons[plan.type]}
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{plan.type}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5 mb-3">{plan.provider}</p>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{plan.description}</p>
              <div className="border-t border-slate-100 pt-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Employee cost</span>
                  <span className="font-semibold text-slate-900">{plan.employeeCost > 0 ? `${formatCurrency(plan.employeeCost)}/mo` : 'Free'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Employer covers</span>
                  <span className="font-semibold text-emerald-600">{plan.employerCost > 0 ? `${formatCurrency(plan.employerCost)}/mo` : 'Variable'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Enrolled</span>
                  <span className="font-semibold text-slate-900">{benefitEnrollments.filter(e => e.planId === plan.id && e.status === 'Active').length} employees</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'enrollments' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Employee', 'Plan', 'Type', 'Provider', 'Eff. Date', 'Employee Cost', 'Employer Cost', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {benefitEnrollments.map(en => {
                const emp = employees.find(e => e.id === en.employeeId);
                const plan = benefitPlans.find(p => p.id === en.planId);
                if (!emp || !plan) return null;
                return (
                  <tr key={en.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="sm" />
                        <p className="font-medium text-slate-900">{emp.firstName} {emp.lastName}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-900">{plan.name}</td>
                    <td className="px-5 py-3.5">
                      <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[plan.type]}`}>
                        {typeIcons[plan.type]}
                        {plan.type}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{plan.provider}</td>
                    <td className="px-5 py-3.5 text-slate-500">{formatDate(en.effectiveDate)}</td>
                    <td className="px-5 py-3.5 text-slate-700 font-medium">{plan.employeeCost > 0 ? `${formatCurrency(plan.employeeCost)}/mo` : 'Free'}</td>
                    <td className="px-5 py-3.5 text-emerald-600 font-medium">{plan.employerCost > 0 ? `${formatCurrency(plan.employerCost)}/mo` : '—'}</td>
                    <td className="px-5 py-3.5">{statusBadge(en.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'summary' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Benefits per Employee</p>
          </div>
          <div className="divide-y divide-slate-50">
            {employees.map(emp => {
              const empEnrollments = benefitEnrollments.filter(e => e.employeeId === emp.id && e.status === 'Active');
              const monthlyCost = empEnrollments.reduce((sum, en) => {
                const plan = benefitPlans.find(p => p.id === en.planId);
                return sum + (plan ? plan.employeeCost : 0);
              }, 0);
              return (
                <div key={emp.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="sm" />
                  <div className="w-52">
                    <p className="text-sm font-semibold text-slate-900">{emp.firstName} {emp.lastName}</p>
                    <p className="text-xs text-slate-400">{emp.department}</p>
                  </div>
                  <div className="flex-1 flex gap-2 flex-wrap">
                    {empEnrollments.length === 0 ? (
                      <span className="text-xs text-slate-400 italic">No active benefits</span>
                    ) : empEnrollments.map(en => {
                      const plan = benefitPlans.find(p => p.id === en.planId);
                      if (!plan) return null;
                      return (
                        <span key={en.id} className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[plan.type]}`}>
                          {plan.type}
                        </span>
                      );
                    })}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">{monthlyCost > 0 ? `${formatCurrency(monthlyCost)}/mo` : '—'}</p>
                    <p className="text-xs text-slate-400">employee cost</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Enroll Modal */}
      <Modal open={showEnrollModal} onClose={() => setShowEnrollModal(false)} title="Enroll Employee in Benefit Plan"
        footer={<><Button variant="outline" onClick={() => setShowEnrollModal(false)}>Cancel</Button><Button onClick={() => setShowEnrollModal(false)}>Save Enrollment</Button></>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Employee</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {employees.map(e => <option key={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Benefit Plan</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {benefitPlans.map(p => <option key={p.id}>{p.name} ({p.type})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Effective Date</label>
            <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700" />
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
