import axiosInstance from "Config/axio.config"
const followUp = `crm/followup-api/`
const followUpDetails = `crm/followup-details-api/`

export const followUpsFn = (reqBody) => {
  try {
    const response = axiosInstance.get(followUp, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const followUpDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(followUpDetails, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addFollowUpFn = (reqBody) => {
  try {
    const response = axiosInstance.post(followUp, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const updateFollowUpFn = (reqBody) => {
  try {
    const response = axiosInstance.put(followUp, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const changeFollowUpFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(followUp, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteFollowUpFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(followUp, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
