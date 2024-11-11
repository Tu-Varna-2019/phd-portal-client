import axiosInstance from "Config/axio.config"

const leads = `crm/lead-api/`
const leadsData = `crm/converted-lead-data-api/`
const leadDetails = `crm/lead-details-api/`
const leadsPosData = `crm/lead-poc-api/`
const changePoc = `crm/change-lead-poc-api/`
const leadsStatus = `crm/change-lead-status-api/`

export const leadsFn = (reqbody) => {
  try {
    const response = axiosInstance.get(leads, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leadsDataFn = (reqbody) => {
  try {
    const response = axiosInstance.get(leadsData, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leadDetailsFn = (reqbody) => {
  try {
    const response = axiosInstance.get(leadDetails, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const createLeadFn = (reqBody) => {
  try {
    const response = axiosInstance.post(leads, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const updateLeadFn = (reqBody) => {
  try {
    const response = axiosInstance.put(leads, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const changeLeadStatusFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(leadsStatus, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteLeadFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(leads, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const changePocFn = (reqBody) => {
  try {
    const response = axiosInstance.put(changePoc, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leadsPocDataFn = (reqbody) => {
  try {
    const response = axiosInstance.get(leadsPosData, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
