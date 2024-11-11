import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { dateWiseAttendanceFn, dateWiseMarkAttendanceFn } from "Services/HRM/Attendance"
import { usePermission } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "react-toastify"

const AttendanceWithDateWise = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"))

  const client = useQueryClient()

  const isUpdatePermit = usePermission("change_attendance")
  const isAddPermit = usePermission("add_attendance")
  const isViewPermit = usePermission("view_attendance")

  const { data: dateWiseAttendanceList, isLoading } = useQuery(
    ["dateWiseAttendance", page, date, search],
    () => dateWiseAttendanceFn({ page, date, search }),
    { enabled: isViewPermit }
  )

  const { mutate: markAttendance } = useMutation(dateWiseMarkAttendanceFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("dateWiseAttendance")
    },
  })

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between p-2">
          <div className="flex gap-3">
            <CustomInput placeholder="Search..." type="search" onChange={(event) => setSearch(event.target.value)} />
          </div>

          <input
            type="date"
            className="p-1.5 border-[1.5px] text-black text-opacity-80 border-black rounded outline-none border-opacity-20 w-52"
            value={date}
            disabled
            onChange={(e) => setDate(e.target.value)}
            max={moment(new Date()).format("YYYY-MM-DD")}
          />
        </div>

        <TableContainer hidden={!isViewPermit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>Name</TableCell>
                <TableCell isHead>Department</TableCell>
                <TableCell isHead>Role</TableCell>
                <TableCell isHead>Entry Time & Location</TableCell>
                <TableCell isHead>Exit Time & Location</TableCell>
                <TableCell isHead>Attendance Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={5} />
              {dateWiseAttendanceList?.data?.data?.map((row) => (
                <TableRow key={row.id} className="hover:!bg-white hover:!bg-opacity-40 cursor-pointer">
                  <TableCell>{row?.name ? row?.name : "--"}</TableCell>
                  <TableCell>{row?.department ? row?.department : "--"}</TableCell>
                  <TableCell>{row?.role ? row?.role : "--"}</TableCell>
                  <TableCell>
                    {row?.attendance?.check_in ? (
                      `${moment(row?.attendance?.check_in).format("hh : mm A")} | ${
                        row?.attendance?.check_in_latitude || ""
                      } - ${row?.attendance?.check_in_longitude || ""}`
                    ) : (
                      <CustomButton
                        size="small"
                        onClick={() => {
                          isUpdatePermit || isAddPermit
                            ? markAttendance({ employee_id: row.id })
                            : toast.warn("You don't have permission for mark attendance.")
                        }}
                      >
                        Check In
                      </CustomButton>
                    )}
                  </TableCell>
                  <TableCell>
                    {row?.attendance?.check_out ? (
                      `${moment(row?.attendance?.check_out).format("hh : mm A")} | ${
                        row?.attendance?.check_out_latitude || ""
                      } - ${row?.attendance?.check_out_longitude || ""}`
                    ) : (
                      <CustomButton
                        disabled={!row?.attendance?.check_in}
                        size="small"
                        onClick={() => {
                          isUpdatePermit || isAddPermit
                            ? markAttendance({ employee_id: row.id })
                            : toast.warn("You don't have permission for mark attendance.")
                        }}
                      >
                        Check Out
                      </CustomButton>
                    )}
                  </TableCell>

                  <TableCell>{row?.attendance?.status || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPermission isPermit={isViewPermit} label="attendance" />
        <NoDataFound data={dateWiseAttendanceList} />
        <CustomPagination data={dateWiseAttendanceList} setPage={setPage} />
      </CustomDiv>
    </>
  )
}

export default AttendanceWithDateWise
