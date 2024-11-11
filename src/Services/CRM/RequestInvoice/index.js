import axiosInstance from "Config/axio.config"

export const requestInvoiceFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`invoice-request-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const uploadInvoiceFn = (reqBody) => {
  try {
    const response = axiosInstance.put(`invoice-attach-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const requestedInvoicesFn = (reqBody) => {
  try {
    const response = axiosInstance.get(reqBody.value == 1 ? `invoice-request-approval-api/` : "invoice-request-api/", {
      params: reqBody,
    })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const requestApprovalFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(`invoice-request-approval-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
