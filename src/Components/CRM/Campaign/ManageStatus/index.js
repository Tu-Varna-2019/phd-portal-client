import { Close, Save } from "@mui/icons-material"
import { Chip } from "@mui/material"
import { changeCampaignFn } from "Services/CRM/Campaign"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const ManageStatus = ({ isChangePermit, campaign_id, refetch, campaign_status }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const { mutate: changeCampaign, isLoading } = useMutation(changeCampaignFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setOpen(false)
    },
  })

  const initialValues = {
    campaign_note: "",
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const requestBody = new FormData(ref.current)
      requestBody.append("campaign_status", campaign_status === "Completed" ? "In Progress" : "Completed")
      requestBody.append("campaign_id", campaign_id)
      changeCampaign(requestBody)
    },
  })

  return (
    <>
      <Chip
        label={campaign_status}
        clickable={campaign_status === "In Progress"}
        color={campaign_status === "Completed" ? "success" : "primary"}
        onClick={() =>
          isChangePermit
            ? campaign_status === "In Progress" && setOpen(true)
            : toast.warn("You don't have permission for change campaign status.")
        }
      />

      <CustomModal title="Change Status" open={Boolean(open)} setOpen={setOpen} className="w-1/3" padding={0}>
        <form ref={ref} onSubmit={formik.handleSubmit} className="flex flex-col gap-2 p-5">
          <CustomInput
            id="campaign_note"
            label="Reason Notes"
            multiline
            rows={3}
            paddingX={0}
            placeholder="Enter Reason Notes"
            formik={formik}
          />
          <div className="flex items-center justify-end gap-4 py-2">
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
