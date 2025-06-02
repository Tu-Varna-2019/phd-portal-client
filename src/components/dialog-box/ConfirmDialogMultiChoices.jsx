import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Translate from "@/lib/helpers/Translate";

export default function ConfirmDialogMultiChoices({
  title,
  description,
  buttonNames,
  onButtonsConfirmClick
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { tr } = Translate();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttonNames.map((name, index) => {
          return (
            <Button
              key={index}
              variant="outlined"
              onClick={onButtonsConfirmClick[index]}
            >
              {name}
            </Button>
          );
        })}
        <Button autoFocus onClick={handleClose}>
          {tr("Cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
