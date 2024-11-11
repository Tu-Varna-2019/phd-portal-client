import { Add } from "@mui/icons-material"
import { CampaignSelect, InfluencerSelect } from "Helpers"
import { requestInvoiceFn } from "Services/CRM/RequestInvoice"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const RequestForInvoice = ({ isAddPermit, refetch }) => {
  const [open, setOpen] = useState(false)
  const { mutate: requestInvoice, isLoading } = useMutation(requestInvoiceFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setOpen(false)
    },
  })

  const formik = useFormik({
    initialValues: { campaign_id: "", campaign_member_id: "", description: "" },
    onSubmit: (values) => {
      requestInvoice(values)
    },
  })
  return (
    <>
      <CustomButton
        startIcon={<Add />}
        onClick={() =>
          isAddPermit ? setOpen(true) : toast.warn("You don't have permission for approval request invoice.")
        }
      >
        Request Invoice
      </CustomButton>
      <CustomModal open={open} setOpen={setOpen} title="Request For Invoice" className="w-[500px]">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <CampaignSelect formik={formik} />
          <InfluencerSelect formik={formik} campaign_id={formik.values.campaign_id} />
          <CustomInput
            multiline
            rows={3}
            id="description"
            placeholder="Enter Description"
            label="Description"
            formik={formik}
          />
          <div className="flex justify-end py-2">
            <CustomButton isLoading={isLoading} loadingContent="Sending" type="submit">
              Submit Request
            </CustomButton>
          </div>
        </form>
      </CustomModal>
    </>
  )
}

export default RequestForInvoice
