import { Close } from "@mui/icons-material"
import { MenuItem } from "@mui/material"
import { EmployeeSelect } from "Helpers"
import { addTaskFn, taskDetailFn, updateTaskFn } from "Services/CRM/Task"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import { useFormik } from "formik"
import moment from "moment"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ManageTask = () => {
  const { manage } = useParams()
  const { state: task_id } = useLocation()
  const isUpdate = manage === "update"

  const { data: tasks } = useQuery(["task", task_id], () => taskDetailFn({ task_id }), { enabled: isUpdate })

  const task = tasks?.data?.data

  const navigate = useNavigate()

  const { mutate: addTask, isLoading: isAdding } = useMutation(addTaskFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      formik.resetForm()
      navigate(-1)
    },
    onError: ({ response }) => toast.error(response.data.message),
  })

  const { mutate: updateTask, isLoading: isUpdating } = useMutation(updateTaskFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
    onError: ({ response }) => toast.error(response.data.message),
  })

  const initialValues = {
    employee_id: task?.assigned_to || "",
    title: task?.title || "",
    date: task?.date ? moment(task?.date).format("YYYY-MM-DD") : "",
    deadline_date: task?.deadline_date ? moment(task?.deadline_date).format("YYYY-MM-DD") : "",
    priority: task?.priority || "",
    description: task?.description || "",
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = { ...formik.values }
      isUpdate ? updateTask({ task_id, ...reqBody }) : addTask(reqBody)
    },
  })

  return (
    <CustomDiv className="w-full !p-0">
      <CustomDiv className="flex items-center justify-between rounded-b-none !p-1">
        <p className="text-lg font-semibold">Task</p>
        <CustomIconButton onClick={() => navigate(-1)}>
          <Close />
        </CustomIconButton>
      </CustomDiv>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-3 p-3">
        <p className="text-lg font-semibold text-blue-600">Task Information</p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
          <EmployeeSelect formik={formik} />

          <CustomInput id="title" formik={formik} placeholder="Enter Title" label="Title" />

          <CustomInput id="date" type="date" formik={formik} label="Date" />

          <CustomInput id="deadline_date" type="date" formik={formik} label="Deadline Date" />

          <CustomSelect id="priority" formik={formik} label="Priority" placeholder="Select Priority">
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </CustomSelect>
        </div>

        <p className="text-lg font-semibold text-blue-600">Description</p>

        <CustomInput id="description" rows="4" multiline={true} formik={formik} placeholder="Enter Descriptions" />

        <div className="flex justify-end gap-4 py-2">
          <CustomButton variant="contained" onClick={() => navigate(-1)}>
            Cancel
          </CustomButton>
          <CustomButton isLoading={isAdding || isUpdating} type="submit">
            Save
          </CustomButton>
        </div>
      </form>
    </CustomDiv>
  )
}

export default ManageTask
