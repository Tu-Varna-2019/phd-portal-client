import { Checkbox, MenuItem, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs } from "@mui/material"
import { deleteLeaveApplicationFn, leaveApplicationFn } from "Services/HRM/LeaveApplication"
import { usePermission, useProfile } from "Settings"
import useRowSelection from "Shared"
import DeleteButton from "Shared/CustomConfimation"
import CustomDiv from "Shared/CustomDiv"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import CustomSelect from "Shared/CustomSelect"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import AdminApproval from "./AdminApproval"
import ApplyLeave from "./ApplyLeave"
import ManageStatus from "./ManageStatus"
import WorkFromHome from "./WorkFromHome"

const LeaveApplication = () => {
  const [page, setPage] = useState(1)
  const [value, setValue] = useState(1)
  const [search, setSearch] = useState("")
  const [isDelete, setIsDelete] = useState(false)
  const [status, setStatus] = useState("")
  const [approval, setApproval] = useState("")
  const { profile } = useProfile()

  const isAdmin = profile?.role === "Admin"

  const isAddPermit = usePermission("add_leaveapplications")
  const isApplyWFH = usePermission("add_wfhapplications")
  const isUpdatePermit = usePermission("change_leaveapplications")
  const isDeletePermit = usePermission("delete_leaveapplications")
  const isViewPermit = usePermission("view_leaveapplications")

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  const { data, isLoading, refetch } = useQuery(
    ["leaveApplication", search, page, value, status, approval],
    () =>
      leaveApplicationFn({
        search,
        page,
        value: (value === 1 || value === 2) && isAdmin ? 1 : value,
        status,
        approval_status: approval,
      }),
    { enabled: Boolean(value === 1 || value === 2) }
  )

  const applications = data?.data?.data

  const { selectedIds, handleClearSelection, handleSelectAll, handleSelectRow } = useRowSelection([], applications)

  const { mutate: deleteLeaveApplication } = useMutation(deleteLeaveApplicationFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      handleClearSelection()
    },
  })

  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          type="search"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Applications"
        />
        <div className="flex items-center gap-3">
          {value === 1 && (
            <CustomSelect
              className="w-44"
              placeholder="Approval Status"
              value={approval}
              onChange={(event) => setApproval(event.target.value)}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </CustomSelect>
          )}

          <CustomSelect
            className="w-32"
            placeholder="Status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Accepted">Accepted</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </CustomSelect>
          <DeleteButton
            isDelete={isDelete}
            onConfirm={() => deleteLeaveApplication({ leave_application_ids: selectedIds })}
            selectedIds={selectedIds}
            setIsDelete={setIsDelete}
            isPermit={isDeletePermit}
          />
          {!isAdmin && <ApplyLeave isAddPermit={isAddPermit} refetch={refetch} isApplyForWFH={isApplyWFH} />}
        </div>
      </div>

      <div className="flex gap-2">
        <Tabs value={isAdmin && value === 1 ? 2 : value} onChange={handleChange}>
          {!isAdmin && <Tab label="Leave for Approval" value={1} />}
          <Tab label="Leave Application" value={2} />
          {!isAdmin && <Tab label="Work From Home for Approval" value={3} />}
          <Tab label="Work From Home" value={4} />
        </Tabs>
      </div>
      {(value === 1 || value === 2) && (
        <>
          <TableContainer hidden={!isViewPermit}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHead>
                    <Checkbox size="small" onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell isHead>Name</TableCell>
                  <TableCell isHead>Subject</TableCell>
                  <TableCell isHead>From Date</TableCell>
                  <TableCell isHead>To Date</TableCell>
                  <TableCell isHead>Description</TableCell>
                  <TableCell isHead>Reason</TableCell>
                  {(value === 1 || isAdmin) && <TableCell isHead>Approval By HR</TableCell>}
                  <TableCell isHead>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CustomLoader loading={isLoading} row={value === 1 || isAdmin ? 8 : 7} />
                {applications?.map((row, index) => (
                  <TableRow key={row.id || index}>
                    <TableCell onClick={(event) => event.stopPropagation()}>
                      <Checkbox
                        size="small"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>{moment(row.date_from).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{moment(row.date_to).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{row.content}</TableCell>
                    <TableCell>{row.reason || "-"}</TableCell>
                    {(value === 1 || isAdmin) && (
                      <TableCell>
                        {isAdmin || profile?.department === "HR" ? (
                          <AdminApproval leave_application_id={row.id} status={row.approval_status} refetch={refetch} />
                        ) : (
                          row.approval_status
                        )}
                      </TableCell>
                    )}

                    <TableCell>
                      {value === 1 || isAdmin ? (
                        <ManageStatus
                          isUpdatePermit={isUpdatePermit}
                          status={row.status}
                          leave_application_id={row.id}
                          refetch={refetch}
                        />
                      ) : (
                        row.status
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
      )}
      {(value === 3 || value === 4) && (
        <WorkFromHome
          search={search}
          status={status}
          approval_status={approval}
          value={(value === 3 || value === 4) && isAdmin ? 3 : value}
        />
      )}
    </CustomDiv>
  )
}
export default LeaveApplication
