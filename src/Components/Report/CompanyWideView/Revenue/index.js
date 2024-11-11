import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { revenueReportFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import { navigate } from "Shared/useNavigate"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const Revenue = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const { data, isLoading } = useQuery(["revenueReport", search, page], () => revenueReportFn({ page, search }))

  const revenues = data?.data?.data

  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          type="search"
          placeholder="Search Revenue..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>Campaign Name</TableCell>
              <TableCell isHead>Campaign Start Date</TableCell>
              <TableCell isHead>Campaign End Date</TableCell>
              <TableCell isHead>Total Revenue</TableCell>
              <TableCell isHead>Number of Days for Campaign</TableCell>
              <TableCell isHead>PPOC NAME</TableCell>
              <TableCell className="!border-r-0" isHead>
                SPOC NAME
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={6} />
            {revenues?.map((revenue, index) => (
              <TableRow key={index}>
                <TableCell
                  className="!text-blue-500 !cursor-pointer !font-bold"
                  onClick={() => navigate(`/crm/campaign/detail/${revenue.id}`, { state: revenue.id })}
                >
                  {revenue.campaign_title}
                </TableCell>
                <TableCell>{moment(revenue.start_date).format("lll")}</TableCell>
                <TableCell>{revenue.closed_date ? moment(revenue.closed_date).format("lll") : "Ongoing"}</TableCell>
                <TableCell>{revenue.revenue} INR</TableCell>
                <TableCell>{revenue.number_of_days_for_campaign}</TableCell>
                <TableCell>{revenue.front_poc}</TableCell>
                <TableCell className="!border-r-0">{revenue.back_poc}</TableCell>
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

export default Revenue
