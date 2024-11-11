import axiosInstance from "Config/axio.config"
const travelPlanner = `crm/travel-planner-api/`
const travelPlannerDetails = `crm/travel-planner-details-api/`

export const travelPlannersFn = (reqBody) => {
  try {
    const response = axiosInstance.get(travelPlanner, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const travelPlannerDetailFn = (reqBody) => {
  try {
    const response = axiosInstance.get(travelPlannerDetails, { params: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const addTravelPlannerFn = (reqBody) => {
  try {
    const response = axiosInstance.post(travelPlanner, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const updateTravelPlannerFn = (reqBody) => {
  try {
    const response = axiosInstance.put(travelPlanner, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const changeTravelPlannerFn = (reqBody) => {
  try {
    const response = axiosInstance.patch(travelPlanner, reqBody)
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}

export const deleteTravelPlannerFn = (reqBody) => {
  try {
    const response = axiosInstance.delete(travelPlanner, { data: reqBody })
    return response
  } catch ({ error }) {
    throw new Error(error?.message)
  }
}
