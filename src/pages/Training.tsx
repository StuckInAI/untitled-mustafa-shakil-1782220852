import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { statusBadge, Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { Tabs } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import { courses, enrollments, employees } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import type { CourseCategory } from '@/types';
import {
  Plus, GraduationCap, BookOpen, Clock, Users,
  CheckCircle2, Award, AlertTriangle, Filter
} from 'lucide-react';

const CATEGORIES: (CourseCategory | 'All')[] = ['All', 'Compliance', 'Technical', 'Leadership', 'Soft Skills', 'Onboarding'];

const categoryColors: Record<CourseCategory, string> = {
  Compliance: 'bg-red-100 text-red-700',
  Technical: 'bg-blue-100 text-blue-700',
  Leadership: 'bg-purple-100 text-purple-700',
  'Soft Skills': 'bg-teal-100 text-teal-700',
  Onboarding: 'bg-emerald-100 text-emerald-700',
};

export function Training() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CourseCategory | 'All'>('All');
  const [tab, setTab] = useState('catalogue');
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const filteredCourses = courses.filter(c => {
    const q = search.toLowerCase();
    return (
      (c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)) &&
      (category === 'All' || c.category === category)
    );
  });

  // Compliance report
  const mandatoryCourses = courses.filter(c => c.mandatory);
  const complianceData = employees.map(emp => {
    const required = mandatoryCourses.length;
    const completed = mandatoryCourses.filter(mc =>
      enrollments.some(en => en.employeeId === emp.id && en.courseId === mc.id && en.status === 'Completed')
    ).length;
    return { emp, required, completed, rate: required > 0 ? Math.round((completed / required) * 100) : 0 };
  });

  const totalEnrollments = enrollments.length;
  const completedEnrollments = enrollments.filter(e => e.status === 'Completed').length;
  const inProgressEnrollments = enrollments.filter(e => e.status === 'In Progress').length;
  const overallCompliance = Math.round((completedEnrollments / totalEnrollments) * 100);

  return (
    <PageLayout
      title="Training & Development"
      subtitle="Manage courses, enrollments, and compliance"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Users className="w-3.5 h-3.5" />} onClick={() => setShowEnrollModal(true)}>Enroll Employee</Button>
          <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Add Course</Button>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Courses', value: courses.length, icon: BookOpen, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Active Enrollments', value: totalEnrollments, icon: Users, bg: 'bg-purple-50', color: 'text-purple-600' },
          { label: 'Completions', value: completedEnrollments, icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Compliance Rate', value: `${overallCompliance}%`, icon: Award, bg: 'bg-amber-50', color: 'text-amber-600' },
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
          { id: 'catalogue', label: 'Course Catalogue', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'enrollments', label: 'Enrollments', icon: <Users className="w-4 h-4" />, count: totalEnrollments },
          { id: 'compliance', label: 'Compliance Report', icon: <Award className="w-4 h-4" /> },
        ]}
        active={tab}
        onChange={setTab}
        className="mb-5"
      />

      {tab === 'catalogue' && (
        <div>
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4 flex items-center gap-3 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search courses…" className="w-64" />
            <div className="flex gap-1 flex-wrap">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${category === c ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredCourses.map(course => {
              const courseEnrollments = enrollments.filter(e => e.courseId === course.id);
              const completedCount = courseEnrollments.filter(e => e.status === 'Completed').length;
              return (
                <div key={course.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-24 flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-white/80" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug flex-1 pr-2">{course.title}</h3>
                      {course.mandatory && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Required</span>
                      )}
                    </div>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${categoryColors[course.category]}`}>{course.category}</span>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                      <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</div>
                      <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{courseEnrollments.length} enrolled</div>
                      <div className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{completedCount} done</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'enrollments' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Employee', 'Course', 'Category', 'Progress', 'Status', 'Score', 'Enrolled On'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {enrollments.map(en => {
                const emp = employees.find(e => e.id === en.employeeId);
                const course = courses.find(c => c.id === en.courseId);
                if (!emp || !course) return null;
                return (
                  <tr key={en.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="sm" />
                        <p className="font-medium text-slate-900">{emp.firstName} {emp.lastName}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-900 text-sm">{course.title}</p>
                      <p className="text-xs text-slate-400">{course.instructor}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${categoryColors[course.category]}`}>{course.category}</span>
                    </td>
                    <td className="px-5 py-3.5 w-36">
                      <ProgressBar value={en.progress} size="sm" color={en.status === 'Completed' ? 'green' : 'blue'} showLabel />
                    </td>
                    <td className="px-5 py-3.5">{statusBadge(en.status)}</td>
                    <td className="px-5 py-3.5 text-slate-600">{en.score ? `${en.score}%` : '—'}</td>
                    <td className="px-5 py-3.5 text-slate-500">{formatDate(en.enrolledOn)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'compliance' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Compliance Alert</p>
              <p className="text-xs text-amber-700 mt-0.5">
                {complianceData.filter(d => d.rate < 100).length} employees have outstanding mandatory training requirements.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Mandatory Training Compliance</p>
              <p className="text-xs font-semibold text-slate-500">{mandatoryCourses.length} mandatory course{mandatoryCourses.length > 1 ? 's' : ''}</p>
            </div>
            <div className="divide-y divide-slate-50">
              {complianceData.map(({ emp, completed, required, rate }) => (
                <div key={emp.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="sm" />
                  <div className="w-48">
                    <p className="text-sm font-semibold text-slate-900">{emp.firstName} {emp.lastName}</p>
                    <p className="text-xs text-slate-400">{emp.department}</p>
                  </div>
                  <div className="flex-1">
                    <ProgressBar
                      value={completed}
                      max={required}
                      color={rate === 100 ? 'green' : rate >= 50 ? 'yellow' : 'red'}
                      showLabel
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-20 text-right">{completed}/{required} completed</span>
                  <div className="w-20 flex justify-end">
                    {rate === 100
                      ? <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium"><CheckCircle2 className="w-3.5 h-3.5" />Compliant</span>
                      : <span className="flex items-center gap-1 text-xs text-red-500 font-medium"><AlertTriangle className="w-3.5 h-3.5" />Pending</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enroll Modal */}
      <Modal open={showEnrollModal} onClose={() => setShowEnrollModal(false)} title="Enroll Employee in Course"
        footer={<><Button variant="outline" onClick={() => setShowEnrollModal(false)}>Cancel</Button><Button onClick={() => setShowEnrollModal(false)}>Enroll</Button></>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Employee</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {employees.map(e => <option key={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {courses.map(c => <option key={c.id}>{c.title}</option>)}
            </select>
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
