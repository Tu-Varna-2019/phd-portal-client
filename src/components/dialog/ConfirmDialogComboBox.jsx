import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Autocomplete,
  TextField
} from "@mui/material";

export default function ConfirmDialogComboBox({
  title,
  contentText,
  buttonName,
  options,
  label,
  onButtonConfirmClick,
  onAutocompleteChange
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          <Autocomplete
            disablePortal
            options={options}
            onChange={(event, value) => onAutocompleteChange(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Отажи се
          </Button>
          <Button
            onClick={() => {
              onButtonConfirmClick();
              handleClose();
            }}
            autoFocus
          >
            Потвърди
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
