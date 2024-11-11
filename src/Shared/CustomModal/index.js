import { Close } from "@mui/icons-material"
import { Box, Divider, IconButton, Modal } from "@mui/material"
import classNames from "classnames"
import React from "react"

/**
 * CustomModal component represents a modal dialog.
 * @param {object} props - Props object.
 * @param {React.ReactNode} props.children - Child elements.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {Function} props.onClose - Function to handle modal close.
 * @param {string} [props.title=""] - Title of the modal.
 * @param {Function} props.setOpen - Function to set modal open/close state.
 * @param {React.ElementType} [props.component] - Component used for the modal.
 * @param {Function} [props.onSubmit] - Function to handle modal form submission.
 * @param {number} [props.padding=8] - Padding of the modal content.
 * @param {boolean} [props.isClose=true] - Whether to show the close button.
 * @returns {JSX.Element} - CustomModal component.
 */
const CustomModal = ({
  children,
  className = "",
  open,
  onClose,
  title = "",
  setOpen,
  component,
  onSubmit,
  padding = 5,
  isClose = true,
}) => {
  return (
    <>
      <Modal
        component={component}
        open={open}
        onSubmit={onSubmit}
        onClose={() => (onClose ? onClose() : setOpen(false))}
      >
        <Box
          className={classNames(
            "absolute rounded-lg z-10 top-1/2 left-1/2 bg-white outline-none -translate-x-1/2 overflow-y-auto -translate-y-1/2 w-1/2 shadow-md",
            className
          )}
        >
          {title && (
            <>
              <span className={`relative flex items-center justify-center p-4`}>
                <p className="text-xl font-semibold">{title}</p>
                {isClose && (
                  <IconButton
                    className="!absolute !top-2 !right-2"
                    onClick={() => (setOpen ? setOpen(false) : onClose())}
                  >
                    <Close />
                  </IconButton>
                )}
              </span>
              <Divider className="!w-full" />
            </>
          )}
          <div className={`p-${padding} z-50`}>{children}</div>
        </Box>
      </Modal>
    </>
  )
}

export default CustomModal
