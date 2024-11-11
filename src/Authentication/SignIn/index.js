import { useTheme } from "@mui/material"
import logo from "Resources/opraah-logo.png"
import { logInSchema } from "Schemas"
import { loginFn } from "Services/Login"
import { useAuthContext } from "Shared/AuthProvider"
import CustomButton from "Shared/CustomButton"
import CustomDiv from "Shared/CustomDiv"
import CustomInput from "Shared/CustomInput"
import { useFormik } from "formik"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const handleSetLocalStorage = (res) => {
  localStorage.setItem("token", res?.token)
  localStorage.setItem("role", res?.role)
}

const SignIn = () => {
  const [, setDepartment] = useAuthContext()
  const navigate = useNavigate()
  const { mutate: logIn } = useMutation(loginFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setDepartment(data.department)
      localStorage.setItem("token", data?.token)
      localStorage.setItem("role", data?.role)
      navigate("/dashboard")
    },
  })

  const initialValues = { username: "", password: "" }

  const formik = useFormik({
    initialValues,
    validationSchema: logInSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const reqBody = { username: values.username, password: values.password }
      logIn(reqBody)
    },
  })

  return (
    <div
      style={{ backgroundColor: useTheme().palette.primary["100"] }}
      className="flex flex-col items-center justify-center h-screen p-2"
    >
      <CustomDiv className="flex bg-slate-200 flex-col items-center gap-5 w-[500px] !p-12">
        <img src={logo} alt="" className="w-72" />
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <p className="text-xl font-semibold text-center">Welcome Back</p>
          <CustomInput
            id="username"
            isRequired
            label="Email Or Username"
            formik={formik}
            className="w-96"
            placeholder="mkx@aaratechnologies.in"
          />
          <div className="flex flex-col items-end">
            <CustomInput
              type="password"
              label="Password"
              id="password"
              isRequired
              className="w-96"
              formik={formik}
              placeholder="•••••••••••••••"
            />
            <Link to="/forget-password" style={{ color: useTheme().palette.primary.main }} className="underline">
              Forgot Password
            </Link>
          </div>
          <CustomButton type="submit">Login</CustomButton>
        </form>
      </CustomDiv>
    </div>
  )
}

export default SignIn
