import axiosInstance from "Config/axio.config"

export const countryStateCityFn = (reqBody) => {
  try {
    const response = axiosInstance.get("country-state-city-api/", {
      params: reqBody,
    })
    return response
  } catch ({ error }) {
    throw new Error(error.message)
  }
}
