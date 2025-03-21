import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Translate from "@/lib/helpers/Translate";

export default function ConfirmDialogYesNo({
  title,
  contentText,
  open,
  setOpen,
  onButtonConfirmClick
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { tr } = Translate();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {tr("No")}
          </Button>
          <Button
            onClick={() => {
              onButtonConfirmClick();
              handleClose();
            }}
            autoFocus
          >
            {tr("Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
