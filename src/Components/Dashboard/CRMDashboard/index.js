import { Tab, Tabs } from "@mui/material"
import Dashboard from "Pages/Dashboard"
import CustomDiv from "Shared/CustomDiv"
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js"
import React from "react"
import Deal from "../Deal"
import Lead from "../Lead"

Chart.register(
  ArcElement,
  LineElement,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Legend
)

export default function CrmDashboard() {
  const [value, setValue] = React.useState(2)
  const handleChange = (_, newValue) => setValue(newValue)

  return (
    <div className="flex flex-col h-full">
      <Tabs value={value} component={CustomDiv} className="!p-0" onChange={handleChange}>
        <Tab label="Lead Report" value={1} />
        <Tab label="Dashboard" value={2} />
        <Tab label="Deal Report" value={3} />
      </Tabs>
      {value === 1 && <Lead />}
      {value === 2 && <Dashboard />}
      {value === 3 && <Deal />}
    </div>
  )
}
