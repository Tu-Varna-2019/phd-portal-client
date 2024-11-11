import axiosInstance from "Config/axio.config"

export const leadGraphByTypeFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-yearly-lead-by-type-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leadPieGraphByTypeFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-lead-by-type-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leadPieGraphByStatusFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-lead-by-status-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leadLineGraphByStatusFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-yearly-lead-by-status-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leadConversionRateFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-lead-conversion-rate-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const campaignLineByStatusFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-yearly-campaign-by-status-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const campaignPieByStatusFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-campaign-by-status-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const campaignPieByTypeFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-campaign-by-type-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const getLeadCountFn = () => {
  try {
    const response = axiosInstance.get("report/dashborad-lead-count-api/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const getTopLeadOwnerFn = () => {
  try {
    const response = axiosInstance.get("report/dashborad-top-lead-owner-api/")
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leadByStageFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-lead-by-stage-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leadBySourceFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-lead-by-source-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const dealRevenueFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-revenue-deal-report-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const dealRevenueByUserFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-revenue-by-user-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const dealByStatusFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-deal-by-status-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const dealByLeadTypeFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-deal-amount-by-lead-type-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const dealByLeadSourceFn = async () => {
  try {
    const response = await axiosInstance.get("report/dashborad-deal-amount-by-lead-source-api/")
    return response.data
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
