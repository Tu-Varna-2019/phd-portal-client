import axiosInstance from "Config/axio.config"
const url = `role-api/`
const urlData = `role-data-api/`

export const rolesFn = (reqbody) => {
  try {
    const response = axiosInstance.get(url, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const rolesDataFn = (reqbody) => {
  try {
    const response = axiosInstance.get(urlData, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const deleteRolesFn = (reqbody) => {
  try {
    const response = axiosInstance.delete(url, { data: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const addRoleFn = (redBody) => {
  try {
    const response = axiosInstance.post(url, redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const updateRoleFn = (redBody) => {
  try {
    const response = axiosInstance.put(url, redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
