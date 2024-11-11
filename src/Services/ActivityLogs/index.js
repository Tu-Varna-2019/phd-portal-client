import axiosInstance from "Config/axio.config"

export const activityLogsFn = (reqbody) => {
  try {
    const response = axiosInstance.get(`report/activity-log-api/`, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
