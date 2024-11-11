import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { employeeDataFn } from "Services/CRM/Task"
import { monthWiseAttendanceFn } from "Services/HRM/Attendance"
import { usePermission } from "Settings"
import CustomDiv from "Shared/CustomDiv"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPermission from "Shared/CustomPermsission"
import NoDataFound from "Shared/NoDataFound"
import SearchAndSelect from "Shared/SearchAndSelect"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const AttendaceMonthWise = () => {
  const [employeeId, setEmployeeId] = useState("")
  const [month, setMonth] = useState(moment(new Date()).format("YYYY-MM"))
  const isViewPermit = usePermission("view_attendance")

  const { data } = useQuery(["employee"], () => employeeDataFn())

  const employees = data?.data?.data?.map((i) => ({ value: i.id, label: i.name }))

  const employee = employees?.[0]

  const { data: attendaceMonthData, isLoading } = useQuery(
    ["monthWiseAttendance", month, employeeId, employee],
    () => monthWiseAttendanceFn({ date: month, employee_id: employeeId || employee?.value }),
    { enabled: isViewPermit && Boolean(employee) }
  )

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between p-2">
          <SearchAndSelect
            className="!w-72"
            options={employees}
            setValue={setEmployeeId}
            value={employeeId || employee?.value}
          />

          <input
            type="month"
            className="p-1.5 border-[1.5px] bg-white bg-opacity-20 text-black text-opacity-80 border-black rounded outline-none border-opacity-20 w-52"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            max={moment(new Date()).format("YYYY-MM")}
          />
        </div>

        <TableContainer hidden={!isViewPermit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>Date</TableCell>
                <TableCell isHead>Entry Time</TableCell>
                <TableCell isHead>Exit Time</TableCell>
                <TableCell isHead>Attendance Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={3} />
              {attendaceMonthData?.data?.data?.map((row) => (
                <TableRow key={row.id} className="hover:!bg-white hover:!bg-opacity-40 cursor-pointer">
                  <TableCell>{row?.date ? row?.date?.slice(0, 10) : "N/A"}</TableCell>
                  <TableCell>{row?.check_in ? row?.check_in?.slice(11, 16) : "N/A"}</TableCell>
                  <TableCell>{row?.check_out ? row?.check_out?.slice(11, 16) : "N/A"}</TableCell>
                  <TableCell>{row?.attendance ? row?.attendance : "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPermission isPermit={isViewPermit} label="attendance" />
        <NoDataFound data={attendaceMonthData} />
      </CustomDiv>
    </>
  )
}

export default AttendaceMonthWise
