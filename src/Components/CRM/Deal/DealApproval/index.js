import { Close } from "@mui/icons-material"
import { Chip, Divider, IconButton, Paper, Popper } from "@mui/material"
import { dealApprovalFn } from "Services/CRM/Deal"
import CustomButton from "Shared/CustomButton"
import { useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const DealApproval = ({ isChangePermit, deal_id, refetch, deal_status, isVisible }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (event) => {
    setIsOpen(!isOpen)

    event && setAnchorEl(event.currentTarget)
  }

  const { mutate: dealApproval } = useMutation(dealApprovalFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      handleToggle()
    },
  })

  const handleSubmit = (approval_status) => {
    dealApproval({ deal_id, approval_status })
  }

  return (
    <>
      {isVisible ? (
        <Chip
          label={deal_status}
          clickable={deal_status === "Approved" ? false : true}
          color={deal_status === "Pending" ? "warning" : deal_status === "Approved" ? "success" : "error"}
          onClick={(event) =>
            isChangePermit
              ? deal_status !== "Approved" && handleToggle(event)
              : toast.warning("You don't have permission for change deal")
          }
        />
      ) : (
        deal_status
      )}

      <Popper placement="top" sx={{ zIndex: 1200 }} anchorEl={anchorEl} open={isOpen} className="pb-1 pr-3">
        <Paper className="flex flex-col justify-center bg-white border shadow-xl">
          <div className="flex items-center justify-between">
            <p className="px-2 text-lg text-center">Deal Approval</p>
            <IconButton size="small" onClick={handleToggle}>
              <Close />
            </IconButton>
          </div>
          <Divider />
          <div className="flex justify-center gap-2 p-2">
            <CustomButton color="success" onClick={() => handleSubmit("Approved")}>
              Approve
            </CustomButton>
            {deal_status !== "Rejected" && (
              <CustomButton color="error" onClick={() => handleSubmit("Rejected")}>
                Reject
              </CustomButton>
            )}
          </div>
        </Paper>
      </Popper>
    </>
  )
}

export default DealApproval
