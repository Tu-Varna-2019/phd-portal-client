import { Close } from "@mui/icons-material"
import * as Material from "@mui/material"
import { CampaignSelect } from "Helpers"
import { addInvoiceFn, compaignsDataFn, invoiceDetailFn, updateInvoiceFn } from "Services/Invoice"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import CustomDiv from "Shared/CustomDiv"
import { useFormik } from "formik"
import moment from "moment"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ManageInvoice = () => {
  const [deals, setDeals] = useState({})
  const { manage } = useParams()
  const { state: invoice_id } = useLocation()
  const isUpdate = manage === "update"

  const { data: invoices } = useQuery(["invoice", invoice_id], () => invoiceDetailFn({ invoice_id }), {
    enabled: isUpdate,
  })

  const invoice = invoices?.data?.data

  const navigate = useNavigate()

  const { mutate: addInvoice, isLoading: isAdding } = useMutation(addInvoiceFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
    onError: ({ response }) => toast.error(response.data.message),
  })

  const { mutate: updateInvoice, isLoading: isUpdating } = useMutation(updateInvoiceFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      navigate(-1)
    },
    onError: ({ response }) => toast.error(response.data.message),
  })

  const initialValues = {
    campaign_id: invoice?.campaign || "",
    total_amount: invoice?.total_amount || "",
    discount: invoice?.discount || 0,
    other_charges: invoice?.other_charges || 0,
    invoice_type: invoice?.invoice_type || "",
    payment_type: invoice?.payment_type || "",
    payment_date: invoice?.payment_date ? moment(invoice?.payment_date).format("YYYY-MM-DD") : "",
    description: invoice?.description || "",
    payment_status: invoice?.paid ? (invoice?.paid ? "Paid" : "Unpaid") : "Unpaid",
    for: invoice?.is_creator ? (invoice?.is_creator ? "Creator" : "Other") : "Creator",
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        paid: formik.values.payment_status === "Paid" ? true : false,
        is_creator: formik.values.for === "Creator" ? true : false,
        ...formik.values,
      }
      isUpdate ? updateInvoice({ invoice_id, ...reqBody }) : addInvoice(reqBody)
    },
  })

  const { data: compaignsData } = useQuery(["compaignsData"], () => compaignsDataFn())

  const compaigns = compaignsData?.data?.data

  useEffect(() => {
    const compaign = compaigns?.find((i) => i.id === formik.values.campaign_id)
    compaign && setDeals(compaign)
  }, [formik.values.campaign_id])

  const payment_type = formik.values.payment_type

  useEffect(() => {
    if (!isUpdate && payment_type && formik.values.invoice_type === "DEAL") {
      let total_amount = payment_type === "Advance payment" ? deals?.advance_amount : deals?.remaining_amount
      let payment_date =
        payment_type === "Advance payment"
          ? deals?.advance_payment_date
            ? moment(deals?.advance_payment_date).format("YYYY-MM-DD")
            : ""
          : deals?.due_payment_date
          ? moment(deals?.due_payment_date).format("YYYY-MM-DD")
          : ""

      formik.setFieldValue("total_amount", total_amount)
      formik.setFieldValue("payment_date", payment_date)
    }
  }, [isUpdate, payment_type, formik.values.invoice_type, deals])

  useEffect(() => {
    if (!isUpdate) {
      let payment_type = ""
      if (formik.values.invoice_type === "DEAL")
        if (deals.advance_amount && deals?.remaining_amount) {
          console.log("Choose Payment Type")
        } else {
          if (deals.advance_amount) {
            payment_type = "Advance payment"
          } else if (deals?.remaining_amount) {
            payment_type = "Payment after campaign"
          }
        }
      else {
        payment_type = "Expenditure"
      }
      formik.setFieldValue("payment_type", payment_type)
    }
  }, [deals])

  useEffect(() => {
    !isUpdate && formik.setFieldValue("total_amount", 0)
  }, [formik.values.invoice_type])

  return (
    <CustomDiv className="w-full !p-0">
      <CustomDiv className="flex items-center justify-between rounded-b-none !p-1">
        <p className="text-lg font-semibold">Invoice</p>
        <CustomIconButton onClick={() => navigate(-1)}>
          <Close />
        </CustomIconButton>
      </CustomDiv>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-3 p-3">
        <p className="text-lg font-semibold text-blue-600">Invoice Information</p>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
          <CustomSelect id="invoice_type" formik={formik} label="Invoice Type" placeholder="Select Invoice Type">
            <Material.MenuItem value="DEAL">DEAL</Material.MenuItem>
            <Material.MenuItem value="EXPENDITURE">EXPENDITURE</Material.MenuItem>
          </CustomSelect>

          <CampaignSelect formik={formik} />

          {formik.values.invoice_type === "DEAL" && deals?.advance_amount && deals?.remaining_amount ? (
            <CustomSelect id="payment_type" formik={formik} label="Payment Type" placeholder="Select Payment Type">
              <Material.MenuItem value="Advance payment">Advance Payment</Material.MenuItem>
              <Material.MenuItem value="Payment after campaign">Remaining Campaign</Material.MenuItem>
            </CustomSelect>
          ) : (
            ""
          )}

          <CustomInput
            id="discount"
            className="mkx"
            formik={formik}
            type="number"
            placeholder="Enter Discount"
            label="Discount"
          />

          <CustomInput
            id="other_charges"
            formik={formik}
            type="number"
            placeholder="Enter Other Charges"
            label="Other Charges"
            className="mkx"
          />
          <CustomInput
            id="total_amount"
            value={formik.values.total_amount}
            onChange={formik.values.invoice_type === "EXPENDITURE" && formik.handleChange}
            type="number"
            placeholder="Enter Payment Amount"
            label="Payment Amount"
            className="mkx"
          />
          <CustomInput
            id="payment_date"
            value={formik.values.payment_date}
            onChange={formik.values.invoice_type === "EXPENDITURE" && formik.handleChange}
            type="date"
            placeholder="Enter Payment Date"
            label="Payment Date"
          />

          {formik.values.invoice_type === "EXPENDITURE" && (
            <CustomSelect id="for" formik={formik} label="Invoice For">
              <Material.MenuItem value="Creator">Creator</Material.MenuItem>
              <Material.MenuItem value="Other">Other</Material.MenuItem>
            </CustomSelect>
          )}

          <Material.FormControl>
            <p className="m-1 font-semibold whitespace-nowrap">Payment Status</p>
            <div className="border border-black border-opacity-30 !bg-white !bg-opacity-20 px-2 rounded">
              <Material.RadioGroup
                row
                name="payment_status"
                value={formik.values.payment_status}
                onChange={formik.handleChange}
              >
                <Material.FormControlLabel value="Paid" control={<Material.Radio />} label="Paid" />
                <Material.FormControlLabel value="Unpaid" control={<Material.Radio />} label="Unpaid" />
              </Material.RadioGroup>
            </div>
          </Material.FormControl>
        </div>

        <p className="text-lg font-semibold text-blue-600">Description</p>

        <CustomInput id="description" rows="4" multiline={true} formik={formik} placeholder="Enter Descriptions" />

        <div className="flex justify-end gap-4 py-2">
          <CustomButton variant="contained" onClick={() => navigate(-1)}>
            Cancel
          </CustomButton>
          <CustomButton isLoading={isAdding || isUpdating} type="submit">
            Save
          </CustomButton>
        </div>
      </form>
    </CustomDiv>
  )
}

export default ManageInvoice
