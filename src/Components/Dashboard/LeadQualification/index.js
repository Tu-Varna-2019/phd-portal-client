import { leadLineGraphByStatusFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import { Line } from "react-chartjs-2"
import { useQuery } from "react-query"
import LeadConversionRate from "../LeadConversionRate"

const LeadQualification = () => {
  const { data: leadLineGraphByStatus } = useQuery("leadLineGraphByStatus", () => leadLineGraphByStatusFn())

  const labels = leadLineGraphByStatus?.labels
  const graphData = leadLineGraphByStatus?.data || []
  const discussion = graphData?.find((i) => i.lead_status === "In Discussion")
  const lost = graphData?.find((i) => i.lead_status === "Lost")
  const converted = graphData?.find((i) => i.lead_status === "Converted")

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "In Discussion",
        data: discussion?.data,
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 0.5)"],
        backgroundColor: "rgba(255, 99, 132, 0.3)",
      },
      {
        label: "Lost",
        data: lost?.data,
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(54, 162, 235, 0.5)"],
        backgroundColor: "rgba(54, 162, 235, 0.3)",
      },
      {
        label: "Converted",
        data: converted?.data,
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 0.5)"],
        backgroundColor: "rgba(75, 192, 192, 0.3)",
      },
    ],
  }

  return (
    <div className="flex gap-1">
      <CustomDiv className="flex !p-2 w-[50%]">
        <Line
          data={lineChartData}
          options={{
            plugins: {
              legend: { position: "top", labels: { color: "black", font: { weight: 600 } } },
              title: { display: true, color: "black", font: { weight: 600 } },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Number of Leads", font: { weight: 600 }, color: "black" },
                ticks: { color: "black", font: { weight: 600 } },
              },
              x: {
                beginAtZero: true,
                title: { display: true, text: "Time (Months)", font: { weight: 600 }, color: "black" },
                ticks: { color: "black", font: { weight: 600 } },
              },
            },
          }}
        />
      </CustomDiv>
      <LeadConversionRate />
    </div>
  )
}

export default LeadQualification
