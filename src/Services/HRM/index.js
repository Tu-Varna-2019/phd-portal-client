import axiosInstance from "Config/axio.config"
import { useQuery } from "react-query"
const url = `hrm/department-role-manager-data-api/`

const departmentRoleManagerListFn = async (reqBody) => {
  try {
    const response = await axiosInstance.get(url, { params: reqBody })
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const useDataHRM = ({ department_id = "" }) => {
  const { data, isLoading } = useQuery(["useDataHRM", department_id], () =>
    departmentRoleManagerListFn({ department_id })
  )
  const { departments, managers, roles } = data || { departments: [], managers: [], roles: [] }
  return { departments, managers, roles, isLoading }
}
