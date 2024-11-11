import { Add, DoDisturb, Edit } from "@mui/icons-material"
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { deleteInfluencersFn, influencersFn } from "Services/CRM/Influencers"
import { usePermission } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
import DeleteButton from "Shared/CustomConfimation"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Influencers = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const isAddPermit = usePermission("add_campaignmember")
  const isUpdatePermit = usePermission("change_campaignmember")
  const isDeletePermit = usePermission("delete_campaignmember")
  const isViewPermit = usePermission("view_campaignmember")

  const {
    data: influencersList,
    isLoading,
    refetch,
  } = useQuery(["influencersList", search, page, isViewPermit], () => influencersFn({ search, page }), {
    enabled: isViewPermit,
  })

  const influencers = influencersList?.data?.data

  const { handleClearSelection, handleSelectAll, handleSelectRow, selectedIds } = useRowSelection([], influencers)

  const { mutate: deleteInfluencers } = useMutation(deleteInfluencersFn, {
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
            placeholder="Search Influnecers..."
            value={search}
            type="search"
            onChange={(event) => setSearch(event.target.value)}
          />

          <span className="flex items-center gap-3">
            <DeleteButton
              isDelete={isDelete}
              onConfirm={() => deleteInfluencers({ campaign_member_ids: selectedIds })}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
            />
            <CustomButton
              startIcon={<Add />}
              onClick={() =>
                isAddPermit
                  ? navigate("/crm/influencers/add")
                  : toast.warn("You don't have permission for add influencer.")
              }
            >
              Influnecers
            </CustomButton>
          </span>
        </div>

        {isViewPermit ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHead>
                    <Checkbox size="small" onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell isHead>Name</TableCell>
                  <TableCell isHead>Mobile</TableCell>
                  <TableCell isHead>Email</TableCell>
                  <TableCell isHead>Pincode</TableCell>
                  <TableCell isHead>Area</TableCell>
                  <TableCell isHead>City</TableCell>
                  <TableCell isHead>State</TableCell>
                  <TableCell isHead>Country</TableCell>
                  <TableCell isHead>VRF Status</TableCell>
                  <TableCell isHead>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <CustomLoader loading={isLoading} row={10} />
                {influencers?.map((influencer) => {
                  return (
                    <TableRow key={influencer.id} className="hover:bg-white hover:bg-opacity-20">
                      <TableCell>
                        <Checkbox
                          size="small"
                          checked={selectedIds.includes(influencer.id)}
                          onChange={() => handleSelectRow(influencer.id)}
                        />
                      </TableCell>
                      <TableCell>{influencer.name || "-"}</TableCell>
                      <TableCell>{influencer.mobile || "-"}</TableCell>
                      <TableCell>{influencer.email || "-"}</TableCell>
                      <TableCell>{influencer.pincode || "-"}</TableCell>
                      <TableCell>{influencer.area || "-"}</TableCell>
                      <TableCell>{influencer.city_name || "-"}</TableCell>
                      <TableCell>{influencer.state_name || "-"}</TableCell>
                      <TableCell>{influencer.country_name || "-"}</TableCell>
                      <TableCell>{influencer.vrf_status}</TableCell>
                      <TableCell>
                        <CustomIconButton
                          color="success"
                          onClick={() =>
                            isUpdatePermit
                              ? navigate("/crm/influencers/update", { state: influencer.id })
                              : toast.warn("You don't have permission for update influencer.")
                          }
                        >
                          <Edit />
                        </CustomIconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <span className="flex flex-col items-center justify-center gap-5 p-5 text-lg font-semibold h-96">
            <DoDisturb color="error" className="!text-5xl" />
            You don't have permission for view influencers.
          </span>
        )}

        <NoDataFound data={influencersList} />
        <CustomPagination data={influencersList} setPage={setPage} />
      </CustomDiv>
    </>
  )
}

export default Influencers
