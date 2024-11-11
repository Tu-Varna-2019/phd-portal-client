import { Avatar, MenuItem, Skeleton, useTheme } from "@mui/material"
import { activityLogsFn } from "Services/ActivityLogs"
import CustomDiv from "Shared/CustomDiv"
import CustomPagination from "Shared/CustomPagination"
import CustomSelect from "Shared/CustomSelect"
import { randomArray } from "Shared/RandomArray"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const ActivityLogs = () => {
  const [page, setPage] = useState(1)
  const [range, setRange] = useState("")

  const { data, isLoading } = useQuery(["activityLogs", page, range], () =>
    activityLogsFn({ page, day_type: range, limit: 8 })
  )
  const activityLogs = data?.data?.data

  return (
    <div className="flex flex-col gap-1">
      <CustomDiv className="flex items-center justify-between !p-2">
        <p className="font-semibold">My Activity Feed</p>
        <CustomSelect
          className="!w-72"
          value={range}
          onChange={(event) => setRange(event.target.value)}
          placeholder="Select Date Range"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Today">Today</MenuItem>
          <MenuItem value="Yesterday">Yesterday</MenuItem>
          <MenuItem value="This Week">This Week</MenuItem>
          <MenuItem value="Previous Week">Previous Week</MenuItem>
          <MenuItem value="This Month">This Month</MenuItem>
          <MenuItem value="Previous Month">Previous Month</MenuItem>
          <MenuItem value="This Quarter">This Quarter</MenuItem>
          <MenuItem value="Previous Quarter">Previous Quarter</MenuItem>
          <MenuItem value="This Year">This Year</MenuItem>
          <MenuItem value="Previous Year">Previous Year</MenuItem>
        </CustomSelect>
      </CustomDiv>
      {isLoading ? (
        randomArray(0, 6)?.map(() => {
          return (
            <CustomDiv className="flex items-end gap-2 !p-1 !px-3">
              <Skeleton className="!w-10 !h-20" />
              <div className="flex flex-col w-full">
                <Skeleton className="!w-52" />
                <Skeleton className="!w-full" />
                <Skeleton className="!w-64" />
              </div>
            </CustomDiv>
          )
        })
      ) : activityLogs?.length !== 0 ? (
        activityLogs?.map((activity) => {
          return (
            <CustomDiv className="flex gap-2 !p-2">
              <Avatar
                sx={{ backgroundColor: useTheme().palette.primary.main }}
                alt={activity.title}
                src="mkx"
                className="!rounded-lg"
              />
              <div className="flex flex-col">
                <p className="font-semibold capitalize">{activity.title || "Unknown"}</p>
                <p>{activity.content}</p>
                <p className="text-xs">{moment(activity.date).format("ll")}</p>
              </div>
            </CustomDiv>
          )
        })
      ) : (
        <>
          <CustomDiv className="flex gap-2 justify-center !p-2">No activity log found.</CustomDiv>
        </>
      )}
      <CustomDiv className="!p-2">
        <CustomPagination data={data} setPage={setPage} />
      </CustomDiv>
    </div>
  )
}

export default ActivityLogs
