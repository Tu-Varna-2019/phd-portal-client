import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { campaignsFn } from "Services/CRM/Campaign"
import { deleteDealFn } from "Services/CRM/Deal"
import { usePermission } from "Settings"
import useRowSelection from "Shared"
import DeleteButton from "Shared/CustomConfimation"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import ManageStatus from "./ManageStatus"
import VideoTracker from "./VideoTracker"
import { useNavigate } from "react-router-dom"

export const Campaign = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [campaignId, setCampaignId] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const isDeletePermit = usePermission("delete_campaign")
  const isViewPermit = usePermission("view_campaign")
  const isChangePermit = usePermission("change_campaign")

  const {
    data: campaignsList,
    isLoading,
    refetch,
  } = useQuery(["campaigns", search, page, isViewPermit], () => campaignsFn({ search, page }), {
    enabled: isViewPermit,
  })

  const campaigns = campaignsList?.data?.data

  const { handleClearSelection, handleSelectAll, handleSelectRow, selectedIds } = useRowSelection([], campaigns)

  const { mutate: deleteDeal } = useMutation(deleteDealFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setIsDelete(false)
      handleClearSelection()
      refetch()
    },
  })

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex justify-between p-2">
          <CustomInput
            placeholder="Search Campaigns..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <span className="flex items-center gap-3">
            <DeleteButton
              isDelete={isDelete}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
              onConfirm={() =>
                isDeletePermit
                  ? deleteDeal({ deal_ids: selectedIds })
                  : toast.warn("You don't have permission for delete campaign.")
              }
            />
          </span>
        </div>

        <TableContainer hidden={!isViewPermit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>
                  <Checkbox size="small" onChange={handleSelectAll} />
                </TableCell>
                <TableCell isHead>Campaign No</TableCell>
                <TableCell isHead>Campaign Title</TableCell>
                <TableCell isHead>Deal No</TableCell>
                <TableCell isHead>Start Date</TableCell>
                <TableCell isHead>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={5} />
              {campaigns?.map((campaign) => {
                return (
                  <TableRow key={campaign.id} className="hover:bg-white hover:bg-opacity-20">
                    <TableCell>
                      <Checkbox
                        size="small"
                        checked={selectedIds?.includes(campaign.id)}
                        onChange={() => handleSelectRow(campaign.id)}
                      />
                    </TableCell>
                    <TableCell
                      className="!text-blue-500 !cursor-pointer !font-bold"
                      onClick={() => navigate(`/crm/campaign/detail/${campaign.id}`, { state: campaign.id })}
                    >
                      {campaign.campaign_no}
                    </TableCell>
                    <TableCell>{campaign.campaign_title}</TableCell>
                    <TableCell>{campaign.deal_no}</TableCell>
                    <TableCell>{moment(campaign.start_date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>
                      <ManageStatus
                        isChangePermit={isChangePermit}
                        campaign_id={campaign?.id}
                        refetch={refetch}
                        campaign_status={campaign?.campaign_status}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <CustomPermission isPermit={isViewPermit} label="campaigns" />
        <VideoTracker campaignId={campaignId} setCampaignId={setCampaignId} />
        <NoDataFound data={campaignsList} />
        <CustomPagination data={campaignsList} setPage={setPage} />
      </CustomDiv>
    </>
  )
}
