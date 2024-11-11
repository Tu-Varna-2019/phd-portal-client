import React from "react"
import { vrfDetailFn } from "Services/CRM/VRF"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import CustomDiv from "Shared/CustomDiv"
import CustomIconButton from "Shared/CustomIconButton"
import { Close } from "@mui/icons-material"
import { navigate } from "Shared/useNavigate"
import Loader from "Shared/Loader"
import FileViewer from "Shared/FileViewer"

const VRFDetail = () => {
  const { id: vrf_id } = useParams()

  const { data, isLoading } = useQuery(["vrfDetail", vrf_id], () => vrfDetailFn({ vrf_id }))

  const vrf = data?.data?.data

  if (isLoading)
    return (
      <CustomDiv className="flex flex-col items-center justify-center w-full h-full">
        <Loader />
      </CustomDiv>
    )

  return (
    <CustomDiv className="!p-0">
      <CustomDiv className="flex items-center justify-between !p-2 !rounded-b-none">
        <p className="text-lg font-bold"> VRF Detail</p>
        <CustomIconButton onClick={() => navigate("/crm/vrf")}>
          <Close />
        </CustomIconButton>
      </CustomDiv>
      <div className="grid grid-cols-3 gap-4 p-5">
        <div>
          <p className="text-gray-700">Vendor Name:</p>
          <p className="font-semibold">{vrf.vendor_name || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Business:</p>
          <p className="font-semibold">{vrf.business || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">House Number:</p>
          <p className="font-semibold">{vrf.house_no || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Street:</p>
          <p className="font-semibold">{vrf.street || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Area:</p>
          <p className="font-semibold">{vrf.area || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">PIN Code:</p>
          <p className="font-semibold">{vrf.pincode || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Country:</p>
          <p className="font-semibold">{vrf.country || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">State:</p>
          <p className="font-semibold">{vrf.state || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">City:</p>
          <p className="font-semibold">{vrf.city || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">PAN Number:</p>
          <p className="font-semibold">{vrf.pan_no || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">GST Number:</p>
          <p className="font-semibold">{vrf.gst_no || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">MSME Registration:</p>
          <p className="font-semibold">{vrf.msme_register || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">MSME Number:</p>
          <p className="font-semibold">{vrf.msme_no || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Channel Names:</p>
          {vrf.channel_names && (
            <div>
              {vrf.channel_names.map((channel, index) => (
                <p key={index}>
                  {index + 1}. {channel || "N/A"}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-gray-700">Artist Name:</p>
          <p className="font-semibold">{vrf.artist_name || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Service Type:</p>
          <p className="font-semibold">{vrf.service_type || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">VRF Status:</p>
          <p className="font-semibold">{vrf.vrf_status || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Bank Name:</p>
          <p className="font-semibold">{vrf.bank_name || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Branch:</p>
          <p className="font-semibold">{vrf.branch || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">IFSC Code:</p>
          <p className="font-semibold">{vrf.ifsc_code || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Account Number:</p>
          <p className="font-semibold">{vrf.account_no || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-700">Aadhar Card:</p>
          {vrf.aadhaar_copy ? <FileViewer url={vrf.aadhaar_copy} media={{ file_type: ".pdf" }} /> : "N/A"}
        </div>
        <div>
          <p className="text-gray-700">Pan Card:</p>
          {vrf.pan_copy ? <FileViewer url={vrf.pan_copy} media={{ file_type: ".pdf" }} /> : "N/A"}
        </div>
        <div>
          <p className="text-gray-700">GST Certificate:</p>
          {vrf.gst_certificate ? <FileViewer url={vrf.gst_certificate} media={{ file_type: ".pdf" }} /> : "N/A"}
        </div>
        <div>
          <p className="text-gray-700">Cancelled Cheque:</p>
          {vrf.cancelled_cheque_copy ? (
            <FileViewer url={vrf.cancelled_cheque_copy} media={{ file_type: ".pdf" }} />
          ) : (
            "N/A"
          )}
        </div>
        <div>
          <p className="text-gray-700">COI:</p>
          {vrf.coi_copy ? <FileViewer url={vrf.coi_copy} media={{ file_type: ".pdf" }} /> : "N/A"}
        </div>
        <div>
          <p className="text-gray-700">Undertaking Section:</p>
          {vrf.undertaking_section ? <FileViewer url={vrf.undertaking_section} media={{ file_type: ".pdf" }} /> : "N/A"}
        </div>
      </div>
    </CustomDiv>
  )
}

export default VRFDetail
