import { MenuItem, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { pendingTasksFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const PendingTaskReport = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [priority, setPriority] = useState("")

  const { data, isLoading } = useQuery(["pendingTasks", search, page, priority], () =>
    pendingTasksFn({ page, search, priority })
  )

  const pendingTasks = data?.data?.data

  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput type="search" placeholder="Search Tasks..." onChange={(event) => setSearch(event.target.value)} />
        <CustomSelect
          id="priority"
          placeholder="Select Priority"
          value={priority}
          className="!w-44"
          onChange={(event) => setPriority(event.target.value)}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </CustomSelect>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>Task ID</TableCell>
              <TableCell isHead>Name</TableCell>
              <TableCell isHead>Date</TableCell>
              <TableCell isHead>Deadline Date</TableCell>
              <TableCell isHead>Priority</TableCell>
              <TableCell isHead>Assigned User</TableCell>
              <TableCell isHead>Assignee</TableCell>
              <TableCell className="!border-r-0" isHead>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={7} />
            {pendingTasks?.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.task_no || "-"}</TableCell>
                <TableCell>{task.title || "-"}</TableCell>
                <TableCell>{moment(task.date).format("lll")}</TableCell>
                <TableCell>{moment(task.deadline_date).format("lll")}</TableCell>
                <TableCell>{task.priority || "-"}</TableCell>
                <TableCell>{task.created_by_name || "-"}</TableCell>
                <TableCell>{task.assigned_employee_name || "-"}</TableCell>
                <TableCell className="!border-r-0">{task.status || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={data} />
      <CustomPagination setPage={setPage} data={data} />
    </CustomDiv>
  )
}

export default PendingTaskReport
