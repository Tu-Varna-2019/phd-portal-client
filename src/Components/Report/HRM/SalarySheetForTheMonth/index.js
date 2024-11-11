/* eslint-disable */
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { salaryReportFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const SalarySheetForTheMonth = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM"))

  const { data, isLoading } = useQuery(["salaryReport", date, search, page], () =>
    salaryReportFn({ page, search, date })
  )

  const reports = data?.data?.data

  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          type="search"
          placeholder="Search Employee..."
          onChange={(event) => setSearch(event.target.value)}
        />
        <input
          type="month"
          className="p-1.5 border-[1.5px] text-black text-opacity-80 border-black rounded outline-none border-opacity-20 w-52"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={moment(new Date()).format("YYYY-MM")}
        />
      </div>
      <TableContainer>
        <Table className="whitespace-nowrap">
          <TableHead>
            <TableRow>
              <TableCell isHead>Emp No.</TableCell>
              <TableCell isHead>Employee Name</TableCell>
              <TableCell isHead>Job Title</TableCell>
              <TableCell isHead>Monthly CTC</TableCell>
              <TableCell isHead>Annual CTC</TableCell>
              <TableCell isHead>Department</TableCell>
              <TableCell isHead>Location</TableCell>
              <TableCell isHead>Total Days Worked</TableCell>
              <TableCell isHead>Total Penalized Leave</TableCell>
              <TableCell isHead>Total Leave</TableCell>
              <TableCell isHead>Total WeeklyOffs</TableCell>
              <TableCell isHead>Total Holidays</TableCell>
              <TableCell isHead>Week-Offs/Holidays Worked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={12} />
            {reports?.map((report, index) => (
              <TableRow key={index}>
                <TableCell>{report.employee_code}</TableCell>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.designation}</TableCell>
                <TableCell>{report.monthly_ctc}</TableCell>
                <TableCell>{report.annual_ctc}</TableCell>
                <TableCell>{report.department}</TableCell>
                <TableCell>{report.area}</TableCell>
                <TableCell>{report.total_days_worked}</TableCell>
                <TableCell>{report.total_penalized_leaves}</TableCell>
                <TableCell>{report.total_leaves}</TableCell>
                <TableCell>{report.total_weekly_off}</TableCell>
                <TableCell>{report.total_holidays}</TableCell>
                <TableCell>{report.weekly_off_or_holidays_worked}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={data} />
      <CustomPagination setPage={setPage} data={data} />
    </CustomDiv>
  )
}

export default SalarySheetForTheMonth
