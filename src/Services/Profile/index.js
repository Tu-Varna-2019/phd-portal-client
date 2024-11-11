import axiosInstance from "Config/axio.config"

export const storeProfileFn = (reqBody) => {
  try {
    const response = axiosInstance.get("user-profile-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const updateProfileFn = (reqBody) => {
  try {
    const response = axiosInstance.post("user-profile-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const checkInCheckOutInDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get("hrm/employee-attendance-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const checkInCheckOutInFn = (reqBody) => {
  try {
    const response = axiosInstance.post("hrm/employee-attendance-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const notificationsFn = (reqBody) => {
  try {
    const response = axiosInstance.get("report/notification-api/", { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const readNotificationFn = (reqBody) => {
  try {
    const response = axiosInstance.patch("report/notification-api/", reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
