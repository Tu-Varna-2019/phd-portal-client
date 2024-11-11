import { Add, Close } from "@mui/icons-material"
import { Checkbox, Divider, MenuItem, useTheme } from "@mui/material"
import { LeadSelect } from "Helpers"
import { addDealFn, campaignMembersFn, dealDetailFn, updateDealFn } from "Services/CRM/Deal"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import SearchAndSelect from "Shared/SearchAndSelect"
import { useFormik } from "formik"
import moment from "moment"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ManageDeal = () => {
  const { manage } = useParams()
  const { state: deal_id } = useLocation()
  const [data, setData] = useState([
    {
      campaign_type: "Instagram",
      campaign_member_id: "",
      youtube: [
        {
          campaign_member_id: "",
          campaign_subtype: "Integrated video",
          campaign_type: "YouTube",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Dedicated video",
          campaign_type: "YouTube",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Community post",
          campaign_type: "YouTube",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Live Stream",
          campaign_type: "YouTube",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Shorts",
          campaign_type: "YouTube",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
      ],
      instagram: [
        {
          campaign_member_id: "",
          campaign_subtype: "Reel",
          campaign_type: "Instagram",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Story",
          campaign_type: "Instagram",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Live",
          campaign_type: "Instagram",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Post",
          campaign_type: "Instagram",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Broadcast",
          campaign_type: "Instagram",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
      ],
      other: [
        {
          campaign_member_id: "",
          campaign_subtype: "One Day shoot",
          campaign_type: "Other",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Discord post",
          campaign_type: "Other",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Tweet",
          campaign_type: "Other",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Content Usage Rights",
          campaign_type: "Other",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
        {
          campaign_member_id: "",
          campaign_subtype: "Custom",
          campaign_type: "Other",
          payout: "",
          no_of_videos: "",
          other_type: "",
          status: false,
        },
      ],
    },
  ])

  const isUpdate = manage === "update"

  const { data: deals } = useQuery(["deal", deal_id], () => dealDetailFn({ deal_id }))

  const deal = deals?.data?.data

  const navigate = useNavigate()

  const { mutate: addDeal, isLoading: isAdding } = useMutation(addDealFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
      formik.resetForm()
    },
  })

  const { mutate: updateDeal, isLoading: isUpdating } = useMutation(updateDealFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
  })

  const instagram = data?.flatMap((i) => i.instagram)
  const youtube = data?.flatMap((i) => i.youtube)
  const other = data?.flatMap((i) => i.other)

  const campaign_data = [...instagram, ...youtube, ...other].filter((i) => i.status)
  const total_payout = campaign_data?.reduce((acc, curr) => acc + Number(curr.payout), 0)

  const initialValues = {
    lead_id: deal?.lead || "",
    deal_amount: deal?.deal_amount || "",
    advance_amount: deal?.advance_amount || 0,
    remaining_amount: deal?.remaining_amount || "",
    campaign_title: deal?.campaign?.campaign_title || "",
    description: deal?.description || "",
    start_date: moment(deal?.start_date).format("YYYY-MM-DD") || "",
    campaign_data: deal?.campaign_data || "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        ...formik.values,
        campaign_data,
        advance_payment: formik.values.advance_amount ? true : false,
        advance_payment_date: formik.values.advance_amount !== 0 ? moment().format("YYYY-MM-DD hh:mm:ss") : "",
        after_campaign_payment: formik.values.remaining_amount ? true : false,
      }
      isUpdate ? updateDeal({ deal_id, ...reqBody }) : addDeal(reqBody)
    },
  })

  const handleAdvanceAmountChange = (e) => {
    let value = parseFloat(e.target.value)
    value = Math.min(Math.max(value, 0), 100)
    formik.setFieldValue("advance_amount", value)
    formik.setFieldValue("remaining_amount", 100 - value)
  }

  const { data: creatorsData } = useQuery(["campaignMembers"], () => campaignMembersFn())

  const creators = creatorsData?.data?.data?.map((i) => ({ label: i.name, value: i.id }))

  const handleValueChange = (index, key, value) => {
    const updatedData = [...data]
    updatedData[index][key] = value
    const campaign_member_id = updatedData[index]["campaign_member_id"]
    updatedData[index]["instagram"] = data[index]["instagram"]?.map((i) => ({ ...i, campaign_member_id }))
    updatedData[index]["youtube"] = data[index]["youtube"]?.map((i) => ({ ...i, campaign_member_id }))
    updatedData[index]["other"] = data[index]["other"]?.map((i) => ({ ...i, campaign_member_id }))
    setData(updatedData)
  }

  const handleCheckBox = (index, subIndex, key, value) => {
    const updatedData = [...data]
    const currentIndexData = updatedData[index][key][subIndex]
    currentIndexData["status"] = value
    setData(updatedData)
  }

  const handleSubValueChange = (index, subIndex, key, subKey, value) => {
    const updatedData = [...data]
    const currentIndexData = updatedData[index][key][subIndex]
    currentIndexData[subKey] = value
    setData(updatedData)
  }

  useEffect(() => {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    const dueDate = new Date(currentDate)
    const term = formik.values.payment_term
    if (term === "Post completion 15 days") {
      dueDate.setDate(currentDate.getDate() + 15)
    } else if (term === "Post completion 30 days") {
      dueDate.setDate(currentDate.getDate() + 30)
    } else if (term === "Post completion 45 days") {
      dueDate.setDate(currentDate.getDate() + 45)
    } else if (term === "Post completion 90 days") {
      dueDate.setDate(currentDate.getDate() + 90)
    } else {
      dueDate.setDate(currentDate.getDate())
    }
    formik.setFieldValue("due_payment_date", moment(dueDate).format("YYYY-MM-DD"))
  }, [formik.values.payment_term])
  const theme = useTheme()
  return (
    <CustomDiv className="w-full !p-0">
      <CustomDiv className="flex items-center justify-between !rounded-b-none !p-2">
        <p className="text-lg font-semibold">Deal</p>
        <CustomIconButton onClick={() => navigate(-1)}>
          <Close />
        </CustomIconButton>
      </CustomDiv>
      <Divider />
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-3 p-3">
        <p style={{ color: theme.palette.primary.main }} className="text-lg font-semibold">
          Deal Information
        </p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
          <LeadSelect formik={formik} />
          <CustomInput
            id="deal_amount"
            formik={formik}
            type="number"
            placeholder="Enter Deal Amount"
            label="Deal Amount(INR)"
            className="mkx"
          />
          <CustomInput
            id="advance_amount"
            type="number"
            placeholder="Enter Advance Amount(%)"
            label="Advance(%)"
            value={formik.values.advance_amount}
            onChange={handleAdvanceAmountChange}
          />
          {formik.values.advance_amount !== 100 && (
            <>
              <CustomSelect label="Payment Term" placeholder="Select Payment Term" id="payment_term" formik={formik}>
                <MenuItem value="Post completion 15 days">Post completion 15 days</MenuItem>
                <MenuItem value="Post completion 30 days">Post completion 30 days</MenuItem>
                <MenuItem value="Post completion 45 days">Post completion 45 days</MenuItem>
                <MenuItem value="Post completion 90 days">Post completion 90 days</MenuItem>
                <MenuItem value="Custom">Custom</MenuItem>
              </CustomSelect>
              <CustomInput
                label="Due Payment date"
                disabled={formik.values.payment_term !== "Custom"}
                type="date"
                id="due_payment_date"
                formik={formik}
              />
            </>
          )}
        </div>
        <p style={{ color: theme.palette.primary.main }} className="text-lg font-semibold">
          Campaign Information
        </p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
          <CustomInput id="campaign_title" formik={formik} placeholder="Enter Campaign Title" label="Campaign Title" />
          <CustomInput type="date" id="start_date" formik={formik} label="Start Date" />
        </div>
        <p style={{ color: theme.palette.primary.main }} className="text-lg font-semibold">
          Influncers Information
        </p>
        <div className="flex flex-col items-start w-full gap-1 border-t border-black border-opacity-20">
          {data?.map((influencer, index) => {
            return (
              <div className="flex items-start w-full gap-4 py-2 border-b border-black border-opacity-20">
                <SearchAndSelect
                  value={influencer.campaign_member_id}
                  options={creators || []}
                  className="!w-72"
                  setValue={(value) => handleValueChange(index, "campaign_member_id", value)}
                />

                <CustomSelect
                  id="campaign_type"
                  placeholder="Select Type Of Campaign"
                  className="!w-40"
                  value={influencer.campaign_type}
                  onChange={(event) => handleValueChange(index, "campaign_type", event.target.value)}
                >
                  <MenuItem value="Instagram">Instagram</MenuItem>
                  <MenuItem value="YouTube">YouTube</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </CustomSelect>

                <div className="flex flex-col gap-1">
                  {influencer.campaign_type === "Instagram" &&
                    influencer?.instagram?.map((instagram, subIndex) => {
                      return (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            size="small"
                            checked={instagram.status}
                            onChange={(event) => handleCheckBox(index, subIndex, "instagram", event.target.checked)}
                          />
                          <p className="font-bold w-44">{instagram.campaign_subtype}</p>
                          <CustomInput
                            id="no_of_videos"
                            type="number"
                            paddingY={1}
                            value={instagram.no_of_videos}
                            className="!w-24 mkx"
                            placeholder="Videos"
                            onChange={(event) =>
                              handleSubValueChange(index, subIndex, "instagram", "no_of_videos", event.target.value)
                            }
                          />
                          <CustomInput
                            id="payout"
                            type="number"
                            paddingY={1}
                            value={instagram.payout}
                            className="!w-40 mkx"
                            placeholder="Payout"
                            InputProps={{ startAdornment: <p className="pl-2 !font-teko">₹</p> }}
                            onChange={(event) =>
                              handleSubValueChange(index, subIndex, "instagram", "payout", event.target.value)
                            }
                          />
                        </div>
                      )
                    })}
                  {influencer.campaign_type === "YouTube" &&
                    influencer?.youtube?.map((youtube, subIndex) => {
                      return (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={youtube.status}
                            size="small"
                            onChange={(event) => handleCheckBox(index, subIndex, "youtube", event.target.checked)}
                          />
                          <p className="font-bold w-44">{youtube.campaign_subtype}</p>

                          <CustomInput
                            id="no_of_videos"
                            type="number"
                            paddingY={1}
                            value={youtube.no_of_videos}
                            className="!w-24 mkx"
                            placeholder="Videos"
                            onChange={(event) =>
                              handleSubValueChange(index, subIndex, "youtube", "no_of_videos", event.target.value)
                            }
                          />
                          <CustomInput
                            id="payout"
                            type="number"
                            paddingY={1}
                            value={youtube.payout}
                            className="!w-40 mkx"
                            placeholder="Payout"
                            InputProps={{ startAdornment: <p className="pl-2 !font-teko">₹</p> }}
                            onChange={(event) =>
                              handleSubValueChange(index, subIndex, "youtube", "payout", event.target.value)
                            }
                          />
                        </div>
                      )
                    })}
                  {influencer.campaign_type === "Other" &&
                    influencer?.other?.map((other, subIndex) => {
                      return (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            size="small"
                            checked={other.status}
                            onChange={(event) => handleCheckBox(index, subIndex, "other", event.target.checked)}
                          />
                          <p className="font-bold w-44">{other.campaign_subtype}</p>
                          <CustomInput
                            id="other_type"
                            value={other.type}
                            className="!w-24 mkx"
                            paddingY={1}
                            placeholder="Type"
                            onChange={(event) =>
                              handleSubValueChange(index, subIndex, "other", "other_type", event.target.value)
                            }
                          />
                          <CustomInput
                            id="payout"
                            type="number"
                            value={other.payout}
                            className="!w-40 mkx"
                            paddingY={1}
                            placeholder="Payout"
                            InputProps={{ startAdornment: <p className="pl-2 !font-teko">₹</p> }}
                            onChange={(event) =>
                              handleSubValueChange(index, subIndex, "other", "payout", event.target.value)
                            }
                          />
                        </div>
                      )
                    })}
                </div>

                <CustomIconButton
                  color="error"
                  className="!mt-1"
                  onClick={() => setData((prev) => prev.filter((_, i) => i !== index))}
                >
                  <Close />
                </CustomIconButton>
              </div>
            )
          })}
          <div className="flex w-full py-1 font-bold border-b border-black border-opacity-20 justify-evenly">
            <p>Total Payout </p> <p className="!font-teko">₹{total_payout}</p>
          </div>
          <CustomButton
            variant="text"
            startIcon={<Add />}
            onClick={() =>
              setData((prev) => [
                ...prev,
                {
                  campaign_type: "Instagram",
                  campaign_member_id: "",
                  youtube: [
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Integrated video",
                      campaign_type: "YouTube",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Dedicated video",
                      campaign_type: "YouTube",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Community post",
                      campaign_type: "YouTube",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Live Stream",
                      campaign_type: "YouTube",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Shorts",
                      campaign_type: "YouTube",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                  ],
                  instagram: [
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Reel",
                      campaign_type: "Instagram",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Story",
                      campaign_type: "Instagram",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Live",
                      campaign_type: "Instagram",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Post",
                      campaign_type: "Instagram",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Broadcast",
                      campaign_type: "Instagram",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                  ],
                  other: [
                    {
                      campaign_member_id: "",
                      campaign_subtype: "One Day shoot",
                      campaign_type: "Other",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Discord post",
                      campaign_type: "Other",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Tweet",
                      campaign_type: "Other",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Content Usage Rights",
                      campaign_type: "Other",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                    {
                      campaign_member_id: "",
                      campaign_subtype: "Custom",
                      campaign_type: "Other",
                      payout: "",
                      no_of_videos: "",
                      other_type: "",
                      status: false,
                    },
                  ],
                },
              ])
            }
          >
            Influencer
          </CustomButton>
        </div>

        <p style={{ color: theme.palette.primary.main }} className="text-lg font-semibold">
          Description
        </p>

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

export default ManageDeal
