import { CheckCircle, Description } from "@mui/icons-material"
import { Backdrop, Box, CircularProgress } from "@mui/material"
import logo from "Resources/opraah-logo.png"
import { uploadInvoiceFn } from "Services/CRM/RequestInvoice"
import CustomButton from "Shared/CustomButton"
import { useFormik } from "formik"
import { useMutation } from "react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const UploadInvoice = () => {
  const { invoice_request_id } = useParams()

  const {
    mutate: uploadInvoice,
    isSuccess,
    data,
    isLoading,
  } = useMutation(uploadInvoiceFn, { onSuccess: ({ data }) => toast.success(data.message) })

  const formik = useFormik({
    initialValues: { attachment: "" },
    onSubmit: () => {
      const reqBody = new FormData()
      reqBody.append("invoice_request_id", invoice_request_id)
      reqBody.append("attachment", formik.values.attachment)
      uploadInvoice(reqBody)
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
        <p>Upload Invoice</p>
      </div>
      <div className="flex flex-col items-center justify-center h-full gap-2 bg-white rounded shadow">
        <CheckCircle className="!text-5xl text-green-500" />
        <p className="text-xl text-center">{data?.data?.message}</p>
      </div>
    </div>
  ) : (
    <form
      onSubmit={formik.handleSubmit}
      className="relative flex flex-col h-screen gap-2 p-2 bg-black bg-cover bg-opacity-10"
    >
      <div className="flex items-center justify-between p-2 text-lg font-bold bg-white rounded shadow">
        <img src={logo} alt="" className="h-10" />
        <p>Upload Invoice</p>
      </div>

      <div className="flex flex-col items-center justify-center h-full p-2 bg-white rounded shadow">
        {formik.values.attachment && (
          <span className="flex flex-col items-center justify-center">
            <Description className="!text-4xl" />
            {formik.values.attachment?.name}
          </span>
        )}
        <Box
          component="label"
          className="p-6 text-black text-opacity-50 transition-all duration-500 border-2 border-black border-opacity-50 border-dashed rounded cursor-pointer hover:text-blue-500 animate-pulse hover:text-opacity-70 hover:border-opacity-70"
        >
          Click here to choose a file!
          <input
            id="attachment"
            type="file"
            accept="application/pdf"
            hidden
            onChange={(event) => formik.setFieldValue("attachment", event.target.files[0])}
          />
        </Box>
      </div>

      <div className="flex items-center justify-end gap-2 p-2 bg-white rounded shadow">
        <CustomButton type="submit">Submit</CustomButton>
      </div>
    </form>
  )
}

export default UploadInvoice
