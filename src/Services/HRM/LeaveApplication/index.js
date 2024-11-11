import axiosInstance from "Config/axio.config"
const url = `hrm/leave-application-api/`
const employeeLeave = `hrm/employee-leave-application-api/`
const applicationApproval = `hrm/leave-application-approval-api/`

export const leaveApplicationFn = (reqbody) => {
  try {
    const response = axiosInstance.get(reqbody.value === 1 ? url : reqbody.value === 2 ? employeeLeave : "", {
      params: reqbody,
    })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const deleteLeaveApplicationFn = (reqbody) => {
  try {
    const response = axiosInstance.delete(url, { data: reqbody })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const applyLeaveApplicationFn = (reqbody) => {
  try {
    const response = axiosInstance.post(employeeLeave, reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const applyWFHFn = (reqbody) => {
  try {
    const response = axiosInstance.post("hrm/employee-wfh-application-api/", reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const applicationApprovalFn = (reqbody) => {
  try {
    const response = axiosInstance.patch(applicationApproval, reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const adminApprovalFn = (reqbody) => {
  try {
    const response = axiosInstance.patch(url, reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

// Work From Home

export const workFromHomeFn = (reqbody) => {
  try {
    const response = axiosInstance.get(
      reqbody.value === 4 ? "hrm/employee-wfh-application-api/" : reqbody.value === 3 ? "hrm/wfh-application-api/" : "",
      { params: reqbody }
    )
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const workFromHomeApprovalFn = (reqbody) => {
  try {
    const response = axiosInstance.patch("hrm/wfh-application-approval-api/", reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}

export const wfhApprovalAdminFn = (reqbody) => {
  try {
    const response = axiosInstance.patch("hrm/wfh-application-api/", reqbody)
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
