---
status: pending
title: HRIS Internal Tool — Full Suite
---

# HRIS Internal Tool

A full-featured Human Resource Information System for internal HR use, modelled after tools like Zoho People and Paycor. Includes a dashboard, sidebar navigation, and seven core modules.

---

## 1. Project Scaffold & Global Setup

- Create /app/src/styles/global.css with `@import "tailwindcss";` plus a set of CSS custom properties defining the brand palette (deep navy primary, slate neutrals, accent teal for status badges, red/green for alerts).
- Create /app/src/main.tsx importing global.css and rendering the root App component.
- Create /app/src/App.tsx as the root router shell. Use React state to manage the active module (no external router needed for an internal tool). Render the persistent Shell layout and swap the main content panel based on selected module.

**Outcome:** App launches with a blank shell, Tailwind styles applied.

---

## 2. Shared Types

- Create /app/src/types/employee.ts — defines the `Employee` interface: id, name, department, jobTitle, manager, startDate, employmentType, status (Active / On Leave / Terminated), avatar initials, email, phone.
- Create /app/src/types/leave.ts — defines `LeaveRequest`: id, employeeId, type (Annual / Sick / Maternity / Paternity / Unpaid), startDate, endDate, days, status (Pending / Approved / Rejected), notes.
- Create /app/src/types/performance.ts — defines `ReviewCycle`, `Goal`, `Review` (self-review + manager review scores per competency, overall rating 1–5, status: Draft / Submitted / Acknowledged).
- Create /app/src/types/training.ts — defines `Course` (id, title, category, provider, durationHours, mandatory), `Enrollment` (employeeId, courseId, status: Not Started / In Progress / Completed, completionDate, score).
- Create /app/src/types/payroll.ts — defines `PayrollRun` (id, period, processedDate, status: Scheduled / Processing / Completed), `PayrollRecord` (employeeId, grossPay, deductions, netPay, payDate).
- Create /app/src/types/benefit.ts — defines `BenefitPlan` (id, name, type: Health / Dental / Vision / Retirement / Life), `BenefitEnrollment` (employeeId, planId, coverageTier, effectiveDate, status).
- Create /app/src/types/document.ts — defines `HRDocument` (id, employeeId, name, category: Contract / Policy / Certificate / ID / Other, uploadDate, fileSize, uploadedBy).

**Outcome:** All data shapes defined; no runtime code yet.

---

## 3. Mock Data Layer

- Create /app/src/lib/mockData.ts exporting realistic seed arrays for all types: 20 employees across 5 departments (Engineering, HR, Finance, Sales, Operations), leave requests, review cycles, training enrollments, payroll runs, benefit enrollments, and documents. Include a mix of statuses so every UI state is testable.
- Create /app/src/lib/utils.ts with helpers: `formatDate`, `formatCurrency`, `getInitials`, `getStatusColor` (maps status strings to Tailwind color tokens), `calculateDaysUsed` for leave balances.

**Outcome:** All modules can render with realistic dummy data immediately.

---

## 4. Shell Layout (Sidebar + Top Bar)

- Create /app/src/components/layout/Sidebar.tsx — fixed left sidebar (collapsed to icon-only on small screens, expanded with labels on large). Sections: **People** (Employees, Documents), **Time & Leave** (Leave Tracker), **Performance** (Reviews, Goals), **Learning** (Training), **Compensation** (Payroll, Benefits). Each item has an icon, label, and active highlight. Footer shows logged-in HR user avatar + name + "HR Manager" role badge.
- Create /app/src/components/layout/TopBar.tsx — sticky top bar showing current module title, a global search input (filters employees by name/department), notification bell with a red badge count, and a settings gear icon.
- Create /app/src/components/layout/Shell.tsx — assembles Sidebar + TopBar + `<main>` content slot with correct overflow/scroll behaviour so each module scrolls independently.

**Outcome:** Full chrome visible; clicking sidebar items switches modules.

---

## 5. Dashboard (Home)

