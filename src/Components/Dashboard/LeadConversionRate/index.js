import { leadConversionRateFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import { Line } from "react-chartjs-2"
import { useQuery } from "react-query"

const LeadConversionRate = () => {
  const { data: leadConversionRate } = useQuery("leadConversionRate", () => leadConversionRateFn())

  const labels = leadConversionRate?.labels

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: leadConversionRate?.data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  }

  return (
    <CustomDiv className="!p-2 flex w-[50%]">
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
              title: { display: true, text: "Conversion Rate (%)", font: { weight: 600 }, color: "black" },
              ticks: { color: "black", font: { weight: 600 } },
            },
            x: {
              title: { display: true, text: "Time (Months)", font: { weight: 600 }, color: "black" },
              ticks: { color: "black", font: { weight: 600 } },
            },
          },
        }}
      />
    </CustomDiv>
  )
}

export default LeadConversionRate
