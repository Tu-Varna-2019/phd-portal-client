import Phd from "@/models/Phd";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize, serialize } from "serializr";

export const phdSlice = createSlice({
  name: "phd",
  initialState: {
    phd: null
  },
  reducers: {
    setPhd: (state, action) => {
      const phdObj = deserialize(Phd, action.payload);
      state.phd = serialize(phdObj);
    },
    clearPhd(state) {
      state.phd = null;
    }
  }
});

export const { setPhd, clearPhd } = phdSlice.actions;
export default phdSlice.reducer;
