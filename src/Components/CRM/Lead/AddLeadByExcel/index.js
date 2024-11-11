import { Add } from "@mui/icons-material"
import axiosInstance from "Config/axio.config"
import { addLeadByExcelFn } from "Services/CrmApi/Leads/AddLeadByExcel"
import CustomButton from "Shared/CustomButton"
import CustomModal from "Shared/CustomModal"
import { useState } from "react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

const AddLeadByExcel = ({ refetch }) => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const { mutate, isLoading } = useMutation(addLeadByExcelFn, {
    onSuccess: (response) => {
      if (response.data.response_code === 200) {
        toast.success(response.data.message)
        refetch()
        handleClose()
      }
    },
  })

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.post(
        "leads/sample-format-of-lead-data-for-excel/",
        {},
        { responseType: "blob" }
      )
      const url = URL.createObjectURL(response.data)
      const a = document.createElement("a")
      a.href = url
      a.download = "sample_lead_data.xlsx"
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error.response.data.message)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const reqBody = new FormData()
    reqBody.append("excel_file", file)
    mutate(reqBody)
  }

  return (
    <>
      <CustomButton size="medium" startIcon={<Add />} onClick={handleOpen} className="mx-2 !h-auto">
        <span className="flex items-center">Add Lead by Excel</span>
      </CustomButton>
      <CustomModal open={open} title="Add Lead By Excel" onClose={handleClose} className="!w-[450px]" padding={3}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5">
          <span className="flex items-center justify-between w-full p-2">
            <p>Download Sample </p>
            <CustomButton onClick={handleDownload}>Download</CustomButton>
          </span>
          <input
            type="file"
            id="product_image"
            name="product_image"
            className="w-full rounded p-1 !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-20 !border !border-white"
            onChange={(event) => setFile(event.target.files[0])}
          />
          <CustomButton loadingContent="Uploading..." isLoading={isLoading} type="submit">
            Add Lead
          </CustomButton>
        </form>
      </CustomModal>
    </>
  )
}

export default AddLeadByExcel