- Create /app/src/pages/DashboardPage.tsx as the default landing view.
- Create /app/src/components/dashboard/StatCard.tsx — reusable card showing a metric (number + label + trend arrow + delta percentage). Variants: total headcount, open leave requests, pending reviews, upcoming payroll date, training completion rate, new hires this month.
- Create /app/src/components/dashboard/HeadcountChart.tsx — a pure-CSS / SVG bar chart showing headcount by department (no chart library needed; use absolute-positioned bars with Tailwind height utilities driven by percentages).
- Create /app/src/components/dashboard/RecentActivityFeed.tsx — a scrollable list of the last 10 HR events (e.g. "Jane Doe submitted a leave request", "Q2 performance reviews opened", "Payroll run completed") with timestamps and category icons.
- Create /app/src/components/dashboard/PendingApprovals.tsx — a quick-action panel listing leave requests and performance reviews awaiting HR action, each with Approve / Reject buttons that update local state.
- Create /app/src/components/dashboard/UpcomingEvents.tsx — a mini calendar-style list of events in the next 30 days: work anniversaries, contract end dates, scheduled payroll runs, training deadlines.

**Outcome:** Dashboard shows a live snapshot of HR health at a glance.

---

## 6. Employee Directory & Profiles

- Create /app/src/pages/EmployeesPage.tsx — main directory view with a search bar, department filter tabs, employment-type filter (Full-time / Part-time / Contractor), and status filter (Active / On Leave / Terminated). Supports list view and grid (card) view toggle.
- Create /app/src/components/employees/EmployeeCard.tsx — card showing avatar initials circle, name, title, department, and status badge. Clicking opens the profile drawer.
- Create /app/src/components/employees/EmployeeRow.tsx — compact table row for list view: avatar, name, department, title, manager, start date, status, actions (View / Edit).
- Create /app/src/components/employees/EmployeeProfileDrawer.tsx — a right-side slide-in panel (not a modal) with tabs: **Overview** (contact info, org chart breadcrumb showing manager chain), **Leave** (balance summary + history), **Performance** (last rating + current cycle status), **Training** (enrolled courses + completion %), **Documents** (file list), **Payroll** (latest pay summary), **Benefits** (enrolled plans). Each tab pulls filtered data from mock data for that employee.
- Create /app/src/components/employees/AddEmployeeModal.tsx — a multi-step form modal: Step 1 Personal Info, Step 2 Job Details (department, title, manager, type), Step 3 Compensation & Benefits assignment. Each step validates before advancing. Final submit adds the employee to local state.
- Create /app/src/components/employees/OrgChart.tsx — a simple tree rendered with nested flex/grid showing the reporting hierarchy (CEO → VPs → Managers → ICs) using the manager field. Clicking a node opens the profile drawer.

**Outcome:** HR can browse, search, filter all employees and drill into full profiles.

---

## 7. Leave Tracking Module

- Create /app/src/pages/LeavePage.tsx — split into two sub-views via tabs: **Team Calendar** and **Requests List**.
- Create /app/src/components/leave/LeaveCalendar.tsx — a full-width month grid. Each day cell shows coloured chips for employees on leave that day (chip colour = leave type). Navigation arrows move between months. Hovering a chip shows employee name + leave type tooltip.
- Create /app/src/components/leave/LeaveRequestTable.tsx — sortable/filterable table of all requests with columns: Employee, Type, Dates, Days, Submitted, Status, Actions. Action buttons: Approve (green), Reject (red), View Details. Bulk-select checkboxes for mass approve/reject.
- Create /app/src/components/leave/LeaveBalancePanel.tsx — a panel (shown when an employee row is selected or via the employee profile) listing each leave type as a horizontal progress bar: Used / Remaining / Total days, colour-coded by type.
- Create /app/src/components/leave/LeaveRequestModal.tsx — form modal for HR to submit a leave request on behalf of an employee: employee picker (searchable dropdown), leave type selector, date range picker (two calendar-style date inputs), day count auto-calculated, notes field, Submit button.
- Create /app/src/components/leave/LeavePolicyCard.tsx — a read-only card per leave type showing policy rules (accrual rate, max carryover, notice period required).

