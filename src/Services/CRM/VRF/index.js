import axiosInstance from "Config/axio.config"

export const fillVrfFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`crm/fill-vrf-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const vrfForApprovalFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/vrf-approval-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const vrfDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/vrf-details-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const vrfApprovalFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(`crm/vrf-approval-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
