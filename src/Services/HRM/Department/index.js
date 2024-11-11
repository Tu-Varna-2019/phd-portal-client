import axiosInstance from "Config/axio.config"
const url = `department-api/`

export const departmentFn = (redBody) => {
  try {
    const response = axiosInstance.get(url, { params: redBody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
export const updateDepartmentFn = (redBody) => {
  try {
    const response = axiosInstance.put(url, redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const addDepartmentFn = (redBody) => {
  try {
    const response = axiosInstance.post(url, redBody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const deleteDepartmentFn = (redBody) => {
  try {
    const response = axiosInstance.delete(url, { data: redBody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