**Outcome:** HR sees all leave at a glance, can approve/reject, and manage balances.

---

## 8. Performance Management Module

- Create /app/src/pages/PerformancePage.tsx — tabs: **Review Cycles**, **Goals**, **Ratings Overview**.
- Create /app/src/components/performance/ReviewCycleList.tsx — lists all cycles (e.g. Q1 2025 Mid-Year, 2024 Annual) with status chips (Open / Closed / Draft), completion progress bar (X of Y employees reviewed), and a "View Cycle" button.
- Create /app/src/components/performance/ReviewCycleDetail.tsx — opens when a cycle is selected. Shows a table of all employees in the cycle with their review status (Self-Review Done / Manager Review Pending / Acknowledged), rating so far, and a "View Review" action.
- Create /app/src/components/performance/ReviewForm.tsx — a structured form with competency sections (e.g. Communication, Delivery, Leadership, Collaboration). Each competency has a 1–5 star/radio rating + a text comment box. Bottom summary shows overall calculated score. Submit or Save Draft.
- Create /app/src/components/performance/GoalTracker.tsx — a Kanban-style board (columns: Not Started / In Progress / Completed / Cancelled). Each goal card shows employee name, goal title, due date, and a progress percentage bar. HR can drag cards between columns (using local state, no drag library needed — click-to-move is acceptable).
- Create /app/src/components/performance/RatingsOverview.tsx — a visual summary: distribution bar chart of ratings (how many employees at each score), department-level average rating cards, and a leaderboard-style top performers table.

**Outcome:** HR can manage full review cycles from launch through acknowledgement, and track goals.

---

## 9. Training Module

- Create /app/src/pages/TrainingPage.tsx — tabs: **Course Catalogue**, **Enrollments**, **Completion Report**.
- Create /app/src/components/training/CourseCatalogue.tsx — a card grid of all courses. Each card shows title, category badge (e.g. Compliance, Leadership, Technical), provider, duration, mandatory flag, and an "Enroll Employee" button.
- Create /app/src/components/training/CourseCard.tsx — reusable card component for catalogue. Clicking expands an inline detail panel showing description, learning objectives, and an enrollment table for who is currently enrolled and their progress.
- Create /app/src/components/training/EnrollmentTable.tsx — a filterable table: columns Employee, Course, Status, Start Date, Completion Date, Score. Filters: department, course, status. Export button (disabled, UI only).
- Create /app/src/components/training/EnrollEmployeeModal.tsx — modal for HR to enroll one or multiple employees in a course. Employee multi-select (checkboxes with search), course picker, target completion date. Enrollments added to local state on confirm.
- Create /app/src/components/training/CompletionReport.tsx — a summary view: overall completion rate donut (pure CSS circle), per-department completion bars, mandatory vs optional split, and a table of overdue mandatory trainings with days overdue highlighted in red.

**Outcome:** HR can manage the full training lifecycle from catalogue through completion reporting.

---

## 10. Benefits Module

- Create /app/src/pages/BenefitsPage.tsx — tabs: **Plans**, **Employee Enrollments**, **Open Enrollment**.
- Create /app/src/components/benefits/PlanList.tsx — a table of all benefit plans with columns: Plan Name, Type, Provider, Coverage Tiers, Enrolled Count, Effective Date. Row click opens plan detail.
- Create /app/src/components/benefits/PlanDetailPanel.tsx — slide-in panel showing full plan details: tier options (Employee Only / Employee + Spouse / Family) with cost per pay period for each, and a list of enrolled employees with their tier.
- Create /app/src/components/benefits/BenefitEnrollmentTable.tsx — full grid of employee–plan pairings with filters by plan type and department. Shows coverage tier, effective date, and status. HR can update tier or terminate enrollment.
- Create /app/src/components/benefits/OpenEnrollmentBanner.tsx — a prominent banner shown at top of the page during active open enrollment windows. Shows deadline countdown (days remaining), completion stats (X of Y employees enrolled), and a "Send Reminder" button that toggles a confirmation toast.
- Create /app/src/components/benefits/EnrollEmployeeBenefitModal.tsx — modal to assign a benefit plan to an employee: plan type tabs, plan picker within type, tier selector, effective date input, confirm.

