import { Add, DeleteTwoTone, DoDisturb, Edit, ReportTwoTone } from "@mui/icons-material"
import { Button, Checkbox, Dialog } from "@mui/material"
import { deleteLeadFn, leadsFn } from "Services/CRM/Lead"
import { usePermission } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomDiv from "Shared/CustomDiv"
import { CustomTable } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ManageFollowUp from "../FollowUp/ManageFollowUp"
import AssignPocs from "./AssignPocs"
import LeadStatus from "./LeadStatus"

const Leads = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState([])
  const [isDelete, setIsDelete] = useState(false)

  const navigate = useNavigate()

  const isAddPermit = usePermission("add_lead")
  const isDeletePermit = usePermission("delete_lead")
  const isViewPermit = usePermission("view_lead")
  const isChangePermit = usePermission("change_lead")

  const { data, isLoading, refetch } = useQuery(
    ["leads", page, search, isViewPermit],
    () => leadsFn({ page, search }),
    { enabled: isViewPermit }
  )

  const leads = data?.data?.data

  const handleChange = (_, value) => setPage(value)

  const { mutate: deleteLead } = useMutation(deleteLeadFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setIsDelete(false)
      setSelectedIds([])
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const handleAllRowSelect = (event) => {
    const allIds = data?.data?.map((i) => i?.id) || []
    setSelectedIds(event.target.checked ? allIds : [])
  }

  const handleSelectRow = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const tableHead = [
    { id: "checkbox", headItem: <Checkbox size="small" onChange={handleAllRowSelect} /> },
    { id: "created_date", headItem: "Date" },
    { id: "brand", headItem: "Customer Name" },
    { id: "front_poc_name", headItem: "Primary POC" },
    { id: "back_poc_name", headItem: "Secondary POC" },
    { id: "mobile", headItem: "Mobile" },
    { id: "email", headItem: "Email" },
    { id: "followup_date", headItem: "Follow Up Date" },
    { id: "lead_status", headItem: "Status" },
    { id: "action", headItem: "Action" },
  ]

  const createData = (
    id,
    checkbox,
    created_date,
    brand,
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
    checkbox,
    created_date,
    brand,
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
      <Checkbox size="small" checked={selectedIds.includes(row.id)} onChange={() => handleSelectRow(row.id)} />,
      moment(row.created_date).format("lll"),
      row.brand,
      <span className="flex items-center justify-between px-2">
        {row.front_poc_name}
        <AssignPocs
          disabled={row.lead_status === "Converted" || !isChangePermit}
          label="Primary POC"
          lead_id={row.id}
          back_poc_id={row.back_poc}
          front_poc_id={row.front_poc}
        />
      </span>,
      <span className="flex items-center justify-between px-2">
        {row.back_poc_name}
        <AssignPocs
          disabled={row.lead_status === "Converted" || !isChangePermit}
          label="Secondary POC"
          lead_id={row.id}
          back_poc_id={row.back_poc}
          front_poc_id={row.front_poc}
        />
      </span>,
      row.mobile,
      row.email,
      <span className="flex items-center justify-between px-2">
        <p>{row.followup_date ? moment(row.followup_date).format("lll") : "No Follow Up"}</p>
        <ManageFollowUp
          disabled={row.followup_status === "Closed" || row.lead_status === "Converted" || !isChangePermit}
          refetch={refetch}
          lead_id={row.id}
          followup_id={row.followup_id}
          isUpdate={row.followup_date}
        />
      </span>,
      <span className="flex items-center justify-between px-2">
        {row.lead_status}
        <LeadStatus disabled={!isChangePermit} lead_id={row.id} lead_status={row.lead_status} />
      </span>,
      <span className="flex items-center justify-center gap-2">
        <CustomIconButton
          onClick={() =>
            isChangePermit
              ? navigate("/crm/lead/update", { state: row.id })
              : toast.warn("You don't have permission for update lead.")
          }
        >
          <Edit color="success" />
        </CustomIconButton>
      </span>
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

          <div className="flex items-center gap-2">
            {selectedIds?.length !== 0 && (
              <>
                <CustomButton
                  startIcon={<DeleteTwoTone />}
                  className="!text-red-400 hover:!text-red-500 !py-2 !px-5"
                  onClick={() =>
                    isDeletePermit ? setIsDelete(true) : toast.warn("You don't have permission for delete lead.")
                  }
                >
                  Delete Selected
                </CustomButton>
                <Dialog
                  open={isDelete}
                  onClose={() => setIsDelete(false)}
                  PaperProps={{ className: "!max-w-[500px] w-96" }}
                >
                  <div className="flex flex-col items-center gap-3 p-5">
                    <ReportTwoTone color="error" className="!text-5xl" />
                    <p className="text-xl">Are you sure!</p>
                    <p>You want to delete selected items?</p>
                  </div>
                  <span className="flex justify-end gap-3 pb-3 pr-3">
                    <Button
                      size="small"
                      variant="outlined"
                      color="inherit"
                      onClick={() => setIsDelete(false)}
                      className="!capitalize"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="small"
                      disableElevation
                      color="error"
                      className="!capitalize"
                      variant="contained"
                      onClick={() => deleteLead({ lead_ids: selectedIds })}
                    >
                      Delete
                    </Button>
                  </span>
                </Dialog>
              </>
            )}
            <CustomButton
              className="!px-3 create-new-lead"
              startIcon={<Add />}
              size="medium"
              onClick={() =>
                isAddPermit ? navigate("/crm/lead/create") : toast.warn("You don't have permission for add lead.")
              }
            >
              Lead
            </CustomButton>
          </div>
        </div>
        {isViewPermit ? (
          <CustomTable
            tableHead={tableHead}
            tableBody={rows}
            isLoading={isLoading}
            handlePageChange={handleChange}
            page={data?.data?.current_page}
            totalPages={data?.data?.total_pages}
          />
        ) : (
          <span className="flex flex-col items-center justify-center gap-5 p-5 text-lg font-semibold h-96">
            <DoDisturb color="error" className="!text-5xl" />
            You don't have permission for view leads.
          </span>
        )}
      </CustomDiv>
    </>
  )
}

export default Leads
