import axiosInstance from "Config/axio.config"

export const tasksFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/task-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const employeeDataFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`hrm/employee-data-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const taskDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(`crm/task-details-api/`, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addTaskFn = (reqBody) => {
  try {
    const response = axiosInstance.post(`crm/task-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const updateTaskFn = (reqBody) => {
  try {
    const response = axiosInstance.put(`crm/task-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const changeTaskStatusFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(`crm/change-task-status-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const changeTaskAssignToFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(`crm/task-api/`, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteTaskFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(`crm/task-api/`, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
