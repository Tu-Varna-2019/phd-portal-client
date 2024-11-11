import { Close } from "@mui/icons-material"
import { Chip, Divider, IconButton, Paper, Popper } from "@mui/material"
import { invoiceApprovalFn } from "Services/Invoice"
import CustomButton from "Shared/CustomButton"
import { useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const InvoiceApproval = ({ invoice_id, refetch, invoice_status }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (event) => {
    setIsOpen(!isOpen)

    event && setAnchorEl(event.currentTarget)
  }

  const { mutate: invoiceApproval } = useMutation(invoiceApprovalFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      handleToggle()
    },
  })

  const handleSubmit = (approval_status) => {
    invoiceApproval({ invoice_id, approval_status })
  }

  return (
    <>
      <Chip
        label={invoice_status}
        clickable={invoice_status === "Approved" ? false : true}
        color={invoice_status === "Pending" ? "warning" : invoice_status === "Approved" ? "success" : "error"}
        onClick={(event) => invoice_status !== "Approved" && handleToggle(event)}
      />

      <Popper placement="top" sx={{ zIndex: 1200 }} anchorEl={anchorEl} open={isOpen} className="pb-1 pr-3">
        <Paper className="flex flex-col justify-center bg-white border shadow-xl">
          <div className="flex items-center justify-between">
            <p className="px-2 text-lg text-center">Invoice Approval</p>
            <IconButton size="small" onClick={handleToggle}>
              <Close />
            </IconButton>
          </div>
          <Divider />
          <div className="flex justify-center gap-2 p-2">
            <CustomButton color="success" onClick={() => handleSubmit("Approved")}>
              Approve
            </CustomButton>
            {invoice_status !== "Rejected" && (
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

export default InvoiceApproval
