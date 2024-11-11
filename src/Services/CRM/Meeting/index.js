import axiosInstance from "Config/axio.config"
const meeting = `crm/meeting-api/`
const meetingDetails = `crm/meeting-details-api/`

export const meetingsFn = (reqBody) => {
  try {
    const response = axiosInstance.get(meeting, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const meetingDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(meetingDetails, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addMeetingFn = (reqBody) => {
  try {
    const response = axiosInstance.post(meeting, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const updateMeetingFn = (reqBody) => {
  try {
    const response = axiosInstance.put(meeting, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const changeMeetingFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(meeting, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteMeetingFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(meeting, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
