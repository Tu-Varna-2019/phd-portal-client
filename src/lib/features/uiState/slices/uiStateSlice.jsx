import { createSlice } from "@reduxjs/toolkit";

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState: {
    alertBoxOpen: false,
    alertBoxMessage: "",
    alertBoxSeverity: "success"
  },
  reducers: {
    setAlertBoxOpen: (state, action) => {
      state.alertBoxOpen = action.payload;
    },
    setAlertBox: (state, action) => {
      state.alertBoxOpen = true;
      state.alertBoxMessage = action.payload.message;
      state.alertBoxSeverity = action.payload.severity;
    }
  }
});

export const { setAlertBoxOpen, setAlertBox } = uiStateSlice.actions;
export default uiStateSlice.reducer;
