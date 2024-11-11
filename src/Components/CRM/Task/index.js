import { Add, DoDisturb, Edit } from "@mui/icons-material"
import { Checkbox, MenuItem, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { deleteTaskFn, tasksFn } from "Services/CRM/Task"
import { usePermission } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
import DeleteButton from "Shared/CustomConfimation"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AssignAnotherEmployee from "./AssignAnotherEmployee"
import TaskStatus, { taskStatus } from "./TaskStatus"

const Task = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")
  const navigate = useNavigate()

  const isAddPermit = usePermission("add_task")
  const isUpdatePermit = usePermission("change_task")
  const isDeletePermit = usePermission("delete_task")
  const isViewPermit = usePermission("view_task")

  const {
    data: tasksList,
    isLoading,
    refetch,
  } = useQuery(
    ["tasksList", search, page, priority, status, isViewPermit],
    () => tasksFn({ search, page, priority, status }),
    { enabled: isViewPermit }
  )

  const tasks = tasksList?.data?.data

  const { handleClearSelection, handleSelectAll, handleSelectRow, selectedIds } = useRowSelection([], tasks)

  const { mutate: deleteTask } = useMutation(deleteTaskFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setIsDelete(false)
      handleClearSelection()
      refetch()
    },
  })

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex justify-between p-2">
          <CustomInput
            placeholder="Search Task..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <span className="flex items-center gap-3">
            <DeleteButton
              isDelete={isDelete}
              onConfirm={() => deleteTask({ task_ids: selectedIds })}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
            />
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
            <CustomSelect
              id="status"
              placeholder="Select Status"
              value={status}
              className="!w-44"
              onChange={(event) => setStatus(event.target.value)}
            >
              {taskStatus?.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </CustomSelect>
            <CustomButton
              startIcon={<Add />}
              onClick={() =>
                isAddPermit ? navigate("/crm/task/add") : toast.warn("You don't have permission for add task.")
              }
            >
              Task
            </CustomButton>
          </span>
        </div>

        {isViewPermit ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHead>
                    <Checkbox size="small" onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell isHead>Task ID</TableCell>
                  <TableCell isHead>Name</TableCell>
                  <TableCell isHead>Date</TableCell>
                  <TableCell isHead>Deadline Date</TableCell>
                  <TableCell isHead>Priority</TableCell>
                  <TableCell isHead>Assigned User</TableCell>
                  <TableCell isHead>Status</TableCell>
                  <TableCell isHead>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <CustomLoader loading={isLoading} row={8} />
                {tasks?.map((task) => {
                  return (
                    <TableRow key={task.id} className="hover:bg-white hover:bg-opacity-20">
                      <TableCell>
                        <Checkbox
                          size="small"
                          checked={selectedIds.includes(task.id)}
                          onChange={() => handleSelectRow(task.id)}
                        />
                      </TableCell>
                      <TableCell>{task.task_no || "-"}</TableCell>
                      <TableCell>{task.title || "-"}</TableCell>
                      <TableCell>{moment(task.date).format("LL")}</TableCell>
                      <TableCell>{moment(task.deadline_date).format("LL")}</TableCell>
                      <TableCell>{task.priority || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-between px-3">
                          {task.assigned_employee_name || "-"}
                          <AssignAnotherEmployee
                            disabled={task.status === "Completed" || !isUpdatePermit}
                            employee_id={task.assigned_to}
                            task_id={task.id}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-between px-3">
                          {task.status || "-"}
                          <TaskStatus isUpdatePermit={isUpdatePermit} task_status={task.status} task_id={task.id} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <CustomIconButton
                          onClick={() =>
                            isUpdatePermit
                              ? navigate("/crm/task/update", { state: task.id })
                              : toast.warn("You don't have permission for update task.")
                          }
                        >
                          <Edit color="success" />
                        </CustomIconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <span className="flex flex-col items-center justify-center gap-5 p-5 text-lg font-semibold h-96">
            <DoDisturb color="error" className="!text-5xl" />
            You don't have permission for view tasks.
          </span>
        )}
        <NoDataFound data={tasksList} />
        <CustomPagination data={tasksList} setPage={setPage} />
      </CustomDiv>
    </>
  )
}

export default Task
