import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { receivablesBillsFn } from "Services/Report"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const BillsReceivables = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const { data, isLoading } = useQuery(["receivablesBills", search, page], () => receivablesBillsFn({ page, search }))

  const receivablesBills = data?.data?.data

  return (
    <CustomDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          type="search"
          placeholder="Search Bills Receivables..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>Invoice No</TableCell>
              <TableCell isHead>Invoice Type</TableCell>
              <TableCell isHead>Invoice Date</TableCell>
              <TableCell isHead>Payment Type</TableCell>
              <TableCell isHead>Payment Date</TableCell>
              <TableCell isHead>Invoice Amount(INR)</TableCell>
              <TableCell isHead>Campaign</TableCell>
              <TableCell isHead>Deal No</TableCell>
              <TableCell className="!border-r-0" isHead>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={8} />
            {receivablesBills?.map((bill, index) => (
              <TableRow key={index}>
                <TableCell>{bill.invoice_no}</TableCell>
                <TableCell>{bill.invoice_type}</TableCell>
                <TableCell>{moment(bill.created_date).format("lll")}</TableCell>
                <TableCell>{bill.payment_type}</TableCell>
                <TableCell>{moment(bill.payment_date).format("lll")}</TableCell>
                <TableCell>{bill.total_amount}</TableCell>
                <TableCell>{bill.campaign_title}</TableCell>
                <TableCell>{bill.deal_no}</TableCell>
                <TableCell className="!border-r-0">{bill.paid ? "Paid" : "Unpaid"}</TableCell>
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

export default BillsReceivables
