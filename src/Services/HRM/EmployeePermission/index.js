import axiosInstance from "Config/axio.config"

const employeePermission = `employee-permission-api/`
const employeePermissionDetail = `employee-permission-details-api/`
const userPermission = `user-permission-api/`

export const getEmployeePermissionFn = (redBody) => {
  try {
    const response = axiosInstance.get(employeePermission, { params: redBody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const userPermissionsFn = (redBody) => {
  try {
    const response = axiosInstance.get(userPermission, { params: redBody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const updatePermissionFn = (redBody) => {
  try {
    const response = axiosInstance.put(employeePermission, redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const getPermissionDetailFn = (redBody) => {
  try {
    const response = axiosInstance.get(employeePermissionDetail, { params: redBody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
