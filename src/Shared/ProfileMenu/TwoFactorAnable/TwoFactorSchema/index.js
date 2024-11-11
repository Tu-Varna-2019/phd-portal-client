import * as Yup from "yup"

export const TwoFactorSchema = Yup.object({
  otp: Yup.string().min(5, "OTP Must Be At Least 6 Characters.").required("OTP is required."),
})
