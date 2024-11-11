import axiosInstance from "Config/axio.config"

export const influencersFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-member-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const influencersDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-member-details-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addInfluencersFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`crm/campaign-member-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateInfluencersFn = (reqBody) => {
  try {
    const response = axiosInstance.put(`crm/campaign-member-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteInfluencersFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(`crm/campaign-member-api/`, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
