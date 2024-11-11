import axiosInstance from "Config/axio.config"
const url = `hrm/employee-api/`
const urlDetail = `hrm/employee-details-api/`
const employeeAsset = "hrm/employee-asset-api/"

export const employeeFn = (reqbody) => {
  try {
    const response = axiosInstance.get(url, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const employeeAssetFn = (reqbody) => {
  try {
    const response = axiosInstance.get(employeeAsset, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const updateEmployeeAssetFn = (reqbody) => {
  try {
    const response = axiosInstance.put(employeeAsset, reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const employeeDetailFn = (reqbody) => {
  try {
    const response = axiosInstance.get(urlDetail, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const deleteEmployeeFn = (reqbody) => {
  try {
    const response = axiosInstance.delete(url, { data: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const addEmployeeFn = (reqbody) => {
  try {
    const response = axiosInstance.post(url, reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const updateEmployeeFn = (reqbody) => {
  try {
    const response = axiosInstance.put(url, reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const resetPasswordFn = (reqbody) => {
  try {
    const response = axiosInstance.post(`hrm/employee-password-reset-api/`, reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
