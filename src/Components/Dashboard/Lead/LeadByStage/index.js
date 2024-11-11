import { leadByStageFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import { Pie } from "react-chartjs-2"
import { useQuery } from "react-query"

const LeadByStage = () => {
  const { data: leadByStage } = useQuery("leadByStage", () => leadByStageFn())

  const leadByStageData = {
    labels: leadByStage?.labels,
    datasets: [
      {
        data: leadByStage?.data,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  }

  return (
    <CustomDiv className="!px-40 !py-0">
      <Pie
        data={leadByStageData}
        options={{ plugins: { legend: { position: "top", labels: { color: "black", font: { weight: 600 } } } } }}
      />
    </CustomDiv>
  )
}

export default LeadByStage
