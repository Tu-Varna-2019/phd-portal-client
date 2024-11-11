import { Divider, MenuItem } from "@mui/material"
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js"
import React, { useState } from "react"
import { Bar } from "react-chartjs-2"
import { useQuery } from "react-query"
import CustomSelect from "../../../Shared/CustomSelect"
import CustomDiv from "../../../Shared/CustomDiv"
import { filters } from "../../../Mock"
import { leadsGrpahFn } from "../../../Services/Dashboard/LeadsGraph"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const LeadsGraph = () => {
  const [range, setRange] = useState("")
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "black",
          font: {
            weight: 600,
          },
        },
      },
      title: {
        display: true,
        color: "black",
        font: {
          weight: 600,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black",
          font: {
            weight: 600,
          },
        },
      },
      y: {
        ticks: {
          color: "black",
          font: {
            weight: 600,
          },
        },
      },
    },
  }
  const { data: leadsGraph } = useQuery(
    ["leadsGraph", range],
    () =>
      leadsGrpahFn({
        selected_range: range === "All" ? "" : range,
      }),
    {
      refetchOnWindowFocus: false,
    }
  )
  const CRM = leadsGraph?.data
  const data = {
    labels: CRM?.labels,
    datasets: [
      {
        label: "Leads Vs Deals",
        data: [CRM?.total_count_leads, CRM?.total_count_deals],
        backgroundColor: ["#35A29F", "#FF6969", "#FFC436"],
      },
    ],
  }
  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <p className="text-xl font-semibold">CRM</p>
        <CustomSelect
          className="min-w-[180px]"
          value={range || "All"}
          onChange={(event) => setRange(event.target.value)}
        >
          {filters?.map((filter) => {
            return <MenuItem value={filter}>{filter}</MenuItem>
          })}
        </CustomSelect>
      </div>
      <Divider />
      <div className="p-2">
        <Bar options={options} data={data} />
      </div>
    </CustomDiv>
  )
}

export default LeadsGraph
