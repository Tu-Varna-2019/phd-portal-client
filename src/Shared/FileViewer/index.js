import { Close, Download, Fullscreen, FullscreenExit } from "@mui/icons-material"
import { Dialog } from "@mui/material"
import classNames from "classnames"
import { useState } from "react"
import CustomButton from "../CustomButton"
import { toast } from "react-toastify"

const FileViewer = ({ url, media }) => {
  const [open, setOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const handleDownload = async () => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = window.URL.createObjectURL(blob)
      link.download = "bhaarat_crm"
      link.click()
      window.URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error("Error downloading image:", error)
    }
  }
  return (
    <>
      <CustomButton size="small" onClick={() => (url ? setOpen(true) : toast.error("No Attachment Found"))}>
        View
      </CustomButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={isFullScreen}
        hideBackdrop
        PaperProps={{
          className:
            "!relative !rounded !border-none !border-[#323639] pt-[31px] !flex !justify-center !items-center !transition-all !duration-200",
          style: { maxHeight: isFullScreen ? "100%" : "80%", maxWidth: isFullScreen ? "100%" : "60%" },
        }}
      >
        <span className="flex absolute top-0 w-full justify-between border-b border-white border-opacity-10 items-center !text-white bg-[#323639]">
          <p className="px-2 text-sm">{media?.file_name?.slice}</p>
          <span className="flex items-center">
            <Download
              className="!border-l !text-3xl !border-white !border-opacity-20 cursor-pointer p-1"
              onClick={handleDownload}
            />
            {isFullScreen ? (
              <FullscreenExit
                className="!border !text-3xl hover:!text-blue-500 !border-white !border-opacity-20 cursor-pointer"
                onClick={() => setIsFullScreen(false)}
              />
            ) : (
              <Fullscreen
                className="!border-x !text-3xl hover:!text-blue-500 !border-white !border-opacity-20 cursor-pointer"
                onClick={() => setIsFullScreen(true)}
              />
            )}
            <Close
              className="!border-r !text-3xl hover:!text-red-500 !border-white !border-opacity-20 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </span>
        </span>

        <div className="flex justify-center overflow-auto bg-white">
          {[".png", ".jpg", ".svg", ".gif", ".webp", ".jpeg"].includes(media?.file_type) ? (
            <img src={url} alt="" className="w-[inherit] h-[inherit]" />
          ) : [".mp4", ".mkv", ".avi", ".wov"].includes(media?.file_type) ? (
            <video controls autoPlay src={url}></video>
          ) : (
            <iframe
              frameBorder="0"
              src={`${url}#toolbar=0`}
              className={classNames(isFullScreen ? "w-[99.9vw] h-[98vh]" : "w-[58vw] h-[78vh]")}
            />
          )}
        </div>
      </Dialog>
    </>
  )
}

export default FileViewer
