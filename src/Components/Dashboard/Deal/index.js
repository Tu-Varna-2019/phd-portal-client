import { Divider } from "@mui/material"
import { dealByLeadSourceFn, dealByLeadTypeFn, dealRevenueFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import Loader from "Shared/Loader"
import { Bar } from "react-chartjs-2"
import { useQuery } from "react-query"
import DealByStage from "./DealByStage"
import RevenueByUser from "./RevenueByUser"
export const options = {
  responsive: true,
  plugins: {
    legend: { position: "top", labels: { color: "black", font: { weight: 600 } } },
    title: { display: true, color: "black", font: { weight: 600 } },
  },
  scales: {
    x: { ticks: { color: "black", font: { weight: 600 } } },
    y: { ticks: { color: "black", font: { weight: 600 } } },
  },
}

const colors = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
]

export default function Deal() {
  const { data: dealRevenue, isLoading: isRevenue } = useQuery(["revenueMonthCount"], () => dealRevenueFn())

  const { data: dealByLeadSource } = useQuery(["dealByLeadSource"], () => dealByLeadSourceFn())

  const { data: dealByLeadType } = useQuery(["dealByLeadType"], () => dealByLeadTypeFn())

  const dealByLeadSourceDataGraph = {
    labels: dealByLeadSource?.labels,
    datasets: [
      {
        label: "AMOUNT BY LEAD SOURCE",
        data: dealByLeadSource?.data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  }

  const amountByLoadStageGraph = {
    labels: dealByLeadType?.labels,
    datasets: [
      {
        label: "AMOUNT BY LEAD STAGE",
        data: dealByLeadType?.data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="flex flex-col w-full gap-2 py-2">
      <div className="flex gap-2">
        <div className="grid w-1/3 gap-2">
          <CustomDiv className="flex flex-col h-full !p-0">
            <p className="p-3 font-semibold">REVENUE THIS MONTH</p>
            <Divider />
            <div className="flex items-center justify-center p-5 text-5xl text-center">
              {isRevenue ? <Loader /> : dealRevenue?.revenue}
            </div>
          </CustomDiv>

          <CustomDiv className="flex flex-col h-full !p-0">
            <p className="p-3 font-semibold">DEALS CREATED</p>
            <Divider />
            <div className="flex items-center justify-center p-5 text-5xl text-center">
              {isRevenue ? <Loader /> : dealRevenue?.deals}
            </div>
          </CustomDiv>

          <CustomDiv className="flex flex-col h-full !p-0">
            <p className="p-3 font-semibold">REVENUE LOST</p>

            <Divider />
            <div className="flex items-center justify-center p-5 text-5xl text-center">
              {isRevenue ? <Loader /> : dealRevenue?.revenue_lost}
            </div>
          </CustomDiv>
        </div>

        <CustomDiv className="w-1/3 !p-0">
          <p className="p-3 font-semibold">REVENUE BY USERS</p>

          <Divider />
          <RevenueByUser />
        </CustomDiv>

        <CustomDiv className="w-1/3 !p-0 h-fit">
          <p className="p-3 font-semibold">Deal By Status</p>

          <Divider />
          <div className="p-3">
            <DealByStage />
          </div>
        </CustomDiv>
      </div>
      <div className="flex w-full gap-2">
        <CustomDiv className="!p-0 w-1/2">
          <div className="flex justify-between p-3">
            <p className="font-semibold">DEAL BY LEAD SOURCE</p>
          </div>
          <Divider />
          <div className="px-4 pb-4">
            <Bar data={dealByLeadSourceDataGraph} options={options} />
          </div>
        </CustomDiv>

        <CustomDiv className="!p-0 w-1/2">
          <div className="flex justify-between p-3">
            <p className="font-semibold">DEAL BY LEAD TYPE</p>
          </div>
          <Divider />
          <div className="px-4 pb-4">
            <Bar data={amountByLoadStageGraph} options={options} />
          </div>
        </CustomDiv>
      </div>
    </div>
  )
}