**Outcome:** HR can manage all benefit plans, view enrollments per employee, and run open enrollment.

---

## 11. Documents Module

- Create /app/src/pages/DocumentsPage.tsx — tabs: **All Documents**, **By Employee**, **Policy Library**.
- Create /app/src/components/documents/DocumentTable.tsx — sortable table: Document Name, Employee, Category, Uploaded By, Upload Date, File Size, Actions (Download icon — no real download, just a toast, Preview icon, Delete with confirmation). Category filter chips at the top.
- Create /app/src/components/documents/UploadDocumentModal.tsx — modal form: employee picker, document name input, category dropdown, file input field (accepts PDF/DOCX — no real upload, store filename in state), expiry date (optional). Upload adds document to local state.
- Create /app/src/components/documents/PolicyLibrary.tsx — a card grid of company-wide policy documents (not employee-specific): e.g. Employee Handbook, Code of Conduct, Leave Policy, IT Security Policy. Each card shows document title, version, last updated date, and a Download / View button (UI only).
- Create /app/src/components/documents/DocumentPreviewModal.tsx — a modal simulating a document preview: shows document metadata in a styled panel with a large placeholder area indicating the file preview, plus a Close button.

**Outcome:** HR can organise, upload, and access all employee and company documents centrally.

---

## 12. Payroll Integration Module

- Create /app/src/pages/PayrollPage.tsx — tabs: **Payroll Runs**, **Employee Pay**, **Reports**.
- Create /app/src/components/payroll/PayrollRunList.tsx — table of payroll runs: Period, Process Date, Total Gross, Total Net, Status badge (Scheduled / Processing / Completed), Actions: View Details / Run Payroll (for Scheduled items). Running payroll triggers a loading state then completes after a short delay (setTimeout on local state).
- Create /app/src/components/payroll/PayrollRunDetail.tsx — a drill-down view for a completed run. Summary cards at top (Total Employees Paid, Total Gross, Total Deductions, Total Net). Below: a table of every employee's pay record for that run (Name, Department, Gross, Tax, Benefits Deduction, Other Deductions, Net Pay).
- Create /app/src/components/payroll/EmployeePayHistory.tsx — searchable/filterable table of all pay records across runs for a selected employee. Shows period, gross, net, pay date. A "View Payslip" action opens the payslip modal.
- Create /app/src/components/payroll/PayslipModal.tsx — a styled payslip document rendered in a modal: company name + logo placeholder, employee name + ID, pay period, itemised earnings (Base Salary, Overtime, Bonus), itemised deductions (Federal Tax, State Tax, Social Security, Health Insurance, 401k), and net pay total. Print button (UI only — calls window.print).
- Create /app/src/components/payroll/PayrollReports.tsx — summary cards for the current year: Total Payroll YTD, Average Salary by Department (horizontal bar chart, pure CSS), Headcount vs Payroll Cost trend (simple SVG line sparklines), and a tax liability summary table.
- Create /app/src/components/payroll/IntegrationStatusBanner.tsx — a banner at the top of the Payroll page showing a simulated connection to an external payroll provider (e.g. "Connected to Paycor · Last synced 2 hours ago") with a Sync Now button that triggers a loading spinner then a success state.

**Outcome:** HR can view payroll runs, individual payslips, and high-level compensation reports.

---

## 13. Shared UI Component Library

