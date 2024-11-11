import { leadBySourceFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import { Pie } from "react-chartjs-2"
import { useQuery } from "react-query"

const LeadBySource = () => {
  const { data: leadBySources } = useQuery("leadBySources", () => leadBySourceFn())

  const leadBySourceData = {
    labels: leadBySources?.labels,
    datasets: [
      {
        data: leadBySources?.data,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  }

  return (
    <CustomDiv className="!px-40 !py-0">
      <Pie
        data={leadBySourceData}
        options={{ plugins: { legend: { position: "top", labels: { color: "black", font: { weight: 600 } } } } }}
      />
    </CustomDiv>
  )
}

export default LeadBySource
