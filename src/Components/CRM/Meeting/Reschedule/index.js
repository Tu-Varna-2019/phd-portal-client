import { updateMeetingFn } from "Services/CRM/Meeting"
import { usePermission } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import moment from "moment"
import { useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const Reschedule = ({ disbaled, meeting, refetch }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  const initialValues = {
    meeting_id: meeting?.id || "",
    date: meeting.date ? moment(meeting.date).format("YYYY-MM-DD") : "",
    from_time: meeting.from_time ? meeting.from_time?.slice(0, 5) : "",
    to_time: meeting.to_time ? meeting.to_time?.slice(0, 5) : "",
    description: meeting?.description || "",
  }

  const isChangePermit = usePermission("CRM", "change_leads_meeting")

  const { mutate: rescheduleMeeting, isLoading } = useMutation(updateMeetingFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
      setOpen(false)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      rescheduleMeeting(values)
    },
  })

  return (
    <>
      <CustomButton
        size="small"
        disabled={disbaled}
        onClick={() =>
          isChangePermit ? handleOpen() : toast.warn("You don't have permission for reschedule meeting.")
        }
      >
        Reschedule
      </CustomButton>
      <CustomModal open={open} title="Reschedule Meeting" setOpen={setOpen} className="!w-2/4" padding={4}>
        <form onSubmit={formik.handleSubmit}>
          <div className="!grid lg:!grid-cols-2 md:!grid-cols-2 !grid-cols-1 gap-5">
            <CustomInput label="Date" id="date" type="date" formik={formik} />

            <CustomInput id="from_time" formik={formik} label="From Time" type="time" />
            <CustomInput id="to_time" formik={formik} label="To Time" type="time" />
          </div>

          <div className="">
            <CustomInput
              label="Description"
              id="description"
              rows="4"
              multiline={true}
              formik={formik}
              placeholder="Enter description here..."
            />
          </div>

          <div className="flex flex-row justify-end gap-4 my-4">
            <CustomButton variant="contained" onClick={() => setOpen(false)}>
              Cancel
            </CustomButton>

            <CustomButton isLoading={isLoading} variant="contained" color="success" type="submit">
              Reschedule
            </CustomButton>
          </div>
        </form>
      </CustomModal>
    </>
  )
}

export default Reschedule
