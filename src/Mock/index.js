import * as Icon from "@mui/icons-material"

export const sidebarData = [
  { id: 1, navIcon: <Icon.Dashboard />, navItem: "Dashbaord", navLink: "/dashboard", access_level: ["ALL"] },
  { id: 2, navIcon: <Icon.Leaderboard />, navItem: "Lead", navLink: "/crm/lead", access_level: ["ADMIN", "TEAM"] },
  { id: 3, navIcon: <Icon.Groups />, navItem: "Meeting", navLink: "/crm/meetings", access_level: ["ADMIN", "TEAM"] },
  { id: 4, navIcon: <Icon.Inbox />, navItem: "Follow Up", navLink: "/crm/follow-up", access_level: ["ADMIN", "TEAM"] },
  {
    id: 5,
    navIcon: <Icon.LocationOn />,
    navItem: "Travel Planner",
    navLink: "/crm/travel-planner",
    access_level: ["ALL"],
  },
  {
    id: 6,
    navIcon: <Icon.LocalOffer />,
    navItem: "Deal",
    navLink: "/crm/deal",
    access_level: ["ADMIN", "FINANCE", "TEAM"],
  },
  {
    id: 7,
    navIcon: <Icon.Campaign />,
    navItem: "Campaign",
    navLink: "/crm/campaign",
    access_level: ["ADMIN", "FINANCE", "TEAM"],
  },
  {
    id: 8,
    navIcon: <Icon.Approval />,
    navItem: "VRF Approval",
    navLink: "/crm/vrf",
    access_level: ["ADMIN", "FINANCE"],
  },
  {
    id: 9,
    navIcon: <Icon.Groups />,
    navItem: "Influencers",
    navLink: "/crm/influencers",
    access_level: ["ADMIN", "FINANCE"],
  },
  { id: 10, navIcon: <Icon.AddTask />, navItem: "Task", navLink: "/crm/task", access_level: ["ADMIN", "HR"] },
  {
    id: 11,
    navIcon: <Icon.Description />,
    navItem: "Invoice",
    navLink: "/invoice",
    access_level: ["ADMIN", "FINANCE"],
  },
  {
    id: 12,
    navIcon: <Icon.Description />,
    navItem: "Advance Approval",
    navLink: "/advance-approval",
    access_level: ["ADMIN", "FINANCE"],
  },
  { id: 13, navIcon: <Icon.Domain />, navItem: "Department", navLink: "/department", access_level: ["ADMIN", "HR"] },
  { id: 14, navIcon: <Icon.People />, navItem: "Designation", navLink: "/designation", access_level: ["ADMIN", "HR"] },
  { id: 15, navIcon: <Icon.Badge />, navItem: "Employee", navLink: "/employee", access_level: ["ADMIN", "HR"] },
  { id: 16, navIcon: <Icon.HowToReg />, navItem: "Attendance", navLink: "/attendance", access_level: ["ADMIN", "HR"] },
  {
    id: 17,
    navIcon: <Icon.Assignment />,
    navItem: "Leave/WFH Application",
    navLink: "/hrm/leave-application",
    access_level: ["ALL"],
  },
  { id: 18, navIcon: <Icon.Report />, navItem: "Report", navLink: "/report", access_level: ["ADMIN", "HR"] },
  { id: 19, navIcon: <Icon.Block />, navItem: "Permission", navLink: "/permission", access_level: ["ADMIN", "HR"] },
  {
    id: 20,
    navIcon: <Icon.History />,
    navItem: "Activity Log",
    navLink: "/activity-log",
    access_level: ["ADMIN", "HR"],
  },
]

export const leadSorceList = [
  { label: "WhatsApp", value: "Whatsapp" },
  { label: "Email", value: "Email" },
]

export const ratinglist = [
  { label: "None", value: "None" },
  { label: "Acquired", value: "Acquired" },
  { label: "Active", value: "Active" },
  { label: "Market Failed", value: "Market Failed" },
  { label: "Project Cancelled", value: "Project Cancelled" },
  { label: "Shut Down", value: "Shut Down" },
]

export const industryList = [
  { label: "ASp(Application Services Provider)", value: "ASp(Application Services Provider)" },
  { label: "Data/Telecom OEM", value: "Data/Telecom OEM" },
  { label: "ERP(Enteprise Resource Planing)", value: "ERP(Enteprise Resource Planing)" },
  { label: "Government/Military", value: "Government/Military" },
  { label: "Large Enterprise", value: "Large Enterprise" },
  { label: "ManagementISV", value: "ManagementISV" },
  { label: "MSP(Management Service Provider)", value: "MSP(Management Service Provider)" },
  { label: "Network Equipment Enterprise", value: "Network Equipment Enterprise" },
  { label: "Optical Networking", value: "Optical Networking" },
  { label: "Service Provider", value: "Service Provider" },
  { label: "Small/medium Enterprise", value: "Small/medium Enterprise" },
  { label: "Storage Eqipment", value: "Storage Eqipment" },
  { label: "Storage Service provider", value: "Storage Service provider" },
  { label: "Systems Integrator", value: "Systems Integrator" },
  { label: "Wireless Industry", value: "Wireless Industry" },
  { label: "Communications", value: "Communications" },
  { label: "Education", value: "Education" },
  { label: "Financial Services", value: "Financial Services" },
  { label: "Manufacturing", value: "Manufacturing" },
]
