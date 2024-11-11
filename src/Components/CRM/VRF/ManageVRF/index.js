import { CheckCircle } from "@mui/icons-material"
import { Backdrop, CircularProgress, Divider, MenuItem } from "@mui/material"
import { CountryStateCitySelect } from "Helpers"
import logo from "Resources/opraah-logo.png"
import { fillVrfFn } from "Services/CRM/VRF"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import CustomSelect from "Shared/CustomSelect"
import { useFormik } from "formik"
import { useRef } from "react"
import { useMutation } from "react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const VendorRegistrationForm = () => {
  const { id } = useParams()

  const ref = useRef()

  const {
    mutate: fillVrf,
    isSuccess,
    isLoading,
  } = useMutation(fillVrfFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
    },
  })

  const formik = useFormik({
    initialValues: {
      vendor_name: "",
      campaign_member_id: id,
      business: "",
      house_no: "",
      street: "",
      area: "",
      country_id: "",
      state_id: "",
      city_id: "",
      pincode: "",
      pan_no: "",
      gst_no: "",
      msme_no: "",
      artist_name: "",
      service_type: "",
      vrf_status: "",
      bank_name: "",
      branch: "",
      ifsc_code: "",
      account_no: "",
      swift_code: "",
      other_details: "",
      gst_certificate: "",
      pan_copy: "",
      aadhaar_copy: "",
      coi_copy: "",
      cancelled_cheque_copy: "",
      undertaking_section: "",
      sales_name: "",
      sales_email: "",
      sales_mobile: "",
      account_name: "",
      account_email: "",
      account_mobile: "",
      youtube_channel_name: "",
      instagram_channel_name: "",
    },

    onSubmit: (values) => {
      const reqBody = new FormData(ref.current)
      reqBody.append("channel_names", JSON.stringify([values.instagram_channel_name, values.youtube_channel_name]))
      reqBody.append("sales_names", JSON.stringify([values.sales_name]))
      reqBody.append("sales_emails", JSON.stringify([values.sales_email]))
      reqBody.append("sales_mobiles", JSON.stringify([values.sales_mobile]))
      reqBody.append("account_names", JSON.stringify([values.account_name]))
      reqBody.append("account_emails", JSON.stringify([values.account_email]))
      reqBody.append("account_mobiles", JSON.stringify([values.account_mobile]))
      reqBody.append("campaign_member_id", id)
      reqBody.append("msme_register", values.msme_no ? "Yes" : "No")
      fillVrf(reqBody)
    },
  })
  return isLoading ? (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress thickness={5} size={50} />
    </Backdrop>
  ) : isSuccess ? (
    <div className="relative flex flex-col h-screen gap-2 p-2 bg-black bg-cover bg-opacity-10">
      <div className="flex items-center justify-between p-2 text-lg font-bold bg-white rounded shadow">
        <img src={logo} alt="" className="h-10" />
        <p className="lg:hidden">VRF</p> <p className="hidden lg:block">Vendor Registration Form</p>
      </div>
      <div className="flex flex-col items-center justify-center h-full gap-2 bg-white rounded shadow">
        <CheckCircle className="!text-5xl text-green-500" />
        <p className="text-xl text-center"> Vendor Registration Form Submitted Successfully</p>
      </div>
    </div>
  ) : (
    <form ref={ref} onSubmit={formik.handleSubmit} className="relative flex flex-col gap-2 p-2 bg-black bg-cover bg-opacity-10">
      <div className="flex items-center justify-between p-2 text-lg font-bold bg-white rounded shadow">
        <img src={logo} alt="" className="h-10" />
        <p className="lg:hidden">VRF</p> <p className="hidden lg:block">Vendor Registration Form</p>
      </div>
      <div className="flex flex-col w-full gap-2 p-3 bg-white rounded lg:p-5">
        <p className="text-lg font-bold text-rose-500">Vendor Information</p>
        <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3">
          <CustomInput formik={formik} isRequired label="Vendor Name(Beneficiary)" id="vendor_name" placeholder="Enter Vendor Name" />
          <CustomSelect formik={formik} label="Constitution of business" isRequired id="business" placeholder="Select Constitution of Business">
            <MenuItem value="Individual">Individual</MenuItem>
            <MenuItem value="Prop.">Prop.</MenuItem>
            <MenuItem value="Firm or LLP">Firm or LLP</MenuItem>
            <MenuItem value="Pvt. Ltd.">Pvt. Ltd.</MenuItem>
            <MenuItem value="Pub. Ltd.">Pub. Ltd.</MenuItem>
          </CustomSelect>

          <CustomInput isRequired label="PAN" formik={formik} type="text" id="pan_no" placeholder="Enter PAN" />
          <CustomInput label="GSTN" formik={formik} type="text" id="gst_no" placeholder="Enter GSTN" />
          <CustomInput label="MSME No." formik={formik} type="text" id="msme_no" placeholder="Enter MSME No" />
          <CustomInput
            label="Artist/Influencer/Performer Name"
            formik={formik}
            id="artist_name"
            placeholder="Enter Artist/Influencer/Performer Name"
          />
          <CustomSelect label="Product or Service Type" formik={formik} id="service_type" placeholder="Select Product or Service Type">
            <MenuItem value="Product">Product</MenuItem>
            <MenuItem value="Service">Service</MenuItem>
          </CustomSelect>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-rose-500">Bank Information</p>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            <CustomInput label="Bank Name" formik={formik} id="bank_name" placeholder="Enter Bank Name" />
            <CustomInput label="Branch" formik={formik} type="text" id="branch" placeholder="Enter Branch" />
            <CustomInput label="IFSC Code" formik={formik} id="ifsc_code" placeholder="Enter IFSC Code" />
            <CustomInput label="Account No." formik={formik} id="account_no" placeholder="Enter Account No." />
            <CustomInput label="Swift Code" formik={formik} id="swift_code" placeholder="Enter Swift Code" />
            <CustomInput label="Other Details" formik={formik} id="other_details" placeholder="Enter Other Details" />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-rose-500">Address Information</p>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            <CustomInput label="House no." formik={formik} id="house_no" placeholder="Enter House no." />
            <CustomInput label="Street" formik={formik} type="text" id="street" placeholder="Enter Street" />
            <CustomInput label="Area" formik={formik} type="text" id="area" placeholder="Enter Area" />
            <CountryStateCitySelect formik={formik} />
            <CustomInput label="Pin/zip" formik={formik} type="text" id="pincode" placeholder="Enter Pin/zip" />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-rose-500">Channel Information</p>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            <CustomInput label="Youtube" formik={formik} id="youtube_channel_name" placeholder="Enter Youtube Channel Name" />
            <CustomInput label="Instgram" formik={formik} id="instagram_channel_name" placeholder="Enter Instgram Channel Name" />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-rose-500">POC Detail</p>
          <div className="grid w-full grid-cols-3 gap-4 lg:items-end lg:flex-row">
            <CustomInput label="Your Name" formik={formik} id="sales_name" placeholder="Enter Your Name" />
            <CustomInput label="Email" formik={formik} type="email" id="sales_email" placeholder="Enter Email" />
            <CustomInput label="Mobile" formik={formik} type="text" id="sales_mobile" placeholder="Enter Mobile" />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-rose-500">Finance POC detail</p>
          <div className="grid w-full grid-cols-3 gap-4 lg:items-end lg:flex-row">
            <CustomInput label="Your Name" formik={formik} id="account_name" placeholder="Enter Your Name" />
            <CustomInput label="Email" formik={formik} type="email" id="account_email" placeholder="Enter Email" />
            <CustomInput label="Mobile" formik={formik} id="account_mobile" placeholder="Enter Mobile" />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-rose-500">Attachments</p>{" "}
          <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3">
            <CustomInput
              type="file"
              label="GST Certificate"
              id="gst_certificate"
              onChange={(event) => formik.setFieldValue("gst_certificate", event.target.files[0])}
            />
            <CustomInput type="file" label="PAN" id="pan_copy" onChange={(event) => formik.setFieldValue("pan_copy", event.target.files[0])} />
            <CustomInput
              type="file"
              label="Adhar"
              id="aadhaar_copy"
              onChange={(event) => formik.setFieldValue("aadhaar_copy", event.target.files[0])}
            />
            <CustomInput type="file" label="COI" id="coi_copy" onChange={(event) => formik.setFieldValue("coi_copy", event.target.files[0])} />
            <CustomInput
              type="file"
              label="Cancelled Cheque"
              id="cancelled_cheque_copy"
              onChange={(event) => formik.setFieldValue("cancelled_cheque_copy", event.target.files[0])}
            />
            <CustomInput
              type="file"
              label="Undertaking Under Section 206AB"
              id="undertaking_section"
              onChange={(event) => formik.setFieldValue("undertaking_section", event.target.files[0])}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 p-2 bg-white rounded shadow">
        <CustomButton type="submit">Submit</CustomButton>
      </div>
    </form>
  )
}

export default VendorRegistrationForm
