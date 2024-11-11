import { PictureAsPdf } from "@mui/icons-material"
import axiosInstance from "Config/axio.config"
import CustomIconButton from "Shared/CustomIconButton"
import usePrint from "Shared/usePrint"

const ViewPDF = ({ isDisbaled, deal_id }) => {
  const handlePrint = async () => {
    try {
      const response = await axiosInstance.get("crm/deal-pdf-api/", {
        params: { deal_id: deal_id },
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
      <CustomIconButton disabled={isDisbaled} onClick={handlePrint}>
        <PictureAsPdf color="error" />
      </CustomIconButton>
    </>
  )
}

export default ViewPDF
