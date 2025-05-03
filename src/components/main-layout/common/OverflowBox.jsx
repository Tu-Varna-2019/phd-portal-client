import { Modal, Box, Backdrop } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  zIndex: 1301
};
export default function OverflowBox({ children, open, setOpen }) {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0, 0, 0, 0.3)"
            }
          }
        }}
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  );
}
