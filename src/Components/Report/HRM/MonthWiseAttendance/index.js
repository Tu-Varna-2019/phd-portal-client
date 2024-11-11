import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { monthWiseAttendanceReportFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import Loader from "Shared/Loader"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const MonthWiseAttendanceReport = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [month, setMonth] = useState(moment(new Date()).format("YYYY-MM"))

  const { data, isLoading } = useQuery(["monthWiseAttendanceReport", month, search, page], () =>
    monthWiseAttendanceReportFn({ page, search, date: month })
  )

  const reports = data?.data?.data

  const labels = data?.data?.date

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between p-2">
          <CustomInput
            type="search"
            placeholder="Search Employee..."
            onChange={(event) => setSearch(event.target.value)}
          />
          <input
            type="month"
            className="p-1.5 border-[1.5px] text-black text-opacity-80 border-black rounded outline-none border-opacity-20 w-52"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            max={moment(new Date()).format("YYYY-MM")}
          />
        </div>
        {isLoading ? (
          <CustomDiv className="flex flex-col items-center justify-center h-[600px]">
            <Loader />
          </CustomDiv>
        ) : (
          <>
            <TableContainer>
              <Table className="whitespace-nowrap">
                <TableHead>
                  <TableRow>
                    <TableCell isHead isCentered={false} className="!text-sm">
                      Employee Name
                    </TableCell>
                    {labels?.map((i) => {
                      return (
                        <TableCell isHead className="!text-sm">
                          <span>
                            <p>{moment(i?.date).format("DD")}</p>
                          </span>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports?.map((item) => (
                    <TableRow className="hover:!bg-white hover:!bg-opacity-40">
                      <TableCell isCentered={false} isHead className="!text-sm">
                        {item.name}
                      </TableCell>
                      {item.attendance.map((i) => {
                        return <TableCell className="!text-sm">{i?.status}</TableCell>
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <NoDataFound data={data} />
            <CustomPagination setPage={setPage} data={data} />
          </>
        )}
      </CustomDiv>
    </>
  )
}

export default MonthWiseAttendanceReport
