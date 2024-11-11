import { Edit } from "@mui/icons-material"
import { Checkbox, MenuItem, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { useDataHRM } from "Services/HRM"
import { deleteRolesFn, rolesFn } from "Services/HRM/Role"
import useRowSelection from "Shared"
import DeleteButton from "Shared/CustomConfimation"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import AddRole from "./AddRole"
import { usePermission } from "Settings"
import CustomPermission from "Shared/CustomPermsission"

const Role = () => {
  const [deptId, setDeptId] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [isDelete, setIsDelete] = useState(false)
  const [selectRole, setSelectRole] = useState({})
  const { departments } = useDataHRM({ department_id: "" })

  const isAddPermit = usePermission("add_role")
  const isUpdatePermit = usePermission("change_role")
  const isDeletePermit = usePermission("delete_role")
  const isViewPermit = usePermission("view_role")

  const { data, isLoading } = useQuery(
    ["roles", page, search, deptId, isViewPermit],
    () => rolesFn({ page, search, department: deptId }),
    { enabled: isViewPermit }
  )

  const roles = data?.data?.data

  const client = useQueryClient()

  const { selectedIds, handleSelectRow, handleSelectAll, handleClearSelection } = useRowSelection([], roles)

  const { mutate: deleteRoles } = useMutation(deleteRolesFn, {
    onSuccess: (response) => {
      toast.success(response.data.message)
      setIsDelete(false)
      handleClearSelection()
      client.refetchQueries("roles")
    },
  })

  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Designation"
        />
        <div className="flex items-center gap-2">
          <CustomSelect
            placeholder="All Departments"
            value={deptId}
            onChange={(event) => setDeptId(event.target.value)}
          >
            <MenuItem value={""}>All Departments</MenuItem>
            {departments?.map((item) => (
              <MenuItem value={item?.id}>{item?.title}</MenuItem>
            ))}
          </CustomSelect>
          <DeleteButton
            onConfirm={() => deleteRoles({ role_ids: selectedIds })}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
            selectedIds={selectedIds}
            isPermit={isDeletePermit}
          />
          <AddRole isAddPermit={isAddPermit} setSelectRole={setSelectRole} selectRole={selectRole} />
        </div>
      </div>

      <TableContainer hidden={!isViewPermit}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>
                <Checkbox size="small" onChange={handleSelectAll} />
              </TableCell>
              <TableCell isHead>ID</TableCell>
              <TableCell isHead>Designation</TableCell>
              <TableCell isHead>Department ID</TableCell>
              <TableCell isHead>Department Name</TableCell>
              <TableCell isHead>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={5} />
            {roles?.map((item) => (
              <TableRow className="hover:!bg-white hover:!bg-opacity-40 cursor-pointer">
                <TableCell>
                  <Checkbox
                    size="small"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                  />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.department_name}</TableCell>
                <TableCell>
                  <CustomIconButton
                    onClick={() =>
                      isUpdatePermit
                        ? setSelectRole(item)
                        : toast.warn("You don't have permission for update designation.")
                    }
                  >
                    <Edit color="success" />
                  </CustomIconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPermission isPermit={isViewPermit} label="designation" />
      <CustomPagination data={data} setPage={setPage} />
      <NoDataFound data={data} />
    </CustomDiv>
  )
}

export default Role
