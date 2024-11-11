import { Sync } from "@mui/icons-material"
import { IconButton, MenuItem, Tooltip } from "@mui/material"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { changeTaskStatusFn } from "Services/CRM/Task"
import CustomButton from "Shared/CustomButton"
import CustomModal from "Shared/CustomModal"
import CustomSelect from "Shared/CustomSelect"

export const taskStatus = ["New", "In Progress", "Completed", "Cancelled"]

const TaskStatus = ({ isUpdatePermit, task_id, task_status }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(task_status)
  const client = useQueryClient()

  const { mutate: changeTaskStatus } = useMutation(changeTaskStatusFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("tasksList")
      setOpen(false)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    changeTaskStatus({ task_id, task_status: value })
  }

  return (
    <>
      <Tooltip arrow placement="top" title="Change Task Status">
        <IconButton
          size="small"
          onClick={() => (isUpdatePermit ? setOpen(true) : toast.warn("You don't have permission for update task."))}
        >
          <Sync color="primary" />
        </IconButton>
      </Tooltip>

      <CustomModal open={open} setOpen={setOpen} title="Task Status" className="w-[430px]" padding={0}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-3">
          <CustomSelect
            id="task_status"
            label="Task Status"
            placeholder="Select Task Status"
            disabled={task_status === "Completed"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          >
            {taskStatus?.map((status) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </CustomSelect>

          <span className="flex items-center justify-center w-full p-3">
            <CustomButton disabled={task_status === "Completed"} type="submit">
              Proceed
            </CustomButton>
          </span>
        </form>
      </CustomModal>
    </>
  )
}

export default TaskStatus
