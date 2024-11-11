import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { dateWiseAttendanceReportFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const DateWiseAttendanceReport = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"))

  const { data, isLoading } = useQuery(["dateWiseAttendanceReport", date, search, page], () =>
    dateWiseAttendanceReportFn({ page, search, date })
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
          type="date"
          className="p-1.5 border-[1.5px] text-black text-opacity-80 border-black rounded outline-none border-opacity-20 w-52"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={moment(new Date()).format("YYYY-MM-DD")}
        />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>Name</TableCell>
              <TableCell isHead>Department</TableCell>
              <TableCell isHead>Role</TableCell>
              <TableCell isHead>Entry Time</TableCell>
              <TableCell isHead>Exit Time</TableCell>
              <TableCell isHead>Attendace Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={5} />
            {reports?.map((report, index) => (
              <TableRow key={index}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.department}</TableCell>
                <TableCell>{report.role}</TableCell>
                <TableCell>{report.check_in ? moment(report.check_in).format("hh : mm A") : "N/A"}</TableCell>
                <TableCell>{report.check_out ? moment(report.check_out).format("hh : mm A") : "N/A"}</TableCell>
                <TableCell>{report.status}</TableCell>
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

export default DateWiseAttendanceReport
