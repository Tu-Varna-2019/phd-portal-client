import DoctoralCenter from "@/models/DoctoralCenter";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

export const doctoralCenterSlice = createSlice({
  name: "doctoralCenter",
  initialState: {
    doctoralCenter: new DoctoralCenter()
  },
  reducers: {
    setDoctoralCenter: (state, action) => {
      state.doctoralCenter = deserialize(DoctoralCenter, action.payload);
    },
    clearDoctoralCenter(state) {
      state.doctoralCenter = null;
    }
  }
});

export const { setDoctoralCenter, clearDoctoralCenter } =
  doctoralCenterSlice.actions;
export default doctoralCenterSlice.reducer;
