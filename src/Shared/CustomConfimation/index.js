import { DeleteTwoTone, HighlightOff } from "@mui/icons-material"
import CustomButton from "Shared/CustomButton"
import CustomModal from "Shared/CustomModal"
import { useEffect } from "react"
import { toast } from "react-toastify"

/**
 * @typedef {Object} DeleteButtonProps
 * @property {Function} onConfirm - Callback function invoked when delete is confirmed.
 * @property {boolean} isDelete - State indicating whether the delete dialog is open or closed.
 * @property {Function} setIsDelete - Function to set the state of delete dialog.
 * @property {Array} selectedIds - Array of selected item ids.
 * @property {boolean} isPermit - Array of selected item ids.
 */

/**
 * Delete button component.
 * @param {DeleteButtonProps} props - The props of the component.
 * @returns {JSX.Element} - The JSX element representing the delete button component.
 */
const DeleteButton = ({ onConfirm, isDelete, setIsDelete, selectedIds = [], isPermit = true }) => {
  /**
   * Function to handle closing of delete dialog.
   */
  const handleClose = () => setIsDelete(false)

  /**
   * Function to handle opening of delete dialog.
   */
  const handleOpen = () => {
    if (!isPermit) {
      toast.warn("You don't have permission for delete.")
    } else {
      setIsDelete(true)
    }
  }

  useEffect(() => {
    selectedIds?.length === 0 && handleClose()
  }, [selectedIds])

  return (
    <>
      {selectedIds?.length !== 0 && (
        <CustomButton size="medium" startIcon={<DeleteTwoTone />} color="error" onClick={handleOpen}>
          Delete Selected
        </CustomButton>
      )}
      <CustomModal open={isDelete} onClose={handleClose} padding={2} className="!w-[450px]">
        <div className="flex flex-col items-center gap-3 pb-5">
          <HighlightOff color="error" className="!text-6xl" />
          <p className="text-xl">Are you sure!</p>
          <p>You want to delete selected Items?</p>
        </div>
        <span className="flex justify-end gap-3">
          <CustomButton onClick={handleClose}>No</CustomButton>
          <CustomButton onClick={onConfirm}>Yes</CustomButton>
        </span>
      </CustomModal>
    </>
  )
}

export default DeleteButton
