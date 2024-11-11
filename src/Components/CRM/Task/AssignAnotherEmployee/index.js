import { Assignment } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { EmployeeSelect } from "Helpers"
import { changeTaskAssignToFn } from "Services/CRM/Task"
import CustomButton from "Shared/CustomButton"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"

const AssignAnotherEmployee = ({ disabled, task_id, employee_id }) => {
  const [open, setOpen] = useState(false)
  const client = useQueryClient()

  const { mutate: changeTaskAssignTo } = useMutation(changeTaskAssignToFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("tasksList")
      setOpen(false)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const initialValues = { employee_id: employee_id || "" }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      changeTaskAssignTo({ task_id, ...formik.values })
    },
  })

  return (
    <>
      <Tooltip arrow placement="top" title={`Assign To`}>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <Assignment color="primary" />
        </IconButton>
      </Tooltip>

      <CustomModal open={open} setOpen={setOpen} title={`Assign To`} className="w-[430px]" padding={4}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <EmployeeSelect formik={formik} />
          <span className="flex items-center justify-center w-full p-3">
            <CustomButton disabled={disabled} type="submit">
              Proceed
            </CustomButton>
          </span>
        </form>
      </CustomModal>
    </>
  )
}

export default AssignAnotherEmployee
