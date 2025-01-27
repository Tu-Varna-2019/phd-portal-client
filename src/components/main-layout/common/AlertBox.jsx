"use client";

import { useAppDispatch, useAppSelector } from "@/lib/features/constants";
import {
  selectAlertBoxMessage,
  selectAlertBoxOpen,
  selectAlertBoxSeverity
} from "@/lib/features/uiState/slices/uiStateMemoSelector";
import { Snackbar, Alert } from "@mui/material";
import { setAlertBoxOpen } from "@/lib/features/uiState/slices/uiStateSlice";

export default function AlertBox() {
  const alertBoxOpen = useAppSelector(selectAlertBoxOpen);
  const alertBoxMessage = useAppSelector(selectAlertBoxMessage);
  const alertBoxSeverity = useAppSelector(selectAlertBoxSeverity);
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={alertBoxOpen}
      autoHideDuration={6000}
      onClose={() => dispatch(setAlertBoxOpen(false))}
      aria-label="alert box"
      color="inherit"
    >
      <Alert
        onClose={() => dispatch(setAlertBoxOpen(false))}
        severity={alertBoxSeverity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {alertBoxMessage}
      </Alert>
    </Snackbar>
  );
}
