import { Close, Save } from "@mui/icons-material"
import { Chip } from "@mui/material"
import { changeFollowUpFn } from "Services/CRM/FollowUp"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const ManageStatus = ({ disabled, followup_id, refetch, followup_status }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const { mutate: changeFollowUp, isLoading } = useMutation(changeFollowUpFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setOpen(false)
    },
  })

  const initialValues = { notes: "" }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const requestBody = new FormData(ref.current)
      requestBody.append("followup_id", followup_id)
      changeFollowUp(requestBody)
    },
  })

  return (
    <>
      <Chip
        disabled={disabled}
        label={followup_status}
        clickable={followup_status === "Open"}
        color={followup_status === "Closed" ? "error" : "success"}
        onClick={() => followup_status === "Open" && setOpen(true)}
      />

      <CustomModal title="Change Status" open={Boolean(open)} setOpen={setOpen} className="w-1/3" padding={0}>
        <form ref={ref} onSubmit={formik.handleSubmit} className="flex flex-col gap-2 p-5">
          <CustomInput
            id="notes"
            label="Reason Notes"
            multiline
            rows={3}
            paddingX={0}
            placeholder="Enter Reason Notes"
            formik={formik}
          />
          <div className="flex items-center justify-end gap-4 py-4">
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
