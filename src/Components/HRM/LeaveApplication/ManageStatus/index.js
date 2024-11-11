import { Close, Save } from "@mui/icons-material"
import { Chip, Divider, Paper, Popper } from "@mui/material"
import { applicationApprovalFn } from "Services/HRM/LeaveApplication"
import { useProfile } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const ManageStatus = ({ isUpdatePermit, leave_application_id, refetch, status }) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [updatedStatus, setUpdatedStatus] = useState("")
  const ref = useRef()

  const { profile } = useProfile()

  const { mutate: applicationApproval, isLoading } = useMutation(applicationApprovalFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setOpen(false)
      setIsOpen(false)
    },
  })
  const isHR = profile?.department === "HR"

  const initialValues = { reason: "" }

  const handleSubmit = (application_status, reason = "") => {
    applicationApproval({ leave_application_id, application_status, reason })
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(updatedStatus, values.reason)
    },
  })

  return (
    <>
      <Chip
        label={status}
        className="w-28"
        clickable={status === "Accepted" ? false : true}
        color={status === "Pending" ? "primary" : status === "Accepted" ? "success" : "error"}
        onClick={(event) => {
          if (isUpdatePermit) {
            if (status !== "Accepted") {
              setAnchorEl(event.currentTarget)
              setIsOpen(!isOpen)
            }
          } else {
            toast.warn("You don't have permission for update leave status.")
          }
        }}
      />

      <Popper placement="top" sx={{ zIndex: 1200 }} anchorEl={anchorEl} open={isOpen} className="pb-1">
        <Paper className="flex flex-col justify-center bg-white shadow-xl">
          <p className="px-3 text-lg text-center">Leave Approval</p>
          <Divider />
          <div className="flex justify-center gap-2 p-2">
            <CustomButton
              className="!rounded-none"
              color="success"
              onClick={() => {
                if (isHR) {
                  setOpen(true)
                  setAnchorEl(null)
                  setIsOpen(false)
                  setUpdatedStatus("Accepted")
                } else {
                  handleSubmit("Accepted")
                }
              }}
            >
              Accept
            </CustomButton>
            {status !== "Rejected" && (
              <CustomButton
                className="!rounded-none"
                color="error"
                onClick={() => {
                  setOpen(true)
                  setAnchorEl(null)
                  setIsOpen(false)
                  setUpdatedStatus("Rejected")
                }}
              >
                Reject
              </CustomButton>
            )}
          </div>
        </Paper>
      </Popper>

      <CustomModal title="Reason For Rejection" open={Boolean(open)} setOpen={setOpen} className="w-1/3" padding={0}>
        <form ref={ref} onSubmit={formik.handleSubmit} className="flex flex-col gap-2 p-4">
          <CustomInput
            id="reason"
            label="Reason"
            multiline
            rows={3}
            paddingX={0}
            placeholder="Enter Reason"
            formik={formik}
          />
          <div className="flex items-center justify-end gap-3 py-2">
            <CustomButton endIcon={<Close />} className="!px-5" onClick={() => setOpen(false)}>
              Cancel
            </CustomButton>
            <CustomButton
              endIcon={<Save />}
              isLoading={isLoading}
              loadingContent="Changing..."
              type="submit"
              className="!px-5"
            >
              Submit
            </CustomButton>
          </div>
        </form>
      </CustomModal>
    </>
  )
}

export default ManageStatus
