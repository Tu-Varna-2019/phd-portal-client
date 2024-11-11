import { Add } from "@mui/icons-material"
import { addDepartmentFn, updateDepartmentFn } from "Services/HRM/Department"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"

const AddDepartment = ({ isAddPermit, setSelectDept, selectDept }) => {
  const [open, setOpen] = useState(false)
  const client = useQueryClient()
  const handleOpen = () => {
    isAddPermit ? setOpen(true) : toast.warning("You don't have permission for add department.")
  }

  const handleClose = () => {
    setOpen(false)
    setSelectDept({})
  }

  const { mutate: addDepartment, isLoading } = useMutation(addDepartmentFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("departments")
      handleClose()
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })
  const { mutate: updateDepartment, isLoading: isLoading1 } = useMutation(updateDepartmentFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("departments")
      handleClose()
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })
  const initialValues = {
    title: selectDept?.title || "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const formData = new FormData()
      if (selectDept?.id) {
        formData.append("department_id", selectDept?.id)
        formData.append("title", formik.values.title)
        updateDepartment(formData)
      } else {
        formData.append("title", formik.values.title)
        addDepartment(formData)
      }
    },
  })
  useEffect(() => {
    selectDept && Object.keys(selectDept)?.length !== 0 && handleOpen()
  }, [selectDept])

  return (
    <>
      <CustomButton size="medium" className="!px-5" startIcon={<Add />} onClick={handleOpen}>
        Department
      </CustomButton>

      <CustomModal
        title={selectDept?.id ? "Update Department" : "Add Department"}
        open={open}
        onClose={handleClose}
        className="!w-1/4"
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <CustomInput id="title" placeholder="Enter Department Name" label="Department Name" formik={formik} />

          <div className="flex justify-end gap-3 my-2">
            <CustomButton type="button" onClick={handleClose}>
              Cancel
            </CustomButton>
            <CustomButton isLoading={selectDept?.id ? isLoading1 : isLoading} type="submit">
              {selectDept?.id ? "Update" : "Add"}
            </CustomButton>
          </div>
        </form>
      </CustomModal>
    </>
  )
}

export default AddDepartment
