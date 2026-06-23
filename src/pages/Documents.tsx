import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { documents, employees } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import type { DocCategory } from '@/types';
import { FileText, Upload, Download, Search, Globe, User, Filter, FileCheck, Lock } from 'lucide-react';

const CATEGORIES: (DocCategory | 'All')[] = ['All', 'Contract', 'Certification', 'Policy', 'Tax', 'Performance', 'ID', 'Other'];

const catColors: Record<DocCategory, string> = {
  Contract: 'bg-blue-100 text-blue-700',
  Certification: 'bg-purple-100 text-purple-700',
  Policy: 'bg-emerald-100 text-emerald-700',
  Tax: 'bg-amber-100 text-amber-700',
  Performance: 'bg-indigo-100 text-indigo-700',
  ID: 'bg-rose-100 text-rose-700',
  Other: 'bg-slate-100 text-slate-600',
};

const fileTypeIcon = (type: string) => {
  if (type === 'PDF') return '📄';
  if (type === 'DOCX') return '📝';
  if (type === 'XLSX') return '📊';
  return '📁';
};

export function Documents() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DocCategory | 'All'>('All');
  const [tab, setTab] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredDocs = documents.filter(d => {
    const q = search.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(q) || d.uploadedBy.toLowerCase().includes(q);
    const matchCat = category === 'All' || d.category === category;
    const matchTab = tab === 'all' || (tab === 'company' && d.isCompanyWide) || (tab === 'employee' && !d.isCompanyWide);
    return matchSearch && matchCat && matchTab;
  });

  const companyDocs = documents.filter(d => d.isCompanyWide);
  const employeeDocs = documents.filter(d => !d.isCompanyWide);

  return (
    <PageLayout
      title="Documents"
      subtitle="Manage employee files and company policies"
      actions={
        <Button size="sm" icon={<Upload className="w-3.5 h-3.5" />} onClick={() => setShowUploadModal(true)}>Upload Document</Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Documents', value: documents.length, icon: FileText, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Company-Wide', value: companyDocs.length, icon: Globe, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Employee Files', value: employeeDocs.length, icon: User, bg: 'bg-purple-50', color: 'text-purple-600' },
          { label: 'Policies', value: documents.filter(d => d.category === 'Policy').length, icon: FileCheck, bg: 'bg-amber-50', color: 'text-amber-600' },
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
          { id: 'all', label: 'All Documents', count: documents.length },
          { id: 'company', label: 'Company-Wide', count: companyDocs.length },
          { id: 'employee', label: 'Employee Files', count: employeeDocs.length },
        ]}
        active={tab}
        onChange={setTab}
        className="mb-5"
      />

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4 flex items-center gap-3 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="Search documents…" className="w-64" />
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
        <span className="ml-auto text-sm text-slate-400">{filteredDocs.length} files</span>
      </div>

      {/* Document grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredDocs.map(doc => {
          const emp = doc.employeeId ? employees.find(e => e.id === doc.employeeId) : null;
          return (
            <div key={doc.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-4 group">
              <div className="flex items-start gap-3">
                <div className="text-3xl flex-shrink-0">{fileTypeIcon(doc.fileType)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 leading-snug truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColors[doc.category]}`}>{doc.category}</span>
                    {doc.isCompanyWide ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600"><Globe className="w-3 h-3" />Company</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-slate-500"><Lock className="w-3 h-3" />Private</span>
                    )}
                  </div>
                </div>
              </div>

              {emp && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <Avatar id={emp.id} firstName={emp.firstName} lastName={emp.lastName} size="xs" />
                  <p className="text-xs text-slate-600">{emp.firstName} {emp.lastName}</p>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  <p>{doc.fileSize} · {doc.fileType}</p>
                  <p className="mt-0.5">Uploaded {formatDate(doc.uploadedOn)}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-blue-50 text-blue-600 rounded-lg">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDocs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
          <FileText className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-sm font-medium">No documents found</p>
        </div>
      )}

      {/* Upload Modal */}
      <Modal open={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Document"
        footer={<><Button variant="outline" onClick={() => setShowUploadModal(false)}>Cancel</Button><Button onClick={() => setShowUploadModal(false)}>Upload</Button></>}>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">Click to upload or drag & drop</p>
            <p className="text-xs text-slate-400 mt-1">PDF, DOCX, XLSX up to 10MB</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Document Name</label>
            <input placeholder="e.g. Employment Contract 2025" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Employee (leave blank for company-wide)</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              <option value="">Company-Wide Document</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
