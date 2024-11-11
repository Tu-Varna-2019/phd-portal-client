import { Close } from "@mui/icons-material"
import { Divider, useTheme } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import { CountryStateCitySelect } from "Helpers"
import { leadSorceList } from "Mock"
import { createLeadFn, leadDetailsFn, leadsPocDataFn, updateLeadFn } from "Services/CRM/Lead"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import { useFormik } from "formik"
import { useRef } from "react"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"

const ManageLead = () => {
  const { manage } = useParams()
  const { state: lead_id } = useLocation()
  const isUpdate = manage === "update"
  const formRef = useRef()

  const { data } = useQuery(["lead"], () => leadDetailsFn({ lead_id }), { enabled: isUpdate })

  const lead = data?.data?.data

  const navigate = useNavigate()

  const { mutate: createLead, isLoading: isAdding } = useMutation(createLeadFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
      formik.resetForm()
    },
  })

  const { mutate: updateLead, isLoading: isUpdating } = useMutation(updateLeadFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
  })

  const initialValues = {
    leads_pic: "",
    brand: lead?.brand || "",
    mobile: lead?.mobile || "",
    lead_source: lead?.lead_source || "",
    lead_status: lead?.lead_status || "",
    email: lead?.email || "",
    area: lead?.area || "",
    state_id: lead?.state || "",
    country_id: lead?.country || "",
    city_id: lead?.city || "",
    pincode: lead?.pincode || "",
    description: lead?.description || "",
    front_poc_id: lead?.front_poc || "",
    back_poc_id: lead?.back_poc || "",
    gst_no: lead?.gst_no || "",
    lead_type: lead?.lead_type || "Brand",
    agency: lead?.agency || "",
    freelancer: lead?.freelancer || "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      mobile: Yup.string().length(10, "Mobile Number must be exactly 10 digits.").required("Mobile Number is Required"),
      email: Yup.string().email("It is not look like an email").required("Email Number is Required"),
      pincode: Yup.string().length(6, "Pin/Zip must be exactly 6 digits"),
    }),
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = new FormData(formRef.current)
      isUpdate && reqBody.append("lead_id", lead_id)
      reqBody.append("country_id", formik.values.country_id)
      reqBody.append("state_id", formik.values.state_id)
      reqBody.append("city_id", formik.values.city_id)
      isUpdate ? updateLead(reqBody) : createLead(reqBody)
    },
  })

  const { data: leadsPocData } = useQuery(["leadsPocData"], () => leadsPocDataFn())

  const primaryPOCs = leadsPocData?.data?.data

  const secondaryPOCs = leadsPocData?.data?.data

  return (
    <>
      <CustomDiv className="w-full !p-0">
        <CustomDiv className="flex items-center justify-between !rounded-b-none !p-2">
          <p className="text-lg font-semibold">Lead</p>
          <CustomIconButton
            onClick={() => {
              navigate(-1)
              formik.resetForm()
            }}
          >
            <Close />
          </CustomIconButton>
        </CustomDiv>
        <form ref={formRef} onSubmit={formik.handleSubmit} className="w-full p-2">
          <CustomDiv className="flex flex-col gap-1 lg:w-1/2">
            <p style={{ color: useTheme().palette.primary.main }} className="text-lg">
              Lead Image{" "}
            </p>
            <span className="flex items-center gap-2">
              <CustomButton size="small" component="label">
                Choose File
                <input
                  type="file"
                  hidden
                  id="leads_pic"
                  accept="image/png, image/jpeg"
                  name="leads_pic"
                  onChange={(event) => formik.setFieldValue("leads_pic", event.target.files[0])}
                />
              </CustomButton>
              <p className="overflow-x-hidden text-ellipsis whitespace-nowrap w-52">
                {formik.values.leads_pic?.name ? formik.values.leads_pic?.name : "No File Choosen"}
              </p>
            </span>
          </CustomDiv>
          <Divider sx={{ color: useTheme().palette.primary.main }} className="py-1 font-bold">
            OpraahFx Information
          </Divider>
          <div className="grid grid-cols-1 ">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 md:grid-cols-2">
              <CustomSelect id="front_poc_id" formik={formik} label="Primary POC" placeholder="Select Primary POC">
                {primaryPOCs?.map((poc) => (
                  <MenuItem key={poc?.id} value={poc?.id}>
                    {poc.name}
                  </MenuItem>
                ))}
              </CustomSelect>

              <CustomSelect id="back_poc_id" formik={formik} label="Secondary POC" placeholder="Select Secondary POC">
                {secondaryPOCs?.map((poc) => (
                  <MenuItem key={poc?.id} value={poc?.id}>
                    {poc.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </div>
            <Divider sx={{ color: useTheme().palette.primary.main }} className="py-1 font-bold">
              Brand/Agency Information
            </Divider>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 md:grid-cols-2">
              <CustomSelect id="lead_type" formik={formik} label="Lead Type" placeholder="Select Lead TypeC">
                <MenuItem value="Brand">Brand</MenuItem>
                <MenuItem value="Agency">Agency</MenuItem>
                <MenuItem value="Freelancer">Freelancer</MenuItem>
              </CustomSelect>

              {formik.values.lead_type === "Agency" && (
                <CustomInput id="agnecy" formik={formik} placeholder="Enter Agency" label="Agency" />
              )}

              {formik.values.lead_type === "Freelancer" && (
                <CustomInput id="freelancer" formik={formik} placeholder="Enter Freelancer" label="Freelancer" />
              )}

              <CustomInput id="brand" formik={formik} placeholder="Enter Brand" label="Brand" />

              <CustomInput id="email" type="email" formik={formik} label="Email" placeholder="Enter Your Email" />

              <CustomInput id="mobile" formik={formik} label="Mobile" type="number" placeholder="Enter Mobile" />

              <CustomInput id="gst_no" formik={formik} label="GST Number" placeholder="Enter GST Number" />

              <CustomSelect
                id="lead_source"
                formik={formik}
                label="Source"
                options={leadSorceList}
                placeholder="Select Source"
              />

              <CountryStateCitySelect formik={formik} />

              <CustomInput id="area" formik={formik} label="Area" placeholder="Enter Area" />

              <CustomInput id="pincode" type="number" formik={formik} label="Pincode" placeholder="Enter Pincode" />
            </div>
            <Divider sx={{ color: useTheme().palette.primary.main }} className="py-1 font-bold">
              Description
            </Divider>

            <CustomInput id="description" rows="4" multiline={true} formik={formik} placeholder="Enter Description.." />

            <div className="flex items-center justify-end gap-4 py-2">
              <CustomButton
                variant="contained"
                className="!p-2 !px-10"
                onClick={() => {
                  navigate(-1)
                  formik.resetForm()
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                isLoading={isAdding || isUpdating}
                variant="contained"
                className="!p-2 !px-10"
                type="submit"
              >
                Save
              </CustomButton>
            </div>
          </div>
        </form>
      </CustomDiv>
    </>
  )
}

export default ManageLead
