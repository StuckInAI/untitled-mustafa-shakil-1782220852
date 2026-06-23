import type {
  Employee, LeaveRequest, PerformanceReview, Goal,
  Course, Enrollment, BenefitPlan, BenefitEnrollment,
  Document, PayrollRun, Payslip
} from '@/types';

// ─── Employees ───────────────────────────────────────────────────────────────
export const employees: Employee[] = [
  { id: 'e1', firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah.mitchell@company.com', phone: '(555) 101-2030', jobTitle: 'VP of Engineering', department: 'Engineering', employmentType: 'Full-time', status: 'Active', startDate: '2019-03-15', location: 'New York, NY', salary: 185000, leaveBalance: { annual: 18, sick: 10, personal: 3 } },
  { id: 'e2', firstName: 'James', lastName: 'Okonkwo', email: 'james.okonkwo@company.com', phone: '(555) 202-3040', jobTitle: 'Senior Software Engineer', department: 'Engineering', employmentType: 'Full-time', status: 'Active', startDate: '2020-07-01', managerId: 'e1', location: 'Remote', salary: 135000, leaveBalance: { annual: 14, sick: 10, personal: 3 } },
  { id: 'e3', firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@company.com', phone: '(555) 303-4050', jobTitle: 'Product Manager', department: 'Product', employmentType: 'Full-time', status: 'Active', startDate: '2021-01-20', location: 'San Francisco, CA', salary: 145000, leaveBalance: { annual: 12, sick: 8, personal: 3 } },
  { id: 'e4', firstName: 'Marcus', lastName: 'Chen', email: 'marcus.chen@company.com', phone: '(555) 404-5060', jobTitle: 'HR Manager', department: 'HR', employmentType: 'Full-time', status: 'Active', startDate: '2018-09-10', location: 'New York, NY', salary: 95000, leaveBalance: { annual: 20, sick: 10, personal: 3 } },
  { id: 'e5', firstName: 'Aisha', lastName: 'Johnson', email: 'aisha.johnson@company.com', phone: '(555) 505-6070', jobTitle: 'Marketing Lead', department: 'Marketing', employmentType: 'Full-time', status: 'Active', startDate: '2022-04-05', location: 'Chicago, IL', salary: 88000, leaveBalance: { annual: 10, sick: 10, personal: 3 } },
  { id: 'e6', firstName: 'Tom', lastName: 'Rivera', email: 'tom.rivera@company.com', phone: '(555) 606-7080', jobTitle: 'Sales Executive', department: 'Sales', employmentType: 'Full-time', status: 'Active', startDate: '2021-11-15', location: 'Austin, TX', salary: 78000, leaveBalance: { annual: 11, sick: 10, personal: 3 } },
  { id: 'e7', firstName: 'Elena', lastName: 'Vasquez', email: 'elena.vasquez@company.com', phone: '(555) 707-8090', jobTitle: 'Financial Analyst', department: 'Finance', employmentType: 'Full-time', status: 'On Leave', startDate: '2020-02-28', location: 'New York, NY', salary: 105000, leaveBalance: { annual: 5, sick: 2, personal: 1 } },
  { id: 'e8', firstName: 'David', lastName: 'Park', email: 'david.park@company.com', phone: '(555) 808-9000', jobTitle: 'DevOps Engineer', department: 'Engineering', employmentType: 'Full-time', status: 'Active', startDate: '2022-08-22', managerId: 'e1', location: 'Remote', salary: 125000, leaveBalance: { annual: 9, sick: 10, personal: 3 } },
  { id: 'e9', firstName: 'Nina', lastName: 'Patel', email: 'nina.patel@company.com', phone: '(555) 909-1010', jobTitle: 'UX Designer', department: 'Product', employmentType: 'Full-time', status: 'Active', startDate: '2023-01-09', managerId: 'e3', location: 'San Francisco, CA', salary: 110000, leaveBalance: { annual: 8, sick: 10, personal: 3 } },
  { id: 'e10', firstName: 'Robert', lastName: 'Kim', email: 'robert.kim@company.com', phone: '(555) 010-1112', jobTitle: 'Legal Counsel', department: 'Legal', employmentType: 'Full-time', status: 'Probation', startDate: '2024-11-01', location: 'New York, NY', salary: 155000, leaveBalance: { annual: 3, sick: 5, personal: 1 } },
  { id: 'e11', firstName: 'Grace', lastName: 'Thompson', email: 'grace.thompson@company.com', phone: '(555) 111-2233', jobTitle: 'Operations Coordinator', department: 'Operations', employmentType: 'Part-time', status: 'Active', startDate: '2021-06-14', location: 'Chicago, IL', salary: 52000, leaveBalance: { annual: 6, sick: 5, personal: 2 } },
  { id: 'e12', firstName: 'Chris', lastName: 'Wong', email: 'chris.wong@company.com', phone: '(555) 122-3344', jobTitle: 'Software Engineer Intern', department: 'Engineering', employmentType: 'Intern', status: 'Active', startDate: '2024-06-01', managerId: 'e2', location: 'New York, NY', salary: 48000, leaveBalance: { annual: 5, sick: 3, personal: 1 } },
];

// ─── Leave Requests ───────────────────────────────────────────────────────────
export const leaveRequests: LeaveRequest[] = [
  { id: 'l1', employeeId: 'e2', type: 'Annual', startDate: '2025-02-10', endDate: '2025-02-14', days: 5, reason: 'Family vacation', status: 'Pending', appliedOn: '2025-01-20' },
  { id: 'l2', employeeId: 'e5', type: 'Sick', startDate: '2025-01-28', endDate: '2025-01-29', days: 2, reason: 'Flu recovery', status: 'Approved', appliedOn: '2025-01-27', approvedBy: 'e4' },
  { id: 'l3', employeeId: 'e7', type: 'Maternity', startDate: '2025-01-01', endDate: '2025-04-01', days: 90, reason: 'Maternity leave', status: 'Approved', appliedOn: '2024-12-01', approvedBy: 'e4' },
  { id: 'l4', employeeId: 'e6', type: 'Personal', startDate: '2025-02-03', endDate: '2025-02-03', days: 1, reason: 'Personal errands', status: 'Approved', appliedOn: '2025-01-31', approvedBy: 'e4' },
  { id: 'l5', employeeId: 'e9', type: 'Annual', startDate: '2025-03-17', endDate: '2025-03-21', days: 5, reason: 'Spring break trip', status: 'Pending', appliedOn: '2025-01-25' },
  { id: 'l6', employeeId: 'e8', type: 'Sick', startDate: '2025-01-15', endDate: '2025-01-15', days: 1, reason: 'Doctor appointment', status: 'Approved', appliedOn: '2025-01-15', approvedBy: 'e4' },
  { id: 'l7', employeeId: 'e3', type: 'Annual', startDate: '2025-02-24', endDate: '2025-02-28', days: 5, reason: 'Personal travel', status: 'Pending', appliedOn: '2025-01-22' },
  { id: 'l8', employeeId: 'e11', type: 'Personal', startDate: '2025-02-07', endDate: '2025-02-07', days: 1, reason: 'Moving apartment', status: 'Rejected', appliedOn: '2025-02-01' },
];

// ─── Performance ─────────────────────────────────────────────────────────────
export const performanceReviews: PerformanceReview[] = [
  { id: 'pr1', employeeId: 'e2', reviewerId: 'e1', period: 'Q4 2024', rating: 4, status: 'Completed', dueDate: '2025-01-15', comments: 'Excellent delivery on the platform migration. Strong collaboration skills.' },
  { id: 'pr2', employeeId: 'e3', reviewerId: 'e4', period: 'Q4 2024', rating: 5, status: 'Completed', dueDate: '2025-01-15', comments: 'Outstanding roadmap execution. Promoted for Q1.' },
  { id: 'pr3', employeeId: 'e5', reviewerId: 'e4', period: 'Q4 2024', rating: 3, status: 'Completed', dueDate: '2025-01-15', comments: 'Met targets. Needs improvement in cross-team communication.' },
  { id: 'pr4', employeeId: 'e8', reviewerId: 'e1', period: 'Q4 2024', status: 'In Progress', dueDate: '2025-02-01' },
  { id: 'pr5', employeeId: 'e9', reviewerId: 'e3', period: 'Q4 2024', status: 'In Progress', dueDate: '2025-02-01' },
  { id: 'pr6', employeeId: 'e6', reviewerId: 'e4', period: 'Q4 2024', status: 'Not Started', dueDate: '2025-02-01' },
  { id: 'pr7', employeeId: 'e11', reviewerId: 'e4', period: 'Q4 2024', status: 'Overdue', dueDate: '2025-01-10' },
];

export const goals: Goal[] = [
  { id: 'g1', employeeId: 'e2', title: 'Migrate legacy API to GraphQL', description: 'Complete full migration by Q2', dueDate: '2025-06-30', status: 'On Track', progress: 45 },
  { id: 'g2', employeeId: 'e3', title: 'Launch mobile app v2.0', description: 'Ship redesigned mobile product', dueDate: '2025-03-31', status: 'At Risk', progress: 30 },
  { id: 'g3', employeeId: 'e5', title: 'Grow social media followers by 30%', description: 'Increase brand presence across channels', dueDate: '2025-12-31', status: 'On Track', progress: 12 },
  { id: 'g4', employeeId: 'e6', title: 'Achieve $500K in new ARR', description: 'Close enterprise deals', dueDate: '2025-12-31', status: 'On Track', progress: 22 },
  { id: 'g5', employeeId: 'e8', title: 'Reduce CI/CD pipeline time by 40%', description: 'Optimize build and deployment workflows', dueDate: '2025-04-30', status: 'Completed', progress: 100 },
  { id: 'g6', employeeId: 'e9', title: 'Complete Design System v3', description: 'Deliver updated component library', dueDate: '2025-05-15', status: 'On Track', progress: 60 },
];

// ─── Training ─────────────────────────────────────────────────────────────────
export const courses: Course[] = [
  { id: 'c1', title: 'Workplace Harassment Prevention', description: 'Annual mandatory training covering harassment policies and reporting procedures.', category: 'Compliance', duration: '2 hours', instructor: 'HR Team', mandatory: true },
  { id: 'c2', title: 'Data Security & Privacy', description: 'Best practices for handling sensitive data and maintaining GDPR compliance.', category: 'Compliance', duration: '3 hours', instructor: 'Security Team', mandatory: true },
  { id: 'c3', title: 'Leadership Fundamentals', description: 'Core leadership skills for new and aspiring managers.', category: 'Leadership', duration: '8 hours', instructor: 'Marcus Chen', mandatory: false },
  { id: 'c4', title: 'Advanced React Development', description: 'Deep dive into modern React patterns, hooks, and performance optimization.', category: 'Technical', duration: '12 hours', instructor: 'Sarah Mitchell', mandatory: false },
  { id: 'c5', title: 'Effective Communication', description: 'Strategies for clear communication in remote and hybrid environments.', category: 'Soft Skills', duration: '4 hours', instructor: 'External Trainer', mandatory: false },
  { id: 'c6', title: 'New Employee Onboarding', description: 'Company overview, culture, tools, and processes for new hires.', category: 'Onboarding', duration: '6 hours', instructor: 'HR Team', mandatory: true },
  { id: 'c7', title: 'Agile & Scrum Practitioner', description: 'Practical Agile methodology for product and engineering teams.', category: 'Technical', duration: '10 hours', instructor: 'Priya Sharma', mandatory: false },
];

export const enrollments: Enrollment[] = [
  { id: 'en1', employeeId: 'e2', courseId: 'c1', enrolledOn: '2025-01-01', completedOn: '2025-01-05', status: 'Completed', progress: 100, score: 92 },
  { id: 'en2', employeeId: 'e2', courseId: 'c4', enrolledOn: '2025-01-10', status: 'In Progress', progress: 65 },
  { id: 'en3', employeeId: 'e3', courseId: 'c1', enrolledOn: '2025-01-01', status: 'In Progress', progress: 50 },
  { id: 'en4', employeeId: 'e3', courseId: 'c7', enrolledOn: '2025-01-15', completedOn: '2025-01-28', status: 'Completed', progress: 100, score: 88 },
  { id: 'en5', employeeId: 'e5', courseId: 'c2', enrolledOn: '2025-01-01', status: 'Not Started', progress: 0 },
  { id: 'en6', employeeId: 'e8', courseId: 'c2', enrolledOn: '2025-01-01', completedOn: '2025-01-12', status: 'Completed', progress: 100, score: 95 },
  { id: 'en7', employeeId: 'e12', courseId: 'c6', enrolledOn: '2024-06-01', completedOn: '2024-06-03', status: 'Completed', progress: 100, score: 85 },
  { id: 'en8', employeeId: 'e4', courseId: 'c3', enrolledOn: '2025-01-20', status: 'In Progress', progress: 40 },
  { id: 'en9', employeeId: 'e9', courseId: 'c5', enrolledOn: '2025-01-22', status: 'In Progress', progress: 75 },
  { id: 'en10', employeeId: 'e6', courseId: 'c1', enrolledOn: '2025-01-01', status: 'Not Started', progress: 0 },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
export const benefitPlans: BenefitPlan[] = [
  { id: 'b1', name: 'Blue Shield PPO', type: 'Health', provider: 'Blue Shield', employeeCost: 220, employerCost: 580, description: 'Comprehensive PPO plan with nationwide network and low deductibles.' },
  { id: 'b2', name: 'Blue Shield HMO', type: 'Health', provider: 'Blue Shield', employeeCost: 120, employerCost: 480, description: 'HMO plan with in-network only coverage and lower premiums.' },
  { id: 'b3', name: 'Delta Dental Plus', type: 'Dental', provider: 'Delta Dental', employeeCost: 35, employerCost: 65, description: 'Full dental coverage including orthodontics after 12 months.' },
  { id: 'b4', name: 'VSP Vision', type: 'Vision', provider: 'VSP', employeeCost: 8, employerCost: 12, description: 'Annual eye exam + $200 frame or contact lens allowance.' },
  { id: 'b5', name: 'Term Life 2x', type: 'Life Insurance', provider: 'MetLife', employeeCost: 0, employerCost: 45, description: 'Employer-paid life insurance at 2x annual salary.' },
  { id: 'b6', name: '401k Traditional', type: '401k', provider: 'Fidelity', employeeCost: 0, employerCost: 0, description: 'Pre-tax retirement savings with 4% employer match up to 6% contribution.' },
  { id: 'b7', name: 'FSA Medical', type: 'FSA', provider: 'WEX Health', employeeCost: 0, employerCost: 0, description: 'Flexible spending account up to $3,050/year for eligible medical expenses.' },
];

export const benefitEnrollments: BenefitEnrollment[] = [
  { id: 'be1', employeeId: 'e1', planId: 'b1', enrolledOn: '2019-04-01', effectiveDate: '2019-04-01', status: 'Active' },
  { id: 'be2', employeeId: 'e1', planId: 'b3', enrolledOn: '2019-04-01', effectiveDate: '2019-04-01', status: 'Active' },
  { id: 'be3', employeeId: 'e1', planId: 'b6', enrolledOn: '2019-04-01', effectiveDate: '2019-04-01', status: 'Active' },
  { id: 'be4', employeeId: 'e2', planId: 'b2', enrolledOn: '2020-08-01', effectiveDate: '2020-08-01', status: 'Active' },
  { id: 'be5', employeeId: 'e2', planId: 'b4', enrolledOn: '2020-08-01', effectiveDate: '2020-08-01', status: 'Active' },
  { id: 'be6', employeeId: 'e3', planId: 'b1', enrolledOn: '2021-02-01', effectiveDate: '2021-02-01', status: 'Active' },
  { id: 'be7', employeeId: 'e5', planId: 'b2', enrolledOn: '2022-05-01', effectiveDate: '2022-05-01', status: 'Active' },
  { id: 'be8', employeeId: 'e10', planId: 'b1', enrolledOn: '2024-12-01', effectiveDate: '2025-01-01', status: 'Pending' },
];

// ─── Documents ─────────────────────────────────────────────────────────────────
export const documents: Document[] = [
  { id: 'd1', employeeId: 'e2', name: 'Employment Contract - James Okonkwo', category: 'Contract', uploadedOn: '2020-07-01', uploadedBy: 'Marcus Chen', fileSize: '245 KB', fileType: 'PDF', isCompanyWide: false },
  { id: 'd2', employeeId: 'e3', name: 'Offer Letter - Priya Sharma', category: 'Contract', uploadedOn: '2021-01-20', uploadedBy: 'Marcus Chen', fileSize: '189 KB', fileType: 'PDF', isCompanyWide: false },
  { id: 'd3', employeeId: 'e2', name: 'AWS Certification', category: 'Certification', uploadedOn: '2023-06-15', uploadedBy: 'James Okonkwo', fileSize: '512 KB', fileType: 'PDF', isCompanyWide: false },
  { id: 'd4', name: 'Employee Handbook 2025', category: 'Policy', uploadedOn: '2025-01-01', uploadedBy: 'Marcus Chen', fileSize: '1.2 MB', fileType: 'PDF', isCompanyWide: true },
  { id: 'd5', name: 'PTO Policy v3', category: 'Policy', uploadedOn: '2024-12-15', uploadedBy: 'Marcus Chen', fileSize: '98 KB', fileType: 'PDF', isCompanyWide: true },
  { id: 'd6', name: 'Code of Conduct', category: 'Policy', uploadedOn: '2024-11-01', uploadedBy: 'Robert Kim', fileSize: '210 KB', fileType: 'PDF', isCompanyWide: true },
  { id: 'd7', employeeId: 'e10', name: 'Bar License - Robert Kim', category: 'Certification', uploadedOn: '2024-11-01', uploadedBy: 'Robert Kim', fileSize: '340 KB', fileType: 'PDF', isCompanyWide: false },
  { id: 'd8', employeeId: 'e5', name: 'W-4 Form 2025', category: 'Tax', uploadedOn: '2025-01-02', uploadedBy: 'Aisha Johnson', fileSize: '88 KB', fileType: 'PDF', isCompanyWide: false },
  { id: 'd9', name: 'Benefits Summary 2025', category: 'Policy', uploadedOn: '2025-01-01', uploadedBy: 'Marcus Chen', fileSize: '450 KB', fileType: 'PDF', isCompanyWide: true },
  { id: 'd10', employeeId: 'e3', name: 'Q4 2024 Performance Review', category: 'Performance', uploadedOn: '2025-01-20', uploadedBy: 'Marcus Chen', fileSize: '175 KB', fileType: 'PDF', isCompanyWide: false },
];

// ─── Payroll ─────────────────────────────────────────────────────────────────
export const payrollRuns: PayrollRun[] = [
  { id: 'pay1', period: 'January 2025', processedOn: '2025-01-31', status: 'Completed', totalGross: 1082000, totalNet: 798000, employeeCount: 12 },
  { id: 'pay2', period: 'December 2024', processedOn: '2024-12-31', status: 'Completed', totalGross: 1082000, totalNet: 798000, employeeCount: 12 },
  { id: 'pay3', period: 'November 2024', processedOn: '2024-11-30', status: 'Completed', totalGross: 934000, totalNet: 689000, employeeCount: 11 },
  { id: 'pay4', period: 'February 2025', status: 'Draft', totalGross: 1082000, totalNet: 798000, employeeCount: 12 },
];

export const payslips: Payslip[] = [
  {
    id: 'ps1', employeeId: 'e2', payrollRunId: 'pay1', period: 'January 2025',
    grossPay: 11250, netPay: 8100,
    earnings: [{ label: 'Base Salary', amount: 11250 }],
    deductions: [{ label: 'Federal Tax', amount: 1800 }, { label: 'State Tax', amount: 562 }, { label: 'Social Security', amount: 698 }, { label: 'Medicare', amount: 163 }, { label: 'Health Insurance', amount: 120 }, { label: '401k', amount: 675 }]
  },
  {
    id: 'ps2', employeeId: 'e3', payrollRunId: 'pay1', period: 'January 2025',
    grossPay: 12083, netPay: 8700,
    earnings: [{ label: 'Base Salary', amount: 12083 }],
    deductions: [{ label: 'Federal Tax', amount: 1933 }, { label: 'State Tax', amount: 604 }, { label: 'Social Security', amount: 749 }, { label: 'Medicare', amount: 175 }, { label: 'Health Insurance', amount: 220 }, { label: '401k', amount: 725 }]
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const getEmployee = (id: string) => employees.find(e => e.id === id);
export const getEmployeeName = (id: string) => {
  const e = getEmployee(id);
  return e ? `${e.firstName} ${e.lastName}` : 'Unknown';
};
export const getCourse = (id: string) => courses.find(c => c.id === id);
export const getBenefitPlan = (id: string) => benefitPlans.find(b => b.id === id);
