import { Close } from "@mui/icons-material"
import { MenuItem } from "@mui/material"
import { addCampaignFn, campaignDetailFn, campaignMediaFn, updateCampaignFn } from "Services/CRM/Campaign"
import { campaignMembersFn } from "Services/CRM/Deal"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import { useFormik } from "formik"
import moment from "moment"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ManageCampaign = () => {
  const [inputs, setInputs] = useState([])
  const { manage } = useParams()
  const { state: campaign_id } = useLocation()
  const isUpdate = manage === "update"

  const { data: campaigns } = useQuery(["campaign", campaign_id], () => campaignDetailFn({ campaign_id }))

  const campaign = campaigns?.data?.data

  const navigate = useNavigate()

  const { mutate: addCampaign, isLoading: isAdding } = useMutation(addCampaignFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
  })

  const { mutate: updateCampaign, isLoading: isUpdating } = useMutation(updateCampaignFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
  })

  const initialValues = {
    lead_id: campaign?.lead || "",
    campaign_amount: campaign?.campaign_amount || "",
    advance_amount: campaign?.advance_amount || 0,
    after_campaign_amount: campaign?.after_campaign_amount || 100,
    campaign_type: campaign?.campaign?.campaign_type || "",
    campaign_title: campaign?.campaign?.campaign_title || "",
    description: campaign?.description || "",
    start_date: moment(campaign?.start_date).format("YYYY-MM-DD") || "",
    closing_date: moment(campaign?.closing_date).format("YYYY-MM-DD") || "",
    campaign_data: campaign?.campaign_data || "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        ...formik.values,
        campaign_data: formik.values.campaign_type === "Video" ? inputs : formik.values.campaign_data,
        adavance_payment: formik.values.advance_amount ? true : false,
        after_campaign_payment: formik.values.after_campaign_amount ? true : false,
      }
      isUpdate ? updateCampaign({ campaign_id, ...reqBody }) : addCampaign(reqBody)
    },
  })

  const { data: campaignMedia } = useQuery(["campaignMedia"], () => campaignMediaFn())

  const campaignMedias = campaignMedia?.data?.data

  useEffect(() => {
    const initialInputs = campaignMedias?.map((type) => ({ campaign_media_id: type.id, url: "" }))
    setInputs(
      isUpdate
        ? campaign?.campaign?.campaign_media?.map((i) => ({ campaign_media_id: i.campaign_media, url: i.url }))
        : initialInputs
    )
  }, [campaignMedias])

  const handleInputChange = (campaign_media_id, key, value) => {
    const newInputs = [...inputs]
    const index = newInputs?.findIndex((input) => input.campaign_media_id === campaign_media_id)
    if (index !== -1) {
      newInputs[index][key] = value
      setInputs(newInputs)
    }
  }
  const { data: campaignMembers } = useQuery(["campaignMembers"], () => campaignMembersFn())

  const members = campaignMembers?.data?.data
  return (
    <CustomDiv className="w-full !p-0">
      <CustomDiv className="flex items-center justify-between rounded-b-none !p-1">
        <p className="text-lg font-semibold">Campaign</p>
        <CustomIconButton onClick={() => navigate(-1)}>
          <Close />
        </CustomIconButton>
      </CustomDiv>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-3 p-3">
        <p className="text-lg font-semibold text-blue-600">Campaign Information</p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
          <CustomSelect id="deal_id" formik={formik} label="Deal" placeholder="Select Deal">
            {members?.map((member) => (
              <MenuItem key={member.id} value={member.id}>
                {member.name}
              </MenuItem>
            ))}
          </CustomSelect>

          <CustomInput id="campaign_title" formik={formik} placeholder="Enter Campaign Title" label="Campaign Title" />
          <CustomSelect id="campaign_type" formik={formik} label="Campaign Type" placeholder="Select Campaign Type">
            <MenuItem value="Video">Video</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </CustomSelect>
          {formik.values.campaign_type === "Video" &&
            campaignMedias.map((type) => (
              <div key={type.id}>
                <CustomInput
                  id={`${type.title}_${type.id}`}
                  placeholder={`Enter ${type.title} URL`}
                  label={`${type.title} URL`}
                  value={inputs?.find((input) => input.campaign_media_id === type.id)?.url || ""}
                  onChange={(e) => handleInputChange(type.id, "url", e.target.value)}
                />
              </div>
            ))}

          {formik.values.campaign_type === "Event" && (
            <CustomInput id="campaign_data" formik={formik} placeholder="Enter Event Name" label="Event Name" />
          )}

          <CustomInput type="date" id="start_date" formik={formik} label="Start Date" />
          <CustomInput type="date" id="closing_date" formik={formik} label="Closing Date" />
        </div>

        <p className="text-lg font-semibold text-blue-600">Description</p>

        <CustomInput id="description" rows="4" multiline={true} formik={formik} placeholder="Enter Descriptions" />

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

export default ManageCampaign
