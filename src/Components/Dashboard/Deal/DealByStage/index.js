import { dealByStatusFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import { Pie } from "react-chartjs-2"
import { useQuery } from "react-query"

const DealByStage = () => {
  const { data: dealByStatus } = useQuery("dealByStatus", () => dealByStatusFn())

  const dealByStatusData = {
    labels: dealByStatus?.labels || [],
    datasets: [
      {
        data: dealByStatus?.data || [],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
      },
    ],
  }
  return (
    <>
      <CustomDiv className="flex !p-2">
        <Pie
          data={dealByStatusData}
          options={{ plugins: { legend: { position: "top", labels: { color: "black", font: { weight: 600 } } } } }}
        />
      </CustomDiv>
    </>
  )
}

export default DealByStage
