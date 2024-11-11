import { Divider, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { campaignDetailFn } from "Services/CRM/Campaign"
import CustomDiv from "Shared/CustomDiv"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

const CampaignDetail = () => {
  const { campaign_id } = useParams()

  const { data } = useQuery(["dealDetail", campaign_id], () => campaignDetailFn({ campaign_id }), {
    enabled: Boolean(campaign_id !== ":campaign_id"),
  })

  const campaign = data?.data?.data
  const deal = data?.data?.data?.deal
  const lead = data?.data?.data?.lead

  return (
    <div className="flex flex-col gap-2">
      <CustomDiv className="!p-2">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{campaign?.campaign_no}</p>
          <p className="text-sm text-black text-opacity-70">{moment(campaign?.created_date).format("lll")}</p>
        </div>
      </CustomDiv>
      <div className="flex gap-2">
        <CustomDiv className="flex flex-col w-1/3 gap-2 !p-2">
          <p className="font-bold text-blue-500">Campaign Detail</p>
          <Divider />
          <span className="flex justify-between">
            <span className="font-bold">Campaign No : </span> <span>{campaign?.campaign_no}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Title : </span> <span>{campaign?.campaign_title}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Status : </span> <span>{campaign?.campaign_status}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Campaign Date : </span>
            <span>{moment(campaign?.created_date).format("lll")}</span>
          </span>
          <Divider />
          <p className="font-bold text-blue-500">Deal Detail</p>
          <Divider />
          <span className="flex justify-between">
            <span className="font-bold">Deal No : </span> <span>{deal?.deal_no}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Deal Date : </span> <span>{moment(deal?.created_date).format("lll")}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Deal Amount : </span> <span>{deal?.deal_amount} INR</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Advanced Payment Amount : </span> <span>{deal?.advance_amount}%</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Payment Term : </span> <span>{deal?.payment_term}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Payment Date : </span>
            <span>{moment(deal?.due_payment_date).format("lll")}</span>
          </span>
          <Divider />

          <p className="font-bold text-blue-500">Lead Detail</p>
          <Divider />
          <span className="flex justify-between">
            <span className="font-bold">Lead Name : </span> <span>{lead?.name}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Lead Email : </span> <span>{lead?.email}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Lead Date : </span> <span>{moment(lead?.created_date).format("lll")}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Status : </span> <span>{lead?.lead_status}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Primary POC : </span> <span>{lead?.front_poc_name}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Secondary POC : </span> <span>{lead?.back_poc_name}</span>
          </span>
          <span className="flex justify-between">
            <span className="font-bold">Status : </span> <span>{lead?.lead_status}</span>
          </span>
        </CustomDiv>
        <CustomDiv className="flex flex-col !p-0 w-2/3">
          <p className="p-2 font-bold text-blue-500">Influncers Detail</p>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHead>Influncer Name</TableCell>
                  <TableCell isHead>Campaign Type</TableCell>
                  <TableCell isHead>No Of Videos</TableCell>
                  <TableCell className="!border-r-0" isHead>
                    Payout
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaign?.campaign_type_info?.map((influencer) => {
                  return (
                    <TableRow>
                      <TableCell>{influencer.influencer_name || "-"}</TableCell>
                      <TableCell>{influencer.campaign_type || "-"}</TableCell>
                      <TableCell>{influencer.no_of_videos || "-"}</TableCell>
                      <TableCell className="!border-r-0">{influencer.payout || "-"} INR</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomDiv>
      </div>
    </div>
  )
}

export default CampaignDetail
