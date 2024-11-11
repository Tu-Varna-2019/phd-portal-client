import { Delete } from "@mui/icons-material"
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { deleteFollowUpFn, followUpsFn } from "Services/CRM/FollowUp"
import { usePermission } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import FileViewer from "Shared/FileViewer"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import ManageFollowUp from "./ManageFollowUp"
import ManageStatus from "./ManageStatus"
import Note from "./Note"

const FollowUp = () => {
  const [note, setNote] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const isDeletePermit = usePermission("delete_followup")
  const isViewPermit = usePermission("view_followup")
  const isChangePermit = usePermission("change_followup")

  const { data, isLoading, refetch } = useQuery(
    ["followUps", page, search, isViewPermit],
    () => followUpsFn({ page, search }),
    { enabled: isViewPermit }
  )

  const followups = data?.data?.data

  const { mutate: deleteFollowUp } = useMutation(deleteFollowUpFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
    },
  })

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between p-2">
          <CustomInput
            placeholder="Search Follow Ups"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <TableContainer hidden={!isViewPermit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>Follow Up No</TableCell>
                <TableCell isHead>Title</TableCell>
                <TableCell isHead>Lead</TableCell>
                <TableCell isHead>Created Date & Time</TableCell>
                <TableCell isHead>Follow Up Date & Time</TableCell>
                <TableCell isHead>Lead Owner</TableCell>
                <TableCell isHead>Attachment</TableCell>
                <TableCell isHead>Note</TableCell>
                <TableCell isHead>Status</TableCell>
                <TableCell isHead>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CustomLoader loading={isLoading} row={9} />
              {followups?.map((followUp) => {
                const i = followUp.attachment?.split(".")
                const file_type = `.${i?.[i.length - 1]}`
                return (
                  <TableRow>
                    <TableCell>{followUp.followup_no}</TableCell>
                    <TableCell>{followUp.title}</TableCell>
                    <TableCell>{followUp.lead_name}</TableCell>
                    <TableCell>{moment(followUp.created_at).format("lll")}</TableCell>
                    <TableCell>
                      <span className="flex items-center justify-between px-2">
                        <p>
                          {followUp.scheduled_date ? moment(followUp.scheduled_date).format("lll") : "No Follow Up"}
                        </p>
                        <ManageFollowUp
                          disabled={!isChangePermit || followUp.followup_status === "Closed"}
                          refetch={refetch}
                          lead_id={followUp.lead}
                          followup_id={followUp.id}
                          isUpdate={followUp.scheduled_date}
                        />
                      </span>
                    </TableCell>
                    <TableCell>{followUp.created_by_name}</TableCell>
                    <TableCell>
                      <FileViewer media={{ file_type, file_name: followUp.title }} url={followUp.attachment} />
                    </TableCell>
                    <TableCell>
                      <CustomButton size="small" onClick={() => setNote(followUp.notes)}>
                        View
                      </CustomButton>
                    </TableCell>
                    <TableCell>
                      <ManageStatus
                        disabled={!isChangePermit}
                        refetch={refetch}
                        followup_id={followUp.id}
                        followup_status={followUp.followup_status}
                      />
                    </TableCell>
                    <TableCell>
                      <CustomIconButton
                        onClick={() =>
                          isDeletePermit
                            ? deleteFollowUp({ followup_ids: [followUp.id] })
                            : toast.warn("You don't have permission for delete follow up.")
                        }
                      >
                        <Delete color="error" />
                      </CustomIconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <NoDataFound data={data} />
        <CustomPermission label="follow up" isPermit={isViewPermit} />
        <CustomPagination setPage={setPage} data={data} />
        <Note note={note} setNote={setNote} />
      </CustomDiv>
    </>
  )
}

export default FollowUp
