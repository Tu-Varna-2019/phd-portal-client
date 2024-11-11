import { PictureAsPdf } from "@mui/icons-material"
import axiosInstance from "Config/axio.config"
import CustomIconButton from "Shared/CustomIconButton"
import usePrint from "Shared/usePrint"

const ViewPDF = ({ invoice_id }) => {
  const handlePrint = async () => {
    try {
      const response = await axiosInstance.get("invoice-pdf-api/", {
        params: { invoice_id: invoice_id },
        responseType: "arraybuffer",
      })
      const url = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }))
      if (url) usePrint(url)
    } catch (error) {
      console.error("Error fetching PDF:", error)
    }
  }

  return (
    <>
      <CustomIconButton color="error" onClick={handlePrint}>
        <PictureAsPdf />
      </CustomIconButton>
    </>
  )
}

export default ViewPDF
