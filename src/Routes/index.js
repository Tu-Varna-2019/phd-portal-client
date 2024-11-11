import Profile from "Authentication/Profile"
import UpdateProfile from "Authentication/Profile/UpdateProfile"
import ResetPassword from "Authentication/ForgetPassword"
import { Campaign } from "Components/CRM/Campaign"
import CampaignDetail from "Components/CRM/Campaign/CampignDetail"
import ManageCampaign from "Components/CRM/Campaign/ManageCampaign"
import Deal from "Components/CRM/Deal"
import DealDetail from "Components/CRM/Deal/DealDetail"
import ManageDeal from "Components/CRM/Deal/ManageDeal"
import Notes from "Components/CRM/FollowUp"
import Influencers from "Components/CRM/Influencers"
import ManageInfluencers from "Components/CRM/Influencers/ManageInfluencers"
import Leads from "Components/CRM/Lead"
import ManageLead from "Components/CRM/Lead/ManageLead"
import Meetings from "Components/CRM/Meeting"
import ManageMeeting from "Components/CRM/Meeting/ManageMeeting"
import RequestInvoice from "Components/CRM/RequestInvoice"
import Task from "Components/CRM/Task"
import ManageTask from "Components/CRM/Task/ManageTask"
import TravelPlanner from "Components/CRM/TravelPlanner"
import VRFApproval from "Components/CRM/VRF"
import VRFDetail from "Components/CRM/VRF/VRFDetail"
import CrmDashboard from "Components/Dashboard/CRMDashboard"
import Attendance from "Components/HRM/Attendance"
import Department from "Components/HRM/Department"
import Employee from "Components/HRM/Employee"
import ManageEmployee from "Components/HRM/Employee/ManageEmployee"
import EmployeePermission from "Components/HRM/EmployeePermission"
import Permission from "Components/HRM/EmployeePermission/Permission"
import LeaveApplication from "Components/HRM/LeaveApplication"
import Role from "Components/HRM/Role"
import Invoice from "Components/Invoice"
import ManageInvoice from "Components/Invoice/ManageInvoice"
import ClosuresReport from "Components/Report/CRM/Closures"
import LeadsReport from "Components/Report/CRM/Leads"
import LostLeadsReport from "Components/Report/CRM/LostLeads"
import PendingTaskReport from "Components/Report/CRM/PendingTasks"
import BillsPayable from "Components/Report/CompanyWideView/BillsPayable"
import BillsReceivables from "Components/Report/CompanyWideView/BillsReceivables"
import ExecutionSheet from "Components/Report/CompanyWideView/ExecutionSheet"
import Profit from "Components/Report/CompanyWideView/Profit"
import Revenue from "Components/Report/CompanyWideView/Revenue"
import DateWiseAttendanceReport from "Components/Report/HRM/DateWiseAttendance"
import EmployeeReport from "Components/Report/HRM/Employee"
import EmployeeLeaveReport from "Components/Report/HRM/EmployeeLeaveReport"
import EmployeeSalaryStructure from "Components/Report/HRM/EmployeeSalaryStructure"
import MonthWiseAttendanceReport from "Components/Report/HRM/MonthWiseAttendance"
import NewEmployeeReport from "Components/Report/HRM/NewEmployee"
import SalarySheetForTheMonth from "Components/Report/HRM/SalarySheetForTheMonth"
import Report from "Pages/Report"
import ActivityLogs from "Pages/ActivityLogs"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "Authentication/SignIn"
import VendorRegistrationForm from "Components/CRM/VRF/ManageVRF"
import Layout from "Layout"
import { useAuthContext } from "Shared/AuthProvider"
import UploadInvoice from "Components/CRM/RequestInvoice/UploadInvoice"

