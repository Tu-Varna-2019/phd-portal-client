import { Close, Save } from "@mui/icons-material"
import { Chip, Divider, IconButton, Menu } from "@mui/material"
import { vrfApprovalFn } from "Services/CRM/VRF"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const VRFApproval = ({ isUpdatePermit, vrf_id, refetch, vrf_status }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const ref = useRef()
  const handleToggle = (event) => {
    setIsOpen(!isOpen)
    setOpen(false)
    event && setAnchorEl(event.currentTarget)
  }

  const { mutate: vrfApproval, isLoading } = useMutation(vrfApprovalFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      handleToggle()
    },
  })

  const handleSubmit = (vrf_status, reason = "") => {
    vrfApproval({ vendor_form_id: vrf_id, vrf_status, reason })
  }

  const initialValues = { reason: "" }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit("Rejected", values.reason)
    },
  })
  return (
    <>
      <Chip
        label={vrf_status}
        clickable={vrf_status === "Verified" ? false : true}
        color={vrf_status === "Filled" ? "warning" : vrf_status === "Verified" ? "success" : "error"}
        onClick={(event) =>
          isUpdatePermit
            ? vrf_status !== "Verified" && handleToggle(event)
            : toast.warn("You don't have permission for verify vrf.")
        }
      />

      <Menu
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        sx={{ zIndex: 1200 }}
        anchorEl={anchorEl}
        MenuListProps={{ disablePadding: true }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-between">
          <p className="px-2 text-lg text-center">VRF Approval</p>
          <IconButton size="small" onClick={handleToggle}>
            <Close />
          </IconButton>
        </div>
        <Divider />
        <div className="flex justify-center gap-2 p-1">
          <CustomButton color="success" onClick={() => handleSubmit("Verified")}>
            Verify
          </CustomButton>
          {vrf_status !== "Rejected" && (
            <CustomButton
              className="!rounded-none"
              color="error"
              onClick={() => {
                setOpen(true)
                setAnchorEl(null)
                setIsOpen(false)
              }}
            >
              Reject
            </CustomButton>
          )}
        </div>
      </Menu>
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

export default VRFApproval
