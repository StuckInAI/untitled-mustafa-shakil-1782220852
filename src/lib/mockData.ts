import type {
  Employee, LeaveRequest, PerformanceReview, Goal,
  Course, Enrollment, BenefitPlan, BenefitEnrollment,
  Document, PayrollRun, Payslip, JobOpening, Applicant
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

// ─── Recruitment ─────────────────────────────────────────────────────────────
export const jobOpenings: JobOpening[] = [
  {
    id: 'j1', title: 'Senior Frontend Engineer', department: 'Engineering',
    location: 'New York, NY / Remote', type: 'Full-time', status: 'Open',
    postedOn: '2025-01-10', closingDate: '2025-03-10', hiringManagerId: 'e1',
    description: 'We are looking for a Senior Frontend Engineer to join our growing engineering team. You will lead the development of our customer-facing React applications.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'GraphQL knowledge', 'Team leadership experience'],
    salaryMin: 130000, salaryMax: 160000, applicantCount: 47,
    boards: [
      { id: 'jb1', name: 'LinkedIn', logo: '🔗', color: '#0077B5', posted: true, postedOn: '2025-01-10', applications: 28, free: true },
      { id: 'jb2', name: 'Indeed', logo: '🔍', color: '#003A9B', posted: true, postedOn: '2025-01-10', applications: 12, free: true },
      { id: 'jb3', name: 'Glassdoor', logo: '🪟', color: '#0CAA41', posted: true, postedOn: '2025-01-11', applications: 5, free: true },
      { id: 'jb4', name: 'ZipRecruiter', logo: '⚡', color: '#FF6B35', posted: false, applications: 0, free: true },
      { id: 'jb5', name: 'We Work Remotely', logo: '🌐', color: '#1D9BF0', posted: true, postedOn: '2025-01-12', applications: 2, free: true },
      { id: 'jb6', name: 'Wellfound', logo: '🚀', color: '#FB5607', posted: false, applications: 0, free: true },
    ]
  },
  {
    id: 'j2', title: 'Product Designer', department: 'Product',
    location: 'San Francisco, CA', type: 'Full-time', status: 'Open',
    postedOn: '2025-01-15', closingDate: '2025-03-01', hiringManagerId: 'e3',
    description: 'Join our product team as a Product Designer to craft intuitive user experiences for our enterprise SaaS platform.',
    requirements: ['3+ years UX/UI design', 'Figma expertise', 'Design systems experience', 'User research skills'],
    salaryMin: 105000, salaryMax: 130000, applicantCount: 31,
    boards: [
      { id: 'jb1', name: 'LinkedIn', logo: '🔗', color: '#0077B5', posted: true, postedOn: '2025-01-15', applications: 18, free: true },
      { id: 'jb2', name: 'Indeed', logo: '🔍', color: '#003A9B', posted: true, postedOn: '2025-01-15', applications: 8, free: true },
      { id: 'jb3', name: 'Glassdoor', logo: '🪟', color: '#0CAA41', posted: false, applications: 0, free: true },
      { id: 'jb4', name: 'ZipRecruiter', logo: '⚡', color: '#FF6B35', posted: true, postedOn: '2025-01-16', applications: 5, free: true },
      { id: 'jb5', name: 'We Work Remotely', logo: '🌐', color: '#1D9BF0', posted: false, applications: 0, free: true },
      { id: 'jb6', name: 'Wellfound', logo: '🚀', color: '#FB5607', posted: false, applications: 0, free: true },
    ]
  },
  {
    id: 'j3', title: 'Sales Development Representative', department: 'Sales',
    location: 'Austin, TX', type: 'Full-time', status: 'Open',
    postedOn: '2025-01-20', closingDate: '2025-02-28', hiringManagerId: 'e4',
    description: 'We are hiring an SDR to drive top-of-funnel pipeline generation and work closely with our Account Executives.',
    requirements: ['1-2 years SDR/BDR experience', 'Salesforce CRM', 'Cold calling & email outreach', 'Goal-oriented mindset'],
    salaryMin: 55000, salaryMax: 75000, applicantCount: 68,
    boards: [
      { id: 'jb1', name: 'LinkedIn', logo: '🔗', color: '#0077B5', posted: true, postedOn: '2025-01-20', applications: 42, free: true },
      { id: 'jb2', name: 'Indeed', logo: '🔍', color: '#003A9B', posted: true, postedOn: '2025-01-20', applications: 20, free: true },
      { id: 'jb3', name: 'Glassdoor', logo: '🪟', color: '#0CAA41', posted: true, postedOn: '2025-01-21', applications: 6, free: true },
      { id: 'jb4', name: 'ZipRecruiter', logo: '⚡', color: '#FF6B35', posted: false, applications: 0, free: true },
      { id: 'jb5', name: 'We Work Remotely', logo: '🌐', color: '#1D9BF0', posted: false, applications: 0, free: true },
      { id: 'jb6', name: 'Wellfound', logo: '🚀', color: '#FB5607', posted: false, applications: 0, free: true },
    ]
  },
  {
    id: 'j4', title: 'Data Analyst', department: 'Finance',
    location: 'Remote', type: 'Full-time', status: 'Paused',
    postedOn: '2024-12-01', closingDate: '2025-02-01', hiringManagerId: 'e4',
    description: 'Seeking a Data Analyst to support financial modeling and business intelligence reporting.',
    requirements: ['SQL proficiency', 'Python or R', 'Tableau / PowerBI', 'Finance background preferred'],
    salaryMin: 85000, salaryMax: 105000, applicantCount: 22,
    boards: [
      { id: 'jb1', name: 'LinkedIn', logo: '🔗', color: '#0077B5', posted: false, applications: 14, free: true },
      { id: 'jb2', name: 'Indeed', logo: '🔍', color: '#003A9B', posted: false, applications: 8, free: true },
      { id: 'jb3', name: 'Glassdoor', logo: '🪟', color: '#0CAA41', posted: false, applications: 0, free: true },
      { id: 'jb4', name: 'ZipRecruiter', logo: '⚡', color: '#FF6B35', posted: false, applications: 0, free: true },
      { id: 'jb5', name: 'We Work Remotely', logo: '🌐', color: '#1D9BF0', posted: false, applications: 0, free: true },
      { id: 'jb6', name: 'Wellfound', logo: '🚀', color: '#FB5607', posted: false, applications: 0, free: true },
    ]
  },
  {
    id: 'j5', title: 'Marketing Content Specialist', department: 'Marketing',
    location: 'Chicago, IL / Hybrid', type: 'Full-time', status: 'Filled',
    postedOn: '2024-11-01', closingDate: '2024-12-31', hiringManagerId: 'e5',
    description: 'Content specialist to own blog, social media, and email marketing programs.',
    requirements: ['3+ years content marketing', 'SEO expertise', 'HubSpot experience', 'Copywriting skills'],
    salaryMin: 70000, salaryMax: 90000, applicantCount: 55,
    boards: [
      { id: 'jb1', name: 'LinkedIn', logo: '🔗', color: '#0077B5', posted: false, applications: 32, free: true },
      { id: 'jb2', name: 'Indeed', logo: '🔍', color: '#003A9B', posted: false, applications: 18, free: true },
      { id: 'jb3', name: 'Glassdoor', logo: '🪟', color: '#0CAA41', posted: false, applications: 5, free: true },
      { id: 'jb4', name: 'ZipRecruiter', logo: '⚡', color: '#FF6B35', posted: false, applications: 0, free: true },
      { id: 'jb5', name: 'We Work Remotely', logo: '🌐', color: '#1D9BF0', posted: false, applications: 0, free: true },
      { id: 'jb6', name: 'Wellfound', logo: '🚀', color: '#FB5607', posted: false, applications: 0, free: true },
    ]
  },
];

export const applicants: Applicant[] = [
  {
    id: 'a1', jobId: 'j1', firstName: 'Lena', lastName: 'Park', email: 'lena.park@email.com',
    phone: '(555) 231-4455', location: 'Brooklyn, NY', appliedOn: '2025-01-12',
    stage: 'Final Interview', status: 'Active', source: 'LinkedIn',
    resumeScore: { overall: 91, skills: 95, experience: 88, education: 90,
      keywords: ['React', 'TypeScript', 'GraphQL', 'Team Lead', 'CI/CD'],
      missingKeywords: ['AWS'], summary: 'Excellent match. Strong React/TS experience with team lead background.' },
    experience: '6 years', education: 'BS Computer Science, NYU',
    skills: ['React', 'TypeScript', 'GraphQL', 'Node.js', 'CSS-in-JS', 'Team Leadership'],
    linkedIn: 'linkedin.com/in/lena-park', notes: 'Top candidate. Very strong cultural fit.', rating: 5,
    interviewDate: '2025-02-05',
  },
  {
    id: 'a2', jobId: 'j1', firstName: 'Marco', lastName: 'Delgado', email: 'marco.d@email.com',
    phone: '(555) 342-5566', location: 'Austin, TX', appliedOn: '2025-01-13',
    stage: 'Technical Interview', status: 'Active', source: 'Indeed',
    resumeScore: { overall: 78, skills: 82, experience: 75, education: 77,
      keywords: ['React', 'JavaScript', 'Node.js', 'REST API'],
      missingKeywords: ['TypeScript', 'GraphQL', 'Leadership'], summary: 'Good frontend skills but lacks TypeScript and leadership experience.' },
    experience: '4 years', education: 'BS Information Technology, UT Austin',
    skills: ['React', 'JavaScript', 'Node.js', 'Vue.js', 'REST APIs'],
    notes: 'Good technical skills. Needs TypeScript coaching.', rating: 3,
    interviewDate: '2025-01-30',
  },
  {
    id: 'a3', jobId: 'j1', firstName: 'Yuki', lastName: 'Tanaka', email: 'yuki.tanaka@email.com',
    phone: '(555) 453-6677', location: 'Remote (Seattle, WA)', appliedOn: '2025-01-14',
    stage: 'Phone Interview', status: 'Active', source: 'Glassdoor',
    resumeScore: { overall: 85, skills: 88, experience: 84, education: 83,
      keywords: ['React', 'TypeScript', 'GraphQL', 'Redux'],
      missingKeywords: ['Leadership'], summary: 'Strong technical profile. Good TypeScript and GraphQL experience.' },
    experience: '5 years', education: 'MS Computer Science, UW',
    skills: ['React', 'TypeScript', 'GraphQL', 'Redux', 'Next.js'],
    linkedIn: 'linkedin.com/in/yuki-tanaka', portfolio: 'yukidev.com', notes: 'Very impressive portfolio.', rating: 4,
  },
  {
    id: 'a4', jobId: 'j1', firstName: 'Brandon', lastName: 'Cole', email: 'b.cole@email.com',
    phone: '(555) 564-7788', location: 'Chicago, IL', appliedOn: '2025-01-15',
    stage: 'Screening', status: 'Active', source: 'LinkedIn',
    resumeScore: { overall: 62, skills: 65, experience: 58, education: 63,
      keywords: ['React', 'JavaScript'],
      missingKeywords: ['TypeScript', 'GraphQL', 'Leadership', 'CI/CD', 'Testing'], summary: 'Mid-level experience. Missing several key technical requirements.' },
    experience: '3 years', education: 'Bootcamp Graduate, General Assembly',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Bootstrap'],
    notes: 'Enthusiastic but under-qualified for senior role.', rating: 2,
  },
  {
    id: 'a5', jobId: 'j1', firstName: 'Olivia', lastName: 'Grant', email: 'o.grant@email.com',
    phone: '(555) 675-8899', location: 'New York, NY', appliedOn: '2025-01-16',
    stage: 'Rejected', status: 'Rejected', source: 'Indeed',
    resumeScore: { overall: 45, skills: 40, experience: 48, education: 47,
      keywords: ['JavaScript'],
      missingKeywords: ['React', 'TypeScript', 'GraphQL', 'Leadership', 'Testing', 'CI/CD'], summary: 'Does not meet minimum requirements for a senior frontend role.' },
    experience: '2 years', education: 'BA Liberal Arts, Columbia',
    skills: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
    notes: 'Not a fit for senior role. May revisit for junior opening.',
  },
  {
    id: 'a6', jobId: 'j1', firstName: 'Daniel', lastName: 'Ortiz', email: 'd.ortiz@email.com',
    phone: '(555) 786-9900', location: 'Miami, FL', appliedOn: '2025-01-17',
    stage: 'Offer', status: 'Active', source: 'We Work Remotely',
    resumeScore: { overall: 88, skills: 90, experience: 87, education: 87,
      keywords: ['React', 'TypeScript', 'GraphQL', 'Team Lead', 'Testing', 'CI/CD'],
      missingKeywords: [], summary: 'Excellent all-around profile. Meets all requirements.' },
    experience: '7 years', education: 'BS Computer Engineering, FIU',
    skills: ['React', 'TypeScript', 'GraphQL', 'Node.js', 'AWS', 'CI/CD', 'Team Leadership'],
    linkedIn: 'linkedin.com/in/daniel-ortiz-dev', notes: 'Offer sent on 2025-02-01. Awaiting response.', rating: 5,
    interviewDate: '2025-01-28',
  },
  {
    id: 'a7', jobId: 'j2', firstName: 'Mia', lastName: 'Chen', email: 'mia.chen@email.com',
    phone: '(555) 111-2233', location: 'San Francisco, CA', appliedOn: '2025-01-16',
    stage: 'Final Interview', status: 'Active', source: 'LinkedIn',
    resumeScore: { overall: 94, skills: 96, experience: 93, education: 93,
      keywords: ['Figma', 'UX Research', 'Design Systems', 'Prototyping', 'A/B Testing'],
      missingKeywords: [], summary: 'Outstanding designer profile. Perfect match for this role.' },
    experience: '5 years', education: 'MFA Design, RISD',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'UX Research', 'Prototyping', 'Design Systems'],
    linkedIn: 'linkedin.com/in/mia-chen-design', portfolio: 'mia.design', notes: 'Best candidate seen this cycle.', rating: 5,
    interviewDate: '2025-02-06',
  },
  {
    id: 'a8', jobId: 'j2', firstName: 'Raj', lastName: 'Nair', email: 'raj.nair@email.com',
    phone: '(555) 222-3344', location: 'Remote', appliedOn: '2025-01-17',
    stage: 'Technical Interview', status: 'Active', source: 'Indeed',
    resumeScore: { overall: 74, skills: 78, experience: 72, education: 72,
      keywords: ['Figma', 'UX Design', 'Prototyping'],
      missingKeywords: ['Design Systems', 'User Research', 'A/B Testing'], summary: 'Solid junior-to-mid level designer. Lacks design systems expertise.' },
    experience: '3 years', education: 'BS Graphic Design, Cal Arts',
    skills: ['Figma', 'Sketch', 'Illustrator', 'Prototyping'],
    notes: 'Good execution skills, limited research experience.', rating: 3,
  },
  {
    id: 'a9', jobId: 'j3', firstName: 'Tyler', lastName: 'Brooks', email: 'tyler.b@email.com',
    phone: '(555) 333-4455', location: 'Austin, TX', appliedOn: '2025-01-21',
    stage: 'Phone Interview', status: 'Active', source: 'LinkedIn',
    resumeScore: { overall: 82, skills: 85, experience: 80, education: 81,
      keywords: ['Salesforce', 'Cold Calling', 'Pipeline Generation', 'SaaS'],
      missingKeywords: ['HubSpot'], summary: 'Strong SDR background with proven pipeline metrics.' },
    experience: '2 years', education: 'BA Business, UT Austin',
    skills: ['Salesforce', 'Outreach', 'Cold Calling', 'Email Sequences', 'SaaS Sales'],
    notes: 'Very energetic on screening call. Strong numbers.', rating: 4,
  },
  {
    id: 'a10', jobId: 'j3', firstName: 'Jasmine', lastName: 'Wu', email: 'jasmine.wu@email.com',
    phone: '(555) 444-5566', location: 'Dallas, TX', appliedOn: '2025-01-22',
    stage: 'Applied', status: 'Active', source: 'Indeed',
    resumeScore: { overall: 70, skills: 72, experience: 68, education: 70,
      keywords: ['CRM', 'Cold Calling', 'B2B Sales'],
      missingKeywords: ['Salesforce', 'Pipeline Generation', 'SaaS'], summary: 'Entry-level sales experience. Some relevant skills.' },
    experience: '1 year', education: 'BA Marketing, SMU',
    skills: ['HubSpot', 'Cold Calling', 'B2B Sales', 'Email Marketing'],
    notes: 'Review resume in detail before scheduling screen.',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const getJob = (id: string) => jobOpenings.find(j => j.id === id);
export const getApplicantsForJob = (jobId: string) => applicants.filter(a => a.jobId === jobId);
export const getEmployee = (id: string) => employees.find(e => e.id === id);
export const getEmployeeName = (id: string) => {
  const e = getEmployee(id);
  return e ? `${e.firstName} ${e.lastName}` : 'Unknown';
};
export const getCourse = (id: string) => courses.find(c => c.id === id);
export const getBenefitPlan = (id: string) => benefitPlans.find(b => b.id === id);
