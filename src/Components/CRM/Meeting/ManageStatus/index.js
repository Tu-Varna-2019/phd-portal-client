import { Close, Save } from "@mui/icons-material"
import { Chip } from "@mui/material"
import { changeMeetingFn } from "Services/CRM/Meeting"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const ManageStatus = ({ meeting_id, refetch, meeting_status }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const { mutate: changeMeeting, isLoading } = useMutation(changeMeetingFn, {
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
    description: "",
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const requestBody = new FormData(ref.current)
      requestBody.append("meeting_id", meeting_id)
      changeMeeting(requestBody)
    },
  })

  return (
    <>
      <Chip
        label={meeting_status}
        clickable={meeting_status === "Open"}
        color={meeting_status === "Closed" ? "error" : "success"}
        onClick={() => meeting_status === "Open" && setOpen(true)}
      />

      <CustomModal title="Change Status" open={Boolean(open)} setOpen={setOpen} className="w-1/3" padding={0}>
        <form ref={ref} onSubmit={formik.handleSubmit} className="flex flex-col gap-2 p-5">
          <CustomInput
            id="description"
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
