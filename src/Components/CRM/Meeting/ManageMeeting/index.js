import { Close, Groups } from "@mui/icons-material"
import MenuItem from "@mui/material/MenuItem"
import { campaignMembersFn } from "Services/CRM/Deal"
import { leadsDataFn } from "Services/CRM/Lead"
import { addMeetingFn } from "Services/CRM/Meeting"
import { employeeDataFn } from "Services/CRM/Task"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import { useFormik } from "formik"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const ManageMeeting = () => {
  const navigate = useNavigate()

  const { data: leadsData } = useQuery(["leadData"], () => leadsDataFn())

  const leads = leadsData?.data?.data

  const { data: membersData } = useQuery(["membersData"], () => campaignMembersFn())

  const members = membersData?.data?.data

  const { data: employeeData } = useQuery(["employeeData"], () => employeeDataFn())

  const employees = employeeData?.data?.data

  const { mutate: createMeeting, isLoading } = useMutation(addMeetingFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      formik.resetForm()
      navigate(-1)
    },
  })

  const initialValues = {
    title: "",
    date: "",
    from_time: "",
    to_time: "",
    description: "",
    location: "",
    lead_ids: [],
    campaign_member_ids: [],
    employee_ids: [],
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      createMeeting(values)
    },
  })

  return (
    <>
      <CustomDiv className="w-full !p-0">
        <CustomDiv className="flex items-center justify-between !rounded-b-none w-full !p-2">
          <div className="flex items-center gap-2">
            <Groups />
            <p className="text-lg font-semibold">Meeting</p>
          </div>

          <CustomIconButton onClick={() => navigate(-1)}>
            <Close color="error" />
          </CustomIconButton>
        </CustomDiv>

        <form onSubmit={formik.handleSubmit} className="w-full h-auto p-2 font-poppins">
          <p className="py-1 font-bold text-blue-800 ">Meeting Information</p>
          <div className="grid items-center grid-cols-1 gap-2 lg:grid-cols-2 md:grid-cols-2">
            <CustomInput
              isRequired
              className="!w-4/5"
              id="title"
              formik={formik}
              label="Title"
              placeholder="Enter Title"
            />
            <CustomInput isRequired className="!w-4/5" id="date" label="Meeting Date" type="date" formik={formik} />
            <CustomInput isRequired className="!w-4/5" id="from_time" label="From Time" type="time" formik={formik} />
            <CustomInput isRequired className="!w-4/5" id="to_time" label="To Time" type="time" formik={formik} />
            <CustomInput
              className="!w-4/5"
              id="location"
              isRequired
              formik={formik}
              label="Location"
              placeholder="Enter Location"
            />
          </div>
          <p className="py-1 font-bold text-blue-800">Participants</p>
          <div className="grid items-center grid-cols-1 gap-2 lg:grid-cols-2 md:grid-cols-2">
            <CustomSelect
              className="!w-4/5"
              multiple
              id="lead_ids"
              label="Leads"
              placeholder="Select Leads"
              formik={formik}
            >
              {leads?.map((lead) => {
                return (
                  <MenuItem
                    value={lead?.id}
                    className={formik.values.lead_ids?.includes(lead?.id) && "!bg-blue-500 !text-white"}
                  >
                    {lead.name} | {lead.email}
                  </MenuItem>
                )
              })}
            </CustomSelect>

            <CustomSelect
              className="!w-4/5"
              multiple
              id="campaign_member_ids"
              label="Members"
              formik={formik}
              placeholder="Select Members"
            >
              {members?.map((member) => {
                return (
                  <MenuItem
                    value={member?.id}
                    className={formik.values.campaign_member_ids?.includes(member?.id) && "!bg-blue-500 !text-white"}
                  >
                    {member?.name || ""} | {member?.email}
                  </MenuItem>
                )
              })}
            </CustomSelect>

            <CustomSelect
              className="!w-4/5"
              multiple
              id="employee_ids"
              label="Employees"
              formik={formik}
              placeholder="Select Employees"
            >
              {employees?.map((employee) => {
                return (
                  <MenuItem
                    value={employee?.id}
                    className={formik.values.employee_ids?.includes(employee?.id) && "!bg-blue-500 !text-white"}
                  >
                    {employee?.name || ""} | {employee?.email}
                  </MenuItem>
                )
              })}
            </CustomSelect>
          </div>

          <CustomInput
            id="description"
            rows="4"
            isRequired
            label="Description"
            multiline={true}
            placeholder="Enter Description.."
            formik={formik}
          />

          <div className="flex justify-end gap-4 py-2">
            <CustomButton
              variant="contained"
              className="p-2 px-10 border rounded-xl "
              sx={{ color: "white" }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </CustomButton>
            <CustomButton
              isLoading={isLoading}
              variant="contained"
              className="p-2 px-10 border rounded-xl "
              sx={{ color: "white" }}
              type="submit"
            >
              Save
            </CustomButton>
          </div>
        </form>
      </CustomDiv>
    </>
  )
}

export default ManageMeeting
