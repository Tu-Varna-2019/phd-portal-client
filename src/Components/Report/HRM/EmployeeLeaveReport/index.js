import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { leaveReportFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import React, { useState } from "react"
import { useQuery } from "react-query"

const EmployeeLeaveReport = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const { data } = useQuery(["leaveReport", search, page], () => leaveReportFn({ page, search }))

  const leaves = data?.data?.data

  return (
    <CustomDiv className="!p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          type="search"
          placeholder="Search Employee..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <TableContainer>
        <Table className="whitespace-nowrap">
          <TableHead>
            <TableRow>
              <TableCell isHead>Sr No</TableCell>
              <TableCell isHead>Employee ID</TableCell>
              <TableCell isHead>Name</TableCell>
              <TableCell isHead>DOJ</TableCell>
              <TableCell isHead colSpan={2}>
                Jan
              </TableCell>

              <TableCell isHead colSpan={2}>
                Feb
              </TableCell>

              <TableCell isHead colSpan={2}>
                Mar
              </TableCell>

              <TableCell isHead colSpan={2}>
                Apr
              </TableCell>

              <TableCell isHead colSpan={2}>
                May
              </TableCell>

              <TableCell isHead colSpan={2}>
                Jun
              </TableCell>

              <TableCell isHead colSpan={2}>
                Jul
              </TableCell>

              <TableCell isHead colSpan={2}>
                Aug
              </TableCell>

              <TableCell isHead colSpan={2}>
                Sep
              </TableCell>

              <TableCell isHead colSpan={2}>
                Oct
              </TableCell>

              <TableCell isHead colSpan={2}>
                Nov
              </TableCell>

              <TableCell isHead colSpan={2}>
                Dec
              </TableCell>

              <TableCell isHead>Total Leaves Allowed</TableCell>
              <TableCell isHead>Total Leaves Taken</TableCell>
              <TableCell isHead>Balance Leaves</TableCell>
              <TableCell isHead>Remaining Earned Leaves</TableCell>
              <TableCell isHead>Remaining Earned Leaves</TableCell>
            </TableRow>
            <TableRow>
              <TableCell isHead className="!bg-slate-100"></TableCell>
              <TableCell isHead className="!bg-slate-100"></TableCell>
              <TableCell isHead className="!bg-slate-100"></TableCell>
              <TableCell isHead className="!bg-slate-100"></TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                EL
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                CL
              </TableCell>
              <TableCell isHead className="!bg-slate-100"></TableCell>
              <TableCell isHead className="!bg-slate-100"></TableCell>
              <TableCell isHead className="!bg-slate-100"></TableCell>
              <TableCell isHead className="!bg-slate-100">
                This Year
              </TableCell>
              <TableCell isHead className="!bg-slate-100">
                Previous year
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves?.map((leave, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{leave.employee_code}</TableCell>
                  <TableCell>{leave.name}</TableCell>
                  <TableCell>{moment(leave.joining_date).format("ll")}</TableCell>
                  {leave.months?.map((i) => {
                    return (
                      <>
                        <TableCell>{i.el}</TableCell>
                        <TableCell>{i.cl}</TableCell>
                      </>
                    )
                  })}
                  <TableCell>{leave.total_leaves_allowed}</TableCell>
                  <TableCell>{leave.total_leaves_taken}</TableCell>
                  <TableCell>{leave.balance_leaves}</TableCell>
                  <TableCell>{leave.current_year_remaining_earned_leaves}</TableCell>
                  <TableCell>{leave.previous_year_remaining_earned_leaves}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={data} />
      <CustomPagination setPage={setPage} data={data} />
    </CustomDiv>
  )
}

export default EmployeeLeaveReport
