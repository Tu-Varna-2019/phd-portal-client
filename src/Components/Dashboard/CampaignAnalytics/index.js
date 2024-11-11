import { campaignLineByStatusFn, campaignPieByStatusFn, campaignPieByTypeFn } from "Services/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import React from "react"
import { Line, Pie } from "react-chartjs-2"
import { useQuery } from "react-query"

const CampaignAnalytics = () => {
  const { data: campaignLineByStatus } = useQuery("campaignLineByStatus", () => campaignLineByStatusFn())
  const { data: campaignPieByStatus } = useQuery("campaignPieByStatus", () => campaignPieByStatusFn())
  const { data: campaignPieByType } = useQuery("campaignPieByType", () => campaignPieByTypeFn())

  const labels = campaignLineByStatus?.labels

  const campaignByStatusData = campaignLineByStatus?.data

  const inProgress = campaignByStatusData?.find((i) => i.campaign_status === "In Progress")
  const campleted = campaignByStatusData?.find((i) => i.campaign_status === "Campleted")

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "In Progress",
        data: inProgress?.data,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Campleted",
        data: campleted?.data,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  }

  const campaignPieByStatusData = {
    labels: campaignPieByStatus?.labels,
    datasets: [
      {
        data: campaignPieByStatus?.data,
        backgroundColor: ["#FF6384", "#36A2EB", "rgba(54, 162, 235, 1)"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "rgba(54, 162, 235, 1)"],
      },
    ],
  }
  const pieChartData = {
    labels: campaignPieByType?.labels,
    datasets: [
      {
        data: campaignPieByType?.data,
        backgroundColor: ["#FF6384", "#36A2EB", "#7EA1FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#7EA1FF"],
      },
    ],
  }

  return (
    <>
      <CustomDiv className="!p-2 flex w-[25%]">
        <Pie
          data={campaignPieByStatusData}
          options={{
            plugins: {
              legend: { position: "top", labels: { color: "black", font: { weight: 600 } } },
            },
          }}
        />
      </CustomDiv>
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
                title: { display: true, text: "No of Campaigns", font: { weight: 600 }, color: "black" },
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
      <CustomDiv className="!p-2 flex w-[25%]">
        <Pie
          data={pieChartData}
          options={{
            plugins: {
              legend: { position: "top", labels: { color: "black", font: { weight: 600 } } },
            },
          }}
        />
      </CustomDiv>
    </>
  )
}

export default CampaignAnalytics
