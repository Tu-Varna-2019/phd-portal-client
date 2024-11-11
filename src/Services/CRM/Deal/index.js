import axiosInstance from "Config/axio.config"
const dealApproval = "crm/deal-approval-api/"
const deal = "crm/deal-api/"

export const dealListFn = (reqBody) => {
  try {
    const response = axiosInstance.get(reqBody.value == 1 ? dealApproval : deal, {
      params: reqBody,
    })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const dealDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/deal-details-api/`, { params: reqBody })
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

export const campaignMembersFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-member-data-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const campaignMembersDataFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`influencer-campaign-data-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addDealFn = (reqBody) => {
  try {
    const response = axiosInstance.post(deal, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateDealFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(deal, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteDealFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(deal, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const dealApprovalFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(dealApproval, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
