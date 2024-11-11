import { Add } from "@mui/icons-material"
import { MenuItem } from "@mui/material"
import { useDataHRM } from "Services/HRM"
import { addRoleFn, updateRoleFn } from "Services/HRM/Role"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import CustomSelect from "Shared/CustomSelect"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"

const AddRole = ({ isAddPermit, setSelectRole, selectRole }) => {
  const [open, setOpen] = useState(false)

  const client = useQueryClient()

  const { departments, isLoading: isLoadingDepartments } = useDataHRM({ department_id: "" })

  const handleOpen = () => {
    isAddPermit ? setOpen(true) : toast.warning("You don't have permission for add designation.")
  }

  const handleClose = () => {
    setOpen(false)
    setSelectRole({})
  }

  const { mutate: addRole, isLoading } = useMutation(addRoleFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("roles")
      handleClose()
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const { mutate: updateRole, isLoading: isLoading1 } = useMutation(updateRoleFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("roles")
      handleClose()
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  const initialValues = { department_id: selectRole?.department || "", title: selectRole?.title || "" }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = { department_id: formik.values.department_id, title: formik.values.title }
      selectRole?.id ? updateRole({ ...reqBody, role_id: selectRole?.id }) : addRole(reqBody)
    },
  })

  useEffect(() => {
    selectRole && Object.keys(selectRole)?.length !== 0 && handleOpen()
  }, [selectRole])

  return (
    <>
      <CustomButton className="!px-5" startIcon={<Add />} onClick={handleOpen}>
        Designation
      </CustomButton>

      <CustomModal
        open={open}
        onClose={handleClose}
        title={selectRole?.id ? "Update Designation" : "Add Designation"}
        className="!w-[500px]"
        padding={4}
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <CustomSelect
            id="department_id"
            label="Department"
            isLoading={isLoadingDepartments}
            placeholder="Select Department"
            formik={formik}
          >
            {departments?.map((item) => (
              <MenuItem value={item?.id}>{item?.title}</MenuItem>
            ))}
          </CustomSelect>

          <CustomInput id="title" placeholder="Enter Designation" label="Designation" formik={formik} />

          <div className="flex justify-end gap-3 my-2">
            <CustomButton type="button" onClick={handleClose}>
              Cancel
            </CustomButton>
            <CustomButton isLoading={selectRole?.id ? isLoading1 : isLoading} type="submit">
              {selectRole?.id ? "Update Designation" : "Add Designation"}
            </CustomButton>
          </div>
        </form>
      </CustomModal>
    </>
  )
}

export default AddRole
