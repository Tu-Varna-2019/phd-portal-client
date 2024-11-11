import { Checkbox, Divider, Skeleton, useTheme } from "@mui/material"
import { getPermissionDetailFn, updatePermissionFn } from "Services/HRM/EmployeePermission"
import CustomButton from "Shared/CustomButton"
import CustomDiv from "Shared/CustomDiv"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import Loader from "Shared/Loader"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const Permission = () => {
  const { employee_id } = useParams()
  const { state } = useLocation()
  const [search, setSearch] = useState("")
  const [permissionIds, setPermissionIds] = useState([])
  const navigate = useNavigate()

  const { data, isLoading, refetch } = useQuery(
    ["permission", employee_id],
    () => getPermissionDetailFn({ employee_id }),
    {
      onSuccess: ({ data }) =>
        setPermissionIds(
          data.data
            ?.flatMap((i) => i.permissions)
            .filter((i) => i.active_status)
            ?.map((i) => i.id) || []
        ),
    }
  )

  useEffect(() => {
    employee_id === ":employee_id" && navigate(`/permission/${state}`)
  }, [])

  const permissions = data?.data?.data

  const employee = data?.data?.employeeinfo

  const { mutate: updatePermission, isLoading: isUpdating } = useMutation(
    () => updatePermissionFn({ employee_id, permission_ids: permissionIds }),
    {
      onSuccess: ({ data }) => {
        toast.success(data.message)
        refetch()
      },
    }
  )

  const searchedPersmissions = permissions?.filter((i) => i.title?.toLowerCase()?.includes(search?.toLowerCase()))

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setPermissionIds(searchedPersmissions?.flatMap((i) => i.permissions)?.map((i) => i.id))
    } else {
      setPermissionIds([])
    }
  }

  const handleCheckboxChange = (permission) => {
    const isChecked = permissionIds.includes(permission.id)
    if (isChecked) {
      setPermissionIds(permissionIds.filter((id) => id !== permission.id))
    } else {
      setPermissionIds([...permissionIds, permission.id])
    }
  }

  return (
    <CustomDiv className="!p-0 h-full">
      <div className="flex items-center justify-between h-24 p-2">
        <div className="flex flex-col w-full gap-2">
          {isLoading ? (
            <Skeleton className="w-80 !h-fit" />
          ) : (
            <p className="font-bold text-blue-500">
              {employee?.name} <span className="text-black">| {employee?.role}</span>
            </p>
          )}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <CustomIconButton>
                <Checkbox size="small" className="!p-1.5" onChange={handleSelectAll} />
              </CustomIconButton>
              <CustomInput type="search" placeholder="Search..." onChange={(event) => setSearch(event.target.value)} />
            </div>
            <CustomButton isLoading={isUpdating} loadingContent="Updating" onClick={updatePermission}>
              Update
            </CustomButton>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col p-2 h-[85%] justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-1 p-2 h-[85%] overflow-y-auto">
          {searchedPersmissions?.map((item) => {
            return (
              <>
                <Divider sx={{ color: useTheme().palette.primary.main }} className="!font-bold">
                  {item?.title}
                </Divider>
                <div className="grid grid-cols-4">
                  {item?.permissions?.map((permission) => {
                    const isChecked = permissionIds.includes(permission.id)
                    return (
                      <div key={permission.id} className="flex items-center">
                        <Checkbox size="small" checked={isChecked} onChange={() => handleCheckboxChange(permission)} />
                        <span className="text-sm uppercase">{permission.name}</span>
                      </div>
                    )
                  })}
                </div>
              </>
            )
          })}
        </div>
      )}
    </CustomDiv>
  )
}

export default Permission
