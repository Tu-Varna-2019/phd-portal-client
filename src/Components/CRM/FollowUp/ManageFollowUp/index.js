import { AssistantDirection, Close, Save } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { addFollowUpFn, updateFollowUpFn } from "Services/CRM/FollowUp"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const ManageFollowUp = ({ followup_id, disabled, lead_id, refetch, isUpdate = false }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const { mutate: addFollowUp, isLoading: isAdding } = useMutation(addFollowUpFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setOpen(false)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const { mutate: updateFollowUp, isLoading: isUpdating } = useMutation(updateFollowUpFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setOpen(false)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const initialValues = {
    title: "",
    attachment: "",
    notes: "",
    scheduled_date: "",
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const requestBody = new FormData(ref.current)
      isUpdate ? requestBody.append("followup_id", followup_id) : requestBody.append("lead_id", lead_id)
      isUpdate ? updateFollowUp(requestBody) : addFollowUp(requestBody)
    },
  })

  return (
    <>
      <IconButton disabled={disabled} color="primary" size="small" onClick={() => setOpen(true)}>
        <AssistantDirection />
      </IconButton>
      <CustomModal
        title={isUpdate ? "Update Follow Up" : "Add Follow Up"}
        open={Boolean(open)}
        setOpen={setOpen}
        className="w-1/3"
        padding={0}
      >
        <form ref={ref} onSubmit={formik.handleSubmit} className="flex flex-col gap-2 p-5">
          <CustomInput isRequired id="title" label="Title" placeholder="Enter Title" formik={formik} />
          <CustomInput
            id="attachment"
            type="file"
            label="Attachment"
            onChange={(event) => formik.setFieldValue("attachment", event.target.files[0])}
          />

          <CustomInput
            isRequired
            id="scheduled_date"
            type="datetime-local"
            label="Follow Up Date and Time"
            formik={formik}
          />

          <CustomInput
            id="notes"
            label="Notes"
            multiline
            rows={3}
            paddingX={0}
            placeholder="Enter Notes"
            formik={formik}
          />
          <div className="flex items-center justify-end gap-4 py-4">
            <CustomButton endIcon={<Close />} className="!px-5" onClick={() => setOpen(false)}>
              Cancel
            </CustomButton>
            <CustomButton
              endIcon={<Save />}
              isLoading={isUpdating || isAdding}
              loadingContent="Saving..."
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

export default ManageFollowUp
