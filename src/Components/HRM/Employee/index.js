import { Add, Edit } from "@mui/icons-material"
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { useDataHRM } from "Services/HRM"
import { deleteEmployeeFn, employeeFn } from "Services/HRM/Employee"
import { useCountry, usePermission } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
import DeleteButton from "Shared/CustomConfimation"
import CustomDiv from "Shared/CustomDiv"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import NoDataFound from "Shared/NoDataFound"
import SearchAndSelect from "Shared/SearchAndSelect"
import { TableCell } from "Shared/Table"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import EmployeeAsset from "./EmployeeAsset"
import ResetPassword from "./ResetPassword"

const Employee = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("")
  const [state, setState] = useState("")
  const [role, setRole] = useState("")
  const navigate = useNavigate()
  const client = useQueryClient()
  const [isDelete, setIsDelete] = useState(false)

  const isAddPermit = usePermission("add_employee")
  const isUpdatePermit = usePermission("change_employee")
  const isDeletePermit = usePermission("delete_employee")
  const isViewPermit = usePermission("view_employee")

  const { departments, roles } = useDataHRM({ department_id: department })

  const { states } = useCountry({ country_id: 1 })

  const { data, isLoading } = useQuery(
    ["employees", page, search, state, department, role, isViewPermit],
    () => employeeFn({ page, search, state, department, role }),
    { enabled: isViewPermit }
  )

  const employees = data?.data?.data

  const { selectedIds, handleSelectRow, handleSelectAll, handleClearSelection } = useRowSelection([], employees)

  const { mutate: deleteEmployee } = useMutation(deleteEmployeeFn, {
    onSuccess: (response) => {
      toast.success(response.data.message)
      setIsDelete(false)
      handleClearSelection()
      client.refetchQueries("employees")
    },
  })

  return (
    <>
      <CustomDiv className="!p-0 flex flex-col">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <CustomInput
              placeholder="Search Employee..."
              type="search"
              className="!w-52"
              onChange={(event) => setSearch(event.target.value)}
            />
            <SearchAndSelect placeholder="State" className="!w-60" options={states} value={state} setValue={setState} />

            <SearchAndSelect
              placeholder="Department"
              className="!w-44"
              options={departments?.map((i) => ({ value: i.id, label: i.title }))}
              value={department}
              setValue={setDepartment}
            />
            <SearchAndSelect
              placeholder="Designation"
              className="!w-44"
              options={roles?.map((i) => ({ value: i.id, label: i.title }))}
              value={role}
              setValue={setRole}
            />
          </div>

          <div className="flex items-center gap-2">
            {selectedIds.length === 0 ? (
              <CustomButton
                onClick={() =>
                  isAddPermit ? navigate("/employee/add") : toast.warn("You don't have permission for add employee.")
                }
                className="!px-5"
                startIcon={<Add />}
              >
                Employee
              </CustomButton>
            ) : (
              <DeleteButton
                onConfirm={() => deleteEmployee({ employee_ids: selectedIds })}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                selectedIds={selectedIds}
                isPermit={isDeletePermit}
              />
            )}
          </div>
        </div>

        <TableContainer hidden={!isViewPermit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>
                  <Checkbox size="small" onChange={handleSelectAll} />
                </TableCell>
                <TableCell isHead>Employee Name</TableCell>
                <TableCell isHead>Employee Code</TableCell>
                <TableCell isHead>Department Name</TableCell>
                <TableCell isHead>Designation</TableCell>
                <TableCell isHead>Email</TableCell>
                <TableCell isHead>Mobile</TableCell>
                <TableCell isHead>CTC</TableCell>
                <TableCell isHead>Gross Salary</TableCell>
                <TableCell isHead>Employee Asset</TableCell>
                <TableCell isHead>Reset Password</TableCell>
                <TableCell isHead>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={11} />
              {employees?.map((row) => (
                <TableRow key={row?.id} className="hover:!bg-white hover:!bg-opacity-40">
                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row?.name}</TableCell>
                  <TableCell>{row?.employee_code ? row.employee_code : "--"}</TableCell>
                  <TableCell>{row?.department ? row.department : "--"}</TableCell>
                  <TableCell>{row?.role ? row?.role : "--"}</TableCell>
                  <TableCell>{row?.email ? row?.email : "--"}</TableCell>
                  <TableCell>{row?.mobile ? row?.mobile : "--"}</TableCell>
                  <TableCell>{row?.gross_salary ? row?.gross_salary : "--"}</TableCell>
                  <TableCell>{row?.ctc ? row?.ctc : "--"}</TableCell>
                  <TableCell>
                    <EmployeeAsset employee_id={row.id} />
                  </TableCell>
                  <TableCell>
                    <ResetPassword employee_id={row.id} />
                  </TableCell>
                  <TableCell>
                    <CustomIconButton
                      color="success"
                      onClick={() =>
                        isUpdatePermit
                          ? navigate(`/employee/update`, { state: row?.id })
                          : toast.warn("You don't have permission for update employee.")
                      }
                    >
                      <Edit />
                    </CustomIconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPermission isPermit={isViewPermit} label="employee" />
        <NoDataFound data={data} />
        <CustomPagination data={data} setPage={setPage} />
      </CustomDiv>
    </>
  )
}

export default Employee
