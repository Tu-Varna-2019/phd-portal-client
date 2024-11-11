import axiosInstance from "Config/axio.config"
const employeeAttendanceDateWise = `hrm/employee-attendance-date-wise-api/`
const employeeAttendanceMonthWise = `hrm/employee-attendance-month-wise-api/`

export const dateWiseAttendanceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(employeeAttendanceDateWise, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const dateWiseMarkAttendanceFn = (reqbody) => {
  try {
    const response = axiosInstance.post(employeeAttendanceDateWise, reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const monthWiseAttendanceFn = (reqbody) => {
  try {
    const response = axiosInstance.get(employeeAttendanceMonthWise, { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
