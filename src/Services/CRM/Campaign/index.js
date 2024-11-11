import axiosInstance from "Config/axio.config"

export const campaignsFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const campaignTackerFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-tracker-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateTackerFn = (reqBody) => {
  try {
    const response = axiosInstance.put(`crm/campaign-tracker-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const changeMemberFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(`crm/change-campaign-member-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addTackerFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`crm/campaign-tracker-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const campaignDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-details-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const campaignMediaFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-media-data-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addCampaignFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`crm/campaign-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateCampaignFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(`crm/campaign-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const changeCampaignFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(`crm/campaign-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteCampaignFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(`crm/campaign-api/`, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
