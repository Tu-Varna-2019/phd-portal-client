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

    setAlertBoxMessage: (state, action) => {
      state.alertBoxMessage = action.payload;
    },
    setAlertBoxSeverity: (state, action) => {
      state.alertBoxSeverity = action.payload;
    }
  }
});

export const { setAlertBoxMessage, setAlertBoxSeverity, setAlertBoxOpen } =
  uiStateSlice.actions;
export default uiStateSlice.reducer;
