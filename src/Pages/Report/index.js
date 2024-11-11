import { useTheme } from "@mui/material"
import classNames from "classnames"
import { Link } from "react-router-dom"
import { useAuthContext } from "Shared/AuthProvider"
import CustomDiv from "Shared/CustomDiv"

const reportSections = [
  {
    title: "Company Wide View",
    links: [
      { to: "/report/revenue", text: "Revenue" },
      { to: "/report/bills-receivables", text: "Bills Receivables" },
      { to: "/report/bills-payable", text: "Bills Payable" },
      { to: "/report/profit", text: "Profit" },
    ],
  },
  {
    title: "CRM Report",
    links: [
      { to: "/report/leads", text: "Leads" },
      { to: "/report/closures", text: "Closures" },
      { to: "/report/lost-leads", text: "Lost Leads" },
      { to: "/report/pending-tasks", text: "Pending Tasks" },
    ],
  },
  {
    title: "HRM Report",
    links: [
      { to: "/report/employee", text: "Employee" },
      { to: "/report/new-employee", text: "New Employee" },
      { to: "/report/date-wise-attendance", text: "Date Wise Attendance" },
      { to: "/report/month-wise-attendance", text: "Month Wise Attendance" },
      { to: "/report/employee-leave", text: "Employee Leave" },
      { to: "/report/employee-salary-sheet", text: "Salary Sheet For The Month" },
    ],
  },
]

const Report = () => {
  const [department] = useAuthContext()

  return (
    <CustomDiv className="flex flex-col !p-0">
      <p className="p-2 text-xl font-semibold text-center">Reports</p>
      <div className={classNames("grid", department === "HR" ? "grid-cols-1" : "grid-cols-3")}>
        {reportSections
          .filter((section) => (department === "HR" ? section.title === "HRM Report" : true))
          .map((section, index, arr) => (
            <div key={index} className="flex flex-col">
              <div
                style={{ backgroundColor: useTheme().palette.primary.main }}
                className={classNames(
                  "text-xl !text-white !rounded-none !p-2 font-bold",
                  arr.length - 1 ? "border-r border-white border-opacity-20" : ""
                )}
              >
                {section.title}
              </div>
              <div
                className={classNames(
                  "flex flex-col gap-3 p-4 h-full overflow-y-auto",
                  index !== arr.length - 1 ? "border-r border-white border-opacity-20" : ""
                )}
                style={{ borderColor: useTheme().palette.primary.main }}
              >
                {section.links.map((link, linkIndex) => (
                  <Link key={linkIndex} to={link.to} className="w-fit">
                    ➤ <span className="hover:!text-blue-800 hover:!underline !underline-offset-2"> {link.text}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </CustomDiv>
  )
}

export default Report
