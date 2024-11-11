import axiosInstance from "Config/axio.config"
const invoiceApproval = "invoice-approval-api/"
const invoice = "invoice-api/"

export const invoiceListFn = (reqBody) => {
  try {
    const response = axiosInstance.get(reqBody.value == 1 ? invoiceApproval : invoice, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const compaignsDataFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/campaign-data-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const invoiceDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`invoice-details-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addInvoiceFn = (reqBody) => {
  try {
    const response = axiosInstance.post(invoice, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateInvoiceFn = (reqBody) => {
  try {
    const response = axiosInstance.put(invoice, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const updateInvoiceStatusFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(invoice, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteInvoiceFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(invoice, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const invoiceApprovalFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(invoiceApproval, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
