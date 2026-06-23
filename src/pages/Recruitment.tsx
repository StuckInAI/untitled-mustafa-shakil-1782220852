import { useState, useMemo } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import {
  jobOpenings, applicants as allApplicants, getApplicantsForJob, getEmployee
} from '@/lib/mockData';
import type { JobOpening, Applicant, ApplicationStage, JobStatus } from '@/types';
import {
  Briefcase, Users, TrendingUp, Clock, Plus, Search, Filter,
  ChevronRight, Star, MapPin, DollarSign, Calendar, ExternalLink,
  BarChart2, Kanban, List, X, CheckCircle2, AlertCircle, Globe,
  ArrowLeft, Mail, Phone, Linkedin, Award, ChevronDown, Check,
  Zap, Target
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────────────
type View = 'jobs' | 'pipeline' | 'applicants' | 'reports' | 'job-boards';

const STAGES: ApplicationStage[] = [
  'Applied', 'Screening', 'Phone Interview', 'Technical Interview',
  'Final Interview', 'Offer', 'Hired', 'Rejected', 'Withdrawn',
];

const KANBAN_STAGES: ApplicationStage[] = [
  'Applied', 'Screening', 'Phone Interview', 'Technical Interview',
  'Final Interview', 'Offer', 'Hired',
];

const STAGE_COLORS: Record<ApplicationStage, string> = {
  'Applied': 'bg-slate-100 text-slate-700',
  'Screening': 'bg-blue-100 text-blue-700',
  'Phone Interview': 'bg-purple-100 text-purple-700',
  'Technical Interview': 'bg-amber-100 text-amber-700',
  'Final Interview': 'bg-orange-100 text-orange-700',
  'Offer': 'bg-green-100 text-green-700',
  'Hired': 'bg-emerald-100 text-emerald-700',
  'Rejected': 'bg-red-100 text-red-700',
  'Withdrawn': 'bg-slate-100 text-slate-500',
};

const STATUS_COLORS: Record<JobStatus, string> = {
  'Open': 'bg-emerald-100 text-emerald-700',
  'Draft': 'bg-slate-100 text-slate-600',
  'Paused': 'bg-amber-100 text-amber-700',
  'Closed': 'bg-red-100 text-red-700',
  'Filled': 'bg-blue-100 text-blue-700',
};

function ScoreBar({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-500">{label}</span>
        <span className="font-semibold text-slate-700">{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? 'bg-emerald-500' : score >= 70 ? 'bg-amber-500' : 'bg-red-500';
  const label = score >= 85 ? 'Strong' : score >= 70 ? 'Good' : 'Weak';
  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
        {score}
      </div>
      <span className="text-xs text-slate-500 mt-1">{label}</span>
    </div>
  );
}

function StarRating({ rating }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={cn('w-3.5 h-3.5', s <= (rating ?? 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-200')} />
      ))}
    </div>
  );
}

// ─── Applicant Drawer ────────────────────────────────────────────────────────
function ApplicantDrawer({ applicant, onClose }: { applicant: Applicant; onClose: () => void }) {
  const [stage, setStage] = useState<ApplicationStage>(applicant.stage);
  const [showStageMenu, setShowStageMenu] = useState(false);
  const { resumeScore } = applicant;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-[600px] bg-white h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-sm flex-shrink-0">
              {applicant.firstName[0]}{applicant.lastName[0]}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{applicant.firstName} {applicant.lastName}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', STAGE_COLORS[stage])}>{stage}</span>
                <StarRating rating={applicant.rating} />
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Contact & Meta */}
          <div className="px-6 py-4 grid grid-cols-2 gap-3 bg-white border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail className="w-4 h-4 text-slate-400" />
              <a href={`mailto:${applicant.email}`} className="hover:text-blue-600 truncate">{applicant.email}</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" />
              {applicant.phone}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400" />
              {applicant.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Globe className="w-4 h-4 text-slate-400" />
              via {applicant.source}
            </div>
            {applicant.linkedIn && (
              <div className="flex items-center gap-2 text-sm text-blue-600 col-span-2">
                <Linkedin className="w-4 h-4" />
                <a href="#" className="hover:underline">{applicant.linkedIn}</a>
              </div>
            )}
          </div>

          {/* Move Stage */}
          <div className="px-6 py-4 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Move Stage</p>
            <div className="relative">
              <button
                onClick={() => setShowStageMenu(v => !v)}
                className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 font-medium text-sm px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <span className={cn('w-2 h-2 rounded-full', stage === 'Hired' ? 'bg-emerald-500' : stage === 'Rejected' ? 'bg-red-500' : 'bg-blue-500')} />
                {stage}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {showStageMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-10 py-1 min-w-48">
                  {STAGES.map(s => (
                    <button
                      key={s}
                      onClick={() => { setStage(s); setShowStageMenu(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {s === stage && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      <span className={s !== stage ? 'ml-5' : ''}>{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resume AI Score */}
          <div className="px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-amber-500" />
              <p className="text-sm font-semibold text-slate-700">AI Resume Score</p>
            </div>
            <div className="flex items-start gap-6">
              <ScoreBadge score={resumeScore.overall} />
              <div className="flex-1 space-y-3">
                <ScoreBar value={resumeScore.skills} label="Skills Match" color="bg-blue-500" />
                <ScoreBar value={resumeScore.experience} label="Experience" color="bg-purple-500" />
                <ScoreBar value={resumeScore.education} label="Education" color="bg-emerald-500" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3 bg-slate-50 rounded-xl p-3 leading-relaxed italic">
              "{resumeScore.summary}"
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {resumeScore.keywords.map(k => (
                <span key={k} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {k}
                </span>
              ))}
              {resumeScore.missingKeywords.map(k => (
                <span key={k} className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {k}
                </span>
              ))}
            </div>
          </div>

          {/* Background */}
          <div className="px-6 py-5 border-b border-slate-100 grid grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Experience</p>
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <Briefcase className="w-4 h-4 text-slate-400" />
                {applicant.experience}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Education</p>
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <Award className="w-4 h-4 text-slate-400" />
                {applicant.education}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="px-6 py-5 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Skills</p>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map(s => (
                <span key={s} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-lg font-medium border border-blue-100">{s}</span>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="px-6 py-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recruiter Notes</p>
            <p className="text-sm text-slate-600 leading-relaxed">{applicant.notes || 'No notes added yet.'}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
            Schedule Interview
          </button>
          <button className="flex-1 bg-white border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
            Send Email
          </button>
          <button className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold py-2.5 px-4 rounded-xl hover:bg-red-100 transition-colors">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Job Card ────────────────────────────────────────────────────────────────
function JobCard({ job, onClick }: { job: JobOpening; onClick: () => void }) {
  const manager = getEmployee(job.hiringManagerId);
  const topBoards = job.boards.filter(b => b.posted);
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold', STATUS_COLORS[job.status])}>
              {job.status}
            </span>
            <span className="text-xs text-slate-400">{job.type}</span>
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">{job.title}</h3>
          <p className="text-slate-500 text-sm">{job.department}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 mt-1 flex-shrink-0 transition-colors" />
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
        <span className="flex items-center gap-1">
          <DollarSign className="w-3 h-3" />
          {formatCurrency(job.salaryMin)}–{formatCurrency(job.salaryMax)}
        </span>
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Closes {job.closingDate}</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
            {manager?.firstName[0]}{manager?.lastName[0]}
          </div>
          <span className="text-xs text-slate-500">{manager?.firstName} {manager?.lastName}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Users className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-700">{job.applicantCount}</span> applicants
          </div>
          <div className="flex gap-1">
            {topBoards.slice(0,3).map(b => (
              <span key={b.id} className="text-xs" title={b.name}>{b.logo}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Pipeline Kanban ─────────────────────────────────────────────────────────
function Pipeline({ job }: { job: JobOpening }) {
  const jobApplicants = getApplicantsForJob(job.id);
  const [selected, setSelected] = useState<Applicant | null>(null);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-3 p-4 min-w-max h-full items-start">
          {KANBAN_STAGES.map(stage => {
            const cards = jobApplicants.filter(a => a.stage === stage);
            return (
              <div key={stage} className="w-56 flex-shrink-0">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', STAGE_COLORS[stage])}>{stage}</span>
                  <span className="text-xs text-slate-400 font-medium">{cards.length}</span>
                </div>
                <div className="space-y-2">
                  {cards.map(app => (
                    <div
                      key={app.id}
                      onClick={() => setSelected(app)}
                      className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 hover:shadow-md hover:border-blue-200 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {app.firstName[0]}{app.lastName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{app.firstName} {app.lastName}</p>
                          <p className="text-xs text-slate-400 truncate">{app.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">via {app.source}</span>
                        <div className="flex items-center gap-1">
                          <div className={cn('w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center',
                            app.resumeScore.overall >= 85 ? 'bg-emerald-500' :
                            app.resumeScore.overall >= 70 ? 'bg-amber-500' : 'bg-red-500'
                          )}>
                            {app.resumeScore.overall}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {cards.length === 0 && (
                    <div className="border-2 border-dashed border-slate-100 rounded-xl p-4 text-center">
                      <p className="text-xs text-slate-300">Empty</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selected && <ApplicantDrawer applicant={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── Applicants Table ────────────────────────────────────────────────────────
function ApplicantsTable({ job }: { job: JobOpening }) {
  const jobApplicants = getApplicantsForJob(job.id);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [scoreMin, setScoreMin] = useState(0);
  const [selected, setSelected] = useState<Applicant | null>(null);

  const filtered = useMemo(() => jobApplicants.filter(a => {
    const matchName = `${a.firstName} ${a.lastName}`.toLowerCase().includes(search.toLowerCase());
    const matchStage = stageFilter === 'All' || a.stage === stageFilter;
    const matchScore = a.resumeScore.overall >= scoreMin;
    return matchName && matchStage && matchScore;
  }), [jobApplicants, search, stageFilter, scoreMin]);

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search applicants..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={stageFilter} onChange={e => setStageFilter(e.target.value)}
          className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Stages</option>
          {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Target className="w-4 h-4 text-slate-400" />
          <span>Min Score:</span>
          <select
            value={scoreMin} onChange={e => setScoreMin(Number(e.target.value))}
            className="border border-slate-200 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Any</option>
            <option value={60}>60+</option>
            <option value={70}>70+</option>
            <option value={80}>80+</option>
            <option value={90}>90+</option>
          </select>
        </div>
        <span className="text-sm text-slate-400 ml-auto">{filtered.length} applicants</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicant</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stage</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Score</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(app => (
              <tr
                key={app.id}
                onClick={() => setSelected(app)}
                className="hover:bg-blue-50/40 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {app.firstName[0]}{app.lastName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{app.firstName} {app.lastName}</p>
                      <p className="text-xs text-slate-400">{app.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', STAGE_COLORS[app.stage])}>
                    {app.stage}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0',
                      app.resumeScore.overall >= 85 ? 'bg-emerald-500' :
                      app.resumeScore.overall >= 70 ? 'bg-amber-500' : 'bg-red-500'
                    )}>
                      {app.resumeScore.overall}
                    </div>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full',
                          app.resumeScore.overall >= 85 ? 'bg-emerald-500' :
                          app.resumeScore.overall >= 70 ? 'bg-amber-500' : 'bg-red-500'
                        )}
                        style={{ width: `${app.resumeScore.overall}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 text-xs">{app.source}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{app.appliedOn}</td>
                <td className="px-4 py-3"><StarRating rating={app.rating} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No applicants match your filters.</div>
        )}
      </div>

      {selected && <ApplicantDrawer applicant={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── Job Boards Panel ────────────────────────────────────────────────────────
function JobBoardsPanel({ job }: { job: JobOpening }) {
  const [boards, setBoards] = useState(job.boards);
  const toggle = (id: string) => setBoards(prev => prev.map(b => b.id === id ? { ...b, posted: !b.posted, postedOn: !b.posted ? new Date().toISOString().slice(0,10) : undefined } : b));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="font-bold text-slate-800 text-base">Free Job Board Distribution</h3>
        <p className="text-slate-500 text-sm mt-1">Automatically post to free job boards with one click.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {boards.map(board => (
          <div key={board.id} className={cn('rounded-2xl border p-5 transition-all', board.posted ? 'border-emerald-200 bg-emerald-50' : 'border-slate-100 bg-white')}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-xl shadow-sm">
                  {board.logo}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{board.name}</p>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Free</span>
                </div>
              </div>
              <button
                onClick={() => toggle(board.id)}
                className={cn('relative w-11 h-6 rounded-full transition-colors flex-shrink-0',
                  board.posted ? 'bg-emerald-500' : 'bg-slate-200'
                )}
              >
                <span className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform',
                  board.posted ? 'translate-x-5' : 'translate-x-0.5'
                )} />
              </button>
            </div>
            {board.posted ? (
              <div className="text-xs text-emerald-700">
                <p className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Posted {board.postedOn}</p>
                <p className="mt-0.5 font-semibold">{board.applications} applications from this board</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Not currently posted</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 bg-blue-50 rounded-2xl border border-blue-100 p-4 flex items-start gap-3">
        <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800">Multi-board posting</p>
          <p className="text-xs text-blue-600 mt-0.5">Toggle boards on/off to instantly syndicate your posting. All listed boards are 100% free. Premium boards like LinkedIn Jobs Promoted can be added in Settings.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Recruitment Reports ─────────────────────────────────────────────────────
function RecruitmentReports() {
  const stats = [
    { label: 'Total Applications', value: allApplicants.length, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Open Positions', value: jobOpenings.filter(j => j.status === 'Open').length, icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Avg Resume Score', value: Math.round(allApplicants.reduce((s,a) => s + a.resumeScore.overall, 0) / allApplicants.length), icon: Zap, color: 'text-amber-600 bg-amber-50' },
    { label: 'Offers Extended', value: allApplicants.filter(a => a.stage === 'Offer' || a.stage === 'Hired').length, icon: CheckCircle2, color: 'text-purple-600 bg-purple-50' },
  ];

  const stageBreakdown = KANBAN_STAGES.map(stage => ({
    stage,
    count: allApplicants.filter(a => a.stage === stage).length,
  }));

  const sourceBreakdown = (['LinkedIn', 'Indeed', 'Glassdoor', 'We Work Remotely', 'ZipRecruiter'] as const).map(src => ({
    source: src,
    count: allApplicants.filter(a => a.source === src).length,
  }));

  const topJobs = jobOpenings.map(j => ({
    ...j,
    avgScore: Math.round(getApplicantsForJob(j.id).reduce((s,a) => s + a.resumeScore.overall, 0) / (getApplicantsForJob(j.id).length || 1)),
  })).sort((a, b) => b.applicantCount - a.applicantCount);

  const maxStageCount = Math.max(...stageBreakdown.map(s => s.count), 1);

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}{s.label === 'Avg Resume Score' ? '%' : ''}</p>
            <p className="text-slate-500 text-sm mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" /> Pipeline Funnel
          </h3>
          <div className="space-y-2">
            {stageBreakdown.map(({ stage, count }) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-32 flex-shrink-0">{stage}</span>
                <div className="flex-1 h-6 bg-slate-50 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-lg flex items-center px-2 transition-all"
                    style={{ width: `${(count / maxStageCount) * 100}%`, minWidth: count > 0 ? '24px' : '0' }}
                  >
                    {count > 0 && <span className="text-white text-xs font-semibold">{count}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" /> Applications by Source
          </h3>
          <div className="space-y-3">
            {sourceBreakdown.filter(s => s.count > 0).map(({ source, count }) => {
              const pct = Math.round((count / allApplicants.length) * 100);
              return (
                <div key={source} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-32 flex-shrink-0 truncate">{source}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 w-8 text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-purple-600" /> Jobs Performance
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Job Title</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicants</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg AI Score</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Boards Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {topJobs.map(job => (
              <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <p className="font-semibold text-slate-800">{job.title}</p>
                  <p className="text-xs text-slate-400">{job.department}</p>
                </td>
                <td className="px-5 py-3">
                  <span className={cn('text-xs px-2.5 py-1 rounded-full font-semibold', STATUS_COLORS[job.status])}>
                    {job.status}
                  </span>
                </td>
                <td className="px-5 py-3 font-semibold text-slate-700">{job.applicantCount}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center',
                      job.avgScore >= 80 ? 'bg-emerald-500' : job.avgScore >= 65 ? 'bg-amber-500' : 'bg-red-400'
                    )}>
                      {job.avgScore}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-700">
                  {job.boards.filter(b => b.posted).length} / {job.boards.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function Recruitment() {
  const [view, setView] = useState<View>('jobs');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [jobSubView, setJobSubView] = useState<'pipeline' | 'applicants' | 'boards'>('pipeline');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'All'>('All');
  const [deptFilter, setDeptFilter] = useState('All');

  const filteredJobs = useMemo(() => jobOpenings.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || j.status === statusFilter;
    const matchDept = deptFilter === 'All' || j.department === deptFilter;
    return matchSearch && matchStatus && matchDept;
  }), [search, statusFilter, deptFilter]);

  const departments = [...new Set(jobOpenings.map(j => j.department))];

  const openCount = jobOpenings.filter(j => j.status === 'Open').length;
  const totalApps = jobOpenings.reduce((s, j) => s + j.applicantCount, 0);

  if (selectedJob) {
    return (
      <PageLayout title="" subtitle="">
        <div className="flex flex-col h-full">
          {/* Sub-header */}
          <div className="bg-white border-b border-slate-100 px-6 py-4 flex-shrink-0">
            <button
              onClick={() => setSelectedJob(null)}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Jobs
            </button>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-bold text-slate-900">{selectedJob.title}</h1>
                  <span className={cn('text-xs px-2.5 py-1 rounded-full font-semibold', STATUS_COLORS[selectedJob.status])}>
                    {selectedJob.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{selectedJob.location}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{selectedJob.applicantCount} applicants</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{formatCurrency(selectedJob.salaryMin)}–{formatCurrency(selectedJob.salaryMax)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {(['pipeline', 'applicants', 'boards'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setJobSubView(v)}
                    className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors',
                      jobSubView === v ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    {v === 'pipeline' && <Kanban className="w-4 h-4" />}
                    {v === 'applicants' && <List className="w-4 h-4" />}
                    {v === 'boards' && <Globe className="w-4 h-4" />}
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {jobSubView === 'pipeline' && <Pipeline job={selectedJob} />}
            {jobSubView === 'applicants' && <ApplicantsTable job={selectedJob} />}
            {jobSubView === 'boards' && <JobBoardsPanel job={selectedJob} />}
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Recruitment" subtitle="Applicant tracking, resume scoring & job board distribution">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Open Positions', value: openCount, icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Applicants', value: totalApps, icon: Users, color: 'text-purple-600 bg-purple-50' },
          { label: 'In Interview', value: allApplicants.filter(a => a.stage.includes('Interview')).length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Offers Out', value: allApplicants.filter(a => a.stage === 'Offer').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', s.color)}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-slate-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* View Switcher */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2">
          {([['jobs', Briefcase, 'Job Openings'], ['reports', BarChart2, 'Reports']] as const).map(([v, Icon, label]) => (
            <button
              key={v}
              onClick={() => setView(v as View)}
              className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                view === v ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      {view === 'reports' && <RecruitmentReports />}

      {view === 'jobs' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <select
              value={statusFilter} onChange={e => setStatusFilter(e.target.value as JobStatus | 'All')}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              {(['Open', 'Draft', 'Paused', 'Closed', 'Filled'] as JobStatus[]).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-200 px-3 py-2.5 rounded-xl">
              <Filter className="w-4 h-4" />
              {filteredJobs.length} jobs
            </div>
          </div>

          {/* Job Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
            ))}
          </div>
          {filteredJobs.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">No jobs match your filters.</div>
          )}
        </>
      )}
    </PageLayout>
  );
}
