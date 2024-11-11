import { leadGraphByTypeFn, leadPieGraphByStatusFn, leadPieGraphByTypeFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import { Line, Pie } from "react-chartjs-2"
import { useQuery } from "react-query"

const LeadGraph = () => {
  const { data: leadGraphByType } = useQuery("leadGraphByType", () => leadGraphByTypeFn())

  const labels = leadGraphByType?.labels || []

  const graphData = leadGraphByType?.data || []

  const agencies = graphData?.find((i) => i.lead_type === "Agency")

  const brands = graphData?.find((i) => i.lead_type === "Brand")

  const freelancers = graphData?.find((i) => i.lead_type === "Freelancer")

  const { data: leadPieGraphByType } = useQuery("leadPieGraphByType", () => leadPieGraphByTypeFn())

  const labelsPie = leadPieGraphByType?.labels || []

  const labelsPieData = leadPieGraphByType?.data || []

  const { data: leadPieGraphByStatus } = useQuery("leadPieGraphByStatus", () => leadPieGraphByStatusFn())

  const labelsStatus = leadPieGraphByStatus?.labels

  const leadByStatus = leadPieGraphByStatus?.data

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Agency",
        data: agencies?.data,
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 0.5)"],
        backgroundColor: "rgba(255, 99, 132, 0.3)",
      },
      {
        label: "Brand",
        data: brands?.data,
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(54, 162, 235, 0.5)"],
        backgroundColor: "rgba(54, 162, 235, 0.3)",
      },
      {
        label: "Freelancer",
        data: freelancers?.data,
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(75, 192, 192, 0.5)"],
        backgroundColor: "rgba(75, 192, 192, 0.3)",
      },
    ],
  }

  const leadTypePieChart = {
    labels: labelsPie,
    datasets: [
      {
        data: labelsPieData,
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
      },
    ],
  }

  const pieChartData = {
    labels: labelsStatus,
    datasets: [{ data: leadByStatus, backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }],
  }

  return (
    <div className="flex gap-1">
      <CustomDiv className="flex !p-2 w-[25%]">
        <Pie
          data={leadTypePieChart}
          options={{ plugins: { legend: { position: "top", labels: { color: "black", font: { weight: 600 } } } } }}
        />
      </CustomDiv>
      <CustomDiv className="flex !p-2 w-[50%]">
        <Line
          data={lineChartData}
          options={{
            responsive: true,
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
      <CustomDiv className="flex !p-2 w-[25%]">
        <Pie
          data={pieChartData}
          options={{
            plugins: {
              legend: { position: "top", labels: { color: "black", font: { weight: 600 } } },
            },
          }}
        />
      </CustomDiv>
    </div>
  )
}

export default LeadGraph
