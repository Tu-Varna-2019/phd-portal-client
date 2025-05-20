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
  Select,
  MenuItem
} from "@mui/material";
import Translate from "@/lib/helpers/Translate";

export default function ConfirmDialogComboBox({
  title,
  contentText,
  buttonName,
  optionChosen,
  options,
  onButtonConfirmClick,
  onAutocompleteChange
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { tr } = Translate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          <Select
            id="select-box"
            onChange={(event, value) => {
              const id = event.target.id.toString();
              onAutocompleteChange(id.charAt(id.length - 1), value);
            }}
            sx={{ width: 300 }}
          >
            {options.map((option, index) => {
              return (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {tr("Cancel")}
          </Button>
          <Button
            disabled={optionChosen == ""}
            onClick={() => {
              onButtonConfirmClick();
              handleClose();
            }}
            autoFocus
          >
            {tr("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
