import React from "react"
import CustomModal from "../../../../Shared/CustomModal"

const Note = ({ note, setNote }) => {
  const handleClose = () => {
    setNote(null)
  }
  return (
    <>
      <CustomModal open={Boolean(note)} onClose={handleClose} padding={2} className="rounded-sm">
        <p className="whitespace-break-spaces">{note}</p>
      </CustomModal>
    </>
  )
}

export default Note
