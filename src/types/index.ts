// ─── Employee ───────────────────────────────────────────────────────────────
export type EmploymentStatus = 'Active' | 'On Leave' | 'Terminated' | 'Probation';
export type Department = 'Engineering' | 'Product' | 'HR' | 'Finance' | 'Marketing' | 'Sales' | 'Operations' | 'Legal';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Intern';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  jobTitle: string;
  department: Department;
  employmentType: EmploymentType;
  status: EmploymentStatus;
  startDate: string;
  managerId?: string;
  location: string;
  salary: number;
  leaveBalance: { annual: number; sick: number; personal: number };
}

// ─── Leave ───────────────────────────────────────────────────────────────────
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
export type LeaveType = 'Annual' | 'Sick' | 'Personal' | 'Maternity' | 'Paternity' | 'Unpaid';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  approvedBy?: string;
}

// ─── Performance ─────────────────────────────────────────────────────────────
export type ReviewStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
export type GoalStatus = 'On Track' | 'At Risk' | 'Completed' | 'Not Started';
export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  dueDate: string;
  status: GoalStatus;
  progress: number;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  rating?: Rating;
  status: ReviewStatus;
  dueDate: string;
  comments?: string;
}

// ─── Training ────────────────────────────────────────────────────────────────
export type CourseStatus = 'Not Started' | 'In Progress' | 'Completed';
export type CourseCategory = 'Compliance' | 'Technical' | 'Leadership' | 'Soft Skills' | 'Onboarding';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  duration: string;
  instructor: string;
  mandatory: boolean;
  thumbnail?: string;
}

export interface Enrollment {
  id: string;
  employeeId: string;
  courseId: string;
  enrolledOn: string;
  completedOn?: string;
  status: CourseStatus;
  progress: number;
  score?: number;
}

// ─── Benefits ────────────────────────────────────────────────────────────────
export type BenefitType = 'Health' | 'Dental' | 'Vision' | 'Life Insurance' | '401k' | 'FSA' | 'HSA';

export interface BenefitPlan {
  id: string;
  name: string;
  type: BenefitType;
  provider: string;
  employeeCost: number;
  employerCost: number;
  description: string;
}

export interface BenefitEnrollment {
  id: string;
  employeeId: string;
  planId: string;
  enrolledOn: string;
  effectiveDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

// ─── Document ────────────────────────────────────────────────────────────────
export type DocCategory = 'Contract' | 'ID' | 'Certification' | 'Policy' | 'Tax' | 'Performance' | 'Other';

export interface Document {
  id: string;
  employeeId?: string;
  name: string;
  category: DocCategory;
  uploadedOn: string;
  uploadedBy: string;
  fileSize: string;
  fileType: string;
  isCompanyWide: boolean;
}

// ─── Payroll ─────────────────────────────────────────────────────────────────
export type PayrollStatus = 'Draft' | 'Processing' | 'Completed' | 'Failed';

export interface PayrollRun {
  id: string;
  period: string;
  processedOn?: string;
  status: PayrollStatus;
  totalGross: number;
  totalNet: number;
  employeeCount: number;
}

export interface Payslip {
  id: string;
  employeeId: string;
  payrollRunId: string;
  period: string;
  grossPay: number;
  netPay: number;
  deductions: { label: string; amount: number }[];
  earnings: { label: string; amount: number }[];
}
