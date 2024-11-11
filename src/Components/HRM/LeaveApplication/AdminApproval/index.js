import { Chip, Divider, ListItem, Menu, MenuItem } from "@mui/material"
import { adminApprovalFn } from "Services/HRM/LeaveApplication"
import { useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const AdminApproval = ({ leave_application_id, refetch, status }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)

  const { mutate: adminApproval } = useMutation(adminApprovalFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setAnchorEl(null)
      refetch()
    },
  })

  const handleSubmit = (approval_status) => adminApproval({ leave_application_id, approval_status })

  return (
    <>
      <Chip
        label={status}
        className="w-28"
        clickable={status === "Approved" ? false : true}
        color={status === "Pending" ? "primary" : status === "Approved" ? "success" : "error"}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      />

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => setAnchorEl(null)}
        className="!mt-1"
        MenuListProps={{ className: "!p-0" }}
      >
        <ListItem className="!text-xs !outline-none !text-center !p-1">Change Status</ListItem>
        <Divider />
        <MenuItem onClick={() => handleSubmit("Pending")} className="w-28">
          Pending
        </MenuItem>
        <MenuItem onClick={() => handleSubmit("Approved")} className="w-28">
          Approved
        </MenuItem>
        <MenuItem onClick={() => handleSubmit("Rejected")} className="w-28">
          Reject
        </MenuItem>
      </Menu>
    </>
  )
}

export default AdminApproval
