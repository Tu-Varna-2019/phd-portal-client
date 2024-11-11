import { Delete } from "@mui/icons-material"
import { Button, CircularProgress, Dialog } from "@mui/material"
import React from "react"
import CustomButton from "../CustomButton"

const ConfirmDeletion = ({ onDelete, isLoading, what }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = () => {
    onDelete()
    handleClose()
  }

  return (
    <>
      <CustomButton startIcon={<Delete />} className="!text-red-400 hover:!text-red-500" onClick={handleOpen}>
        Delete From Website
      </CustomButton>
      <Dialog onClose={handleClose} open={open} PaperProps={{ className: "!w-[400px]" }}>
        <div className="flex flex-col items-center justify-center gap-2 py-5">
          <p className="text-3xl">❌</p>
          <p className="px-5 py-3 text-center whitespace-pre-wrap">
            Are you sure you want to delete selected {what} from the website?
          </p>
          <div className="flex items-center gap-5 ">
            <Button className="w-32 !capitalize" size="small" variant="outlined" color="error" onClick={handleClose}>
              No, Cancel
            </Button>
            <Button className="w-32 !capitalize" size="small" variant="contained" color="error" onClick={handleDelete}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Deleting.. <CircularProgress color="inherit" size={20} />
                </div>
              ) : (
                "Yes, Sure"
              )}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default ConfirmDeletion
