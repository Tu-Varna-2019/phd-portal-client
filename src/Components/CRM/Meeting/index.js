import { Add } from "@mui/icons-material"
import { Checkbox, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs } from "@mui/material"
import { deleteMeetingFn, meetingsFn } from "Services/CRM/Meeting"
import { usePermission } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
import DeleteButton from "Shared/CustomConfimation"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ManageStatus from "./ManageStatus"
import Participants from "./MeetingParticipant"
import Reschedule from "./Reschedule"

const Meetings = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [page, setPage] = useState(1)
  const [value, setValue] = useState("Open")
  const [search, setSearch] = useState("")
  const [participants, setParticipants] = useState(false)
  const navigate = useNavigate()

  const isAddPermit = usePermission("add_meeting")
  const isDeletePermit = usePermission("delete_meeting")
  const isViewPermit = usePermission("view_meeting")
  const isChangePermit = usePermission("change_meeting")

  const { data, isLoading, refetch } = useQuery(
    ["meetings", search, page, value, isViewPermit],
    () => meetingsFn({ search, page, meeting_status: value }),
    { enabled: isViewPermit }
  )

  const meetings = data?.data?.data

  const { selectedIds, handleClearSelection, handleSelectAll, handleSelectRow } = useRowSelection([], meetings)

  const { mutate: deleteMeeting } = useMutation(deleteMeetingFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      handleClearSelection()
    },
  })

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between p-2 !pb-0">
          <div className="flex gap-3">
            <CustomInput
              placeholder="Search Meeting..."
              type="search"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <DeleteButton
              isDelete={isDelete}
              onConfirm={() => deleteMeeting({ meeting_ids: selectedIds })}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
            />
            <CustomButton
              className="!px-5"
              startIcon={<Add />}
              onClick={() =>
                isAddPermit
                  ? navigate("/crm/meetings/create-meeting")
                  : toast.warn("You don't have permission for create meeting.")
              }
            >
              Meeting
            </CustomButton>
          </div>
        </div>
        <div className="flex gap-2">
          <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
            <Tab label="Open Meetings" value={"Open"} />
            <Tab label="Closed Meetings" value={"Closed"} />
          </Tabs>
        </div>

        <TableContainer hidden={!isViewPermit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>
                  <Checkbox size="small" onChange={handleSelectAll} />
                </TableCell>
                <TableCell isHead>Create Date</TableCell>
                <TableCell isHead>Meeting No</TableCell>
                <TableCell isHead>Title</TableCell>
                <TableCell isHead>Meeting Date</TableCell>
                <TableCell isHead>From Time</TableCell>
                <TableCell isHead>To Time</TableCell>
                <TableCell isHead>Location</TableCell>
                {value === "Open" && <TableCell isHead>Reschedule Meeting</TableCell>}
                <TableCell isHead>Paticipants</TableCell>
                <TableCell isHead>Host Name</TableCell>
                <TableCell isHead>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CustomLoader loading={isLoading} row={value === "Open" ? 11 : 10} />
              {meetings?.map((meeting, index) => (
                <TableRow key={meeting.id || index}>
                  <TableCell onClick={(event) => event.stopPropagation()}>
                    <Checkbox
                      size="small"
                      checked={selectedIds.includes(meeting.id)}
                      onChange={() => handleSelectRow(meeting.id)}
                    />
                  </TableCell>
                  <TableCell>{meeting.created_at.slice(0, 10)}</TableCell>
                  <TableCell>{meeting.meeting_no}</TableCell>
                  <TableCell>{meeting.title}</TableCell>
                  <TableCell>{meeting.date.slice(0, 10)}</TableCell>
                  <TableCell>{meeting.from_time.slice(0, 5)}</TableCell>
                  <TableCell>{meeting.to_time.slice(0, 5)}</TableCell>
                  <TableCell>{meeting.location}</TableCell>

                  {value === "Open" && (
                    <TableCell>
                      <Reschedule disabled={!isChangePermit} meeting={meeting} refetch={refetch} />
                    </TableCell>
                  )}
                  <TableCell>
                    <CustomButton size="small" onClick={() => setParticipants(meeting.participants)}>
                      View
                    </CustomButton>
                  </TableCell>
                  <TableCell>{meeting.created_by_name}</TableCell>
                  <TableCell>
                    <ManageStatus refetch={refetch} meeting_id={meeting.id} meeting_status={meeting.meeting_status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Participants participants={participants} setParticipants={setParticipants} />
        <CustomPermission label="meetings" isPermit={isViewPermit} />
        <NoDataFound data={data} />
        <CustomPagination data={data} setPage={setPage} />
      </CustomDiv>
    </>
  )
}

export default Meetings
