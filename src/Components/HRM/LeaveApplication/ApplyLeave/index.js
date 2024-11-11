import { Add } from "@mui/icons-material"
import { MenuItem, Tab, Tabs } from "@mui/material"
import { applyLeaveApplicationFn, applyWFHFn } from "Services/HRM/LeaveApplication"
import CustomButton from "Shared/CustomButton"
import CustomDiv from "Shared/CustomDiv"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import CustomSelect from "Shared/CustomSelect"
import TabPanel from "Shared/TabPanel"
import TabProvider from "Shared/TabProvider"
import { useFormik } from "formik"
import { useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const ApplyLeave = ({ isAddPermit, refetch, isApplyForWFH }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(1)
  const initialValues = {
    subject: "",
    date_from: "",
    date_to: "",
    content: "",
    attachment: "",
    leave_type: "",
  }

  const { mutate: applyLeave, isLoading: isLoadingLeave } = useMutation(applyLeaveApplicationFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setOpen(false)
      refetch()
    },
  })

  const { mutate: applyWFH, isLoading: isLoadingWFH } = useMutation(applyWFHFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setOpen(false)
      refetch()
    },
  })

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const reqbody = new FormData()
      reqbody.append("subject", values.subject)
      reqbody.append("date_from", values.date_from)
      reqbody.append("date_to", values.date_to)
      reqbody.append("content", values.content)
      reqbody.append("attachment", values.attachment)
      reqbody.append("leave_type", values.leave_type)
      applyLeave(reqbody)
    },
  })
  const initialValuesForWFM = {
    date_from: "",
    date_to: "",
    content: "",
  }
  const formikForWFH = useFormik({
    initialValues: initialValuesForWFM,
    onSubmit: (values) => {
      const reqbody = new FormData()
      reqbody.append("date_from", values.date_from)
      reqbody.append("date_to", values.date_to)
      reqbody.append("content", values.content)
      applyWFH(reqbody)
    },
  })
  return (
    <>
      <CustomButton
        onClick={() => (isAddPermit ? setOpen(true) : toast.warn("You don't have permission for apply leave."))}
        startIcon={<Add />}
      >
        Leave/WFH Apply
      </CustomButton>

      <CustomModal open={open} title="Leave/WFH Apply" onClose={() => setOpen(false)} padding={0}>
        <TabProvider value={value} className="!py-0">
          <Tabs
            component={CustomDiv}
            className="!p-0 !rounded-none"
            value={value}
            onChange={(_, value) => setValue(value)}
          >
            <Tab label="Leave" value={1} />
            <Tab label="Work From Home" value={2} disabled={!isApplyForWFH} />
          </Tabs>

          <TabPanel value={1}>
            <form onSubmit={formik.handleSubmit} className="p-5">
              <div className="grid grid-cols-2 gap-5 pb-3">
                <CustomInput id="subject" label="Subject" placeholder="Enter Subject" formik={formik} />
                <CustomInput
                  type="file"
                  label="Attachment"
                  id="attachment"
                  onChange={(event) => formik.setFieldValue("attachment", event.target.files[0])}
                />
                <CustomSelect id="leave_type" label="Leave Type" placeholder="Select Leave Type" formik={formik}>
                  <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                  <MenuItem value="Maternity leave">Maternity leave</MenuItem>
                  <MenuItem value="Paternity Leave">Paternity Leave</MenuItem>
                  <MenuItem value="Privilege Leave">Privilege Leave</MenuItem>
                  <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                  <MenuItem value="Wedding Leave">Wedding Leave</MenuItem>
                </CustomSelect>

                <CustomInput id="date_from" label="From Date" formik={formik} type="date" />

                <CustomInput id="date_to" label="To Date" formik={formik} type="date" />
              </div>

              <CustomInput
                id="content"
                multiline
                rows={3}
                label="Description"
                placeholder="Enter Description"
                formik={formik}
              />

              <div className="flex justify-end py-4">
                <CustomButton type="submit" className="!px-4" isLoading={isLoadingLeave} loadingContent="Applying..">
                  Apply for Leave
                </CustomButton>
              </div>
            </form>
          </TabPanel>
          <TabPanel value={2}>
            <form onSubmit={formikForWFH.handleSubmit} className="p-5">
              <div className="grid grid-cols-2 gap-5 pb-3">
                <CustomInput id="date_from" label="From Date" formik={formikForWFH} type="date" />
                <CustomInput id="date_to" label="To Date" formik={formikForWFH} type="date" />
              </div>
              <CustomInput
                id="content"
                multiline
                rows={3}
                label="Description"
                placeholder="Enter Description"
                formik={formikForWFH}
              />

              <div className="flex justify-end py-4">
                <CustomButton type="submit" className="!px-4" isLoading={isLoadingWFH} loadingContent="Applying..">
                  Apply For WFH
                </CustomButton>
              </div>
            </form>
          </TabPanel>
        </TabProvider>
      </CustomModal>
    </>
  )
}

export default ApplyLeave