export const routes = [
  { id: 1, path: "/reset-password", component: <ResetPassword />, navItem: "Reset Password", access_level: ["ALL"] },
  { id: 2, path: "/dashboard", component: <CrmDashboard />, navItem: "Dashboard", access_level: ["ALL"] },
  { id: 4, path: "/profile", component: <Profile />, navItem: "Profile", access_level: ["ALL"] },
  { id: 5, path: "/invoice", component: <Invoice />, navItem: "Invoice", access_level: ["ADMIN", "FINANCE"] },
  {
    id: 5,
    path: "/invoice/:manage",
    component: <ManageInvoice />,
    navItem: "Invoice",
    access_level: ["ADMIN", "FINANCE"],
  },
  { id: 7, path: "/crm/meetings", component: <Meetings />, navItem: "Meeting", access_level: ["ADMIN", "TEAM"] },
  {
    id: 8,
    path: "/crm/meetings/create-meeting",
    component: <ManageMeeting />,
    navItem: "Create Meeting",
    access_level: ["ADMIN", "TEAM"],
  },
  { id: 11, path: "/update-profile", component: <UpdateProfile />, navItem: "Profile Update", access_level: ["ALL"] },
  { id: 18, path: "/crm/lead", component: <Leads />, navItem: "Lead", access_level: ["ADMIN", "TEAM"] },
  { id: 18, path: "/crm/lead/:manage", component: <ManageLead />, navItem: "Lead", access_level: ["ADMIN", "TEAM"] },
  { id: 22, path: "/crm/deal", component: <Deal />, navItem: "Deal", access_level: ["ADMIN", "FINANCE", "TEAM"] },
  {
    id: 22,
    path: "/crm/deal/add",
    component: <ManageDeal />,
    navItem: "Create Deal",
    access_level: ["ADMIN", "FINANCE", "TEAM"],
  },
  {
    id: 22,
    path: "/crm/deal/detail/:deal_id",
    component: <DealDetail />,
    navItem: "Deal",
    access_level: ["ADMIN", "FINANCE", "TEAM"],
  },
  { id: 24, path: "/crm/task", component: <Task />, navItem: "Task", access_level: ["ADMIN", "HR"] },
  { id: 24, path: "/crm/task/:manage", component: <ManageTask />, navItem: "Task", access_level: ["ADMIN", "HR"] },
  { id: 26, path: "/crm/follow-up", component: <Notes />, navItem: "Follow Up", access_level: ["ADMIN", "TEAM"] },
  {
    id: 28,
    path: "/crm/campaign",
    component: <Campaign />,
    navItem: "Campaign",
    access_level: ["ADMIN", "FINANCE", "TEAM"],
  },
  {
    id: 28,
    path: "/crm/campaign/:manage",
    component: <ManageCampaign />,
    navItem: "Create Campaign",
    access_level: ["ADMIN", "FINANCE", "TEAM"],
  },
  {
    id: 28,
    path: "/crm/campaign/detail/:campaign_id",
    component: <CampaignDetail />,
    navItem: "Campaign",
    access_level: ["ADMIN", "FINANCE", "TEAM"],
  },
  { id: 29, path: "/department", component: <Department />, navItem: "Department", access_level: ["ADMIN", "HR"] },
  { id: 30, path: "/designation", component: <Role />, navItem: "Designation", access_level: ["ADMIN", "HR"] },
  { id: 31, path: "/employee", component: <Employee />, navItem: "Employee", access_level: ["ADMIN", "HR"] },
  {
    id: 31,
    path: "/employee/:manage",
    component: <ManageEmployee />,
    navItem: "Manage Employee",
    access_level: ["ADMIN", "HR"],
  },
  { id: 33, path: "/attendance", component: <Attendance />, navItem: "Attendance", access_level: ["ADMIN", "HR"] },
  {
    id: 34,
    path: "/permission",
    component: <EmployeePermission />,
    navItem: "Permission",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 34,
    path: "/permission/:employee_id",
    component: <Permission />,
    navItem: "Permission",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 41,
    path: "/crm/influencers",
    component: <Influencers />,
    navItem: "Influencers",
    access_level: ["ADMIN", "FINANCE"],
  },
  {
    id: 41,
    path: "/crm/influencers/:manage",
    component: <ManageInfluencers />,
    navItem: "Influnecers",
    access_level: ["ADMIN", "FINANCE"],
  },
  { id: 35, path: "/report", component: <Report />, navItem: "Report", access_level: ["ADMIN", "HR"] },
  { id: 36, path: "/report/revenue", component: <Revenue />, navItem: "Revenue", access_level: ["ADMIN", "HR"] },
  {
    id: 37,
    path: "/report/bills-receivables",
    component: <BillsReceivables />,
    navItem: "Bills Receivables",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 38,
    path: "/report/bills-payable",
    component: <BillsPayable />,
    navItem: "Bills Payable",
    access_level: ["ADMIN", "HR"],
  },
  { id: 39, path: "/report/profit", component: <Profit />, navItem: "Profit", access_level: ["ADMIN", "HR"] },
  {
    id: 40,
    path: "/report/execution-sheet",
    component: <ExecutionSheet />,
    navItem: "Execution Sheet",
    access_level: ["ADMIN", "HR"],
  },
  { id: 41, path: "/report/leads", component: <LeadsReport />, navItem: "Leads", access_level: ["ADMIN", "HR"] },
  {
    id: 42,
    path: "/report/closures",
    component: <ClosuresReport />,
    navItem: "Closures",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 43,
    path: "/report/lost-leads",
    component: <LostLeadsReport />,
    navItem: "Lost Leads",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 44,
    path: "/report/pending-tasks",
    component: <PendingTaskReport />,
    navItem: "Pending Tasks",
    access_level: ["ADMIN", "HR", "FINANCE"],
  },
  {
    id: 45,
    path: "/report/employee",
    component: <EmployeeReport />,
    navItem: "Employee",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 46,
    path: "/report/date-wise-attendance",
    component: <DateWiseAttendanceReport />,
    navItem: "Attendance (Date Wise)",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 47,
    path: "/report/month-wise-attendance",
    component: <MonthWiseAttendanceReport />,
    navItem: "Attendance (Month Wise)",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 48,
    path: "/report/employee-leave",
    component: <EmployeeLeaveReport />,
    navItem: "Employee Leave Report",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 49,
    path: "/report/employee-salary-structure",
    component: <EmployeeSalaryStructure />,
    navItem: "Employee Salary Structure",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 50,
    path: "/report/employee-salary-sheet",
    component: <SalarySheetForTheMonth />,
    navItem: "Salary Sheet For The Month",
    access_level: ["ADMIN", "HR"],
  },
  {
    id: 51,
    path: "/hrm/leave-application",
    component: <LeaveApplication />,
    navItem: "Leave Application",
    access_level: ["ALL"],
  },
  {
    id: 52,
    path: "/report/new-employee",
    component: <NewEmployeeReport />,
    navItem: "New Employee",
    access_level: ["ADMIN", "HR"],
  },
  { id: 53, path: "/crm/vrf", component: <VRFApproval />, navItem: "VRF Approval", access_level: ["ADMIN", "FINANCE"] },
  { id: 53, path: "/crm/vrf/detail/:id", component: <VRFDetail />, navItem: "VRF", access_level: ["ALL"] },
  {
    id: 54,
    path: "/advance-approval",
    component: <RequestInvoice />,
    navItem: "Advance Approval",
    access_level: ["ADMIN", "FINANCE"],
  },
  {
    id: 55,
    path: "/crm/travel-planner",
    component: <TravelPlanner />,
    navItem: "Travel Planner",
    access_level: ["ALL"],
  },
  {
    id: 56,
    path: "/activity-log",
    component: <ActivityLogs />,
    navItem: "Activity Log",
    access_level: ["ADMIN", "HR"],
  },
]

const RouterProvider = () => {
  const [department] = useAuthContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/forget-password" element={<ResetPassword />} />
        <Route path="/vrf/:id" element={<VendorRegistrationForm />} />
        <Route path="/request-for-invoice/:invoice_request_id" element={<UploadInvoice />} />
        {routes.map((route) => {
          if (
            route.access_level.includes(department.toUpperCase()) ||
            route.access_level.includes("ALL") ||
            route.access_level.includes(department.toUpperCase() !== "FINANCE" && department.toUpperCase() !== "HR" && "TEAM")
          )
            return (
              <Route
                key={route.id}
                path={route.path}
                element={<Layout id={route.id} navLink={route.path} navItem={route.navItem} component={route.component} />}
              />
            )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default RouterProvider
