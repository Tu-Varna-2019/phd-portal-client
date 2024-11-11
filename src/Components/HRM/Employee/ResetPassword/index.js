import { resetPasswordFn } from "Services/HRM/Employee"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomModal from "Shared/CustomModal"
import { useFormik } from "formik"
import { useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const ResetPassword = ({ employee_id }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const { mutate: resetPassword, isLoading } = useMutation(resetPasswordFn, {
    onSuccess: (response) => {
      toast.success(response.data.message)
      handleClose()
      formik.resetForm("")
    },
  })

  const initialValues = { new_password: "", confirm_password: "" }

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const reqBody = {
        employee_id: employee_id,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      }
      resetPassword(reqBody)
    },
  })

  return (
    <>
      <CustomButton size="small" onClick={handleOpen}>
        Reset
      </CustomButton>

      <CustomModal open={open} onClose={handleClose} setOpen={setOpen} className="!w-[530px]" title="Reset Password">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <CustomInput
            id="new_password"
            formik={formik}
            type="password"
            isRequired
            label="New Password"
            placeholder="••••••••••••"
          />
          <CustomInput
            formik={formik}
            id="confirm_password"
            type="password"
            isRequired
            label="Confirm Password"
            placeholder="••••••••••••"
          />
          <CustomButton isLoading={isLoading} type="submit" className="!mt-5 !w-full !flex !justify-center !mx-auto">
            reset
          </CustomButton>
        </form>
      </CustomModal>
    </>
  )
}

export default ResetPassword
