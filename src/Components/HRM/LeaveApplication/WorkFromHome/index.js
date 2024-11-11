import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { workFromHomeFn } from "Services/HRM/LeaveApplication"
import { usePermission, useProfile } from "Settings"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"
import AdminApproval from "./AdminApproval"
import ManageStatus from "./ManageStatus"

const WorkFromHome = ({ value, search, status, approval_status }) => {
  const [page, setPage] = useState(1)

  const { profile } = useProfile()

  const isAdmin = profile?.role === "Admin"

  const isUpdatePermit = usePermission("change_wfhapplications")
  const isViewPermit = usePermission("view_wfhapplications")

  const { data, isLoading, refetch } = useQuery(
    ["workFromHome", search, page, value, approval_status, status],
    () => workFromHomeFn({ search, page, status, approval_status, value }),
    { enabled: Boolean(value === 3 || value === 4) }
  )

  const applications = data?.data?.data

  return (
    <>
      <TableContainer hidden={!isViewPermit}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>Name</TableCell>
              <TableCell isHead>From Date</TableCell>
              <TableCell isHead>To Date</TableCell>
              <TableCell isHead>Description</TableCell>
              <TableCell isHead>Reason</TableCell>
              {(value === 3 || isAdmin) && <TableCell isHead>Approval By HR</TableCell>}
              <TableCell isHead>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={value === 3 || isAdmin ? 6 : 5} />
            {applications?.map((row, index) => (
              <TableRow key={row.id || index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{moment(row.date_from).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{moment(row.date_to).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{row.content}</TableCell>
                <TableCell>{row.reason || "-"}</TableCell>
                {value === 3 && (
                  <TableCell>
                    {isAdmin || profile?.department === "HR" ? (
                      <AdminApproval wfh_application_id={row.id} status={row.approval_status} refetch={refetch} />
                    ) : (
                      row.approval_status
                    )}
                  </TableCell>
                )}

                <TableCell>
                  {value === 4 ? (
                    row.status
                  ) : (
                    <ManageStatus
                      isUpdatePermit={isUpdatePermit}
                      status={row.status}
                      wfh_application_id={row.id}
                      refetch={refetch}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPermission isPermit={isViewPermit} label="leave applications" />
      <NoDataFound data={data} />
      <CustomPagination data={data} setPage={setPage} />
    </>
  )
}
export default WorkFromHome
