import { Tab, Tabs } from "@mui/material"
import TabPanel from "Shared/TabPanel"
import TabProvider from "Shared/TabProvider"
import { useState } from "react"
import AttendaceMonthWise from "./AttendaceMonthWise"
import AttendanceDateWise from "./AttendanceDateWise"
import CustomDiv from "Shared/CustomDiv"

const Attendance = () => {
  const [value, setValue] = useState("1")

  const handleChange = (_, newValue) => setValue(newValue)

  return (
    <TabProvider value={value} className="flex !p-0 flex-col">
      <Tabs value={value} onChange={handleChange} component={CustomDiv} className="!p-0">
        <Tab label="Date Wise" value="1" />
        <Tab label="Month Wise" value="2" />
      </Tabs>
      <TabPanel value="1" className="py-1">
        <AttendanceDateWise />
      </TabPanel>
      <TabPanel value="2" className="py-1">
        <AttendaceMonthWise />
      </TabPanel>
    </TabProvider>
  )
}
export default Attendance
