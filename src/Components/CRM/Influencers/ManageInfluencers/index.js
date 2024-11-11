import { Close } from "@mui/icons-material"
import { MenuItem } from "@mui/material"
import { CountryStateCitySelect } from "Helpers"
import { addInfluencersFn, influencersDetailFn, updateInfluencersFn } from "Services/CRM/Influencers"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import { useFormik } from "formik"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const ManageInfluencers = () => {
  const { manage } = useParams()
  const { state: campaign_member_id } = useLocation()

  const isUpdate = manage === "update"

  const { data: influencersData } = useQuery(
    ["influencers", campaign_member_id],
    () => influencersDetailFn({ campaign_member_id }),
    { enabled: isUpdate }
  )

  const member = influencersData?.data?.data

  const navigate = useNavigate()

  const { mutate: addInfluencers, isLoading: isAdding } = useMutation(addInfluencersFn, {
    onSuccess: () => {
      navigate(-1)
      formik.resetForm()
    },
  })

  const { mutate: updateInfluencers, isLoading: isUpdating } = useMutation(updateInfluencersFn, {
    onSuccess: () => navigate(-1),
  })

  const initialValues = {
    name: member?.name || "",
    mobile: member?.mobile || "",
    email: member?.email || "",
    pincode: member?.pincode || "",
    area: member?.area || "",
    city_id: member?.city || "",
    state_id: member?.state || "",
    country_id: member?.country || "",
    gst_no: member?.gst_no || "",
    managed_by: member?.managed_by || "",
    agency: member?.agency || "",
    instagram: member?.instagram || "",
    youtube: member?.youtube || "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      isUpdate ? updateInfluencers({ campaign_member_id, ...formik.values }) : addInfluencers(formik.values)
    },
  })

  return (
    <CustomDiv className="w-full !p-0">
      <CustomDiv className="flex items-center justify-between !rounded-b-none !p-2">
        <p className="text-lg font-semibold">Influencers</p>
        <CustomIconButton onClick={() => navigate(-1)}>
          <Close />
        </CustomIconButton>
      </CustomDiv>

      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-3 p-3">
        <p className="text-lg font-semibold text-blue-600">Influencers Information</p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
          <CustomInput id="name" formik={formik} placeholder="Enter Name" label="Name" />
          <CustomInput id="mobile" formik={formik} placeholder="Enter Mobile" label="Mobile" />
          <CustomInput id="email" formik={formik} placeholder="Enter Email" label="Email" />
          <CustomInput id="pincode" formik={formik} placeholder="Enter Pincode" label="Pincode" />
          <CustomInput id="area" formik={formik} placeholder="Enter Area" label="Area" />
          <CustomInput id="gst_no" formik={formik} placeholder="Enter GST Number" label="GST Number" />
          <CountryStateCitySelect formik={formik} />
          <CustomSelect id="managed_by" formik={formik} placeholder="Select Managed By" label="Managed By">
            <MenuItem value="Direct">Direct</MenuItem>
            <MenuItem value="Agency">Agency</MenuItem>
          </CustomSelect>

          {formik.values.managed_by === "Agency" && (
            <CustomInput id="agency" formik={formik} placeholder="Enter Agency" label="Agency" />
          )}
          <CustomInput id="instagram" formik={formik} placeholder="Enter Instgram Channel" label="Instgram Channel" />
          <CustomInput id="youtube" formik={formik} placeholder="Enter YouTube Channel" label="YouTube Channel" />
        </div>
        <div className="flex justify-end gap-4 py-2">
          <CustomButton variant="contained" onClick={() => navigate(-1)}>
            Cancel
          </CustomButton>
          <CustomButton isLoading={isAdding || isUpdating} type="submit">
            Save
          </CustomButton>
        </div>
      </form>
    </CustomDiv>
  )
}

export default ManageInfluencers
