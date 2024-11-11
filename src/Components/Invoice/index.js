import { Add, DoDisturb, Edit } from "@mui/icons-material"
import { Checkbox, Chip, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs } from "@mui/material"
import { deleteInvoiceFn, invoiceListFn, updateInvoiceStatusFn } from "Services/Invoice"
import { usePermission, useProfile } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
import DeleteButton from "Shared/CustomConfimation"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomDiv from "Shared/CustomDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import InvoiceApproval from "./InvoiceApproval"
import ViewPDF from "./ViewPDF"

const Invoice = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [page, setPage] = useState(1)
  const { profile } = useProfile()
  const isAdmin = profile?.role === "Admin"
  const [value, setValue] = useState(2)
  const [search, setSearch] = useState("")

  const isAddPermit = usePermission("add_invoice")
  const isUpdatePermit = usePermission("change_invoice")
  const isDeletePermit = usePermission("delete_invoice")
  const isViewPermit = usePermission("view_invoice")

  const navigate = useNavigate()

  const handleChange = (_, newValue) => setValue(newValue)

  const {
    data: invoicesList,
    isLoading,
    refetch,
  } = useQuery(
    ["invoices", search, page, isViewPermit, value, isAdmin],
    () => invoiceListFn({ search, page, value: isAdmin ? 2 : value }),
    { enabled: isViewPermit && Boolean(profile?.role) }
  )

  const invoices = invoicesList?.data?.data

  const { handleClearSelection, handleSelectAll, handleSelectRow, selectedIds } = useRowSelection([], invoices)

  const { mutate: deleteInvoice } = useMutation(deleteInvoiceFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setIsDelete(false)
      handleClearSelection()
      refetch()
    },
  })

  const { mutate: updateStatus } = useMutation(updateInvoiceStatusFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      refetch()
    },
  })

  return (
    <>
      <CustomDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between pt-2 pl-2">
          <div className="flex items-center gap-2">
            {!isAdmin && (
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Invoice" value={2} />
                <Tab label="Invoice For Approval" value={1} />
              </Tabs>
            )}
            <div className="flex items-center gap-3 pb-2">
              <CustomInput
                placeholder="Search Invoices..."
                value={search}
                type="search"
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <span className="flex items-center gap-3 pb-2 pr-2">
            <DeleteButton
              isDelete={isDelete}
              onConfirm={() => deleteInvoice({ invoice_ids: selectedIds })}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
            />
            <CustomButton
              startIcon={<Add />}
              onClick={() =>
                isAddPermit ? navigate("/invoice/add") : toast.warn("You don't have permission for add invoice.")
              }
            >
              Invoice
            </CustomButton>
          </span>
        </div>

        {isViewPermit ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHead>
                    <Checkbox size="small" onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell isHead>Date</TableCell>
                  <TableCell isHead>Invoice No</TableCell>
                  <TableCell isHead>Invoice Type</TableCell>
                  <TableCell isHead>Payment Type</TableCell>
                  <TableCell isHead>Payment Date</TableCell>
                  <TableCell isHead>Invoice Amount(INR)</TableCell>
                  <TableCell isHead>Campaign</TableCell>
                  <TableCell isHead>Deal No</TableCell>
                  <TableCell isHead>Payment Status</TableCell>
                  <TableCell isHead>Invoice Status</TableCell>
                  <TableCell isHead>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <CustomLoader loading={isLoading} row={11} />
                {invoices?.map((invoice) => {
                  return (
                    <TableRow key={invoice.id} className="hover:bg-white hover:bg-opacity-20">
                      <TableCell>
                        <Checkbox
                          size="small"
                          checked={selectedIds.includes(invoice.id)}
                          onChange={() => handleSelectRow(invoice.id)}
                        />
                      </TableCell>
                      <TableCell>{moment(invoice.created_date).format("DD/MM/YYYY")}</TableCell>
                      <TableCell>{invoice.invoice_no}</TableCell>
                      <TableCell>{invoice.invoice_type}</TableCell>
                      <TableCell className="!capitalize">{invoice.payment_type}</TableCell>
                      <TableCell>{moment(invoice.payment_date).format("DD/MM/YYYY")}</TableCell>
                      <TableCell>{invoice.total_amount} INR</TableCell>
                      <TableCell>{invoice.campaign_title} </TableCell>
                      <TableCell>{invoice.deal_no} </TableCell>
                      <TableCell>
                        <Chip
                          color={invoice.paid ? "success" : "error"}
                          label={invoice.paid ? "Paid" : "Unpaid"}
                          onClick={() =>
                            isUpdatePermit
                              ? updateStatus({ invoice_id: invoice.id })
                              : toast.warn("You don't have permission for update invoice status.")
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {value === 1 || isAdmin ? (
                          <InvoiceApproval
                            invoice_id={invoice.id}
                            invoice_status={invoice.approval_status}
                            refetch={refetch}
                          />
                        ) : (
                          invoice.approval_status
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <CustomIconButton
                            color="success"
                            onClick={() =>
                              isUpdatePermit
                                ? navigate("/invoice/update", { state: invoice.id })
                                : toast.warn("You don't have permission for update invoice.")
                            }
                          >
                            <Edit />
                          </CustomIconButton>
                          {value === 1 || isAdmin || invoice.approval_status === "Approved" ? (
                            <ViewPDF invoice_id={invoice.id} />
                          ) : null}
                        </div>
                      </TableCell>
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

        <NoDataFound data={invoicesList} />
        <CustomPagination data={invoicesList} setPage={setPage} />
      </CustomDiv>
    </>
  )
}

export default Invoice
