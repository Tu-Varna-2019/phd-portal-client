import { leadsReportFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import CustomDiv from "Shared/CustomDiv"
import { CustomTable } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const LeadsReport = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const { data, isLoading } = useQuery(["leadsReport", page, search], () => leadsReportFn({ page, search }))

  const leads = data?.data?.data

  const handleChange = (_, value) => setPage(value)

  const tableHead = [
    { id: "created_date", headItem: "Date" },
    { id: "created_by_name", headItem: "Creator Name" },
    { id: "name", headItem: "Customer Name" },
    { id: "company", headItem: "Company" },
    { id: "front_poc_name", headItem: "Front POC" },
    { id: "back_poc_name", headItem: "Back POC" },
    { id: "mobile", headItem: "Mobile" },
    { id: "email", headItem: "Email" },
    { id: "followup_date", headItem: "Follow Up Date" },
    { id: "lead_status", headItem: "Status" },
  ]

  const createData = (
    id,
    created_date,
    created_by_name,
    name,
    company,
    front_poc_name,
    back_poc_name,
    mobile,
    email,
    followup_date,
    lead_status,
    action,
    back_poc,
    front_poc
  ) => ({
    id,
    created_date,
    created_by_name,
    name,
    company,
    front_poc_name,
    back_poc_name,
    mobile,
    email,
    followup_date,
    lead_status,
    action,
    back_poc,
    front_poc,
  })

  const rows = leads?.map((row) => {
    return createData(
      row.id,
      moment(row.created_date).format("lll"),
      row.created_by_name,
      row.name,
      row.company,
      row.front_poc_name,
      row.back_poc_name,
      row.mobile,
      row.email,
      row.followup_date ? moment(row.followup_date).format("lll") : "No Follow Up",
      row.lead_status
    )
  })

  return (
    <>
      <CustomDiv className="flex flex-col w-full !p-0">
        <div className="flex items-center justify-between !p-2">
          <div className="flex items-center gap-2">
            <CustomInput
              type="search"
              placeholder="Search Lead..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <CustomTable
          tableHead={tableHead}
          tableBody={rows}
          isLoading={isLoading}
          handlePageChange={handleChange}
          page={data?.data?.current_page}
          totalPages={data?.data?.total_pages}
        />
      </CustomDiv>
    </>
  )
}

export default LeadsReport
