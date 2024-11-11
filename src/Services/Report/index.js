import axiosInstance from "Config/axio.config"

export const leadsReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/lead-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const closuresReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/lead-closure-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const lostLeadsReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/lead-lost-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const revenueReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/revenue-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const profitReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/profit-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const pendingTasksFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/task-pending-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const receivablesBillsFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/receivable-bill-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const payablesBillsFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/payable-bill-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const employeeReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/employee-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const newEmployeeReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/month-new-employee-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const dateWiseAttendanceReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/date-wise-attendance-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const monthWiseAttendanceReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/month-wise-attendance-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const leaveReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/leave-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
export const salaryReportFn = (reqbody) => {
  try {
    const response = axiosInstance.get("report/salary-report-api/", { params: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
