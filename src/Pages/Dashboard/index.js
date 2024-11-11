import CampaignAnalytics from "Components/Dashboard/CampaignAnalytics"
import LeadGraph from "Components/Dashboard/LeadGraph"
import LeadQualification from "Components/Dashboard/LeadQualification"

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-1 pt-1">
      <LeadGraph />
      <LeadQualification />
      <div className="flex gap-1">
        <CampaignAnalytics />
      </div>
    </div>
  )
}

export default Dashboard
