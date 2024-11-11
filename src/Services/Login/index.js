import axios from "Config/axio.config"

export const loginFn = (reqBody) => {
  try {
    const response = axios.post("user-login-with-password-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const forgetPasswordFn = (reqBody) => {
  try {
    const response = axios.post("hrm/forgot-password-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const confirmOTPFn = (reqBody) => {
  try {
    const response = axios.put("hrm/forgot-password-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const resetPasswordFn = (reqBody) => {
  try {
    const response = axios.patch("hrm/forgot-password-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
