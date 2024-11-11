import { Download } from "@mui/icons-material"
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import axiosInstance from "Config/axio.config"
import { employeeReportFn } from "Services/Report"
import CustomButton from "Shared/CustomButton"
import CustomDiv from "Shared/CustomDiv"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"
import { toast } from "react-toastify"

const EmployeeReport = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const { data, isLoading } = useQuery(["employeeReport", search, page], () => employeeReportFn({ page, search }))
  const [isLoadings, setIsLaodings] = useState(false)

  const employees = data?.data?.data

  const handleDownload = async () => {
    setIsLaodings(true)
    try {
      const response = await axiosInstance.get("report/employee-excel-download-api/", { responseType: "blob" })
      const url = URL.createObjectURL(response.data)
      const a = document.createElement("a")
      a.href = url
      a.download = "opraahFx_employee"
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      toast.error("Something Went Wrong...")
    } finally {
      setIsLaodings(false)
    }
  }
  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          type="search"
          placeholder="Search Employee Report..."
          onChange={(event) => setSearch(event.target.value)}
        />
        <CustomButton
          isLoading={isLoadings}
          loadingContent="Donwloading..."
          startIcon={<Download />}
          onClick={handleDownload}
        >
          Export
        </CustomButton>
      </div>
      <TableContainer>
        <Table className="whitespace-nowrap">
          <TableHead>
            <TableRow>
              <TableCell isHead>Employee Name</TableCell>
              <TableCell isHead>Employee Code</TableCell>
              <TableCell isHead>Joining Date</TableCell>
              <TableCell isHead>Department Name</TableCell>
              <TableCell isHead>Designation</TableCell>
              <TableCell isHead>Email</TableCell>
              <TableCell isHead>Mobile</TableCell>
              <TableCell isHead>DOB</TableCell>
              <TableCell isHead>Gender</TableCell>
              <TableCell isHead>Marital Status</TableCell>
              <TableCell isHead>Mother Name</TableCell>
              <TableCell isHead>Father Name</TableCell>
              <TableCell isHead>Emergency Contact Name</TableCell>
              <TableCell isHead>Emergency Contact No</TableCell>
              <TableCell isHead>Relation</TableCell>
              <TableCell isHead>Area</TableCell>
              <TableCell isHead>Pincode</TableCell>
              <TableCell isHead>City</TableCell>
              <TableCell isHead>State</TableCell>
              <TableCell isHead>Country</TableCell>
              <TableCell isHead>Salary Type</TableCell>
              <TableCell isHead>Salary</TableCell>
              <TableCell isHead>Incentives</TableCell>
              <TableCell isHead>Available Leave</TableCell>
              <TableCell isHead>Applied Leave</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={24} />
            {employees?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row?.name || "-"}</TableCell>
                <TableCell>{row?.employee_code || "-"}</TableCell>
                <TableCell>{moment(row?.joining_date).format("ll") || "-"}</TableCell>
                <TableCell>{row?.department || "-"}</TableCell>
                <TableCell>{row?.role || "-"}</TableCell>
                <TableCell>{row?.email || "-"}</TableCell>
                <TableCell>{row?.mobile || "-"}</TableCell>
                <TableCell>{moment(row?.dob).format("ll") || "-"}</TableCell>
                <TableCell>{row?.gender || "-"}</TableCell>
                <TableCell>{row?.marital_status || "-"}</TableCell>
                <TableCell>{row?.mother_name || "-"}</TableCell>
                <TableCell>{row?.father_name || "-"}</TableCell>
                <TableCell>{row?.emergency_contact_name || "-"}</TableCell>
                <TableCell>{row?.emergency_contact_no || "-"}</TableCell>
                <TableCell>{row?.relation || "-"}</TableCell>
                <TableCell>{row?.area || "-"}</TableCell>
                <TableCell>{row?.pin_code || "-"}</TableCell>
                <TableCell>{row?.city_name || "-"}</TableCell>
                <TableCell>{row?.state_name || "-"}</TableCell>
                <TableCell>{row?.country_name || "-"}</TableCell>
                <TableCell>{row?.salary_type || "-"}</TableCell>
                <TableCell>{row?.salary ?? "-"}</TableCell>
                <TableCell>{row?.incentives ?? "-"}</TableCell>
                <TableCell>{row?.leaves || "-"}</TableCell>
                <TableCell>{row?.leaves_used || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={data} />
      <CustomPagination setPage={setPage} data={data} />
    </CustomDiv>
  )
}

export default EmployeeReport
