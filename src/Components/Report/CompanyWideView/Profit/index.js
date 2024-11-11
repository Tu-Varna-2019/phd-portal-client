import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { profitReportFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const Profit = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const { data, isLoading } = useQuery(["profitReport", search, page], () => profitReportFn({ page, search }))

  const profits = data?.data?.data
  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          type="search"
          placeholder="Search Profits..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>Date</TableCell>
              <TableCell isHead>Campaign Name</TableCell>
              <TableCell isHead>Total Revenue</TableCell>
              <TableCell isHead>Cost of Creator</TableCell>
              <TableCell isHead>Gross Profit</TableCell>
              <TableCell isHead>Operating Expenses</TableCell>
              <TableCell isHead>Net Profit</TableCell>
              <TableCell isHead className="!border-r-0">
                Profit Margin (%)
              </TableCell>
            </TableRow>
          </TableHead>
          <CustomLoader loading={isLoading} row={7} />
          <TableBody>
            {profits?.map((profit, index) => (
              <TableRow key={index}>
                <TableCell>{moment(profit.created_date).format("lll")}</TableCell>
                <TableCell>{profit.campaign_title}</TableCell>
                <TableCell>{profit.revenue}</TableCell>
                <TableCell>{profit.cost_of_creator}</TableCell>
                <TableCell>{profit.gross_profit}</TableCell>
                <TableCell>{profit.operating_expense}</TableCell>
                <TableCell>{profit.net_profit}</TableCell>
                <TableCell className="!border-r-0">{profit.profit_margin}</TableCell>
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

export default Profit
