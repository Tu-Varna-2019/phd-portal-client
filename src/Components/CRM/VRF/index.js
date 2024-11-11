import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { vrfForApprovalFn } from "Services/CRM/VRF"
import { usePermission } from "Settings"
import useRowSelection from "Shared"
import CustomDiv from "Shared/CustomDiv"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import { useState } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import VRFApproval from "./VRFApproval"

const VRF = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const isUpdatePermit = usePermission("change_vrf")
  const isViewPermit = usePermission("view_vrf")

  const { data, isLoading, refetch } = useQuery(
    ["vrfForApproval", search, page, isViewPermit],
    () => vrfForApprovalFn({ search, page }),
    { enabled: isViewPermit }
  )
  const vrfs = data?.data?.data

  const { selectedIds, handleSelectAll, handleSelectRow } = useRowSelection([], vrfs)

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between p-2">
          <CustomInput
            placeholder="Search VRF Approval..."
            type="search"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <TableContainer hidden={!isViewPermit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>
                  <Checkbox size="small" onChange={handleSelectAll} />
                </TableCell>
                <TableCell isHead>Campaign Member</TableCell>
                <TableCell isHead>Business</TableCell>
                <TableCell isHead>Vendor Name</TableCell>
                <TableCell isHead>Service Type</TableCell>
                <TableCell isHead>Artist Name</TableCell>
                <TableCell isHead>House No</TableCell>
                <TableCell isHead>Street</TableCell>
                <TableCell isHead>MSME No</TableCell>
                <TableCell isHead>MSME Registered</TableCell>
                <TableCell isHead>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CustomLoader loading={isLoading} row={10} />
              {vrfs?.map((vrf, index) => (
                <TableRow key={vrf.id || index}>
                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={selectedIds.includes(vrf.id)}
                      onChange={() => handleSelectRow(vrf.id)}
                    />
                  </TableCell>
                  <TableCell>{vrf.campaign_member}</TableCell>
                  <TableCell>{vrf.business}</TableCell>
                  <TableCell
                    className="!text-blue-700 hover:underline !cursor-pointer"
                    onClick={() => navigate(`/crm/vrf/detail/${vrf.id}`)}
                  >
                    {vrf.vendor_name}
                  </TableCell>
                  <TableCell>{vrf.service_type}</TableCell>
                  <TableCell>{vrf.artist_name}</TableCell>
                  <TableCell>{vrf.house_no}</TableCell>
                  <TableCell>{vrf.street}</TableCell>
                  <TableCell>{vrf.msme_no}</TableCell>
                  <TableCell>{vrf.msme_register}</TableCell>
                  <TableCell>
                    <VRFApproval
                      isUpdatePermit={isUpdatePermit}
                      refetch={refetch}
                      vrf_id={vrf.id}
                      vrf_status={vrf.vrf_status}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPermission isPermit={isViewPermit} label="VRFs" />
        <NoDataFound data={data} />
        <CustomPagination data={data} setPage={setPage} />
      </CustomDiv>
    </>
  )
}

export default VRF
