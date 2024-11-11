import { useQuery } from "react-query"
import { countryStateCityFn } from "Services/CRM/Common"
import { userPermissionsFn } from "Services/HRM/EmployeePermission"
import { storeProfileFn } from "Services/Profile"

/**
 * Custom hook to check user permissions.
 * @param {string} permission_name - The name of the permission to check.
 * @returns {boolean} - True if the user has the specified permission, false otherwise.
 * @example   const isDeletePermit = usePermission("delete_campaign")
 */

export const usePermission = (permission_name) => {
  /**
   * Get user role from local storage.
   */
  const role = localStorage.getItem("role")

  /**
   * Check if the user is a store admin.
   */
  const isStoreAdmin = role === "Admin"

  /**
   * If user is a store admin, return true.
   */
  if (isStoreAdmin) return true

  /**
   * Fetch user permissions if user is not a store admin.
   */
  const { data } = useQuery("usePermission", () => userPermissionsFn(), { enabled: !isStoreAdmin })

  /**
   * Extract permissions from fetched data.
   */
  const permissions = data?.data?.data || []

  /**
   * Find the specified permission in the user's permissions.
   */
  const permission = permissions.find((i) => i.codename === permission_name)?.active_status || false

  /**
   * Return the status of the specified permission.
   */
  return permission
}

export const useProfile = () => {
  const { data, isLoading } = useQuery("useProfile", storeProfileFn)
  const profile = data?.data?.data || {}
  return { profile, isLoading }
}

/**
 * Custom hook for fetching country, state, and city data.
 * @param {Object} options - Options object containing country_id and state_id.
 * @param {string} options.country_id - The ID of the selected country.
 * @param {string} options.state_id - The ID of the selected state.
 * @returns {{
 *   countries: Array,
 *   isLoadingCountries: boolean,
 *   states: Array,
 *   isLoadingStates: boolean,
 *   cities: Array,
 *   isLoadingCities: boolean
 * }} Object containing countries, states, and cities data along with loading states.
 */
export const useCountry = ({ country_id = "", state_id = "" }) => {
  const { data: countriesData, isLoading: isLoadingCountries } = useQuery("countries", () => countryStateCityFn())
  const countries = countriesData?.data?.data?.map(({ name, id }) => ({ label: name, value: id })) || []
  const { data: statesData, isLoading: isLoadingStates } = useQuery(
    ["states", country_id],
    () => countryStateCityFn({ country_id }),
    { enabled: Boolean(country_id) }
  )
  const states = statesData?.data?.data?.map(({ name, id }) => ({ label: name, value: id })) || []
  const { data, isLoading: isLoadingCities } = useQuery(
    ["cities", country_id, state_id],
    () => countryStateCityFn({ country_id, state_id }),
    { enabled: Boolean(state_id) }
  )
  const cities = data?.data?.data?.map(({ name, id }) => ({ label: name, value: id })) || []
  return { countries, isLoadingCountries, states, isLoadingStates, cities, isLoadingCities }
}
