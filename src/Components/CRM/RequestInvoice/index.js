import { DoDisturb } from "@mui/icons-material"
import { Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs } from "@mui/material"
import { requestedInvoicesFn } from "Services/CRM/RequestInvoice"
import { usePermission, useProfile } from "Settings"
import CustomButton from "Shared/CustomButton"
import CustomDiv from "Shared/CustomDiv"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import usePrint from "Shared/usePrint"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import RequestApproval from "./RequestApproval"
import RequestForInvoice from "./RequestForInvoice"

const RequestInvoice = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [value, setValue] = useState(2)
  const { profile } = useProfile()

  const isAdmin = profile?.role === "Admin"

  const handleChange = (_, newValue) => setValue(newValue)

  const isAddPermit = usePermission("add_invoicerequest")
  const isViewPermit = usePermission("view_invoicerequest")
  const isUpdatePermit = usePermission("change_invoicerequest")

  const {
    data: requestedInvoices,
    isLoading,
    refetch,
  } = useQuery(
    ["requestedInvoices", search, page, isViewPermit, value],
    () => requestedInvoicesFn({ search, page, value }),
    { enabled: isViewPermit }
  )

  const invoices = requestedInvoices?.data?.data

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between pt-2 pl-2">
          <div className="flex items-center gap-2">
            {!isAdmin && (
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Requested Invoices" value={2} />
                <Tab label="Invoices For Approval" value={1} />
              </Tabs>
            )}
            <div className="flex items-center gap-3 pb-2">
              <CustomInput
                placeholder="Search Request Invoice..."
                value={search}
                type="search"
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          <span className="flex items-center gap-3 pb-2 pr-2">
            <RequestForInvoice isAddPermit={isAddPermit} refetch={refetch} />
          </span>
        </div>

        {isViewPermit ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHead>Date</TableCell>
                  <TableCell isHead>Campaign</TableCell>
                  <TableCell isHead>Influencer</TableCell>
                  <TableCell isHead>Amount</TableCell>
                  <TableCell isHead>Invoice Attachment Status</TableCell>
                  <TableCell isHead>Attachment</TableCell>
                  <TableCell isHead>Approval Status</TableCell>
                  <TableCell isHead>Created By</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <CustomLoader loading={isLoading} row={7} />
                {invoices?.map((invoice) => {
                  return (
                    <TableRow key={invoice.id} className="hover:bg-white hover:bg-opacity-20">
                      <TableCell>{moment(invoice.created_date).format("lll")}</TableCell>
                      <TableCell>{invoice.campaign_title}</TableCell>
                      <TableCell>{invoice.influencer_name}</TableCell>
                      <TableCell>{invoice.total_amount} INR</TableCell>
                      <TableCell>{invoice.attachment_status}</TableCell>
                      <TableCell>
                        {invoice.attachment_status === "Attached" ? (
                          <CustomButton
                            size="small"
                            onClick={() =>
                              invoice?.attachment ? usePrint(invoice?.attachment) : toast.error("Invalid File Type")
                            }
                          >
                            View
                          </CustomButton>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell>
                        <RequestApproval
                          isChangePermit={isUpdatePermit}
                          approval_status={invoice.approval_status}
                          invoice_request_id={invoice.id}
                          refetch={refetch}
                          isVisible={value === 1 || isAdmin}
                        />
                      </TableCell>
                      <TableCell>{invoice.created_by}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <span className="flex flex-col items-center justify-center gap-5 p-5 text-lg font-semibold h-96">
            <DoDisturb color="error" className="!text-5xl" />
            You don't have permission for view invoices.
          </span>
        )}

        <NoDataFound data={requestedInvoices} />
        <CustomPagination data={requestedInvoices} setPage={setPage} />
      </CustomDiv>
    </>
  )
}

export default RequestInvoice
