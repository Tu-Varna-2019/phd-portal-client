import { Add } from "@mui/icons-material"
import { Checkbox, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs } from "@mui/material"
import { dealListFn, deleteDealFn } from "Services/CRM/Deal"
import { usePermission, useProfile } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
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
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import DealApproval from "./DealApproval"
import ViewPDF from "./ViewPDF"

const Deal = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [page, setPage] = useState(1)
  const [value, setValue] = useState(2)
  const [search, setSearch] = useState("")
  const { profile } = useProfile()
  const isAdmin = profile?.role === "Admin"
  const navigate = useNavigate()

  const isAddPermit = usePermission("add_deal")
  const isDeletePermit = usePermission("delete_deal")
  const isViewPermit = usePermission("view_deal")
  const isChangePermit = usePermission("change_deal")

  const handleChange = (_, newValue) => setValue(newValue)

  const {
    data: dealsList,
    isLoading,
    refetch,
  } = useQuery(["deals", search, page, isViewPermit, value], () => dealListFn({ search, page, value }), {
    enabled: isViewPermit,
  })

  const deals = dealsList?.data?.data

  const { handleClearSelection, handleSelectAll, handleSelectRow, selectedIds } = useRowSelection([], deals)

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
        <div className="flex items-center justify-between pt-2 pl-2">
          <div className="flex items-center gap-2">
            {!isAdmin && (
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Deal" value={2} />
                <Tab label="Deal For Approval" value={1} />
              </Tabs>
            )}
            <div className="flex items-center gap-3 pb-2">
              <CustomInput
                type="search"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Deals"
              />
            </div>
          </div>

          <span className="flex items-center gap-3 pb-2 pr-2">
            <DeleteButton
              isDelete={isDelete}
              onConfirm={() => deleteDeal({ deal_ids: selectedIds })}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
            />
            <CustomButton
              startIcon={<Add />}
              onClick={() =>
                isAddPermit ? navigate("/crm/deal/add") : toast.warn("You don't have permission for add deal.")
              }
            >
              Deal
            </CustomButton>
          </span>
        </div>

        <TableContainer hidden={!isViewPermit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>
                  <Checkbox size="small" onChange={handleSelectAll} />
                </TableCell>
                <TableCell isHead>Deal No</TableCell>
                <TableCell isHead>Deal Amount(INR)</TableCell>
                <TableCell isHead>Advance Amount(%)</TableCell>
                <TableCell isHead>Campaign Title</TableCell>
                <TableCell isHead>Start Date</TableCell>
                <TableCell isHead>Campaign Status</TableCell>
                <TableCell isHead>Description</TableCell>
                <TableCell isHead>Approval</TableCell>
                <TableCell isHead>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={9} />
              {deals?.map((deal) => {
                const campaign = deal?.campaign
                const isDisbaled = value === 1 || isAdmin || deal.approval_status === "Approved"
                return (
                  <TableRow key={deal.id} className="hover:bg-white hover:bg-opacity-20">
                    <TableCell>
                      <Checkbox
                        size="small"
                        checked={selectedIds.includes(deal.id)}
                        onChange={() => handleSelectRow(deal.id)}
                      />
                    </TableCell>
                    <TableCell
                      className="!text-blue-500 !cursor-pointer !font-bold"
                      onClick={() => navigate(`/crm/deal/detail/${deal.id}`, { state: deal.id })}
                    >
                      {deal.deal_no}
                    </TableCell>
                    <TableCell>{deal.deal_amount} INR</TableCell>
                    <TableCell>{deal.advance_amount}%</TableCell>
                    <TableCell>{campaign.campaign_title}</TableCell>
                    <TableCell>{moment(campaign.start_date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{campaign.campaign_status}</TableCell>
                    <TableCell>{deal.description}</TableCell>
                    <TableCell>
                      <DealApproval
                        isChangePermit={isChangePermit}
                        deal_status={deal.approval_status}
                        deal_id={deal.id}
                        refetch={refetch}
                        isVisible={value === 1 || isAdmin}
                      />
                    </TableCell>
                    <TableCell>
                      <ViewPDF isDisbaled={!isDisbaled} deal_id={deal.id} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPermission isPermit={isViewPermit} label="deals" />
        <NoDataFound data={dealsList} />
        <CustomPagination data={dealsList} setPage={setPage} />
      </CustomDiv>
    </>
  )
}

export default Deal
