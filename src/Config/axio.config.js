import axios from "axios"
import { toast } from "react-toastify"
import { LogoutBusiness } from "Shared/ProfileMenu"

/**
 * Base URL for API requests.
 * @type {string}
 */

// export const baseURL = "http://192.168.1.71:9091/"
export const baseURL = process.env.REACT_APP_API_URL

/**
 * Axios instance with baseURL set.
 * @type {import("axios").AxiosInstance}
 */

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use(
  /**
   * Interceptor function to add Authorization header to the request config.
   * @param {import("axios").AxiosRequestConfig} config - Axios request config.
   * @returns {import("axios").AxiosRequestConfig} - Updated Axios request config.
   */
  (config) => {
    const token = localStorage.getItem("token")
    config.headers = { Authorization: `Token ${token}`, ...config.headers }
    return config
  },

  /**
   *? Interceptor error handler for request.
   * @param {import("axios").AxiosError} error - Axios error object.
   * @returns {Promise<never>} - Promise rejection with error.
   */
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  /**
   * Interceptor function for successful response.
   * @param {import("axios").AxiosResponse} response - Axios response object.
   * @returns {import("axios").AxiosResponse} - The response object.
   */
  (response) => response,
  /**
   * Interceptor error handler for response.
   * @param {import("axios").AxiosError} error - Axios error object.
   * @returns {Promise<never>} - Promise rejection with error.
   */
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.warning(error.response.message)
      setTimeout(LogoutBusiness, 2000)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
