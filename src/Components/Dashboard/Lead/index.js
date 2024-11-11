import { Divider } from "@mui/material"
import { getLeadCountFn, getTopLeadOwnerFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import Loader from "Shared/Loader"
import { useQuery } from "react-query"
import LeadBySource from "./LeadBySource"
import LeadByStage from "./LeadByStage"

const Lead = () => {
  const { data, isLoading } = useQuery(["leadCounter"], () => getLeadCountFn())

  const leads = data ? data.data : {}

  const { data: topLeadOwners, isLoading: isLoadingOwner } = useQuery(["topLeadOwners"], () => getTopLeadOwnerFn())

  const leadsOwners = topLeadOwners ? topLeadOwners.data.data : []

  return (
    <div className="flex flex-col h-full gap-2 py-2">
      <div className="flex w-full gap-2">
        <CustomDiv className="w-1/2 !p-0">
          <p className="p-3 font-semibold">ALL LEADS (COUNT)</p>
          <Divider />
          <div className="flex flex-col gap-2 p-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <Loader />
              </div>
            ) : (
              <>
                <CustomDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                  <p>TOTAL LEADS</p>
                  <p>{leads?.total_leads || 0}</p>
                </CustomDiv>
                <CustomDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                  <p>LAST WEEK LEADS</p>
                  <p>{leads?.thisweek || 0}</p>
                </CustomDiv>
                <CustomDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                  <p>TODAY LEADS</p>
                  <p>{leads?.todayleads || 0}</p>
                </CustomDiv>
              </>
            )}
          </div>
        </CustomDiv>

        <CustomDiv className="w-1/2 !p-0">
          <p className="p-3 font-semibold">TOP LEAD OWNERS</p>
          <Divider />
          <div className="flex flex-col gap-2 p-2">
            {isLoadingOwner ? (
              <div className="flex items-center justify-center h-32">
                <Loader />
              </div>
            ) : (
              leadsOwners?.map((i) => {
                return (
                  <CustomDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                    <p className="w-1/3 ">{i.lead_owner}</p>
                    <p>{i.total_leads}</p>
                  </CustomDiv>
                )
              })
            )}
          </div>
        </CustomDiv>
      </div>

      <div className="flex gap-2">
        <CustomDiv className="w-1/2 !p-0 border rounded-xl">
          <p className="p-3 font-semibold">LEAD BY SOURCE</p>
          <Divider />
          <div className="p-2">
            <LeadBySource />
          </div>
        </CustomDiv>
        <CustomDiv className="w-1/2 !p-0 border rounded-xl">
          <p className="p-3 font-semibold">LEAD BY STAGE</p>
          <Divider />
          <div className="p-2">
            <LeadByStage />
          </div>
        </CustomDiv>
      </div>
    </div>
  )
}
export default Lead
