import * as Yup from "yup"

export const logInSchema = Yup.object({
  username: Yup.string().required("Please Enter Your Email Or Username."),
  password: Yup.string().min(6, "Password Must Be At Least 6 Character.").required("Please Enter Your Password."),
})
