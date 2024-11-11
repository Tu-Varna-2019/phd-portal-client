import { useTheme } from "@mui/material"
import logo from "Resources/opraah-logo.png"
import { confirmOTPFn, forgetPasswordFn, resetPasswordFn } from "Services/Login"
import Choice from "Shared/Choice"
import CustomButton from "Shared/CustomButton"
import CustomDiv from "Shared/CustomDiv"
import CustomInput from "Shared/CustomInput"
import { useFormik } from "formik"
import { useState } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const ForgetPassword = () => {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const { mutate: forgetPassword, isLoading: isForgetLoading } = useMutation(forgetPasswordFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setPage(2)
      formik1.setFieldValue("otp", "")
    },
  })

  const { mutate: confirmOTP, isLoading: isConfirmLoading } = useMutation(confirmOTPFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setPage(3)
    },
  })

  const { mutate: resetPassword, isLoading: isResetLoading } = useMutation(resetPasswordFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate("/")
    },
  })

  const initialValues = { email: "" }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      forgetPassword(values)
    },
  })

  const initialValues1 = { otp: "" }

  const formik1 = useFormik({
    initialValues: initialValues1,
    enableReinitialize: true,
    onSubmit: (values) => {
      confirmOTP({ ...values, email: formik.values.email })
    },
  })

  const initialValues2 = { new_password: "", confirm_password: "" }

  const formik2 = useFormik({
    initialValues: initialValues2,
    enableReinitialize: true,
    onSubmit: (values) => {
      resetPassword({ ...values, email: formik.values.email })
    },
  })

  return (
    <div
      style={{ backgroundColor: useTheme().palette.primary["100"] }}
      className="flex flex-col items-center justify-center h-screen p-2"
    >
      <CustomDiv className="flex flex-col items-center gap-5 !p-12 w-[500px]">
        <img src={logo} alt="" className="w-72" />
        <Choice.When condition={page === 1}>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <p className="text-xl font-semibold text-center">Forgot Password</p>
            <p className="text-center">
              Please enter the email address associated with your account. We'll send you a one time password on your
              email.
            </p>
            <CustomInput id="email" isRequired label="Email" formik={formik} placeholder="mkx@aaratechnologies.in" />
            <CustomButton loadingContent="Please Wait..." isLoading={isForgetLoading} type="submit">
              Send OTP
            </CustomButton>
          </form>
        </Choice.When>
        <Choice.When condition={page === 2}>
          <form onSubmit={formik1.handleSubmit} className="flex flex-col gap-5">
            <p className="text-xl font-semibold text-center">Forgot Password</p>
            <p className="text-center">
              We've sent a verification code to your email {formik.values.email}. Please enter the code below to reset
              your password.{" "}
              <span
                onClick={() => setPage(1)}
                style={{ color: useTheme().palette.primary.main }}
                className="underline cursor-pointer"
              >
                Wrong Email
              </span>
            </p>
            <CustomInput id="otp" isRequired label="OTP" formik={formik1} placeholder="000000" />
            <span
              onClick={formik.handleSubmit}
              style={{ color: useTheme().palette.primary.main }}
              className="underline cursor-pointer"
            >
              Resend OTP
            </span>
            <CustomButton loadingContent="Please Wait..." isLoading={isConfirmLoading} type="submit">
              Confirm OTP
            </CustomButton>
          </form>
        </Choice.When>
        <Choice.When condition={page === 3}>
          <form onSubmit={formik2.handleSubmit} className="flex flex-col gap-5">
            <p className="text-xl font-semibold text-center">Reset Password</p>
            <CustomInput
              id="new_password"
              formik={formik2}
              type="password"
              isRequired
              label="New Password"
              placeholder="Enter new password"
            />
            <CustomInput
              formik={formik2}
              id="confirm_password"
              type="password"
              isRequired
              label="Confirm Password"
              placeholder="Re-enter new password"
            />
            <CustomButton loadingContent="Please Wait..." isLoading={isResetLoading} type="submit">
              Reset Password
            </CustomButton>
          </form>
        </Choice.When>
      </CustomDiv>
    </div>
  )
}

export default ForgetPassword
