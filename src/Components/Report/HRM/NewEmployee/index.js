import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { newEmployeeReportFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"
import axiosInstance from "Config/axio.config"
import { toast } from "react-toastify"
import CustomButton from "Shared/CustomButton"
import { Download } from "@mui/icons-material"

const NewEmployeeReport = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM"))
  const [isLoadings, setIsLaodings] = useState(false)

  const { data, isLoading } = useQuery(["newEmployeeRepor", search, page, date], () =>
    newEmployeeReportFn({ page, search, date })
  )

  const reports = data?.data?.data

  const handleDownload = async () => {
    setIsLaodings(true)
    try {
      const response = await axiosInstance.get("report/new-employee-excel-download-api/", { responseType: "blob" })
      const url = URL.createObjectURL(response.data)
      const a = document.createElement("a")
      a.href = url
      a.download = "opraahFx_new_employee"
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
        <div className="flex items-center gap-2">
          <input
            type="month"
            className="p-1 bg-opacity-50 bg-white border-[1.5px] text-black text-opacity-80 border-black rounded outline-none border-opacity-20 w-52"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={moment(new Date()).format("YYYY-MM")}
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
      </div>
      <TableContainer>
        <Table className="whitespace-nowrap">
          <TableHead>
            <TableRow>
              <TableCell isHead>Employee Code</TableCell>
              <TableCell isHead>Employee Name</TableCell>
              <TableCell isHead>DOJ</TableCell>
              <TableCell isHead>DOB</TableCell>
              <TableCell isHead>Gender</TableCell>
              <TableCell isHead>Marital Status</TableCell>
              <TableCell isHead>Department</TableCell>
              <TableCell isHead>Designation</TableCell>
              <TableCell isHead>Personal Email</TableCell>
              <TableCell isHead>PAN</TableCell>
              <TableCell isHead>Aadhar</TableCell>
              <TableCell isHead>Personal Bank Account Name</TableCell>
              <TableCell isHead>Personal Bank Account No.</TableCell>
              <TableCell isHead>Personal Bank IFSC CODE</TableCell>
              <TableCell isHead>UAN Number</TableCell>
              <TableCell isHead>Personal Number</TableCell>
              <TableCell isHead>Location</TableCell>
              <TableCell isHead>Address</TableCell>
              <TableCell isHead>Annual CTC</TableCell>
              <TableCell isHead>Monthly CTC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={19} />
            {reports?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row?.employee_code || "-"}</TableCell>
                <TableCell>{row?.name || "-"}</TableCell>
                <TableCell>{moment(row?.joining_date).format("ll")}</TableCell>
                <TableCell>{moment(row?.dob).format("ll")}</TableCell>
                <TableCell>{row?.gender || "-"}</TableCell>
                <TableCell>{row?.marital_status || "-"}</TableCell>
                <TableCell>{row?.department || "-"}</TableCell>
                <TableCell>{row?.role || "-"}</TableCell>
                <TableCell>{row?.email || "-"}</TableCell>
                <TableCell>{row?.pan || "-"}</TableCell>
                <TableCell>{row?.adhaar || "-"}</TableCell>
                <TableCell>{row?.bank_name || "-"}</TableCell>
                <TableCell>{row?.account_no || "-"}</TableCell>
                <TableCell>{row?.ifsc_code || "-"}</TableCell>
                <TableCell>{row?.uan_number || "-"}</TableCell>
                <TableCell>{row?.mobile || "-"}</TableCell>
                <TableCell>{row?.city_name || "-"}</TableCell>
                <TableCell>{row?.address || "-"}</TableCell>
                <TableCell>{row?.annual_ctc || "-"}</TableCell>
                <TableCell>{row?.monthly_ctc || "-"}</TableCell>
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

export default NewEmployeeReport