- Create /app/src/components/ui/Badge.tsx — status badge with colour variants (green/Active, yellow/Pending, red/Rejected, blue/Processing, grey/Inactive). Accepts label + variant prop.
- Create /app/src/components/ui/Button.tsx — primary, secondary, ghost, danger variants; size sm/md/lg; optional leading icon slot; loading spinner state.
- Create /app/src/components/ui/Modal.tsx — accessible modal wrapper: backdrop, centred panel, header with title + close X, scrollable body, sticky footer for action buttons.
- Create /app/src/components/ui/Drawer.tsx — right-side slide-in panel (translate-x animation via Tailwind transition classes), overlay backdrop, close button. Used by employee profile and plan detail.
- Create /app/src/components/ui/Tabs.tsx — horizontal tab bar with underline active indicator. Accepts array of tab objects (id, label, optional count badge). Manages active state internally, calls onSelect callback.
- Create /app/src/components/ui/Table.tsx — generic sortable table: accepts column definitions (key, header, sortable flag, render function) and data array. Renders thead/tbody with alternating row shading, hover highlight, and sort arrow icons.
- Create /app/src/components/ui/SearchInput.tsx — debounced search input with a magnifying glass icon left and a clear X button right that appears when the field has a value.
- Create /app/src/components/ui/Avatar.tsx — circular avatar showing initials (from name prop) on a colour background deterministically chosen from the palette based on name hash. Size variants: sm / md / lg.
- Create /app/src/components/ui/Toast.tsx and /app/src/hooks/useToast.ts — a lightweight toast notification system (top-right stack, auto-dismiss after 3s). Variants: success, error, info, warning. useToast exposes a `showToast(message, variant)` function used app-wide.
- Create /app/src/components/ui/EmptyState.tsx — a centred illustration placeholder (SVG icon + heading + description) used when a table or list has no results.
- Create /app/src/components/ui/ProgressBar.tsx — horizontal bar, accepts value (0–100), colour variant, optional label. Used in leave balances, training completion, and goal progress.
- Create /app/src/components/ui/StatCard.tsx — metric card with icon, number, label, optional trend indicator. Shared by Dashboard and module summary headers.

**Outcome:** Consistent, reusable UI primitives used across all modules. No inconsistent one-off styles.

---

## 14. Reporting & Analytics Overview Page

- Create /app/src/pages/ReportsPage.tsx — a dedicated Reports section accessible from the sidebar under a "Reports" group.
- Create /app/src/components/reports/ReportCard.tsx — a clickable card representing a report category. Icon, title, short description, "Run Report" button.
- Create /app/src/components/reports/ReportFilters.tsx — reusable filter bar: date range pickers (from/to), department multi-select, employment type checkboxes, status dropdown. Used by all report views.
- Create /app/src/components/reports/HeadcountReport.tsx — headcount over time (monthly sparklines), by department, by employment type, attrition rate card.
- Create /app/src/components/reports/LeaveReport.tsx — total leave days taken by type, average days per employee, department with highest absence rate, month-by-month trend.
- Create /app/src/components/reports/PerformanceReport.tsx — rating distribution, average by department, % of employees with goals set, review completion rate.
- Create /app/src/components/reports/TrainingReport.tsx — total training hours logged, completion rate by department, mandatory compliance %, most popular courses.
- Create /app/src/components/reports/PayrollReport.tsx — YTD payroll cost, cost per department, average salary band, payroll trend chart.
- All report views include an Export button (UI only — shows a success toast "Report exported").

**Outcome:** HR leadership has a one-stop reporting hub covering all modules with filterable metrics.

---

## 15. Final Polish & Accessibility

- Update /app/src/App.tsx to wire all page components to their sidebar nav items using the active-module state.
- Add keyboard navigation support to Sidebar (arrow keys cycle items, Enter activates).
- Ensure all modals trap focus and close on Escape key via useEffect in /app/src/components/ui/Modal.tsx and Drawer.tsx.
- Add a loading skeleton component /app/src/components/ui/Skeleton.tsx (grey animated pulse bars) and show it for 400ms on first render of each page to simulate data fetching.
- Verify all interactive elements have visible focus rings (Tailwind `focus-visible:ring` utilities).
- Set document title dynamically based on active module.

**Outcome:** Polished, accessible, production-quality internal tool ready for HR teams.
